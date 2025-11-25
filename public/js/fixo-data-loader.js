/**
 * FIXO Data Loader
 * Loads all data from external files or inline fallbacks
 */

// Global namespace for FIXO data
window.FIXO = window.FIXO || {};

// Initialize data from global variables set by external scripts
window.FIXO.initData = function() {
    // Languages (from languages.js or inline)
    window.FIXO.languages = typeof FIXO_LANGUAGES !== 'undefined' ? FIXO_LANGUAGES : [];

    // Translations (from translations.js or inline)
    window.FIXO.originalTexts = typeof FIXO_ORIGINAL_TEXTS !== 'undefined' ? FIXO_ORIGINAL_TEXTS : {};
    window.FIXO.translations = typeof FIXO_TRANSLATIONS !== 'undefined' ? FIXO_TRANSLATIONS : {};

    // Repair database (from repair-database.js or inline)
    window.FIXO.repairDatabase = typeof FIXO_REPAIR_DATABASE !== 'undefined' ? FIXO_REPAIR_DATABASE : {};
    window.FIXO.categories = typeof FIXO_CATEGORIES !== 'undefined' ? FIXO_CATEGORIES : [];

    console.log('FIXO data initialized:', {
        languages: window.FIXO.languages.length,
        translations: Object.keys(window.FIXO.translations).length,
        repairs: Object.keys(window.FIXO.repairDatabase).length,
        categories: window.FIXO.categories.length
    });

    return window.FIXO;
};

// Helper to get translation
window.FIXO.t = function(key, lang) {
    lang = lang || 'cs';
    const translations = window.FIXO.translations[lang] || window.FIXO.translations.cs || window.FIXO.originalTexts;
    return translations[key] || window.FIXO.originalTexts[key] || key;
};

// Helper to get repair by id
window.FIXO.getRepair = function(id) {
    return window.FIXO.repairDatabase[id] || null;
};

// Helper to get repairs by category
window.FIXO.getRepairsByCategory = function(category) {
    if (category === 'all') {
        return window.FIXO.repairDatabase;
    }
    const filtered = {};
    Object.entries(window.FIXO.repairDatabase).forEach(([key, value]) => {
        if (value.category === category) {
            filtered[key] = value;
        }
    });
    return filtered;
};

// API configuration
window.FIXO.API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : '';  // Empty for GitHub Pages (uses relative paths to JSON)

// Fetch data from API (for backend mode)
window.FIXO.fetchFromAPI = async function(endpoint) {
    try {
        const response = await fetch(`${window.FIXO.API_BASE}/api${endpoint}`);
        if (response.ok) {
            const data = await response.json();
            return data.success ? data.data : data;
        }
    } catch (error) {
        console.warn(`API fetch failed for ${endpoint}:`, error.message);
    }
    return null;
};

// Load data from JSON files (for static hosting)
window.FIXO.loadFromJSON = async function() {
    try {
        const [languagesRes, translationsRes, repairsRes] = await Promise.all([
            fetch('/data/languages.json').catch(() => null),
            fetch('/data/translations.json').catch(() => null),
            fetch('/data/repairs.json').catch(() => null)
        ]);

        if (languagesRes && languagesRes.ok) {
            const data = await languagesRes.json();
            window.FIXO.languages = data.languages || [];
        }

        if (translationsRes && translationsRes.ok) {
            const data = await translationsRes.json();
            window.FIXO.translations = data || {};
        }

        if (repairsRes && repairsRes.ok) {
            const data = await repairsRes.json();
            window.FIXO.repairDatabase = data.repairs || {};
            window.FIXO.categories = data.categories || [];
        }

        console.log('FIXO JSON data loaded');
        return true;
    } catch (error) {
        console.warn('Failed to load JSON data:', error.message);
        return false;
    }
};

console.log('FIXO Data Loader ready');
