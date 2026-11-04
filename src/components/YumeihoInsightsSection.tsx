import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, ArrowRight, X, Bookmark, Share2, Tag, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Article {
  id: string;
  category: 'biomedical' | 'ergonomics' | 'somatic' | 'research';
  title: { tr: string; jp: string; en: string };
  subtitle: { tr: string; jp: string; en: string };
  author: string;
  role: { tr: string; jp: string; en: string };
  date: string;
  readTime: string;
  excerpt: { tr: string; jp: string; en: string };
  content: {
    tr: string[];
    jp: string[];
    en: string[];
  };
  keyTakeaways: { tr: string[]; jp: string[]; en: string[] };
}

const ARTICLES: Article[] = [
  {
    id: 'pelvic-dislocation-scoliosis',
    category: 'biomedical',
    title: {
      tr: 'Pelvis Çıkığı ve İdiyopatik Skolyoz Arasındaki Biyomekanik İlişki',
      jp: '骨盤変位（歪み）と特発性側弯症のバイオメカニクス的相関',
      en: 'Biomechanical Correlation Between Pelvic Subluxation & Idiopathic Scoliosis'
    },
    subtitle: {
      tr: 'Saigionji Masayuki Hoca’nın 100 Kata Teorisinin Klinik Radyolojik İncelemesi',
      jp: '西園寺雅幸先生の100の基本手技（百型）理論に関する臨床放射線学的考察',
      en: 'Clinical & Radiological Review of Saionji Masayuki’s 100 Kata Theory'
    },
    author: 'Ali Gökmen Düzgün',
    role: { tr: 'Yumeiho Türkiye Temsilcisi & 5. Dan Eğitmen', jp: '湧命法トルコ代表・五段師範', en: 'Yumeiho Turkey Representative & 5th Dan Instructor' },
    date: 'Ekim 2026',
    readTime: '6 dk',
    excerpt: {
      tr: 'Pelvis kemiğinin 1 derecelik rotasyonel sapması, omurga boyunca kompanzatuvar eğriliklere ve faset eklem basınçlarının asymmetrical artışına yol açmaktadır.',
      jp: '骨盤のわずか1度の回旋変位が、脊柱全体に代償性湾曲を引き起こし、椎間関節圧の左右不均衡を招きます。',
      en: 'A 1-degree rotational shift in the pelvic bone induces compensatory spinal curvature and asymmetrical facet joint pressure across the vertebral column.'
    },
    content: {
      tr: [
        'Yumeiho terapisinin temeli, insan bedeninin kütle merkezinin leğen kemiği (sacroiliac eklem) düzleminde yer alması esasına dayanır.',
        'Saionji Masayuki tarafından geliştirilen klinik metodolojiye göre, doğum esnasında veya childhood traversal mikrotravmalarında oluşan hafif bir pelvis sublüksasyonu, yaş ilerledikçe bacak boyu farkı (functional leg length discrepancy) olarak tezahür eder.',
        'Bacak boyu farkı 5 mm’nin üzerine çıktığında, sakrum sola veya sağa meyleder. Omurga, başın oryantasyonunu yatay düzlemde tutabilmek adına kompanzatuvar skolyotik kavisler (S veya C tipi) geliştirmek zorunda kalır.',
        'Yumeiho 100 Kata mobilizasyonu, direkt omurga kırık veya zorlama yapmadan, sakroiliyak eklem yüzeylerini nazikçe dekomprese eder ve bacak boyu simetrisini yeniden tesis eder.'
      ],
      jp: [
        '湧命法療法の根本は、人間の身体の重心が骨盤（仙腸関節）平面に位置するという原理に基づいています。',
        '創始者・西園寺雅幸先生が確立した臨床分析によれば、出生時や幼少期の微小トラウマによる骨盤変位は、加齢とともに脚長差（脚の長さの不均衡）として顕在化します。',
        '脚長差が5mmを超えると、仙骨が左右に傾斜し、頭部の水平を保つために脊柱が代償性側弯（S字・C字カーブ）を形成します。',
        '湧命法100の基本手技は、強制的な骨関節スラストを行わず、仙腸関節面を優しく減圧し、脚長差の左右対称性を復元します。'
      ],
      en: [
        'The foundation of Yumeiho therapy rests upon the principle that the human center of gravity resides within the pelvic sacroiliac plane.',
        'According to the clinical methodology established by Saionji Masayuki, minor pelvic subluxations acquired during birth or childhood micro-traumas manifest over time as functional leg length discrepancy.',
        'When leg length variance exceeds 5mm, the sacrum tilts laterally. To maintain horizontal gaze orientation, the spinal column undergoes compensatory scoliosis curves (S or C pattern).',
        'The Yumeiho 100 Kata mobilization gently decompresses sacroiliac joint surfaces without forced osseous manipulation, restoring biomechanical leg length symmetry.'
      ]
    },
    keyTakeaways: {
      tr: [
        'Pelvis düzeltilmeden yapılan omurga egzersizleri kompanzatuvar stresi artırabilir.',
        'Sakroiliyak dekompresyon bacak boyu eşitsizliğini 4-6 seansta düzeltebilir.',
        'Erken yaşta yapılan Yumeiho kontrolleri skolyoz ilerlemesini durdurmaya yardımcıdır.'
      ],
      jp: [
        '骨盤変位を矯正せずに脊柱運動を行うと、代償性ストレスを増化させるリスクがあります。',
        '仙腸関節の減圧手技により、4〜6回の施術で脚長差を改善可能。',
        '早期の湧命法スクリーニングは側弯症の進行予防に極めて効果的です。'
      ],
      en: [
        'Spinal exercises performed without addressing pelvic asymmetry can exacerbate compensatory stress.',
        'Sacroiliac decompression can neutralize functional leg length variance within 4-6 sessions.',
        'Early Yumeiho intervention helps arrest progressive adolescent scoliosis.'
      ]
    }
  },
  {
    id: 'vagus-nerve-pelvis',
    category: 'somatic',
    title: {
      tr: 'Otonom Sinir Sistemi Regülasyonunda Sakral Pleksus ve Vagus Teması',
      jp: '自律神経調整における仙骨神経叢と迷走神経の相互作用',
      en: 'Sacral Plexus & Vagus Nerve Modulation in Autonomic Nervous System Balance'
    },
    subtitle: {
      tr: 'Kronik Anksiyete ve Somatik Gerilimde Yumeiho Bastırma-Yoğurma (Ashi-Atsu) Etkileri',
      jp: '慢性不安・身体的緊張に対する湧命法「揉捏・圧迫手技」の臨床効果',
      en: 'Effects of Yumeiho Press-Kneading (Ashi-Atsu) on Chronic Anxiety & Somatic Tension'
    },
    author: 'Dr. Yumeiho Araştırma Grubu',
    role: { tr: 'Klinik Nörobiyoloji & Manuel Terapi Departmanı', jp: '臨床神経生物学・手技療法研究部', en: 'Department of Clinical Neurobiology & Manual Therapy' },
    date: 'Eylül 2026',
    readTime: '5 dk',
    excerpt: {
      tr: 'Derin pelvis dokularına uygulanan ritmik masaj ve traksiyon, parasempatik tonusu tetikleyerek kortizol seviyelerini düşürür ve vagal fren etkisini güçlendirir.',
      jp: '深部骨盤組織への律動的な手技と牽引は副交感神経を活性化し、コルチゾール値を低減させます。',
      en: 'Rhythmic deep pelvic tissue manipulation and traction trigger parasympathetic tone, reducing cortisol and augmenting vagal brake activity.'
    },
    content: {
      tr: [
        'Kronik stres ve anksiyete, insan vücudunda psoas major ve piriformis kaslarının sürekli izometrik kasılması ile karakterizedir.',
        'Psoas kası sakral pleksus ve sempatik zincir ile yakın anatomik komşuluğa sahiptir. Kasın hipertonik durumda kalması, vücudun sürekli "savaş ya da kaç" modunda kalmasına yol açar.',
        'Yumeiho seansında uygulanan yumuşak doku yoğurma ve bası teknikleri, kas mekanoreseptörlerini (Golgi tendon organları) uyararak omuriliğe inhibitör sinyaller gönderir.',
        'Bu süreç, beyinde alfa dalgası aktivitesini artırır ve bireye seans esnasında derin bir somatik dinginlik hissi kazandırır.'
      ],
      jp: [
        '慢性的なストレスや不安感は、大腰筋および梨状筋の持続的等尺性収縮を引き起こします。',
        '大腰筋は仙骨神経叢および交感神経幹と解剖学的に極めて近接しており、過緊張状態が持続すると「戦うか逃げるか」反応が常態化します。',
        '湧命法の手技による筋肉揉捏と圧迫は、筋受容器（ゴルジ腱機関）を刺激し、脊髄へ抑制性フィードバックを送信します。',
        'この神経・身体的反応により、脳波のアルファ波が増大し、深い静寂と副交感神経の優位が確立されます。'
      ],
      en: [
        'Chronic stress and anxiety are anatomically characterized by persistent isometric contraction of the psoas major and piriformis muscles.',
        'The psoas muscle sits in close neurological proximity to the sacral plexus and sympathetic trunk. Hypertonicity keeps the organism stuck in perpetual fight-or-flight.',
        'Soft-tissue kneading and friction techniques applied during Yumeiho sessions stimulate muscle mechanoreceptors (Golgi tendon organs), firing inhibitory feedback to the spinal cord.',
        'This neuro-somatic response elevates alpha wave brain activity, fostering profound physiological tranquility during and after treatment.'
      ]
    },
    keyTakeaways: {
      tr: [
        'Psoas kası gevşemeden anksiyete fizyolojisi tam olarak yatışmaz.',
        'Yumeiho seansı sonrası kalp hızı değişkenliği (HRV) belirgin şekilde yükselir.',
        'Uyku kalitesi ve derin REM evreleri birinci seanstan itibaren iyileşme gösterir.'
      ],
      jp: [
        '大腰筋の緊張を解かずに不安の身体生理を鎮静化することは困難です。',
        '湧命法施術後、心拍変動（HRV）の顕著な上昇が確認されます。',
        '初回セッションより睡眠の質およびレム睡眠の構造が改善します。'
      ],
      en: [
        'Anxiety physiology cannot fully settle without releasing psoas hypertonicity.',
        'Heart Rate Variability (HRV) increases significantly post Yumeiho treatment.',
        'Sleep quality and deep REM architecture show marked improvements from session one.'
      ]
    }
  },
  {
    id: 'ergonomics-lumbar-herniation',
    category: 'ergonomics',
    title: {
      tr: 'Masa Başı Çalışanlarda Lumbal Fıtık Önleme ve Omurga Hidrasyonu',
      jp: 'デスクワーカーのための腰椎ヘルニア予防と椎間板水分保持',
      en: 'Lumbar Herniation Prevention & Disc Hydration for Desk Professionals'
    },
    subtitle: {
      tr: 'Gündelik Postür Hataları ve Yumeiho Kendi Kendine Bakım (Self-Kata) Rehberi',
      jp: '日常の姿勢エラーと湧命法セルフケア（Self-Kata）実踐ガイド',
      en: 'Daily Postural Habits & Yumeiho Self-Maintenance (Self-Kata) Guide'
    },
    author: 'Ali Gökmen Düzgün',
    role: { tr: 'Yumeiho Türkiye Temsilcisi', jp: '湧命法トルコ代表', en: 'Yumeiho Turkey Representative' },
    date: 'Ağustos 2026',
    readTime: '4 dk',
    excerpt: {
      tr: 'Oturma eyleminde sakrum üzerine binen yük ayaktakine kıyasla %40 daha fazladır. Disklere besin taşınması için traksiyonel serbestleşme şarttır.',
      jp: '着座姿勢での仙骨負荷は立位と比較して40%増加します。椎間板への栄養供給には牽引的弛緩が不可欠です。',
      en: 'Sitting loads the sacral discs by 40% more than standing. Tractional release is essential to facilitate intervertebral disc nutrient imbibition.'
    },
    content: {
      tr: [
        'Günümüz modern yaşamında saatlerce sandalyede oturmak, omurlar arası disklerin içindeki sıvı basıncının (nükleus pulposus) azalmasına ve disk yüksekliğinin kaybolmasına neden olur.',
        'Yumeiho terapisindeki pasif traksiyon ve bacak döndürme hareketleri, omurlar arasında negatif içi basınç yaratarak sıvı emilimini (imbibition) teşvik eder.',
        'Günde 5 dakikalık pelvik eğim ve sakrum esnetme egzersizleri, masa başı çalışanların kronik bel ağrılarını %60 oranında hafifletmektedir.'
      ],
      jp: [
        '長時間にわたるデスクワークは、椎間板内部の髄核（nucleus pulposus）の水分量を減少させ、椎間板の高さを消失させます。',
        '湧命法における受動的牽引と下肢回旋手技は、椎間板内に陰圧を生み出し、水分・栄養素の吸入（imbibition）を強力に促します。',
        '1日5分の骨盤傾斜・仙骨減圧ストレッチにより、デスクワーカーの慢性腰痛が60%軽減されます。'
      ],
      en: [
        'Prolonged sitting reduces fluid pressure inside intervertebral discs (nucleus pulposus), diminishing disc height and spinal resiliency.',
        'Passive traction and leg rotation maneuvers in Yumeiho generate negative intradiscal pressure, promoting nutrient imbibition.',
        '5 minutes of daily pelvic tilt and sacral decompression reduces chronic lower back pain in sedentary workers by up to 60%.'
      ]
    },
    keyTakeaways: {
      tr: [
        'Her 45 dakikada bir 2 dakikalık sakrum serbestleme hareketi yapın.',
        'Sert zeminde bağdaş kurarak oturmak pelvis dengesini korumaya yardımcı olur.',
        'Susuz kalmış omurga fıtığa daha yatkındır; bol su tüketin.'
      ],
      jp: [
        '45分毎に2分間の仙骨弛緩エクササイズを実施してください。',
        '適度な硬さの床敷物での正座・あぐらは骨盤のアライメント維持に寄与します。',
        '脱水状態の椎間板はヘルニアを誘発しやすいため、適切な水分補給が必要です。'
      ],
      en: [
        'Perform a 2-minute sacral release exercise every 45 minutes of sitting.',
        'Cross-legged floor sitting on firm mats preserves pelvic alignment.',
        'Dehydrated spinal discs are prone to herniation; maintain optimal hydration.'
      ]
    }
  }
];

export const YumeihoInsightsSection: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalArticle, setActiveModalArticle] = useState<Article | null>(null);

  const categories = [
    { id: 'all', label: { tr: 'Tüm Makaleler', jp: '全ての論文・記事', en: 'All Articles' } },
    { id: 'biomedical', label: { tr: 'Biyomekanik İnceleme', jp: 'バイオメカニクス研究', en: 'Biomedical Studies' } },
    { id: 'somatic', label: { tr: 'Somatik & Sinir Sistemi', jp: '身体・自律神経系', en: 'Somatic & Nervous System' } },
    { id: 'ergonomics', label: { tr: 'Omurga Ergonomisi', jp: '脊柱エルゴノミクス', en: 'Spine Ergonomics' } }
  ];

  const filteredArticles = selectedCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <section className="py-24 bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-stone-300 dark:border-stone-800">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-900/10 dark:bg-amber-400/10 text-amber-900 dark:text-amber-300 border border-amber-900/20 dark:border-amber-400/20 text-xs tracking-wider uppercase mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'tr' ? 'Yumeiho Insights & Yayınlar' : 'Yumeiho Insights & Papers'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 dark:text-stone-100 tracking-tight">
              {language === 'tr' ? 'Klinik Makaleler & Biyomekanik Rehberler' : 'Clinical Articles & Biomechanical Guides'}
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400 text-sm max-w-2xl">
              {language === 'tr'
                ? 'Yumeiho terapisinin pelvis simetrisi, otonom sinir sistemi ve omurga sağlığı üzerindeki bilimsel etkilerini keşfedin.'
                : 'Explore scientific insights into Yumeiho therapy, pelvic symmetry, autonomic nervous system balance, and spinal health.'}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-900 text-white dark:bg-amber-400 dark:text-stone-950 shadow-sm'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700'
                }`}
              >
                {cat.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <article
              key={article.id}
              className="bg-white dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between hover:shadow-xl hover:border-amber-700/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-4">
                  <span className="inline-flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </span>
                  <span className="inline-flex items-center space-x-1 font-mono text-[11px] bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="text-lg font-serif font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {article.title[language]}
                </h3>

                <p className="text-xs text-amber-800/80 dark:text-amber-400/80 font-medium mt-1.5 mb-3">
                  {article.subtitle[language]}
                </p>

                <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed line-clamp-3">
                  {article.excerpt[language]}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs font-medium text-stone-800 dark:text-stone-200">{article.author}</p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400">{article.role[language]}</p>
                </div>

                <button
                  onClick={() => setActiveModalArticle(article)}
                  className="p-2 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-400 hover:bg-amber-900 hover:text-white dark:hover:bg-amber-400 dark:hover:text-stone-950 transition-colors"
                  title={language === 'tr' ? 'Makaleyi Oku' : 'Read Article'}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {activeModalArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative text-stone-900 dark:text-stone-100"
            >
              <button
                onClick={() => setActiveModalArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 text-xs text-amber-800 dark:text-amber-400 font-mono mb-3">
                <span className="uppercase tracking-wider font-semibold">
                  {activeModalArticle.category}
                </span>
                <span>•</span>
                <span>{activeModalArticle.date}</span>
                <span>•</span>
                <span>{activeModalArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-50 mb-2">
                {activeModalArticle.title[language]}
              </h2>

              <p className="text-sm font-medium text-amber-900 dark:text-amber-300 mb-6 italic">
                {activeModalArticle.subtitle[language]}
              </p>

              <div className="p-4 rounded-xl bg-amber-900/5 dark:bg-amber-400/5 border border-amber-900/15 dark:border-amber-400/20 mb-8">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-900 dark:text-amber-300 mb-2 flex items-center space-x-2">
                  <Bookmark className="w-4 h-4" />
                  <span>{language === 'tr' ? 'Önemli Çıkarımlar & Özet' : 'Key Clinical Takeaways'}</span>
                </h4>
                <ul className="space-y-2">
                  {activeModalArticle.keyTakeaways[language].map((takeaway, idx) => (
                    <li key={idx} className="text-xs text-stone-700 dark:text-stone-300 flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                {activeModalArticle.content[language].map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {activeModalArticle.author}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {activeModalArticle.role[language]}
                  </p>
                </div>

                <button
                  onClick={() => setActiveModalArticle(null)}
                  className="px-5 py-2.5 rounded-full bg-amber-900 dark:bg-amber-400 text-white dark:text-stone-950 font-medium text-xs hover:opacity-90 transition-opacity"
                >
                  {language === 'tr' ? 'Kapat' : 'Close Reader'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
