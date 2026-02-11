export interface Restaurant {
  id: string;
  name: string;
  category: '한식' | '양식' | '카페' | '기타';
  description: string;
  address: string;
  imageUrl: string;
  phone: string;
  hours: string;
  hasGroupOrderExperience: boolean;
  comment: string;
  tags: string[];
  naverPlaceUrl: string;
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: '공대 두루치기',
    category: '한식',
    description: '#두루치기 #공대생맛집',
    address: '서울시 관악구 남부순환로 1234',
    imageUrl: 'korean restaurant spicy pork',
    phone: '02-1234-5678',
    hours: '매일 11:00 - 21:00',
    hasGroupOrderExperience: true,
    comment: '저번 행사 때 반응 좋았음. 주문량 많아도 빠르게 준비해주심',
    tags: ['#두루치기', '#공대생맛집', '#단체주문'],
    naverPlaceUrl: '#'
  },
  {
    id: '2',
    name: '파스타공방',
    category: '양식',
    description: '#크림파스타 #단체할인',
    address: '서울시 관악구 관악로 567',
    imageUrl: 'italian pasta restaurant',
    phone: '02-2345-6789',
    hours: '매일 11:30 - 22:00 (브레이크타임 15:00-17:00)',
    hasGroupOrderExperience: true,
    comment: '15인분 이상 주문시 10% 할인. 여기 맛있음',
    tags: ['#크림파스타', '#단체할인', '#양식'],
    naverPlaceUrl: '#'
  },
  {
    id: '3',
    name: '동네 카페 그린',
    category: '카페',
    description: '#샌드위치 #브런치',
    address: '서울시 관악구 봉천로 890',
    imageUrl: 'cozy cafe sandwich brunch',
    phone: '02-3456-7890',
    hours: '평일 08:00 - 20:00 / 주말 09:00 - 21:00',
    hasGroupOrderExperience: false,
    comment: '샌드위치 단체주문 가능. 하루 전 예약 필수',
    tags: ['#샌드위치', '#브런치', '#카페'],
    naverPlaceUrl: '#'
  },
  {
    id: '4',
    name: '할매 김밥천국',
    category: '한식',
    description: '#김밥 #가성비',
    address: '서울시 관악구 신림로 345',
    imageUrl: 'korean kimbap gimbap restaurant',
    phone: '02-4567-8901',
    hours: '매일 07:00 - 22:00',
    hasGroupOrderExperience: true,
    comment: '가격 저렴하고 양 많음. 학생회 행사 때 자주 이용함',
    tags: ['#김밥', '#가성비', '#분식'],
    naverPlaceUrl: '#'
  },
  {
    id: '5',
    name: '치킨마루',
    category: '기타',
    description: '#치킨 #배달빠름',
    address: '서울시 관악구 남부순환로 678',
    imageUrl: 'korean fried chicken',
    phone: '02-5678-9012',
    hours: '매일 15:00 - 01:00',
    hasGroupOrderExperience: true,
    comment: '50마리까지 한번에 가능. 배달도 빠름',
    tags: ['#치킨', '#배달빠름', '#야식'],
    naverPlaceUrl: '#'
  },
  {
    id: '6',
    name: '피자스쿨',
    category: '양식',
    description: '#피자 #학생할인',
    address: '서울시 관악구 관악로 234',
    imageUrl: 'pizza restaurant margherita',
    phone: '02-6789-0123',
    hours: '매일 11:00 - 23:00',
    hasGroupOrderExperience: true,
    comment: '학생증 제시하면 추가 할인. 단체주문 유경험',
    tags: ['#피자', '#학생할인', '#양식'],
    naverPlaceUrl: '#'
  }
];
