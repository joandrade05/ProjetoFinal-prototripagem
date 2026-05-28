import { useState } from 'react';
import { Layers, ShieldCheck, ChevronRight, Download } from 'lucide-react';

export default function DiagramClasses() {
  const classesData = [
    {
      name: "Usuario (Superclasse)",
      description: "Representa a entidade de autenticação base comum para pacientes, médicos, voluntários e administradores.",
      attributes: [
        "+ id: String",
        "+ nome: String",
        "+ email: String",
        "+ cpf: String",
        "+ statusPerfil: EnumPerfil",
        "+ dataCriacao: Date"
      ],
      methods: [
        "+ realizarLogin(): Boolean",
        "+ atualizarCadastro(dados): Void",
        "+ recuperarSenha(): Void"
      ]
    },
    {
      name: "Paciente (Herda de Usuario)",
      description: "Especialização do usuário beneficiário, contendo prontuário e seu diário de bem-estar.",
      attributes: [
        "+ dataNascimento: Date",
        "+ cidade: String",
        "+ contatoEmergencia: String",
        "+ comorbidades: List<String>",
        "+ pressaoArterialRecente: String"
      ],
      methods: [
        "+ registrarBiomarcador(pa, humor, h2o): Void",
        "+ solicitarAtendimento(queixa): Triagem",
        "+ visualizarOrientacoesPassadas(): List<Orientacao>"
      ],
      inheritance: "Usuario"
    },
    {
      name: "Profissional (Herda de Usuario)",
      description: "Especialização do voluntário credenciado que fornece telecriagem e aconselhamento preventivo.",
      attributes: [
        "+ especialidade: String",
        "+ nroConselho: String",
        "+ ufConselho: String",
        "+ bioResumida: String",
        "+ verificado: Boolean",
        "+ scoreAvaliacao: Float"
      ],
      methods: [
        "+ preencherOrientacao(agendamentoId, conduta): Void",
        "+ gerenciarAgendaDisponivel(horarios): Void",
        "+ aprovarTriagem(triagemId): Void"
      ],
      inheritance: "Usuario"
    },
    {
      name: "Triagem (Fila de Ajuda)",
      description: "Agrega sintomas e classificação clínica inicial de prioridades antes do profissional voluntário assumir.",
      attributes: [
        "+ id: String",
        "+ pacienteId: String",
        "+ sintomasApresentados: String",
        "+ gravidadeEstimada: EnumGravidade",
        "+ observacaoTriagem: String",
        "+ dataCriacao: Date",
        "+ ativo: Boolean"
      ],
      methods: [
        "+ calcularPrioridade(): String",
        "+ encerrarTriagem(motivo): Void",
        "+ vincularAgendamento(agendamentoId): Void"
      ]
    },
    {
      name: "Agendamento (Consulta)",
      description: "Rege o agendamento de teleorientação síncrona por voz, chat ou videoconferência.",
      attributes: [
        "+ id: String",
        "+ pacienteId: String",
        "+ profissionalId: String",
        "+ dataAtendimento: Date",
        "+ horaInicio: Time",
        "+ canalAtendimento: EnumCanal",
        "+ statusConsulta: EnumStatus"
      ],
      methods: [
        "+ confirmarAgendamento(): Void",
        "+ iniciarTeleconsulta(): VideoStream",
        "+ cancelarAtendimento(motivo): Void"
      ]
    },
    {
      name: "OrientacaoClinica (Sumário)",
      description: "Resultado de orientação preventiva armazenado em conformidade com a LGPD e saúde digital.",
      attributes: [
        "+ id: String",
        "+ agendamentoId: String",
        "+ anamnesePreventiva: String",
        "+ condutaSugerida: String",
        "+ encaminhamentoSUS: Boolean",
        "+ dataEmissao: Date"
      ],
      methods: [
        "+ gerarPDFParaPaciente(): PdfBlob",
        "+ assinarDigitalmente(token): Boolean"
      ]
    }
  ];

  const [activeClass, setActiveClass] = useState<string>("Paciente (Herda de Usuario)");
  const currentClassDetails = classesData.find(c => c.name === activeClass) || classesData[1];

  const downloadSVG = () => {
    const svgEl = document.getElementById("class-diagram-svg");
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgEl);
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!source.match(/^<svg[^>]+xmlns\:xlink="http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "diagrama-classes-sanalink.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div id="diagram-classes" className="p-6 bg-slate-50 rounded-xl border border-slate-200 font-sans">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Interactive Graph Representation of Class Connections */}
        <div className="flex-1 bg-white p-5 rounded-lg shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Layers className="w-5 h-5" />
                </span>
                <h4 className="text-md font-bold text-slate-800">
                  Diagrama de Classes de Negócio (UML)
                </h4>
              </div>
              
              <button
                onClick={downloadSVG}
                className="no-print px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs select-none cursor-pointer flex items-center gap-1 font-sans font-bold transition"
                title="Download do diagrama vetorial para anexar na entrega"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar SVG (Draw.io)</span>
              </button>
            </div>
            
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Estrutura de dados organizada sob o paradigma de Orientação a Objetos. Mostra as heranças de usuários e associações críticas direcionando a plataforma.
            </p>
          </div>

          {/* Interactive UML SVG layout rendering with Draw.io graphics */}
          <div className="relative w-full h-[400px] drawio-grid rounded border border-slate-200 flex items-center justify-center p-2 mb-4 overflow-hidden shadow-inner">
            <svg id="class-diagram-svg" viewBox="0 0 800 500" className="w-full h-full" style={{ maxHeight: '380px' }}>
              <defs>
                <marker id="inheritance" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                </marker>
              </defs>

              {/* Associations & Multiplicities in standard Draw.io style */}
              {/* Paciente to Triagem (y-axis) */}
              <line x1="135" y1="300" x2="135" y2="360" stroke="#000000" strokeWidth="1.5" />
              <text x="145" y="318" fill="#111827" fontSize="10" fontWeight="bold" fontFamily="Arial">1</text>
              <text x="145" y="350" fill="#111827" fontSize="10" fontWeight="bold" fontFamily="Arial">0..*</text>

              {/* Paciente to Agendamento (x-axis) */}
              <line x1="240" y1="240" x2="300" y2="240" stroke="#000000" strokeWidth="1.5" />
              <text x="248" y="234" fill="#111827" fontSize="10" fontWeight="bold" fontFamily="Arial">1</text>
              <text x="282" y="234" fill="#111827" fontSize="10" fontWeight="bold" fontFamily="Arial">0..*</text>

              {/* Profissional to Agendamento (x-axis) */}
              <line x1="560" y1="240" x2="500" y2="240" stroke="#000000" strokeWidth="1.5" />
              <text x="546" y="234" fill="#111827" fontSize="10" fontWeight="bold" fontFamily="Arial">1</text>
              <text x="508" y="234" fill="#111827" fontSize="10" fontWeight="bold" fontFamily="Arial">0..*</text>

              {/* Agendamento to OrientacaoClinica (y-axis) */}
              <line x1="400" y1="330" x2="400" y2="380" stroke="#000000" strokeWidth="1.5" />
              <text x="410" y="348" fill="#111827" fontSize="10" fontWeight="bold" fontFamily="Arial">1</text>
              <text x="410" y="370" fill="#111827" fontSize="10" fontWeight="bold" fontFamily="Arial">1..1</text>

              {/* Inheritance lines (Empty triangles) */}
              <path d="M 135,180 L 135,145 L 400,145 M 665,180 L 665,145 L 400,145 L 400,122" stroke="#000000" strokeWidth="1.5" fill="none" markerEnd="url(#inheritance)" />

              {/* ================= CLASS 1: Usuario ================= */}
              <g onClick={() => setActiveClass("Usuario (Superclasse)")} className="cursor-pointer">
                <rect x="300" y="10" width="200" height="110" rx="4" fill="#f5f5f5" stroke={activeClass === "Usuario (Superclasse)" ? "#2563eb" : "#666666"} strokeWidth={activeClass === "Usuario (Superclasse)" ? "3.5" : "1.5"} />
                <line x1="300" y1="40" x2="500" y2="40" stroke={activeClass === "Usuario (Superclasse)" ? "#2563eb" : "#666666"} strokeWidth="1" />
                <line x1="300" y1="88" x2="500" y2="88" stroke={activeClass === "Usuario (Superclasse)" ? "#2563eb" : "#666666"} strokeWidth="1" />
                
                <text x="400" y="23" textAnchor="middle" fill="#000000" fontSize="10.5" fontStyle="italic" fontFamily="Arial, sans-serif">&lt;&lt;Abstract&gt;&gt;</text>
                <text x="400" y="35" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="12" fontFamily="Arial, sans-serif">Usuario</text>
                
                <text x="306" y="52" fill="#000000" fontSize="10.5" fontFamily="monospace">+ id: String</text>
                <text x="306" y="66" fill="#000000" fontSize="10.5" fontFamily="monospace">+ nome: String</text>
                <text x="306" y="80" fill="#000000" fontSize="10.5" fontFamily="monospace">+ email: String</text>
                
                <text x="306" y="101" fill="#000000" fontSize="10.5" fontFamily="monospace">+ realizarLogin(): Bool</text>
              </g>

              {/* ================= CLASS 2: Paciente ================= */}
              <g onClick={() => setActiveClass("Paciente (Herda de Usuario)")} className="cursor-pointer">
                <rect x="30" y="180" width="210" height="120" rx="4" fill="#dae8fc" stroke={activeClass === "Paciente (Herda de Usuario)" ? "#2563eb" : "#6c8ebf"} strokeWidth={activeClass === "Paciente (Herda de Usuario)" ? "3.5" : "1.5"} />
                <line x1="30" y1="210" x2="240" y2="210" stroke={activeClass === "Paciente (Herda de Usuario)" ? "#2563eb" : "#6c8ebf"} strokeWidth="1" />
                <line x1="30" y1="258" x2="240" y2="258" stroke={activeClass === "Paciente (Herda de Usuario)" ? "#2563eb" : "#6c8ebf"} strokeWidth="1" />
                
                <text x="135" y="200" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="12.5" fontFamily="Arial, sans-serif">Paciente</text>
                
                <text x="36" y="222" fill="#000000" fontSize="10" fontFamily="monospace">+ dataNascimento: Date</text>
                <text x="36" y="235" fill="#000000" fontSize="10" fontFamily="monospace">+ comorbidades: List</text>
                <text x="36" y="248" fill="#555555" fontSize="8" fontFamily="Arial" fontWeight="bold">▲ herda de Usuario</text>
                
                <text x="36" y="271" fill="#000000" fontSize="10" fontFamily="monospace">+ registrarBiomarcador()</text>
                <text x="36" y="284" fill="#000000" fontSize="10" fontFamily="monospace">+ solicitarAtendimento()</text>
              </g>

              {/* ================= CLASS 3: Profissional ================= */}
              <g onClick={() => setActiveClass("Profissional (Herda de Usuario)")} className="cursor-pointer">
                <rect x="560" y="180" width="210" height="120" rx="4" fill="#d5e8d4" stroke={activeClass === "Profissional (Herda de Usuario)" ? "#2563eb" : "#82b366"} strokeWidth={activeClass === "Profissional (Herda de Usuario)" ? "3.5" : "1.5"} />
                <line x1="560" y1="210" x2="770" y2="210" stroke={activeClass === "Profissional (Herda de Usuario)" ? "#2563eb" : "#82b366"} strokeWidth="1" />
                <line x1="560" y1="258" x2="770" y2="258" stroke={activeClass === "Profissional (Herda de Usuario)" ? "#2563eb" : "#82b366"} strokeWidth="1" />
                
                <text x="665" y="200" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="12.5" fontFamily="Arial, sans-serif">Profissional</text>
                
                <text x="566" y="222" fill="#000000" fontSize="10" fontFamily="monospace">+ especialidade: String</text>
                <text x="566" y="235" fill="#000000" fontSize="10" fontFamily="monospace">+ nroConselho: String</text>
                <text x="566" y="248" fill="#555555" fontSize="8" fontFamily="Arial" fontWeight="bold">▲ herda de Usuario</text>
                
                <text x="566" y="272" fill="#000000" fontSize="10" fontFamily="monospace">+ preencherOrientacao()</text>
              </g>

              {/* ================= CLASS 4: Triagem ================= */}
              <g onClick={() => setActiveClass("Triagem (Fila de Ajuda)")} className="cursor-pointer">
                <rect x="30" y="360" width="210" height="110" rx="4" fill="#ffe6cc" stroke={activeClass === "Triagem (Fila de Ajuda)" ? "#2563eb" : "#d79b00"} strokeWidth={activeClass === "Triagem (Fila de Ajuda)" ? "3.5" : "1.5"} />
                <line x1="30" y1="390" x2="240" y2="390" stroke={activeClass === "Triagem (Fila de Ajuda)" ? "#2563eb" : "#d79b00"} strokeWidth="1" />
                <line x1="30" y1="432" x2="240" y2="432" stroke={activeClass === "Triagem (Fila de Ajuda)" ? "#2563eb" : "#d79b00"} strokeWidth="1" />
                
                <text x="135" y="380" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="12.5" fontFamily="Arial, sans-serif">Triagem</text>
                
                <text x="36" y="404" fill="#000000" fontSize="10.5" fontFamily="monospace">+ pacienteId: String</text>
                <text x="36" y="418" fill="#000000" fontSize="10.5" fontFamily="monospace">+ gravidadeEstimada: Enum</text>
                
                <text x="36" y="450" fill="#000000" fontSize="10.5" fontFamily="monospace">+ calcularPrioridade()</text>
              </g>

              {/* ================= CLASS 5: Agendamento ================= */}
              <g onClick={() => setActiveClass("Agendamento (Consulta)")} className="cursor-pointer">
                <rect x="300" y="210" width="200" height="120" rx="4" fill="#e1d5e7" stroke={activeClass === "Agendamento (Consulta)" ? "#2563eb" : "#9673a6"} strokeWidth={activeClass === "Agendamento (Consulta)" ? "3.5" : "1.5"} />
                <line x1="300" y1="240" x2="500" y2="240" stroke={activeClass === "Agendamento (Consulta)" ? "#2563eb" : "#9673a6"} strokeWidth="1" />
                <line x1="300" y1="288" x2="500" y2="288" stroke={activeClass === "Agendamento (Consulta)" ? "#2563eb" : "#9673a6"} strokeWidth="1" />
                
                <text x="400" y="230" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="12.5" fontFamily="Arial, sans-serif">Agendamento</text>
                
                <text x="306" y="254" fill="#000000" fontSize="10.5" fontFamily="monospace">+ pacienteId: String</text>
                <text x="306" y="268" fill="#000000" fontSize="10.5" fontFamily="monospace">+ profissionalId: String</text>
                <text x="306" y="280" fill="#000000" fontSize="10.5" fontFamily="monospace">+ statusConsulta: Enum</text>
                
                <text x="306" y="306" fill="#000000" fontSize="10.5" fontFamily="monospace">+ iniciarTeleconsulta()</text>
              </g>

              {/* ================= CLASS 6: OrientacaoClinica ================= */}
              <g onClick={() => setActiveClass("OrientacaoClinica (Sumário)")} className="cursor-pointer">
                <rect x="300" y="380" width="200" height="110" rx="4" fill="#fff2cc" stroke={activeClass === "OrientacaoClinica (Sumário)" ? "#2563eb" : "#d6b656"} strokeWidth={activeClass === "OrientacaoClinica (Sumário)" ? "3.5" : "1.5"} />
                <line x1="300" y1="410" x2="500" y2="410" stroke={activeClass === "OrientacaoClinica (Sumário)" ? "#2563eb" : "#d6b656"} strokeWidth="1" />
                <line x1="300" y1="452" x2="500" y2="452" stroke={activeClass === "OrientacaoClinica (Sumário)" ? "#2563eb" : "#d6b656"} strokeWidth="1" />
                
                <text x="400" y="400" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="12" fontFamily="Arial, sans-serif">OrientacaoClinica</text>
                
                <text x="306" y="424" fill="#000000" fontSize="10.5" fontFamily="monospace">+ agendamentoId: String</text>
                <text x="306" y="438" fill="#000000" fontSize="10.5" fontFamily="monospace">+ condutaSugerida: String</text>
                
                <text x="306" y="470" fill="#000000" fontSize="10.5" fontFamily="monospace">+ gerarPDFParaPaciente()</text>
              </g>
            </svg>
          </div>
          
          <div className="text-[10px] text-slate-500 mt-2 italic">
            *Multiplicidade:* Um **Paciente** possui `0..*` **Agendamentos** e `1..*` **Triagens**. Cada **Profissional** conduz `0..*` **Agendamentos**. Cada **Agendamento** encerrado gera exatamente `1` **OrientacaoClinica** (`1..1`).
          </div>
        </div>

        {/* Right Class Details Inspector (ABNT Descriptions) */}
        <div className="w-full lg:w-[420px] bg-white p-5 rounded-lg shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-3 border-b border-slate-100 pb-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-bold text-slate-800">
                Detalhamento Científico da Classe
              </h4>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-800 block">Identificador:</span>
                <span className="font-mono text-blue-700 text-[13px] font-bold">{currentClassDetails.name}</span>
              </div>

              <div>
                <span className="font-bold text-slate-800 block">Papel no Sistema:</span>
                <p className="text-slate-500 italic mt-0.5 leading-relaxed">{currentClassDetails.description}</p>
              </div>

              {currentClassDetails.inheritance && (
                <div>
                  <span className="font-bold text-slate-800 block">Relacionamento de Herança:</span>
                  <span className="inline-block bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded font-bold font-mono mt-0.5">
                    extends {currentClassDetails.inheritance}
                  </span>
                </div>
              )}

              <div>
                <span className="font-bold text-slate-800 block mb-1">Compartimento de Atributos:</span>
                <div className="bg-slate-50 p-2.5 rounded font-mono text-[10.5px] text-slate-600 space-y-1 border border-slate-100">
                  {currentClassDetails.attributes.map((attr, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{attr.split(":")[0]}</span>
                      <span className="text-slate-400 font-semibold">{attr.split(":")[1]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Compartimento de Métodos:</span>
                <div className="bg-blue-50/30 p-2.5 rounded font-mono text-[10.5px] text-slate-600 space-y-1 border border-blue-50/50">
                  {currentClassDetails.methods.map((method, idx) => (
                    <div key={idx} className="block">
                      <span className="text-slate-700">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px]">
            <span className="text-slate-400 font-mono">UML 2.5 Specification</span>
            <span className="text-blue-600 font-semibold flex items-center gap-0.5">
              Acoplamento Seguro <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
