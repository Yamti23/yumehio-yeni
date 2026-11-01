export interface DanLevel {
  level: number;
  japaneseTitle: string;
  turkishTitle: string;
  beltColor: string;
  duration: string;
  prerequisites: string;
  description: string;
  authorization: string;
  keyTopics: string[];
}

export interface KataTechnique {
  id: number;
  kataNumber: string;
  japaneseName: string;
  turkishName: string;
  category: 'pelvis' | 'spine' | 'lower_extremity' | 'cervical' | 'visceral';
  description: string;
  anatomicalTarget: string;
  benefit: string;
}

export interface UpcomingSeminar {
  id: string;
  title: string;
  danLevel: string;
  city: string;
  venue: string;
  dates: string;
  hours: string;
  instructor: string;
  seatsLeft: number;
  totalSeats: number;
  status: 'open' | 'limited' | 'full';
}

export interface VerifiedCertificate {
  certNumber: string;
  fullName: string;
  danLevel: string;
  danRank: number;
  japaneseRank: string;
  issuedDate: string;
  instructor: string;
  city: string;
  status: 'Aktif Terapist' | 'Usta Eğitmen' | 'Klinik Uygulayıcı' | 'Geçerli';
  validUntil: string;
  specialization: string;
  securityHash: string;
}

export const REPRESENTATIVE_INFO = {
  name: "Ali Gökmen Düzgün",
  title: "Yumeiho Federasyonu Türkiye Temsilcisi",
  role: "Resmi Yetkili Eğitmen & Terapist",
  federation: "Uluslararası Yumeiho Merkezi (International Yumeiho Centre)",
  founderLineage: "Masayuki Saionji Ekolü",
  centerLocation: "Kadıköy / İstanbul & Türkiye Geneli Eğitimler",
  phone: "+90 (532) 123 45 67",
  whatsapp: "+905321234567",
  email: "yamtist@gmail.com",
  experienceYears: 18,
  bio: `Ali Gökmen Düzgün, Uluslararası Yumeiho Federasyonu'nun Türkiye resmi temsilcisidir. Yıllardır binlerce danışana duruş bozukluğu, skolyoz, bel ve boyun fıtığı alanında şifa sağlayan manuel terapi seansları yürütmüş; aynı zamanda yüzlerce fizyoterapist, osteopat ve masaj terapistini uluslararası Yumeiho Dan sertifikasyon programlarıyla meslektaş olarak yetiştirmiştir.`,
  mission: `Amacımız; Japonya menşeili bu kadim ve bilimsel olarak kanıtlanmış pelvis düzeltici manuel terapi yöntemini Türkiye'de en saf, etik ve uluslararası standartlarda temsil etmek, güvenilir uygulayıcılar yetiştirmektir.`
};

export const DAN_LEVELS: DanLevel[] = [
  {
    level: 1,
    japaneseTitle: "1. Dan (Kihon - 初段)",
    turkishTitle: "Temel Düzey Uygulayıcı",
    beltColor: "Sarı Kuşak",
    duration: "4 Günlük Yoğun Atölye (32 Saat)",
    prerequisites: "Anatomi merakı, fizyoterapistler, masörler veya istekli adaylar",
    description: "Yumeiho'nun omurgasını oluşturan 100 Temel Kata'nın öğrenilmesi, pelvis simetri kontrolü ve temel tam vücut seansının uygulanması.",
    authorization: "1. Dan sertifikası ile sağlıklı bireylerde koruyucu ve dengeleyici temel Yumeiho seansı uygulama hakkı.",
    keyTopics: [
      "Pelvis (Leğen Kemiği) Teorisi ve Biyomekanik",
      "100 Temel Kata'nın Adım Adım Pratiği",
      "Bacak Boyu Eşitsizliği ve Palpasyon Muayenesi",
      "Kontrendikasyonlar ve Güvenli Manuel Bası Prensipleri"
    ]
  },
  {
    level: 2,
    japaneseTitle: "2. Dan (Chukyu - 二段)",
    turkishTitle: "İleri Düzey Terapist",
    beltColor: "Yeşil Kuşak",
    duration: "4 Günlük İleri Düzey Eğitim (32 Saat)",
    prerequisites: "1. Dan sertifikasını tamamlamış olmak ve en az 3 ay pratik",
    description: "Patolojik durumlara (skolyoz, kifoz, fıtıklar, siyatik) özel terapi protokolleri, derin doku manuplasyonları ve eklem çekme teknikleri.",
    authorization: "Özel kas-iskelet rahatsızlığı olan danışanlarda hedef odaklı terapi yürütme yetkisi.",
    keyTopics: [
      "Omurga Deformiteleri (Skolyoz & Kifoz) Terapi Stratejileri",
      "Sakroiliak Eklem Kilitlenmelerinin Manuel Çözümü",
      "Boyun ve Bel Bölgesi Özel Çekme/Traksiyon Yöntemleri",
      "Klinik Vaka Takibi ve Seans Planlaması"
    ]
  },
  {
    level: 3,
    japaneseTitle: "3. Dan (Jokyu - 三段)",
    turkishTitle: "Yetkili Uzman Terapist & Asistan Eğitmen",
    beltColor: "Kahverengi Kuşak",
    duration: "Klinik Staj & İleri Seviye Sınav",
    prerequisites: "2. Dan sonrası en az 1 yıl aktif klinik uygulama",
    description: "Yumeiho felsefesinin tam kavranması, karmaşık vakaların yönetimi ve federasyon seminerlerinde asistan eğitmenlik hakkı.",
    authorization: "Bağımsız Yumeiho Terapi Merkezi açma ve seminerlerde asistanlık yapma akreditasyonu.",
    keyTopics: [
      "Karmaşık Postür Bozukluklarında Çok Katmanlı Düzeltme",
      "İç Organ Refleks Basıları (Hara / Karın Masajı Entegrasyonu)",
      "1. ve 2. Dan Öğrencilerine Süpervizyon ve Mentörlük",
      "Uluslararası Federasyon Standartlarında Etik Kodlar"
    ]
  },
  {
    level: 4,
    japaneseTitle: "4. Dan (Shihan Dai - 四段)",
    turkishTitle: "Eğitmen & Sınav Komisyoneri",
    beltColor: "Siyah Kuşak (1 Çizgili)",
    duration: "Özel Federasyon Süpervizyonu",
    prerequisites: "3. Dan ve Türkiye Temsilciliği onaylı en az 2 yıl eğitici deneyim",
    description: "1. ve 2. Dan seviyelerinde resmi sertifikalı eğitim düzenleme ve federasyon adına sınav yapabilme yetkisi.",
    authorization: "Resmi Yumeiho Kursu düzenleme ve uluslararası diploma talep etme yetkisi.",
    keyTopics: [
      "Pedagojik Eğitim Metotları ve Kata Eğitmenliği",
      "Öğrenci Değerlendirme ve Sınav Protokolleri",
      "Federasyon Temsilciliği ile Ortak Seminer Yönetimi"
    ]
  },
  {
    level: 5,
    japaneseTitle: "5. Dan (Shihan - 五段)",
    turkishTitle: "Usta Eğitmen & Temsilcilik Derecesi",
    beltColor: "Siyah Kuşak (Usta İşlemeli)",
    duration: "Uluslararası Komite Ataması",
    prerequisites: "Federasyon Temsilcisi Ali Gökmen Düzgün düzeyinde uluslararası onay",
    description: "Yumeiho tekniğini ulusal düzeyde yayma, 3. Dan dahil sınav yapma ve uluslararası federasyonu temsil etme yetkisi.",
    authorization: "Ülke genelinde Yumeiho Federasyonu'nu temsil etme ve 1-3. Dan diplomalarını onaylama hakkı.",
    keyTopics: [
      "Ülke Temsilciliği Yönetimi ve Akreditasyon",
      "Uluslararası Yumeiho Kongrelerinde Temsil",
      "Usta Düzeyinde Klinik Araştırmalar ve Vaka Sunumları"
    ]
  }
];

export const KATA_SAMPLE_LIST: KataTechnique[] = [
  {
    id: 1,
    kataNumber: "Kata #01-08",
    japaneseName: "Kotsuban Chosei",
    turkishName: "Pelvis ve Sakroiliak Düzeltme",
    category: "pelvis",
    description: "Leğen kemiğinin öne, arkaya veya yukarı kaymalarını düzelten, tüm Yumeiho'nun temel taşı olan ana mobilizasyon dizisi.",
    anatomicalTarget: "Sakroiliak eklem, İlium, Sakrum ve Piriformis kası",
    benefit: "Bacak boyu eşitsizliğini giderir, omurga temelini yeniden dengeler."
  },
  {
    id: 2,
    kataNumber: "Kata #09-24",
    japaneseName: "Seikotsu Shiatsu",
    turkishName: "Omurga Boyunca Ritmik Dikey Bası",
    category: "spine",
    description: "Paravertebral kaslar boyunca iki elin başparmakları ve avuç içiyle uygulanan ritmik, kademeli derin basınç.",
    anatomicalTarget: "Torakal & Lomber Erector Spinae kasları, faset eklemler",
    benefit: "Omurlar arası sıkışmayı azaltır, sinir kökü baskılarını hafifletir."
  },
  {
    id: 3,
    kataNumber: "Kata #25-42",
    japaneseName: "Kashi Chosei",
    turkishName: "Alt Ekstremite ve Bacak Traksiyonu",
    category: "lower_extremity",
    description: "Kalça eklemi, diz ve ayak bileği eklemlerinin nazik rotasyonu ve kontrollü çekme hareketleri.",
    anatomicalTarget: "Femur başı, Asetabulum, Hamstring ve Kuadriseps",
    benefit: "Kalça sıkışmasını önler, diz kıkırdak yükünü dengeler, siyatik ağrısını dindirir."
  },
  {
    id: 4,
    kataNumber: "Kata #43-68",
    japaneseName: "Keitsui & Kata Mobilizasyonu",
    turkishName: "Boyun, Kürek Kemiği ve Omuz Hizalama",
    category: "cervical",
    description: "Oturur veya yüzüstü pozisyonda servikal omurganın nazikçe esnetilmesi ve skapula çevresi yapışıklıkların açılması.",
    anatomicalTarget: "C1-C7 servikal vertebralar, Trapezius ve Rhomboid kasları",
    benefit: "Boyun düzleşmesi, omuz asimetrisi, migren ve gerilim tipi baş ağrılarına son derece etkilidir."
  },
  {
    id: 5,
    kataNumber: "Kata #69-85",
    japaneseName: "Hara Chosei",
    turkishName: "Karın ve İç Organ (Visseral) Dolaşımı",
    category: "visceral",
    description: "Karın bölgesine uygulanan derin, yumuşak doku basınçları ile kan ve lenfatik dolaşımın uyarılması.",
    anatomicalTarget: "Psoas majör kası, diyafram, bağırsak peristaltizmi",
    benefit: "Psoas kas spazmını çözerek bel omurlarını rahatlatır, sindirim ve enerji akışını düzenler."
  },
  {
    id: 6,
    kataNumber: "Kata #86-100",
    japaneseName: "Zen-shin Togo",
    turkishName: "Tüm Vücut Entegrasyonu ve Son Dengeleme",
    category: "spine",
    description: "Seansın sonunda tüm vücut simetrisinin yeniden doğrulanması, kas tonusunun sakinleştirilmesi ve duruşun kilitlenmesi.",
    anatomicalTarget: "Merkezi sinir sistemi, postural propriyosepsiyon",
    benefit: "Danışanda derin gevşeme, dik duruş hissi ve kalıcı biyomekanik uyum sağlar."
  }
];

export const UPCOMING_SEMINARS: UpcomingSeminar[] = [
  {
    id: "sem-ist-01",
    title: "1. Dan Uluslararası Yumeiho Temel Sertifika Programı",
    danLevel: "1. Dan (Kihon)",
    city: "İstanbul (Kadıköy)",
    venue: "Yumeiho Türkiye Eğitim Merkezi Salonu",
    dates: "14 - 17 Kasım 2026",
    hours: "09:30 - 18:00 (Toplam 32 Saat)",
    instructor: "Ali Gökmen Düzgün (Türkiye Temsilcisi)",
    seatsLeft: 3,
    totalSeats: 12,
    status: "limited"
  },
  {
    id: "sem-ank-02",
    title: "2. Dan İleri Düzey Manuel Terapi & Skolyoz Semineri",
    danLevel: "2. Dan (Chukyu)",
    city: "Ankara (Çankaya)",
    venue: "Başkent Manuel Terapi Akademisi Salonu",
    dates: "28 Kasım - 01 Aralık 2026",
    hours: "09:30 - 18:00 (Toplam 32 Saat)",
    instructor: "Ali Gökmen Düzgün & Misafir Yabancı Eğitmen",
    seatsLeft: 5,
    totalSeats: 10,
    status: "open"
  },
  {
    id: "sem-izm-03",
    title: "1. Dan Yumeiho Pelvis & Omurga Dengeleme Eğitimi",
    danLevel: "1. Dan (Kihon)",
    city: "İzmir (Alsancak)",
    venue: "Ege Bütüncül Sağlık Enstitüsü",
    dates: "12 - 15 Aralık 2026",
    hours: "09:30 - 18:00 (Toplam 32 Saat)",
    instructor: "Ali Gökmen Düzgün (Türkiye Temsilcisi)",
    seatsLeft: 6,
    totalSeats: 12,
    status: "open"
  },
  {
    id: "sem-ist-04",
    title: "3. Dan Jokyu Uzman Terapist & Asistanlık Atölyesi",
    danLevel: "3. Dan (Jokyu)",
    city: "İstanbul (Kadıköy)",
    venue: "Yumeiho Türkiye Genel Merkezi",
    dates: "09 - 11 Ocak 2027",
    hours: "10:00 - 18:30 (Özel Süpervizyon)",
    instructor: "Ali Gökmen Düzgün",
    seatsLeft: 2,
    totalSeats: 6,
    status: "limited"
  }
];

export const VERIFIED_CERTIFICATES: VerifiedCertificate[] = [
  {
    certNumber: "TR-YMH-2024-001",
    fullName: "Mehmet Akif Kaya",
    danLevel: "2. Dan (Chukyu - İleri Düzey Terapist)",
    danRank: 2,
    japaneseRank: "弐段 (Nidan)",
    issuedDate: "15 Ekim 2024",
    instructor: "Ali Gökmen Düzgün",
    city: "İstanbul (Kadıköy)",
    status: "Aktif Terapist",
    validUntil: "Süresiz (Federasyon Kütüğü Aktif)",
    specialization: "Skolyoz Düzeltme & Pelvik Mobilizasyon",
    securityHash: "SHA256: 7d8f...4e19-YMH-TR-OK"
  },
  {
    certNumber: "TR-YMH-2025-042",
    fullName: "Selin Yılmazer",
    danLevel: "1. Dan (Kihon - Temel Düzey Uygulayıcı)",
    danRank: 1,
    japaneseRank: "初段 (Shodan)",
    issuedDate: "20 Mart 2025",
    instructor: "Ali Gökmen Düzgün",
    city: "İzmir (Alsancak)",
    status: "Aktif Terapist",
    validUntil: "Süresiz (Federasyon Kütüğü Aktif)",
    specialization: "100 Temel Kata & Duruş Simetrisi",
    securityHash: "SHA256: 3c9b...1f02-YMH-TR-OK"
  },
  {
    certNumber: "TR-YMH-2025-089",
    fullName: "Barış Demir",
    danLevel: "3. Dan (Jokyu - Yetkili Uzman Terapist)",
    danRank: 3,
    japaneseRank: "参段 (Sandan)",
    issuedDate: "12 Eylül 2025",
    instructor: "Ali Gökmen Düzgün",
    city: "Ankara (Çankaya)",
    status: "Usta Eğitmen",
    validUntil: "Süresiz (Federasyon Kütüğü Aktif)",
    specialization: "Karmaşık Omurga Deformiteleri & Asistan Eğitmenlik",
    securityHash: "SHA256: a4e8...99d1-YMH-TR-OK"
  },
  {
    certNumber: "TR-YMH-2026-104",
    fullName: "Zeynep Çelik",
    danLevel: "1. Dan (Kihon - Temel Düzey Uygulayıcı)",
    danRank: 1,
    japaneseRank: "初段 (Shodan)",
    issuedDate: "05 Şubat 2026",
    instructor: "Ali Gökmen Düzgün",
    city: "Bursa (Nilüfer)",
    status: "Aktif Terapist",
    validUntil: "Süresiz (Federasyon Kütüğü Aktif)",
    specialization: "Pelvis Biyomekaniği & Sakroiliak Dengeleme",
    securityHash: "SHA256: 5f12...bc77-YMH-TR-OK"
  },
  {
    certNumber: "TR-YMH-2024-019",
    fullName: "Dr. Caner Öztürk",
    danLevel: "2. Dan (Chukyu - İleri Düzey Terapist)",
    danRank: 2,
    japaneseRank: "弐段 (Nidan)",
    issuedDate: "18 Kasım 2024",
    instructor: "Ali Gökmen Düzgün",
    city: "Antalya (Muratpaşa)",
    status: "Klinik Uygulayıcı",
    validUntil: "Süresiz (Federasyon Kütüğü Aktif)",
    specialization: "Sporcu Yaralanmaları & Omurga Traksiyonu",
    securityHash: "SHA256: e821...6a44-YMH-TR-OK"
  },
  {
    certNumber: "TR-YMH-2023-005",
    fullName: "Ebru Karaca",
    danLevel: "4. Dan (Shihan Dai - Eğitmen Komisyoneri)",
    danRank: 4,
    japaneseRank: "四段 (Yondan / Shihan Dai)",
    issuedDate: "04 Temmuz 2023",
    instructor: "Ali Gökmen Düzgün & Int. Yumeiho Centre",
    city: "İstanbul (Beşiktaş)",
    status: "Usta Eğitmen",
    validUntil: "Süresiz (Federasyon Kütüğü Aktif)",
    specialization: "Eğitmen Eğitimi & Uluslararası Sınav Gözlemciliği",
    securityHash: "SHA256: d19c...883b-YMH-TR-OK"
  }
];

export const CASE_STUDIES = [
  {
    id: "case-1",
    condition: "İdiopatik Skolyoz (Omurga Eğriliği)",
    initialState: "24° Cobb Açısı, Sol pelvis 1.8 cm yukarıda, tek omuz düşüklüğü ve kronik sırt ağrısı.",
    treatmentPlan: "Ali Gökmen Düzgün yönetiminde 12 haftalık Yumeiho seans döngüsü (Pelvis düzeltme + paravertebral shiatsu).",
    result: "Cobb açısı 11° seviyesine geriledi, pelvis simetrisi eşitlendi, ağrı skoru 8/10'dan 1/10'a düştü.",
    timeframe: "3 Ay (18 Seans)",
    patient: "Ayşe K., 29 Yaşında (Mimar)"
  },
  {
    id: "case-2",
    condition: "L4-L5 Bel Fıtığı ve Bacağa Vuran Siyatik",
    initialState: "Yürümekte zorluk, sağ bacakta his kaybı, sağ bacak boyunda 1.5 cm fonksiyonel kısalık.",
    treatmentPlan: "Sakroiliak eklem açma katası, derin psoas mobilizasyonu ve dekompresif bacak traksiyonu.",
    result: "Bacak boyu fonksiyonel olarak eşitlendi, siyatik basısı tamamen rahatladı, cerrahi operasyon ihtiyacı ortadan kalktı.",
    timeframe: "6 Hafta (10 Seans)",
    patient: "Murat E., 44 Yaşında (Finans Müdürü)"
  },
  {
    id: "case-3",
    condition: "Servikal Düzleşme & Kronik Boyun Kilitlenmesi",
    initialState: "Günde 10 saat bilgisayar kullanımı sonucu boyun hareket kısıtlılığı, kolda uyuşma ve gerilim baş ağrısı.",
    treatmentPlan: "Üst torakal ve servikal 100 kata manevraları, omuz kuşağı mobilizasyonu.",
    result: "Boyun rotasyonu %100 açıldı, baş ağrıları son buldu, postür analizi tam diklik gösterdi.",
    timeframe: "4 Hafta (6 Seans)",
    patient: "Deniz T., 35 Yaşında (Yazılım Mühendisi)"
  }
];

export const FAQ_LIST = [
  {
    question: "Yumeiho Terapi seansı nasıl gerçekleşir ve ne kadar sürer?",
    answer: "Yumeiho seansı, özel rahat pamuklu kıyafetlerle, yerdeki geleneksel tatami mat üzerinde uygulanır. Herhangi bir yağ veya soyunma gerektirmez. Seans yaklaşık 50-60 dakika sürer ve 100 temel kata hareketinin tamamını veya hastanın ihtiyacına göre özelleştirilmiş kombinasyonunu içerir."
  },
  {
    question: "Terapide eklem sesleri (kütletme) duyulur mu, can acıtır mı?",
    answer: "Yumeiho terapisinde eklemler zorlanmaz veya sert manipülasyon yapılmaz. Önce kaslar derin ritmik basılarla (Shiatsu) gevşetilir; eklem yerine otururken doğal olarak hafif sesler duyulabilir. İşlem kesinlikle acı verici değildir, aksine seans boyunca derin bir rahatlama ve omurgada hafifleme hissedilir."
  },
  {
    question: "Yumeiho eğitimlerine kimler katılabilir, tıbbi geçmiş şart mı?",
    answer: "1. Dan Temel Eğitimi'ne fizyoterapistler, masaj terapistleri, antrenörler, osteopatlar, yoga/pilates eğitmenleri başta olmak üzere insan anatomisine ve beden sağlığına ilgi duyan herkes katılabilir. Tıbbi anatomi temeli olanlar klinik pratikte daha hızlı ilerlerken, temel biomekanik eğitim programımızda sıfırdan detaylıca aktarılır."
  },
  {
    question: "Verilen sertifikalar Uluslararası Federasyon onaylı mıdır?",
    answer: "Evet. Ali Gökmen Düzgün'ün düzenlediği eğitimler, Japonya merkezli International Yumeiho Centre ve Avrupa Federasyonu tarafından resmi olarak tanınan uluslararası geçerli Dan sertifikalarıdır. Başarılı kursiyerler federasyonun resmi uygulayıcı kütüğüne kaydedilir."
  },
  {
    question: "Kaç seansta sonuç alınır?",
    answer: "Genellikle ilk seanstan itibaren belirgin bir omurga hafiflemesi ve duruş dengelenmesi görülür. Ancak duruş bozukluğunun, skolyozun veya fıtığın kronikleşme derecesine bağlı olarak kalıcı düzelme için 6 ila 12 seanslık periyotlar önerilir."
  }
];

export interface TherapeuticModule {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'anxiety' | 'stress' | 'confidence' | 'sleep';
  description: string;
  anatomicalMechanism: string;
  targets: string[];
  protocolSteps: string[];
  homePractice: string;
}

export interface EducationLevelModule {
  levelId: string;
  levelName: string;
  targetAudience: string;
  summary: string;
  topics: {
    title: string;
    description: string;
    duration: string;
    type: 'Teori' | 'Nefes' | 'Meditasyon' | 'Kata Uygulaması';
  }[];
}

export interface YumeihoEvent {
  id: string;
  title: string;
  type: 'Atölye' | 'Seminer' | 'Dan Kampı' | 'Nefes & Meditasyon';
  city: string;
  venue: string;
  date: string;
  time: string;
  instructor: string;
  target: string;
  remainingSeats: number;
  totalSeats: number;
}

export const THERAPEUTIC_MODULES: TherapeuticModule[] = [
  {
    id: 'anxiety_management',
    title: 'Anksiyete Yönetimi ve Otonom Sinir Dengeleme',
    subtitle: 'Vagus Siniri Aktivasyonu ve Sempatik Aşırı Uyarılmayı Dindirme',
    tagline: 'Zihinsel fırtınayı bedenin köklenen biyomekaniğiyle sakinleştirin.',
    category: 'anxiety',
    description: 'Kronik kaygı ve anksiyete; bedende boyun, omuz ve sakroiliak bölgede gerginlik blokajları oluşturarak beynin sürekli "tehlike" sinyali üretmesine sebep olur. Bu terapi modülü, pelvis ve omurga hizalamasıyla parasempatik (dinlen ve onar) sinir sistemini devreye sokar.',
    anatomicalMechanism: 'Servikal (C1-C2) nazik dekompresyon ve sakrum üzerindeki ritmik parasempatik basılar, vagus siniri tonusunu artırır ve kalp atım hızı değişkenliğini (HRV) düzenler.',
    targets: [
      'Panik ve kaygı kaynaklı göğüs sıkışması ve nefes darlığını gidermek',
      'Omuz, boyun ve çenedeki istemsiz kasılmaları serbest bırakmak',
      'Zihinsel dinginlik ve güvenli zemin hissini (köklenme) yeniden tesis etmek',
      'Otonom sinir sisteminde sempatik hakimiyeti dengelemek'
    ],
    protocolSteps: [
      '1. Pelvis ve bacak simetrisi ile bedenin yerçekimi zeminini güvene alma',
      '2. Sakral bölgeye ritmik dikey bası ile parasempatik refleks uyarımı',
      '3. Boyun ve baş tabanı (suboksipital) dekompresyonu ile vagal gevşeme',
      '4. Tanden (alt karın) senkronize nefes ile sinir sistemini sakinleştirme'
    ],
    homePractice: 'Günde 10 dakika Tanden diyafram nefesi ve pelvik köklenme esnemesi.'
  },
  {
    id: 'stress_reduction',
    title: 'Kronik Stres Azaltma ve Somatik Kas Zırhı Çözümü',
    subtitle: 'Psoas ("Ruh Kası") Gevşetme ve Kortizol Yükünü Boşaltma',
    tagline: 'Bedenin yıllardır taşıdığı duygusal ve fiziksel yükü serbest bırakın.',
    category: 'stress',
    description: 'Günlük stres, bedenin kaç-veya-savaş refleksinden sorumlu olan Psoas kasının sürekli spazmda kalmasına neden olur. Yumeiho derin doku manipülasyonları, kaslarda hapsolmuş hücresel stresi ve adrenal yorgunluğu çözümler.',
    anatomicalMechanism: 'Lomber omurlardan uyluk kemiğine uzanan Psoas kası ve diyafram serbest bırakıldığında, böbreküstü bezlerinin aşırı uyarılması durur ve kan kortizol seviyesi dengelenir.',
    targets: [
      'Kronik tükenmişlik ve yorgunluk hissini ortadan kaldırmak',
      'Diyafram kilitlenmesini açarak derin nefes kapasitesini %40 artırmak',
      'Bel ve kalçada biriken derin stres gerilimlerini çözmek',
      'Kas dokusunda hücresel oksijenlenmeyi ve lenfatik drenajı hızlandırmak'
    ],
    protocolSteps: [
      '1. Hara (karın) bölgesine kademeli yumuşak doku basıları ile psoas açma',
      '2. Torakal omurga boyunca ritmik basılarla kas zırhını (armoring) yumuşatma',
      '3. Kalça ve diz traksiyonu ile alt gövdede biriken gerilimi boşaltma',
      '4. Isıtıcı ve yatıştırıcı tüm beden entegrasyonu'
    ],
    homePractice: 'Yatmadan önce sırtüstü dizleri göğse çekme ve 4-7-8 rahatlatıcı nefes ritmi.'
  },
  {
    id: 'postural_confidence',
    title: 'Postüral Özgüven ve Beden İmajı Güçlendirme',
    subtitle: 'Omurga Dikleşmesi, Göğüs Kafesi Açılımı ve Somatik Güç Duruşu',
    tagline: 'Dik bir omurga, hayata karşı dik ve kendinden emin bir duruş demektir.',
    category: 'confidence',
    description: 'Öne bükük omuzlar, çökmüş göğüs kafesi ve içe kapanık boyun duruşu beynimize sürekli "savunmasız ve yetersiz" olduğumuz mesajını verir. Yumeiho ile göğüs kafesi ve leğen kemiği açıldığında, birey biyolojik olarak özgüven ve kararlılık hormonlarını salgılar.',
    anatomicalMechanism: 'Kifotik eğriliğin düzeltilmesi, skapulaların (kürek kemiklerinin) geriye alınması ve servikal hiza; testosteron/kortizol oranını olumlu yönde etkileyen somatik "güç duruşu" (power posture) nörobiyolojisini tetikler.',
    targets: [
      'Kamburluk (kifoz) ve çekingen beden dilini dik bir varlığa dönüştürmek',
      'Göğüs kafesini açarak ses tonu projeksiyonunu ve nefes derinliğini güçlendirmek',
      'Aynadaki beden imajıyla barışmak ve postüral asimetrileri gidermek',
      'İş ve sosyal yaşamda doğal karizma ve odaklanma kazanmak'
    ],
    protocolSteps: [
      '1. Pelvik anterior/posterior rotasyonu eşitleyerek omurga tabanını dikleştirmek',
      '2. Üst torakal omurlar ve pektoral kaslar üzerinde açıcı kata serileri',
      '3. Kürek kemikleri çevresindeki yapışıklıkları (adezyonları) manuel açma',
      '4. Boyun aksını geriye ve yukarıya hizalayarak baş ağırlığını sıfırlama'
    ],
    homePractice: 'Ayna karşısında 3 dakikalık omurga dikleştirme ve göğüs nefesi farkındalığı.'
  },
  {
    id: 'sleep_restoration',
    title: 'Derin Uyku ve Biyolojik Gece Restorasyonu',
    subtitle: 'Huzursuz Bacak Sendromu ve Zihinsel Aşırı Aktivitenin Dindirilmesi',
    tagline: 'Geceleri deliksiz, sabahları yenilenmiş ve dinç uyanın.',
    category: 'sleep',
    description: 'Gündüz biriken omurga gerginlikleri ve kilitli faset eklemler, gece yatakta sürekli pozisyon değiştirme ve bölünmüş uykuya yol açar. Yumeiho seansı, kas tonusunu en düşük seviyeye indirerek derin delta uykusuna geçişi kolaylaştırır.',
    anatomicalMechanism: 'Omurilik boyunca sempatik ganglion zincirinin gevşetilmesi ve kraniyosakral ritmin dengelenmesi, doğal melatonin salınımını tetikler.',
    targets: [
      'Uykuya dalma süresini 15 dakikanın altına indirmek',
      'Huzursuz bacak sendromu ve gece kramplarını engellemek',
      'Sabah tutukluğu ve yorgun uyanma döngüsünü kırmak',
      'Kronik ağrılara bağlı gece uyanmalarını sıfırlamak'
    ],
    protocolSteps: [
      '1. Ayak tabanından kalçaya kadar alt ekstremite gevşetme katası',
      '2. Tüm omurga boyunca ritmik, dalgalı nöromusküler gevşetme',
      '3. Boyun kökünde hafif traksiyon ile kafa içi basıncı tahliye etme'
    ],
    homePractice: 'Ilık duş sonrası alt karın bölgesine hafif dairesel dokunuşlar.'
  }
];

export const EDUCATION_PLATFORM_DATA = {
  platformTitle: "Yumeiho Dijital Öğrenme & Uygulayıcı Akademisi",
  platformSubtitle: "Başlangıçtan Usta Terapist Seviyesine: Teori, Nefes, Meditasyon ve Kata Sanatı",
  corePrinciples: [
    {
      title: "1. Kotsuban (Pelvis) Ağırlık Merkezi İlkesi",
      description: "İnsan bedeninin yerçekimi dengesi leğen kemiğindedir. Pelvis eğrildiğinde omurga kompensasyon yapar; bu yüzden Yumeiho daima temelden tepeye çalışır."
    },
    {
      title: "2. Shizen Chiyuryoku (Doğal İyileşme Gücü)",
      description: "Terapist iyileştirici değil, vücudun engellenmiş iyileşme kanallarını açan bir mihmandardır. Eklemler ve kan dolaşımı açıldığında beden kendini yeniler."
    },
    {
      title: "3. Simetri ve Biyomekanik Eşitlik Kanunu",
      description: "Sağ ve sol tarafın kuvvet, esneklik ve ağırlık dağılımı eşitlendiğinde iç organlar sıkışmaktan kurtulur, sinir sistemi dengeye ulaşır."
    },
    {
      title: "4. Kas Gevşemesi Olmadan Eklem Zorlanmaz",
      description: "Yumeiho'da ani veya sert zorlama yoktur. Önce ritmik dikey basılarla (Shiatsu) yumuşak doku gevşetilir, ardından eklem doğal olarak yerine kayar."
    }
  ],
  breathingTechniques: [
    {
      name: "Tanden Kokyuu-ho (Alt Karın Merkezli Güç Nefesi)",
      focus: "Karın diyaframı ve psoas kası gevşetme",
      rhythm: "4 sn Al · 4 sn Tut · 6 sn Ver",
      inhaleTime: 4,
      holdTime: 4,
      exhaleTime: 6,
      benefit: "Bası uygularken veya alırken iç basıncı dengeler, vagus sinirini uyarır, ağrı eşiğini yükseltir.",
      instruction: "Göbeğin iki parmak altındaki Tanden noktasına odaklanın. Nefes alırken karnınızın bir küre gibi genişlediğini, verirken belinizin rahatladığını hissedin."
    },
    {
      name: "Aun No Kokyu (Senkronize Terapist-Danışan Nefesi)",
      focus: "Bası ritmi ve omurga traksiyonu uyumu",
      rhythm: "Terapist basarken danışan ekshale eder",
      inhaleTime: 3,
      holdTime: 1,
      exhaleTime: 5,
      benefit: "Kasların savunma refleksini (guarding) sıfıra indirir; eklem manipülasyonunun tamamen acısız ve yumuşak olmasını sağlar.",
      instruction: "Uygulayıcı ağırlığını yerçekimiyle aktarırken danışan uzun ve pürüzsüz bir nefes verir."
    }
  ],
  meditationExercises: [
    {
      title: "Mokuso (Zihinsel Sessizlik ve Beden Tarama)",
      stage: "Seans / Ders Öncesi Zihinsel Odaklanma",
      duration: "5 - 7 Dakika",
      practice: "Seiza (dizüstü) veya rahat bağdaş oturuşunda gözler yarı açık şekilde nefesin akışını izlemek. Zihindeki düşünceleri bastırmadan, bedendeki ağırlık merkezine (pelvise) geri dönmek."
    },
    {
      title: "Kotsuban Köklenme Meditasyonu (Pelvic Grounding)",
      stage: "Seans Sonu Entegrasyonu",
      duration: "8 - 10 Dakika",
      practice: "Sırtüstü tatamide yatarken iki leğen kemiğinin zeminle temasını hissetmek. Bacakların eşit uzunlukta yere uzandığını ve omurganın bir ırmak gibi engelsiz aktığını imgelemek."
    }
  ],
  holisticBenefits: [
    {
      category: "Fiziksel Biyomekanik",
      items: ["Bacak boyu fonksiyonel eşitlemesi", "Skolyoz ve kifoz açılarında gerileme", "Fıtık ve siyatik basılarında dekompresyon", "Eklem hareket açıklığında (ROM) %30+ artış"]
    },
    {
      category: "Nörolojik & Otonom",
      items: ["Sempatik gerginliğin dindirilmesi", "Vagus siniri tonusunun güçlenmesi", "Kronik ağrı algısının azalması", "Kaliteli ve bölünmeyen derin uyku"]
    },
    {
      category: "Dolaşımsal & Visseral",
      items: ["İç organ peristaltizminin uyarılması", "Lenfatik drenaj ve ödem atılımı", "Pelvik taban kanlanmasının artması", "Hücresel oksijen transferinin hızlanması"]
    },
    {
      category: "Duygusal & Psikosomatik",
      items: ["Beden imajında ve özgüvende dikleşme", "Kronik anksiyete ve panik semptomlarının hafiflemesi", "Bedensel farkındalık (propriyosepsiyon) artışı", "Dingin canlılık ve zihinsel berraklık"]
    }
  ],
  levelsCurriculum: [
    {
      levelId: 'baslangic',
      levelName: '1. Seviye: Temel İlkeler ve Pelvis Farkındalığı',
      targetAudience: 'Yeni başlayanlar, bireysel sağlığını geliştirmek isteyenler ve temel adaylar',
      summary: 'Yumeiho felsefesi, pelvis kemik anatomisi, duruş analizi ve günlük koruyucu egzersizler.',
      topics: [
        { title: 'Yumeiho ve Masayuki Saionji Felsefesi', description: 'Geleneksel Japon manuel terapi kökleri ve ağırlık merkezi felsefesi.', duration: '45 Dk', type: 'Teori' as const },
        { title: 'Pelvis Palpasyonu ve Bacak Boyu Kontrolü', description: 'Aynada ve yerde kendi pelvis simetrisini muayene etme yöntemleri.', duration: '60 Dk', type: 'Kata Uygulaması' as const },
        { title: 'Tanden Kokyuu-ho (Alt Karın Nefesi)', description: 'Diyaframı açan ve vagus sinirini yatıştıran Japon nefes tekniği.', duration: '30 Dk', type: 'Nefes' as const },
        { title: 'Günlük 10 Dakikalık Dengeleme Egzersizleri', description: 'Pelvisi hizalı tutan ev tipi esneme ve eklem hareketleri.', duration: '45 Dk', type: 'Kata Uygulaması' as const }
      ]
    },
    {
      levelId: 'orta',
      levelName: '2. Seviye: 100 Kata Pratiği ve Yumuşak Doku Basıları',
      targetAudience: '1. Dan adayları, masaj terapistleri, spor eğitmenleri ve fizyoterapistler',
      summary: 'Sırt ve omurga boyunca dikey ritmik basılar (Shiatsu), sakroiliak mobilizasyon ve nefes uyumu.',
      topics: [
        { title: 'Kata #01-24: Paravertebral Dikey Bası Dizisi', description: 'Omurga yanındaki kas zincirini gevşeten ritmik başparmak basıları.', duration: '90 Dk', type: 'Kata Uygulaması' as const },
        { title: 'Bası Sırasında Danışan-Terapist Nefes Senkronizasyonu', description: 'Acısız ve pürüzsüz dokunuş için nefes verme koordinasyonu.', duration: '40 Dk', type: 'Nefes' as const },
        { title: 'Bacak ve Kalça Traksiyonu (Kata #25-42)', description: 'Femur başı ve sakroiliak eklemin nazikçe açılması mekaniği.', duration: '75 Dk', type: 'Kata Uygulaması' as const },
        { title: 'Mokuso Meditasyonu ile Seansa Odaklanma', description: 'Terapistin zihnini sakinleştirip ellerine duyarlılık kazandırması.', duration: '25 Dk', type: 'Meditasyon' as const }
      ]
    },
    {
      levelId: 'ileri',
      levelName: '3. Seviye: Patolojiler, Skolyoz & Psikosomatik Protokoller',
      targetAudience: '2. ve 3. Dan uygulayıcıları, klinisyenler ve uzman terapistler',
      summary: 'Bel/boyun fıtığı, skolyoz ve stres/anksiyete kökenli kas zırhı için özel klinik yaklaşımlar.',
      topics: [
        { title: 'Skolyoz ve Cobb Açısı Düzeltme Stratejileri', description: 'Asimetrik pelvis rotasyonunu hedef alan ileri düzey kata dizilimi.', duration: '90 Dk', type: 'Kata Uygulaması' as const },
        { title: 'Psoas Kası ve Anksiyete Dengeleme Protokolü', description: 'Karın içi visseral basılarla sempatik aşırı uyarılmayı dindirme.', duration: '60 Dk', type: 'Teori' as const },
        { title: 'Servikal Dekompresyon ve Boyun Düzleşmesi', description: 'Baş ağrısı ve kol uyuşmalarını hafifleten nazik traksiyon adımları.', duration: '80 Dk', type: 'Kata Uygulaması' as const },
        { title: 'Pelvic Grounding ve Derin Gevşeme Meditasyonu', description: 'Danışanın sinir sistemini derin iyileşme moduna geçiren rehberlik.', duration: '35 Dk', type: 'Meditasyon' as const }
      ]
    },
    {
      levelId: 'egitmen',
      levelName: '4. Seviye: Dan Sınavı Hazırlığı ve Eğitmenlik Pedagojisi',
      targetAudience: '4. ve 5. Dan usta eğitmen adayları ve temsilcilik asistanları',
      summary: 'Uluslararası federasyon sınav kriterleri, öğrenci süpervizyonu ve klinik etik kurallar.',
      topics: [
        { title: '100 Kata\'nın Kesintisiz Kusursuz Koreografisi', description: 'Tekniklerin milimetrik açıları ve ağırlık aktarım mükemmelliği.', duration: '120 Dk', type: 'Kata Uygulaması' as const },
        { title: 'Öğrenci Hatalarını Tespit ve Düzeltme Metodolojisi', description: 'Eğitici gözüyle palpasyon ve manevra süpervizyonu.', duration: '90 Dk', type: 'Teori' as const },
        { title: 'Klinik Etik, Tıbbi Sınırlar ve Yasal Çerçeve', description: 'Tamamlayıcı tıp standartları ve hekim işbirliği ilkeleri.', duration: '45 Dk', type: 'Teori' as const }
      ]
    }
  ]
};

export const PLANNED_EVENTS: YumeihoEvent[] = [
  {
    id: 'evt-01',
    title: 'Anksiyete ve Stres İçin Yumeiho Beden Farkındalığı Atölyesi',
    type: 'Nefes & Meditasyon',
    city: 'İstanbul (Kadıköy)',
    venue: 'Yumeiho Türkiye Eğitim Salonu',
    date: '07 Kasım 2026',
    time: '14:00 - 17:30',
    instructor: 'Ali Gökmen Düzgün',
    target: 'Stres, anksiyete veya uyku bozukluğu yaşayan herkes',
    remainingSeats: 4,
    totalSeats: 16
  },
  {
    id: 'evt-02',
    title: '1. Dan Uluslararası Temel Uygulayıcı Sertifika Kampı',
    type: 'Dan Kampı',
    city: 'İstanbul (Kadıköy)',
    venue: 'Yumeiho Türkiye Genel Merkezi',
    date: '14 - 17 Kasım 2026',
    time: '09:30 - 18:00 (4 Gün / 32 Saat)',
    instructor: 'Ali Gökmen Düzgün',
    target: 'Fizyoterapistler, masörler, beden terapistleri ve yeni başlayanlar',
    remainingSeats: 3,
    totalSeats: 12
  },
  {
    id: 'evt-03',
    title: 'Postür, Pelvis ve Özgüven Duruşu Uygulamalı Semineri',
    type: 'Atölye',
    city: 'Ankara (Çankaya)',
    venue: 'Başkent Bütüncül Yaşam Merkezi',
    date: '28 Kasım 2026',
    time: '13:00 - 18:00',
    instructor: 'Ali Gökmen Düzgün',
    target: 'Masa başı çalışanlar, sporcular ve omurga sağlığına önem verenler',
    remainingSeats: 5,
    totalSeats: 20
  },
  {
    id: 'evt-04',
    title: '2. Dan İleri Düzey Skolyoz & Klinik Terapi Semineri',
    type: 'Seminer',
    city: 'İzmir (Alsancak)',
    venue: 'Ege Manuel Terapi Enstitüsü',
    date: '12 - 15 Aralık 2026',
    time: '09:30 - 18:00 (4 Gün)',
    instructor: 'Ali Gökmen Düzgün & Danışman Hekim',
    target: '1. Dan mezunları ve manuel terapistler',
    remainingSeats: 6,
    totalSeats: 12
  }
];

export const EXPANDED_FAQS = [
  {
    category: 'Terapötik Modüller & Sağlık',
    question: 'Yumeiho anksiyete, panik atak ve stres üzerinde nasıl etkili olur?',
    answer: 'Anksiyete ve stres, sempatik sinir sisteminin aşırı aktivasyonudur ve bedende göğüs kafesi sıkışması, sığ nefes, boyun-çene kasılması ve psoas spazmı şeklinde somutlaşır. Yumeiho terapisi; leğen kemiği, sakrum ve boyun tabanına uyguladığı kontrollü ritmik basılarla vagus sinirini uyarır, kalp atımını yavaşlatır ve bedene "artık güvendesin" biyolojik sinyalini gönderir.'
  },
  {
    category: 'Terapötik Modüller & Sağlık',
    question: 'Postüral özgüven modülü nedir ve duruşumuzu nasıl etkiler?',
    answer: 'Nörobiyolojik çalışmalar, dik ve simetrik bir omurganın beyne doğrudan özgüven, kararlılık ve sakinlik mesajları gönderdiğini kanıtlamaktadır. Çökük omuzlar ve kaymış bir pelvis içe kapanıklığı beslerken; Yumeiho ile göğsün açılması ve pelvisin eşitlenmesi bireyin hem duruşunu hem de psikolojik varlığını dikleştirir.'
  },
  {
    category: 'Eğitim Platformu & Müfredat',
    question: 'Eğitim platformundaki başlangıç seviyesine tıbbi geçmişi olmayanlar katılabilir mi?',
    answer: 'Evet. Platformumuz başlangıç düzeyinde Yumeiho\'nun temel prensiplerini, Tanden nefes tekniklerini ve pelvis dengesini herkesin anlayabileceği bir dille öğretir. İleri seviyeler ve resmi Dan diplomaları ise anatomi bilgisi ve klinik süpervizyonla derinleşir.'
  },
  {
    category: 'Eğitim Platformu & Müfredat',
    question: 'Nefes ve meditasyon egzersizleri seansların neresinde yer alır?',
    answer: 'Yumeiho seansı seiza oturuşunda Mokuso (zihinsel sessizlik) ile başlar. Tüm basılar sırasında danışan Tanden nefesi vererek kas direncini sıfıra indirir. Seans sonunda ise Kotsuban (pelvik köklenme) meditasyonu ile yeni hizalanmış omurga zihinsel olarak bedene entegre edilir.'
  },
  {
    category: 'Klinik Seanslar',
    question: 'Seans kaç dakika sürer, ne giymeliyim ve seans acıtır mı?',
    answer: 'Seans 50-60 dakika sürer. Yerdeki tatami minderi üzerinde, rahat pamuklu kıyafetlerle (eşofman/tişört) uygulanır. Masaj yağı veya soyunma gerekmez. İşlem kesinlikle acı verici değildir; yumuşak doku önce ritmik basılarla ısıtıldığı için eklem açılışları son derece rahatlatıcı ve hafiftir.'
  },
  {
    category: 'Federasyon & Sertifika',
    question: 'Ali Gökmen Düzgün\'den alınan sertifikaların uluslararası geçerliliği nedir?',
    answer: 'Ali Gökmen Düzgün, International Yumeiho Centre resmi Türkiye Temsilcisidir. Düzenlenen seminerlerde başarılı olan adaylara doğrudan federasyon tescilli uluslararası Dan diplomaları verilir ve isimleri resmi uygulayıcı kütüğüne işlenir.'
  }
];

