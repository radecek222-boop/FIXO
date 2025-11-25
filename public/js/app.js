/**
 * FIXO - Hlavní JavaScript aplikace
 * Aplikace pro diagnostiku a opravu domácích závad
 */

// ========================================
// Konfigurace API
// ========================================

const API_BASE_URL = '/api';

const API = {
    health: () => fetch(`${API_BASE_URL}/health`).then(res => res.json()),
    categories: () => fetch(`${API_BASE_URL}/categories`).then(res => res.json()),
    objects: (category) => fetch(`${API_BASE_URL}/objects${category ? `?category=${category}` : ''}`).then(res => res.json()),
    search: (query) => fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`).then(res => res.json()),
    repair: (objectId, issueId) => fetch(`${API_BASE_URL}/repair/${objectId}/${issueId}`).then(res => res.json()),
    stats: () => fetch(`${API_BASE_URL}/stats`).then(res => res.json()),
    tools: () => fetch(`${API_BASE_URL}/tools`).then(res => res.json()),

    analyze: (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        return fetch(`${API_BASE_URL}/analyze`, {
            method: 'POST',
            body: formData
        }).then(res => res.json());
    },

    saveHistory: (data) => {
        return fetch(`${API_BASE_URL}/history`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }
};

// ========================================
// Databáze závad (lokální kopie pro offline)
// ========================================

const repairDatabase = {
    'kohoutek': {
        name: 'Kohoutek jednopákový',
        issues: [
            {
                id: 'leak',
                name: 'Kapající kohoutek',
                description: 'Netěsnící těsnění nebo O-kroužek',
                riskScore: 2,
                difficulty: 'Nízká',
                timeEstimate: '15 min',
                tools: ['Klíč', 'Šroubovák', 'Nové těsnění'],
                steps: [
                    { step: 1, action: 'Zavřete hlavní přívod vody', time: '1 min', icon: '🚰' },
                    { step: 2, action: 'Odšroubujte hlavici kohoutku', time: '2 min', icon: '🔧' },
                    { step: 3, action: 'Vyměňte těsnění nebo O-kroužek', time: '5 min', icon: '⚙️' },
                    { step: 4, action: 'Sestavte kohoutek zpět', time: '3 min', icon: '🔩' },
                    { step: 5, action: 'Pusťte vodu a zkontrolujte těsnost', time: '2 min', icon: '✅' }
                ],
                safetyWarnings: ['Vždy nejdříve zavřete hlavní přívod vody', 'Mějte připravený kbelík na zachycení zbylé vody']
            }
        ]
    },
    'wc': {
        name: 'Toaleta',
        issues: [
            {
                id: 'running',
                name: 'Protékající WC',
                description: 'Vadný plovák nebo těsnění',
                riskScore: 2,
                difficulty: 'Střední',
                timeEstimate: '20 min',
                tools: ['Klíč', 'Nový plovák nebo těsnění'],
                steps: [
                    { step: 1, action: 'Zavřete přívod vody k WC', time: '1 min', icon: '🚰' },
                    { step: 2, action: 'Vyprázdněte nádržku splachováním', time: '1 min', icon: '🚽' },
                    { step: 3, action: 'Zkontrolujte plovák a ventil', time: '5 min', icon: '🔍' },
                    { step: 4, action: 'Vyměňte vadné díly', time: '10 min', icon: '🔧' },
                    { step: 5, action: 'Pusťte vodu a otestujte', time: '3 min', icon: '✅' }
                ],
                safetyWarnings: ['Použijte gumové rukavice', 'Dbejte na hygienu']
            }
        ]
    },
    'zasuvka': {
        name: 'Elektrická zásuvka',
        issues: [
            {
                id: 'not-working',
                name: 'Nefunkční zásuvka',
                description: 'Přerušený obvod nebo poškozený kontakt',
                riskScore: 8,
                difficulty: 'Vysoká',
                timeEstimate: '30 min',
                tools: ['Tester napětí', 'Šroubovák', 'Nová zásuvka'],
                steps: [
                    { step: 1, action: '⚠️ VYPNĚTE JISTIČ!', time: '1 min', icon: '⚡' },
                    { step: 2, action: 'Ověřte testerem, že není napětí', time: '2 min', icon: '🔌' },
                    { step: 3, action: 'Demontujte kryt zásuvky', time: '2 min', icon: '🔧' },
                    { step: 4, action: 'Zkontrolujte zapojení vodičů', time: '5 min', icon: '🔍' },
                    { step: 5, action: 'Vyměňte zásuvku nebo opravte spoje', time: '15 min', icon: '⚙️' }
                ],
                safetyWarnings: ['⚠️ POZOR! Práce s elektřinou!', 'Pokud si nejste jisti, volejte elektrikáře!', 'Vždy vypněte jistič před prací']
            }
        ]
    },
    'dvere': {
        name: 'Dveře',
        issues: [
            {
                id: 'squeaking',
                name: 'Vrzající dveře',
                description: 'Suché panty potřebují namazání',
                riskScore: 1,
                difficulty: 'Velmi nízká',
                timeEstimate: '5 min',
                tools: ['WD-40 nebo olej', 'Hadřík'],
                steps: [
                    { step: 1, action: 'Otevřete dveře do poloviny', time: '10 s', icon: '🚪' },
                    { step: 2, action: 'Nastříkejte mazivo na panty', time: '1 min', icon: '🔧' },
                    { step: 3, action: 'Pohybujte dveřmi tam a zpět', time: '1 min', icon: '↔️' },
                    { step: 4, action: 'Setřete přebytečné mazivo', time: '1 min', icon: '🧹' }
                ],
                safetyWarnings: ['Větrejte při použití sprejů']
            }
        ]
    },
    'radiator': {
        name: 'Radiátor',
        issues: [
            {
                id: 'cold',
                name: 'Studený radiátor',
                description: 'Vzduch v topném systému',
                riskScore: 2,
                difficulty: 'Nízká',
                timeEstimate: '10 min',
                tools: ['Odvzdušňovací klíč', 'Nádoba na vodu', 'Hadřík'],
                steps: [
                    { step: 1, action: 'Vypněte topení a nechte vychladnout', time: '15 min', icon: '🌡️' },
                    { step: 2, action: 'Najděte odvzdušňovací ventil', time: '1 min', icon: '🔍' },
                    { step: 3, action: 'Pod ventil umístěte nádobu', time: '30 s', icon: '🪣' },
                    { step: 4, action: 'Pomalu otevřete ventil klíčem', time: '2 min', icon: '🔧' },
                    { step: 5, action: 'Až poteče voda, ventil zavřete', time: '2 min', icon: '✅' }
                ],
                safetyWarnings: ['Pozor na horkou vodu', 'Mějte připravený hadřík']
            }
        ]
    }
};

// ========================================
// Stav aplikace
// ========================================

const AppState = {
    currentView: 'home',
    selectedImage: null,
    analysisResult: null,
    isAnalyzing: false,
    selectedIssue: null,
    currentStep: 0,
    repairHistory: JSON.parse(localStorage.getItem('fixo_history') || '[]')
};

// ========================================
// Utility funkce
// ========================================

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function createElement(tag, className, innerHTML) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (innerHTML) el.innerHTML = innerHTML;
    return el;
}

function formatDate(date) {
    return new Date(date).toLocaleString('cs-CZ');
}

function saveHistory() {
    localStorage.setItem('fixo_history', JSON.stringify(AppState.repairHistory));
}

// ========================================
// Navigace
// ========================================

function navigate(view) {
    AppState.currentView = view;
    renderApp();
}

// ========================================
// Analýza obrázku
// ========================================

async function analyzeImage(file) {
    AppState.isAnalyzing = true;
    AppState.currentView = 'analyzing';
    renderApp();

    // Načíst náhled obrázku
    const reader = new FileReader();
    reader.onloadend = () => {
        AppState.selectedImage = reader.result;
        renderApp();
    };
    reader.readAsDataURL(file);

    // Simulace AI analýzy (v produkci by se volalo API)
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Náhodně vybrat objekt z databáze
    const objects = Object.keys(repairDatabase);
    const randomObject = objects[Math.floor(Math.random() * objects.length)];
    const objectData = repairDatabase[randomObject];
    const randomIssue = objectData.issues[0];

    AppState.analysisResult = {
        object: objectData,
        issue: randomIssue,
        confidence: Math.floor(Math.random() * 20) + 80
    };

    AppState.isAnalyzing = false;
    AppState.currentView = 'results';
    renderApp();
}

// ========================================
// Oprava
// ========================================

function startRepair(issue) {
    AppState.selectedIssue = issue;
    AppState.currentStep = 0;
    AppState.currentView = 'repair';

    // Přidat do historie
    const historyItem = {
        id: Date.now(),
        date: new Date().toISOString(),
        object: AppState.analysisResult.object.name,
        issue: issue.name,
        status: 'in-progress'
    };
    AppState.repairHistory.unshift(historyItem);
    saveHistory();

    renderApp();
}

function nextStep() {
    if (AppState.currentStep < AppState.selectedIssue.steps.length - 1) {
        AppState.currentStep++;
        renderApp();
    }
}

function prevStep() {
    if (AppState.currentStep > 0) {
        AppState.currentStep--;
        renderApp();
    }
}

function completeRepair() {
    // Aktualizovat historii
    if (AppState.repairHistory.length > 0) {
        AppState.repairHistory[0].status = 'completed';
        saveHistory();
    }

    // Reset stavu
    AppState.currentView = 'home';
    AppState.selectedImage = null;
    AppState.analysisResult = null;
    AppState.selectedIssue = null;
    AppState.currentStep = 0;

    renderApp();
}

// ========================================
// Renderování aplikace
// ========================================

function renderApp() {
    const root = $('#app-root');
    if (!root) return;

    let content = '';

    switch (AppState.currentView) {
        case 'home':
            content = renderHomeView();
            break;
        case 'analyzing':
            content = renderAnalyzingView();
            break;
        case 'results':
            content = renderResultsView();
            break;
        case 'repair':
            content = renderRepairView();
            break;
        case 'history':
            content = renderHistoryView();
            break;
        case 'knowledge':
            content = renderKnowledgeView();
            break;
        default:
            content = renderHomeView();
    }

    root.innerHTML = content;
    attachEventListeners();
}

function renderHomeView() {
    return `
        <div class="flex flex-col items-center justify-center min-h-[70vh] py-8">
            <div class="card max-w-md w-full mx-4">
                <div class="card-body text-center">
                    <i class="fas fa-camera text-6xl text-blue-600 mb-4"></i>
                    <h1 class="text-2xl font-bold text-gray-800 mb-2">Vyfotografujte závadu</h1>
                    <p class="text-gray-600 mb-6">AI okamžitě identifikuje problém a nabídne řešení</p>

                    <input type="file" id="image-input" accept="image/*" class="hidden">
                    <button id="upload-btn" class="btn btn-primary btn-lg btn-block">
                        <i class="fas fa-camera mr-3"></i>
                        Nahrát fotografii
                    </button>

                    <div class="mt-6 grid grid-cols-3 gap-2 text-center text-sm text-gray-600">
                        <div class="bg-gray-50 rounded-lg p-3">
                            <i class="fas fa-clock text-blue-600 mb-1"></i>
                            <div>30 sekund</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-3">
                            <i class="fas fa-shield-alt text-green-600 mb-1"></i>
                            <div>Bezpečné</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-3">
                            <i class="fas fa-tools text-orange-600 mb-1"></i>
                            <div>500+ oprav</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full px-4">
                ${['🚰 Kapající kohoutek', '🚽 Protékající WC', '🔌 Nefunkční zásuvka', '🚪 Vrzající dveře']
                    .map(item => `
                        <div class="feature-card text-center cursor-pointer">
                            <div class="text-3xl mb-2">${item.split(' ')[0]}</div>
                            <div class="text-sm text-gray-600">${item.split(' ').slice(1).join(' ')}</div>
                        </div>
                    `).join('')}
            </div>
        </div>
    `;
}

function renderAnalyzingView() {
    return `
        <div class="flex flex-col items-center justify-center min-h-[70vh] py-8">
            <div class="card max-w-md w-full mx-4">
                <div class="card-body text-center">
                    ${AppState.selectedImage ? `
                        <img src="${AppState.selectedImage}" alt="Analyzovaná fotka" class="w-full h-48 object-cover rounded-lg mb-6">
                    ` : ''}
                    <div class="flex justify-center mb-4">
                        <div class="spinner"></div>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800 mb-2">Analyzuji fotografii...</h2>
                    <div class="space-y-2 text-gray-600">
                        <div class="flex items-center justify-center">
                            <i class="fas fa-check-circle text-green-500 mr-2"></i>
                            Detekce objektu
                        </div>
                        <div class="flex items-center justify-center animate-pulse">
                            <i class="fas fa-spinner fa-spin text-blue-500 mr-2"></i>
                            Identifikace závady
                        </div>
                        <div class="flex items-center justify-center text-gray-400">
                            <i class="far fa-circle mr-2"></i>
                            Příprava návodů
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderResultsView() {
    const result = AppState.analysisResult;
    if (!result) return renderHomeView();

    const issueIcons = {
        'leak': '🚰',
        'running': '🚽',
        'not-working': '🔌',
        'squeaking': '🚪',
        'cold': '🌡️'
    };

    return `
        <div class="max-w-4xl mx-auto px-4 py-8">
            <div class="card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-2xl font-bold mb-2">${result.object.name}</h2>
                            <p class="opacity-80">Detekováno s ${result.confidence}% jistotou</p>
                        </div>
                        <div class="text-5xl">${issueIcons[result.issue.id] || '🔧'}</div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">Identifikovaný problém</h3>
                        <div class="alert alert-danger">
                            <p class="font-semibold">${result.issue.name}</p>
                            <p class="text-sm mt-1">${result.issue.description}</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-3 gap-4 mb-6">
                        <div class="bg-gray-50 rounded-lg p-4 text-center">
                            <i class="fas fa-clock text-blue-600 text-2xl mb-2"></i>
                            <div class="text-sm text-gray-600">Čas opravy</div>
                            <div class="font-semibold">${result.issue.timeEstimate}</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-4 text-center">
                            <i class="fas fa-signal text-orange-600 text-2xl mb-2"></i>
                            <div class="text-sm text-gray-600">Obtížnost</div>
                            <div class="font-semibold">${result.issue.difficulty}</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-4 text-center">
                            <i class="fas fa-exclamation-triangle text-yellow-600 text-2xl mb-2"></i>
                            <div class="text-sm text-gray-600">Riziko</div>
                            <div class="font-semibold">${result.issue.riskScore}/10</div>
                        </div>
                    </div>

                    ${result.issue.riskScore > 5 ? `
                        <div class="alert alert-warning mb-6">
                            <p class="font-semibold mb-2"><i class="fas fa-exclamation-triangle mr-2"></i>Bezpečnostní upozornění</p>
                            <ul class="text-sm space-y-1">
                                ${result.issue.safetyWarnings.map(w => `<li>• ${w}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}

                    <div class="flex gap-4">
                        <button id="start-repair-btn" class="btn btn-success flex-1">
                            <i class="fas fa-wrench mr-2"></i>
                            Začít opravu
                        </button>
                        <button id="call-expert-btn" class="btn btn-secondary flex-1">
                            <i class="fas fa-phone mr-2"></i>
                            Zavolat odborníka
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderRepairView() {
    const issue = AppState.selectedIssue;
    if (!issue) return renderHomeView();

    const step = issue.steps[AppState.currentStep];
    const progress = ((AppState.currentStep + 1) / issue.steps.length) * 100;

    return `
        <div class="max-w-4xl mx-auto px-4 py-8">
            <div class="card">
                <div class="progress">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>

                <div class="bg-blue-50 p-6 border-b">
                    <h3 class="font-semibold text-blue-900 mb-3">
                        <i class="fas fa-toolbox mr-2"></i>
                        Potřebné nástroje a materiál
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        ${issue.tools.map(tool => `<span class="badge badge-primary">${tool}</span>`).join('')}
                    </div>
                </div>

                <div class="card-body">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">
                        Krok ${AppState.currentStep + 1} z ${issue.steps.length}
                    </h2>

                    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 text-center mb-6">
                        <div class="text-6xl mb-4">${step.icon}</div>
                        <p class="text-xl font-semibold text-gray-800 mb-2">${step.action}</p>
                        <p class="text-gray-600">
                            <i class="fas fa-clock mr-2"></i>
                            Časová náročnost: ${step.time}
                        </p>
                    </div>

                    <div class="mb-6">
                        <h3 class="font-semibold text-gray-700 mb-3">Přehled všech kroků</h3>
                        <div class="space-y-2">
                            ${issue.steps.map((s, idx) => `
                                <div class="flex items-center p-3 rounded-lg ${
                                    idx === AppState.currentStep
                                        ? 'bg-blue-100 border-l-4 border-blue-600'
                                        : idx < AppState.currentStep
                                            ? 'bg-green-50 opacity-75'
                                            : 'bg-gray-50'
                                }">
                                    <span class="mr-3 text-2xl">${s.icon}</span>
                                    <span class="flex-1 ${idx === AppState.currentStep ? 'font-semibold' : ''}">
                                        ${s.step}. ${s.action}
                                    </span>
                                    ${idx < AppState.currentStep ? '<i class="fas fa-check-circle text-green-600"></i>' : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <button id="prev-step-btn" class="btn btn-secondary flex-1" ${AppState.currentStep === 0 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-left mr-2"></i>
                            Předchozí krok
                        </button>
                        ${AppState.currentStep < issue.steps.length - 1 ? `
                            <button id="next-step-btn" class="btn btn-primary flex-1">
                                Další krok
                                <i class="fas fa-arrow-right ml-2"></i>
                            </button>
                        ` : `
                            <button id="complete-repair-btn" class="btn btn-success flex-1">
                                <i class="fas fa-check mr-2"></i>
                                Dokončit opravu
                            </button>
                        `}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderHistoryView() {
    return `
        <div class="max-w-4xl mx-auto px-4 py-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Historie oprav</h2>

            ${AppState.repairHistory.length === 0 ? `
                <div class="card">
                    <div class="card-body text-center py-12">
                        <i class="fas fa-history text-6xl text-gray-300 mb-4"></i>
                        <p class="text-gray-600">Zatím nemáte žádné opravy v historii</p>
                    </div>
                </div>
            ` : `
                <div class="space-y-4">
                    ${AppState.repairHistory.map(item => `
                        <div class="card">
                            <div class="card-body">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="font-semibold text-lg text-gray-800">
                                            ${item.object} - ${item.issue}
                                        </h3>
                                        <p class="text-gray-600 text-sm mt-1">
                                            <i class="far fa-calendar mr-2"></i>
                                            ${formatDate(item.date)}
                                        </p>
                                    </div>
                                    <div>
                                        ${item.status === 'completed'
                                            ? '<span class="badge badge-success"><i class="fas fa-check-circle mr-1"></i>Dokončeno</span>'
                                            : '<span class="badge badge-warning"><i class="fas fa-wrench mr-1"></i>Probíhá</span>'
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
}

function renderKnowledgeView() {
    return `
        <div class="max-w-6xl mx-auto px-4 py-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Databáze závad a oprav</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${Object.entries(repairDatabase).map(([key, item]) => `
                    <div class="card hover:shadow-xl transition">
                        <div class="card-header">
                            <h3 class="font-bold text-lg">${item.name}</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                ${item.issues.map(issue => `
                                    <div class="border-l-4 border-blue-500 pl-3">
                                        <p class="font-semibold text-gray-800">${issue.name}</p>
                                        <p class="text-sm text-gray-600">${issue.description}</p>
                                        <div class="mt-2 flex gap-4 text-xs text-gray-500">
                                            <span><i class="fas fa-clock mr-1"></i>${issue.timeEstimate}</span>
                                            <span><i class="fas fa-signal mr-1"></i>${issue.difficulty}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="mt-8 alert alert-info">
                <h3 class="font-bold mb-2"><i class="fas fa-info-circle mr-2"></i>O databázi</h3>
                <p>
                    Naše databáze obsahuje více než 500 nejčastějších domácích závad rozdělených do 12 kategorií.
                    Každá oprava obsahuje detailní návod, seznam potřebných nástrojů a bezpečnostní upozornění.
                </p>
            </div>
        </div>
    `;
}

// ========================================
// Event listenery
// ========================================

function attachEventListeners() {
    // Upload tlačítko
    const uploadBtn = $('#upload-btn');
    const imageInput = $('#image-input');
    if (uploadBtn && imageInput) {
        uploadBtn.addEventListener('click', () => imageInput.click());
        imageInput.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                analyzeImage(e.target.files[0]);
            }
        });
    }

    // Navigace
    $$('[data-nav]').forEach(el => {
        el.addEventListener('click', () => navigate(el.dataset.nav));
    });

    // Začít opravu
    const startRepairBtn = $('#start-repair-btn');
    if (startRepairBtn) {
        startRepairBtn.addEventListener('click', () => startRepair(AppState.analysisResult.issue));
    }

    // Zavolat odborníka
    const callExpertBtn = $('#call-expert-btn');
    if (callExpertBtn) {
        callExpertBtn.addEventListener('click', () => navigate('home'));
    }

    // Kroky opravy
    const prevStepBtn = $('#prev-step-btn');
    const nextStepBtn = $('#next-step-btn');
    const completeRepairBtn = $('#complete-repair-btn');

    if (prevStepBtn) prevStepBtn.addEventListener('click', prevStep);
    if (nextStepBtn) nextStepBtn.addEventListener('click', nextStep);
    if (completeRepairBtn) completeRepairBtn.addEventListener('click', completeRepair);
}

// ========================================
// Inicializace
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    renderApp();

    // Kontrola zdraví API
    API.health().then(data => {
        console.log('FIXO API Status:', data.status);
    }).catch(err => {
        console.warn('API nedostupné, používám offline režim');
    });
});

// Export pro globální použití
window.FIXO = {
    navigate,
    analyzeImage,
    startRepair,
    API,
    AppState
};
