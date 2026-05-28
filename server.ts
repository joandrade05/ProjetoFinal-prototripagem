import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Client helper
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!aiClient) {
      const key = process.env.GEMINI_API_KEY;
      if (!key || key === "" || key === "MY_GEMINI_API_KEY") {
        return null;
      }
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Gemini completion endpoint for report assistance & pitch generation
  app.post("/api/gemini/assist", async (req, res) => {
    try {
      const { type, startupName, targetPublic, specialties, problemDetails } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.status(200).json({ 
          error: "Chave de API Gemini não configurada nos segredos.",
          apiKeyMissing: true,
          text: `### Nota sobre a Chave de API
Você não configurou uma **GEMINI_API_KEY** real nas configurações da aplicação (Settings > Secrets). Para obter resultados customizados gerados dinamicamente via Inteligência Artificial, por favor configure sua chave de API do Gemini no painel.

Como alternativa de demonstração, criamos um texto pré-preparado de alta qualidade acadêmica ajustado para **${startupName || "SanaLink"}** focado no **ODS 3**:

### 1. Introdução
No cenário atual de saúde coletiva no Brasil, observam-se disparidades latentes no acesso à assistência primária, especialmente em conglomerados urbanos socialmente desfavorecidos e zonas rurais remotas. A atenção básica, preconizada como a principal porta de entrada e ordenadora do cuidado dentro do Sistema Único de Saúde (SUS), frequentemente encontra-se sobrecarregada, gerando vazios de assistência que afetam de forma severa as populações vulneráveis, idosos e pessoas com comorbidades crônicas. O desenvolvimento de soluções integradoras, baseadas em plataformas de economia colaborativa que conectam diretamente voluntários de saúde (médicos, enfermeiros, psicólogos e acadêmicos supervisionados) a essa parcela populacional, surge como um fator catalisador para a democratização do cuidado e descentralização da orientação preventiva primária.

A implementação da plataforma de impacto social **${startupName || "SanaLink"}** apoia-se firmemente em uma engenharia de requisitos meticulosa e no emprego das melhores práticas da modelagem Unified Modeling Language (UML). No ciclo de vida do desenvolvimento de software, a modelagem UML é indispensável para construir a arquitetura conceitual e operacional do sistema. Diagramas de Casos de Uso, Classes, Atividades e Sequência estabelecem uma semântica visual unificada que permite alinhar o entendimento dos desenvolvedores com os objetivos de impacto social, mitigando riscos de implementação, refinando as regras corporativas e assegurando que as jornadas críticas do usuário doador e beneficiário sejam executadas de maneira fluida e segura.

Nesse contexto, a solução contribui proativamente para o **Objetivo de Desenvolvimento Sustentável 3 da ONU (Saúde e Bem-estar)**. Ao prover orientação preventiva de qualidade, triagens rápidas e canais integrados de orientação remota de baixo custo e base voluntária, a startup foca na prevenção primária de doenças não transmissíveis, otimizando o encaminhamento para o serviço de saúde presencial e fomentando o letramento digital em saúde das populações integradas.

### 2. Justificativa
A criação de um ecossistema que conecte profissionais voluntários de saúde aos pacientes de baixa renda justifica-se pela urgente necessidade de mitigar as barreiras físicas, econômicas e informacionais na saúde primária. Estima-se que milhões de brasileiros enfrentem meses de espera por orientações de saúde simples que poderiam ser sanadas com uma triagem ou aconselhamento preventivo. Através de teleorientações de caráter informativo e preventivo, o **${startupName || "SanaLink"}** otimiza o fluxo de atendimento pré-clínico, reduzindo a automedicação prejudicial, identificando sinais de alerta de forma precoce e empoderando comunidades vulneráveis com conhecimentos sobre saúde, nutrição e bem-estar psicológico.

Sob o ponto de vista das metas globais da ONU, o projeto responde diretamente à **Meta 3.8 do ODS 3**, que visa atingir a cobertura universal de saúde e assegurar o acesso a serviços básicos essenciais de qualidade. Adicionalmente, atende à **Meta 3.4**, destinada a reduzir as mortes prematuras decorrentes de enfermidades crônicas através de processos de prevenção e monitoramento remoto de biomarcadores (pressão arterial, glicemia e hábitos de vida) integrados ao prontuário compartilhado da plataforma, e à **Meta 3.c**, que visa capacitar e expandir o corpo de profissionais de saúde em comunidades, estimulando estudantes do final de graduação a exercer orientações supervisionadas em projetos de impacto social reais.

### 3. Objetivo Geral
Desenvolver um documento formal de projeto compreendendo engenharia de requisitos, diagramas de modelagem UML e um protótipo navegável de alta fidelidade para a startup **${startupName || "SanaLink"}**, uma plataforma web responsiva de apoio social que visa conectar agentes/profissionais voluntários de saúde e beneficiários de comunidades carentes para prover orientação preventiva e monitoramento básico, em conformidade com o ODS 3 da ONU.

### 4. Objetivos Específicos
* Estudar e estruturar o modelo de negócios de impacto social e conformidade da plataforma com as diretrizes do CFM (Conselho Federal de Medicina) e LGPD (Lei Geral de Proteção de Dados) para telessaúde.
* Realizar o levantamento detalhado de requisitos funcionais, não funcionais e regras de negócio para as duas personas principais (Beneficiário e Profissional Voluntário), estruturando diagramas UML (Uso, Classes, Atividades e Sequência) que rejam a lógica de triagem preventiva e orientação clínica.
* Conceber e desenvolver um protótipo navegável interativo de alta fidelidade no Figma/React que simule a jornada de agendamento de teleorientação, preenchimento do diário de saúde e comunicação ativa do profissional com o paciente.`
        });
      }

      const mStartupName = startupName || "SanaLink";
      const mTargetPublic = targetPublic || "Populações vulneráveis ou idosos em comunidades carentes";
      const mSpecialties = specialties || "Clínica Geral, Psicologia, Nutrição, Enfermagem preventiva";
      const mProblemDetails = problemDetails || "Dificuldade de acesso a exames preventivos, consultas básicas, e falta de acompanhamento de doenças crônicas.";

      let prompt = "";
      let systemInstruction = "Você é um professor e consultor acadêmico especialista em empreendedorismo social, startups de saúde (HealthTechs) e normas ABNT.";

      if (type === "abnt") {
        prompt = `Com base nos seguintes dados da nossa startup de impacto social (ODS 3 - Saúde e Bem-Estar):
- Nome da startup: ${mStartupName}
- Público-alvo: ${mTargetPublic}
- Especialidades médicas atendidas: ${mSpecialties}
- Problema central que resolve: ${mProblemDetails}

Escreva uma proposta acadêmica aprimorada contendo 4 seções em português estruturadas de forma científica e clara:
Seção 1: Uma Introdução profunda de cerca de 3 parágrafos explicando o cenário da saúde periférica no Brasil, a importância de conectar estes públicos para preencher a lacuna da atenção básica (ODS 3.8) e a relevância da modelagem UML no processo de desenvolvimento de software.
Seção 2: Uma Justificativa detalhada de 2 parágrafos explicitando a relevância social, as dores reais dos usuários solucionadas, o impacto esperado, e especificando exatamente como a solução atende à Meta 3.8 e Meta 3.4 do ODS 3 da ONU.
Seção 3: O Objetivo Geral do projeto formulado de maneira clara e acadêmica iniciando com verbo no infinitivo (ex: Desenvolver, Implementar).
Seção 4: Três Objetivos Específicos que direcionem o grupo em termos de elicitação de requisitos, design de software orientado a objetos e validação de protótipo.

Formate as respostas usando cabeçalhos markdown claros de nível 3 para cada seção (ex: ### 1. Introdução, ### 2. Justificativa, etc.). Não inclua outras seções além das quatro solicitadas.`;
      } else if (type === "pitch") {
        systemInstruction = "Você é um investidor experiente do Shark Tank Brasil e especialista em pitches de vendas para startups de impacto social.";
        prompt = `Com base nos seguintes dados da nossa startup de ODS 3:
- Nome da startup: ${mStartupName}
- Público-alvo: ${mTargetPublic}
- Especialidades: ${mSpecialties}
- Problema central: ${mProblemDetails}

Escreva um roteiro completo de Pitch de Venda de 3 minutos para o Shark Tank Brasil.
O roteiro deve engajar o júri e possuir as seguintes partes bem marcadas em Português:
1. O Gancho (Abertura impactante com dados de saúde do público-alvo)
2. O Problema (A dor real e a desigualdade no acesso à saúde básica)
3. A Solução (Apresentação da plataforma ${mStartupName} conectando voluntários de saúde e beneficiários de forma simples, geolocalizada e assistida)
4. Modelo de Negócio (Como a startup se sustenta: ex. parcerias corporativas de ESG, convênios municipais ou planos B2B de subsídio)
5. O Impacto (Como mediremos o avanço com relação ao ODS 3 da ONU)
6. O Pedido ("The Ask" - Pedido de investimento simbólico de mentoria ou aceleração)
7. Fechamento Memorável (Slogan inspirador)

Adicione notas cênicas e indicações de entonação entre colchetes [ex: Fale com energia e convicção] e formate o texto em Markdown.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini route error:", err);
      res.status(500).json({ error: "Erro interno ao processar inteligência artificial: " + err.message });
    }
  });

  // Vite development or static file production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
