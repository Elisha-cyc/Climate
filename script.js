const quizContainer = document.createElement('div');
quizContainer.id = 'climate-quiz-container';
quizContainer.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 600px;
    background: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    z-index: 1000;
    font-family: Arial, sans-serif;
    display: none;
`;

const quizHeader = document.createElement('h2');
quizHeader.textContent = 'Climate Change in Ghana Quiz';
quizHeader.style.textAlign = 'center';
quizHeader.style.color = '#2c3e50';
quizContainer.appendChild(quizHeader);

const quizContent = document.createElement('div');
quizContent.id = 'quiz-content';
quizContainer.appendChild(quizContent);

const navButtons = document.createElement('div');
navButtons.style.display = 'flex';
navButtons.style.justifyContent = 'space-between';
navButtons.style.marginTop = '20px';

const prevButton = document.createElement('button');
prevButton.textContent = 'Previous';
prevButton.style.padding = '8px 15px';
prevButton.style.backgroundColor = '#95a5a6';
prevButton.style.color = 'white';
prevButton.style.border = 'none';
prevButton.style.borderRadius = '5px';
prevButton.style.cursor = 'pointer';
prevButton.addEventListener('mouseover', () => prevButton.style.backgroundColor = '#7f8c8d');
prevButton.addEventListener('mouseout', () => prevButton.style.backgroundColor = '#95a5a6');

const nextButton = document.createElement('button');
nextButton.textContent = 'Next';
nextButton.style.padding = '8px 15px';
nextButton.style.backgroundColor = '#27ae60';
nextButton.style.color = 'white';
nextButton.style.border = 'none';
nextButton.style.borderRadius = '5px';
nextButton.style.cursor = 'pointer';
nextButton.addEventListener('mouseover', () => nextButton.style.backgroundColor = '#219653');
nextButton.addEventListener('mouseout', () => nextButton.style.backgroundColor = '#27ae60');

const submitButton = document.createElement('button');
submitButton.textContent = 'Submit';
submitButton.style.padding = '8px 15px';
submitButton.style.backgroundColor = '#e74c3c';
submitButton.style.color = 'white';
submitButton.style.border = 'none';
submitButton.style.borderRadius = '5px';
submitButton.style.cursor = 'pointer';
submitButton.style.display = 'none';
submitButton.addEventListener('mouseover', () => submitButton.style.backgroundColor = '#c0392b');
submitButton.addEventListener('mouseout', () => submitButton.style.backgroundColor = '#e74c3c');

navButtons.appendChild(prevButton);
navButtons.appendChild(nextButton);
navButtons.appendChild(submitButton);
quizContainer.appendChild(navButtons);

const overlay = document.createElement('div');
overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 999;
    display: none;
`;

document.body.appendChild(overlay);
document.body.appendChild(quizContainer);

const quizQuestions = [
    {
        question: "1. What is the primary cause of climate change in Ghana?",
        options: [
            "Natural weather cycles",
            "Human activities like deforestation and burning fossil fuels",
            "Volcanic activity",
            "Changes in Earth's orbit"
        ],
        correctAnswer: 1,
        explanation: "While natural factors exist, human activities like deforestation (Ghana has one of the highest deforestation rates in Africa) and fossil fuel use are the primary drivers of climate change in Ghana."
    },
    {
        question: "2. Which sector in Ghana is most vulnerable to climate change?",
        options: [
            "Banking and finance",
            "Agriculture",
            "Information technology",
            "Tourism"
        ],
        correctAnswer: 1,
        explanation: "Agriculture, which employs about 50% of Ghana's workforce, is highly vulnerable due to dependence on rainfall patterns that are becoming more unpredictable."
    },
    {
        question: "3. How has climate change affected coastal areas in Ghana?",
        options: [
            "Increased beach tourism",
            "Sea level rise and coastal erosion",
            "Improved fishing conditions",
            "No significant impact"
        ],
        correctAnswer: 1,
        explanation: "Coastal erosion and sea level rise threaten communities, with places like Keta having lost significant land to the sea in recent decades."
    },
    {
        question: "4. What is Ghana's main source of greenhouse gas emissions?",
        options: [
            "Energy production",
            "Transportation",
            "Land use change and forestry",
            "Industrial processes"
        ],
        correctAnswer: 2,
        explanation: "Deforestation and land use changes account for about 60% of Ghana's emissions, followed by energy and agriculture."
    },
    {
        question: "5. Which climate change adaptation strategy is Ghana implementing?",
        options: [
            "Building sea defense walls",
            "Promoting drought-resistant crops",
            "Developing early warning systems",
            "All of the above"
        ],
        correctAnswer: 3,
        explanation: "Ghana is pursuing multiple adaptation strategies including coastal protection, climate-smart agriculture, and improved forecasting systems."
    }
];

let currentQuestion = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);
let score = 0;

function displayQuestion(index) {
    const question = quizQuestions[index];
    quizContent.innerHTML = '';

    const questionElement = document.createElement('div');
    questionElement.textContent = question.question;
    questionElement.style.marginBottom = '15px';
    questionElement.style.fontWeight = 'bold';
    questionElement.style.fontSize = '18px';
    quizContent.appendChild(questionElement);

    question.options.forEach((option, i) => {
        const optionContainer = document.createElement('div');
        optionContainer.style.margin = '10px 0';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz-option';
        radio.value = i;
        radio.id = `option-${i}`;
        if (userAnswers[index] === i) {
            radio.checked = true;
        }
        radio.addEventListener('change', () => {
            userAnswers[index] = i;
        });

        const label = document.createElement('label');
        label.htmlFor = `option-${i}`;
        label.textContent = option;
        label.style.marginLeft = '8px';
        label.style.cursor = 'pointer';

        optionContainer.appendChild(radio);
        optionContainer.appendChild(label);
        quizContent.appendChild(optionContainer);
    });

    prevButton.style.display = index === 0 ? 'none' : 'block';
    nextButton.style.display = index === quizQuestions.length - 1 ? 'none' : 'block';
    submitButton.style.display = index === quizQuestions.length - 1 ? 'block' : 'none';
}

prevButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion(currentQuestion);
    }
});

nextButton.addEventListener('click', () => {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion(currentQuestion);
    }
});

function createBalloons(container) {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.style.position = 'absolute';
        balloon.style.width = '30px';
        balloon.style.height = '40px';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.borderRadius = '50%';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.top = '100%';
        balloon.style.opacity = '0.7';
        
        const tail = document.createElement('div');
        tail.style.position = 'absolute';
        tail.style.width = '2px';
        tail.style.height = '20px';
        tail.style.backgroundColor = '#cccccc';
        tail.style.bottom = '-20px';
        tail.style.left = '14px';
        balloon.appendChild(tail);
        
        container.appendChild(balloon);
        
        const animationDuration = 5 + Math.random() * 5;
        balloon.style.animation = `floatUp ${animationDuration}s linear forwards`;
        
        const keyframes = `
            @keyframes floatUp {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.7;
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, -100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.innerHTML = keyframes;
        document.head.appendChild(styleElement);
    }
}

function createConfetti(container) {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '0.8';
        
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.transform = 'rotate(45deg)';
        }
        
        container.appendChild(confetti);
        
        const animationDuration = 3 + Math.random() * 4;
        confetti.style.animation = `fallDown ${animationDuration}s linear forwards`;
        
        const keyframes = `
            @keyframes fallDown {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(${Math.random() * 200 - 100}px, 100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.innerHTML = keyframes;
        document.head.appendChild(styleElement);
    }
}

function showScorePopup(score, total) {
    const scorePopup = document.createElement('div');
    scorePopup.id = 'score-popup';
    scorePopup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        max-width: 500px;
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 0 30px rgba(0,0,0,0.3);
        z-index: 1001;
        text-align: center;
        font-family: Arial, sans-serif;
        overflow: hidden;
    `;
    
    const percentage = Math.round((score / total) * 100);
    
    let message = '';
    let emoji = '';
    if (percentage >= 80) {
        message = 'Excellent! You know a lot about climate change in Ghana!';
        emoji = '🎉';
    } else if (percentage >= 60) {
        message = 'Good job! You understand climate change in Ghana well.';
        emoji = '👍';
    } else if (percentage >= 40) {
        message = 'Not bad! You know some things about climate change in Ghana.';
        emoji = '😊';
    } else {
        message = 'Keep learning! Climate change is an important topic for Ghana.';
        emoji = '📚';
    }
    
    scorePopup.innerHTML = `
        <h2 style="color: #2c3e50; margin-bottom: 20px;">Quiz Completed!</h2>
        <div style="font-size: 72px; margin: 20px 0;">${emoji}</div>
        <p style="font-size: 18px; margin-bottom: 10px;">${message}</p>
        <div style="font-size: 36px; font-weight: bold; color: #e74c3c; margin: 20px 0;">
            ${score} / ${total}
        </div>
        <div style="font-size: 24px; margin-bottom: 20px;">
            ${percentage}%
        </div>
        <button id="close-score-popup" style="
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        ">Close</button>
    `;
    
    const animationContainer = document.createElement('div');
    animationContainer.style.position = 'absolute';
    animationContainer.style.top = '0';
    animationContainer.style.left = '0';
    animationContainer.style.width = '100%';
    animationContainer.style.height = '100%';
    animationContainer.style.pointerEvents = 'none';
    animationContainer.style.overflow = 'hidden';
    animationContainer.style.zIndex = '-1';
    scorePopup.appendChild(animationContainer);
    
    createBalloons(animationContainer);
    createConfetti(animationContainer);
    
    scorePopup.querySelector('#close-score-popup').addEventListener('click', () => {
        document.body.removeChild(scorePopup);
        quizContainer.style.display = 'none';
        overlay.style.display = 'none';
    });
    
    document.body.appendChild(scorePopup);
}

submitButton.addEventListener('click', () => {
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correctAnswer) {
            score++;
        }
    });
    
    quizContainer.style.display = 'none';
    
    showScorePopup(score, quizQuestions.length);
});

function showClimateQuiz() {
    currentQuestion = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    score = 0;
    
    displayQuestion(0);
    quizContainer.style.display = 'block';
    overlay.style.display = 'block';
    
    const existingPopup = document.getElementById('score-popup');
    if (existingPopup) {
        document.body.removeChild(existingPopup);
    }
}

const launchButton = document.createElement('button');
launchButton.textContent = 'Take Climate Change Quiz';
launchButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 100;
`;
launchButton.addEventListener('click', showClimateQuiz);
document.body.appendChild(launchButton);

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });


    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

 document.addEventListener('DOMContentLoaded', function() {
const chatMessages = document.getElementById('chat-messages');

    const climateData = {
    years: [1990, 1995, 2000, 2005, 2010, 2015, 2020],
    temperature: [26.5, 26.8, 27.1, 27.4, 27.8, 28.2, 28.6],
    rainfall: [1200, 1180, 1150, 1120, 1080, 1050, 1020],
    co2Emissions: [5.2, 6.1, 7.0, 8.5, 9.8, 11.2, 12.6],
    deforestation: [8.1, 7.5, 6.8, 6.0, 5.2, 4.5, 3.9]
    };

    const messages = [
    {
        text: "Hello! Let's explore how climate change has affected Ghana over the years.",
        delay: 1000,
        type: 'bot'
    },
    {
        text: "Ghana, like many African nations, is experiencing significant climate impacts despite contributing minimally to global emissions.",
        delay: 2000,
        type: 'bot'
    },
    {
        text: "Show me temperature trends",
        delay: 3000,
        type: 'user'
    },
    {
        action: 'showChart',
        chartType: 'temperature',
        delay: 4000,
        type: 'bot'
    },
    {
        text: "The average temperature in Ghana has risen by about 2.1°C since 1960, faster than the global average.",
        delay: 7000,
        type: 'bot'
    },
    {
        text: "What about rainfall patterns?",
        delay: 9000,
        type: 'user'
    },
    {
        action: 'showChart',
        chartType: 'rainfall',
        delay: 10000,
        type: 'bot'
    },
    {
        text: "Annual rainfall has decreased by about 15% in the northern regions since 1950, while becoming more erratic in the south.",
        delay: 13000,
        type: 'bot'
    },
    {
        text: "Show me CO2 emissions data",
        delay: 15000,
        type: 'user'
    },
    {
        action: 'showChart',
        chartType: 'co2',
        delay: 16000,
        type: 'bot'
    },
    {
        text: "Ghana's CO2 emissions have more than doubled since 1990, primarily from energy and land use changes.",
        delay: 19000,
        type: 'bot'
    },
    {
        action: 'showStats',
        delay: 21000,
        type: 'bot'
    },
    {
        text: "These changes threaten Ghana's agriculture (30% of GDP), coastal communities, and public health. Adaptation measures are crucial.",
        delay: 23000,
        type: 'bot'
    }
    ];

    messages.forEach((message, index) => {
    setTimeout(() => {
        if (message.action) {
            if (message.action === 'showChart') {
                showChart(message.chartType);
            } else if (message.action === 'showStats') {
                showStats();
            }
        } else {
            addMessage(message.text, message.type);
        }
    }, message.delay);
    });

    function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return typingDiv;
    }

    function removeTyping(typingDiv) {
    setTimeout(() => {
        typingDiv.remove();
    }, 1000);
    }

    function addMessage(text, type) {
    const typingDiv = showTyping();

    setTimeout(() => {
        removeTyping(typingDiv);
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = `
            <p>${text}</p>
            <div class="timestamp">${getCurrentTime()}</div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1500);
    }

    function showChart(chartType) {
    const typingDiv = showTyping();

    setTimeout(() => {
        removeTyping(typingDiv);
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message bot-message`;
        
        let title, data, color, label, unit;
        
        switch(chartType) {
            case 'temperature':
                title = "Average Temperature Rise in Ghana (°C)";
                data = climateData.temperature;
                color = 'rgba(206, 17, 38, 0.8)';
                label = "Temperature";
                unit = "°C";
                break;
            case 'rainfall':
                title = "Annual Rainfall in Ghana (mm)";
                data = climateData.rainfall;
                color = 'rgba(0, 107, 63, 0.8)';
                label = "Rainfall";
                unit = "mm";
                break;
            case 'co2':
                title = "CO₂ Emissions in Ghana (metric tons per capita)";
                data = climateData.co2Emissions;
                color = 'rgba(252, 209, 22, 0.8)';
                label = "CO₂ Emissions";
                unit = "tons";
                break;
        }
        
        messageDiv.innerHTML = `
            <h3>${title}</h3>
            <div class="chart-container">
                <canvas id="${chartType}-chart"></canvas>
            </div>
            <div class="timestamp">${getCurrentTime()}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(() => {
            const ctx = document.getElementById(`${chartType}-chart`).getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: climateData.years,
                    datasets: [{
                        label: label,
                        data: data,
                        backgroundColor: color,
                        borderColor: color.replace('0.8', '1'),
                        borderWidth: 2,
                        tension: 0.3,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${label}: ${context.parsed.y} ${unit}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        }, 100);
    }, 1500);
    }

    function showStats() {
    const typingDiv = showTyping();

    setTimeout(() => {
        removeTyping(typingDiv);
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message bot-message`;
        messageDiv.innerHTML = `
            <h3>Key Climate Statistics for Ghana</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">+2.1°C</div>
                    <div class="stat-label">Temperature rise since 1960</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">-15%</div>
                    <div class="stat-label">Rainfall decrease in north</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">2.5x</div>
                    <div class="stat-label">CO₂ increase since 1990</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">50%</div>
                    <div class="stat-label">Forest cover lost since 1950</div>
                </div>
            </div>
            <div class="timestamp">${getCurrentTime()}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1500);
    }

    function getCurrentTime() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    }
    });
    const tempCtx = document.getElementById('tempChart').getContext('2d');
        const tempChart = new Chart(tempCtx, {
            type: 'line',
            data: {
                labels: ['2015', '2017', '2019', '2021', '2023'],
                datasets: [{
                    label: 'Temperature Anomaly (°C)',
                    data: [0.7, 0.9, 1.0, 1.1, 1.2],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: '°C above 1960-1990 average'
                        }
                    }
                }
            }
        });

        const rainfallCtx = document.getElementById('rainfallChart').getContext('2d');
        const rainfallChart = new Chart(rainfallCtx, {
            type: 'bar',
            data: {
                labels: ['North', 'Middle Belt', 'South'],
                datasets: [{
                    label: 'Annual Rainfall Change (2000-2023)',
                    data: [-18, -12, -8],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(52, 152, 219, 0.7)'
                    ],
                    borderColor: [
                        'rgba(52, 152, 219, 1)',
                        'rgba(52, 152, 219, 1)',
                        'rgba(52, 152, 219, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: '% Change since 2000'
                        }
                    }
                }
            }
        });

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.chatbot-toggle');
    const chatbot = document.querySelector('.chatbot-container');
    const closeBtn = document.querySelector('.chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const inputField = document.getElementById('chatbot-input');
    const messagesContainer = document.getElementById('chatbot-messages');
    
    toggleBtn.addEventListener('click', () => {
        chatbot.classList.toggle('active');
    });
    
    closeBtn.addEventListener('click', () => {
        chatbot.classList.remove('active');
    });
    
    function sendMessage() {
        const message = inputField.value.trim();
        if (message) {
            addMessage(message, 'user');
            inputField.value = '';
            setTimeout(() => generateResponse(message), 500);
        }
    }
    
    sendBtn.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message', `${sender}-message`);
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function generateResponse(question) {
        const lowerQuestion = question.toLowerCase();
        let response;
        
        if (lowerQuestion.includes('cause') || lowerQuestion.includes('why')) {
            response = "The main causes in Ghana include deforestation, slash-and-burn farming, excessive fertilizer use, and livestock emissions. These release greenhouse gases while making land more vulnerable.";
        } 
        else if (lowerQuestion.includes('effect') || lowerQuestion.includes('impact')) {
            response = "Climate change reduces crop yields (especially cocoa), causes erratic rainfall, increases pests/diseases, and leads to soil degradation. Northern Ghana is particularly vulnerable to droughts.";
        }
        else if (lowerQuestion.includes('solution') || lowerQuestion.includes('help')) {
            response = "Solutions include climate-smart agriculture, drought-resistant crops, agroforestry, better water management, and farmer education programs. The government is implementing adaptation policies.";
        }
        else if (lowerQuestion.includes('data') || lowerQuestion.includes('stat')) {
            response = "Key stats: Temperature risen 1.2°C since 1960, cocoa yields may drop 30% by 2050, 20% less rain in northern regions, and agriculture employs 40% of Ghanaians.";
        }
        else if (lowerQuestion.includes('agriculture') || lowerQuestion.includes('farm')) {
            response = "Agriculture is severely impacted by climate change in Ghana. Key issues include reduced yields of staple crops (maize, yam, cassava), increased pests/diseases, and water scarcity affecting rain-fed farming.";
        }
        else {
            response = "I can help with information about climate change in Ghana. Try asking about causes, effects on agriculture, solutions, or recent data.";
        }
        
        addMessage(response, 'bot');
        
        if (!messagesContainer.querySelector('.quick-prompts')) {
            addQuickPrompts();
        }
    }
    
    function addQuickPrompts() {
        const prompts = [
            "Tell me about causes",
            "How does it affect agriculture?",
            "What are the solutions?",
            "Show me recent data"
        ];
        
        const promptContainer = document.createElement('div');
        promptContainer.className = 'quick-prompts';
        
        prompts.forEach(prompt => {
            const button = document.createElement('button');
            button.className = 'quick-prompt';
            button.textContent = prompt;
            button.addEventListener('click', () => {
                addMessage(prompt, 'user');
                promptContainer.remove();
                setTimeout(() => generateResponse(prompt), 500);
            });
            promptContainer.appendChild(button);
        });
        
        messagesContainer.appendChild(promptContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    setTimeout(() => {
        addMessage("Hello! I can help you understand climate change impacts on Ghana's agriculture. What would you like to know?", 'bot');
        addQuickPrompts();
    }, 1000);
});



document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
      (e.ctrlKey && e.key === 'u')) {
    e.preventDefault();
    document.body.innerHTML = '<div style="padding:20px;text-align:center;font-family:Arial;"><h1>Inspection Not Allowed</h1><p>This page is protected against unauthorized inspection.</p></div>';
    document.body.style = 'background:#fff;color:#333;margin:0;padding:0;';
  }
});

setInterval(() => {
  const start = Date.now();
  debugger;
  if (Date.now() - start > 100) {
    window.location.href = 'about:blank';
  }
}, 1000);

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length || mutation.removedNodes.length) {
      document.body.innerHTML = '<h1 style="color:red">DOM manipulation detected</h1>';
      document.body.style = 'text-align:center;padding:50px;';
    }
  });
});
observer.observe(document, { childList: true, subtree: true });

const styles = `
  body {
    background-color: #f5f5f5;
    font-family: 'Arial', sans-serif;
  }
  /* More styles... */
`;
document.head.innerHTML += `<style>${obfuscateCSS(styles)}</style>`;

function obfuscateCSS(css) {
  return css.split('').map(c => 
    Math.random() > 0.5 ? `\\${c.charCodeAt(0).toString(16)}` : c
  ).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('div');
  app.id = 'app';
  
  const header = document.createElement('header');
  header.innerHTML = obfuscateHTML('<h1>Protected Content</h1>');
  
  const content = document.createElement('div');
  content.className = 'content';
  content.innerHTML = obfuscateHTML('<p>This content cannot be easily inspected.</p>');
  
  app.appendChild(header);
  app.appendChild(content);
  document.body.appendChild(app);
  
  applyStyles();
});

function obfuscateHTML(html) {
  return html.split('').map(c => 
    `&#${c.charCodeAt(0)};`
  ).join('');
}

function applyStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #app { max-width: 800px; margin: 0 auto; }
    header { background: #333; color: white; padding: 20px; }
    .content { padding: 20px; background: white; }
    /* More obfuscated styles... */
  `.split('').reverse().join('');
  document.head.appendChild(style);
}

let devToolsOpen = false;
const element = new Image();
Object.defineProperty(element, 'id', {
  get: function() {
    devToolsOpen = true;
    document.body.innerHTML = '<h1 style="color:red">Developer Tools Detected</h1>';
    window.location.href = 'about:blank';
  }
});
console.log('%c', element);

if (window.top !== window.self) {
  window.top.location = window.self.location;
}

setInterval(() => {
  const originalHTML = document.documentElement.outerHTML;
  setTimeout(() => {
    if (originalHTML !== document.documentElement.outerHTML) {
      document.body.innerHTML = '<h1>DOM Tampering Detected</h1>';
      window.location.reload();
    }
  }, 100);
}, 1000);

function decryptContent(encrypted) {
  return encrypted.split('').reverse().join('');
}

document.querySelectorAll('[data-encrypted]').forEach(el => {
  el.textContent = decryptContent(el.dataset.encrypted);
});

const criticalCSS = `
  body::before {
    content: "${Array(1000).fill(' ').join('')}";
    white-space: pre;
    display: block;
    line-height: 0;
    color: transparent;
  }
  /* This makes copying content difficult */
  * {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  /* Hide elements when printed */
  @media print {
    body * {
      visibility: hidden;
    }
  }
`;

const style = document.createElement('style');
style.textContent = criticalCSS;
document.head.appendChild(style);

const randomClass = () => 'x' + Math.random().toString(36).substr(2, 8);
document.querySelectorAll('*').forEach(el => {
  el.classList.add(randomClass());
});

