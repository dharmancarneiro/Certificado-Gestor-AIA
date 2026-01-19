
import React, { useState, useMemo } from 'react';
import { AppStep, AppState } from './types';
import { QUIZ_QUESTIONS, SURVEY_QUESTIONS } from './constants';

// --- CONFIGURAÇÃO DE INTEGRAÇÃO ---
// URL OFICIAL GERADA PELO USUÁRIO:
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzMrhVovjD2zRs09oPNJ6DsUbC7GzoJAcKmse7jr1iBpFJ8b1HGsFE5V4aisMK6QcNvvA/exec"; 

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    step: 'welcome',
    userData: { nome: '', email: '', whatsapp: '' },
    quizAnswers: {},
    surveyAnswers: {},
    currentQuestionIndex: 0,
    currentSurveyIndex: 0,
  });

  const [identificationStep, setIdentificationStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const quizResults = useMemo(() => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (state.quizAnswers[q.id] === q.gabarito) score++;
    });
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    const approved = score >= 11;
    return { score, percentage, approved };
  }, [state.quizAnswers]);

  const sendDataToWebhook = async (finalState: AppState) => {
    if (!WEBHOOK_URL) return;

    const { score, percentage, approved } = quizResults;
    const s = finalState.surveyAnswers;

    // Mapeamento explícito para as colunas A até Q da planilha
    const payload = {
      timestamp: new Date().toLocaleString('pt-BR'),
      nome: finalState.userData.nome,
      email: finalState.userData.email,
      whatsapp: finalState.userData.whatsapp,
      status_teste: approved ? "APROVADO" : "REPROVADO",
      acertos: score,
      percentual: `${percentage}%`,
      p: {
        genero: s[1] || "-",
        idade: s[2] || "-",
        escolaridade: s[3] || "-",
        ocupacao: s[4] || "-",
        renda: s[5] || "-",
        tempo_conhece: s[6] || "-",
        aluno_anterior: s[7] || "-",
        nao_pode_faltar: s[8] || "-",
        resultados: s[9] || "-",
        melhorias: s[10] || "-"
      }
    };

    try {
      setIsSending(true);
      // Usando text/plain para evitar problemas de CORS com Google Apps Script
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      console.log("Integração concluída com sucesso!");
    } catch (e) {
      console.error("Erro na integração:", e);
    } finally {
      setIsSending(false);
    }
  };

  const handleNextIdentification = () => {
    if (!inputValue.trim()) return;
    if (identificationStep === 0) {
      setState(prev => ({ ...prev, userData: { ...prev.userData, nome: inputValue } }));
      setIdentificationStep(1);
      setInputValue('');
    } else if (identificationStep === 1) {
      setState(prev => ({ ...prev, userData: { ...prev.userData, email: inputValue } }));
      setIdentificationStep(2);
      setInputValue('');
    } else if (identificationStep === 2) {
      setState(prev => ({ ...prev, userData: { ...prev.userData, whatsapp: inputValue } }));
      setIdentificationStep(3);
    }
  };

  const handleQuizAnswer = (letter: string) => {
    const questionId = QUIZ_QUESTIONS[state.currentQuestionIndex].id;
    const newAnswers = { ...state.quizAnswers, [questionId]: letter };
    
    setState(prev => {
      const nextIdx = prev.currentQuestionIndex + 1;
      if (nextIdx < QUIZ_QUESTIONS.length) {
        return { ...prev, quizAnswers: newAnswers, currentQuestionIndex: nextIdx };
      } else {
        const newState = { ...prev, quizAnswers: newAnswers, step: 'result' as AppStep };
        let correct = 0;
        QUIZ_QUESTIONS.forEach(q => { if (newAnswers[q.id] === q.gabarito) correct++; });
        if (correct < 11) sendDataToWebhook(newState);
        return newState;
      }
    });
  };

  const handleSurveyAnswer = (answer: string) => {
    const surveyId = SURVEY_QUESTIONS[state.currentSurveyIndex].id;
    const newAnswers = { ...state.surveyAnswers, [surveyId]: answer };
    
    setState(prev => {
      const nextIdx = prev.currentSurveyIndex + 1;
      if (nextIdx < SURVEY_QUESTIONS.length) {
        return { ...prev, surveyAnswers: newAnswers, currentSurveyIndex: nextIdx };
      } else {
        const newState = { ...prev, surveyAnswers: newAnswers, step: 'final' as AppStep };
        sendDataToWebhook(newState);
        return newState;
      }
    });
  };

  const renderStep = () => {
    switch (state.step) {
      case 'welcome':
        return (
          <div className="text-center space-y-8 py-10">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">Certificado de Formação Gestor AIA - MEC</h1>
            <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium text-balance">Parabéns por chegar até aqui! Vamos iniciar o processo para conquistar seu certificado oficial.</p>
            <button onClick={() => setState(p => ({...p, step: 'identification'}))} className="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl shadow-2xl hover:bg-slate-800 transition transform hover:-translate-y-1 text-lg">INICIAR AGORA 🚀</button>
          </div>
        );

      case 'identification':
        return (
          <div className="max-w-md mx-auto space-y-8 py-6">
            {identificationStep < 3 ? (
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-slate-900">Identificação</h2>
                <div className="space-y-4">
                  <label className="block text-slate-500 font-bold uppercase text-xs tracking-widest">
                    {identificationStep === 0 && "1. Qual o seu nome completo?"}
                    {identificationStep === 1 && "2. Qual o e-mail usado na compra?"}
                    {identificationStep === 2 && "3. Qual o seu WhatsApp com DDD?"}
                  </label>
                  <input
                    type={identificationStep === 1 ? "email" : "text"}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleNextIdentification()}
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 focus:border-slate-900 outline-none text-lg transition-all"
                    placeholder="Sua resposta..."
                    autoFocus
                  />
                  <button onClick={handleNextIdentification} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg">Próximo Passo</button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-8 py-6">
                <div className="p-8 bg-green-50 rounded-3xl border-2 border-green-100">
                  <p className="text-green-600 font-black text-2xl">✅ DADOS REGISTRADOS!</p>
                </div>
                <div className="space-y-4 text-slate-600 text-lg">
                  <p className="font-black text-slate-900 uppercase tracking-tighter">📌 Regras do Teste:</p>
                  <p>• 18 questões de múltipla escolha<br/>• Mínimo de 11 acertos (60%)</p>
                </div>
                <button onClick={() => setState(p => ({...p, step: 'quiz'}))} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition shadow-xl text-xl">INICIAR TESTE AGORA</button>
              </div>
            )}
          </div>
        );

      case 'quiz':
        const currentQ = QUIZ_QUESTIONS[state.currentQuestionIndex];
        return (
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Questão</span>
                <p className="text-3xl font-black text-slate-900">{state.currentQuestionIndex + 1} <span className="text-slate-300 text-xl">/ 18</span></p>
              </div>
              <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-slate-900 transition-all duration-500" style={{ width: `${((state.currentQuestionIndex + 1) / 18) * 100}%` }} />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">{currentQ.enunciado}</h2>
            <div className="grid gap-4">
              {(['A', 'B', 'C', 'D'] as const).map(letter => (
                <button key={letter} onClick={() => handleQuizAnswer(letter)} className="group flex items-center p-5 text-left border-2 border-slate-100 rounded-2xl hover:border-slate-900 hover:bg-slate-50 transition-all duration-200">
                  <span className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-slate-100 group-hover:bg-slate-900 group-hover:text-white rounded-xl font-black mr-5 transition-colors text-lg">{letter}</span>
                  <span className="text-slate-700 font-semibold text-lg">{currentQ.alternativas[letter]}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'result':
        const { score, percentage, approved } = quizResults;
        return (
          <div className="max-w-xl mx-auto text-center space-y-10 py-6">
            {approved ? (
              <>
                <div className="space-y-4">
                  <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">🎉 APROVADO(A)!</h2>
                  <p className="text-lg text-slate-500 font-medium">Parabéns! Você atingiu a pontuação necessária.</p>
                </div>
                <div className="p-10 bg-slate-50 rounded-[3rem] border-2 border-slate-100 shadow-inner">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sua Nota</span>
                  <p className="text-8xl font-black text-slate-900 my-2">{percentage}%</p>
                  <p className="text-slate-500 font-bold text-lg">{score} de 18 acertos</p>
                </div>
                <button onClick={() => setState(p => ({...p, step: 'survey'}))} className="w-full py-6 bg-slate-900 text-white text-xl font-black rounded-[1.5rem] shadow-2xl hover:bg-slate-800 transition">INICIAR PESQUISA DE FEEDBACK 📝</button>
              </>
            ) : (
              <div className="space-y-8">
                <h2 className="text-4xl font-black text-slate-900">😔 NÃO FOI DESTA VEZ</h2>
                <p className="text-7xl font-black text-slate-900">{percentage}%</p>
                <p className="text-xl text-slate-500 max-w-sm mx-auto">Você acertou {score} questões. É necessário acertar pelo menos 11.<br/><br/>Revise o conteúdo e tente novamente!</p>
                <button onClick={() => window.location.reload()} className="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition shadow-xl">Tentar Novamente</button>
              </div>
            )}
          </div>
        );

      case 'survey':
        const currentS = SURVEY_QUESTIONS[state.currentSurveyIndex];
        return (
          <div className="max-w-2xl mx-auto space-y-10 py-6">
            <div className="text-center space-y-4">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Feedback {state.currentSurveyIndex + 1} de 10</span>
              <h2 className="text-3xl font-bold text-slate-800 leading-tight">{currentS.text}</h2>
            </div>
            {currentS.type === 'select' ? (
              <div className="grid gap-3">
                {currentS.options?.map(opt => (
                  <button key={opt.value} onClick={() => handleSurveyAnswer(opt.label)} className="group flex items-center p-5 text-left border-2 border-slate-100 rounded-2xl hover:border-slate-900 hover:bg-slate-50 transition-all">
                    <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-slate-100 group-hover:bg-slate-900 group-hover:text-white rounded-lg text-xs font-black mr-4">{opt.value}</span>
                    <span className="text-slate-700 font-bold text-lg">{opt.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <textarea 
                  className="w-full p-6 h-48 border-2 border-slate-100 rounded-3xl focus:border-slate-900 outline-none text-lg transition-all" 
                  placeholder="Escreva sua resposta detalhada..." 
                  value={inputValue} 
                  onChange={e => setInputValue(e.target.value)} 
                  autoFocus 
                />
                <button onClick={() => { if (!inputValue.trim()) return; handleSurveyAnswer(inputValue); setInputValue(''); }} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition text-lg shadow-lg">Confirmar Resposta</button>
              </div>
            )}
          </div>
        );

      case 'final':
        const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfuuOi-TJ0mEoSc0XLvj7nPnlF_TnjdwZt1x5im_YBqdYuU8w/viewform?usp=send_form";
        return (
          <div className="max-w-3xl mx-auto space-y-12 py-6 text-center animate-in slide-in-from-bottom-10 duration-700">
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">CONCLUÍDO! 🎊</h2>
              <p className="text-xl text-slate-500 font-medium">Suas respostas foram registradas e sincronizadas com nossa base de dados.</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 space-y-10">
              <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] space-y-8 shadow-inner relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-3xl font-black uppercase tracking-widest border-b border-slate-800 pb-5">🎓 Solicitar Certificado</h3>
                  <p className="text-lg text-slate-400 leading-relaxed mb-8">Agora você deve preencher o formulário oficial de emissão para gerar seu documento:</p>
                  <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-6 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all transform hover:scale-[1.03] shadow-2xl uppercase tracking-widest text-xl">SOLICITAR CERTIFICADO AGORA</a>
                  <div className="pt-8 border-t border-slate-800 mt-8">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Importante</p>
                    <p className="text-slate-300">O certificado será enviado em até 30 dias para: <br/><strong className="text-white text-xl underline">{state.userData.email}</strong></p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <p className="text-2xl font-black text-slate-800 italic">"Produtividade e tecnologia caminham juntas."</p>
                <p className="font-bold text-slate-400 tracking-[0.3em] uppercase text-[10px]">— Christian Barbosa & Equipe AIA</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] selection:bg-slate-900 selection:text-white">
      <header className="gradient-bg py-8 px-6 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-slate-900 text-2xl shadow-inner">AIA</div>
            <div className="h-10 w-[2px] bg-slate-700 mx-2 hidden md:block"></div>
            <h1 className="text-white font-black tracking-widest text-sm md:text-lg uppercase">Certificado Gestor AIA - MEC</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-5xl bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] p-8 md:p-16 border border-slate-50 relative overflow-hidden">
           {isSending && (
             <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin mb-6"></div>
                <p className="text-slate-900 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Sincronizando com a planilha oficial...</p>
             </div>
           )}
           {renderStep()}
        </div>
      </main>

      <footer className="py-10 text-center text-slate-300 text-[10px] uppercase font-black tracking-[0.5em] border-t border-slate-100/50">
        &copy; {new Date().getFullYear()} Christian Barbosa & bull; Formação Gestor AIA
      </footer>
    </div>
  );
};

export default App;
