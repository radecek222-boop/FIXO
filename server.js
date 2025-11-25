// FIXO Backend Server
// REST API pro aplikaci na diagnostiku domácích závad

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const OpenAI = require('openai');

// OpenAI klient
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minut
    max: 100 // limit každé IP na 100 požadavků
});
app.use('/api/', limiter);

// Multer pro upload obrázků
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Povoleny jsou pouze obrázky (JPEG, PNG, GIF, WebP)'));
        }
    }
});

// Databáze závad (v produkci by byla v samostatné DB)
const repairDatabase = {
    'faucet': {
        id: 'faucet',
        name: 'Kohoutek',
        nameEN: 'Faucet',
        category: 'water',
        commonIssues: [
            {
                id: 'leak',
                name: 'Kapající kohoutek',
                nameEN: 'Leaking faucet',
                description: 'Netěsnící těsnění nebo O-kroužek',
                probability: 0.75,
                severity: 'low',
                riskScore: 2,
                difficulty: 'easy',
                timeEstimate: 15,
                costEstimate: { min: 50, max: 200, currency: 'CZK' },
                requiredTools: ['wrench', 'screwdriver', 'new_seal'],
                steps: [
                    { order: 1, action: 'shut_water', description: 'Zavřete hlavní přívod vody', duration: 1 },
                    { order: 2, action: 'disassemble', description: 'Odšroubujte hlavici kohoutku', duration: 2 },
                    { order: 3, action: 'replace_seal', description: 'Vyměňte těsnění nebo O-kroužek', duration: 5 },
                    { order: 4, action: 'reassemble', description: 'Sestavte kohoutek zpět', duration: 3 },
                    { order: 5, action: 'test', description: 'Pusťte vodu a zkontrolujte těsnost', duration: 2 }
                ],
                safetyWarnings: [
                    'Vždy nejdříve zavřete hlavní přívod vody',
                    'Mějte připravený kbelík na zachycení zbylé vody'
                ],
                professionalNeeded: false
            }
        ]
    },
    'toilet': {
        id: 'toilet',
        name: 'Toaleta',
        nameEN: 'Toilet',
        category: 'water',
        commonIssues: [
            {
                id: 'running',
                name: 'Protékající WC',
                nameEN: 'Running toilet',
                description: 'Vadný plovák nebo těsnění',
                probability: 0.65,
                severity: 'medium',
                riskScore: 3,
                difficulty: 'medium',
                timeEstimate: 20,
                costEstimate: { min: 100, max: 500, currency: 'CZK' },
                requiredTools: ['wrench', 'new_flapper'],
                steps: [
                    { order: 1, action: 'shut_water', description: 'Zavřete přívod vody k WC', duration: 1 },
                    { order: 2, action: 'drain_tank', description: 'Vyprázdněte nádržku splachováním', duration: 1 },
                    { order: 3, action: 'inspect', description: 'Zkontrolujte plovák a ventil', duration: 5 },
                    { order: 4, action: 'replace_parts', description: 'Vyměňte vadné díly', duration: 10 },
                    { order: 5, action: 'test', description: 'Pusťte vodu a otestujte', duration: 3 }
                ],
                safetyWarnings: [
                    'Použijte gumové rukavice',
                    'Dbejte na hygienu'
                ],
                professionalNeeded: false
            }
        ]
    },
    'outlet': {
        id: 'outlet',
        name: 'Elektrická zásuvka',
        nameEN: 'Electrical outlet',
        category: 'electrical',
        commonIssues: [
            {
                id: 'not_working',
                name: 'Nefunkční zásuvka',
                nameEN: 'Non-working outlet',
                description: 'Přerušený obvod nebo poškozený kontakt',
                probability: 0.55,
                severity: 'high',
                riskScore: 8,
                difficulty: 'hard',
                timeEstimate: 30,
                costEstimate: { min: 200, max: 1000, currency: 'CZK' },
                requiredTools: ['voltage_tester', 'screwdriver', 'new_outlet'],
                steps: [
                    { order: 1, action: 'turn_off_breaker', description: '⚠️ VYPNĚTE JISTIČ!', duration: 1 },
                    { order: 2, action: 'test_voltage', description: 'Ověřte testerem, že není napětí', duration: 2 },
                    { order: 3, action: 'remove_cover', description: 'Demontujte kryt zásuvky', duration: 2 },
                    { order: 4, action: 'inspect_wiring', description: 'Zkontrolujte zapojení vodičů', duration: 5 },
                    { order: 5, action: 'replace_outlet', description: 'Vyměňte zásuvku nebo opravte spoje', duration: 15 }
                ],
                safetyWarnings: [
                    '⚠️ POZOR! Práce s elektřinou může být životu nebezpečná!',
                    'Pokud si nejste jisti, volejte elektrikáře!',
                    'Vždy vypněte jistič před prací',
                    'Použijte tester napětí'
                ],
                professionalNeeded: true
            }
        ]
    },
    'door': {
        id: 'door',
        name: 'Dveře',
        nameEN: 'Door',
        category: 'mechanical',
        commonIssues: [
            {
                id: 'squeaking',
                name: 'Vrzající dveře',
                nameEN: 'Squeaking door',
                description: 'Suché panty potřebují namazání',
                probability: 0.85,
                severity: 'low',
                riskScore: 1,
                difficulty: 'very_easy',
                timeEstimate: 5,
                costEstimate: { min: 20, max: 100, currency: 'CZK' },
                requiredTools: ['wd40', 'cloth'],
                steps: [
                    { order: 1, action: 'open_door', description: 'Otevřete dveře do poloviny', duration: 0.2 },
                    { order: 2, action: 'apply_lubricant', description: 'Nastříkejte mazivo na panty', duration: 1 },
                    { order: 3, action: 'work_hinges', description: 'Pohybujte dveřmi tam a zpět', duration: 1 },
                    { order: 4, action: 'wipe_excess', description: 'Setřete přebytečné mazivo', duration: 1 }
                ],
                safetyWarnings: [
                    'Větrejte při použití sprejů'
                ],
                professionalNeeded: false
            }
        ]
    },
    'radiator': {
        id: 'radiator',
        name: 'Radiátor',
        nameEN: 'Radiator',
        category: 'heating',
        commonIssues: [
            {
                id: 'cold',
                name: 'Studený radiátor',
                nameEN: 'Cold radiator',
                description: 'Vzduch v topném systému',
                probability: 0.70,
                severity: 'low',
                riskScore: 2,
                difficulty: 'easy',
                timeEstimate: 10,
                costEstimate: { min: 0, max: 50, currency: 'CZK' },
                requiredTools: ['radiator_key', 'bucket', 'cloth'],
                steps: [
                    { order: 1, action: 'turn_off_heating', description: 'Vypněte topení a nechte vychladnout', duration: 15 },
                    { order: 2, action: 'locate_valve', description: 'Najděte odvzdušňovací ventil', duration: 1 },
                    { order: 3, action: 'place_bucket', description: 'Pod ventil umístěte nádobu', duration: 0.5 },
                    { order: 4, action: 'open_valve', description: 'Pomalu otevřete ventil klíčem', duration: 2 },
                    { order: 5, action: 'close_valve', description: 'Až poteče voda, ventil zavřete', duration: 2 }
                ],
                safetyWarnings: [
                    'Pozor na horkou vodu',
                    'Mějte připravený hadřík'
                ],
                professionalNeeded: false
            }
        ]
    }
};

// API Endpoints

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Získat všechny kategorie závad
app.get('/api/categories', (req, res) => {
    const categories = {
        water: { name: 'Voda', icon: '🚰', count: 80 },
        electrical: { name: 'Elektřina', icon: '⚡', count: 70 },
        heating: { name: 'Topení', icon: '🌡️', count: 40 },
        mechanical: { name: 'Mechanika', icon: '⚙️', count: 70 },
        furniture: { name: 'Nábytek', icon: '🪑', count: 40 },
        windows_doors: { name: 'Okna a dveře', icon: '🚪', count: 40 },
        walls_floors: { name: 'Stěny a podlahy', icon: '🏠', count: 40 },
        appliances: { name: 'Spotřebiče', icon: '🔌', count: 40 },
        kitchen: { name: 'Kuchyň', icon: '🍳', count: 30 },
        bathroom: { name: 'Koupelna', icon: '🚿', count: 30 },
        garden: { name: 'Zahrada', icon: '🌱', count: 20 },
        auto: { name: 'Auto/Moto', icon: '🚗', count: 20 }
    };
    
    res.json({ categories });
});

// Analyzovat obrázek pomocí OpenAI Vision API
app.post('/api/analyze', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Nebyl nahrán žádný obrázek' });
        }

        const analysisId = uuidv4();
        console.log(`Začínám AI analýzu ${analysisId}...`);

        // Načíst obrázek a převést na base64
        const imagePath = path.join(__dirname, req.file.path);
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        const mimeType = req.file.mimetype;

        // Volání OpenAI Vision API
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `Jsi expert na diagnostiku domácích závad. Analyzuj obrázek a identifikuj:
1. Co je na obrázku (objekt/zařízení)
2. Jaká závada nebo problém je vidět
3. Jak závažný je problém (1-10)
4. Jaké kroky doporučuješ k opravě
5. Jaké nástroje jsou potřeba
6. Bezpečnostní varování

Odpověz POUZE ve formátu JSON bez markdown:
{
  "object": {"name": "...", "category": "voda|elektrina|topeni|dvere_okna|nabytek|spotrebice|kuchyn|koupelna|steny_podlahy|zahrada"},
  "issue": {"name": "...", "description": "...", "riskScore": 1-10, "difficulty": "Nízká|Střední|Vysoká"},
  "timeEstimate": "X min",
  "tools": ["nástroj1", "nástroj2"],
  "steps": [{"step": 1, "action": "...", "time": "X min", "icon": "emoji"}],
  "safetyWarnings": ["varování1", "varování2"],
  "confidence": 0.0-1.0
}`
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Analyzuj tento obrázek domácí závady a poskytni diagnostiku v JSON formátu:"
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:${mimeType};base64,${base64Image}`
                            }
                        }
                    ]
                }
            ],
            max_tokens: 1500
        });

        // Parsovat odpověď od AI
        let aiResult;
        try {
            const content = response.choices[0].message.content;
            // Odstranit případné markdown backticks
            const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            aiResult = JSON.parse(jsonStr);
        } catch (parseError) {
            console.error('Chyba při parsování AI odpovědi:', parseError);
            // Fallback na základní odpověď
            aiResult = {
                object: { name: "Neznámý objekt", category: "steny_podlahy" },
                issue: { name: "Neidentifikovaný problém", description: "AI nemohla přesně určit závadu", riskScore: 5, difficulty: "Střední" },
                timeEstimate: "30 min",
                tools: ["Základní nářadí"],
                steps: [{ step: 1, action: "Kontaktujte odborníka pro přesnou diagnostiku", time: "5 min", icon: "📞" }],
                safetyWarnings: ["Buďte opatrní při jakékoliv opravě"],
                confidence: 0.5
            };
        }

        console.log(`AI analýza ${analysisId} dokončena`);

        const result = {
            analysisId: analysisId,
            timestamp: new Date().toISOString(),
            image: {
                filename: req.file.filename,
                size: req.file.size,
                mimetype: req.file.mimetype
            },
            detection: {
                object: {
                    name: aiResult.object.name,
                    category: aiResult.object.category,
                    confidence: aiResult.confidence || 0.85
                },
                issue: {
                    name: aiResult.issue.name,
                    description: aiResult.issue.description,
                    confidence: aiResult.confidence || 0.85,
                    riskScore: aiResult.issue.riskScore,
                    difficulty: aiResult.issue.difficulty
                }
            },
            recommendations: {
                timeEstimate: aiResult.timeEstimate,
                tools: aiResult.tools,
                steps: aiResult.steps,
                safetyWarnings: aiResult.safetyWarnings
            }
        };

        res.json({ success: true, data: result });

    } catch (error) {
        console.error('Chyba při AI analýze:', error);
        res.status(500).json({
            error: 'Chyba při zpracování obrázku',
            message: error.message
        });
    }
});

// Analyzovat obrázek z base64 (pro frontend bez uploadu souboru)
app.post('/api/analyze-base64', async (req, res) => {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'Nebyl poskytnut žádný obrázek' });
        }

        const analysisId = uuidv4();
        console.log(`Začínám AI analýzu (base64) ${analysisId}...`);

        // Volání OpenAI Vision API
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `Jsi expert na diagnostiku domácích závad. Analyzuj obrázek a identifikuj:
1. Co je na obrázku (objekt/zařízení)
2. Jaká závada nebo problém je vidět
3. Jak závažný je problém (1-10)
4. Jaké kroky doporučuješ k opravě
5. Jaké nástroje jsou potřeba
6. Bezpečnostní varování

Odpověz POUZE ve formátu JSON bez markdown:
{
  "object": {"name": "...", "category": "voda|elektrina|topeni|dvere_okna|nabytek|spotrebice|kuchyn|koupelna|steny_podlahy|zahrada"},
  "issue": {"name": "...", "description": "...", "riskScore": 1-10, "difficulty": "Nízká|Střední|Vysoká"},
  "timeEstimate": "X min",
  "tools": ["nástroj1", "nástroj2"],
  "steps": [{"step": 1, "action": "...", "time": "X min", "icon": "emoji"}],
  "safetyWarnings": ["varování1", "varování2"],
  "confidence": 0.0-1.0
}`
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Analyzuj tento obrázek domácí závady a poskytni diagnostiku v JSON formátu:"
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: image
                            }
                        }
                    ]
                }
            ],
            max_tokens: 1500
        });

        // Parsovat odpověď od AI
        let aiResult;
        try {
            const content = response.choices[0].message.content;
            const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            aiResult = JSON.parse(jsonStr);
        } catch (parseError) {
            console.error('Chyba při parsování AI odpovědi:', parseError);
            aiResult = {
                object: { name: "Neznámý objekt", category: "steny_podlahy" },
                issue: { name: "Neidentifikovaný problém", description: "AI nemohla přesně určit závadu", riskScore: 5, difficulty: "Střední" },
                timeEstimate: "30 min",
                tools: ["Základní nářadí"],
                steps: [{ step: 1, action: "Kontaktujte odborníka pro přesnou diagnostiku", time: "5 min", icon: "📞" }],
                safetyWarnings: ["Buďte opatrní při jakékoliv opravě"],
                confidence: 0.5
            };
        }

        console.log(`AI analýza ${analysisId} dokončena`);

        const result = {
            analysisId: analysisId,
            timestamp: new Date().toISOString(),
            detection: {
                object: {
                    name: aiResult.object.name,
                    category: aiResult.object.category,
                    confidence: aiResult.confidence || 0.85
                },
                issue: {
                    name: aiResult.issue.name,
                    description: aiResult.issue.description,
                    confidence: aiResult.confidence || 0.85,
                    riskScore: aiResult.issue.riskScore,
                    difficulty: aiResult.issue.difficulty
                }
            },
            recommendations: {
                timeEstimate: aiResult.timeEstimate,
                tools: aiResult.tools,
                steps: aiResult.steps,
                safetyWarnings: aiResult.safetyWarnings
            }
        };

        res.json({ success: true, data: result });

    } catch (error) {
        console.error('Chyba při AI analýze:', error);
        res.status(500).json({
            error: 'Chyba při zpracování obrázku',
            message: error.message
        });
    }
});

// AI Překlad textu do libovolného jazyka
app.post('/api/translate', async (req, res) => {
    try {
        const { texts, targetLanguage, sourceLanguage = 'cs' } = req.body;

        if (!texts || !targetLanguage) {
            return res.status(400).json({ error: 'Chybí texty nebo cílový jazyk' });
        }

        // Pokud je cílový jazyk stejný jako zdrojový, vrátíme originál
        if (targetLanguage === sourceLanguage) {
            return res.json({ success: true, translations: texts });
        }

        console.log(`Překládám ${texts.length} textů do jazyka: ${targetLanguage}`);

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Rychlejší a levnější model pro překlady
            messages: [
                {
                    role: "system",
                    content: `Jsi profesionální překladatel. Přelož následující texty z ${sourceLanguage} do ${targetLanguage}.
Zachovej formátování, HTML tagy a speciální znaky. Vrať POUZE JSON pole s překlady ve stejném pořadí.
Příklad: ["přeložený text 1", "přeložený text 2"]`
                },
                {
                    role: "user",
                    content: JSON.stringify(texts)
                }
            ],
            max_tokens: 4000
        });

        let translations;
        try {
            const content = response.choices[0].message.content;
            const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            translations = JSON.parse(jsonStr);
        } catch (parseError) {
            console.error('Chyba při parsování překladu:', parseError);
            translations = texts; // Fallback na originál
        }

        res.json({ success: true, translations });

    } catch (error) {
        console.error('Chyba při překladu:', error);
        res.status(500).json({
            error: 'Chyba při překladu',
            message: error.message
        });
    }
});

// Získat detail opravy
app.get('/api/repair/:objectId/:issueId', (req, res) => {
    const { objectId, issueId } = req.params;
    
    const object = repairDatabase[objectId];
    if (!object) {
        return res.status(404).json({ error: 'Objekt nenalezen' });
    }
    
    const issue = object.commonIssues.find(i => i.id === issueId);
    if (!issue) {
        return res.status(404).json({ error: 'Závada nenalezena' });
    }
    
    res.json({
        object: {
            id: object.id,
            name: object.name,
            category: object.category
        },
        issue: issue
    });
});

// Získat všechny objekty v databázi
app.get('/api/objects', (req, res) => {
    const { category } = req.query;
    
    let objects = Object.values(repairDatabase);
    
    if (category) {
        objects = objects.filter(obj => obj.category === category);
    }
    
    const simplified = objects.map(obj => ({
        id: obj.id,
        name: obj.name,
        category: obj.category,
        issueCount: obj.commonIssues.length
    }));
    
    res.json({ objects: simplified });
});

// Vyhledávání v databázi
app.get('/api/search', (req, res) => {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
        return res.status(400).json({ error: 'Vyhledávací dotaz musí mít alespoň 2 znaky' });
    }
    
    const query = q.toLowerCase();
    const results = [];
    
    Object.values(repairDatabase).forEach(object => {
        // Hledat v názvu objektu
        if (object.name.toLowerCase().includes(query) || 
            object.nameEN.toLowerCase().includes(query)) {
            results.push({
                type: 'object',
                id: object.id,
                name: object.name,
                category: object.category
            });
        }
        
        // Hledat v závadách
        object.commonIssues.forEach(issue => {
            if (issue.name.toLowerCase().includes(query) || 
                issue.nameEN.toLowerCase().includes(query) ||
                issue.description.toLowerCase().includes(query)) {
                results.push({
                    type: 'issue',
                    objectId: object.id,
                    objectName: object.name,
                    issueId: issue.id,
                    issueName: issue.name,
                    description: issue.description
                });
            }
        });
    });
    
    res.json({ 
        query: q,
        count: results.length,
        results: results.slice(0, 20) // Omezit na 20 výsledků
    });
});

// Uložit historii opravy
app.post('/api/history', (req, res) => {
    const { objectId, issueId, status, duration, notes } = req.body;
    
    if (!objectId || !issueId || !status) {
        return res.status(400).json({ error: 'Chybí povinné údaje' });
    }
    
    const historyItem = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        objectId,
        issueId,
        status, // 'started', 'completed', 'abandoned'
        duration,
        notes
    };
    
    // V produkci by se ukládalo do databáze
    console.log('Ukládám historii:', historyItem);
    
    res.json({ 
        success: true,
        data: historyItem 
    });
});

// Získat statistiky
app.get('/api/stats', (req, res) => {
    const totalObjects = Object.keys(repairDatabase).length;
    const totalIssues = Object.values(repairDatabase)
        .reduce((sum, obj) => sum + obj.commonIssues.length, 0);
    
    const categoryCounts = {};
    Object.values(repairDatabase).forEach(obj => {
        categoryCounts[obj.category] = (categoryCounts[obj.category] || 0) + 1;
    });
    
    res.json({
        totalObjects,
        totalIssues,
        categoryCounts,
        averageDifficulty: 'medium',
        averageTime: 18, // minut
        successRate: 0.87 // 87% úspěšnost
    });
});

// Získat nástroje a materiál
app.get('/api/tools', (req, res) => {
    const tools = {
        wrench: { name: 'Klíč', price: 150, unit: 'CZK' },
        screwdriver: { name: 'Šroubovák', price: 100, unit: 'CZK' },
        new_seal: { name: 'Těsnění', price: 50, unit: 'CZK' },
        new_flapper: { name: 'Plovák', price: 200, unit: 'CZK' },
        voltage_tester: { name: 'Tester napětí', price: 300, unit: 'CZK' },
        new_outlet: { name: 'Nová zásuvka', price: 150, unit: 'CZK' },
        wd40: { name: 'WD-40', price: 120, unit: 'CZK' },
        cloth: { name: 'Hadřík', price: 20, unit: 'CZK' },
        radiator_key: { name: 'Odvzdušňovací klíč', price: 80, unit: 'CZK' },
        bucket: { name: 'Kbelík', price: 50, unit: 'CZK' }
    };

    res.json({ tools });
});

// Servírování statických souborů
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Hlavní stránka - informativní landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Aplikace - FIXO React aplikace
app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, 'app.html'));
});
app.get('/app.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'app.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Něco se pokazilo!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint nenalezen' });
});

// Spustit server
app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════╗
    ║     FIXO Backend Server          ║
    ║     Running on port ${PORT}         ║
    ║     http://localhost:${PORT}        ║
    ╚══════════════════════════════════╝
    `);
    console.log('API Endpoints:');
    console.log('  GET  /api/health         - Health check');
    console.log('  GET  /api/categories     - Seznam kategorií');
    console.log('  POST /api/analyze        - Analyzovat obrázek');
    console.log('  GET  /api/repair/:id/:id - Detail opravy');
    console.log('  GET  /api/objects        - Seznam objektů');
    console.log('  GET  /api/search         - Vyhledávání');
    console.log('  POST /api/history        - Uložit historii');
    console.log('  GET  /api/stats          - Statistiky');
    console.log('  GET  /api/tools          - Seznam nástrojů');
});

module.exports = app;