/**
 * FIXO AI Analyzer
 * Inteligentní analýza obrázků pomocí různých AI providerů
 *
 * Podporované providery:
 * - OpenAI Vision (gpt-4-vision-preview, gpt-4o)
 * - Google Cloud Vision
 * - Fallback: Inteligentní simulace
 */

const fs = require('fs');
const path = require('path');

class AIAnalyzer {
    constructor() {
        this.provider = this._detectProvider();
        this.repairDatabase = this._loadRepairDatabase();
        console.log(`🤖 AI Analyzer initialized with provider: ${this.provider}`);
    }

    /**
     * Detekovat dostupného AI providera
     */
    _detectProvider() {
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
            return 'openai';
        } else if (process.env.GOOGLE_CLOUD_PROJECT && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            return 'google';
        } else {
            return 'simulation';
        }
    }

    /**
     * Načíst databázi oprav
     */
    _loadRepairDatabase() {
        try {
            const dataPath = path.join(__dirname, '../data/repairs.json');
            const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
            return data.repairs || {};
        } catch (error) {
            console.error('Error loading repair database:', error);
            return {};
        }
    }

    /**
     * Analyzovat obrázek
     * @param {string} imageData - Base64 data URL nebo cesta k souboru
     * @param {Object} options - Volby analýzy
     * @returns {Promise<Object>} Výsledek analýzy
     */
    async analyze(imageData, options = {}) {
        console.log(`🔍 Analyzing image with ${this.provider} provider...`);

        switch (this.provider) {
            case 'openai':
                return await this._analyzeWithOpenAI(imageData, options);
            case 'google':
                return await this._analyzeWithGoogle(imageData, options);
            default:
                return await this._analyzeWithSimulation(imageData, options);
        }
    }

    /**
     * Analýza pomocí OpenAI Vision API
     */
    async _analyzeWithOpenAI(imageData, options) {
        try {
            const apiKey = process.env.OPENAI_API_KEY;
            const model = process.env.OPENAI_MODEL || 'gpt-4o';

            // Připravit prompt
            const prompt = this._createAnalysisPrompt();

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: 'system',
                            content: prompt.system
                        },
                        {
                            role: 'user',
                            content: [
                                {
                                    type: 'text',
                                    text: prompt.user
                                },
                                {
                                    type: 'image_url',
                                    image_url: {
                                        url: imageData
                                    }
                                }
                            ]
                        }
                    ],
                    max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 1000,
                    temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.statusText}`);
            }

            const result = await response.json();
            const aiResponse = JSON.parse(result.choices[0].message.content);

            return this._formatAnalysisResult(aiResponse);

        } catch (error) {
            console.error('OpenAI Vision API error:', error);
            console.log('Falling back to simulation...');
            return await this._analyzeWithSimulation(imageData, options);
        }
    }

    /**
     * Analýza pomocí Google Cloud Vision
     */
    async _analyzeWithGoogle(imageData, options) {
        try {
            // TODO: Implementovat Google Cloud Vision API
            console.log('Google Vision not yet implemented, using simulation...');
            return await this._analyzeWithSimulation(imageData, options);
        } catch (error) {
            console.error('Google Vision API error:', error);
            return await this._analyzeWithSimulation(imageData, options);
        }
    }

    /**
     * Inteligentní simulace - pro demo bez API klíče
     */
    async _analyzeWithSimulation(imageData, options) {
        console.log('🎭 Using intelligent simulation...');

        // Simulovat zpracování
        await this._simulateProcessingTime(1500, 2500);

        // Náhodně vybrat realistický objekt
        const objects = Object.values(this.repairDatabase);
        if (objects.length === 0) {
            throw new Error('No repair data available');
        }

        const randomObject = objects[Math.floor(Math.random() * objects.length)];
        const randomIssue = randomObject.issues[Math.floor(Math.random() * randomObject.issues.length)];

        return {
            analysisId: this._generateId(),
            timestamp: new Date().toISOString(),
            provider: 'simulation',
            detection: {
                object: {
                    id: randomObject.name.toLowerCase().replace(/ /g, '-'),
                    name: randomObject.name,
                    category: randomObject.category,
                    confidence: this._randomConfidence(0.75, 0.95)
                },
                issue: {
                    id: randomIssue.id,
                    name: randomIssue.name,
                    description: randomIssue.description,
                    confidence: this._randomConfidence(0.80, 0.98),
                    riskScore: randomIssue.riskScore
                }
            },
            recommendations: {
                difficulty: randomIssue.difficulty,
                timeEstimate: randomIssue.timeEstimate,
                requiredTools: randomIssue.tools || [],
                steps: randomIssue.steps || [],
                safetyWarnings: this._generateSafetyWarnings(randomIssue.riskScore)
            }
        };
    }

    /**
     * Vytvořit prompt pro AI analýzu
     */
    _createAnalysisPrompt() {
        const categories = Object.keys(this.repairDatabase).join(', ');

        return {
            system: `Jsi expert na diagnostiku domácích závad. Analyzuj obrázek a identifikuj:
1. Typ objektu (např. kohoutek, WC, zásuvka, dveře)
2. Konkrétní problém/závadu
3. Závažnost a riziko
4. Doporučené kroky k opravě

Vrať odpověď ve formátu JSON:
{
  "object": { "name": "...", "category": "...", "confidence": 0.95 },
  "issue": { "name": "...", "description": "...", "confidence": 0.90, "riskScore": 1-10 },
  "recommendations": { "difficulty": "Nízká/Střední/Vysoká", "timeEstimate": "15 min", "requiredTools": ["..."], "safetyWarnings": ["..."] }
}

Dostupné kategorie: ${categories}`,
            user: 'Analyzuj tento obrázek a identifikuj závadu. Buď co nejpřesnější.'
        };
    }

    /**
     * Formátovat výsledek analýzy do jednotného formátu
     */
    _formatAnalysisResult(aiResponse) {
        return {
            analysisId: this._generateId(),
            timestamp: new Date().toISOString(),
            provider: this.provider,
            detection: {
                object: {
                    id: aiResponse.object.name.toLowerCase().replace(/ /g, '-'),
                    name: aiResponse.object.name,
                    category: aiResponse.object.category || 'ostatní',
                    confidence: aiResponse.object.confidence || 0.5
                },
                issue: {
                    id: aiResponse.issue.name.toLowerCase().replace(/ /g, '-'),
                    name: aiResponse.issue.name,
                    description: aiResponse.issue.description,
                    confidence: aiResponse.issue.confidence || 0.5,
                    riskScore: aiResponse.issue.riskScore || 5
                }
            },
            recommendations: aiResponse.recommendations || {}
        };
    }

    /**
     * Generovat bezpečnostní varování podle rizika
     */
    _generateSafetyWarnings(riskScore) {
        const warnings = [];

        if (riskScore >= 8) {
            warnings.push('⚠️ VYSOKÉ RIZIKO! Doporučujeme konzultaci s odborníkem.');
            warnings.push('Před prací vypněte hlavní přívod (elektřina/voda/plyn).');
        } else if (riskScore >= 5) {
            warnings.push('⚠️ Buďte opatrní a dodržujte bezpečnostní pokyny.');
            warnings.push('Pokud si nejste jisti, konzultujte s odborníkem.');
        } else {
            warnings.push('Dodržujte základní bezpečnostní pravidla.');
        }

        return warnings;
    }

    /**
     * Pomocné funkce
     */
    _generateId() {
        return `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    _randomConfidence(min, max) {
        return Math.random() * (max - min) + min;
    }

    _simulateProcessingTime(min, max) {
        const delay = Math.random() * (max - min) + min;
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}

// Export singleton instance
module.exports = new AIAnalyzer();
