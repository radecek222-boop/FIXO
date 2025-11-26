/**
 * FIXO - API Helper
 * ==================
 * Jednotné funkce pro komunikaci s backendem
 */

// API Configuration
const API_CONFIG = {
    // Pro localhost development (zkusí oba porty)
    LOCAL: window.location.port ? `http://localhost:${window.location.port}` : 'http://localhost:3001',
    // Pro production (Render.com)
    PRODUCTION: 'https://fixo-api.onrender.com',
    // Automatická detekce
    get BASE_URL() {
        // Pokud je to localhost nebo 127.0.0.1, použij LOCAL
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return this.LOCAL;
        }
        // Jinak použij PRODUCTION
        return this.PRODUCTION;
    }
};

/**
 * Analyzovat obrázek pomocí AI
 * @param {string} imageDataUrl - Base64 data URL obrázku
 * @returns {Promise<Object>} Výsledek analýzy
 */
async function analyzeImage(imageDataUrl) {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/api/analyze-base64`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageDataUrl })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Analýza selhala');
        }

        return result.data;
    } catch (error) {
        console.error('API Error (analyzeImage):', error);
        throw error;
    }
}

/**
 * Analyzovat problém z textového popisu
 * @param {string} description - Popis problému
 * @param {string} imageDataUrl - (Volitelně) Base64 data URL obrázku
 * @returns {Promise<Object>} Výsledek analýzy
 */
async function analyzeDescription(description, imageDataUrl = null) {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/api/analyze-description`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description,
                image: imageDataUrl
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Analýza selhala');
        }

        return result.data;
    } catch (error) {
        console.error('API Error (analyzeDescription):', error);
        throw error;
    }
}

/**
 * Načíst databázi oprav
 * @returns {Promise<Object>} Databáze oprav
 */
async function getRepairsDatabase() {
    try {
        const response = await fetch('/data/repairs.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error (getRepairsDatabase):', error);
        throw error;
    }
}

/**
 * Zobrazit notifikaci (mini overlay)
 * @param {string} message - Zpráva
 * @param {string} type - Typ: 'success', 'error', 'warning', 'info'
 * @param {number} duration - Jak dlouho zobrazit (ms), default 3000
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Odstranit existující notifikace
    const existing = document.querySelectorAll('.mini-overlay');
    existing.forEach(el => el.remove());

    // Vytvořit novou notifikaci
    const notification = document.createElement('div');
    notification.className = `mini-overlay ${type}`;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    notification.innerHTML = `
        <div class="mini-overlay-header">
            <div class="mini-overlay-title">
                <i class="fas ${icons[type]}"></i>
                <span>${type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </div>
            <button class="mini-overlay-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="mini-overlay-body">${message}</div>
    `;

    document.body.appendChild(notification);

    // Auto-remove po duration
    if (duration > 0) {
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

/**
 * Zobrazit loading overlay
 * @param {string} message - Zpráva během načítání
 */
function showLoading(message = 'Načítání...') {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="modal modal-sm text-center">
            <div class="modal-body">
                <div style="font-size: 3rem; margin-bottom: 1rem;">
                    <i class="fas fa-spinner fa-spin" style="color: var(--color-primary);"></i>
                </div>
                <p style="font-size: var(--font-size-lg); font-weight: 600;">${message}</p>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

/**
 * Skrýt loading overlay
 */
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.remove();
    }
}

/**
 * Komprese obrázku před odesláním
 * @param {File} file - Soubor obrázku
 * @param {number} maxWidth - Maximální šířka
 * @param {number} quality - Kvalita (0-1)
 * @returns {Promise<string>} Base64 data URL
 */
function compressImage(file, maxWidth = 1920, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Resize pokud je větší než maxWidth
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Konverze na base64
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };

            img.onerror = reject;
            img.src = e.target.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Export pro použití v HTML
window.FIXO_API = {
    config: API_CONFIG,
    analyzeImage,
    analyzeDescription,
    getRepairsDatabase,
    showNotification,
    showLoading,
    hideLoading,
    compressImage
};
