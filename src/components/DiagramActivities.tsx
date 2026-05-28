import { useState } from 'react';
import { Play, AlertCircle, HelpCircle, GitPullRequest, ArrowDown, Settings, CheckCircle, Download } from 'lucide-react';

export default function DiagramActivities() {
  const steps = [
    {
      id: "start",
      type: "start",
      label: "Início",
      desc: "Paciente inicia processo de queixa no app SanaLink."
    },
    {
      id: "input",
      type: "action",
      label: "Inserir Queixa & Biomarcadores no Diário",
      desc: "Paciente detalha os desconfortos físicos de saúde e introduz os últimos dados de seu diário (PA, batimentos, humor)."
    },
    {
      id: "decision_grave",
      type: "decision",
      label: "Sintoma Grave / Urgência Detectada?",
      desc: "O algoritmo faz a checagem rápida de sintomas de alto perigo de vida (ex: dor extrema no peito, asfixia aguda)."
    },
    {
      id: "samu",
      type: "emergency",
      label: "Direcionar ao SAMU 192 & Posto Físico",
      desc: "Encerrar fluxo remoto, exibir botão de chamada para o SAMU e mapa com os Prontos Socorros físicos próximos."
    },
    {
      id: "openai",
      type: "action",
      label: "Processar Triagem Clínica Inicial",
      desc: "O sistema de triagem organiza as queixas relatadas de acordo com as diretrizes do protocolo clínico."
    },
    {
      id: "match",
      type: "action",
      label: "Encontrar Especialista Voluntário Disponível",
      desc: "O sistema analisa a geolocalização e as especialidades ativas que combinam com a pré-triagem do paciente."
    },
    {
      id: "fork",
      type: "fork",
      label: "Divisão Paralela de Ações [Fork]",
      desc: "O sistema executa tarefas simultâneas para otimizar o tempo e registrar dados."
    },
    {
      id: "task_a",
      type: "subaction",
      label: "A) Agendar Horário / Conectar Chat",
      desc: "Inicia a conexão de áudio/vídeo em tempo real ou abre fila de espera por mensagens síncronas."
    },
    {
      id: "task_b",
      type: "subaction",
      label: "B) Sincronizar Histórico do Prontuário",
      desc: "Consolida os dados do diário de saúde para que apareçam resumidos na tela do voluntário."
    },
    {
      id: "join",
      type: "join",
      label: "Consolidação de Lógica [Join]",
      desc: "Aguarda a conclusão de ambos os canais de processamento preparatório."
    },
    {
      id: "consult",
      type: "action",
      label: "Conduzir Orientação / Recomendação Preventiva",
      desc: "Membro de saúde conduz a orientação de hábitos, nutrição e de controle de sintomas crônicos."
    },
    {
      id: "document",
      type: "action",
      label: "Registrar e Assinar Digitalmente o Sumário",
      desc: "O profissional escreve a resposta e o SanaLink criptografa os registros gerando o PDF do beneficiário."
    },
    {
      id: "end",
      type: "end",
      label: "Fim do Atendimento",
      desc: "Atendimento preventivo finalizado. Prontuário atualizado."
    }
  ];

  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  const downloadSVG = () => {
    const svgEl = document.getElementById("activities-diagram-svg");
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
    downloadLink.download = "diagrama-atividades-sanalink.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div id="diagram-activities" className="p-6 bg-slate-50 rounded-xl border border-slate-200 font-sans">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Visual Diagram Column */}
        <div className="flex-1 bg-white p-5 rounded-lg shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <GitPullRequest className="w-5 h-5" />
                </span>
                <h4 className="text-md font-bold text-slate-800">
                  Diagrama de Atividades (Fluxo de Atendimento)
                </h4>
              </div>
              
              <button
                onClick={downloadSVG}
                className="no-print px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs select-none cursor-pointer flex items-center gap-1 font-sans font-bold transition"
                title="Download do diagrama de atividades para anexar na entrega"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar SVG (Draw.io)</span>
              </button>
            </div>
            
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Modelagem do fluxo de controle processual, desde as ações iniciais do Paciente, triagem automatizada de sintomas até os procedimentos do profissional voluntário.
            </p>
          </div>

          {/* Interactive vector SVG drawing with Draw.io grids */}
          <div className="relative w-full h-[480px] drawio-grid rounded border border-slate-200 flex items-center justify-center p-2 mb-4 overflow-y-auto shadow-inner">
            <svg id="activities-diagram-svg" viewBox="0 0 500 780" className="w-[300px] h-[460px]" style={{ minHeight: '440px' }}>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#000000" />
                </marker>
              </defs>

              {/* Start State (Green circle) */}
              <g onMouseEnter={() => setHoveredStep("start")} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                <circle cx="250" cy="30" r="10" fill="#25b075" stroke="#1d8f5e" strokeWidth="1.5" />
                <line x1="250" y1="40" x2="250" y2="70" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
              </g>

              {/* Inserir Queixa (Activity Card) */}
              <g onMouseEnter={() => setHoveredStep("input")} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                <rect x="150" y="70" width="200" height="40" rx="10" fill="#dae8fc" stroke={hoveredStep === 'input' ? '#2563eb' : '#6c8ebf'} strokeWidth={hoveredStep === 'input' ? '2.5' : '1.5'} />
                <text x="250" y="94" textAnchor="middle" fill="#000000" fontSize="10.5" fontWeight="bold" fontFamily="Arial">Inserir Queixa (Paciente)</text>
                <line x1="250" y1="110" x2="250" y2="140" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
              </g>

              {/* Decision Diamond: Sintoma Grave? */}
              <g onMouseEnter={() => setHoveredStep("decision_grave")} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                <polygon points="250,140 310,180 250,220 190,180" fill="#fff2cc" stroke={hoveredStep === 'decision_grave' ? '#2563eb' : '#d6b656'} strokeWidth={hoveredStep === 'decision_grave' ? '2.5' : '1.5'} />
                <text x="250" y="177" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="9" fontFamily="Arial">Grave / Urgente?</text>
                
                {/* Branches paths */}
                {/* SIM [Urgência] (Left Branch) */}
                <path d="M 190,180 L 100,180 L 100,260" stroke="#000000" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
                <text x="145" y="173" fill="#ea580c" fontSize="9.5" fontWeight="bold" fontFamily="Arial">SIM</text>

                {/* NÃO [Preventivo] (Right Branch) */}
                <path d="M 310,180 L 400,180 L 400,260" stroke="#000000" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
                <text x="355" y="173" fill="#16a34a" fontSize="9.5" fontWeight="bold" fontFamily="Arial">NÃO</text>
              </g>

              {/* SIM Path: SAMU Card (Red) */}
              <g onMouseEnter={() => setHoveredStep("samu")} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                <rect x="10" y="260" width="180" height="45" rx="5" fill="#f8cecc" stroke={hoveredStep === 'samu' ? '#2563eb' : '#b85450'} strokeWidth={hoveredStep === 'samu' ? '2.5' : '1.5'} />
                <text x="100" y="280" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="9.5" fontFamily="Arial">Direcionar SAMU 192</text>
                <text x="100" y="293" textAnchor="middle" fill="#555555" fontSize="8.5" fontFamily="Arial">(Pronto Atendimento Físico)</text>
                
                {/* Arrow from SAMU straight down to END page line */}
                <path d="M 100,305 L 100,700 L 250,700" stroke="#000000" strokeWidth="1.5" fill="none" />
              </g>

              {/* NÃO Path: Módulo de triagem (Blue) */}
              <g onMouseEnter={() => setHoveredStep("openai")} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                <rect x="310" y="260" width="180" height="45" rx="8" fill="#e1d5e7" stroke={hoveredStep === 'openai' ? '#2563eb' : '#9673a6'} strokeWidth={hoveredStep === 'openai' ? '2.5' : '1.5'} />
                <text x="400" y="280" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="10" fontFamily="Arial">Triagem de Sintomas</text>
                <text x="400" y="293" textAnchor="middle" fill="#555555" fontSize="8.5" fontFamily="Arial">(Classificação de Queixas)</text>
                <line x1="400" y1="305" x2="400" y2="330" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
              </g>

              {/* Action 6: Encontrar voluntário */}
              <g onMouseEnter={() => setHoveredStep("match")} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                <rect x="310" y="330" width="180" height="45" rx="8" fill="#dae8fc" stroke={hoveredStep === 'match' ? '#2563eb' : '#6c8ebf'} strokeWidth={hoveredStep === 'match' ? '2.5' : '1.5'} />
                <text x="400" y="356" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="9.5" fontFamily="Arial">Encontrar Voluntário Ativo</text>
                <line x1="400" y1="375" x2="400" y2="400" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
              </g>

              {/* FORK BAR (Execution split) */}
              <g onMouseEnter={() => setHoveredStep("fork")} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                <rect x="310" y="400" width="180" height="8" fill="#000000" rx="2" />
                
                {/* Forks out to A and B */}
                <path d="M 345,408 L 345,435" stroke="#000000" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
                <path d="M 455,408 L 455,435" stroke="#000000" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
              </g>

              {/* Node 7: Task A - Chat e video */}
              <g onMouseEnter={() => setHoveredStep("task_a")} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                <rect x="300" y="435" width="90" height="45" rx="4" fill="#f5f5f5" stroke={hoveredStep === 'task_a' ? '#2563eb' : '#777777'} strokeWidth={hoveredStep === 'task_a' ? '2"5' : '1.5'} />
                <text x="345" y="455" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="8" fontFamily="Arial">A) Conectar</text>
                <text x="345" y="468" textAnchor="middle" fill="#555555" fontSize="8" fontFamily="Arial">Chat / Sala Vídeo</text>
                <path d="M 345,480 L 345,505" stroke="#000000" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
              </g>

              {/* Node 8: Task B - Prontuário Sync */}
              <g onMouseEnter={() => setHoveredStep("task_b")} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                <rect x="410" y="435" width="90" height="45" rx="4" fill="#f5f5f5" stroke={hoveredStep === 'task_b' ? '#2563eb' : '#777777'} strokeWidth={hoveredStep === 'task_b' ? '2.5' : '1.5'} />
                <text x="455" y="455" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="8" fontFamily="Arial">B) Sincronizar</text>
                <text x="455" y="468" textAnchor="middle" fill="#555555" fontSize="8" fontFamily="Arial">Dados do Diário</text>
                <path d="M 455,480 L 455,505" stroke="#000000" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
              </g>

              {/* JOIN BAR (Consolidate flow) */}
              <g onMouseEnter={() => setHoveredStep("join")} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                <rect x="310" y="505" width="180" height="8" fill="#000000" rx="2" />
                <line x1="400" y1="513" x2="400" y2="540" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
              </g>

              {/* Node 9: Realizar Orientação */}
              <g onMouseEnter={() => setHoveredStep("consult")} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                <rect x="310" y="540" width="180" height="45" rx="8" fill="#d5e8d4" stroke={hoveredStep === 'consult' ? '#2563eb' : '#82b366'} strokeWidth={hoveredStep === 'consult' ? '2.5' : '1.5'} />
                <text x="400" y="566" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="9" fontFamily="Arial">Conduzir Aconselhamento</text>
                <line x1="400" y1="585" x2="400" y2="610" stroke="#000000" strokeWidth="1.5" markerEnd="url(#arrow)" />
              </g>

              {/* Node 10: Registrar Sumário */}
              <g onMouseEnter={() => setHoveredStep("document")} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                <rect x="310" y="610" width="180" height="45" rx="8" fill="#fff2cc" stroke={hoveredStep === 'document' ? '#2563eb' : '#d6b656'} strokeWidth={hoveredStep === 'document' ? '2.5' : '1.5'} />
                <text x="400" y="636" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="9.5" fontFamily="Arial">Emitir e Assinar Sumário</text>
                
                {/* Arrow down from summary node to bottom join line segment */}
                <path d="M 400,655 L 400,700 L 250,700" stroke="#000000" strokeWidth="1.5" fill="none" />
              </g>

              {/* Arrow from y=700 down to End terminal circle */}
              <path d="M 250,700 L 250,718" stroke="#000000" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />

              {/* END Node target circle */}
              <g onMouseEnter={() => setHoveredStep("end")} onMouseLeave={() => setHoveredStep(null)} className="cursor-pointer">
                <circle cx="250" cy="735" r="14" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />
                <circle cx="250" cy="735" r="7" fill="#334155" />
                <text x="250" y="764" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="10.5" fontFamily="Arial">Fim</text>
              </g>
            </svg>
          </div>

          <div className="text-[10px] text-slate-400 mt-2 italic text-left">
            *Dica:* Passe o cursor do mouse sobre os nós de atividade para identificar as diretivas e atores no inspetor ao lado.
          </div>
        </div>

        {/* Step Details Column */}
        <div className="w-full lg:w-[420px] bg-white p-5 rounded-lg shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-3 border-b border-slate-100 pb-2.5">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-bold text-slate-800">
                Inspetor de Caminhos Ativos (UML)
              </h4>
            </div>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed font-sans">
              Passe o mouse sobre qualquer nó do fluxograma à esquerda para inspecionar seu papel operacional, o ator responsável e os critérios de aceitação.
            </p>

            {hoveredStep ? (
              <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-200 text-xs anim-fade-in">
                <div className="font-bold text-amber-800 text-sm mb-1.5 font-sans flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-amber-600" />
                  {steps.find(s => s.id === hoveredStep)?.label}
                </div>
                <div className="text-slate-700 leading-relaxed font-sans mb-3">
                  {steps.find(s => s.id === hoveredStep)?.desc}
                </div>
                <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-wider block">
                  Categoria: {steps.find(s => s.id === hoveredStep)?.type}
                </span>
              </div>
            ) : (
              <div className="p-10 border-2 border-dashed border-slate-200 rounded-lg text-center text-xs text-slate-400 font-sans italic">
                Nenhum nó selecionado. <br /> Passe o mouse sobre os blocos de fluxo para iniciar a inspeção dinâmica de fluxos.
              </div>
            )}

            <div className="mt-5 space-y-3 font-sans text-xs">
              <h5 className="font-bold text-slate-800">Regras de Negócio do Fluxo:</h5>
              <div className="p-2.5 bg-slate-100 rounded leading-tight text-slate-600">
                <b>RN - Tempo Limite:</b> Se o profissional não ingressar em até 5 minutos no chat aberto, a triagem retorna ao topo de prioridades na fila dos demais voluntários médicos.
              </div>
              <div className="p-2.5 bg-slate-100 rounded leading-tight text-slate-605">
                <b>RN - Confidencialidade:</b> Os diários de saúde e transações de áudio e vídeo não são salvas de forma persistente em servidores, garantindo total privacidade do paciente.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px]">
            <span className="text-slate-400 font-mono">UML Activity standards</span>
            <span className="text-amber-600 font-semibold flex items-center gap-0.5">
              Caminho Crítico Mapeado
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
