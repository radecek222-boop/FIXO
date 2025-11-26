/**
 * FIXO Smart Analyzer
 * Inteligentní systém pro analýzu obrázků s učením
 *
 * Komponenty:
 * 1. ImageProcessor - komprese a optimalizace obrázků
 * 2. ImageHasher - perceptual hashing pro podobnost
 * 3. LocalCache - IndexedDB storage
 * 4. LocalClassifier - TensorFlow.js klasifikátor
 * 5. EmbeddingStore - vector similarity search
 * 6. SmartAnalyzer - orchestrátor
 */

// ============================================
// 1. IMAGE PROCESSOR - Komprese a optimalizace
// ============================================
class ImageProcessor {
    constructor(options = {}) {
        this.maxWidth = options.maxWidth || 512;      // Max šířka pro uložení
        this.maxHeight = options.maxHeight || 512;    // Max výška pro uložení
        this.thumbnailSize = options.thumbnailSize || 64;  // Pro hash
        this.quality = options.quality || 0.7;        // WebP kvalita (0-1)
        this.modelInputSize = options.modelInputSize || 224; // Pro TF model
    }

    /**
     * Komprimuje obrázek pro uložení
     * @param {string} base64Image - Base64 encoded obrázek
     * @returns {Promise<{compressed: string, thumbnail: string, dimensions: object}>}
     */
    async compress(base64Image) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                try {
                    // Vypočítat nové rozměry s zachováním poměru stran
                    const { width, height } = this._calculateDimensions(
                        img.width, img.height, this.maxWidth, this.maxHeight
                    );

                    // Vytvořit komprimovaný obrázek
                    const compressed = this._resizeAndCompress(img, width, height, this.quality);

                    // Vytvořit thumbnail pro hashing
                    const thumbnail = this._resizeAndCompress(
                        img, this.thumbnailSize, this.thumbnailSize, 0.6, true
                    );

                    // Vytvořit vstup pro model (224x224)
                    const modelInput = this._resizeAndCompress(
                        img, this.modelInputSize, this.modelInputSize, 0.8, true
                    );

                    resolve({
                        compressed,
                        thumbnail,
                        modelInput,
                        dimensions: {
                            original: { width: img.width, height: img.height },
                            compressed: { width, height }
                        },
                        savings: this._calculateSavings(base64Image, compressed)
                    });
                } catch (error) {
                    reject(error);
                }
            };
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = base64Image;
        });
    }

    /**
     * Rychlá komprese pro okamžité použití
     */
    async quickCompress(base64Image, maxSize = 256) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const { width, height } = this._calculateDimensions(
                    img.width, img.height, maxSize, maxSize
                );
                resolve(this._resizeAndCompress(img, width, height, 0.6));
            };
            img.onerror = reject;
            img.src = base64Image;
        });
    }

    _calculateDimensions(origWidth, origHeight, maxWidth, maxHeight) {
        let width = origWidth;
        let height = origHeight;

        if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
        }
        if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
        }

        return { width: Math.round(width), height: Math.round(height) };
    }

    _resizeAndCompress(img, width, height, quality, square = false) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (square) {
            // Pro čtvercové obrázky (thumbnail, model input) - center crop
            canvas.width = width;
            canvas.height = height;

            const scale = Math.max(width / img.width, height / img.height);
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;
            const offsetX = (width - scaledWidth) / 2;
            const offsetY = (height - scaledHeight) / 2;

            ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
        } else {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
        }

        // Preferovat WebP, fallback na JPEG
        const webpSupported = canvas.toDataURL('image/webp').startsWith('data:image/webp');
        const format = webpSupported ? 'image/webp' : 'image/jpeg';

        return canvas.toDataURL(format, quality);
    }

    _calculateSavings(original, compressed) {
        const originalSize = original.length * 0.75; // Base64 overhead
        const compressedSize = compressed.length * 0.75;
        const savedBytes = originalSize - compressedSize;
        const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

        return {
            originalKB: Math.round(originalSize / 1024),
            compressedKB: Math.round(compressedSize / 1024),
            savedKB: Math.round(savedBytes / 1024),
            savedPercent: parseFloat(savedPercent)
        };
    }
}

// ============================================
// 2. IMAGE HASHER - Perceptual Hashing
// ============================================
class ImageHasher {
    constructor(hashSize = 16) {
        this.hashSize = hashSize; // 16x16 = 256 bit hash
    }

    /**
     * Vytvoří perceptual hash z obrázku
     * Používá dHash (difference hash) algoritmus
     */
    async hash(base64Image) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                try {
                    const hash = this._computeDHash(img);
                    resolve(hash);
                } catch (error) {
                    reject(error);
                }
            };
            img.onerror = reject;
            img.src = base64Image;
        });
    }

    /**
     * Porovná dva hashe a vrátí podobnost (0-1)
     */
    compare(hash1, hash2) {
        if (hash1.length !== hash2.length) return 0;

        let matches = 0;
        for (let i = 0; i < hash1.length; i++) {
            if (hash1[i] === hash2[i]) matches++;
        }

        return matches / hash1.length;
    }

    /**
     * Hammingova vzdálenost mezi dvěma hashi
     */
    hammingDistance(hash1, hash2) {
        if (hash1.length !== hash2.length) return Infinity;

        let distance = 0;
        for (let i = 0; i < hash1.length; i++) {
            if (hash1[i] !== hash2[i]) distance++;
        }

        return distance;
    }

    _computeDHash(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Resize na hashSize+1 x hashSize (potřebujeme porovnat sousední pixely)
        const width = this.hashSize + 1;
        const height = this.hashSize;
        canvas.width = width;
        canvas.height = height;

        // Nakreslit grayscale
        ctx.filter = 'grayscale(100%)';
        ctx.drawImage(img, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;

        // Vytvořit hash porovnáním sousedních pixelů
        let hash = '';
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width - 1; x++) {
                const leftIdx = (y * width + x) * 4;
                const rightIdx = (y * width + x + 1) * 4;

                // Porovnat jas (použijeme R kanál, protože je grayscale)
                hash += pixels[leftIdx] > pixels[rightIdx] ? '1' : '0';
            }
        }

        return hash;
    }

    /**
     * Převede binární hash na hex string pro úspornější uložení
     */
    toHex(binaryHash) {
        let hex = '';
        for (let i = 0; i < binaryHash.length; i += 4) {
            const nibble = binaryHash.substr(i, 4);
            hex += parseInt(nibble, 2).toString(16);
        }
        return hex;
    }

    /**
     * Převede hex zpět na binární
     */
    fromHex(hexHash) {
        let binary = '';
        for (let i = 0; i < hexHash.length; i++) {
            binary += parseInt(hexHash[i], 16).toString(2).padStart(4, '0');
        }
        return binary;
    }
}

// ============================================
// 3. LOCAL CACHE - IndexedDB Storage
// ============================================
class LocalCache {
    constructor(dbName = 'FIXO_Cache', version = 2) {
        this.dbName = dbName;
        this.version = version;  // Verze 2 - přidán feedback store
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => reject(request.error);

            request.onsuccess = () => {
                this.db = request.result;
                resolve(this);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Store pro cached analýzy
                if (!db.objectStoreNames.contains('analyses')) {
                    const analysesStore = db.createObjectStore('analyses', { keyPath: 'id', autoIncrement: true });
                    analysesStore.createIndex('hash', 'hash', { unique: false });
                    analysesStore.createIndex('timestamp', 'timestamp', { unique: false });
                    analysesStore.createIndex('category', 'category', { unique: false });
                }

                // Store pro embeddings (pro vector search)
                if (!db.objectStoreNames.contains('embeddings')) {
                    const embeddingsStore = db.createObjectStore('embeddings', { keyPath: 'id', autoIncrement: true });
                    embeddingsStore.createIndex('analysisId', 'analysisId', { unique: false });
                }

                // Store pro model data
                if (!db.objectStoreNames.contains('model')) {
                    db.createObjectStore('model', { keyPath: 'key' });
                }

                // Store pro statistiky
                if (!db.objectStoreNames.contains('stats')) {
                    db.createObjectStore('stats', { keyPath: 'key' });
                }

                // Store pro uživatelský feedback (v2)
                if (!db.objectStoreNames.contains('feedback')) {
                    const feedbackStore = db.createObjectStore('feedback', { keyPath: 'id', autoIncrement: true });
                    feedbackStore.createIndex('imageHash', 'imageHash', { unique: false });
                    feedbackStore.createIndex('correctedCategory', 'correctedCategory', { unique: false });
                    feedbackStore.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
        });
    }

    /**
     * Uloží výsledek analýzy s komprimovaným obrázkem
     */
    async saveAnalysis(data) {
        const store = this._getStore('analyses', 'readwrite');
        const record = {
            hash: data.hash,
            hashHex: data.hashHex,
            thumbnail: data.thumbnail,
            result: data.result,
            category: data.result?.object?.category || 'unknown',
            timestamp: Date.now(),
            usageCount: 1,
            lastUsed: Date.now()
        };

        return new Promise((resolve, reject) => {
            const request = store.add(record);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Najde podobnou analýzu podle hashe
     */
    async findByHash(hash, threshold = 0.85) {
        const store = this._getStore('analyses', 'readonly');
        const hasher = new ImageHasher();

        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => {
                const analyses = request.result;
                let bestMatch = null;
                let bestSimilarity = 0;

                for (const analysis of analyses) {
                    const similarity = hasher.compare(hash, analysis.hash);
                    if (similarity > bestSimilarity && similarity >= threshold) {
                        bestSimilarity = similarity;
                        bestMatch = analysis;
                    }
                }

                if (bestMatch) {
                    // Aktualizovat usage statistiky
                    this._updateUsage(bestMatch.id);
                }

                resolve(bestMatch ? { ...bestMatch, similarity: bestSimilarity } : null);
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Získá všechny analýzy pro danou kategorii
     */
    async getByCategory(category) {
        const store = this._getStore('analyses', 'readonly');
        const index = store.index('category');

        return new Promise((resolve, reject) => {
            const request = index.getAll(category);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Získá statistiky cache
     */
    async getStats() {
        const store = this._getStore('analyses', 'readonly');

        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => {
                const analyses = request.result;
                const categories = {};
                let totalSize = 0;

                for (const a of analyses) {
                    const cat = a.category || 'unknown';
                    categories[cat] = (categories[cat] || 0) + 1;
                    totalSize += (a.thumbnail?.length || 0) * 0.75;
                }

                resolve({
                    totalAnalyses: analyses.length,
                    categories,
                    totalSizeKB: Math.round(totalSize / 1024),
                    oldestTimestamp: analyses.length > 0
                        ? Math.min(...analyses.map(a => a.timestamp))
                        : null
                });
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Vyčistí staré záznamy (starší než maxAge dnů)
     */
    async cleanup(maxAgeDays = 30, maxEntries = 500) {
        const store = this._getStore('analyses', 'readwrite');
        const maxAge = Date.now() - (maxAgeDays * 24 * 60 * 60 * 1000);

        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = async () => {
                const analyses = request.result;
                let deleted = 0;

                // Smazat staré záznamy
                for (const a of analyses) {
                    if (a.timestamp < maxAge) {
                        await this._delete('analyses', a.id);
                        deleted++;
                    }
                }

                // Pokud je stále moc záznamů, smazat nejméně používané
                if (analyses.length - deleted > maxEntries) {
                    const sorted = analyses
                        .filter(a => a.timestamp >= maxAge)
                        .sort((a, b) => a.usageCount - b.usageCount);

                    const toDelete = sorted.slice(0, sorted.length - maxEntries);
                    for (const a of toDelete) {
                        await this._delete('analyses', a.id);
                        deleted++;
                    }
                }

                resolve({ deleted });
            };
            request.onerror = () => reject(request.error);
        });
    }

    async _updateUsage(id) {
        const store = this._getStore('analyses', 'readwrite');
        return new Promise((resolve) => {
            const request = store.get(id);
            request.onsuccess = () => {
                const record = request.result;
                if (record) {
                    record.usageCount = (record.usageCount || 0) + 1;
                    record.lastUsed = Date.now();
                    store.put(record);
                }
                resolve();
            };
        });
    }

    async _delete(storeName, id) {
        const store = this._getStore(storeName, 'readwrite');
        return new Promise((resolve, reject) => {
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    _getStore(name, mode) {
        return this.db.transaction(name, mode).objectStore(name);
    }
}

// ============================================
// 4. LOCAL CLASSIFIER - TensorFlow.js
// ============================================
class LocalClassifier {
    constructor() {
        this.model = null;
        this.labels = null;
        this.isLoaded = false;
        this.isLoading = false;

        // Kategorie závad pro FIXO
        this.categories = [
            'voda_protekajici_kohoutek',
            'voda_ucpany_odpad',
            'voda_prasklá_trubka',
            'elektrina_nefungujici_zasuvka',
            'elektrina_blikajici_svetlo',
            'elektrina_jistic',
            'topeni_netesny_radiator',
            'topeni_studeny_radiator',
            'okna_tesneni',
            'okna_klika',
            'dvere_zamek',
            'dvere_panty',
            'spotrebice_pracka',
            'spotrebice_lednice',
            'spotrebice_mycka',
            'nabytek_skrin',
            'nabytek_zidle',
            'steny_prasklina',
            'steny_plisen',
            'podlaha_skripani',
            'podlaha_poskozeni',
            'other'
        ];
    }

    /**
     * Načte nebo vytvoří model
     */
    async load() {
        if (this.isLoaded || this.isLoading) return;
        this.isLoading = true;

        try {
            // Zkontrolovat, zda je TensorFlow.js k dispozici
            if (typeof tf === 'undefined') {
                console.warn('⚠️ TensorFlow.js není k dispozici, pokračuji bez lokálního modelu');
                this.isLoaded = false;
                this.isLoading = false;
                return;
            }

            console.log('📦 TensorFlow.js detekován, načítám model...');

            // Zkusit načíst uložený model z IndexedDB
            try {
                this.model = await tf.loadLayersModel('indexeddb://fixo-classifier');
                console.log('✅ Model načten z IndexedDB');
                this.isLoaded = true;
            } catch (e) {
                // Model neexistuje, vytvoříme nový na základě MobileNet
                console.log('🔧 Vytvářím nový model...');
                await this._createModel();
                this.isLoaded = true;
            }
        } catch (error) {
            console.error('❌ Chyba při načítání modelu:', error);
            this.isLoaded = false;
        }

        this.isLoading = false;
    }

    async _createModel() {
        // Jednoduchý CNN model pro klasifikaci
        this.model = tf.sequential({
            layers: [
                // Input: 224x224x3
                tf.layers.conv2d({
                    inputShape: [224, 224, 3],
                    filters: 32,
                    kernelSize: 3,
                    activation: 'relu',
                    padding: 'same'
                }),
                tf.layers.maxPooling2d({ poolSize: 2 }),

                tf.layers.conv2d({
                    filters: 64,
                    kernelSize: 3,
                    activation: 'relu',
                    padding: 'same'
                }),
                tf.layers.maxPooling2d({ poolSize: 2 }),

                tf.layers.conv2d({
                    filters: 128,
                    kernelSize: 3,
                    activation: 'relu',
                    padding: 'same'
                }),
                tf.layers.maxPooling2d({ poolSize: 2 }),

                tf.layers.flatten(),
                tf.layers.dropout({ rate: 0.5 }),
                tf.layers.dense({ units: 256, activation: 'relu' }),
                tf.layers.dropout({ rate: 0.3 }),
                tf.layers.dense({ units: this.categories.length, activation: 'softmax' })
            ]
        });

        this.model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        });

        // Uložit model
        await this.model.save('indexeddb://fixo-classifier');
        console.log('✅ Model vytvořen a uložen');
    }

    /**
     * Klasifikuje obrázek
     * @returns {Promise<{category: string, confidence: number, allPredictions: array}>}
     */
    async classify(base64Image) {
        if (!this.isLoaded) {
            await this.load();
        }

        if (!this.model) {
            return null;
        }

        try {
            const tensor = await this._imageToTensor(base64Image);
            const predictions = await this.model.predict(tensor).data();
            tensor.dispose();

            // Najít top predikce
            const results = this.categories.map((cat, i) => ({
                category: cat,
                confidence: predictions[i]
            })).sort((a, b) => b.confidence - a.confidence);

            return {
                category: results[0].category,
                confidence: results[0].confidence,
                allPredictions: results.slice(0, 5)
            };
        } catch (error) {
            console.error('Chyba při klasifikaci:', error);
            return null;
        }
    }

    /**
     * Přidá nový trénovací příklad
     */
    async addTrainingExample(base64Image, category) {
        if (!this.isLoaded) await this.load();

        // Uložit příklad do fronty pro batch training
        const cache = new LocalCache();
        await cache.init();

        const store = cache._getStore('model', 'readwrite');
        const examples = await new Promise((resolve) => {
            const req = store.get('trainingQueue');
            req.onsuccess = () => resolve(req.result?.data || []);
        });

        examples.push({
            image: base64Image,
            category,
            timestamp: Date.now()
        });

        // Uložit
        await new Promise((resolve) => {
            store.put({ key: 'trainingQueue', data: examples });
            resolve();
        });

        // Pokud máme dost příkladů, spustit trénink
        if (examples.length >= 10) {
            await this._trainOnExamples(examples);
        }

        return examples.length;
    }

    async _trainOnExamples(examples) {
        if (!this.model) return;

        console.log(`🎓 Trénuji na ${examples.length} příkladech...`);

        const xs = [];
        const ys = [];

        for (const ex of examples) {
            try {
                const tensor = await this._imageToTensor(ex.image);
                xs.push(tensor);

                // One-hot encoding
                const labelIndex = this.categories.indexOf(ex.category);
                const oneHot = new Array(this.categories.length).fill(0);
                oneHot[labelIndex >= 0 ? labelIndex : this.categories.length - 1] = 1;
                ys.push(oneHot);
            } catch (e) {
                console.error('Chyba při přípravě příkladu:', e);
            }
        }

        if (xs.length === 0) return;

        const xsTensor = tf.stack(xs.map(t => t.squeeze()));
        const ysTensor = tf.tensor2d(ys);

        // Trénink
        await this.model.fit(xsTensor, ysTensor, {
            epochs: 5,
            batchSize: Math.min(examples.length, 8),
            shuffle: true,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}`);
                }
            }
        });

        // Vyčistit
        xs.forEach(t => t.dispose());
        xsTensor.dispose();
        ysTensor.dispose();

        // Uložit model
        await this.model.save('indexeddb://fixo-classifier');

        // Vyčistit frontu
        const cache = new LocalCache();
        await cache.init();
        const store = cache._getStore('model', 'readwrite');
        store.put({ key: 'trainingQueue', data: [] });

        console.log('✅ Trénink dokončen');
    }

    async _imageToTensor(base64Image) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                try {
                    // Resize na 224x224 a normalizovat
                    const tensor = tf.browser.fromPixels(img)
                        .resizeBilinear([224, 224])
                        .toFloat()
                        .div(255.0)
                        .expandDims(0);
                    resolve(tensor);
                } catch (e) {
                    reject(e);
                }
            };
            img.onerror = reject;
            img.src = base64Image;
        });
    }

    /**
     * Extrahuje embedding (feature vector) z obrázku
     */
    async getEmbedding(base64Image) {
        if (!this.isLoaded) await this.load();
        if (!this.model) return null;

        try {
            const tensor = await this._imageToTensor(base64Image);

            // Použít předposlední vrstvu jako embedding
            const embeddingModel = tf.model({
                inputs: this.model.input,
                outputs: this.model.layers[this.model.layers.length - 3].output
            });

            const embedding = await embeddingModel.predict(tensor).data();
            tensor.dispose();

            return Array.from(embedding);
        } catch (error) {
            console.error('Chyba při extrakci embeddingu:', error);
            return null;
        }
    }
}

// ============================================
// 5. EMBEDDING STORE - Vector Similarity
// ============================================
class EmbeddingStore {
    constructor(cache) {
        this.cache = cache;
    }

    /**
     * Uloží embedding s referencí na analýzu
     */
    async save(embedding, analysisId) {
        const store = this.cache._getStore('embeddings', 'readwrite');

        return new Promise((resolve, reject) => {
            const request = store.add({
                embedding,
                analysisId,
                timestamp: Date.now()
            });
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Najde nejpodobnější embeddingy
     */
    async findSimilar(queryEmbedding, topK = 5, threshold = 0.7) {
        const store = this.cache._getStore('embeddings', 'readonly');

        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => {
                const embeddings = request.result;

                // Vypočítat podobnosti
                const similarities = embeddings.map(e => ({
                    ...e,
                    similarity: this._cosineSimilarity(queryEmbedding, e.embedding)
                }));

                // Seřadit a filtrovat
                const results = similarities
                    .filter(s => s.similarity >= threshold)
                    .sort((a, b) => b.similarity - a.similarity)
                    .slice(0, topK);

                resolve(results);
            };
            request.onerror = () => reject(request.error);
        });
    }

    _cosineSimilarity(a, b) {
        if (!a || !b || a.length !== b.length) return 0;

        let dotProduct = 0;
        let normA = 0;
        let normB = 0;

        for (let i = 0; i < a.length; i++) {
            dotProduct += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }

        const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
        return magnitude === 0 ? 0 : dotProduct / magnitude;
    }
}

// ============================================
// 6. FEEDBACK STORE - Učení od uživatelů
// ============================================
class FeedbackStore {
    constructor(cache) {
        this.cache = cache;
        this.FEEDBACK_STORE = 'feedback';
        this.MIN_VOTES_FOR_OVERRIDE = 3;      // Minimální počet hlasů pro přepsání AI
        this.SIMILARITY_THRESHOLD = 0.80;      // Práh podobnosti pro aplikaci feedbacku
        this.CONFIDENCE_BOOST_PER_VOTE = 0.05; // Zvýšení confidence za každý hlas
    }

    /**
     * Inicializace - přidá feedback store do IndexedDB pokud neexistuje
     */
    async init() {
        // Feedback store se vytvoří při upgradu databáze
        // Zde jen ověříme, že existuje
        return this;
    }

    /**
     * Uloží uživatelský feedback (opravu)
     * @param {object} params
     * @param {string} params.imageHash - Hash obrázku
     * @param {object} params.originalResult - Původní výsledek od AI
     * @param {object} params.correctedResult - Opravený výsledek od uživatele
     * @param {string} params.thumbnail - Komprimovaný thumbnail
     */
    async submitFeedback({ imageHash, originalResult, correctedResult, thumbnail, embedding }) {
        const db = this.cache.db;

        // Vytvořit feedback store pokud neexistuje
        if (!db.objectStoreNames.contains(this.FEEDBACK_STORE)) {
            console.warn('Feedback store neexistuje, bude vytvořen při další inicializaci');
            // Uložit do localStorage jako fallback
            this._saveFeedbackToLocalStorage({ imageHash, originalResult, correctedResult, thumbnail, embedding });
            return;
        }

        const store = db.transaction(this.FEEDBACK_STORE, 'readwrite').objectStore(this.FEEDBACK_STORE);

        const feedback = {
            imageHash,
            originalCategory: originalResult?.object?.category || 'unknown',
            originalIssue: originalResult?.issue?.name || 'unknown',
            correctedCategory: correctedResult.object?.category,
            correctedObject: correctedResult.object?.name,
            correctedIssue: correctedResult.issue?.name,
            correctedResult: correctedResult,
            thumbnail,
            embedding,
            timestamp: Date.now(),
            weight: 1  // Základní váha, může být zvýšena pro ověřené uživatele
        };

        return new Promise((resolve, reject) => {
            const request = store.add(feedback);
            request.onsuccess = () => {
                console.log('✅ Feedback uložen:', feedback.correctedIssue);
                resolve(request.result);
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Fallback ukládání do localStorage
     */
    _saveFeedbackToLocalStorage(feedback) {
        try {
            const existing = JSON.parse(localStorage.getItem('fixo_feedback') || '[]');
            existing.push({ ...feedback, timestamp: Date.now() });
            // Limit na 100 záznamů
            if (existing.length > 100) existing.shift();
            localStorage.setItem('fixo_feedback', JSON.stringify(existing));
            console.log('✅ Feedback uložen do localStorage');
        } catch (e) {
            console.error('Chyba při ukládání feedbacku:', e);
        }
    }

    /**
     * Najde relevantní feedbacky pro daný obrázek
     * @param {string} imageHash - Hash obrázku
     * @param {array} embedding - Embedding obrázku (optional)
     * @returns {Promise<{feedbacks: array, consensus: object|null}>}
     */
    async findRelevantFeedback(imageHash, embedding = null) {
        const hasher = new ImageHasher();
        let allFeedback = [];

        // Načíst z IndexedDB
        try {
            const db = this.cache.db;
            if (db.objectStoreNames.contains(this.FEEDBACK_STORE)) {
                const store = db.transaction(this.FEEDBACK_STORE, 'readonly').objectStore(this.FEEDBACK_STORE);
                allFeedback = await new Promise((resolve) => {
                    const req = store.getAll();
                    req.onsuccess = () => resolve(req.result || []);
                    req.onerror = () => resolve([]);
                });
            }
        } catch (e) {
            console.error('Chyba při čtení feedbacku z IndexedDB:', e);
        }

        // Načíst z localStorage jako fallback
        try {
            const localFeedback = JSON.parse(localStorage.getItem('fixo_feedback') || '[]');
            allFeedback = [...allFeedback, ...localFeedback];
        } catch (e) {}

        if (allFeedback.length === 0) {
            return { feedbacks: [], consensus: null };
        }

        // Najít podobné feedbacky podle hash
        const relevantFeedback = [];

        for (const fb of allFeedback) {
            let similarity = 0;

            // Porovnat hash
            if (fb.imageHash && imageHash) {
                similarity = hasher.compare(imageHash, fb.imageHash);
            }

            // Pokud máme embedding, použít i ten
            if (embedding && fb.embedding && similarity < this.SIMILARITY_THRESHOLD) {
                const embeddingSimilarity = this._cosineSimilarity(embedding, fb.embedding);
                similarity = Math.max(similarity, embeddingSimilarity);
            }

            if (similarity >= this.SIMILARITY_THRESHOLD) {
                relevantFeedback.push({
                    ...fb,
                    similarity,
                    effectiveWeight: fb.weight * similarity  // Váha upravená podle podobnosti
                });
            }
        }

        // Seřadit podle podobnosti
        relevantFeedback.sort((a, b) => b.similarity - a.similarity);

        // Vypočítat konsenzus
        const consensus = this._calculateConsensus(relevantFeedback);

        return { feedbacks: relevantFeedback, consensus };
    }

    /**
     * Vypočítá konsenzus z feedbacků pomocí váženého hlasování
     */
    _calculateConsensus(feedbacks) {
        if (feedbacks.length === 0) return null;

        // Seskupit podle opravené závady
        const votesByIssue = {};
        let totalWeight = 0;

        for (const fb of feedbacks) {
            const key = `${fb.correctedCategory}::${fb.correctedIssue}`;

            if (!votesByIssue[key]) {
                votesByIssue[key] = {
                    category: fb.correctedCategory,
                    object: fb.correctedObject,
                    issue: fb.correctedIssue,
                    result: fb.correctedResult,
                    votes: 0,
                    totalWeight: 0,
                    avgSimilarity: 0,
                    feedbacks: []
                };
            }

            votesByIssue[key].votes++;
            votesByIssue[key].totalWeight += fb.effectiveWeight;
            votesByIssue[key].avgSimilarity += fb.similarity;
            votesByIssue[key].feedbacks.push(fb);
            totalWeight += fb.effectiveWeight;
        }

        // Najít vítěze
        let winner = null;
        let maxWeight = 0;

        for (const key in votesByIssue) {
            const vote = votesByIssue[key];
            vote.avgSimilarity /= vote.votes;

            if (vote.totalWeight > maxWeight) {
                maxWeight = vote.totalWeight;
                winner = vote;
            }
        }

        if (!winner) return null;

        // Vypočítat confidence na základě hlasování
        const voteConfidence = winner.totalWeight / totalWeight;
        const hasEnoughVotes = winner.votes >= this.MIN_VOTES_FOR_OVERRIDE;

        return {
            ...winner,
            voteConfidence,
            totalVotes: feedbacks.length,
            hasEnoughVotes,
            shouldOverride: hasEnoughVotes && voteConfidence > 0.6,
            confidence: Math.min(0.95, 0.5 + (winner.votes * this.CONFIDENCE_BOOST_PER_VOTE) + (voteConfidence * 0.3))
        };
    }

    _cosineSimilarity(a, b) {
        if (!a || !b || a.length !== b.length) return 0;
        let dot = 0, normA = 0, normB = 0;
        for (let i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }
        const mag = Math.sqrt(normA) * Math.sqrt(normB);
        return mag === 0 ? 0 : dot / mag;
    }

    /**
     * Získá statistiky feedbacku
     */
    async getStats() {
        let allFeedback = [];

        try {
            const db = this.cache.db;
            if (db.objectStoreNames.contains(this.FEEDBACK_STORE)) {
                const store = db.transaction(this.FEEDBACK_STORE, 'readonly').objectStore(this.FEEDBACK_STORE);
                allFeedback = await new Promise((resolve) => {
                    const req = store.getAll();
                    req.onsuccess = () => resolve(req.result || []);
                });
            }
        } catch (e) {}

        try {
            const localFeedback = JSON.parse(localStorage.getItem('fixo_feedback') || '[]');
            allFeedback = [...allFeedback, ...localFeedback];
        } catch (e) {}

        // Statistiky podle kategorií
        const byCategory = {};
        for (const fb of allFeedback) {
            const cat = fb.correctedCategory || 'unknown';
            byCategory[cat] = (byCategory[cat] || 0) + 1;
        }

        return {
            totalFeedbacks: allFeedback.length,
            byCategory,
            oldestFeedback: allFeedback.length > 0
                ? Math.min(...allFeedback.map(f => f.timestamp))
                : null
        };
    }
}

// ============================================
// 7. SMART ANALYZER - Orchestrátor
// ============================================
class SmartAnalyzer {
    constructor(apiUrl = null) {
        this.apiUrl = apiUrl;
        this.imageProcessor = new ImageProcessor();
        this.imageHasher = new ImageHasher();
        this.cache = new LocalCache();
        this.classifier = new LocalClassifier();
        this.embeddingStore = null;
        this.feedbackStore = null;

        // Uložit poslední analýzu pro feedback
        this._lastAnalysis = null;

        this.isInitialized = false;
        this.stats = {
            cacheHits: 0,
            localClassifications: 0,
            apiCalls: 0,
            feedbackUsed: 0,
            feedbackSubmitted: 0
        };

        // Konfigurace
        this.config = {
            hashSimilarityThreshold: 0.88,    // Práh pro hash match
            embeddingSimilarityThreshold: 0.75, // Práh pro embedding match
            classifierConfidenceThreshold: 0.3, // Práh pro lokální klasifikátor (sníženo pro lepší využití)
            useEmbeddings: true,               // Používat embedding search
            useClassifier: true,               // Používat lokální klasifikátor
            learnFromApi: true,                // Učit se z API odpovědí
            useFeedback: true                  // Používat feedback od uživatelů
        };
    }

    async init() {
        if (this.isInitialized) return this;

        console.log('🚀 Inicializuji SmartAnalyzer...');

        await this.cache.init();
        this.embeddingStore = new EmbeddingStore(this.cache);
        this.feedbackStore = new FeedbackStore(this.cache);

        if (this.config.useClassifier) {
            // Načíst model na pozadí
            this.classifier.load().then(() => {
                console.log('✅ Lokální klasifikátor připraven');
            });
        }

        // Načíst statistiky
        await this._loadStats();

        // Periodicky čistit cache
        this._scheduleCleanup();

        this.isInitialized = true;
        console.log('✅ SmartAnalyzer inicializován');

        return this;
    }

    /**
     * Hlavní metoda pro analýzu obrázku
     * Používá kaskádový přístup: Feedback -> Cache -> Embeddings -> Classifier -> API
     */
    async analyze(base64Image, options = {}) {
        if (!this.isInitialized) await this.init();

        const startTime = Date.now();
        let source = 'unknown';
        let result = null;
        let embedding = null;

        try {
            // 1. Komprimovat a zpracovat obrázek
            console.log('📸 Zpracovávám obrázek...');
            const processed = await this.imageProcessor.compress(base64Image);
            console.log(`📊 Komprese: ${processed.savings.savedPercent}% úspora (${processed.savings.originalKB}KB → ${processed.savings.compressedKB}KB)`);

            // 2. Vypočítat hash
            const hash = await this.imageHasher.hash(processed.thumbnail);
            const hashHex = this.imageHasher.toHex(hash);

            // 2.5 Získat embedding pro feedback lookup
            if (this.classifier.isLoaded) {
                embedding = await this.classifier.getEmbedding(processed.modelInput);
            }

            // 3. NEJPRVE zkontrolovat uživatelský feedback
            if (this.config.useFeedback && this.feedbackStore) {
                console.log('👥 Kontroluji uživatelský feedback...');
                const { consensus } = await this.feedbackStore.findRelevantFeedback(hash, embedding);

                if (consensus && consensus.shouldOverride) {
                    console.log(`✅ Feedback konsenzus! ${consensus.votes} hlasů pro "${consensus.issue}" (${(consensus.voteConfidence * 100).toFixed(1)}% shoda)`);
                    this.stats.feedbackUsed++;
                    source = 'feedback';
                    result = {
                        ...consensus.result,
                        confidence: Math.round(consensus.confidence * 100),
                        _feedbackInfo: {
                            votes: consensus.votes,
                            totalVotes: consensus.totalVotes,
                            voteConfidence: consensus.voteConfidence
                        }
                    };
                }
            }

            // 4. Zkusit najít v cache podle hashe
            if (!result) {
                console.log('🔍 Hledám v cache...');
                const cachedResult = await this.cache.findByHash(hash, this.config.hashSimilarityThreshold);

                if (cachedResult) {
                    console.log(`✅ Cache hit! Podobnost: ${(cachedResult.similarity * 100).toFixed(1)}%`);
                    this.stats.cacheHits++;
                    source = 'cache';
                    result = cachedResult.result;
                }
            }

            // 5. Zkusit embedding similarity search
            if (!result && this.config.useEmbeddings && embedding) {
                console.log('🧠 Hledám podobné embeddingy...');

                const similar = await this.embeddingStore.findSimilar(
                    embedding,
                    3,
                    this.config.embeddingSimilarityThreshold
                );

                if (similar.length > 0) {
                    // Získat analýzu pro nejpodobnější embedding
                    const store = this.cache._getStore('analyses', 'readonly');
                    const analysisRequest = await new Promise((resolve) => {
                        const req = store.get(similar[0].analysisId);
                        req.onsuccess = () => resolve(req.result);
                    });

                    if (analysisRequest) {
                        console.log(`✅ Embedding match! Podobnost: ${(similar[0].similarity * 100).toFixed(1)}%`);
                        source = 'embedding';
                        result = analysisRequest.result;
                    }
                }
            }

            // 6. Zkusit lokální klasifikátor
            if (!result && this.config.useClassifier && this.classifier.isLoaded) {
                console.log('🤖 Zkouším lokální klasifikátor...');
                const classification = await this.classifier.classify(processed.modelInput);

                if (classification && classification.confidence >= this.config.classifierConfidenceThreshold) {
                    console.log(`✅ Lokální klasifikace: ${classification.category} (${(classification.confidence * 100).toFixed(1)}%)`);
                    this.stats.localClassifications++;
                    source = 'classifier';

                    // Převést kategorii na výsledek z databáze
                    result = this._categoryToResult(classification.category, classification.confidence);
                }
            }

            // 7. Fallback na API
            if (!result && this.apiUrl) {
                console.log('🌐 Volám API...');
                this.stats.apiCalls++;
                source = 'api';

                result = await this._callApi(base64Image);

                // Učit se z API odpovědi
                if (result && this.config.learnFromApi) {
                    await this._learnFromResult(processed, hash, hashHex, result);
                }
            }

            // 8. Pokud stále nemáme výsledek, použít simulaci
            if (!result) {
                console.log('⚠️ Používám simulaci...');
                source = 'simulation';
                result = this._getSimulatedResult();
            }

            // Uložit pro možný feedback
            this._lastAnalysis = {
                hash,
                hashHex,
                thumbnail: processed.thumbnail,
                embedding,
                result,
                source,
                timestamp: Date.now()
            };

            const duration = Date.now() - startTime;
            console.log(`⏱️ Analýza dokončena za ${duration}ms (zdroj: ${source})`);

            // Uložit statistiky
            await this._saveStats();

            return {
                ...result,
                _meta: {
                    source,
                    duration,
                    cached: source === 'cache' || source === 'embedding'
                }
            };

        } catch (error) {
            console.error('❌ Chyba při analýze:', error);
            return this._getSimulatedResult();
        }
    }

    async _callApi(base64Image) {
        try {
            const response = await fetch(`${this.apiUrl}/api/analyze-base64`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64Image })
            });

            if (!response.ok) return null;

            const result = await response.json();
            if (!result.success) return null;

            const data = result.data;
            return {
                object: {
                    name: data.detection.object.name,
                    category: data.detection.object.category,
                    icon: this._getCategoryIcon(data.detection.object.category)
                },
                issue: {
                    name: data.detection.issue.name,
                    description: data.detection.issue.description,
                    riskScore: data.detection.issue.riskScore,
                    difficulty: data.detection.issue.difficulty,
                    timeEstimate: data.recommendations.timeEstimate,
                    tools: data.recommendations.tools,
                    steps: data.recommendations.steps,
                    safetyWarnings: data.recommendations.safetyWarnings
                },
                confidence: Math.round(data.detection.object.confidence * 100)
            };
        } catch (error) {
            console.error('API error:', error);
            return null;
        }
    }

    async _learnFromResult(processed, hash, hashHex, result) {
        try {
            // Uložit do cache
            const analysisId = await this.cache.saveAnalysis({
                hash,
                hashHex,
                thumbnail: processed.thumbnail,
                result
            });

            // Uložit embedding
            if (this.classifier.isLoaded) {
                const embedding = await this.classifier.getEmbedding(processed.modelInput);
                if (embedding) {
                    await this.embeddingStore.save(embedding, analysisId);
                }

                // Přidat trénovací příklad
                const category = this._resultToCategory(result);
                await this.classifier.addTrainingExample(processed.modelInput, category);
            }

            console.log('📚 Naučeno z API odpovědi');
        } catch (error) {
            console.error('Chyba při učení:', error);
        }
    }

    _categoryToResult(category, confidence) {
        // Mapování kategorie na výsledek z repairDatabase
        // Toto je zjednodušená verze - v produkci by měla být propracovanější
        const categoryMap = {
            'voda_protekajici_kohoutek': { object: 'Kohoutek', issue: 'Protékající kohoutek' },
            'voda_ucpany_odpad': { object: 'Odpad', issue: 'Ucpaný odpad' },
            'elektrina_nefungujici_zasuvka': { object: 'Zásuvka', issue: 'Nefungující zásuvka' },
            'elektrina_blikajici_svetlo': { object: 'Světlo', issue: 'Blikající světlo' },
            'topeni_netesny_radiator': { object: 'Radiátor', issue: 'Netěsný radiátor' },
            // ... další mapování
        };

        const mapping = categoryMap[category] || { object: 'Neznámý objekt', issue: 'Neznámá závada' };

        return {
            object: {
                name: mapping.object,
                category: category.split('_')[0],
                icon: this._getCategoryIcon(category.split('_')[0])
            },
            issue: {
                name: mapping.issue,
                description: 'Závada rozpoznána lokálním klasifikátorem',
                riskScore: 5,
                difficulty: 'střední',
                timeEstimate: '30-60 minut',
                tools: ['Základní nářadí'],
                steps: ['Prohlédněte závadu', 'Připravte nástroje', 'Proveďte opravu'],
                safetyWarnings: ['Dodržujte bezpečnostní pokyny']
            },
            confidence: Math.round(confidence * 100)
        };
    }

    _resultToCategory(result) {
        // Převést výsledek na kategorii pro trénink
        const category = result.object?.category || 'other';
        const issue = result.issue?.name?.toLowerCase() || '';

        if (category === 'voda') {
            if (issue.includes('kohoutek') || issue.includes('kapání')) return 'voda_protekajici_kohoutek';
            if (issue.includes('odpad') || issue.includes('ucpan')) return 'voda_ucpany_odpad';
        }
        if (category === 'elektrina' || category === 'elektřina') {
            if (issue.includes('zásuvka')) return 'elektrina_nefungujici_zasuvka';
            if (issue.includes('světlo') || issue.includes('blikání')) return 'elektrina_blikajici_svetlo';
        }
        // ... další mapování

        return 'other';
    }

    _getCategoryIcon(category) {
        const icons = {
            voda: 'fa-tint',
            elektrina: 'fa-bolt',
            topeni: 'fa-thermometer-half',
            okna: 'fa-window-maximize',
            dvere: 'fa-door-closed',
            spotrebice: 'fa-blender',
            nabytek: 'fa-couch',
            steny: 'fa-home',
            podlaha: 'fa-th-large'
        };
        return icons[category] || 'fa-tools';
    }

    _getSimulatedResult() {
        // Vrátí simulovaný výsledek (fallback)
        return {
            object: {
                name: 'Detekovaný objekt',
                category: 'voda',
                icon: 'fa-tint'
            },
            issue: {
                name: 'Obecná závada',
                description: 'Systém nemohl přesně určit závadu. Doporučujeme ruční kontrolu.',
                riskScore: 5,
                difficulty: 'střední',
                timeEstimate: '30-60 minut',
                tools: ['Základní nářadí'],
                steps: ['Prohlédněte objekt', 'Identifikujte problém', 'Kontaktujte odborníka'],
                safetyWarnings: ['Buďte opatrní při práci']
            },
            confidence: 50
        };
    }

    async _loadStats() {
        try {
            const store = this.cache._getStore('stats', 'readonly');
            const result = await new Promise((resolve) => {
                const req = store.get('analyzerStats');
                req.onsuccess = () => resolve(req.result?.data || {});
            });
            this.stats = { ...this.stats, ...result };
        } catch (e) {}
    }

    async _saveStats() {
        try {
            const store = this.cache._getStore('stats', 'readwrite');
            store.put({ key: 'analyzerStats', data: this.stats });
        } catch (e) {}
    }

    _scheduleCleanup() {
        // Vyčistit cache každých 24 hodin
        setInterval(async () => {
            const result = await this.cache.cleanup();
            console.log(`🧹 Cache cleanup: smazáno ${result.deleted} záznamů`);
        }, 24 * 60 * 60 * 1000);
    }

    /**
     * Odeslat uživatelský feedback (opravu špatné analýzy)
     * @param {object} correctedResult - Správný výsledek zvolený uživatelem
     * @returns {Promise<{success: boolean, message: string}>}
     */
    async submitFeedback(correctedResult) {
        if (!this._lastAnalysis) {
            return { success: false, message: 'Žádná analýza k opravení' };
        }

        if (!this.feedbackStore) {
            return { success: false, message: 'FeedbackStore není inicializován' };
        }

        try {
            await this.feedbackStore.submitFeedback({
                imageHash: this._lastAnalysis.hash,
                originalResult: this._lastAnalysis.result,
                correctedResult: correctedResult,
                thumbnail: this._lastAnalysis.thumbnail,
                embedding: this._lastAnalysis.embedding
            });

            this.stats.feedbackSubmitted++;
            await this._saveStats();

            console.log('✅ Feedback odeslán:', correctedResult.issue?.name);

            return {
                success: true,
                message: 'Děkujeme za opravu! Pomáháte zlepšit rozpoznávání.'
            };
        } catch (error) {
            console.error('Chyba při odesílání feedbacku:', error);
            return { success: false, message: 'Chyba při ukládání feedbacku' };
        }
    }

    /**
     * Získá poslední analýzu (pro UI zobrazení možnosti opravy)
     */
    getLastAnalysis() {
        return this._lastAnalysis;
    }

    /**
     * Získá statistiky systému
     */
    async getStats() {
        const cacheStats = await this.cache.getStats();
        const feedbackStats = this.feedbackStore ? await this.feedbackStore.getStats() : null;

        return {
            ...this.stats,
            cache: cacheStats,
            feedback: feedbackStats,
            efficiency: this._calculateEfficiency()
        };
    }

    _calculateEfficiency() {
        const total = this.stats.cacheHits + this.stats.localClassifications + this.stats.apiCalls + this.stats.feedbackUsed;
        if (total === 0) return 0;

        const saved = this.stats.cacheHits + this.stats.localClassifications + this.stats.feedbackUsed;
        return Math.round((saved / total) * 100);
    }
}

// Export pro použití v aplikaci
window.SmartAnalyzer = SmartAnalyzer;
window.FeedbackStore = FeedbackStore;
window.ImageProcessor = ImageProcessor;
window.ImageHasher = ImageHasher;
window.LocalCache = LocalCache;
window.LocalClassifier = LocalClassifier;

console.log('🧠 FIXO SmartAnalyzer modul načten');
