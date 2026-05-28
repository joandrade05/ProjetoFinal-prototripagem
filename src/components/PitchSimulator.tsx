import { useState, useEffect } from 'react';
import { 
  Play, StopCircle, RefreshCw, Sparkles, ChevronLeft, ChevronRight, 
  Tv, ClipboardList, Timer, MessageSquareCode, Volume2
} from 'lucide-react';

export default function PitchSimulator() {
  // --- Slides State ---
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  
  const slides = [
    {
      title: "O Gancho & O Problema",
      subtitle: "A Desigualdade na Atenção Básica de Saúde",
      bulletPoints: [
        "Milhões de brasileiros vivem em vazios assistenciais sem consulta médica periódica.",
        "A atenção básica sobrecarregada congestiona hospitais de emergência (UPAs) com queixas leves.",
        "Idosos e doentes crônicos sofrem com a falta de letramento preventivo e exames primários básicos."
      ],
      icon: "🚨"
    },
    {
      title: "A Solução: SanaLink",
      subtitle: "Conectando Cuidado a quem mais precisa",
      bulletPoints: [
        "Plataforma web simplificada que conecta profissionais/estudantes de saúde voluntários a beneficiários.",
        "Diário inteligente de saúde integrando biomarcadores diários com teleorientação ágil.",
        "Triagem inicial estruturada pré-categorizando as queixas, acelerando o encaminhamento responsável."
      ],
      icon: "🎯"
    },
    {
      title: "Contribuição Direta ODS 3",
      subtitle: "Metas Globais na Prática Social de Impacto",
      bulletPoints: [
        "Meta 3.8: Cobertura universal de orientação à saúde, mitigando riscos severos à população de baixa renda.",
        "Meta 3.4: Redução de mortes precoces por comorbidades crônicas (Monitoramento de Hipertensão e Diabetes).",
        "Meta 3.c: Capacitação e apoio prático a estudantes de medicina, enfermagem e psicologia comunitária."
      ],
      icon: "🇺🇳"
    },
    {
      title: "Modelo de Sustentabilidade",
      subtitle: "Socio-Environmental Impact (ESG)",
      bulletPoints: [
        "B2B ESG Corporate: Grandes corporações custeiam a infraestrutura telessaudável em troca de incentivos de sustentabilidade social.",
        "B2G (Parcerias Municipais): Integração com prefeituras para descentralizar e triar as filas do SUS local.",
        "Planos voluntários assistidos e emendas de fomento científico."
      ],
      icon: "💼"
    },
    {
      title: "O Pedido (The Ask)",
      subtitle: "Escalar e Transformar Vidas",
      bulletPoints: [
        "Apoio técnico de mentoria com HealthTechs consagradas.",
        "Incentivos financeiros para certificar prontuários ICP-Brasil de telepresença regulamentados.",
        "Slogan: 'SanaLink: Conectando empatia à necessidade, descentralizando a saúde brasileira.'"
      ],
      icon: "🚀"
    }
  ];

  // --- Practice Timer State ---
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- AI Script Generator states ---
  const [customStartup, setCustomStartup] = useState<string>("SanaLink");
  const [customPublic, setCustomPublic] = useState<string>("Populações de baixa renda e idosos");
  const [customSpecialties, setCustomSpecialties] = useState<string>("Clínica Geral, Psicologia e Nutrição");
  const [problemBrief, setProblemBrief] = useState<string>("Sobreposição de UPAs e atraso em consultas informativas");
  const [aiPitchScript, setAiPitchScript] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState<boolean>(false);

  // Default prepared pitch script
  const defaultScript = `### [0:00 - 0:30] O Gancho do Tubarão 💸
[Fale com convicção, olhando nos olhos dos jurados]
"Senhores investidores, pensem no dia em que vocês sentiram uma dor aguda e precisaram de orientação médica rápida. Quantos minutos levou para ligarem para as suas consultorias médicas privadas? Provavelmente menos de 5.
Agora pensem na realidade de Severina Silva. Ela tem 68 anos, mora em uma comunidade no extremo leste de São Paulo e viu sua pressão subir repentinamente hoje. Para falar com um médico voluntário ou obter um letramento simples no SUS, a realidade dela é esperar até 4 semanas em uma fila de espera da UBS presencial."

### [0:30 - 1:15] O Problema e Metas ODS 3 🚨
"Esse vazio de saúde empurra Severina para a automedicação prejudicial, ou para superlotar as enfermarias físicas de emergência, as UPAs, com queixas totalmente ambulatoriais de baixa complexidade. Isso gera custos enormes ao município e perda de vidas por diagnósticos tardios de hipertensão, o que fere flagrantemente o ODS 3 de Saúde e Bem-Estar da ONU."

### [1:15 - 2:00] A Plataforma SanaLink 🎯
"A nossa startup se chama **SanaLink**. Conectamos em uma única ponta médicos, psicólogos e estudantes universitários em fase de internado supervisionado a esses milhões de beneficiários de periferia. 
Através de um diário móvel inteligente com acompanhamento de biomarcadores (pressão, água, estresse) e triagem clínica estruturada, o paciente recebe acolhimento pré-clínico por chat ou videoconferência de qualidade, de forma remota, protegida e orientada."

### [2:00 - 2:30] Modelo de Negócios e Sustentabilidade 💼
"Mas como isso se apoia financeiramente? Não vendemos nada ao beneficiário. Nosso modelo é B2B focado em empresas em conformidade com metas de ESG (Governança Ambiental, Social e Corporativa), que financiam servidores e suporte voluntário para abater encargos fiscais, além de licenciamento de software para prefeituras de pequeno e médio porte."

### [2:30 - 3:00] O Fechamento Magnífico 🚀
"Hoje, viemos ao Shark Tank buscar mentores estratégicos que nos ajudem a integrar conexões de telessaúde com certificação digital ICP-Brasil e parcerias com cooperativas médicas. 
Invistam no **SanaLink** e conectem empatia médica a quem mais necessita sobreviver. Muito Obrigado!"`;

  useEffect(() => {
    // Populate default text
    setAiPitchScript(defaultScript);
  }, []);

  const handleGenerateCustomPitch = async () => {
    setLoadingAI(true);
    try {
      const response = await fetch("/api/gemini/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "pitch",
          startupName: customStartup,
          targetPublic: customPublic,
          specialties: customSpecialties,
          problemDetails: problemBrief
        })
      });

      const data = await response.json();
      if (data.text) {
        setAiPitchScript(data.text);
      } else if (data.error) {
        setAiPitchScript(`### Diferença por Falha de Chave\n${data.error}\n\n${defaultScript}`);
      }
    } catch (err: any) {
      console.error(err);
      setAiPitchScript(`### Erro na geração\nFalha ao conectar com o servidor. Exibindo roteiro ideal:\n\n${defaultScript}`);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Visual Slideshow Presenter and Control tool */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row gap-8 items-stretch">
        
        {/* Slides Workspace */}
        <div className="flex-1 bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between min-h-[300px] relative">
          
          <div className="absolute top-4 right-4 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-400 font-mono">
            Slide {currentSlide + 1} de {slides.length}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl filter drop-shadow">{slides[currentSlide].icon}</span>
              <div>
                <span className="text-[10px] text-teal-400 uppercase tracking-wider font-mono font-bold">Startup Pitch Deck (Apresentação)</span>
                <h4 className="text-lg font-bold text-white leading-tight">{slides[currentSlide].title}</h4>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-bold border-l-2 border-teal-500 pl-2">
              {slides[currentSlide].subtitle}
            </p>

            <ul className="space-y-2 text-xs text-slate-300 mt-4 list-decimal list-inside pl-1">
              {slides[currentSlide].bulletPoints.map((point, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="text-slate-200">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-slate-800/60 mt-4">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
              disabled={currentSlide === 0}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-slate-900 rounded font-semibold text-xs text-slate-300 border border-slate-800"
            >
              Anterior
            </button>

            <div className="flex gap-1">
              {slides.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-teal-500 scale-125' : 'bg-slate-800'}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
              disabled={currentSlide === slides.length - 1}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:hover:bg-teal-600 rounded font-bold text-xs text-white"
            >
              Próximo
            </button>
          </div>

        </div>

        {/* Stopwatch presentation practice tool sidebar */}
        <div className="w-full md:w-[280px] bg-slate-900 flex flex-col justify-between space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 flex-1 flex flex-col justify-center text-center">
            <Timer className="w-8 h-8 text-amber-500 mx-auto" />
            
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono block">Cronômetro Prática (Shark Tank)</span>
              <span className="text-3xl font-bold font-mono text-white block my-1">
                {formatTime(secondsElapsed)}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setTimerActive(prev => !prev)}
                className={`flex-1 py-1.5 rounded text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
                  timerActive 
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {timerActive ? <StopCircle className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                {timerActive ? 'Pausar' : 'Praticar'}
              </button>
              
              <button
                onClick={() => { setTimerActive(false); setSecondsElapsed(0); }}
                className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 text-slate-400 hover:text-slate-200"
                title="Reiniciar timer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[10px] text-slate-500 leading-tight">
              ⏱️ <b>Tempo ideal de Pitch:</b> 3 minutos (180 segundos). Tente praticar mudando os slides conforme o cronômetro avança!
            </div>
          </div>
        </div>

      </div>

      {/* Dynamic script and custom script builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Custom Startup Parameters */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl espacio-y-4 h-fit">
          <h4 className="text-md font-bold text-white flex items-center gap-1.5 border-b border-slate-850 pb-2.5 mb-4">
            <Sparkles className="w-5 h-5 text-teal-400" />
            Parâmetros do Roteiro
          </h4>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-400 font-bold block mb-1">Nome da Startup</label>
              <input
                type="text"
                value={customStartup}
                onChange={(e) => setCustomStartup(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:border-teal-500 outline-none text-slate-200 font-mono font-bold"
              />
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">Público-alvo Conectado</label>
              <input
                type="text"
                value={customPublic}
                onChange={(e) => setCustomPublic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:border-teal-500 outline-none text-slate-200"
              />
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">Especialidades Médicas</label>
              <input
                type="text"
                value={customSpecialties}
                onChange={(e) => setCustomSpecialties(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:border-teal-500 outline-none text-slate-200"
              />
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">Problema Central Mapeado</label>
              <textarea
                value={problemBrief}
                onChange={(e) => setProblemBrief(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:border-teal-500 outline-none text-slate-200 font-sans"
              />
            </div>

            <button
              onClick={handleGenerateCustomPitch}
              disabled={loadingAI}
              className="w-full py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold rounded flex items-center justify-center gap-1.5 shadow transition-colors font-sans mt-2 cursor-pointer"
            >
              {loadingAI ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 animate-pulse" />}
              {loadingAI ? 'Ajustando Texto...' : 'Atualizar Texto do Pitch'}
            </button>
          </div>
        </div>

        {/* Right Preview Box: Interactive script/teleprompter */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-[9px] text-teal-400 font-mono font-bold uppercase tracking-wider block mb-1">Roteiro Completo de Apresentação (Teleprompter)</span>
            <h4 className="text-md font-bold text-white flex items-center gap-1.5 border-b border-slate-850 pb-2.5 mb-4">
              <ClipboardList className="w-4 h-4 text-teal-500" />
              Roteiro de 3 Minutos: Shark Tank Brasil
            </h4>

            {/* Custom styled text output rendered formatted */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 max-h-[340px] overflow-y-auto text-xs text-slate-300 font-sans space-y-3 leading-relaxed scrollbar-thin">
              {aiPitchScript.split("\n\n").map((para, idx) => {
                // Formatting highlights on header blocks and instructions
                if (para.startsWith("###")) {
                  return <h5 key={idx} className="font-bold text-teal-400 text-sm mt-3 pt-2 border-t border-slate-900/55 first:border-0 first:mt-0 first:pt-0 font-sans">{para.replace("### ", "")}</h5>;
                }
                if (para.startsWith("[")) {
                  return <p key={idx} className="text-amber-500 italic bg-amber-950/20 px-2.5 py-1.5 rounded text-[11px] border-l border-amber-800/40">{para}</p>;
                }
                return <p key={idx} className="text-slate-300">{para}</p>;
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 flex justify-between items-center text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" /> Fale calmamente e articulado
            </span>
            <span className="font-mono text-teal-400">Gerador de Roteiro Acadêmico</span>
          </div>

        </div>

      </div>

    </div>
  );
}
