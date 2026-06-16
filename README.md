# Chatbot wellifabio Gemini
Chatbot que responde alunos no meu lugar

Boa tarde, quero que me ajude a criar um chatbot(html, css e JavaScript) que simule ser eu, através da API do GEMINI, e fique hospedado no git pages

## Pront para o Gemini
- wellifabio: Boa tarde! Excelente projeto. Criar um chatbot que simula você usando a API do Gemini e hospedá-lo gratuitamente no GitHub Pages é uma ótima forma de construir um portfólio interativo.

- Gemini:Para que o chatbot realmente "fale como você", o ponto mais importante é o Prompt de Sistema (as instruções que definem a personalidade, histórico e tom de voz da IA).

- Gemini: Antes de passarmos para o código, para que eu possa estruturar o projeto exatamente do seu jeito, preciso te fazer uma pergunta:

- Gemini: Qual é o objetivo principal desse chatbot (ex: responder recrutadores sobre seu currículo, interagir com amigos, portfólio geral) e quais são 3 traços marcantes da sua personalidade que ele deve simular (ex: formal, bem-humorado, técnico, direto)?

- Wellifabio: Sou um professor de ensino médio técnico de desenvolvimento de software, gostaria de atender meus alunos com dúvidas sobre lógica de programação, dev mobile flutter, banco de dados relacional, sou bem-humorado

- Gemini: Sensacional, professor! Unir o útil ao agradável: automatizar o suporte aos alunos com uma IA que mantém o seu bom humor vai poupar sua voz e garantir que eles tenham respostas até de madrugada.

- Gemini: Como o seu objetivo é rodar isso diretamente no GitHub Pages (que é um servidor estático), nós faremos as requisições da API do Gemini diretamente pelo JavaScript.

### Estrutura do Projeto
Crie uma pasta no seu computador e mude o nome dos arquivos para:

```
index.html
style.css
script.js
```

Abaixo está o código completo e pronto para usar.

1. Interface (index.html)
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot do Prof</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">
            <h2>🤖 Prof. AI (Plantão de Dúvidas)</h2>
            <input type="password" id="api-key" placeholder="Cole sua Gemini API Key aqui...">
        </div>
        
        <div class="chat-box" id="chat-box">
            <div class="message bot-message">
                Fala, dev! Beleza? Sou o clone de IA do seu professor. Manda ver na dúvida de Lógica, Flutter ou Banco de Dados (só não vale pedir nota)! 😉
            </div>
        </div>
        
        <div class="chat-input-area">
            <input type="text" id="user-input" placeholder="Digite sua dúvida aqui...">
            <button id="send-btn">Enviar</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```
2. Estilo (style.css)
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #121214;
    color: #e1e1e6;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.chat-container {
    width: 100%;
    max-width: 600px;
    height: 85vh;
    background-color: #202024;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.chat-header {
    background-color: #00875f;
    padding: 15px;
    text-align: center;
}

.chat-header h2 {
    font-size: 1.2rem;
    margin-bottom: 8px;
}

.chat-header input {
    width: 80%;
    padding: 6px;
    border: none;
    border-radius: 4px;
    background: #121214;
    color: #fff;
    text-align: center;
}

.chat-box {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.message {
    padding: 10px 15px;
    border-radius: 8px;
    max-width: 80%;
    line-height: 1.4;
    word-wrap: break-word;
}

.bot-message {
    background-color: #29292e;
    align-self: flex-start;
    border-bottom-left-radius: 0;
}

.user-message {
    background-color: #00875f;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 0;
}

.chat-input-area {
    display: flex;
    padding: 15px;
    background-color: #121214;
    gap: 10px;
}

#user-input {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 4px;
    background-color: #202024;
    color: white;
}

#send-btn {
    padding: 0 20px;
    background-color: #00875f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

#send-btn:hover {
    background-color: #00b37e;
}
```
3. Lógica (script.js)
```javascript
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const apiKeyInput = document.getElementById('api-key');

// Recupera a chave se já foi digitada antes nesta sessão
if (sessionStorage.getItem('gemini_key')) {
    apiKeyInput.value = sessionStorage.getItem('gemini_key');
}

// Prompt de Sistema: Define a personalidade de professor do bot
const SYSTEM_INSTRUCTION = `
Você é o clone digital de um professor de Ensino Médio Técnico de Desenvolvimento de Software.
Seu objetivo é ajudar alunos com dúvidas sobre: Lógica de Programação, Desenvolvimento Mobile com Flutter e Banco de Dados Relacional.

Diretrizes de personalidade:
1. Seja MUITO bem-humorado, use piadas leves de programador, referências a bugs e café.
2. Use uma linguagem jovem, porém profissional (gírias de dev como "commitar", "dar build", "deploy", "quebrou tudo").
3. Quando explicarem um erro de lógica, brinque que "o computador só faz o que você manda, não o que você quer".
4. Dê exemplos práticos e fáceis de entender (use analogias do dia a dia de alunos).
5. Se perguntarem algo fora desses tópicos técnicos (como notas ou matérias de outras aulas), brinque dizendo que seu banco de dados não tem essa tabela ou que isso é "fase beta".
`;

async function sendMessage() {
    const text = userInput.value.trim();
    const apiKey = apiKeyInput.value.trim();

    if (!text) return;
    if (!apiKey) {
        alert("Por favor, insira sua Gemini API Key no topo da tela!");
        return;
    }

    // Salva a chave temporariamente na sessão do navegador
    sessionStorage.setItem('gemini_key', apiKey);

    // Renderiza mensagem do usuário na tela
    appendMessage(text, 'user-message');
    userInput.value = '';

    // Renderiza indicador de "digitando..."
    const typingDiv = appendMessage('Compilando resposta...', 'bot-message');

    // Consolidamos a instrução com a dúvida em um único bloco de texto seguro
    const promptConsolidado = `${SYSTEM_INSTRUCTION}\n\n[CONTEXTO: O texto abaixo é a dúvida real do aluno. Responda seguindo estritamente as diretrizes de personalidade acima]\nAluno perguntou: ${text}`;

    try {
        // Modelo atualizado gemini-2.5-flash na rota estável v1
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: promptConsolidado } // CORRIGIDO: Agora bate com o nome da variável acima!
                        ]
                    }
                ]
            })
        });

        const data = await response.json();
        typingDiv.remove(); // Remove o status de carregamento

        // Se a API do Google retornar algum erro estruturado
        if (data.error) {
            appendMessage(`⚠️ Erro do Google: ${data.error.message} (Código ${data.error.code})`, 'bot-message');
            console.log("Erro retornado da API:", data.error);
            return;
        }

        // Verifica se a resposta contém o texto gerado
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let reply = data.candidates[0].content.parts[0].text;
            appendMessage(reply, 'bot-message');
        } else {
            appendMessage("Ué, o robô não gerou uma resposta válida. Verifique o console.", 'bot-message');
            console.log("Estrutura recebida incomum:", data);
        }

    } catch (error) {
        console.error(error);
        if (typingDiv) typingDiv.remove();
        appendMessage("Ih, caiu a conexão aqui. Verifique sua API Key ou sua internet!", 'bot-message');
    }
}

function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageDiv;
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
```
### Como colocar no GitHub Pages
- Crie um repositório público no seu GitHub (ex: plantao-profe-ai).
- Suba esses 3 arquivos (index.html, style.css, script.js) para a branch principal (main ou master).
- No seu repositório do GitHub, vá em Settings (Configurações) > Pages (na barra lateral esquerda).
- Em Build and deployment, selecione a branch main (ou master) e a pasta / (root).
- Clique em Save.
- Aguarde cerca de 1 a 2 minutos e o GitHub gerará um link público (geralmente [https://seu-usuario.github.io/nome-do-repositorio/](https://seu-usuario.github.io/nome-do-repositorio/)).
- Pronto! Basta passar o link para os alunos, orientá-los a gerar uma chave gratuita no Google AI Studio (caso você não queira deixar a sua ativa por lá) e eles já podem tirar dúvidas com o seu "clone".
