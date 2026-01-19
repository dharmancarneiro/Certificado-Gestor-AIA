
import { Question, SurveyQuestion } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    enunciado: "O que é uma LLM (Large Language Model)?",
    alternativas: {
      A: "Um banco de dados relacional",
      B: "Um tipo de servidor físico",
      C: "Um aplicativo de notas",
      D: "Um modelo de linguagem grande que gera texto e entende contexto (IA de linguagem)"
    },
    gabarito: "D"
  },
  {
    id: 2,
    enunciado: "Para que serve Engenharia de Prompt?",
    alternativas: {
      A: "Para escrever instruções claras e estruturadas que guiam um modelo de IA a gerar respostas melhores",
      B: "Para desenhar interfaces gráficas",
      C: "Para compactar arquivos de áudio",
      D: "Para criar certificados automáticos"
    },
    gabarito: "A"
  },
  {
    id: 3,
    enunciado: "Na aula de Engenharia de Prompt (módulo básico), qual é uma dica prática para obter respostas melhores?",
    alternativas: {
      A: "Pedir respostas sem contexto e bem vagas",
      B: "Colocar só emojis no prompt",
      C: "Dar contexto claro e exemplos curtos para o modelo seguir",
      D: "Usar o mesmo prompt para tudo sem adaptar"
    },
    gabarito: "C"
  },
  {
    id: 4,
    enunciado: "Para que serve Engenharia de Prompt Avançada (Parte 2)?",
    alternativas: {
      A: "Para criar backups locais do modelo",
      B: "Para refinar prompts com técnicas avançadas (templates, chain-of-thought, validação e avaliação de saídas) e obter respostas mais precisas/seguras",
      C: "Para traduzir automaticamente sites inteiros",
      D: "Para trocar a voz do assistente só por comandos"
    },
    gabarito: "B"
  },
  {
    id: 5,
    enunciado: "O que é o N8N?",
    alternativas: {
      A: "Um editor de vídeo",
      B: "Um plugin de navegador",
      C: "Um serviço de hospedagem",
      D: "Uma ferramenta para criar automações com blocos visuais (no-code/low-code)"
    },
    gabarito: "D"
  },
  {
    id: 6,
    enunciado: "Para que serve o Make?",
    alternativas: {
      A: "Para montar automações e integrar aplicações sem programar (orquestração visual)",
      B: "Para editar fotos",
      C: "Para enviar e-mail marketing apenas",
      D: "Para gerenciar contas bancárias"
    },
    gabarito: "A"
  },
  {
    id: 7,
    enunciado: "Qual plataforma é ensinada na Formação para aprender No-Code?",
    alternativas: {
      A: "Photoshop",
      B: "Excel avançado",
      C: "Bubble (plataforma no-code usada nas aulas)",
      D: "Visual Studio Code"
    },
    gabarito: "C"
  },
  {
    id: 8,
    enunciado: "O que é Ninja Pages no contexto do curso?",
    alternativas: {
      A: "Uma ferramenta de edição de vídeo",
      B: "Um plugin de navegador",
      C: "Um modelo de e-mail",
      D: "Uma solução do Christian para criar sites com suporte de IA"
    },
    gabarito: "D"
  },
  {
    id: 9,
    enunciado: "O que Christian recomenda ao construir um site com ferramentas do curso?",
    alternativas: {
      A: "Utilizar ferramentas (ex.: Ninja Pages) e, se precisar, subir no GitHub/Vercel para deploy rápido",
      B: "Nunca usar GitHub/Vercel",
      C: "Fazer tudo manualmente sem ajuda de IA",
      D: "Não conectar domínio"
    },
    gabarito: "A"
  },
  {
    id: 10,
    enunciado: "O que é um SaaS?",
    alternativas: {
      A: "Um dispositivo de hardware",
      B: "Um tipo de certificado digital",
      C: "Software entregue como serviço pela internet (assinatura), que os clientes usam sem instalar localmente",
      D: "Um formato de imagem"
    },
    gabarito: "C"
  },
  {
    id: 11,
    enunciado: "O que o Christian recomenda para validar uma ideia antes de escalar?",
    alternativas: {
      A: "Construir todas as funcionalidades antes de testar",
      B: "Fazer um MVP simples, validar com clientes e iterar",
      C: "Guardar a ideia por 1 ano",
      D: "Cobrar caro antes de testar"
    },
    gabarito: "B"
  },
  {
    id: 12,
    enunciado: "O que o Christian sugere como modelo de parceria para entrar em sociedades com ele?",
    alternativas: {
      A: "Ter só uma ideia sem produto",
      B: "Enviar um pitch por WhatsApp sem MVP",
      C: "Pedir avaliação antes de começar qualquer venda",
      D: "Ter um MVP e 50–100 clientes pagantes para avaliação de sociedade"
    },
    gabarito: "D"
  },
  {
    id: 13,
    enunciado: "Qual é a recomendação prática para quem quer ganhar dinheiro rápido após o curso?",
    alternativas: {
      A: "Prestar serviços de automação e implantação para clientes (implantação + mensalidade)",
      B: "Fazer posts virais e esperar receita passiva",
      C: "Vender apenas cursos de terceiros",
      D: "Esperar oportunidades aparecerem"
    },
    gabarito: "A"
  },
  {
    id: 14,
    enunciado: "Segundo o Christian, qual é um bom primeiro cliente para testar um agente de atendimento?",
    alternativas: {
      A: "Empresas grandes internacionais só",
      B: "Apenas amigos e familiares",
      C: "Pequenos negócios locais (ex.: clínicas, assistência técnica) para validar o fluxo e cobrar mensalidade",
      D: "Empresas sem histórico de atendimento digital"
    },
    gabarito: "C"
  },
  {
    id: 15,
    enunciado: "Segundo o Christian, qual trabalho ajuda muito para vender automação a empresas?",
    alternativas: {
      A: "Pedir referências sem mostrar resultado",
      B: "Enviar propostas genéricas por e-mail",
      C: "Focar somente em posts no Instagram",
      D: "Ir até a operação do cliente, ver o processo real (ex.: histórico de atendimento) e mapear a dor"
    },
    gabarito: "D"
  },
  {
    id: 16,
    enunciado: "Qual a dica do Christian sobre escolher modelos de linguagem para agentes (custos)?",
    alternativas: {
      A: "Usar sempre o modelo mais caro",
      B: "Testar modelos mais econômicos (ex.: versões \"mini\") e escalar conforme necessidade",
      C: "Nunca medir o consumo de tokens",
      D: "Chamar a API sem limites"
    },
    gabarito: "B"
  },
  {
    id: 17,
    enunciado: "Para começar um projeto com baixo custo, qual dica prática o Christian dá?",
    alternativas: {
      A: "Assinar todas as ferramentas caras já no começo",
      B: "Comprar servidores caros imediatamente",
      C: "Contratar equipe grande no primeiro mês",
      D: "Testar com ferramentas acessíveis, usar modelos econômicos e escalar conforme resultado"
    },
    gabarito: "D"
  },
  {
    id: 18,
    enunciado: "Qual é a vantagem de criar um e-book prático conforme o curso (Mão na Massa)?",
    alternativas: {
      A: "Não precisa divulgação",
      B: "É caro produzir e não vende bem",
      C: "Serve como produto simples para validar audiência e iniciar funil de vendas",
      D: "Substitui todo o site da empresa"
    },
    gabarito: "C"
  }
];

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 1,
    text: "Com qual gênero você se identifica?",
    type: "select",
    options: [
      { label: "Masculino", value: "A" },
      { label: "Feminino", value: "B" },
      { label: "Prefiro não informar", value: "C" },
      { label: "Outro", value: "D" }
    ]
  },
  {
    id: 2,
    text: "Qual é a sua faixa etária?",
    type: "select",
    options: [
      { label: "Menos de 18 anos", value: "A" },
      { label: "18 a 25 anos", value: "B" },
      { label: "26 a 35 anos", value: "C" },
      { label: "36 a 45 anos", value: "D" },
      { label: "46 a 55 anos", value: "E" },
      { label: "Acima de 55 anos", value: "F" }
    ]
  },
  {
    id: 3,
    text: "Qual é o seu nível de escolaridade?",
    type: "select",
    options: [
      { label: "Ensino Fundamental completo", value: "A" },
      { label: "Ensino Médio completo", value: "B" },
      { label: "Ensino Superior incompleto", value: "C" },
      { label: "Ensino Superior completo", value: "D" }
    ]
  },
  {
    id: 4,
    text: "Qual é a sua ocupação atual?",
    type: "select",
    options: [
      { label: "Funcionário CLT", value: "A" },
      { label: "Autônomo/PJ", value: "B" },
      { label: "Funcionário público", value: "C" },
      { label: "Empresário", value: "D" },
      { label: "Empreendedor", value: "E" },
      { label: "Profissional liberal", value: "F" },
      { label: "Outro", value: "G" }
    ]
  },
  {
    id: 5,
    text: "Em qual faixa de renda mensal você se encontra?",
    type: "select",
    options: [
      { label: "Até 1 salário mínimo", value: "A" },
      { label: "De 2 a 5 salários mínimos", value: "B" },
      { label: "De 6 a 10 salários mínimos", value: "C" },
      { label: "Acima de 10 salários mínimos", value: "D" }
    ]
  },
  {
    id: 6,
    text: "Há quanto tempo você conhece o Christian?",
    type: "select",
    options: [
      { label: "Menos de 3 meses", value: "A" },
      { label: "De 3 a 6 meses", value: "B" },
      { label: "De 6 meses a 1 ano", value: "C" },
      { label: "Mais de 1 ano", value: "D" },
      { label: "Sou das antigas (2 anos ou mais)", value: "E" }
    ]
  },
  {
    id: 7,
    text: "Você já era aluno do Christian antes de entrar na Formação Gestor AIA?",
    type: "select",
    options: [
      { label: "Não, este é o primeiro programa que eu entrei", value: "A" },
      { label: "Sim, fiz o OMAT", value: "B" },
      { label: "Sim, fiz o MP40", value: "C" },
      { label: "Sim, fiz o Apenas Comece", value: "D" },
      { label: "Sim, fiz outros cursos com o Chris", value: "E" }
    ]
  },
  {
    id: 8,
    text: "O que não pode faltar na Formação Gestor AIA?",
    type: "text"
  },
  {
    id: 9,
    text: "Quais resultados você teve com a Formação Gestor AIA?",
    type: "text"
  },
  {
    id: 10,
    text: "O que podemos melhorar na Formação Gestor AIA?",
    type: "text"
  }
];
