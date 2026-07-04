// chatbot.js
// Handles the Modal UI, File logic, and intents

let uploadedFiles = [];
let currentIntent = '';

const chatModal = document.getElementById('chatModal');
const closeChatModalBtn = document.getElementById('closeChatModal');
const chatModalTitle = document.getElementById('chatModalTitle');
const chatHistory = document.getElementById('chatHistory');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');

// Open Modal when a tool card is clicked
document.querySelectorAll('.tool-card:not(.disabled)').forEach(card => {
    card.addEventListener('click', () => {
        currentIntent = card.getAttribute('data-intent');
        
        // Setup Modal state
        chatModal.classList.add('active');
        chatModalTitle.innerText = `${currentIntent.charAt(0).toUpperCase() + currentIntent.slice(1)} PDF`;
        
        // Reset Chat
        chatHistory.innerHTML = '';
        uploadedFiles = [];
        
        // Initial Bot Message
        setTimeout(() => {
            appendMessage(`I see you want to **${currentIntent}** your PDFs! Please drop your files here or click the upload icon to get started.`, 'bot');
        }, 300);
    });
});

// Close Modal
closeChatModalBtn.addEventListener('click', () => {
    chatModal.classList.remove('active');
});

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerHTML = `<p>${text}</p>`;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function appendDownloadLinks(links) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', 'bot');
    
    let html = `<p>Here are your processed files:</p><div style="margin-top: 8px;">`;
    const linksArray = Array.isArray(links) ? links : [links];
    
    linksArray.forEach(link => {
        html += `<a href="${link.url}" download="${link.filename}" class="btn btn-primary" style="margin-right: 8px; display: inline-block;">📥 Download ${link.filename}</a>`;
    });
    html += `</div>`;
    
    msgDiv.innerHTML = html;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function handleFiles(files) {
    for (const file of files) {
        if (file.type === 'application/pdf') {
            uploadedFiles.push(file);
        } else {
            appendMessage(`Sorry, "${file.name}" is not a PDF. Please only upload PDF files.`, 'bot');
        }
    }
    
    if (uploadedFiles.length > 0) {
        const fileNames = uploadedFiles.map(f => f.name).join(', ');
        appendMessage(`Received: <b>${fileNames}</b>.<br>Type "Go" or press the send button to process!`, 'bot');
        
        // Pre-fill input to allow quick processing
        chatInput.value = `Go ahead and ${currentIntent} it!`;
    }
}

// File Drag and Drop logic
const dropZone = document.getElementById('chatHistory');
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

// File Input logic
uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
    fileInput.value = ''; // reset
});

// Intent Execution
async function executeCommand() {
    if (uploadedFiles.length === 0) {
        appendMessage("Please upload some PDFs first by dragging them here or clicking the upload icon.", 'bot');
        return;
    }

    appendMessage("Processing your request... ⚙️", 'bot');

    const comingSoonIntents = [
        'compress', 'pdf to word', 'pdf to powerpoint', 'pdf to excel', 
        'word to pdf', 'edit', 'pdf to jpg', 'sign', 'watermark', 
        'repair', 'ocr', 'summarize', 'translate'
    ];

    try {
        if (currentIntent === 'merge') {
            const result = await window.pdfWorker.mergePDFs(uploadedFiles);
            appendDownloadLinks(result);
            uploadedFiles = []; // clear after processing
        } else if (currentIntent === 'split') {
            const result = await window.pdfWorker.splitPDF(uploadedFiles[0]);
            appendDownloadLinks(result);
        } else if (currentIntent === 'rotate') {
            const result = await window.pdfWorker.rotatePDF(uploadedFiles[0]);
            appendDownloadLinks(result);
        } else if (comingSoonIntents.includes(currentIntent)) {
            setTimeout(() => {
                appendMessage(`🚀 **${currentIntent.toUpperCase()} is Coming Soon!**<br>This is an advanced feature that requires a backend API integration (like CloudConvert or OpenAI). We will be enabling this in Phase 2!`, 'bot');
            }, 800);
        } else {
            appendMessage("I'm not sure how to do that yet.", 'bot');
        }
    } catch (err) {
        appendMessage(`❌ Error: ${err.message}`, 'bot');
    }
}

function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    appendMessage(text, 'user');
    chatInput.value = '';
    executeCommand();
}

sendBtn.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
