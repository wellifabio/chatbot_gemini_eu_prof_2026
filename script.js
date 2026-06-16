const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const apiKeyInput = document.getElementById('api-key');

// Recupera a chave se já foi digitada antes nesta sessão
if(sessionStorage.getItem('gemini_key')) {
    apiKeyInput.value = sessionStorage.getItem('gemini_key');
}

// Prompt de Sistema: Modifique aqui para parecer ainda mais com você!
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

    // Salva a chave temporariamente
    sessionStorage.setItem('gemini_key', apiKey);

    // Renderiza mensagem do usuário
    appendMessage(text, 'user-message');
    userInput.value = '';

    // Renderiza indicador de "digitando..."
    const typingDiv = appendMessage('Digitando código...', 'bot-message');

    try {
        // Chamada oficial da API do Gemini usando a rota de v1beta
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }],
                systemInstruction: {
                    parts: [{ text: SYSTEM_INSTRUCTION }]
                }
            })
        });

        const data = await response.json();
        typingDiv.remove(); // Remove o "digitando..."

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let reply = data.candidates[0].content.parts[0].text;
            appendMessage(reply, 'bot-message');
        } else {
            appendMessage("Ih, deu erro 500 na minha cabeça. Tenta de novo!", 'bot-message');
        }

    } catch (error) {
        console.error(error);
        typingDiv.remove();
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