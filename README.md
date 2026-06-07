# Dra. Árdala Ariane — Site Institucional

Site premium, responsivo e estático para a cirurgiã plástica **Dra. Árdala Ariane** (Fortaleza/CE). Construído em **HTML + CSS + JavaScript puros**, sem dependências de build. Basta abrir o `index.html` em qualquer navegador.

## ✨ Recursos
- Design médico premium (glassmorphism, blur, cards translúcidos)
- **Modo claro e escuro** com persistência (localStorage)
- 100% **mobile-first** e responsivo
- Animações de scroll, microinterações e elementos flutuantes
- Galeria de resultados com **filtros**, **blur de privacidade** e **lightbox**
- **Quiz inteligente** de procedimentos com envio automático ao WhatsApp
- **Chat IA flutuante** integrado a webhook
- Botão flutuante de WhatsApp
- SEO básico + Open Graph
- Acessibilidade básica (alt, aria-labels, contrast, reduced motion)

## 📁 Estrutura
```
/
├── index.html
├── style.css
├── script.js
├── README.md
├── assets/
│   ├── images/         (fotos da Dra. e resultados)
│   ├── videos/         (vídeos institucionais)
│   ├── icons/          (ícones extras)
│   ├── characters/
│   ├── mockups/
│   ├── animations/
│   └── textures/
└── docs/
    └── instructions.md
```

## 🚀 Como abrir
1. Faça o download/clone do projeto.
2. Abra `index.html` diretamente no navegador, **ou**
3. Rode um servidor local (recomendado para vídeos e iframe do mapa):
   ```bash
   # Python 3
   python3 -m http.server 8080
   # ou Node
   npx serve .
   ```
4. Acesse `http://localhost:8080`.

## ✏️ Como editar

### Textos
Edite diretamente o `index.html`. Cada seção está separada por comentários `<!-- SECTION -->`.

### Imagens da médica
Substitua os arquivos em `assets/images/`:
- `dra-ardala-1.jpg` → foto principal (hero)
- `dra-ardala-2.jpg` → foto "Sobre"
Mantenha os mesmos nomes para não precisar mexer no HTML.

### Imagens de resultados
- Adicione/substitua arquivos em `assets/images/` (ex: `resultado-mama-1.jpg`).
- No `index.html`, dentro da seção `<!-- RESULTADOS -->`, duplique um `<figure class="gallery-item" ...>` e ajuste o `src` e a categoria `data-cat` (`mama`, `corpo`, `face`, `video`).
- Para esconder a imagem inicialmente atrás de um blur ético, mantenha a classe `blurred` no `<div class="img-wrap">`.

### Vídeos
Coloque arquivos `.mp4` em `assets/videos/` e referencie em `<video src="assets/videos/seu-video.mp4" controls>`.

### Perguntas do quiz
Edite o array `quizQuestions` em `script.js`. Cada pergunta tem `q` (texto) e `opts` (opções com `t` = texto e `r` = categoria de resultado: `mama`, `corpo`, `face`, `mini`, `cons`).
Edite `quizResults` para mudar os textos finais.

### FAQ
Edite o array `faqData` em `script.js`.

### Contato
Substitua nos seguintes locais:
- **WhatsApp**: procure por `5585991519816` e substitua pelo novo número (sempre com DDI+DDD).
- **Instagram**: procure por `draardalaariane` e troque.
- **E-mail**: procure por `ardalaariane@gmail.com`.
- **Endereço**: edite no `index.html` (seções "Localização" e "Footer") e atualize a URL do iframe do Google Maps.

### Webhook do chat IA
Em `script.js`, na função de envio do chat, troque a URL:
```js
const res = await fetch('https://memoken.com/webhook/artificial-inteligence/completion', ...)
```
O body enviado é:
```json
{ "chat_id": "<id-único-do-usuário>", "human_message": "<mensagem>" }
```
O `chat_id` é gerado automaticamente e salvo no `localStorage`. A resposta do bot é lida em `data.response | data.message | data.reply | data.output | data.text`.

## 🌐 Hospedagem

### GitHub Pages
1. Crie um repositório no GitHub e envie todos os arquivos.
2. Vá em **Settings → Pages**.
3. Em **Source** selecione a branch `main` e a pasta `/ (root)`.
4. O site ficará disponível em `https://seuusuario.github.io/seurepo/`.

### Vercel
1. Crie conta em [vercel.com](https://vercel.com).
2. Clique em **Add New → Project** e importe seu repositório (ou faça upload da pasta).
3. Framework Preset: **Other**. Build command: vazio. Output dir: `./`.
4. Deploy.

### Netlify
1. Em [app.netlify.com](https://app.netlify.com) → **Add new site → Deploy manually**.
2. Arraste a pasta inteira do projeto.
3. Pronto, link gerado automaticamente.

## ⚖️ Aviso ético
As informações do site têm finalidade informativa e **não substituem consulta médica individualizada**. Resultados são individuais e variam conforme as características de cada paciente.

---
© Dra. Árdala Ariane — CRM 11695-CE · RQE 12474
