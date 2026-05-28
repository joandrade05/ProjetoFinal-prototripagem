import { useState } from 'react';
import { History, Eye, CheckCircle, ChevronRight, Download } from 'lucide-react';

export default function DiagramSequence() {
  const sequenceMessages = [
    {
      id: "msg1",
      from: "Paciente",
      to: "Interface",
      action: "1. solicitarTeleorientação(dadosDiario, sintomas)",
      desc: "O paciente clica no botão para obter aconselhamento clínico, inserindo seus desconfortos e o registro mais recente dos seus biomarcadores."
    },
    {
      id: "msg2",
      from: "Interface",
      to: "ControladorApp",
      action: "2. validarRequisitosCadastrais(pacienteId)",
      desc: "A camada de apresentação pede à controladora que comprove se o paciente está com cadastro ativo e regular."
    },
    {
      id: "msg3",
      from: "ControladorApp",
      to: "MóduloTriagem",
      action: "3. classificarQueixaPaciente(sintomas, h2o, pa)",
      desc: "A controladora envia a queixa de saúde informada para o módulo de triagem realizar a classificação inicial de sintomas."
    },
    {
      id: "msg4",
      from: "MóduloTriagem",
      to: "ControladorApp",
      action: "4. retornarSintomasClassificados()",
      desc: "O módulo de triagem devolve o sumário classificado de sintomas, a prioridade preventiva recomendada e orientações básicas preliminares."
    },
    {
      id: "msg5",
      from: "ControladorApp",
      to: "Profissional",
      action: "5. notificarFilaTriagem(pacienteEspecialidade)",
      desc: "O sistema coloca o registro de triagem do paciente no dashboard de atendimentos preventivos visível aos profissionais voluntários qualificados."
    },
    {
      id: "msg6",
      from: "Profissional",
      to: "ControladorApp",
      action: "6. aceitarAtendimentoPaciente(pacienteId)",
      desc: "Um voluntário ativo clica no painel para iniciar a ajuda preventiva e herdar os dados clínicos autorizados."
    },
    {
      id: "msg7",
      from: "ControladorApp",
      to: "Interface",
      action: "7. inicializarSessaoCriptografada(canalToken)",
      desc: "A controladora cria uma sala P2P (ponto a ponto) segura e envia os tokens de áudio/vídeo/chat criptografados de volta."
    },
    {
      id: "msg8",
      from: "Interface",
      to: "Paciente",
      action: "8. abrirSalaAtendimento(streamConexao)",
      desc: "O aplicativo abre a tela conectada, ligando a câmera/microfone do paciente de forma síncrona aos terminais do voluntário."
    }
  ];

  const [activeMsgId, setActiveMsgId] = useState<string | null>(null);

  const downloadSVG = () => {
    const svgEl = document.getElementById("sequence-diagram-svg");
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
    downloadLink.download = "diagrama-sequencia-sanalink.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div id="diagram-sequence" className="p-6 bg-slate-50 rounded-xl border border-slate-200 font-sans">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sequence Interaction Visual Block */}
        <div className="flex-1 bg-white p-5 rounded-lg shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <History className="w-5 h-5" />
                </span>
                <h4 className="text-md font-bold text-slate-800">
                  Diagrama de Sequência (Ciclo de Vida Temporal)
                </h4>
              </div>
              
              <button
                onClick={downloadSVG}
                className="no-print px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs select-none cursor-pointer flex items-center gap-1 font-sans font-bold transition"
                title="Download do diagrama de sequência para anexar na entrega"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar SVG (Draw.io)</span>
              </button>
            </div>
            
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Modelagem temporal de chamadas de métodos, trocas de dados ricas e retornos de mensagens entre sistemas em uma sessão de aconselhamento no **SanaLink**.
            </p>
          </div>

          {/* Graphical Lifelines and Message Timeline Grid with Draw.io grid backdrop */}
          <div className="relative w-full h-[400px] drawio-grid rounded border border-slate-200 flex items-center justify-center p-2 mb-4 overflow-hidden shadow-inner">
            <svg id="sequence-diagram-svg" viewBox="0 0 800 500" className="w-full h-full" style={{ maxHeight: '380px' }}>
              <defs>
                <marker id="solid-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#000000" />
                </marker>
                <marker id="dashed-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#555555" stroke="#555555" />
                </marker>
              </defs>

              {/* Lifeline vertical dashed lines */}
              <line x1="100" y1="45" x2="100" y2="470" stroke="#000000" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="260" y1="45" x2="260" y2="470" stroke="#000000" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="420" y1="45" x2="420" y2="470" stroke="#000000" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="580" y1="45" x2="580" y2="470" stroke="#000000" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="740" y1="45" x2="740" y2="470" stroke="#000000" strokeWidth="1" strokeDasharray="4 4" />

              {/* Lifeline participant boxes (Draw.io style headers) */}
              <g>
                <rect x="50" y="10" width="100" height="36" rx="4" fill="#dae8fc" stroke="#6c8ebf" strokeWidth="1.5" />
                <text x="100" y="32" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="11" fontFamily="Arial">Paciente</text>
              </g>

              <g>
                <rect x="210" y="10" width="100" height="36" rx="4" fill="#f5f5f5" stroke="#666666" strokeWidth="1.5" />
                <text x="260" y="32" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="11" fontFamily="Arial">Interface</text>
              </g>

              <g>
                <rect x="370" y="10" width="100" height="36" rx="4" fill="#e1d5e7" stroke="#9673a6" strokeWidth="1.5" />
                <text x="420" y="32" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="10" fontFamily="Arial">ControladorApp</text>
              </g>

              <g>
                <rect x="530" y="10" width="100" height="36" rx="4" fill="#ffe6cc" stroke="#d79b00" strokeWidth="1.5" />
                <text x="580" y="32" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="10.5" fontFamily="Arial">MóduloTriagem</text>
              </g>

              <g>
                <rect x="690" y="10" width="100" height="36" rx="4" fill="#d5e8d4" stroke="#82b366" strokeWidth="1.5" />
                <text x="740" y="32" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="11" fontFamily="Arial">Profissional</text>
              </g>

              {/* Vertical Activation Boxes on Lifelines */}
              <rect x="96" y="70" width="8" height="390" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <rect x="256" y="80" width="8" height="370" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <rect x="416" y="110" width="8" height="310" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <rect x="576" y="160" width="8" height="65" fill="#fcfcfc" stroke="#000000" strokeWidth="1" />
              <rect x="736" y="240" width="8" height="75" fill="#fcfcfc" stroke="#000000" strokeWidth="1" />

              {/* Message Lanes with precise coordinates & hover zones! */}
              {/* Msg 1: Paciente -> Interface (solicitarTeleorientação) */}
              <g onMouseEnter={() => setActiveMsgId("msg1")} onMouseLeave={() => setActiveMsgId(null)} className="cursor-pointer">
                <line x1="104" y1="90" x2="256" y2="90" stroke={activeMsgId === 'msg1' ? '#a855f7' : '#000000'} strokeWidth={activeMsgId === 'msg1' ? '2.5' : '1.5'} markerEnd="url(#solid-arrow)" />
                <text x="180" y="83" textAnchor="middle" fill={activeMsgId === 'msg1' ? '#a855f7' : '#000000'} fontSize="9.5" fontWeight={activeMsgId === 'msg1' ? 'bold' : 'normal'} fontFamily="Arial">1. solicitarTeleorientação()</text>
              </g>

              {/* Msg 2: Interface -> Controlador (validarRequisitos) */}
              <g onMouseEnter={() => setActiveMsgId("msg2")} onMouseLeave={() => setActiveMsgId(null)} className="cursor-pointer">
                <line x1="264" y1="130" x2="416" y2="130" stroke={activeMsgId === 'msg2' ? '#a855f7' : '#000000'} strokeWidth={activeMsgId === 'msg2' ? '2.5' : '1.5'} markerEnd="url(#solid-arrow)" />
                <text x="340" y="123" textAnchor="middle" fill={activeMsgId === 'msg2' ? '#a855f7' : '#000000'} fontSize="9.5" fontWeight={activeMsgId === 'msg2' ? 'bold' : 'normal'} fontFamily="Arial">2. validarRequisitos()</text>
              </g>

              {/* Msg 3: Controlador -> MóduloTriagem (classificarQueixa) */}
              <g onMouseEnter={() => setActiveMsgId("msg3")} onMouseLeave={() => setActiveMsgId(null)} className="cursor-pointer">
                <line x1="424" y1="175" x2="576" y2="175" stroke={activeMsgId === 'msg3' ? '#a855f7' : '#000000'} strokeWidth={activeMsgId === 'msg3' ? '2.5' : '1.5'} markerEnd="url(#solid-arrow)" />
                <text x="500" y="168" textAnchor="middle" fill={activeMsgId === 'msg3' ? '#a855f7' : '#000000'} fontSize="9.5" fontWeight={activeMsgId === 'msg3' ? 'bold' : 'normal'} fontFamily="Arial">3. classificarQueixa()</text>
              </g>

              {/* Msg 4: MóduloTriagem -> Controlador (retornarClassificacao - dashed arrow) */}
              <g onMouseEnter={() => setActiveMsgId("msg4")} onMouseLeave={() => setActiveMsgId(null)} className="cursor-pointer">
                <line x1="576" y1="215" x2="424" y2="215" stroke={activeMsgId === 'msg4' ? '#a855f7' : '#555555'} strokeWidth={activeMsgId === 'msg4' ? '2.5' : '1.2'} strokeDasharray="3 3" markerEnd="url(#dashed-arrow)" />
                <text x="500" y="208" textAnchor="middle" fill={activeMsgId === 'msg4' ? '#a855f7' : '#555555'} fontSize="9" fontWeight={activeMsgId === 'msg4' ? 'bold' : 'normal'} fontFamily="Arial">4. retornarClassificacao()</text>
              </g>

              {/* Msg 5: Controlador -> Profissional (notificarFila) */}
              <g onMouseEnter={() => setActiveMsgId("msg5")} onMouseLeave={() => setActiveMsgId(null)} className="cursor-pointer">
                <line x1="424" y1="255" x2="736" y2="255" stroke={activeMsgId === 'msg5' ? '#a855f7' : '#000000'} strokeWidth={activeMsgId === 'msg5' ? '2.5' : '1.5'} markerEnd="url(#solid-arrow)" />
                <text x="580" y="248" textAnchor="middle" fill={activeMsgId === 'msg5' ? '#a855f7' : '#000000'} fontSize="9.5" fontWeight={activeMsgId === 'msg5' ? 'bold' : 'normal'} fontFamily="Arial">5. notificarFilaTriagem()</text>
              </g>

              {/* Msg 6: Profissional -> Controlador (aceitarAtendimento) */}
              <g onMouseEnter={() => setActiveMsgId("msg6")} onMouseLeave={() => setActiveMsgId(null)} className="cursor-pointer">
                <line x1="736" y1="300" x2="424" y2="300" stroke={activeMsgId === 'msg6' ? '#a855f7' : '#000000'} strokeWidth={activeMsgId === 'msg6' ? '2.5' : '1.5'} markerEnd="url(#solid-arrow)" />
                <text x="580" y="293" textAnchor="middle" fill={activeMsgId === 'msg6' ? '#a855f7' : '#000000'} fontSize="9.5" fontWeight={activeMsgId === 'msg6' ? 'bold' : 'normal'} fontFamily="Arial">6. aceitarAtendimento()</text>
              </g>

              {/* Msg 7: Controlador -> Interface (inicializarSessao - dashed) */}
              <g onMouseEnter={() => setActiveMsgId("msg7")} onMouseLeave={() => setActiveMsgId(null)} className="cursor-pointer">
                <line x1="416" y1="355" x2="264" y2="355" stroke={activeMsgId === 'msg7' ? '#a855f7' : '#555555'} strokeWidth={activeMsgId === 'msg7' ? '2.5' : '1.2'} strokeDasharray="3 3" markerEnd="url(#dashed-arrow)" />
                <text x="340" y="348" textAnchor="middle" fill={activeMsgId === 'msg7' ? '#a855f7' : '#555555'} fontSize="9" fontWeight={activeMsgId === 'msg7' ? 'bold' : 'normal'} fontFamily="Arial">7. sessaoTokenCriado()</text>
              </g>

              {/* Msg 8: Interface -> Paciente (abrirSala) */}
              <g onMouseEnter={() => setActiveMsgId("msg8")} onMouseLeave={() => setActiveMsgId(null)} className="cursor-pointer">
                <line x1="256" y1="410" x2="104" y2="410" stroke={activeMsgId === 'msg8' ? '#a855f7' : '#000000'} strokeWidth={activeMsgId === 'msg8' ? '2.5' : '1.5'} markerEnd="url(#solid-arrow)" />
                <text x="180" y="403" textAnchor="middle" fill={activeMsgId === 'msg8' ? '#a855f7' : '#000000'} fontSize="9.5" fontWeight={activeMsgId === 'msg8' ? 'bold' : 'normal'} fontFamily="Arial">8. abrirSalaAtendimento()</text>
              </g>
            </svg>
          </div>

          <div className="text-[10px] text-slate-400 mt-2 italic text-left">
            *Dica:* Passe o cursor do mouse sobre os fluxos e setas à esquerda para inspecionar os detalhes teóricos exigidos na documentação acadêmica.
          </div>
        </div>

        {/* Temporal Message Inspector Column */}
        <div className="w-full lg:w-[420px] bg-white p-5 rounded-lg shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-3 border-b border-slate-100 pb-2.5">
              <Eye className="w-4 h-4 text-purple-600" />
              <h4 className="text-sm font-bold text-slate-800 font-sans">
                Especificação de Comunicação Temporal
              </h4>
            </div>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed font-sans">
              No desenvolvimento orientado a objetos, o diagrama de sequência detalha os objetos de classe responsáveis por cada estágio de execução, orientando os programadores da startup.
            </p>

            {activeMsgId ? (
              <div className="p-4 bg-purple-50/50 rounded-lg border border-purple-200 text-xs anim-fade-in font-sans">
                <div className="font-bold text-purple-950 text-sm mb-1.5">
                  {sequenceMessages.find(m => m.id === activeMsgId)?.action}
                </div>
                <div className="text-slate-705 leading-relaxed mb-3.5 italic">
                  "{sequenceMessages.find(m => m.id === activeMsgId)?.desc}"
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-purple-100 pt-2.5">
                  <div>
                    <span className="text-slate-400 block uppercase">Origem:</span>
                    <span className="text-purple-700 font-bold">{sequenceMessages.find(m => m.id === activeMsgId)?.from}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase">Destino:</span>
                    <span className="text-purple-700 font-bold">{sequenceMessages.find(m => m.id === activeMsgId)?.to}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-10 border-2 border-dashed border-slate-200 rounded-lg text-center text-xs text-slate-400 font-sans italic">
                Nenhuma chamada temporal selecionada. <br /> Passe o mouse sobre a cronologia cronológica à esquerda para detalhar cada passo de programação.
              </div>
            )}

            <div className="mt-5 space-y-3 font-sans text-xs">
              <h5 className="font-bold text-slate-800">Conformidade e Desempenho (SanaLink):</h5>
              <div className="p-2.5 bg-slate-50 rounded leading-tight text-slate-500">
                <b>Mensagens Síncronas (Setas Cheias):</b> Garantem o bloqueio ordenado de tela impedindo que o paciente faça novos cliques redundantes que sobrecarreguem as conexões com o servidor.
              </div>
              <div className="p-2.5 bg-slate-50 rounded leading-tight text-slate-500">
                <b>Mensagens Assíncronas (Setas Tracejadas):</b> Usadas em notificações push para médicos, otimizando o consumo de banda de internet móvel do ecossistema.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px]">
            <span className="text-slate-400 font-mono">Sequence Timing Spec 2.0</span>
            <span className="text-purple-600 font-semibold flex items-center gap-0.5">
              Telessaúde Segura <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
