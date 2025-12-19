import { TravelItem, TravelPackage } from './types';

export const CATEGORY_LABELS: Record<string, string> = {
  STAY: 'Accommodation',
  FOOD: 'Dining',
  EXPERIENCE: 'Experiences',
  TRANSPORT: 'Transport',
  SHOP: 'Shopping'
};

export const MOCK_ITEMS: TravelItem[] = [
  
  {
    id: 'h_tp_1',
    name: 'The Grand Hotel Taipei (圓山大飯店)',
    category: 'STAY',
    tags: ['Luxury', 'Historic', 'Landmark'],
    price: 5800,
    image: 'https://i.ibb.co/TMrShNJv/image.jpg',
    description: 'Iconic palace-style hotel with panoramic views of Taipei City.',
    rating: 4.8,
    lat: 25.0792,
    lng: 121.5264
  },
  
  {
    id: 'h_tp_2',
    name: 'W Taipei',
    category: 'STAY',
    tags: ['Modern', 'Nightlife', 'Pool'],
    price: 10500,
    image: 'https://i.ibb.co/Gvh0Pb3b/w.jpg',
    description: 'Chic hotel located in the heart of Xinyi District, right above the MRT.',
    rating: 4.7,
    lat: 25.0406,
    lng: 121.5658
  },
  {
    id: 'h_tp_3',
    name: 'Mandarin Oriental Taipei (東方文華)',
    category: 'STAY',
    tags: ['Ultra Luxury', 'Service', 'Elegant'],
    price: 13500,
    image: 'https://i.ibb.co/V0ryz2DK/image.webp',
    description: 'Setting a new standard for luxury hospitality in Taipei.',
    rating: 4.9,
    lat: 25.0560,
    lng: 121.5516
  },
  // ==========================================
  // [NEW] Lion Travel Partner Hotels (雄獅合作飯店)
  // ==========================================
  {
    id: 'h_tp_doubletree',
    name: 'DoubleTree by Hilton Taipei Zhongshan (中山逸林酒店)',
    category: 'STAY',
    tags: ['Hilton', 'Boutique', 'Cookie'],
    price: 4800,
    image: 'https://static.liontech.com.tw/hotelpics/TW/00108827/00108827_VIEW.jpg',
    description: 'Boutique hotel in the heart of Zhongshan District. Famous for their signature warm chocolate chip cookie welcome.',
    rating: 4.7,
    lat: 25.0519,
    lng: 121.5235
  },
  {
    id: 'h_tp_caesar_park',
    name: 'Caesar Park Hotel Taipei (台北凱撒大飯店)',
    category: 'STAY',
    tags: ['Station', 'Convenient', 'Classic'],
    price: 3200,
    image: 'https://static.liontech.com.tw/hotelpics/TW/TWTPEN06/TWTPEN06_02.jpg',
    description: 'Located directly opposite Taipei Main Station with direct MRT access. Unbeatable convenience for travelers.',
    rating: 4.5,
    lat: 25.0461,
    lng: 121.5160
  },
  {
    id: 'h_tp_mitsui',
    name: 'MGH Mitsui Garden Hotel Taipei (和苑三井花園)',
    category: 'STAY',
    tags: ['Japanese', 'Public Bath', 'New'],
    price: 4500,
    image: 'https://static.liontech.com.tw/hotelpics/TW/00308904/00308904_VIEW.jpg',
    description: 'Authentic Japanese hospitality in Taipei. Features a large Japanese-style public bathhouse for guests.',
    rating: 4.8,
    lat: 25.0418,
    lng: 121.5357
  },
  {
    id: 'h_tp_resonance',
    name: 'Hotel Resonance Taipei (台北時代寓所)',
    category: 'STAY',
    tags: ['Design', 'Hilton', 'Starbucks'],
    price: 5800,
    image: 'https://static.liontech.com.tw/hotelpics/TW/00308950/00308950_VIEW.jpg',
    description: 'Stylish design hotel under Hilton Tapestry Collection. Home to a stunning high-ceiling Starbucks on the ground floor.',
    rating: 4.8,
    lat: 25.0445,
    lng: 121.5233
  },
  // --- 以下為平價/高CP值精選 ---
  {
    id: 'h_tp_12',
    name: 'Caesar Metro Taipei (台北凱達大飯店)',
    category: 'STAY',
    tags: ['City View', 'Value', 'Family'],
    price: 3200,
    image: 'https://i.ibb.co/fYgR2C5S/image.jpg',
    description: 'High-rise hotel offering stunning city views and spacious rooms. Connected to Wanhua Station.',
    rating: 4.5,
    lat: 25.0336,
    lng: 121.4988
  },
  {
    id: 'h_tp_4',
    name: 'Star Hostel Taipei Main Station (信星青旅)',
    category: 'STAY',
    tags: ['Budget', 'Eco-friendly', 'Best Hostel'],
    price: 1500,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop',
    description: 'Award-winning hostel with a beautiful wooden lounge and lush plants.',
    rating: 4.9,
    lat: 25.0494,
    lng: 121.5173
  },
  {
    id: 'h_tp_5',
    name: 'Meander 1948 Hostel (漫步1948)',
    category: 'STAY',
    tags: ['Budget', 'Historic', 'Design'],
    price: 1200,
    image: 'https://i.ibb.co/NgGWtkv9/1984.jpg',
    description: 'Renovated from a 1948 historic building near DiHua street.',
    rating: 4.8,
    lat: 25.0504,
    lng: 121.5167
  },
  {
    id: 'h_tp_6',
    name: 'Roaders Hotel Taipei (路徒行旅)',
    category: 'STAY',
    tags: ['Fun', 'Snacks', 'Ximending'],
    price: 2200,
    image: 'https://i.ibb.co/TqPpDQjY/397601727.jpg',
    description: 'Playful hotel with a game room and 24h free snacks near Ximending.',
    rating: 4.6,
    lat: 25.0445,
    lng: 121.5103
  },
  {
    id: 'h_tp_7',
    name: 'Just Sleep Ximending (捷絲旅)',
    category: 'STAY',
    tags: ['Convenient', 'Modern', 'Chain'],
    price: 2800,
    image: 'https://i.ibb.co/DPvP9J7W/just-sleep.jpg',
    description: 'Reliable comfort located directly above Ximending shopping area.',
    rating: 4.6,
    lat: 25.0441,
    lng: 121.5085
  },
  {
    id: 'h_tp_8',
    name: 'Cho Hotel 3 (町記憶旅店3館)',
    category: 'STAY',
    tags: ['Retro', 'Memory', 'Cozy'],
    price: 2100,
    image: 'https://i.ibb.co/n8Nq2D52/image.jpg',
    description: 'Nostalgic design filled with memories. Great service and vibe.',
    rating: 4.8,
    lat: 25.0425,
    lng: 121.5065
  },
  
  {
    id: 'h_tp_10',
    name: 'Apartment 10F (公寓十樓)',
    category: 'STAY',
    tags: ['Local', 'Homestay', 'View'],
    price: 1800,
    image: 'https://i.ibb.co/mrQM79kV/image.jpg',
    description: 'A hidden gem near Taipei Main Station offering a cozy home vibe.',
    rating: 4.7,
    lat: 25.0468,
    lng: 121.5152
  },

  // ==========================================
  // 2. FOOD (美食：10間)
  // ==========================================
  // ==========================================
  // 2. FOOD (更多雄獅熱銷餐飲 - Round 2)
  // ==========================================
  // ==========================================
  // 2. FOOD (雄獅熱銷餐券/訂位/米其林套餐)
  // ==========================================
  
  {
    id: 'f_tp_regent',
    name: 'Regent Taipei Brasserie (晶華栢麗廳餐券)',
    category: 'FOOD',
    tags: ['Luxury', 'Buffet', 'Hotel'],
    price: 1680,
    image: 'https://i.ibb.co/Dfjm44CG/image.jpg', // 示意飯店用餐
    description: 'Top-tier 5-star hotel buffet featuring extensive seafood station and international cuisine.',
    rating: 4.8,
    lat: 25.0543,
    lng: 121.5244
  },
  {
    id: 'f_nt_goldentulip',
    name: 'Golden Tulip Fab Hotel Voucher (將捷金鬱金香餐券)',
    category: 'FOOD',
    tags: ['Buffet', 'River View', 'Instant'],
    price: 1188,
    image: 'https://cdn.liontravel.com/CTO/ETKT/PROD/G25000NQ1.jpg',
    description: 'Weekday lunch/dinner voucher for the Riverbank Restaurant. Enjoy dining with a stunning view of Tamsui River.',
    rating: 4.6,
    lat: 25.1762,
    lng: 121.4425
  },
  {
    id: 'f_tp_courtyard',
    name: 'Courtyard by Marriott Sunrise Dining (六福萬怡餐券)',
    category: 'FOOD',
    tags: ['Buffet', 'Hotel', 'Nangang'],
    price: 1350,
    image: 'https://cdn.liontravel.com/CTO/ETKT/PROD/G25000Q71.jpg',
    description: 'Sunrise All Day Dining buffet voucher. Features fresh seafood and international cuisine. Located at Nangang Station.',
    rating: 4.7,
    lat: 25.0521,
    lng: 121.6070
  },
  {
    id: 'f_tp_dtf_set',
    name: 'Din Tai Fung Exclusive Set (鼎泰豐雙人套餐)',
    category: 'FOOD',
    tags: ['Voucher', 'Michelin', 'Skip Line'],
    price: 1500,
    image: 'https://i.ibb.co/TF7Lzty/image.jpg',
    description: '[Lion Exclusive] Pre-ordered set menu includes Xiao Long Bao, Steamed Dumplings, and Fried Rice. Skip the ordering queue.',
    rating: 4.9,
    lat: 25.0335,
    lng: 121.5303
  },
  
  {
    id: 'f_tp_eatogether',
    name: 'Eatogether Buffet Voucher (饗食天堂餐券)',
    category: 'FOOD',
    tags: ['Buffet', 'All you can eat', 'Voucher'],
    price: 968,
    image: 'https://i.ibb.co/zW7YBHZJ/Klook.jpg', // 示意自助餐
    description: 'The most popular buffet in Taiwan. Unlimited fresh seafood, steak, and desserts.',
    rating: 4.7,
    lat: 25.0478,
    lng: 121.5171 // 京站店
  },
  {
    id: 'f_tp_marriott',
    name: 'Taipei Marriott Garden Kitchen (萬豪酒店餐券)',
    category: 'FOOD',
    tags: ['Semi-Buffet', 'Garden View', 'Luxury'],
    price: 1280,
    image: 'https://cdn.liontravel.com/CTO/ETKT/PROD/G210006N1.jpg',
    description: 'Garden Kitchen offers a stunning garden view with a semi-buffet style dining experience. Perfect for a relaxing lunch.',
    rating: 4.8,
    lat: 25.0781,
    lng: 121.5583
  },
  {
    id: 'f_tp_malah',
    name: 'Malah Hot Pot Voucher (馬辣頂級麻辣鍋)',
    category: 'FOOD',
    tags: ['Hot Pot', 'Spicy', 'Haagen-Dazs'],
    price: 898,
    image: 'https://i.ibb.co/nMcJ2bwq/image.jpg', // 示意火鍋
    description: 'Tourist favorite! All-you-can-eat spicy hot pot with unlimited Wagyu beef and Haagen-Dazs.',
    rating: 4.6,
    lat: 25.0436,
    lng: 121.5074 // 西門店
  },
  {
    id: 'f_tp_shinyeh',
    name: 'Shin Yeh Taiwanese Cuisine (欣葉台菜)',
    category: 'FOOD',
    tags: ['Traditional', 'Banquet', 'Authentic'],
    price: 1200,
    image: 'https://i.ibb.co/0dFQ6Dx/image.webp', // 示意台菜
    description: 'The standard for authentic Taiwanese cuisine. Signature dishes: Pan-fried Liver and Almond Tea.',
    rating: 4.7,
    lat: 25.0569,
    lng: 121.5235
  },

  {
    id: 'f_tp_ajoy',
    name: 'A Joy 101 Sky Buffet (饗 A Joy)',
    category: 'FOOD',
    tags: ['View', 'Premium', 'Reservation'],
    price: 3880,
    image: 'https://i.ibb.co/MyR3pRFf/a-joy.png', // 示意高空景觀
    description: 'Taiwan’s highest buffet restaurant located on the 86th floor of Taipei 101.',
    rating: 4.9,
    lat: 25.0339,
    lng: 121.5645
  },
  {
    id: 'f_tp_grand_tea',
    name: 'Grand Hotel Afternoon Tea (圓山下午茶)',
    category: 'FOOD',
    tags: ['History', 'Tea', 'Atmosphere'],
    price: 800,
    image: 'https://i.ibb.co/WNw3v9rw/image.webp', // 示意中式建築/茶
    description: 'Enjoy a relaxing afternoon tea buffet in the magnificent lobby of the historic Grand Hotel.',
    rating: 4.6,
    lat: 25.0792,
    lng: 121.5264
  },
  {
    id: 'f_nt_silks',
    name: 'Silks Palace National Palace Museum (故宮晶華)',
    category: 'FOOD',
    tags: ['Culture', 'Imperial', 'Photo'],
    price: 1500,
    image: 'https://i.ibb.co/yB8sghP9/image.jpg',
    description: 'Feast on the famous "Jade Cabbage" and "Meat-shaped Stone" made of real food.',
    rating: 4.7,
    lat: 25.1023,
    lng: 121.5485
  },
  {
    id: 'f_tp_thetop',
    name: 'The Top Yangmingshan (屋頂上)',
    category: 'FOOD',
    tags: ['Night View', 'Romance', 'Reservation'],
    price: 500,
    image: 'https://i.ibb.co/vC8GwyfW/the-top.jpg', // 示意夜景
    description: 'Guaranteed reservation service + set meal voucher for the most famous night view restaurant.',
    rating: 4.5,
    lat: 25.1328,
    lng: 121.5385
  }, // Fixed: Added missing comma
  {
    id: 'f_tp_lepalais',
    name: 'Le Palais - Michelin 3-Star (頤宮中餐廳)',
    category: 'FOOD',
    tags: ['Michelin 3-Star', 'Cantonese', 'Luxury'],
    price: 5000,
    image: 'https://i.ibb.co/WNRV0Cy8/image.jpg', // 示意奢華餐飲
    description: '[Guaranteed Reservation] Exclusive table booking for the only Michelin 3-star restaurant in Taiwan. Signature Roast Duck course.',
    rating: 5.0,
    lat: 25.0493,
    lng: 121.5178
  },
  {
    id: 'f_tp_ningxia_banquet',
    name: 'Ningxia Night Market Banquet (寧夏千歲宴)',
    category: 'FOOD',
    tags: ['Local', 'Group', 'Night Market'],
    price: 600,
    image: 'https://i.ibb.co/SDMC83cL/image.jpg',
    description: 'Skip the crowds! Sit at a round table and enjoy 20+ signature dishes from different Ningxia stalls served to you.',
    rating: 4.6,
    lat: 25.0568,
    lng: 121.5155
  },
  {
    id: 'f_tp_hyatt',
    name: 'Grand Hyatt Cafe (凱菲屋餐券)',
    category: 'FOOD',
    tags: ['Buffet', 'Hotel', 'International'],
    price: 1480,
    image: 'https://i.ibb.co/chz3zFD8/image.jpg', // 示意自助餐
    description: 'One of the most popular hotel buffets in Taipei. Fresh seafood, Indian curry station, and desserts.',
    rating: 4.7,
    lat: 25.0354,
    lng: 121.5623
  },
 
  {
    id: 'f_tp_maokong_tea',
    name: 'Yao Yue Teahouse Set (貓空邀月茶坊)',
    category: 'FOOD',
    tags: ['Tea', 'Mountain View', '24H'],
    price: 450,
    image: 'https://i.ibb.co/4RZNXX4Z/image.jpg', // 示意茶藝
    description: 'Relax in the mountains with a 24-hour tea brewing package. Includes high-mountain tea leaves and snacks.',
    rating: 4.5,
    lat: 24.9665,
    lng: 121.5878
  },
  {
    id: 'f_nt_redcastle',
    name: 'Tamsui Red Castle 1899 (淡水紅樓餐廳)',
    category: 'FOOD',
    tags: ['History', 'View', 'Sunset'],
    price: 800,
    image: 'https://i.ibb.co/fVpKyBN4/image.jpg', // 示意紅磚建築
    description: 'Dine in a century-old red brick mansion with a panoramic view of the Tamsui sunset.',
    rating: 4.4,
    lat: 25.1712,
    lng: 121.4421
  }, // Fixed: Added missing comma

  {
    id: 'f_nt_2',
    name: 'A-Mei Tea House (阿妹茶樓)',
    category: 'FOOD',
    tags: ['Tea', 'View', 'Jiufen'],
    price: 500,
    image: 'https://i.ibb.co/bMcX5CNr/image.webp',
    description: 'Iconic teahouse in Jiufen offering stunning ocean views.',
    rating: 4.7,
    lat: 25.1085,
    lng: 121.8443
  }, // Fixed: Added missing comma



  // ==========================================
  // 3. EXPERIENCE (體驗：10個)
  // ==========================================
 // ==========================================
  // 3. EXPERIENCE (雄獅精選付費體驗/票券)
  // ==========================================
  {
    id: 'e_tp_1',
    name: 'Taipei 101 Observatory (101觀景台)',
    category: 'EXPERIENCE',
    tags: ['Ticket', 'City View', 'Fast Pass'],
    price: 600,
    image: 'https://i.ibb.co/WWHQPJfP/101.jpg',
    description: 'Priority entry ticket to the top of Taiwan. Includes access to the 89F indoor deck.',
    rating: 4.8,
    lat: 25.0339,
    lng: 121.5645
  },
  {
    id: 'e_nt_1',
    name: 'Jiufen & Shifen Day Tour (九份十分一日遊)',
    category: 'EXPERIENCE',
    tags: ['Lion Bus', 'Guided Tour', 'Shuttle'],
    price: 850,
    image: 'https://i.ibb.co/Cp5YzW57/image.webp',
    description: '[Lion Exclusive] Round-trip shuttle bus tour visiting Jiufen Old Street and Shifen Waterfall.',
    rating: 4.7,
    lat: 25.1099,
    lng: 121.8452
  },
  {
    id: 'e_tp_bus_food',
    name: 'Taipei Restaurant Bus (雙層餐車)',
    category: 'EXPERIENCE',
    tags: ['Fine Dining', 'Sightseeing', 'Exclusive'],
    price: 1800,
    image: 'https://i.ibb.co/MDM5jDzZ/image.jpg', // 示意雙層巴士
    description: 'Enjoy a 5-star gourmet meal while touring Taipei famous landmarks on a glass-roof bus.',
    rating: 4.9,
    lat: 25.0410,
    lng: 121.5650
  },
  {
    id: 'e_tp_spring',
    name: 'Grand View Resort Beitou (北投麗禧湯屋)',
    category: 'EXPERIENCE',
    tags: ['Hot Spring', 'Private', 'Luxury'],
    price: 2500,
    image: 'https://i.ibb.co/TMmj6ZJc/image.jpg',
    description: '90-minute private hot spring room experience in the most premium resort in Beitou.',
    rating: 4.8,
    lat: 25.1365,
    lng: 121.5063
  },
  {
    id: 'e_tp_iride',
    name: 'i-Ride Taipei Flying Cinema (飛行劇院)',
    category: 'EXPERIENCE',
    tags: ['VR', 'Indoor', 'Family'],
    price: 480,
    image: 'https://i.ibb.co/Q3PBKJ1G/image.jpg', // 示意 VR/科技
    description: 'Immersive 5D flying experience. Fly over Taiwan stunning landscapes.',
    rating: 4.7,
    lat: 25.0345,
    lng: 121.5645
  },
  {
    id: 'e_tp_npm',
    name: 'National Palace Museum Ticket (故宮門票)',
    category: 'EXPERIENCE',
    tags: ['Ticket', 'History', 'Audio Guide'],
    price: 350,
    image: 'https://i.ibb.co/DfXz4t8q/image.avif',
    description: 'Skip-the-line e-ticket for the largest collection of Chinese artifacts.',
    rating: 4.7,
    lat: 25.1023,
    lng: 121.5485
  },
  
  {
    id: 'e_tp_miramar',
    name: 'Miramar Ferris Wheel (美麗華摩天輪)',
    category: 'EXPERIENCE',
    tags: ['Night View', 'Romantic', 'Ticket'],
    price: 200,
    image: 'https://i.ibb.co/SXQbZzb7/image.jpg',
    description: 'Ride the iconic green Ferris wheel for a stunning night view of Taipei.',
    rating: 4.5,
    lat: 25.0835,
    lng: 121.5574
  },
  {
    id: 'e_tp_101_skyline',
    name: 'Taipei 101 Skyline 460 (101天際線雲端漫步)',
    category: 'EXPERIENCE',
    tags: ['Adventure', 'Highest View', 'Photo'],
    price: 3000,
    image: 'https://cdn.liontravel.com/CTO/ETKT/PROD/G250004R1.jpg',
    description: 'Walk on the outdoor deck at 460m height! The highest outdoor platform in Asia. Includes fast-pass entry.',
    rating: 5.0,
    lat: 25.0339,
    lng: 121.5645
  },
  {
    id: 'e_tp_massage',
    name: 'Six Star Foot Massage (六星級按摩券)',
    category: 'EXPERIENCE',
    tags: ['Wellness', 'Relax', 'Voucher'],
    price: 1100,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop',
    description: '60-minute professional foot and shoulder massage voucher.',
    rating: 4.8,
    lat: 25.0478,
    lng: 121.5318
  },
  {
    id: 'e_tp_kagaya',
    name: 'Radium Kagaya Hot Spring (日勝生加賀屋溫泉)',
    category: 'EXPERIENCE',
    tags: ['Hot Spring', 'Japanese', 'Luxury', 'Beitou'],
    price: 1320,
    image: 'https://cdn.liontravel.com/CTO/ETKT/PROD/G21003ZI1.jpg',
    description: 'Authentic Japanese Onsen experience in Beitou. Choose between the Public Pool or Private Bathhouse with impeccable service.',
    rating: 5.0,
    lat: 25.1368,
    lng: 121.5065
  },
  {
    id: 'e_tp_diy',
    name: 'Kuo Yuan Ye Pastry DIY (郭元益糕餅DIY)',
    category: 'EXPERIENCE',
    tags: ['Culture', 'Family', 'Workshop'],
    price: 400,
    image: 'https://i.ibb.co/vCbzvSsb/image.jpg', // 示意糕餅
    description: 'Hands-on experience making traditional Taiwanese pineapple cakes.',
    rating: 4.6,
    lat: 25.0934,
    lng: 121.5253
  },
  // ==========================================
  // 3. EXPERIENCE (更多雄獅熱銷付費元件 - Round 2)
  // ==========================================
  {
    id: 'e_tp_funpass',
    name: 'Taipei Fun Pass: Unlimited (北北基好玩卡)',
    category: 'EXPERIENCE',
    tags: ['Pass', 'Transport', 'Value'],
    price: 1500,
    image: 'https://i.ibb.co/Vc7w3Stw/image.jpg', // 示意卡片/交通
    description: '[Best Seller] Unlimited MRT/Bus rides + Entry to 25 top attractions (101, Palace Museum, etc.) for 3 days.',
    rating: 4.9,
    lat: 25.0416,
    lng: 121.5150 // Taipei Main Station
  },
  {
    id: 'e_tp_kids',
    name: 'Taipei Children’s Amusement Park Pass (兒童新樂園)',
    category: 'EXPERIENCE',
    tags: ['Family', 'Kids', 'Theme Park'],
    price: 200,
    image: 'https://i.ibb.co/NddtP0Wb/image.jpg',
    description: 'One-day pass with unlimited access to 13 major rides. Great for families.',
    rating: 4.6,
    lat: 25.0970,
    lng: 121.5147
  },
  {
    id: 'e_nt_indigo',
    name: 'Sanxia Indigo Dyeing Workshop (三峽藍染DIY)',
    category: 'EXPERIENCE',
    tags: ['Culture', 'DIY', 'Art'],
    price: 350,
    image: 'https://i.ibb.co/rG7LZtx7/image.jpg', // 示意布料/染織
    description: 'Experience the traditional Hakka art of indigo dyeing in the historic Sanxia Old Street.',
    rating: 4.7,
    lat: 24.9344,
    lng: 121.3698
  },
  {
    id: 'e_nt_paraglide',
    name: 'Wanli Paragliding Experience (萬里飛行傘)',
    category: 'EXPERIENCE',
    tags: ['Adventure', 'Sky', 'Adrenaline'],
    price: 2500,
    image: 'https://i.ibb.co/vvhLQzws/image.jpg', // 示意飛行傘
    description: 'Soar over the North Coast with an instructor and enjoy breathtaking ocean views.',
    rating: 4.9,
    lat: 25.1835,
    lng: 121.6885
  },
  {
    id: 'e_tp_mini',
    name: 'Miniatures Museum of Taiwan (袖珍博物館)',
    category: 'EXPERIENCE',
    tags: ['Indoor', 'Art', 'Ticket'],
    price: 250,
    image: 'https://i.ibb.co/G4h9xZCT/image.jpg', // 示意微縮模型
    description: 'Asia first museum dedicated to contemporary miniatures. A hidden gem in Taipei.',
    rating: 4.6,
    lat: 25.0513,
    lng: 121.5350
  },
{
    id: 'e_nt_shilin',
    name: 'Chiang Kai-shek Shilin Residence (士林官邸)',
    category: 'EXPERIENCE',
    tags: ['History', 'Garden', 'Ticket'],
    price: 100,
    image: 'https://i.ibb.co/R4kst4CL/image.jpg',
    description: 'Entry ticket to the main residence building of the former President, surrounded by beautiful gardens.',
    rating: 4.5,
    lat: 25.0945,
    lng: 121.5295
  },
  {
    id: 'e_nt_yehliu',
    name: 'Yehliu Geopark Ticket (野柳門票)',
    category: 'EXPERIENCE',
    tags: ['Ticket', 'Nature', 'Must Visit'],
    price: 120,
    image: 'https://i.ibb.co/HDQTQG1x/image.jpg',
    description: 'Entry ticket to see the famous Queen’s Head rock formation.',
    rating: 4.6,
    lat: 25.2064,
    lng: 121.6905
  },
  

  // ==========================================
  // 4. TRANSPORT (交通：10個)
  // ==========================================
  {
    id: 't_tp_pickup',
    name: 'Private Airport Transfer (機場專車接送)',
    category: 'TRANSPORT',
    tags: ['Private', 'Luxury', 'Door-to-Door'],
    price: 1200,
    image: 'https://i.ibb.co/dwMm1JCw/image.jpg', // 示意轎車
    description: 'Hassle-free private sedan transfer from Taoyuan Airport directly to your hotel lobby.',
    rating: 4.8,
    lat: 25.0797,
    lng: 121.2342
  },
 
  {
    id: 't_tw_pass_classic',
    name: 'Taiwan PASS TRA Classic (Taiwan PASS 台鐵經典版)',
    category: 'TRANSPORT',
    tags: ['TRA', 'MRT', 'Island-wide'],
    price: 3200,
    image: 'https://cdn.liontravel.com/CTO/ETKT/PROD/G240015Z1.jpg',
    description: 'Unlimited 5-day travel on Taiwan Railways (TRA), plus access to 4 major Metro systems and Taiwan Tourist Shuttles.',
    rating: 5.0,
    lat: 25.0478,
    lng: 121.5171 // 設定在台北車站 (交通樞紐)
  },
  {
    id: 'e_tp_funpass_unlimited',
    name: 'Taipei Fun Pass: Unlimited (北北基好玩卡|無限暢遊)',
    category: 'EXPERIENCE', // 這張卡同時包含交通與景點，可放在體驗或交通
    tags: ['Pass', 'Transport', 'Attractions'],
    price: 1500, // 參考一般售價，可依實際調整
    image: 'https://cdn.liontravel.com/CTO/ETKT/PROD/G22003901.jpg',
    description: '[Best Seller] Unlimited rides on MRT/Bus + Entry to 25 top attractions (101, Palace Museum, etc.).',
    rating: 4.9,
    lat: 25.0416,
    lng: 121.5150
  },
  {
    id: 't_tp_mrt_pass',
    name: 'Taipei MRT 48-Hour Pass (捷運48小時券)',
    category: 'TRANSPORT',
    tags: ['Metro', 'Unlimited', 'City'],
    price: 280,
    image: 'https://i.ibb.co/M4LnxN0/image.png',
    description: 'Unlimited travel on Taipei Metro for 2 consecutive days. Best value for city explorers.',
    rating: 4.9,
    lat: 25.0462,
    lng: 121.5175
  },
    {
    id: 't_tp_gondola',
    name: 'Maokong Gondola Ticket (貓空纜車套票)',
    category: 'TRANSPORT',
    tags: ['Cable Car', 'Scenic', 'Mountain'],
    price: 260,
    image: 'https://i.ibb.co/RwMCVqR/image.jpg',
    description: 'Round-trip gondola ticket + Taipei Zoo entry ticket combo.',
    rating: 4.5,
    lat: 24.9961,
    lng: 121.5763
  },
  {
    id: 't_tp_charter',
    name: '[Lion Exclusive] Private Car Charter 8H (包車一日遊)',
    category: 'TRANSPORT',
    tags: ['Private', 'Comfort', 'Custom'],
    price: 4500,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=600&auto=format&fit=crop',
    description: 'Flexible private driver for a full day tour (8 hours) around Taipei or New Taipei.',
    rating: 4.7,
    lat: 25.0478,
    lng: 121.5171
  },
  {
    id: 't_nt_shuttle',
    name: 'Jiufen Shuttle Bus (九份接駁專車)',
    category: 'TRANSPORT',
    tags: ['Shuttle', 'Direct', 'Cheap'],
    price: 480,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=600&auto=format&fit=crop',
    description: 'Direct shuttle bus from Ximen to Jiufen Old Street. Guaranteed seat, no standing.',
    rating: 4.5,
    lat: 25.0422,
    lng: 121.5080
  },

  {
    id: 't_tp_mrt_airport',
    name: 'Taoyuan Airport MRT Ticket (機捷單程票)',
    category: 'TRANSPORT',
    tags: ['Airport', 'Ticket', 'Fast'],
    price: 150,
    image: 'https://i.ibb.co/6JZTyfkc/image.jpg',
    description: 'Discounted e-ticket connecting TPE Airport to Taipei Main Station in 35 mins.',
    rating: 4.8,
    lat: 25.0614,
    lng: 121.2323
  }, // Fixed: Added missing comma



  {
    id: 't_nt_car_rental',
    name: '24H Car Rental Voucher (24小時租車券)',
    category: 'TRANSPORT',
    tags: ['Self-drive', 'Freedom', 'New Taipei'],
    price: 1600,
    image: 'https://i.ibb.co/k6QKJ9n3/image.avif', // 示意租車
    description: 'Explore the North Coast at your own pace. Pickup available at Taipei Main Station.',
    rating: 4.6,
    lat: 25.0478,
    lng: 121.5171
  },

  // ==========================================
  // 5. SHOP (購物：10個)
  // ==========================================
  // ==========================================
  // 5. SHOP (雄獅嚴選伴手禮/免稅店/獨家優惠)
  // ==========================================
  {
    id: 's_tp_chiate_box',
    name: '[Pre-order] Chia Te Pineapple Cake (佳德鳳梨酥)',
    category: 'SHOP',
    tags: ['Lion Select', 'Airport Pickup', 'Must Buy'],
    price: 380,
    image: 'https://i.ibb.co/tT2SKYdm/image.jpg',
    description: 'Skip the long queues! Pre-order the award-winning pineapple cakes and pick up at Taoyuan Airport before your flight.',
    rating: 4.9,
    lat: 25.0515,
    lng: 121.5606 // 雖然是預購，還是可以標示本店位置
  },
  {
    id: 's_tp_101_gift',
    name: 'Taipei 101 Limited Souvenirs (101紀念品)',
    category: 'SHOP',
    tags: ['Landmark', 'Exclusive', 'Design'],
    price: 890,
    image: 'https://i.ibb.co/8nNZ3J2T/101.jpg', // 示意 101
    description: 'Official 101 Damper Baby merchandise and 3D puzzles. Only available at the observatory shop.',
    rating: 4.4,
    lat: 25.0339,
    lng: 121.5645
  },
  {
    id: 's_tp_sugar_spice',
    name: '[Delivery] Sugar & Spice Nougat (糖村牛軋糖)',
    category: 'SHOP',
    tags: ['Souvenir', 'Delivery to Hotel', 'Sweets'],
    price: 350,
    image: 'https://i.ibb.co/9k6qwMdv/image.jpg',
    description: 'Famous French Nougat delivered directly to your hotel. Creamy, chewy, and perfect for gifts.',
    rating: 4.7,
    lat: 25.0416,
    lng: 121.5502
  },
  {
    id: 's_tp_everrich',
    name: 'Everrich Neihu Flagship Store (昇恆昌免稅店)',
    category: 'SHOP',
    tags: ['Duty Free', 'Luxury', 'Free Shuttle'],
    price: 0,
    image: 'https://i.ibb.co/vCm6KzPx/image.jpg', // 示意精品
    description: '[Lion Exclusive] Book a free taxi ride to the flagship store + Get a NT$500 shopping voucher.',
    rating: 4.8,
    lat: 25.0633,
    lng: 121.5768
  },

  {
    id: 's_tp_kavalan',
    name: '[Airport Pickup] Kavalan Solist Whisky (葛瑪蘭)',
    category: 'SHOP',
    tags: ['Alcohol', 'Award Winning', 'Gift'],
    price: 3500,
    image: 'https://i.ibb.co/JjMZLrwR/image.jpg',
    description: 'World best single malt whisky. Buy online now to ensure stock availability and easy airport collection.',
    rating: 4.9,
    lat: 25.0339,
    lng: 121.5645 // 101展售店
  },
  {
    id: 's_tp_kuai',
    name: 'Kuai Che Pork Paper (快車肉乾)',
    category: 'SHOP',
    tags: ['Snack', 'Crispy', 'Souvenir'],
    price: 220,
    image: 'https://i.ibb.co/F4xZmkyM/image.webp', // 示意肉乾
    description: 'Paper-thin crispy pork jerky. The most addictive snack in Taipei. 3-pack bundle offer.',
    rating: 4.6,
    lat: 25.0331,
    lng: 121.5295
  },
  {
    id: 's_nt_yingge',
    name: 'Yingge Ceramics Street DIY (鶯歌陶藝)',
    category: 'SHOP',
    tags: ['Craft', 'Souvenir', 'DIY'],
    price: 450,
    image: 'https://i.ibb.co/79F4Xmq/image.jpg',
    description: 'Make your own pottery cup + NT$200 shopping credit at the Old Street ceramics shop.',
    rating: 4.6,
    lat: 24.9543,
    lng: 121.3496
  },
  {
    id: 's_tp_tea_gift',
    name: 'Wang De Chuan Tea Set (王德傳茶莊)',
    category: 'SHOP',
    tags: ['Tea', 'Premium', 'Gift'],
    price: 1280,
    image: 'https://i.ibb.co/nWxtt2c/image.jpg', // 示意茶葉
    description: 'Premium Oolong tea gift box in iconic red canisters. A symbol of Taiwanese hospitality.',
    rating: 4.8,
    lat: 25.0523,
    lng: 121.5234
  },
  
  {
    id: 's_tp_hiwalk',
    name: '[Delivery] HiWalk Peanut Egg Rolls (海邊走走)',
    category: 'SHOP',
    tags: ['Trendy', 'Souvenir', 'Delivery'],
    price: 480,
    image: 'https://i.ibb.co/Fbbw2jtf/image.jpg', // 示意蛋捲
    description: 'The most popular thick egg rolls with peanut filling. Delivered to your hotel to save luggage space.',
    rating: 4.8,
    lat: 25.0428,
    lng: 121.5064 // 西門旗艦店
  },
  {
    id: 's_tp_yuan_soap',
    name: 'Yuan Skincare Gift Set (阿原肥皂)',
    category: 'SHOP',
    tags: ['Organic', 'Wellness', 'Gift'],
    price: 1280,
    image: 'https://i.ibb.co/0gvmSgN/image.jpg', // 示意手工皂
    description: 'Taiwanese herbal handmade soap. The "Peace & Health" gift set is the perfect souvenir for elders.',
    rating: 4.7,
    lat: 25.0558,
    lng: 121.5098 // 迪化街店
  },
  {
    id: 's_tp_wooderful',
    name: 'Wooderful Life DIY Music Box (知音文創)',
    category: 'SHOP',
    tags: ['Craft', 'Wood', 'Cute'],
    price: 1500,
    image: 'https://i.ibb.co/Ngd0ryXc/image.jpg', // 示意木製玩具
    description: 'Pick parts and assemble your own wooden music box. A hit with families and couples.',
    rating: 4.9,
    lat: 25.0442,
    lng: 121.5294 // 華山店
  },
 
  {
    id: 's_nt_popcorn',
    name: 'Magi Planet Popcorn (星球工坊爆米花)',
    category: 'SHOP',
    tags: ['Snack', 'Award Winning', 'Bundle'],
    price: 600,
    image: 'https://i.ibb.co/FL2SpcWZ/image.webp',
    description: 'Taiwan No.1 popcorn brand. Corn Soup and Cane Sugar flavors are tourist favorites. 4-pack bundle.',
    rating: 4.5,
    lat: 25.0339,
    lng: 121.5645 // 101櫃位
  }
];

// --- 3 TIERED PACKAGES ---

// ==========================================
// 3 TIERED PACKAGES (三大主題行程)
// ==========================================

export const MOCK_PACKAGES: TravelPackage[] = [
  {
    id: 'pkg_budget',
    title: 'Budget Explorer (小資探索)',
    subTitle: 'Best for Backpackers',
    pricePerPerson: 6500,
    tags: ['Value', 'Hostel', 'Street Food'],
    image: 'https://i.ibb.co/4n2tgsmr/image.jpg',
    description: 'Experience authentic Taipei on a budget. Stay in top-rated hostels, travel via unlimited MRT pass, and enjoy the best street food.',
    items: [
      // Day 1: 抵達 & 西門町美食
      { itemId: 't_tp_mrt_pass', day: 1, startTime: '09:00' }, // [雄獅票券] 捷運48小時無限搭乘
      { itemId: 'h_tp_4', day: 1, startTime: '15:00' }, // Star Hostel (平價青旅首選)
      { itemId: 'f_tp_malah', day: 1, startTime: '19:00' }, // [餐券] 馬辣頂級麻辣鍋 (高CP值吃到飽)
      
      // Day 2: 經典地標 & 文化
      { itemId: 'e_tp_1', day: 2, startTime: '10:00' }, // [門票] 101 觀景台
      { itemId: 'f_tp_ningxia_banquet', day: 2, startTime: '18:00' }, // [預訂] 寧夏千歲宴 (免排隊吃遍夜市)
      { itemId: 'h_tp_4', day: 2, startTime: '21:00' }, // Star Hostel
    ]
  },
  {
    id: 'pkg_classic',
    title: 'Classic Taipei (經典台北)',
    subTitle: 'Most Popular',
    pricePerPerson: 18000,
    tags: ['Standard', 'Family', 'Must-Visit'],
    image: 'https://i.ibb.co/DgwGJVMF/image.jpg',
    description: 'The perfect balance of comfort and adventure. Includes a guided day tour to Jiufen, guaranteed Din Tai Fung seats, and comfortable hotel stays.',
    items: [
      // Day 1: 舒適入住 & 鼎泰豐
      { itemId: 't_tp_mrt_airport', day: 1, startTime: '10:00' }, // [票券] 機捷單程優惠票
      { itemId: 'h_tp_12', day: 1, startTime: '15:00' }, // Caesar Metro (凱達大飯店 - 高CP值中價位)
      { itemId: 'f_tp_dtf_set', day: 1, startTime: '18:00' },  // [雄獅獨家] 鼎泰豐雙人套餐 (快速通關免排隊)
      
      // Day 2: 九份十分一日遊
      { itemId: 'e_nt_1', day: 2, startTime: '09:00' },  // [雄獅巴士] 九份十分一日遊 (含導遊接送)
      { itemId: 's_tp_chiate_box', day: 2, startTime: '17:00' },  // [預購] 佳德鳳梨酥 (機場取貨，不佔行李)
      { itemId: 'h_tp_12', day: 2, startTime: '20:00' }, // Caesar Metro
      
      // Day 3: 文化與放鬆
      { itemId: 'e_tp_npm', day: 3, startTime: '10:00' }, // [門票] 故宮博物院
      { itemId: 'e_tp_massage', day: 3, startTime: '14:00' }, // [票券] 六星集按摩券
    ]
  },
  {
    id: 'pkg_luxury',
    title: 'Luxury Elite (尊榮奢華)',
    subTitle: 'Premium Experience',
    pricePerPerson: 45000,
    tags: ['5-Star', 'Private Car', 'Fine Dining'],
    image: 'https://i.ibb.co/gZTwD3m2/image.jpg',
    description: 'Experience Taipei in ultimate style. Stay at the Mandarin Oriental, enjoy private car charters, and dine at Michelin 3-star restaurants.',
    items: [
      // Day 1: 專車接送 & 雙層餐車
      { itemId: 't_tp_pickup', day: 1, startTime: '13:00' }, // [專車] 機場賓士接送
      { itemId: 'h_tp_3', day: 1, startTime: '15:00' }, // Mandarin Oriental (文華東方)
      { itemId: 'e_tp_bus_food', day: 1, startTime: '18:00' }, // [獨家] 台北雙層餐車晚餐
      
      // Day 2: 包車遊覽 & 米其林三星
      { itemId: 't_tp_charter', day: 2, startTime: '09:00' }, // [雄獅包車] 8小時私人嚮導
      { itemId: 'e_tp_spring', day: 2, startTime: '15:00' }, // [頂級] 北投麗禧溫泉湯屋
      { itemId: 'f_tp_lepalais', day: 2, startTime: '19:00' }, // [保留位] 頤宮中餐廳 (米其林三星)
      { itemId: 'h_tp_3', day: 2, startTime: '22:00' }, // Mandarin Oriental

      // Day 3: 101 精品購物 & 威士忌
      { itemId: 's_tp_101_gift', day: 3, startTime: '11:00' }, // 101 官方紀念品
      { itemId: 's_tp_kavalan', day: 3, startTime: '14:00' }, // [預購] 葛瑪蘭威士忌 (機場提貨)
    ]
  }
];