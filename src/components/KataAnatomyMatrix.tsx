import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Grid, Layers, Activity, Zap, CheckCircle2, Info, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MuscleTarget {
  id: string;
  name: { tr: string; jp: string; en: string };
  latinName: string;
  location: { tr: string; jp: string; en: string };
  function: { tr: string; jp: string; en: string };
  katas: {
    number: number;
    jpName: string;
    romaji: string;
    trName: string;
    enName: string;
    techniqueType: { tr: string; jp: string; en: string };
    tensionRelief: number; // percentage
    vertebraeFocus: string;
    description: { tr: string; jp: string; en: string };
  }[];
}

const MUSCLE_TARGETS: MuscleTarget[] = [
  {
    id: 'psoas',
    name: { tr: 'Psoas Major (Kalça Fleksörü)', jp: '大腰筋 (Daikokin - 股関節屈筋)', en: 'Psoas Major (Hip Flexor)' },
    latinName: 'Musculus psoas major',
    location: { tr: 'T12-L5 omurları ile uyluk kemiği iç yüzeyi arası', jp: '第12胸椎〜第5腰椎と大腿骨小転子間', en: 'Between T12-L5 vertebrae and lesser trochanter' },
    function: { tr: 'Vücudun en derin somatik ve duygusal gerilim saklama kası', jp: '身体最深部の身体的・感情的緊張蓄積筋', en: 'Deepest somatic & emotional tension storage muscle' },
    katas: [
      {
        number: 14,
        jpName: '腸骨圧迫法',
        romaji: 'Chokotsu Atsubaku-ho',
        trName: 'İliyak Kanat Bası ve Psoas Germe',
        enName: 'Iliac Wing Compression & Psoas Stretch',
        techniqueType: { tr: 'Ashi-Atsu & Traksiyon', jp: '足圧・手圧＆牽引', en: 'Ashi-Atsu & Traction' },
        tensionRelief: 92,
        vertebraeFocus: 'L1 - L4',
        description: {
          tr: 'Uygulayıcı, diz ve avuç içi basıncı ile psoas fasyasını esnetir. Bel çukuru gerilimini ve otonom sinir baskısını serbest bırakır.',
          jp: '手圧・膝圧の牽引技法により大腰筋筋膜を伸張。腰椎前弯過剰緊張と自律神経圧迫を解除。',
          en: 'Practitioner uses palm & knee traction to hydrate psoas fascia, freeing lumbar lordotic tension & autonomic nerve compression.'
        }
      },
      {
        number: 28,
        jpName: '股関節牽引牽制',
        romaji: 'Kokansetsu Keiin Kensei',
        trName: 'Kalça Eklem Traksiyonu & Uyluk Rotasyonu',
        enName: 'Hip Joint Traction & Femoral Rotation',
        techniqueType: { tr: 'Pasif Manipülasyon', jp: '受動的手技操作', en: 'Passive Manipulation' },
        tensionRelief: 88,
        vertebraeFocus: 'L4 - S1',
        description: {
          tr: 'Bacağın eksenel çekimi ile uyluk başı yuvaya oturtulur, derin pelvik psoas spazmı çözülür.',
          jp: '下肢の軸方向牽引により大腿骨頭を臼蓋に正対させ、骨盤深部の大腰筋痙攣を解きほぐす。',
          en: 'Axial leg traction reseats femoral head into acetabulum, resolving deep pelvic psoas spasms.'
        }
      }
    ]
  },
  {
    id: 'piriformis',
    name: { tr: 'Piriformis (Derin Kalça Kasını Gevşetme)', jp: '梨状筋 (Rijokin - 深部臀筋弛緩)', en: 'Piriformis (Deep Gluteal Release)' },
    latinName: 'Musculus piriformis',
    location: { tr: 'Sakrum ön yüzünden uyluk kemiği trokanter majörüne', jp: '仙骨前面より大腿骨大転子', en: 'From anterior sacrum to greater trochanter' },
    function: { tr: 'Siyatik sinirin içinden veya altından geçtiği pelvik rotatör', jp: '坐骨神経が貫通・下行する骨盤外旋筋', en: 'Pelvic rotator through which the sciatic nerve passes' },
    katas: [
      {
        number: 35,
        jpName: '臀部肘圧法',
        romaji: 'Denbu Hijiatsu-ho',
        trName: 'Gluteal Bölge Dirsek Bası Yöntemi',
        enName: 'Gluteal Elbow Pressure Technique',
        techniqueType: { tr: 'Akupresür / Derin Doku', jp: 'ツボ指圧・深部組織圧迫', en: 'Accupressure / Deep Tissue' },
        tensionRelief: 95,
        vertebraeFocus: 'L5 - S1 - S3',
        description: {
          tr: 'Piriformis kasındaki tetik noktalara dereceli dirsek basıncı uygulanarak siyatik sinir sıkışması (Yalancı Fıtık) giderilir.',
          jp: '梨状筋トリガーポイントへの漸進的肘圧迫により、偽性坐骨神経痛圧迫を根本解除。',
          en: 'Graduated elbow pressure on piriformis trigger points relieves pseudo-sciatica nerve entrapment.'
        }
      },
      {
        number: 42,
        jpName: '仙骨調整法',
        romaji: 'Senkotsu Chosei-ho',
        trName: 'Sakrum Hizalama & Piriformis Dekompresyonu',
        enName: 'Sacral Alignment & Piriformis Decompression',
        techniqueType: { tr: 'Biyomekanik Düzeltme', jp: 'バイオメカニクス矯正', en: 'Biomechanical Alignment' },
        tensionRelief: 90,
        vertebraeFocus: 'Sacroiliac Joint',
        description: {
          tr: 'Sakrum kemiğinin açısal rotasyonu düzeltilerek piriformis gerilimi eşitlenir.',
          jp: '仙骨の角度回旋を補正し、左右の梨状筋緊張度を均等化。',
          en: 'Corrects angular rotation of sacrum, balancing piriformis tension bilaterally.'
        }
      }
    ]
  },
  {
    id: 'erector_spinae',
    name: { tr: 'Erector Spinae (Omurga Doğrultucu Kaslar)', jp: '脊柱起立筋 (Sekitsui Kiritsukin)', en: 'Erector Spinae (Spinal Erectors)' },
    latinName: 'Musculus erector spinae',
    location: { tr: 'Sakrumdan kafa tabanına kadar omurga paralel hatları', jp: '仙骨より後頭骨に至る脊柱両側縦行 column', en: 'Paraspinal longitudinal columns from sacrum to occiput' },
    function: { tr: 'Omurgayı dik tutan ana postür ve omur faset eklem koruyucusu', jp: '姿勢保持と椎間関節の保護を担う主幹筋', en: 'Main postural stabilizer and facet joint protection' },
    katas: [
      {
        number: 9,
        jpName: '背部指圧波状法',
        romaji: 'Haibu Shiatsu Hajo-ho',
        trName: 'Sırt Dalga Başparmak Basısı',
        enName: 'Rhythmic Paraspinal Thumb Wave Press',
        techniqueType: { tr: 'Ritmik Yoğurma', jp: '律動的拇指揉捏', en: 'Rhythmic Kneading' },
        tensionRelief: 86,
        vertebraeFocus: 'T1 - L5',
        description: {
          tr: 'Omurganın her iki yanındaki kanallara ritmik dalga basıncı uygulanarak spastik nodüller dağıtılır.',
          jp: '脊柱両側のラインへ波状の律動的圧を加え、強直した筋肉結節を分散。',
          en: 'Applies rhythmic wave pressure down paraspinal channels, dissolving spastic muscle knots.'
        }
      },
      {
        number: 50,
        jpName: '脊椎伸展牽引',
        romaji: 'Sekitsui Shinten Keiin',
        trName: 'Omurga Uzatma & Pasif Traksiyon',
        enName: 'Spinal Extension & Passive Traction',
        techniqueType: { tr: 'Pasif Germe', jp: '受動的伸展牽引', en: 'Passive Extension' },
        tensionRelief: 94,
        vertebraeFocus: 'T6 - L5',
        description: {
          tr: 'Omur aralıkları açılarak disk içi basınç düşürülür, sırt kaslarının omurlara yaptığı baskı kalkar.',
          jp: '椎間腔を拡げて椎間板内圧を軽減し、背筋群が脊椎に及ぼす圧迫を除去。',
          en: 'Expands intervertebral spaces, dropping intradiscal pressure and relieving paraspinal tension.'
        }
      }
    ]
  },
  {
    id: 'trapezius',
    name: { tr: 'Trapezius & Cervical (Trapez ve Boyun Kasları)', jp: '僧帽筋・頸椎複合体 (Keikotsu-Sobokin)', en: 'Trapezius & Cervical Complex' },
    latinName: 'Musculus trapezius',
    location: { tr: 'Oksipital kemikten T12 omuruna ve omuz kanatlarına', jp: '後頭骨より第12胸椎および肩峰', en: 'Occiput to T12 spine and acromion process' },
    function: { tr: 'Baş oryantasyonu, omuz yüksekliği ve gerilim baş ağrıları', jp: '頭部水平保持・肩高左右差・緊張性頭痛の関与', en: 'Head orientation, shoulder height & tension headaches' },
    katas: [
      {
        number: 3,
        jpName: '頸骨回旋法',
        romaji: 'Keikotsu Kaisen-ho',
        trName: 'Boyun Omurları Rotasyonu & Dekompresyonu',
        enName: 'Cervical Spine Rotation & Traction',
        techniqueType: { tr: 'Hassas Traksiyon', jp: '精密回旋牽引', en: 'Precision Traction' },
        tensionRelief: 89,
        vertebraeFocus: 'C1 - C7',
        description: {
          tr: 'C1-C7 omurlarındaki rotasyonel kilitlenmeler yumuşak hareketlerle açılır, baş ağrısı ve kulunç giderilir.',
          jp: 'C1-C7頸椎の回旋ロックを繊細に解除し、慢性的緊張性頭痛・首凝りを解消。',
          en: 'Unlocks C1-C7 rotational subluxations gently, eliminating chronic tension headaches.'
        }
      }
    ]
  }
];

export const KataAnatomyMatrix: React.FC = () => {
  const { language } = useLanguage();
  const [selectedMuscleId, setSelectedMuscleId] = useState<string>('psoas');
  const [activeModalKata, setActiveModalKata] = useState<MuscleTarget['katas'][0] | null>(null);

  const activeMuscle = MUSCLE_TARGETS.find(m => m.id === selectedMuscleId) || MUSCLE_TARGETS[0];

  return (
    <section className="py-24 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-900/10 dark:bg-amber-400/10 text-amber-900 dark:text-amber-300 border border-amber-900/20 dark:border-amber-400/20 text-xs tracking-wider uppercase mb-3">
              <Grid className="w-3.5 h-3.5" />
              <span>{language === 'tr' ? '100 Kata Anatomi Matrisi' : '100 Kata Anatomy Matrix'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight">
              {language === 'tr' ? 'Kas Grubu & Omurga Hedefli Kata Kataloğu' : 'Muscle Group & Spinal Targeted Katas'}
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400 text-sm max-w-2xl">
              {language === 'tr'
                ? 'Yumeiho manipülasyonlarının hangi derin kas gruplarına etki ettiğini ve omurga segmentlerindeki gerilim azaltma oranlarını inceleyin.'
                : 'Discover how Yumeiho techniques release specific deep muscle groups and decompress corresponding spinal segments.'}
            </p>
          </div>
        </div>

        {/* Muscle Selector Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-stone-200 dark:border-stone-800">
          {MUSCLE_TARGETS.map(m => {
            const isSel = m.id === selectedMuscleId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMuscleId(m.id)}
                className={`px-5 py-3 rounded-xl text-xs font-medium transition-all duration-200 flex items-center space-x-2 border ${
                  isSel
                    ? 'bg-amber-900 text-white border-amber-900 dark:bg-amber-400 dark:text-stone-950 dark:border-amber-400 shadow-lg shadow-amber-900/20'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{m.name[language]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Muscle Overview */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 mb-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <span className="text-xs font-mono text-amber-800 dark:text-amber-400 italic">
                {activeMuscle.latinName}
              </span>
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                {activeMuscle.name[language]}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">
                <strong className="text-stone-800 dark:text-stone-200">{language === 'tr' ? 'Lokasyon: ' : 'Location: '}</strong>
                {activeMuscle.location[language]}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                <strong className="text-stone-800 dark:text-stone-200">{language === 'tr' ? 'Fonksiyon & Stres: ' : 'Function & Stress: '}</strong>
                {activeMuscle.function[language]}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-center">
              <span className="text-[11px] uppercase tracking-wider text-amber-900 dark:text-amber-300 font-semibold block">
                {language === 'tr' ? 'Uygulanan Kata Sayısı' : 'Mapped Kata Count'}
              </span>
              <span className="text-3xl font-serif font-bold text-amber-900 dark:text-amber-300 mt-1 block">
                {activeMuscle.katas.length} Kata
              </span>
            </div>
          </div>
        </div>

        {/* Katas Cards for active muscle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeMuscle.katas.map(kata => (
            <div
              key={kata.number}
              className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between hover:border-amber-700/50 transition-all shadow-sm group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-mono font-bold">
                    Kata #{kata.number < 10 ? `0${kata.number}` : kata.number}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-mono font-semibold">
                    %{kata.tensionRelief} {language === 'tr' ? 'Gevşeme' : 'Relief'}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-xs text-amber-800 dark:text-amber-400 font-serif block">
                    {kata.jpName} ({kata.romaji})
                  </span>
                  <h4 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                    {kata.trName}
                  </h4>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mt-3">
                  {kata.description[language]}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  <span>{language === 'tr' ? 'Omurga Odak: ' : 'Spine Focus: '}</span>
                  <strong className="text-amber-800 dark:text-amber-300">{kata.vertebraeFocus}</strong>
                </div>

                <button
                  onClick={() => setActiveModalKata(kata)}
                  className="inline-flex items-center space-x-1 text-xs font-medium text-amber-900 dark:text-amber-400 hover:underline"
                >
                  <span>{language === 'tr' ? 'Detaylar' : 'Inspect'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kata Detail Modal */}
      <AnimatePresence>
        {activeModalKata && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-stone-900 dark:text-stone-100"
            >
              <button
                onClick={() => setActiveModalKata(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="px-3 py-1 rounded bg-amber-900/10 dark:bg-amber-400/10 text-amber-900 dark:text-amber-300 font-mono text-xs font-bold">
                Kata #{activeModalKata.number} Teknik Analizi
              </span>

              <h3 className="text-2xl font-serif font-bold mt-3 text-stone-900 dark:text-stone-50">
                {activeModalKata.trName}
              </h3>
              <p className="text-xs font-serif text-amber-800 dark:text-amber-400">
                {activeModalKata.jpName} — {activeModalKata.romaji}
              </p>

              <div className="my-6 space-y-3 bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">{language === 'tr' ? 'Teknik Tipi:' : 'Technique Type:'}</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{activeModalKata.techniqueType[language]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{language === 'tr' ? 'Omur Segmenti:' : 'Spinal Segment:'}</span>
                  <span className="font-semibold text-amber-800 dark:text-amber-400 font-mono">{activeModalKata.vertebraeFocus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{language === 'tr' ? 'Kas Tonus Düzeltimi:' : 'Tone Correction:'}</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">%{activeModalKata.tensionRelief}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
                {activeModalKata.description[language]}
              </p>

              <div className="mt-8">
                <button
                  onClick={() => setActiveModalKata(null)}
                  className="w-full py-3 rounded-full bg-amber-900 dark:bg-amber-400 text-white dark:text-stone-950 font-semibold text-xs transition-opacity hover:opacity-90"
                >
                  {language === 'tr' ? 'Kapat' : 'Close Details'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
