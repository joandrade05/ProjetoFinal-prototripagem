import { useState, useEffect } from 'react';
import { 
  BookOpen, Sparkles, RefreshCw, FileText, Download, CheckCircle, 
  MapPin, Calendar, HelpCircle, ChevronRight, GraduationCap, Copy
} from 'lucide-react';
import DiagramUseCases from './DiagramUseCases';
import DiagramClasses from './DiagramClasses';
import DiagramActivities from './DiagramActivities';
import DiagramSequence from './DiagramSequence';

export default function ProjectDocument() {
  // --- Dynamic customization inputs same as Pitch ---
  const [startupName, setStartupName] = useState<string>("SanaLink");
  const [targetPublic, setTargetPublic] = useState<string>("Populações em comunidades economicamente desfavorecidas e idosos com doenças crônicas");
  const [specialties, setSpecialties] = useState<string>("Clínica Geral, Psicologia de Apoio, Nutrição e Enfermagem de Triagem");
  const [problemDetails, setProblemDetails] = useState<string>("Dificuldade severa de deslocamento físico, longas filas em Unidades Básicas de Saúde (UBS) e falta de letramento preventivo primário");

  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [aiDocContent, setAiDocContent] = useState<string>("");

  // --- Student Input binder for Cover ---
  const [studentName, setStudentName] = useState<string>("Grupo 05 - Análise e Desenvolvimento de Sistemas");
  const [institution, setInstitution] = useState<string>("FACULDADE DE TECNOLOGIA INTEGRADA");
  const [city, setCity] = useState<string>("São Paulo");
  const [year, setYear] = useState<string>("2026");

  // --- Interactive Self-assessment State ---
  const [groupMilestones, setGroupMilestones] = useState([
    { member: "Aluno 1 (Elicitação de Requisitos)", work: "Elicitação de RF, RNF e Regras de Negócio", grade: "Excelente" },
    { member: "Aluno 2 (Modelagem UML)", work: "Diagrama de Casos de Uso e Diagrama de Classes", grade: "Excelente" },
    { member: "Aluno 3 (Diagramas de Processo)", work: "Diagramas de Atividades e Diagrama de Sequência", grade: "Excelente" },
    { member: "Aluno 4 (UI/UX Protótipo)", work: "Protótipo Navegável e Pitch de Apresentação", grade: "Excelente" }
  ]);

  const defaultDocContent = `### 1. Introdução
No cenário atual da saúde coletiva brasileira, observam-se disparidades flagrantes no acesso à atenção primária de qualidade, especialmente em periferias urbanas e comunidades isoladas. A atenção básica em saúde, preconizada como a principal barreira preventiva e ordenadora do fluxo clínico do Sistema Único de Saúde (SUS), frequentemente encontra-se sobrealimentada e com tempos de agendamento que ultrapassam os limites seguros de prevenção secundária. Como resultado, pacientes acometidos por enfermidades crônicas recorrentes (como hipertensão e diabetes), gestantes em triagem de rotina e portadores de transtornos psicológicos leves acabam por migrar diretamente para as salas urgentes das UPAs, congestionando o sistema e gerando custos de internação desnecessários.

Nesse sentido, a plataforma **SanaLink** surge como uma startup de impacto social de telessaúde focada em preencher essa lacuna de acesso imediato. O objetivo principal do produto é prover uma infraestrutura digital segura, geolocalizada e robusta que conecte diretamente profissionais de saúde voluntários (médicos, enfermeiros, psicólogos, fisioterapeutas) e acadêmicos em fase avançada de graduação supervisionados a esse público-alvo que demanda letramento preventivo básico.

A arquitetura e os testes deste sistema apoiam-se em uma rigorosa modelagem de software norteada pelas especificações da **UML (Unified Modeling Language)**. No desenvolvimento de novas HealthTechs, a UML atua como uma semântica visual inequívoca capaz de alinhar os desenvolvedores às regras de negócio regulamentares (diretrizes do Conselho Federal de Medicina na Resolução CFM 2.314/2022 e a LGPD na segurança do prontuário eletrônico). Esse ciclo de representação garante robustez conceitual, mitiga falhas de especificação no código-fonte de produção e possibilita a auditoria transparente das solicitações e feedbacks de atendimento.

### 2. Justificativa
A criação de um ecossistema integrador de caráter comunitário ampara-se na mitigação das barreiras geográficas e econômicas habituais que privam populações menos favorecidas de contatos precoces com a saúde preventiva. Comprovadamente, mais de 70% das dúvidas clínicas dirigidas presencialmente nas UPAs poderiam ser resolvidas de forma informativa via monitoramento preventivo síncrono. Ao prover diários digitais de biomarcadores e um chat pré-triage assistido, o **SanaLink** reduz o absenteísmo clínico, educa os pacientes em hábitos saudáveis de nutrição e previne focos de hipertensão arterial perigosos antes que evoluam para paradas coronárias.

Sob a ótica da Agenda 2030 das Organizações das Nações Unidas (ONU), o projeto alinha-se cirurgicamente com o **Objetivo de Desenvolvimento Sustentável 3 (Saúde e Bem-estar)**. Especificamente, responde à **Meta 3.8**, que visa prover a cobertura universal de saúde e o acesso a serviços básicos informativos essenciais. Atende também à **Meta 3.4** (reduzir mortalidades prematuras decorrentes de patologias crônicas mediante intervenções e letramento preventivo primário) e à **Meta 3.c**, que visa cooperar com o treinamento, reciclagem e capacitação de equipes de saúde básica nas periferias urbanas brasileiras.

### 3. Objetivo Geral
Desenvolver a documentação de engenharia de requisitos de software, a modelagem conceitual UML completa e um protótipo físico interativo navegável da aplicação **SanaLink**, que conecte pacientes de baixa renda e voluntários de especialidades médicas de modo geolocalizado, provendo acompanhamento de biomarcadores e orientação preventiva sob a égide do ODS 3 da ONU.

### 4. Objetivos Específicos
* Analisar e detalhar os perfis funcionais das personas de voluntários credenciados de saúde e beneficiários vulneráveis periféricos para desenhar fluxos de navegação sem barreiras tecnológicas.
* Mapear e especificar diagramas estruturais e comportamentais da UML (Casos de Uso, Diagrama de Classes de Negócio, Diagrama de Atividades pré-clínicas e Diagrama de Sequência de Comunicação) servindo de guia para codificadores.
* Formular regras de negócio estritas que rejam a autorização confidencial dos prontuários e as diretrizes regulatórias vigentes do CFM de telessaúde.
* Desenvolver um protótipo físico navegável em alta fidelidade que simule a jornada do paciente de atualizar seu diário inteligente e ser atendido síncronamente via vídeochat.`;

  useEffect(() => {
    // Initial load
    setAiDocContent(defaultDocContent);
  }, []);

  const handleCustomiseABNT = async () => {
    setLoadingAI(true);
    try {
      const response = await fetch("/api/gemini/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "abnt",
          startupName,
          targetPublic,
          specialties,
          problemDetails
        })
      });

      const data = await response.json();
      if (data.text) {
        setAiDocContent(data.text);
      } else if (data.error) {
        setAiDocContent(`### Erro de Conexão\n${data.error}\n\n${defaultDocContent}`);
      }
    } catch (err: any) {
      console.error(err);
      setAiDocContent(`### Erro na geração\nFalha de rede ao chamar o servidor. Exibindo roteiro anterior:\n\n${defaultDocContent}`);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleCopyText = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    alert("Conteúdo da seção copiado para a área de transferência!");
  };

  return (
    <div className="space-y-12">
      
      {/* Dynamic Customizer Form box at the top */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
          <h4 className="text-md font-bold text-white font-sans">Ajustar Conteúdo da Proposta Acadêmica</h4>
        </div>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Preencha os campos abaixo com as informações do seu projeto. O assistente de formatação adaptativa reorganizará as seções de Introdução, Justificativa e Objetivos sob os padrões reais da ABNT!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans mb-4">
          <div>
            <label className="text-slate-400 font-bold block mb-1">Nome da Startup</label>
            <input 
              type="text" 
              value={startupName} 
              onChange={(e) => setStartupName(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 font-mono font-bold focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 font-bold block mb-1">Público-alvo das Conexões</label>
            <input 
              type="text" 
              value={targetPublic} 
              onChange={(e) => setTargetPublic(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 font-bold block mb-1">Especialidades Médicas Oferecidas</label>
            <input 
              type="text" 
              value={specialties} 
              onChange={(e) => setSpecialties(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 font-bold block mb-1">Dores do Usuário & Problemas Principais</label>
            <textarea 
              value={problemDetails} 
              onChange={(e) => setProblemDetails(e.target.value)} 
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:border-teal-500 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCustomiseABNT}
            disabled={loadingAI}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-teal-950/20"
          >
            {loadingAI ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4.5 h-4.5" />}
            Gerar Proposta Formatada (ABNT)
          </button>

          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-950/20 transition-all font-sans"
          >
            <Download className="w-4 h-4" />
            Salvar Trabalho Completo (PDF / ABNT)
          </button>
          
          <div className="bg-slate-950 px-3 py-2 rounded text-[10px] text-slate-400 flex items-center gap-2 border border-slate-850">
            <span>💡 <i>Dica:</i> Você também pode editar os nomes e títulos clicando e digitando diretamente sobre a "Capa" do documento abaixo!</span>
          </div>
        </div>
      </div>

      {/* ================= ABNT PHYSICAL PAPER BINDER STRUCTURE ================= */}
      <div id="project-document-paper" className="bg-white text-slate-900 p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 font-serif max-w-4xl mx-auto space-y-12 relative overflow-hidden">
        
        {/* Academic Watermark or punch holes decoration */}
        <div className="hidden md:block absolute left-4 top-0 bottom-0 w-1 flex flex-col justify-around text-slate-300">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-3.5 h-3.5 bg-slate-100 rounded-full border border-slate-200 shadow-inner -ml-1.5" />
          ))}
        </div>

        {/* -------------------- SECTION: COVER (CAPA) -------------------- */}
        <div className="text-center flex flex-col justify-between h-[680px] p-4 select-none">
          <div className="space-y-4">
            <GraduationCap className="w-12 h-12 mx-auto text-teal-600" />
            <input 
              type="text" 
              value={institution} 
              onChange={(e) => setInstitution(e.target.value)} 
              className="w-full text-center border-0 font-bold uppercase hover:bg-slate-50 text-sm focus:ring-1 focus:ring-teal-500 py-1"
              title="Clique para editar Instituição"
            />
            <p className="text-xs tracking-wider uppercase">Curso de Tecnologia em Análise e Desenvolvimento de Sistemas</p>
          </div>

          <div className="space-y-5">
            <input 
              type="text" 
              value={studentName} 
              onChange={(e) => setStudentName(e.target.value)} 
              className="w-full text-center border-0 hover:bg-slate-50 text-md focus:ring-1 focus:ring-teal-500 py-1 text-slate-700"
              title="Clique para editar Autor"
            />
            
            <div className="py-12">
              <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-slate-950 font-sans">
                PROPOSTA DE EMISSÃO DA STARTUP {startupName || "SanaLink"}
              </h1>
              <p className="text-sm tracking-wide italic text-slate-500 mt-2 font-serif">
                Desenvolvimento de Documentação de Requisitos, Modelagem UML e Protótipo de Telessaúde para o ODS 3.
              </p>
            </div>
            
            <p className="text-xs text-slate-400 max-w-md mx-auto italic font-sans">
              Projeto acadêmico apresentado para a disciplina de Análise de Requisitos e Prototipagem da Faculdade Superior de Computação.
            </p>
          </div>

          <div className="flex justify-center gap-1.5 text-xs font-sans font-semibold">
            <input 
              type="text" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
              className="w-20 text-center border-0 hover:bg-slate-50 focus:ring-1 focus:ring-teal-500 py-0.5 text-slate-600 font-bold"
            />
            <span>-</span>
            <input 
              type="text" 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
              className="w-12 text-center border-0 hover:bg-slate-50 focus:ring-1 focus:ring-teal-500 py-0.5 text-slate-600 font-bold"
            />
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* -------------------- SECTIONS 1, 2, 3, 4: GERAL INTRODUÇÃO (AI CUSTOMIZABLE) -------------------- */}
        <div className="space-y-8 p-4 font-serif text-slate-800 leading-relaxed text-[13.5px] relative">
          
          <button 
            onClick={() => handleCopyText(aiDocContent)}
            className="absolute top-0 right-0 bg-slate-100 hover:bg-slate-200 text-slate-600 p-1.5 rounded text-xs flex items-center gap-1 font-sans cursor-pointer shadow-sm"
            title="Copiar Seção"
          >
            <Copy className="w-3.5 h-3.5" /> Copiar Texto
          </button>

          {aiDocContent.split("\n\n").map((para, idx) => {
            if (para.startsWith("###")) {
              return (
                <h3 key={idx} className="text-md font-sans font-bold text-slate-900 border-b border-slate-105 pb-1 mt-8 mb-4 uppercase tracking-tight">
                  {para.replace("### ", "")}
                </h3>
              );
            }
            if (para.startsWith("*")) {
              return (
                <ul key={idx} className="list-disc list-inside pl-4 space-y-1 my-2">
                  <li className="text-slate-700 leading-relaxed">{para.replace("* ", "")}</li>
                </ul>
              );
            }
            return <p key={idx} className="indent-8 text-justify leading-relaxed">{para}</p>;
          })}
        </div>

        {/* -------------------- SECTION 5: DESCRIÇÃO DO SISTEMA -------------------- */}
        <div className="p-4 space-y-4">
          <h3 className="text-md font-sans font-bold text-slate-950 border-b pb-1 uppercase tracking-tight">
            5. Descrição do Sistema Proposto
          </h3>

          <p className="indent-8 text-justify leading-relaxed text-[13.5px]">
            O sistema operará como uma plataforma web responsiva inovadora desenvolvida sob os padrões modernos de engenharia de software de telessaúde. O fluxo crítico inicia com a recepção do beneficiário (paciente), que introduz suas métricas no Diário de Biomarcadores. O diário é integrado ao ecossistema do **{startupName || "SanaLink"}**, fornecendo alertas em tempo real em caso de picos agudos de pressão ou estados graves de desidratação.
          </p>
          <p className="indent-8 text-justify leading-relaxed text-[13.5px]">
            Em paralelo, o módulo de triagem inicial resume os desconfortos sintomáticos em um sumário clínico preliminar de queixa sob demanda. O beneficiário é então alinhado a uma fila geolocalizada onde profissionais voluntários inscritos e auditados assumem a chamada síncrona. Os profissionais revisam remotamente as métricas do paciente, oferecem teleorientação de caráter preventivo e, ao final da sessão, emitem e assinam digitalmente um sumário informativo pré-estruturado em formato compatível com a LGPD.
          </p>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-sans">
            <span className="font-bold text-slate-900 block mb-1">Tecnologias de Infraestrutura Previstas:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li><b>Frontend:</b> Biblioteca ReactJS em conjunto com Tailwind CSS para garantir design flexível responsivo e touch-friendly em navegadores mobile.</li>
              <li><b>Backend:</b> Node.js estruturado com Express, servindo endpoints seguros de criptografia ponta-a-ponta para o tratamento de biomarcadores.</li>
              <li><b>Integrações:</b> Protocolo WebRTC para videoconferência P2P síncrona e APIs de geolocalização e mapas para a busca de postos de pronto-atendimento e profissionais voluntários próximos.</li>
            </ul>
          </div>
        </div>

        {/* -------------------- SECTION 6: REQUISITOS (RF, RNF, RN) -------------------- */}
        <div className="p-4 space-y-6">
          <h3 className="text-md font-sans font-bold text-slate-950 border-b pb-1 uppercase tracking-tight">
            6. Requisitos de Software Mapeados
          </h3>

          {/* Requisitos Funcionais */}
          <div className="space-y-2">
            <h4 className="text-sm font-sans font-bold text-slate-900">6.1. Requisitos Funcionais (RF)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-collapse border-slate-200 font-sans">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="border p-2 font-bold w-16">Código</th>
                    <th className="border p-2 font-bold w-36">Título</th>
                    <th className="border p-2 font-bold">Descrição Técnica de Requisitos</th>
                    <th className="border p-2 font-bold w-20">UML Link</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 divide-y">
                  <tr>
                    <td className="border p-2 font-mono font-bold">RF01</td>
                    <td className="border p-2">Cadastro Multinível</td>
                    <td className="border p-2">O sistema deve requerer email, senha e documentos para perfis de voluntário ou beneficiário.</td>
                    <td className="border p-2 font-mono text-teal-650">UC01</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-mono font-bold">RF02</td>
                    <td className="border p-2">Auditoria de Credencial</td>
                    <td className="border p-2">O sistema deve bloquear voluntários adicionados até que o administrador confirme os registros profissionais.</td>
                    <td className="border p-2 font-mono text-teal-650">UC01</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-mono font-bold">RF03</td>
                    <td className="border p-2">Diário de Sinais</td>
                    <td className="border p-2">O sistema deve permitir aferir e registrar diários de pressão arterial, hidratação e humor.</td>
                    <td className="border p-2 font-mono text-teal-655">UC02</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-mono font-bold">RF04</td>
                    <td className="border p-2">Triagem Preliminar de Queixas</td>
                    <td className="border p-2">O sistema deve permitir a triagem estruturada de queixas dos beneficiários, gerando resumos de sintomas conforme parâmetros de prioridade definidos por protocolo clínico.</td>
                    <td className="border p-2 font-mono text-teal-655">UC03</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-mono font-bold">RF05</td>
                    <td className="border p-2">Orientação Multicanal</td>
                    <td className="border p-2">O sistema deve capacitar transmissão de áudio/vídeo e chat em salas virtuais síncronas.</td>
                    <td className="border p-2 font-mono text-teal-655">UC04</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-mono font-bold">RF06</td>
                    <td className="border p-2">Sumário assinado</td>
                    <td className="border p-2">O sistema deve permitir ao profissional lavrar sumários clínicos, fornecendo botão de exportação para PDF.</td>
                    <td className="border p-2 font-mono text-teal-655">UC04</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Requisitos Não Funcionais */}
          <div className="space-y-2">
            <h4 className="text-sm font-sans font-bold text-slate-900">6.2. Requisitos Não Funcionais (RNF)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-collapse border-slate-200 font-sans">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="border p-2 font-bold w-16">Código</th>
                    <th className="border p-2 font-bold w-24">Categoria</th>
                    <th className="border p-2 font-bold">Descrição de Critério de Qualidade</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 divide-y">
                  <tr>
                    <td className="border p-2 font-mono font-bold">RNF01</td>
                    <td className="border p-2">Segurança</td>
                    <td className="border p-2">Todas as conexões e logs de diário de saúde devem trafegar criptografados sob protocolo SSL/HTTPS.</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-mono font-bold">RNF02</td>
                    <td className="border p-2">Desempenho</td>
                    <td className="border p-2">A ferramenta de busca por voluntários deve responder em até 2 segundos em redes móveis 4G estáveis.</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-mono font-bold">RNF03</td>
                    <td className="border p-2">Usabilidade</td>
                    <td className="border p-2">As telas críticas de diário e chat devem ser adaptadas ao tamanho ideal de alvos de toque em celulares (min 44px).</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-mono font-bold">RNF04</td>
                    <td className="border p-2">Conformidade</td>
                    <td className="border p-2">O sistema de guarda e visualização de prontuários deve operar em total submissão às diretrizes da LGPD (Lei 13.709).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Regras de Negócio */}
          <div className="space-y-2">
            <h4 className="text-sm font-sans font-bold text-slate-900">6.3. Regras de Negócio (RN)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-collapse border-slate-200 font-sans">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="border p-2 font-bold w-16">Código</th>
                    <th className="border p-2 font-bold w-36">Impacto / Escopo</th>
                    <th className="border p-2 font-bold">Regra Operacional Restritiva</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 divide-y">
                  <tr>
                    <td className="border p-2 font-mono font-bold">RN01</td>
                    <td className="border p-2">Triagem Voluntária</td>
                    <td className="border p-2">Um profissional voluntário só pode ingressar na sala virtual de atendimento após auditoria manual e aprovação de seu registro profissional (CRM/CRN/CRP/COREN) pelo administrador.</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-mono font-bold">RN02</td>
                    <td className="border p-2">Urgência Presencial</td>
                    <td className="border p-2">Se os dados informados acusarem quadro sintomático urgente (ex: PA &gt; 18/11 ou queixa de enfarte), o sistema de triagem deve restringir a teleorientação informativa e emitir alerta imediato com desvio para contato físico ou telefone do SAMU (192).</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-mono font-bold">RN03</td>
                    <td className="border p-2">Timeout de Fila</td>
                    <td className="border p-2">Se nenhuma resposta de acolhimento voluntário ocorrer em até 10 minutos, o paciente é perguntado se deseja manter-se na fila preventiva ou agendar um horário secundário para a semana.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* -------------------- SECTION 7: DIAGRAMAS UML INTERATIVOS ENCASTRADOS -------------------- */}
        <div className="p-4 space-y-12">
          <h3 className="text-md font-sans font-bold text-slate-950 border-b pb-1 uppercase tracking-tight">
            7. Diagramas de Engenharia de Software UML
          </h3>

          <p className="indent-8 text-justify leading-relaxed text-[13.5px]">
            Para rege-se de forma fidedigna as transações, os diagramas UML interativos a seguir foram estruturados e servem de guia unificado para a codificação conceitual e física da startup **{startupName || "SanaLink"}**:
          </p>

          <div className="space-y-12">
            
            {/* UCC Embedded */}
            <div className="space-y-3">
              <h4 className="text-sm font-sans font-bold text-slate-900">7.1. Diagrama de Casos de Uso Interativo</h4>
              <p className="text-xs text-slate-500 leading-relaxed indent-4">
                Descreve as fronteiras do sistema SanaLink, identificando como Paciente, Profissional Voluntário e Administrador do Sistema controlam os casos de sucesso modelados:
              </p>
              <DiagramUseCases />
            </div>

            {/* Classes Embedded */}
            <div className="space-y-3">
              <h4 className="text-sm font-sans font-bold text-slate-900">7.2. Diagrama de Classes e Domínio de Dados</h4>
              <p className="text-xs text-slate-500 leading-relaxed indent-4">
                Ilustra as dependências lógicas de herança de classes e multiplicidade orientada a objetos regulando o acoplamento do prontuário síncrono:
              </p>
              <DiagramClasses />
            </div>

            {/* Activities Embedded */}
            <div className="space-y-3">
              <h4 className="text-sm font-sans font-bold text-slate-900">7.3. Diagrama de Atividades Operacionais</h4>
              <p className="text-xs text-slate-500 leading-relaxed indent-4">
                Rege as decisões paralelas (fork/join) e barreiras clínicas que garantem a segurança do paciente e o acionamento célere de emergências físicas:
              </p>
              <DiagramActivities />
            </div>

            {/* Sequence Embedded */}
            <div className="space-y-3">
              <h4 className="text-sm font-sans font-bold text-slate-900">7.4. Diagrama de Sequência e Passagem de Mensagens</h4>
              <p className="text-xs text-slate-500 leading-relaxed indent-4">
                Representa a cronologia ordenada de chamadas de métodos e retornos de sessões seguras no canal ativo de videoconferência preventiva:
              </p>
              <DiagramSequence />
            </div>

          </div>
        </div>

        <hr className="border-slate-200" />

        {/* -------------------- SECTION 8: PROTÓTIPOS E FIGMA LINK -------------------- */}
        <div className="p-4 space-y-4">
          <h3 className="text-md font-sans font-bold text-slate-950 border-b pb-1 uppercase tracking-tight">
            8. Protótipos de Alta Fidelidade (UI/UX)
          </h3>

          <p className="indent-8 text-justify leading-relaxed text-[13.5px]">
            Como elemento prático do projeto, foi desenvolvido um protótipo navegável interativo representando as principais interfaces lógicas da jornada pré-clínica de saúde do beneficiário e do médico. Um simulador interativo deste protótipo está ativamente embutido no painel desta aplicação para demonstrações práticas.
          </p>

          <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg text-xs font-sans space-y-2">
            <span className="font-bold text-teal-900 flex items-center gap-1">🔗 Link do Protótipo Interativo Figma:</span>
            <input 
              type="text" 
              defaultValue="https://www.figma.com/proto/SanaLinkODS3UniversityExampleProject" 
              className="w-full bg-white border border-teal-300 rounded p-1.5 focus:ring-1 focus:ring-teal-500 outline-none text-teal-800 font-mono text-[11px]"
              title="Edite seu link público do Figma aqui"
            />
            <span className="text-[10px] text-slate-500 block">Este campo de link está em conformidade com as exigências de entrega e pode ser substituído por qualquer URL de protótipo de alta fidelidade elaborado pelo seu grupo de disciplinas.</span>
          </div>
        </div>

        {/* -------------------- SECTION 9: CONCLUSÃO -------------------- */}
        <div className="p-4 space-y-4 text-[13px] leading-relaxed">
          <h3 className="text-md font-sans font-bold text-slate-950 border-b pb-1 uppercase tracking-tight">
            9. Conclusão do Estudo de Caso
          </h3>

          <p className="indent-8 text-justify">
            A elaboração do presente projeto de impacto social voltado para a startup **{startupName || "SanaLink"}** permitiu amadurecer profundamente a correlação existente entre engenharia de requisitos detalhada, modelagem comportamental orientada a objetos (UML) e o design focado em acessibilidade para populações carentes. Durante as iterações, o maior obstáculo enfrentado consistiu em conciliar o modelo estrito de segurança previstos pela LGPD com um fluxo interativo simplificado que permitisse a pessoas de baixo letramento digital atualizarem seus biomarcadores de forma intuitiva.
          </p>
          <p className="indent-8 text-justify">
            A utilização da modelagem visual da UML (Casos de Uso, Classes, Atividades e Sequência) atuou de forma decisiva para clarear os limites operacionais do sistema, servindo de roteiro preciso para que não ocorressem inconsistências de projeto que acarretassem em atraso na codificação. Por fim, o projeto consolida-se como um modelo executável pioneiro de emparelhamento científico em prol do **ODS 3 da ONU**, comprovando que a informática aplicada à saúde possui poder de democratizar e preservar de dezenas de vidas sob orientações preventivas qualificadas de baixo custo.
          </p>
        </div>

        {/* -------------------- SECTION 10: REFERÊNCIAS ABNT -------------------- */}
        <div className="p-4 space-y-4 text-xs font-sans text-slate-600">
          <h3 className="text-md font-sans font-bold text-slate-950 border-b pb-1 uppercase tracking-tight text-slate-900">
            10. Referências Bibliográficas (Padrão ABNT NBR 6023)
          </h3>

          <div className="space-y-4 pl-4 -indent-4 text-justify">
            <p>
              1. ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. <b>NBR ISO/IEC 12207: Engenharia de sistemas e software - Processos de ciclo de vida de software</b>. Rio de Janeiro: ABNT, 2021.
            </p>
            <p>
              2. BOOCH, Grady; RUMBAUGH, James; JACOBSON, Ivar. <b>UML: guia do usuário</b>. 2. ed. Rio de Janeiro: Elsevier, 2012.
            </p>
            <p>
              3. CONSELHO FEDERAL DE MEDICINA (CFM). <b>Resolução CFM nº 2.314/2022: Regulamenta a Telemedicina como forma de prestação de serviços médicos mediados por tecnologias</b>. Brasília: CFM, 2022. Disponível em: &lt;https://sistemas.cfm.org.br/normas/visualizar/resolucao/2314-2022&gt;.
            </p>
            <p>
              4. ORGANIZAÇÃO DAS NAÇÕES UNIDAS (ONU). <b>Transformando Nosso Mundo: A Agenda 2030 para o Desenvolvimento Sustentável</b>. ONU Brasil, 2015. Disponível em: &lt;https://brasil.un.org/pt-br/91863-agenda-2030-para-o-desenvolvimento-sustentavel&gt;.
            </p>
            <p>
              5. SOMMERVILLE, Ian. <b>Engenharia de Software</b>. 10. ed. São Paulo: Pearson Education, 2019.
            </p>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* -------------------- SECTION 11: AUTOAVALIAÇÃO INTERATIVA DO GRUPO -------------------- */}
        <div className="p-4 space-y-4 font-sans text-xs">
          <h3 className="text-md font-sans font-bold text-slate-950 border-b pb-1 uppercase tracking-tight text-slate-900">
            11. Ficha de Autoavaliação de Desempenho do Grupo (Anexo)
          </h3>

          <p className="text-slate-500 italic mb-2">
            Atribua os conceitos de conceituação para cada integrante do grupo com base nas entregas reais e colaborações mútuas estabelecidas na disciplina.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border border-slate-200 text-xs text-slate-700">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="border p-2 font-bold">Integrante / Papel de Colaboração</th>
                  <th className="border p-2 font-bold">Tarefa Principal Efetuada</th>
                  <th className="border p-2 font-bold w-28">Auto-Conceito</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-600">
                {groupMilestones.map((m, index) => (
                  <tr key={index}>
                    <td className="border p-2 font-semibold">
                      <input 
                        type="text" 
                        value={m.member} 
                        onChange={(e) => {
                          const updated = [...groupMilestones];
                          updated[index].member = e.target.value;
                          setGroupMilestones(updated);
                        }} 
                        className="w-full bg-transparent border-0 hover:bg-slate-50 focus:ring-1 focus:ring-teal-500 py-0.5"
                      />
                    </td>
                    <td className="border p-2">
                      <input 
                        type="text" 
                        value={m.work} 
                        onChange={(e) => {
                          const updated = [...groupMilestones];
                          updated[index].work = e.target.value;
                          setGroupMilestones(updated);
                        }} 
                        className="w-full bg-transparent border-0 hover:bg-slate-50 focus:ring-1 focus:ring-teal-500 py-0.5"
                      />
                    </td>
                    <td className="border p-2">
                      <select
                        value={m.grade}
                        onChange={(e) => {
                          const updated = [...groupMilestones];
                          updated[index].grade = e.target.value;
                          setGroupMilestones(updated);
                        }}
                        className="w-full bg-transparent border-0 rounded text-xs py-0.5"
                      >
                        <option value="Excelente">Excelente (Conceito A)</option>
                        <option value="Bom">Bom (Conceito B)</option>
                        <option value="Regular">Regular (Conceito C)</option>
                        <option value="Insuficiente">Insuficiente (Conceito D)</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-slate-400 italic">
            *Aprovado de forma coletiva pelos integrantes sob consenso de cooperação.*
          </p>
        </div>

      </div>

    </div>
  );
}
