import { useState } from 'react';
import { UseCaseDescription } from '../types';
import { Eye, CheckCircle2, ChevronRight, BookOpen, Download } from 'lucide-react';

export default function DiagramUseCases() {
  const useCases: UseCaseDescription[] = [
    {
      code: "UC01",
      name: "Efetuar Cadastro e Validação",
      actor: "Paciente (Beneficiário) e Profissional Voluntário",
      description: "Permite que os dois públicos criem contas. O profissional deve anexar seu registro (CRM/CRP/COREN) para auditoria manual do administrador.",
      preCondition: "Usuário possui acesso à internet e documentos válidos.",
      mainFlow: [
        "1. O usuário seleciona o tipo de perfil (Paciente ou Voluntário).",
        "2. O usuário preenche dados básicos (Nome, Email, CPF/Registro, Senha).",
        "3. Se voluntário, anexa comprovação do conselho profissional.",
        "4. O sistema valida dados cadastrais e envia e-mail de confirmação.",
        "5. O sistema salva o cadastro no banco de dados."
      ],
      altFlow: [
        "Ativação do Perfil: Se o profissional voluntário não enviar documento legível, o administrador reprova seu cadastro e o sistema dispara um aviso por e-mail solicitando novo envio."
      ],
      postCondition: "Cadastro criado. Paciente fica com acesso imediato; Voluntário fica pendente de aprovação."
    },
    {
      code: "UC02",
      name: "Registrar Diário de Saúde (Biomarcadores)",
      actor: "Paciente (Beneficiário)",
      description: "Permite que o paciente registre sua pressão arterial, bem-estar diário e hidratação para acompanhamento preventivo.",
      preCondition: "Paciente autenticado na plataforma.",
      mainFlow: [
        "1. O paciente acessa a seção 'Diário de Saúde'.",
        "2. O sistema exibe o formulário de dados de bem-estar.",
        "3. O paciente insere pressão (ex: 12/8), nível de hidratação e humor.",
        "4. O paciente clica em 'Salvar Registros'.",
        "5. O sistema atualiza os gráficos históricos de acompanhamento."
      ],
      altFlow: [
        "Alerta de Biomarcador: Se os níveis de pressão arterial inseridos forem perigosos (ex: > 16/10), o sistema emite um alerta informando que o paciente deve procurar uma UPA presencial e marca a próxima orientação com prioridade de triagem."
      ],
      postCondition: "Dados de saúde salvos e associados ao histórico do paciente de forma criptografada."
    },
    {
      code: "UC03",
      name: "Solicitar Triagem de Sintomas",
      actor: "Paciente (Beneficiário)",
      description: "O paciente descreve seus desconfortos e histórico recente em um questionário clínico estruturado para categorização preliminar.",
      preCondition: "Paciente autenticado.",
      mainFlow: [
        "1. O paciente clica em 'Nova Orientação'.",
        "2. O sistema sugere o preenchimento da triagem preliminar de queixas baseada no protocolo clínico.",
        "3. O paciente descreve as queixas preliminares de seus sintomas atuantes.",
        "4. O sistema processa as respostas de queixas e indica o grau recomendado de prioridade preventiva.",
        "5. O sistema direciona o paciente para a lista de voluntários mais adequados à queixa."
      ],
      altFlow: [
        "Sintomas de Emergência: Caso o paciente declare sintomas graves (ex. dor súbita no peito), o sistema de triagem encerra a teleorientação, exibe o telefone do SAMU (192) e indica postos de prontos-socorros físicos próximos."
      ],
      postCondition: "Sintomática sumarizada e anexada à solicitação de atendimento."
    },
    {
      code: "UC04",
      name: "Realizar Teleorientação por Chat ou Vídeo",
      actor: "Paciente (Beneficiário) e Profissional Voluntário",
      description: "Conecta os dois públicos através de canais criptografados de web-chat ou vídeo para consulta preventiva e compartilhamento de cuidados.",
      preCondition: "Agendamento confirmado ou paciente na fila de triagem ativa.",
      mainFlow: [
        "1. Paciente e Profissional acessam a sala virtual.",
        "2. O sistema abre os componentes de chat textual e/ou feed de videoconferência.",
        "3. O profissional visualiza em tempo real o Diário de Biomarcadores do paciente.",
        "4. O voluntário realiza a orientação e instruções de hábitos preventivos.",
        "5. O voluntário escreve o sumário de orientação e encerra a chamada."
      ],
      altFlow: [
        "Instabilidade na Conexão: Se a largura de banda cair de uma ou ambas as partes, a chamada de vídeo cai para o fluxo alternativo de modo chat textual apenas."
      ],
      postCondition: "Aendimento concluído, sumário clínico disponível para o paciente e pontuação de avaliação gerada."
    }
  ];

  const downloadSVG = () => {
    const svgEl = document.getElementById("use-case-svg");
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
    downloadLink.download = "diagrama-casos-de-uso-sanalink.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const [selectedUC, setSelectedUC] = useState<string>("UC01");
  const currentUC = useCases.find(uc => uc.code === selectedUC) || useCases[0];

  return (
    <div id="diagram-use-cases" className="p-6 bg-slate-50 rounded-xl border border-slate-200">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Dynamic SVG Use Case Diagram */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                  <BookOpen className="w-5 h-5" />
                </span>
                <h4 className="text-md font-bold text-slate-800 font-sans">
                  Diagrama de Casos de Uso (UML)
                </h4>
              </div>
              
              <button
                onClick={downloadSVG}
                className="no-print px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded text-xs select-none cursor-pointer flex items-center gap-1 font-sans font-bold transition"
                title="Download do diagrama vetorial para anexar na entrega"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar SVG (Draw.io)</span>
              </button>
            </div>
            
            <p className="text-xs text-slate-500 mb-6 font-sans">
              Representação conceitual dos atores da startup (**SanaLink**) e suas interações com as principais funcionalidades. Siga as setas para ver as conexões.
            </p>
          </div>

          {/* Interactive SVG Rendering with Draw.io style grids */}
          <div className="relative w-full h-[360px] drawio-grid rounded border border-slate-200 flex items-center justify-center p-2 mb-4 overflow-hidden shadow-inner">
            <svg id="use-case-svg" viewBox="0 0 800 450" className="w-full h-full" style={{ maxHeight: '340px' }}>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#000000" />
                </marker>
                <marker id="dashed-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ea8de" />
                </marker>
              </defs>

              {/* Boundary Box (SanaLink System) - Classic Draw.io System Boundary */}
              <rect x="220" y="20" width="360" height="410" rx="4" fill="#ffffff" fillOpacity="0.85" stroke="#4a5568" strokeWidth="2.5" />
              <rect x="220" y="20" width="360" height="32" rx="4" fill="#4a5568" />
              <text x="400" y="41" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13" fontFamily="Arial, Helvetica, sans-serif">
                Sistema SanaLink (Fronteira ODS 3)
              </text>

               {/* Paciente (Actor Left) */}
              <g className="cursor-pointer" onClick={() => setSelectedUC("UC02")}>
                <circle cx="90" cy="180" r="16" fill="#ffffff" stroke="#000000" strokeWidth="2" />
                <line x1="90" y1="196" x2="90" y2="240" stroke="#000000" strokeWidth="2" />
                <line x1="70" y1="210" x2="110" y2="210" stroke="#000000" strokeWidth="2" />
                <line x1="90" y1="240" x2="75" y2="280" stroke="#000000" strokeWidth="2" />
                <line x1="90" y1="240" x2="105" y2="280" stroke="#000000" strokeWidth="2" />
                <text x="90" y="302" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="12" fontFamily="Arial, Helvetica, sans-serif">
                  Paciente
                </text>
                <text x="90" y="316" textAnchor="middle" fill="#555555" fontSize="10" fontFamily="Arial">
                  (Beneficiário)
                </text>
              </g>

              {/* Profissional Voluntário (Actor Right) */}
              <g className="cursor-pointer" onClick={() => setSelectedUC("UC04")}>
                <circle cx="710" cy="180" r="16" fill="#ffffff" stroke="#000000" strokeWidth="2" />
                <line x1="710" y1="196" x2="710" y2="240" stroke="#000000" strokeWidth="2" />
                <line x1="690" y1="210" x2="730" y2="210" stroke="#000000" strokeWidth="2" />
                <line x1="710" y1="240" x2="695" y2="280" stroke="#000000" strokeWidth="2" />
                <line x1="710" y1="240" x2="725" y2="280" stroke="#000000" strokeWidth="2" />
                <text x="710" y="302" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="12" fontFamily="Arial, Helvetica, sans-serif">
                  Profissional
                </text>
                <text x="710" y="316" textAnchor="middle" fill="#555555" fontSize="10" fontFamily="Arial">
                  (Voluntário)
                </text>
              </g>

              {/* UC01: Cadastro */}
              <g className={`cursor-pointer transition-all duration-200 ${selectedUC === 'UC01' ? 'filter drop-shadow-md' : ''}`} onClick={() => setSelectedUC("UC01")}>
                <rect x="250" y="70" width="300" height="46" rx="23" fill={selectedUC === 'UC01' ? '#d5e8d4' : '#dae8fc'} stroke={selectedUC === 'UC01' ? '#82b366' : '#6c8ebf'} strokeWidth="2" />
                <text x="400" y="97" textAnchor="middle" fill="#000000" fontWeight="600" fontSize="11.5" fontFamily="Arial, sans-serif">
                  UC01: Efetuar Cadastro e Validação
                </text>
              </g>

              {/* UC02: Diário Biomarcadores */}
              <g className={`cursor-pointer transition-all duration-200 ${selectedUC === 'UC02' ? 'filter drop-shadow-md' : ''}`} onClick={() => setSelectedUC("UC02")}>
                <rect x="250" y="145" width="300" height="46" rx="23" fill={selectedUC === 'UC02' ? '#d5e8d4' : '#dae8fc'} stroke={selectedUC === 'UC02' ? '#82b366' : '#6c8ebf'} strokeWidth="2" />
                <text x="400" y="172" textAnchor="middle" fill="#000000" fontWeight="600" fontSize="11.5" fontFamily="Arial, sans-serif">
                  UC02: Registrar Diário (Biomarcadores)
                </text>
              </g>

              {/* UC03: Triagem de Sintomas */}
              <g className={`cursor-pointer transition-all duration-200 ${selectedUC === 'UC03' ? 'filter drop-shadow-md' : ''}`} onClick={() => setSelectedUC("UC03")}>
                <rect x="250" y="220" width="300" height="46" rx="23" fill={selectedUC === 'UC03' ? '#d5e8d4' : '#dae8fc'} stroke={selectedUC === 'UC03' ? '#82b366' : '#6c8ebf'} strokeWidth="2" />
                <text x="400" y="247" textAnchor="middle" fill="#000000" fontWeight="600" fontSize="11.5" fontFamily="Arial, sans-serif">
                  UC03: Solicitar Triagem de Sintomas
                </text>
              </g>

              {/* UC04: Teleorientação */}
              <g className={`cursor-pointer transition-all duration-200 ${selectedUC === 'UC04' ? 'filter drop-shadow-md' : ''}`} onClick={() => setSelectedUC("UC04")}>
                <rect x="250" y="295" width="300" height="46" rx="23" fill={selectedUC === 'UC04' ? '#d5e8d4' : '#dae8fc'} stroke={selectedUC === 'UC04' ? '#82b366' : '#6c8ebf'} strokeWidth="2" />
                <text x="400" y="322" textAnchor="middle" fill="#000000" fontWeight="600" fontSize="11.5" fontFamily="Arial, sans-serif">
                  UC04: Realizar Teleorientação (Vídeo/Chat)
                </text>
              </g>

              {/* Associations (Lines) */}
              {/* Paciente to UC01, UC02, UC03, UC04 */}
              <line x1="120" y1="180" x2="250" y2="93" stroke="#000000" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="120" y1="210" x2="250" y2="168" stroke="#000000" strokeWidth="1.2" />
              <line x1="120" y1="230" x2="250" y2="243" stroke="#000000" strokeWidth="1.2" />
              <line x1="110" y1="260" x2="250" y2="318" stroke="#000000" strokeWidth="1.2" />

              {/* Clinician to UC01, UC04 */}
              <line x1="680" y1="180" x2="550" y2="93" stroke="#000000" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="680" y1="230" x2="550" y2="318" stroke="#000000" strokeWidth="1.2" />

              {/* Extends / Includes dashed flows (E.g. UC03 includes UC04, or UC02 triggers warnings) */}
              <path d="M 400,210 L 400,191" stroke="#4ea8de" strokeWidth="1.2" strokeDasharray="4 3" markerEnd="url(#dashed-arrow)" />
              <text x="410" y="206" fill="#000000" fontSize="9" fontWeight="bold" fontFamily="Arial, sans-serif">
                &lt;&lt;extend&gt;&gt;
              </text>
              
              {/* System Admin as secondary actor (Small circle bottom center) */}
              <g className="opacity-80">
                <circle cx="400" cy="405" r="8" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                <line x1="400" y1="413" x2="400" y2="425" stroke="#000000" strokeWidth="1.5" />
                <text x="400" y="438" textAnchor="middle" fill="#000000" fontSize="10" fontWeight="bold" fontFamily="Arial, sans-serif">
                  Administrador
                </text>
                <line x1="390" y1="418" x2="410" y2="418" stroke="#000000" strokeWidth="1.5" />
                <line x1="400" y1="425" x2="394" y2="433" stroke="#000000" strokeWidth="1.5" />
                <line x1="400" y1="425" x2="406" y2="433" stroke="#000000" strokeWidth="1.5" />
              </g>
              <line x1="400" y1="390" x2="400" y2="341" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>

          <div className="flex gap-2">
            <span className="text-[11px] text-slate-400">Dica:</span>
            <span className="text-[11px] text-slate-500 italic">Clique nos balões ou atores do diagrama para alternar a descrição textual da ABNT ao lado.</span>
          </div>
        </div>

        {/* Right Side: Detailed ABNT Use Case Description Table */}
        <div className="w-full lg:w-[420px] bg-white p-5 rounded-lg shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5 font-sans">
              <Eye className="w-4 h-4 text-teal-600" />
              Especificação de Caso de Uso (Modelo ABNT)
            </h4>

            {/* Selection Buttons */}
            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {useCases.map(uc => (
                <button
                  key={uc.code}
                  onClick={() => setSelectedUC(uc.code)}
                  className={`py-1 text-xs font-mono rounded font-medium transition-colors ${
                    selectedUC === uc.code
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {uc.code}
                </button>
              ))}
            </div>

            {/* ABNT Descriptives Block */}
            <div className="space-y-3.5 text-xs text-slate-700 max-h-[300px] overflow-y-auto pr-1">
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Caso de Uso:</span>
                <span className="font-mono text-slate-600 font-semibold">{currentUC.code} - {currentUC.name}</span>
              </div>
              
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Atores Principais:</span>
                <span className="text-slate-600">{currentUC.actor}</span>
              </div>
              
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Descrição do Fluxo:</span>
                <p className="text-slate-600 italic leading-relaxed">{currentUC.description}</p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-0.5 font-sans">Pré-condições:</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] text-slate-600 block leading-relaxed">{currentUC.preCondition}</span>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Fluxo Principal (Etapas do Sucesso):</span>
                <ol className="list-none space-y-1 pl-0.5">
                  {currentUC.mainFlow.map((step, idx) => (
                    <li key={idx} className="flex gap-1.5 items-start text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                      <span className="leading-tight">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Fluxo Alternativo / Tratamento:</span>
                <div className="border-l-2 border-amber-400 pl-2 py-1 text-slate-600 leading-relaxed bg-amber-50/40 rounded-r text-[11px]">
                  {currentUC.altFlow[0]}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Pós-condições:</span>
                <span className="text-slate-600 leading-relaxed block">{currentUC.postCondition}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px]">
            <span className="text-slate-400 font-mono">Padrão ABNT NBR 13596</span>
            <span className="text-teal-600 font-semibold flex items-center gap-0.5">
              Requisito Alinhado <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
