import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- CSV 파싱 ---
const raw = fs.readFileSync(path.join(__dirname, "mungchi-data.csv"), "utf-8");
const lines = raw
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean);

// 헤더(1행) + 설명(2행) 스킵 → 3행부터 데이터
function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (const ch of line) {
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

const dataLines = lines.slice(2); // skip header + description row

const restaurants = [];
for (const line of dataLines) {
  const cols = parseCsvLine(line);
  const [name, category, hours, groupExp, address, phone, comment, tags, naverPlaceUrl] = cols;
  if (!name || !address) continue; // skip empty rows

  // category 매핑
  let mappedCategory = category;
  if (category === "샌드위치 & 샐러드") mappedCategory = "샌드위치";

  // has_group_order_experience 파싱
  const hasGroup = groupExp?.startsWith("O") ? true : false;

  // tags 파싱: "#비빔밥 #죽" → ["비빔밥", "죽"]
  const tagList = (tags || "")
    .split("#")
    .map((t) => t.trim())
    .filter(Boolean);

  restaurants.push({
    name: name.trim(),
    category: mappedCategory.trim(),
    hours: hours?.trim() || null,
    has_group_order_experience: hasGroup,
    address: address.trim(),
    phone: phone?.trim() || null,
    comment: comment?.trim() || null,
    tags: tagList,
    naver_place_url: naverPlaceUrl?.trim() || null,
  });
}

console.log(`Parsed ${restaurants.length} restaurants from CSV.`);

// --- 지오코딩 (Nominatim) ---
async function geocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=kr&limit=1`;
  const res = await fetch(url, {
    headers: { "User-Agent": "mungchi-seed-script/1.0" },
  });
  const data = await res.json();
  if (data.length > 0) {
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  }
  return null;
}

// Nominatim은 rate limit이 있으므로 1초 간격으로 요청
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const results = [];

  for (const r of restaurants) {
    let coords = await geocode(r.address);

    // 지번 주소가 안 되면 동 이름까지만 시도
    if (!coords) {
      const shortAddr = r.address.replace(/\d+-\d+$/, "").trim();
      coords = await geocode(shortAddr);
    }

    if (coords) {
      console.log(`  OK: ${r.name} → ${coords.lat}, ${coords.lng}`);
    } else {
      console.warn(`  WARN: ${r.name} → geocoding failed, using 0,0`);
      coords = { lat: 0, lng: 0 };
    }

    results.push({ ...r, ...coords });
    await sleep(1100); // respect Nominatim rate limit
  }

  // --- SQL 생성 ---
  const esc = (v) => {
    if (v === null || v === undefined) return "NULL";
    return `'${String(v).replace(/'/g, "''")}'`;
  };

  const sqlLines = [
    "-- Auto-generated seed data for mungchi restaurants",
    "-- Generated at: " + new Date().toISOString(),
    "",
    "INSERT INTO restaurants (name, category, hours, has_group_order_experience, address, phone, comment, tags, naver_place_url, lat, lng)",
    "VALUES",
  ];

  const valueRows = results.map((r, i) => {
    const tagsArr = `'{${r.tags.map((t) => `"${t}"`).join(",")}}'`;
    const row = [
      esc(r.name),
      esc(r.category),
      esc(r.hours),
      r.has_group_order_experience,
      esc(r.address),
      esc(r.phone),
      esc(r.comment),
      tagsArr,
      esc(r.naver_place_url),
      r.lat,
      r.lng,
    ].join(", ");
    const sep = i < results.length - 1 ? "," : ";";
    return `  (${row})${sep}`;
  });

  sqlLines.push(...valueRows);

  const sqlPath = path.join(__dirname, "seed.sql");
  fs.writeFileSync(sqlPath, sqlLines.join("\n"), "utf-8");
  console.log(`\nSQL written to ${sqlPath}`);
}

main().catch(console.error);
