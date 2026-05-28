import { useState } from 'react';
import { 
  Heart, FileText, Play, Code, Star, HeartHandshake, ShieldCheck, 
  ChevronRight, ArrowUpRight, GraduationCap, Sparkles
} from 'lucide-react';
import FigmaPrototypeView from './components/FigmaPrototypeView';
import ProjectDocument from './components/ProjectDocument';
import PitchSimulator from './components/PitchSimulator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'prototipo' | 'documento' | 'pitch'>('prototipo');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-900">
      
      {/* Top Professional Header Navigation */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Heart className="w-5.5 h-5.5 text-slate-950 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-md font-extrabold tracking-tight text-white font-sans">SanaLink</span>
                <span className="px-1.5 py-0.5 bg-teal-950/80 text-teal-400 text-[9px] font-bold rounded-md font-mono border border-teal-900/30">ODS 3</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Saúde & Bem-Estar Comunitário Digital</p>
            </div>
          </div>

          {/* Tab Navigation Menu */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 w-full sm:w-auto gap-1">
            <button
              onClick={() => setActiveTab('prototipo')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'prototipo'
                  ? 'bg-slate-900 text-teal-400 shadowBorder border border-slate-750'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              Protótipo Navegável
            </button>
            <button
              onClick={() => setActiveTab('documento')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'documento'
                  ? 'bg-slate-900 text-teal-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              Documento ABNT & UML
            </button>
            <button
              onClick={() => setActiveTab('pitch')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'pitch'
                  ? 'bg-slate-900 text-teal-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Pitch Shark Tank
            </button>
          </div>

          {/* Academic Context Tag */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400 font-medium bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-850">
            <GraduationCap className="w-4 h-4 text-teal-500" />
            <span>ADS • Prototipagem de Startups</span>
          </div>

        </div>
      </header>

      {/* Hero Welcome banner (Introdução Teórica) */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-850 py-10 px-4 sm:px-6 lg:px-8 shadow-inner select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-950/80 text-teal-450 rounded-full text-xs font-mono font-bold border border-teal-900/40">
              <span className="h-2 w-2 rounded-full bg-teal-400 block" />
              ODS 3: Saúde e Bem-Estar da ONU
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              SanaLink: Conectando Empatia Profissional à Necessidade Básica
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Uma startup social focada na universalização do letramento de saúde básica nas periferias brasileiras, mitigando os picos sintomáticos evitáveis e desafogando UPAs. Fornecemos diários criptografados de biomarcadores, triagem assistida de queixas e teleorientação síncrona voluntária qualificada.
            </p>
            
            <div className="flex flex-wrap gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <HeartHandshake className="w-4 h-4 text-teal-500" />
                <b>Público connected:</b> Beneficiários Vulneráveis &lt;&gt; Voluntários Médicos
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <b>Normas Reguladas:</b> Submisso ao CFM, LGPD e NBR ABNT de Projetos
              </span>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-center space-y-3.5 shadow">
            <span className="text-[10px] text-slate-500 font-mono tracking-widest block uppercase font-bold">Resumo das Metas da ONU</span>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <span className="text-slate-300 font-semibold text-[11px]">ODS 3.8 Universal Care:</span>
                <span className="text-teal-400 font-mono font-bold">+85% Acesso Informativo</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-slate-300 font-semibold text-[11px]">ODS 3.4 Diabetes & Hipertensão:</span>
                <span className="text-teal-400 font-mono font-bold">-12% Mortes Evitáveis</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-slate-300 font-semibold text-[11px]">ODS 3.c Capacitação em Saúde:</span>
                <span className="text-teal-400 font-mono font-bold">Formação Prática Assistida</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Multi-Tab Core Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'prototipo' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-850 p-5 rounded-xl text-xs flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">Como testar esta simulação?</h4>
                <p className="text-slate-400 leading-relaxed">Você pode ingressar no papel de <b>Paciente</b> para atualizar biomarcadores no diário ou falar com médicos na sala, ou mudar para o perfil de <b>Profissional de Saúde</b> para preencher diagnósticos no prontuário.</p>
              </div>
              <button 
                onClick={() => setActiveTab('documento')} 
                className="px-4 py-1.5 bg-slate-850 hover:bg-slate-800 text-teal-400 hover:text-teal-350 border border-teal-900/30 rounded font-bold text-xs shrink-0 flex items-center justify-center gap-1 select-none cursor-pointer"
              >
                Escrever Paper ABNT <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <FigmaPrototypeView />
          </div>
        )}

        {activeTab === 'documento' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-850 p-5 rounded-xl text-xs flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">Paper Acadêmico Completo & Diagramas UML Inline</h4>
                <p className="text-slate-400 leading-relaxed">Este documento está formatado nos parâmetros rígidos da ABNT. Você pode ler os capítulos, copiar os textos formatados, regular o nome dos integrantes no topo da capa e inspecionar os diagramas lógicos estruturais de forma viva e interativa.</p>
              </div>
              <button 
                onClick={() => setActiveTab('pitch')} 
                className="px-4 py-1.5 bg-slate-850 hover:bg-slate-800 text-teal-400 hover:text-teal-350 border border-teal-900/30 rounded font-bold text-xs shrink-0 flex items-center justify-center gap-1 select-none cursor-pointer"
              >
                Simular Pitch de Vendas <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <ProjectDocument />
          </div>
        )}

        {activeTab === 'pitch' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-850 p-5 rounded-xl text-xs flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">Roteiro & Treinador de Oratória para a Banca Acadêmica</h4>
                <p className="text-slate-400 leading-relaxed">Prepare-se para defender seu projeto no formato "Shark Tank". Acompanhe os slides sugeridos, inicie o timer para treinar sua entonação e presteza e use o assistente de oratória acadêmica para estruturar e refinar as suas falas.</p>
              </div>
              <button 
                onClick={() => setActiveTab('prototipo')} 
                className="px-4 py-1.5 bg-slate-850 hover:bg-slate-800 text-teal-400 hover:text-teal-350 border border-teal-900/30 rounded font-bold text-xs shrink-0 flex items-center justify-center gap-1 select-none cursor-pointer"
              >
                Voltar ao Protótipo <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <PitchSimulator />
          </div>
        )}

      </main>

      {/* Professional Academic footer */}
      <footer className="bg-slate-900 border-t border-slate-850 py-8 select-none text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-5">
          
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            <span>© 2026 SanaLink Startup de Impacto Social • ODS 3 ONU</span>
          </div>

          <div className="flex gap-4">
            <span className="hover:text-slate-350">UML 2.5 Modeling</span>
            <span>•</span>
            <span className="hover:text-slate-300">ABNT NBR 13596</span>
            <span>•</span>
            <span className="hover:text-slate-300">Faculdade de ADS</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
