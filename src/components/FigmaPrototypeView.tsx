import { useState, useEffect } from 'react';
import { 
  Heart, User, Activity, Droplets, Smile, MessageSquare, 
  MapPin, Clock, Video, FileText, CheckCircle2, ChevronRight,
  TrendingUp, Users, Award, HelpCircle, PhoneCall, RefreshCw, Send, Trash2
} from 'lucide-react';
import { Patient, Specialist, Consultation, ChatMessage } from '../types';

export default function FigmaPrototypeView() {
  // --- Persona State ---
  const [activePersona, setActivePersona] = useState<'paciente' | 'profissional'>('paciente');

  // --- Patient State: Interactive Biomarkers ---
  const [bpValue, setBpValue] = useState<string>("12/8");
  const [hydration, setHydration] = useState<number>(1000); // ml
  const [mood, setMood] = useState<string>("Bem");
  const [symptomsInput, setSymptomsInput] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("Todos");

  // --- Active Chat & Videocall Simulation State ---
  const [currentCallActive, setCurrentCallActive] = useState<boolean>(false);
  const [activeChatPatientId, setActiveChatPatientId] = useState<string | null>(null);

  // --- Persistent Storage/State - Synchronized across roles ---
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "pat_1",
      name: "Dona Severina Silva",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120",
      age: 68,
      condition: "Hipertensa e Diabética Tipo 2",
      city: "Grajau, São Paulo - SP",
      phone: "(11) 98765-4321",
      need: "Necessita de orientação sobre tontura leve e ajuste de dieta de baixo sal.",
      status: "Pendente",
      bloodPressure: "15/9",
      hydrationLevel: 3,
      mood: "Cansado",
      triageNotes: "Sintomática condizente com quadro leve de desidratação associado à hipertensão gestacional e senil. Recomendado encaminhamento preventivo."
    },
    {
      id: "pat_2",
      name: "Seu João Ramos",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120",
      age: 72,
      condition: "Cardiopatia leve, pós-angioplastia",
      city: "Rocinha, Rio de Janeiro - RJ",
      phone: "(21) 97541-2233",
      need: "Indagações sobre caminhadas e falta de ar moderada após exercícios.",
      status: "Pendente",
      bloodPressure: "13/8",
      hydrationLevel: 5,
      mood: "Excelente",
      triageNotes: "Falta de ar com dor em ombro sugere acompanhamento cardiológico de rotina. Classificação de prioridade preventiva média pelo protocolo de triagem."
    },
    {
      id: "pat_3",
      name: "Clarice de Souza",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120",
      age: 34,
      condition: "Gestação de Alto Risco - 28 semanas",
      city: "Aglomerado da Serra, Belo Horizonte - MG",
      phone: "(31) 96521-1254",
      need: "Febre baixa recorrente e edema severo nos membros inferiores.",
      status: "Pendente",
      bloodPressure: "14/9",
      hydrationLevel: 2,
      mood: "Neutro",
      triageNotes: "Edema nas pernas e febre sugerem triagem obstétrica rápida para evitar pré-eclâmpsia. Monitorar pressão constantemente."
    }
  ]);

  const specialties: Specialist[] = [
    {
      id: "spec_1",
      name: "Dra. Maria Clara Amaral",
      specialty: "Clínica Geral",
      association: "CRM 123456-SP",
      bio: "Especialista em saúde coletiva, com foco em hipertensão sistêmica.",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120",
      rating: 4.9,
      availability: "Seg, Qua e Sex (18h às 21h)"
    },
    {
      id: "spec_2",
      name: "Dr. André Lourenço",
      specialty: "Cardiologista",
      association: "CRM 987654-RJ",
      bio: "Médico cardiologista voluntário apaixonado por medicina preventiva.",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120",
      rating: 4.8,
      availability: "Terças e Quintas (19h às 21h)"
    },
    {
      id: "spec_3",
      name: "Dra. Juliane Vasconcellos",
      specialty: "Nutricionista",
      association: "CRN 45612-MG",
      bio: "Promotora de letramento nutricional comunitário e dietas acessíveis.",
      avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=120",
      rating: 5.0,
      availability: "Quartas (14h às 18h)"
    },
    {
      id: "spec_4",
      name: "Dr. Lucas Martins",
      specialty: "Psicólogo Clínico",
      association: "CRP 78945-SP",
      bio: "Atuação em saúde mental básica, escuta compassiva e controle de estresse crônico.",
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120",
      rating: 4.7,
      availability: "Sábados (09h às 12h)"
    }
  ];

  const [appointments, setAppointments] = useState<Consultation[]>([
    {
      id: "con_1",
      patientName: "Seu João Ramos",
      patientId: "pat_2",
      specialistName: "Dr. André Lourenço",
      specialistId: "spec_2",
      date: "Hoje",
      time: "19:30",
      status: "Agendado",
      type: "Vídeo",
      summary: "Aconselhado a manter as caminhadas diárias leves de 20 minutos apenas em terreno plano."
    }
  ]);

  // --- Real-Time Chat messages simulating user conversations ---
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [textMessageInput, setTextMessageInput] = useState<string>("");

  useEffect(() => {
    // Basic greeting system prompt matching
    setMessages([
      {
        id: "msg_init_1",
        sender: "sistema",
        senderName: "SanaLink",
        text: "Bem-vindo ao canal seguro de orientação SanaLink. Toda a comunicação é protegida e cumpre com as regulamentações vigentes de Telemedicina.",
        timestamp: "Agora"
      }
    ]);
  }, []);

  const handleSendMessage = () => {
    if (!textMessageInput.trim()) return;

    const newMsg: ChatMessage = {
      id: "msg_" + Date.now(),
      sender: activePersona === 'paciente' ? 'paciente' : 'profissional',
      senderName: activePersona === 'paciente' ? "Você (Paciente)" : "Você (Profissional)",
      text: textMessageInput,
      timestamp: "Agora"
    };

    setMessages(prev => [...prev, newMsg]);
    setTextMessageInput("");

    // Simulate reactive Clinician/Patient responses for high fidelity interactive feel
    setTimeout(() => {
      let automatedResponse = "";
      if (activePersona === 'paciente') {
        automatedResponse = "Recebi sua mensagem. Fique calmo, estou revisando seu diário de saúde aqui no prontuário. Me conte: você bebeu bastante água hoje?";
      } else {
        automatedResponse = "Muito obrigado pelas recomendações, doutor! Vou anotar tudo e tomar o remédio preventivo nos horários certos.";
      }

      setMessages(prev => [...prev, {
        id: "msg_auto_" + Date.now(),
        sender: activePersona === 'paciente' ? 'profissional' : 'paciente',
        senderName: activePersona === 'paciente' ? "Profissional Voluntário" : "Dona Severina (Paciente)",
        text: automatedResponse,
        timestamp: "Agora"
      }]);
    }, 1500);
  };

  // --- Interactive Form inputs for clinician summary writing ---
  const [anamnese, setAnamnese] = useState<string>("Paciente relata melhora, mas precisa de acompanhamento de pressão...");
  const [condutas, setCondutas] = useState<string>("Tomar bastante líquido, evitar alimentação hipersódica.");
  const [susReferral, setSusReferral] = useState<boolean>(true);

  // --- Trigger scheduling action ---
  const handleScheduleAppointment = (spec: Specialist) => {
    const newAppointment: Consultation = {
      id: "con_" + Date.now(),
      patientName: "Paciente Teste",
      patientId: "pat_test",
      specialistName: spec.name,
      specialistId: spec.id,
      date: "Amanhã",
      time: "14:00",
      status: "Agendado",
      type: "Vídeo"
    };

    setAppointments(prev => [...prev, newAppointment]);
    alert(`Orientação preventiva pré-agendada com sucesso com: ${spec.name}!`);
  };

  // --- Clear diário simulator states ---
  const handleClearDiario = () => {
    setBpValue("12/8");
    setHydration(500);
    setMood("Excelente");
  };

  // --- Filter clinicians ---
  const filteredSpecialties = selectedSpecialty === 'Todos' 
    ? specialties 
    : specialties.filter(s => s.specialty === selectedSpecialty);

  return (
    <div id="figma-prototype-section" className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-sans text-slate-100">
      
      {/* Simulation Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-5 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">Protótipo Funcional Rodando</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-emerald-500" />
            SanaLink Plataforma Virtual
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Simulação da aplicação rodando em alta fidelidade. Alterne entre os perfis de **Paciente** e **Profissional** abaixo para testar as duas perspectivas que se conectam.
          </p>
        </div>

        {/* Persona Switch Mode buttons */}
        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 gap-1 shrink-0 w-full md:w-auto">
          <button
            onClick={() => { setActivePersona('paciente'); setCurrentCallActive(false); }}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activePersona === 'paciente'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            Ver como Paciente
          </button>
          <button
            onClick={() => { setActivePersona('profissional'); setCurrentCallActive(false); }}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activePersona === 'profissional'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            Ver como Profissional
          </button>
        </div>
      </div>

      {/* Primary Simulator layout core */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= PERSONA: PACIENTE VIEW ================= */}
        {activePersona === 'paciente' && (
          <>
            {/* Sidebar Column: Paciente Tools */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile card and Status */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120" referrerPolicy="no-referrer" alt="Paciente" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Severina Mendes Silva</h4>
                  <p className="text-[10px] text-slate-500 font-mono">ID: PAT_774921</p>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded-full text-[9px] font-bold mt-1 font-mono border border-emerald-900/50">
                    <CheckCircle2 className="w-3 h-3" /> Beneficiária SanaLink
                  </div>
                </div>
              </div>

              {/* Biomarkers Interactive logging diário */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">Diário de Biomarcadores</h4>
                  <button onClick={handleClearDiario} className="p-1 hover:bg-slate-800 rounded bg-slate-950 hover:text-red-400 text-slate-500" title="Reiniciar">
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>

                {/* Pressure Logger */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 block font-bold">Pressão Arterial Recente</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={bpValue}
                      onChange={(e) => setBpValue(e.target.value)}
                      placeholder="Ex: 12/8"
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded p-2 focus:border-teal-500 outline-none w-full font-mono font-bold"
                    />
                    <div className="flex bg-slate-950 border border-slate-800 rounded divide-x divide-slate-800">
                      <button onClick={() => setBpValue("12/8")} className="px-2 text-[10px] hover:bg-slate-800 text-teal-400" title="Normal">12/8</button>
                      <button onClick={() => setBpValue("15/9")} className="px-2 text-[10px] hover:bg-slate-800 text-amber-500" title="Alta">15/9</button>
                      <button onClick={() => setBpValue("8/5")} className="px-2 text-[10px] hover:bg-slate-800 text-red-400" title="Baixa">8/5</button>
                    </div>
                  </div>
                  {bpValue === "15/9" && (
                    <div className="bg-amber-950/40 border border-amber-900 p-2 rounded text-[10px] text-amber-400 leading-tight">
                      ⚠️ <b>Pressão Elevada!</b> É recomendado beber água, evitar sal e agendar uma orientação com clínico geral hoje.
                    </div>
                  )}
                </div>

                {/* Hydration Logger */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-400 block">
                    <span className="font-bold">Consumo de Água diário</span>
                    <span className="font-mono text-teal-400">{hydration}ml / 2500ml</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div className="bg-teal-500 h-2 transition-all duration-300" style={{ width: `${Math.min((hydration / 2500) * 100, 100)}%` }} />
                  </div>
                  <div className="flex gap-1.5 justify-between">
                    <button onClick={() => setHydration(prev => prev + 250)} className="flex-1 py-1.5 bg-slate-950 hover:bg-slate-800 rounded text-[10px] text-teal-300 border border-teal-900/30 flex items-center justify-center gap-1 select-none">
                      <Droplets className="w-3.5 h-3.5" /> +1 Copo (250ml)
                    </button>
                    <button onClick={() => setHydration(prev => prev + 500)} className="flex-1 py-1.5 bg-slate-950 hover:bg-slate-800 rounded text-[10px] text-teal-300 border border-teal-900/30 flex items-center justify-center gap-1 select-none">
                      <Droplets className="w-3.5 h-3.5" /> +Garrafa (500ml)
                    </button>
                  </div>
                </div>

                {/* Mood Logger */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 block font-bold">Como está se sentindo hoje?</label>
                  <div className="flex justify-between gap-1 bg-slate-950 p-2 rounded border border-slate-800">
                    {["Excelente", "Bem", "Neutras", "Cansada", "Mal"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMood(m)}
                        className={`p-1.5 text-xs rounded transition-all flex flex-col items-center flex-1 ${
                          mood === m ? 'bg-teal-950 text-teal-300 border border-teal-800' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <Smile className="w-4 h-4 mb-0.5" />
                        <span className="text-[8px] tracking-tight">{m}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* List of Scheduled TeleConsultations in progress */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono border-b border-slate-800 pb-2 mb-2">Suas Conexões Ativas</h4>
                <div className="space-y-3">
                  {appointments.map((app) => (
                    <div key={app.id} className="p-3 bg-slate-950 rounded border border-slate-800 space-y-2">
                      <div className="flex justify-between items-start text-xs">
                        <div>
                          <p className="font-bold text-white">{app.specialistName}</p>
                          <p className="text-[10px] text-teal-400">{app.specialistId.includes('spec_2') ? 'Cardiologista' : 'Especialista de Saúde'}</p>
                        </div>
                        <span className="px-2 py-0.5 bg-teal-950/80 text-teal-400 text-[10px] rounded border border-teal-900/50 font-mono font-bold">
                          {app.date} às {app.time}
                        </span>
                      </div>
                      
                      <div className="flex gap-2 pt-1 border-t border-slate-900/60 mt-1">
                        <button
                          onClick={() => {
                            setActiveChatPatientId(app.patientId);
                            setCurrentCallActive(true);
                          }}
                          className="flex-1 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded text-[10px] font-bold flex items-center justify-center gap-1 shadow-lg shadow-teal-950/20"
                        >
                          <Video className="w-3.5 h-3.5" /> Ingressar na Sala
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* General Center Area of Patient: TeleConsultation list OR active Chat */}
            <div className="lg:col-span-8 space-y-6">
              
              {currentCallActive ? (
                /* ACTIVE MULTIPURPOSE CONSULTATION ROOM */
                <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col h-[520px]">
                  
                  {/* Call Header bar */}
                  <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800">
                          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120" referrerPolicy="no-referrer" alt="Doctor" className="w-full h-full object-cover" />
                        </div>
                        <span className="h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-950 absolute bottom-0 right-0" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Dr. André Lourenço (Voluntário)</h4>
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500 block animate-pulse" />
                          <span className="text-[10px] font-mono text-slate-400">Em sessão de vídeo síncrona</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentCallActive(false)}
                      className="px-3 py-1.5 bg-red-950 hover:bg-red-950 text-red-400 rounded text-xs font-mono font-bold hover:text-red-300"
                    >
                      Desconectar
                    </button>
                  </div>

                  {/* Call Workspace Grid (Call Visual + Active chat) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 flex-1 h-full overflow-hidden text-xs">
                    
                    {/* Simulated Videofeed */}
                    <div className="bg-slate-950 p-4 flex flex-col justify-between border-r border-slate-800 relative">
                      <div className="bg-slate-900/50 p-2.5 rounded border border-slate-800/50">
                        <p className="text-[10px] text-slate-400 tracking-wider uppercase font-mono font-bold">Biomarcadores Compartilhados</p>
                        <div className="grid grid-cols-2 gap-2 mt-2 font-mono">
                          <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px]">
                            <span className="text-slate-500 block text-[9px] uppercase">Pressão</span>
                            <span className={bpValue === '15/9' ? 'text-amber-500 font-bold' : 'text-slate-300 font-bold'}>{bpValue}</span>
                          </div>
                          <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px]">
                            <span className="text-slate-500 block text-[9px] uppercase">Hidratação</span>
                            <span className="text-teal-400 font-bold">{hydration}ml</span>
                          </div>
                        </div>
                      </div>

                      {/* Video Camera Render Simulator Graphic */}
                      <div className="w-full h-48 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 relative overflow-hidden my-4 group">
                        <img 
                          src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=320" 
                          referrerPolicy="no-referrer" 
                          alt="Video feed" 
                          className="w-full h-full object-cover opacity-80" 
                        />
                        <div className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[9px] font-mono text-slate-300 border border-slate-800/40">
                          FEED DO VOLUNTÁRIO
                        </div>
                        
                        {/* Selfie box */}
                        <div className="absolute bottom-2 right-2 w-16 h-20 bg-slate-950 rounded-md border border-slate-850 overflow-hidden ring-2 ring-teal-500/50 shadow-lg">
                          <img 
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120" 
                            referrerPolicy="no-referrer" 
                            alt="Selfie feed" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      </div>

                      <div className="inline-flex gap-2 bg-red-950/20 border border-red-900/30 p-2.5 rounded-lg">
                        <PhoneCall className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-[10px] text-slate-400 leading-tight">Tele-orientações do SanaLink servem para triagem pré-clínica, apoio primário e letramento de saúde. <b>Não devem ser usadas para diagnósticos graves de emergência ou prescrição ilegal de psicotrópicos.</b></span>
                      </div>
                    </div>

                    {/* Active consultation Live Interactive Chat messages sidebar */}
                    <div className="flex flex-col justify-between bg-slate-900 overflow-hidden">
                      
                      {/* Message History flow container */}
                      <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[360px]">
                        {messages.map((m) => (
                          <div key={m.id} className={`flex flex-col ${
                            m.sender === 'paciente' ? 'items-end' : 'items-start'
                          }`}>
                            <span className="text-[9px] text-slate-500 mb-1 font-semibold">{m.senderName}</span>
                            <div className={`p-2.5 rounded-lg max-w-[200px] leading-relaxed text-[11px] ${
                              m.sender === 'paciente' 
                                ? 'bg-teal-600 text-white rounded-br-none' 
                                : m.sender === 'sistema' 
                                ? 'bg-slate-950 text-slate-400 border border-slate-800/40 font-mono text-[10px]'
                                : 'bg-slate-950 text-slate-200 border border-slate-850 rounded-bl-none'
                            }`}>
                              {m.text}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Msg Input form bar */}
                      <div className="p-3 bg-slate-950 border-t border-slate-850 flex gap-2">
                        <input
                          type="text"
                          value={textMessageInput}
                          onChange={(e) => setTextMessageInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Digite aqui para falar com o médico..."
                          className="bg-slate-900 border border-slate-800 rounded p-2 text-xs outline-none focus:border-teal-500 flex-1 text-slate-200"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="p-2 bg-teal-600 hover:bg-teal-500 rounded text-white flex items-center justify-center transition-colors shadow"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              ) : (
                /* STANDARD VOLUNTEER SPECIALIST LIST DIRECTORY */
                <div className="space-y-6">
                  
                  {/* Category filter menu */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-white">Especialistas Voluntários em Plantão</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Conecte-se com profissionais credenciados de forma totalmente gratuita.</p>
                    </div>
                    
                    <div className="flex gap-1.5 shrink-0 select-none bg-slate-950 p-1 rounded-lg border border-slate-800">
                      {["Todos", "Clínica Geral", "Cardiologista", "Nutricionista", "Psicólogo Clínico"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSpecialty(s)}
                          className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${
                            selectedSpecialty === s 
                              ? 'bg-teal-950 text-teal-400 shadow-sm'
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {s.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grid layout of Clinicians */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSpecialties.map((spec) => (
                      <div key={spec.id} className="bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4">
                        <div className="flex items-start gap-3.5">
                          <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-800 border border-slate-750 shrink-0">
                            <img src={spec.avatar} referrerPolicy="no-referrer" alt={spec.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="px-2 py-0.5 bg-slate-950 rounded text-[9px] font-bold font-mono text-teal-400 border border-teal-900/30 font-semibold">{spec.specialty}</span>
                            <h4 className="text-sm font-bold text-white mt-1 leading-tight">{spec.name}</h4>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">{spec.association}</p>
                            
                            {/* Rating and stars */}
                            <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-300 font-semibold">
                              <span className="text-yellow-500">★</span>
                              <span>{spec.rating.toFixed(1)}</span>
                              <span className="text-slate-500">•</span>
                              <span className="text-[9px] text-emerald-400 font-mono font-bold leading-none bg-emerald-950/50 px-1 py-0.5 rounded border border-emerald-900/20">ODS 3 Ativo</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-400 italic line-clamp-2 leading-relaxed">
                          "{spec.bio}"
                        </p>

                        <div className="pt-3 border-t border-slate-800/70 flex justify-between items-center text-[10px] text-slate-500">
                          <div>
                            <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-mono">Disponibilidade</span>
                            <span className="font-semibold text-slate-400 mt-0.5 block">{spec.availability}</span>
                          </div>

                          <button
                            onClick={() => handleScheduleAppointment(spec)}
                            className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-3 py-1.5 rounded text-[10px] flex items-center gap-1 shadow-md shadow-teal-900/20"
                          >
                            Agendar <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          </>
        )}

        {/* ================= PERSONA: PROFISSIONAL/VOLUNTÁRIO VIEW ================= */}
        {activePersona === 'profissional' && (
          <>
            {/* Sidebar Column: Clinician dashboard */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Doctor card */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700">
                  <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120" referrerPolicy="no-referrer" alt="Doctor" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Dr. André Lourenço</h4>
                  <p className="text-[10px] text-slate-500 font-mono">CRM: 987654-RJ (Cardiologista)</p>
                  <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-950 text-blue-400 rounded-full text-[9px] font-bold mt-1 font-mono border border-blue-900/40">
                    <Award className="w-3 h-3" /> Membro Voluntário Platina
                  </div>
                </div>
              </div>

              {/* Startup Clinical triage list queue */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">Fila de Triagens Ativas</h4>
                  <span className="px-2 py-0.5 bg-slate-950 rounded text-[9px] text-blue-400 font-mono font-bold border border-blue-900">
                    {patients.length} pendentes
                  </span>
                </div>

                <div className="space-y-3">
                  {patients.map((pat) => (
                    <div 
                      key={pat.id} 
                      onClick={() => {
                        setActiveChatPatientId(pat.id);
                        setAnamnese(pat.need);
                        setBpValue(pat.bloodPressure || "12/8");
                      }}
                      className={`p-3 rounded border text-xs cursor-pointer transition-all ${
                        activeChatPatientId === pat.id 
                          ? 'bg-blue-950/40 border-blue-600 text-blue-300' 
                          : 'bg-slate-950 border-slate-800/80 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1 font-semibold">
                        <span>{pat.name} ({pat.age} anos)</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono ${
                          pat.bloodPressure === '15/9' ? 'bg-amber-950 text-amber-400 border border-amber-900' : 'bg-slate-900 text-slate-400'
                        }`}>
                          PA: {pat.bloodPressure || 'N/A'}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 italic mt-1 line-clamp-1">"{pat.condition}"</p>
                      <div className="text-[9px] text-slate-400 bg-slate-900/80 p-1.5 rounded mt-1.5 font-mono">
                        📍 {pat.city}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ESG/ODS 3 Impact statistics charts mockup */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono border-b border-slate-800 pb-2 mb-2">Metas ODS 3 Coletadas</h4>
                
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-850">
                    <Users className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <span className="block text-[14px] font-bold text-white font-mono">1.240+</span>
                    <span className="text-[8px] text-slate-500 uppercase tracking-wider block mt-0.5">Atendidos</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-850">
                    <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                    <span className="block text-[14px] font-bold text-white font-mono">3.450h</span>
                    <span className="text-[8px] text-slate-500 uppercase tracking-wider block mt-0.5">Voluntariado</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded border border-slate-850 text-[10px] text-slate-400 space-y-1">
                  <p className="flex justify-between">
                    <span>Meta 3.8 Universal Care:</span>
                    <span className="text-emerald-400 font-bold font-mono">85% Completo</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Mortalidade Prematura (3.4):</span>
                    <span className="text-blue-400 font-bold font-mono">-12% Redução local</span>
                  </p>
                </div>
              </div>

            </div>

            {/* General Center Area of Professional: Active call, diagnostic form generator */}
            <div className="lg:col-span-8 space-y-6">
              
              {activeChatPatientId ? (
                <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col">
                  
                  {/* Active connection header */}
                  <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-white">Orientando: {patients.find(p => p.id === activeChatPatientId)?.name}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 block" />
                        <p className="text-[10px] text-slate-400">Classificação clínica de triagem prévia concluída. Pronto para conduzir a teleorientação.</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setCurrentCallActive(true);
                      }}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold flex items-center gap-1 shadow-lg shadow-blue-900/10"
                    >
                      <Video className="w-4 h-4" /> Iniciar Vídeo Chamada
                    </button>
                  </div>

                  {/* Consultation layout: clinical diário analyzer + interactive medical prescription recorder */}
                  <div className="grid grid-cols-1 md:grid-cols-2 text-xs divide-y md:divide-y-0 md:divide-x divide-slate-800">
                    
                    {/* Patient analysis folder details */}
                    <div className="p-4 space-y-4">
                      <div className="bg-slate-950 p-3 rounded border border-slate-850 space-y-2">
                        <h5 className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">Histórico de Sintomas da Triagem</h5>
                        <div className="p-2 bg-slate-900/60 rounded text-[11px] text-slate-300 italic leading-relaxed border-l-2 border-amber-400">
                          "{patients.find(p => p.id === activeChatPatientId)?.triageNotes}"
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">Análise de Diários do Paciente</h5>
                        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10.5px]">
                          <div className="p-2 bg-slate-950 rounded border border-slate-850">
                            <span className="text-slate-500 block text-[8px] uppercase">Pressão</span>
                            <span className="text-slate-200 font-bold block mt-1">{bpValue}</span>
                          </div>
                          <div className="p-2 bg-slate-950 rounded border border-slate-850">
                            <span className="text-slate-500 block text-[8px] uppercase">Água</span>
                            <span className="text-teal-400 font-bold block mt-1">{hydration}ml</span>
                          </div>
                          <div className="p-2 bg-slate-950 rounded border border-slate-850">
                            <span className="text-slate-500 block text-[8px] uppercase">Humor</span>
                            <span className="text-yellow-500 font-bold block mt-1">{mood}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 bg-slate-950/70 p-3 rounded border border-slate-850">
                        <span className="text-[9px] text-slate-400 uppercase font-mono block">Contato de ajuda</span>
                        <span className="font-bold text-slate-200 font-mono">{patients.find(p => p.id === activeChatPatientId)?.phone}</span>
                        <span className="text-[9px] text-slate-500 block leading-tight">Use apenas em caso de encerramento inadequado do chat síncrono.</span>
                      </div>
                    </div>

                    {/* Diagnostic text builder form */}
                    <div className="p-4 space-y-4 flex flex-col justify-between">
                      <div className="space-y-4">
                        <h5 className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800 pb-2 mb-2">Ficha de Orientação Preventiva</h5>

                        <div className="space-y-1.5">
                          <label className="font-bold text-slate-400 block text-[11px]">Sintomas Analisados (Anamnese)</label>
                          <textarea
                            value={anamnese}
                            onChange={(e) => setAnamnese(e.target.value)}
                            rows={2}
                            placeholder="Ex: Cansaço e dor de cabeça em dias quentes..."
                            className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:border-blue-500 outline-none text-slate-200 font-serif"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-bold text-slate-400 block text-[11px]">Condutas e Hábitos Recomendados</label>
                          <textarea
                            value={condutas}
                            onChange={(e) => setCondutas(e.target.value)}
                            rows={3}
                            placeholder="Ex: Repouso, aumento substancial da ingestão hídrica, caminhadas leves..."
                            className="w-full bg-slate-950 border border-slate-800 rounded p-2 focus:border-blue-500 outline-none text-slate-200 font-serif"
                          />
                        </div>

                        <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded border border-slate-850">
                          <input
                            type="checkbox"
                            checked={susReferral}
                            onChange={(e) => setSusReferral(e.target.checked)}
                            id="sus"
                            className="accent-blue-500 cursor-pointer h-4 w-4"
                          />
                          <label htmlFor="sus" className="text-[10.5px] font-bold text-slate-400 leading-tight block select-none cursor-pointer">
                            Recomendar encaminhamento clínico para Unidade Básica do SUS
                          </label>
                        </div>
                      </div>

                      {/* Action save summary clinical sheet and remove patient from queue */}
                      <button
                        onClick={() => {
                          const updatedPatients = patients.filter(p => p.id !== activeChatPatientId);
                          setPatients(updatedPatients);
                          setActiveChatPatientId(null);
                          alert("Sumário Clínico registrado e assinado com sucesso! Enviado em PDF criptografado para o aplicativo do beneficiário.");
                        }}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-xs tracking-wide shadow transition-colors block text-center"
                      >
                        Assinar, Criptografar e Concluir
                      </button>
                    </div>

                  </div>

                </div>
              ) : (
                <div className="p-10 border border-slate-800 rounded-xl bg-slate-900 shadow text-center text-xs text-slate-500 font-sans italic">
                  Por favor, selecione um paciente da fila de triagens pendentes ao lado para iniciar a análise médica e a telessaúde síncrona.
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
}
