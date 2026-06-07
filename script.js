/* =====================================================
   Dra. Árdala Ariane - Interactive Script
   ===================================================== */

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Theme toggle ----------
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('ardala-theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('ardala-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('ardala-theme', 'dark');
  }
});

// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
menuToggle.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', open);
});
navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navMobile.classList.remove('open');
  menuToggle.classList.remove('open');
}));

// ---------- Header on scroll ----------
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Gallery blur reveal + lightbox + filters ----------
document.querySelectorAll('.img-wrap.blurred').forEach(wrap => {
  const btn = wrap.querySelector('.reveal-btn');
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    wrap.classList.remove('blurred');
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
document.querySelectorAll('.img-wrap img').forEach(img => {
  img.addEventListener('click', () => {
    if (img.closest('.blurred')) return;
    lightboxImg.src = img.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });

document.querySelectorAll('.filter').forEach(f => {
  f.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
    f.classList.add('active');
    const cat = f.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.classList.toggle('hide', cat !== 'all' && item.dataset.cat !== cat);
    });
  });
});

// ---------- FAQ ----------
const faqData = [
  { q: 'Como funciona a primeira avaliação?', a: 'A primeira consulta é um momento dedicado a entender seus objetivos, sua anatomia e suas dúvidas. A indicação é sempre individualizada.' },
  { q: 'A indicação do procedimento é feita na consulta?', a: 'Sim. Cada indicação depende de uma avaliação médica completa e personalizada, considerando segurança, anatomia e expectativas.' },
  { q: 'Os resultados são iguais para todas as pacientes?', a: 'Não. Cada paciente possui características únicas, e os resultados são individuais e variam conforme cada caso.' },
  { q: 'Como saber qual procedimento é ideal para mim?', a: 'O caminho ideal é uma avaliação médica presencial. O quiz do site é apenas uma orientação inicial.' },
  { q: 'Onde fica o consultório?', a: 'Merit Offices & Mall — Av. Santos Dumont, 6740, sala 1417, Cocó, Fortaleza — CE.' },
  { q: 'Como agendar uma avaliação?', a: 'Pelo WhatsApp +55 85 99151-9816 ou clicando em qualquer botão "Agendar avaliação" no site.' },
  { q: 'O quiz substitui uma consulta?', a: 'Não. O quiz é apenas orientativo. A indicação de qualquer procedimento depende de avaliação médica individual.' },
  { q: 'Como funciona o acompanhamento?', a: 'O acompanhamento pós-operatório é contínuo, com orientações e retornos planejados conforme o procedimento realizado.' }
];
const faqEl = document.getElementById('faq');
faqData.forEach(({ q, a }) => {
  const item = document.createElement('div');
  item.className = 'faq-item';
  item.innerHTML = `<button class="faq-q"><span>${q}</span><span class="plus">+</span></button><div class="faq-a"><p>${a}</p></div>`;
  item.querySelector('.faq-q').addEventListener('click', () => item.classList.toggle('open'));
  faqEl.appendChild(item);
});

// ---------- Quiz ----------
const quizQuestions = [
  { q: 'Qual região você deseja melhorar?', opts: [
    { t: 'Mama', r: 'mama' },
    { t: 'Abdômen / cintura', r: 'corpo' },
    { t: 'Contorno corporal', r: 'corpo' },
    { t: 'Face', r: 'face' },
    { t: 'Rejuvenescimento', r: 'mini' },
    { t: 'Ainda não sei', r: 'cons' }
  ]},
  { q: 'Qual é o seu principal objetivo?', opts: [
    { t: 'Mais harmonia corporal', r: 'corpo' },
    { t: 'Melhorar autoestima', r: 'cons' },
    { t: 'Rejuvenescimento facial', r: 'mini' },
    { t: 'Melhorar flacidez', r: 'face' },
    { t: 'Realçar traços naturais', r: 'face' },
    { t: 'Corrigir algo que me incomoda', r: 'cons' }
  ]},
  { q: 'Você busca algo mais cirúrgico ou menos invasivo?', opts: [
    { t: 'Cirúrgico', r: 'mama' },
    { t: 'Minimamente invasivo', r: 'mini' },
    { t: 'Quero entender as opções', r: 'cons' },
    { t: 'Ainda não sei', r: 'cons' }
  ]},
  { q: 'Você prefere resultados mais discretos e naturais?', opts: [
    { t: 'Sim, naturalidade é essencial', r: 'face' },
    { t: 'Quero algo perceptível, mas elegante', r: 'mama' },
    { t: 'Quero conversar com a médica antes', r: 'cons' },
    { t: 'Ainda não tenho certeza', r: 'cons' }
  ]},
  { q: 'Você já passou por algum procedimento antes?', opts: [
    { t: 'Sim', r: 'cons' },
    { t: 'Não', r: 'cons' },
    { t: 'Prefiro informar na avaliação', r: 'cons' }
  ]},
  { q: 'Quando gostaria de realizar uma avaliação?', opts: [
    { t: 'O quanto antes', r: 'cons' },
    { t: 'Nas próximas semanas', r: 'cons' },
    { t: 'Estou apenas pesquisando', r: 'cons' },
    { t: 'Quero tirar dúvidas primeiro', r: 'cons' }
  ]}
];

const quizResults = {
  mama: { title: 'Seu perfil indica avaliação para procedimentos de mama.', text: 'Você demonstrou interesse em harmonia, proporção e naturalidade na região das mamas. A consulta médica poderá avaliar as melhores possibilidades para o seu caso.' },
  corpo: { title: 'Seu perfil indica avaliação para contorno corporal.', text: 'Seu objetivo parece estar relacionado à silhueta, proporção corporal e autoestima. Uma avaliação individual poderá indicar o melhor caminho com segurança.' },
  face: { title: 'Seu perfil indica avaliação para procedimentos faciais.', text: 'Você demonstrou interesse em rejuvenescimento, proporções faciais ou realce de traços naturais. A experiência em cirurgia craniofacial da Dra. Árdala contribui para um olhar refinado.' },
  mini: { title: 'Seu perfil indica opções minimamente invasivas.', text: 'Procedimentos como toxina botulínica, preenchimentos e fios de sustentação podem ser avaliados conforme seus objetivos e características individuais.' },
  cons: { title: 'Seu perfil indica uma consulta de orientação.', text: 'Você ainda está entendendo suas possibilidades. Uma avaliação médica é o melhor caminho para esclarecer dúvidas com segurança.' }
};

let quizStep = 0;
const quizScores = { mama: 0, corpo: 0, face: 0, mini: 0, cons: 0 };
const quizContent = document.getElementById('quizContent');
const quizBar = document.getElementById('quizBar');

function renderQuiz() {
  if (quizStep >= quizQuestions.length) return renderQuizResult();
  const cur = quizQuestions[quizStep];
  quizBar.style.width = ((quizStep) / quizQuestions.length * 100) + '%';
  quizContent.innerHTML = `
    <div class="quiz-q">
      <h3>${cur.q}</h3>
      <div class="quiz-options">
        ${cur.opts.map((o,i) => `<button data-r="${o.r}">${o.t}</button>`).join('')}
      </div>
      <div class="quiz-meta">
        <span>Pergunta ${quizStep + 1} de ${quizQuestions.length}</span>
        ${quizStep > 0 ? '<button id="quizBack" style="color:var(--azul-medico);font-weight:600">← Voltar</button>' : ''}
      </div>
    </div>`;
  quizContent.querySelectorAll('.quiz-options button').forEach(btn => {
    btn.addEventListener('click', () => {
      quizScores[btn.dataset.r] = (quizScores[btn.dataset.r] || 0) + 1;
      quizStep++;
      renderQuiz();
    });
  });
  const back = document.getElementById('quizBack');
  if (back) back.addEventListener('click', () => { quizStep = Math.max(0, quizStep - 1); renderQuiz(); });
}

function renderQuizResult() {
  quizBar.style.width = '100%';
  const top = Object.keys(quizScores).reduce((a, b) => quizScores[a] >= quizScores[b] ? a : b);
  const res = quizResults[top];
  const msg = encodeURIComponent(`Olá, Dra. Árdala. Fiz o quiz no site e meu resultado foi: ${res.title} Gostaria de receber uma avaliação inicial da equipe e agendar uma consulta.`);
  quizContent.innerHTML = `
    <div class="quiz-result quiz-q">
      <span class="eyebrow">Seu resultado</span>
      <h3>${res.title}</h3>
      <p class="muted">${res.text}</p>
      <ul>
        <li>${res.title.replace('Seu perfil indica ','').replace('.','')}</li>
        <li>Avaliação individualizada</li>
        <li>Consulta recomendada</li>
      </ul>
      <div class="hero-cta">
        <a class="btn btn-primary" href="https://wa.me/5585991519816?text=${msg}" target="_blank" rel="noopener">Receber avaliação inicial da equipe</a>
        <button class="btn btn-ghost" id="quizRestart">Refazer quiz</button>
      </div>
    </div>`;
  document.getElementById('quizRestart').addEventListener('click', () => {
    quizStep = 0;
    Object.keys(quizScores).forEach(k => quizScores[k] = 0);
    renderQuiz();
  });
}
renderQuiz();

// ---------- Chat IA ----------
const chatFab = document.getElementById('chatFab');
const chatPanel = document.getElementById('chatPanel');
const chatClose = document.getElementById('chatClose');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');

let chatId = localStorage.getItem('ardala-chat-id');
if (!chatId) {
  chatId = 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  localStorage.setItem('ardala-chat-id', chatId);
}

function addMsg(text, who = 'bot') {
  const el = document.createElement('div');
  el.className = 'chat-msg ' + who;
  el.textContent = text;
  chatBody.appendChild(el);
  chatBody.scrollTop = chatBody.scrollHeight;
  return el;
}

let chatInitialized = false;
function openChat() {
  chatPanel.classList.add('open');
  chatPanel.setAttribute('aria-hidden', 'false');
  if (!chatInitialized) {
    chatInitialized = true;
    addMsg('Olá! Sou a assistente virtual da Dra. Árdala. Posso te ajudar com dúvidas iniciais sobre procedimentos, localização e agendamento. Para avaliação médica, nossa equipe irá te orientar pelo WhatsApp.', 'bot');
  }
}
chatFab.addEventListener('click', openChat);
chatClose.addEventListener('click', () => chatPanel.classList.remove('open'));

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = chatInput.value.trim();
  if (!msg) return;
  addMsg(msg, 'user');
  chatInput.value = '';

  const typing = document.createElement('div');
  typing.className = 'chat-typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    const res = await fetch('https://memoken.com/webhook/artificial-inteligence/completion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, human_message: msg })
    });
    typing.remove();
    if (!res.ok) throw new Error('http ' + res.status);
    const data = await res.json().catch(() => ({}));
    const reply = data.response || data.message || data.reply || data.output || data.text || 'Recebi sua mensagem! Nossa equipe poderá te orientar com mais detalhes pelo WhatsApp.';
    addMsg(reply, 'bot');
  } catch (err) {
    typing.remove();
    addMsg('Não consegui responder agora. Você pode falar diretamente com nossa equipe pelo WhatsApp: +55 85 99151-9816.', 'bot');
  }
});
