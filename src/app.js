        const { useState, useEffect, useRef } = React;

        // Seznam podporovaných jazyků (50+ světových jazyků)
        const languages = [
            { code: 'cs', name: 'Čeština', flag: '🇨🇿', native: 'Čeština' },
            { code: 'en', name: 'English', flag: '🇬🇧', native: 'English' },
            { code: 'de', name: 'Němčina', flag: '🇩🇪', native: 'Deutsch' },
            { code: 'es', name: 'Španělština', flag: '🇪🇸', native: 'Español' },
            { code: 'fr', name: 'Francouzština', flag: '🇫🇷', native: 'Français' },
            { code: 'it', name: 'Italština', flag: '🇮🇹', native: 'Italiano' },
            { code: 'pt', name: 'Portugalština', flag: '🇵🇹', native: 'Português' },
            { code: 'pl', name: 'Polština', flag: '🇵🇱', native: 'Polski' },
            { code: 'ru', name: 'Ruština', flag: '🇷🇺', native: 'Русский' },
            { code: 'uk', name: 'Ukrajinština', flag: '🇺🇦', native: 'Українська' },
            { code: 'sk', name: 'Slovenština', flag: '🇸🇰', native: 'Slovenčina' },
            { code: 'nl', name: 'Holandština', flag: '🇳🇱', native: 'Nederlands' },
            { code: 'sv', name: 'Švédština', flag: '🇸🇪', native: 'Svenska' },
            { code: 'da', name: 'Dánština', flag: '🇩🇰', native: 'Dansk' },
            { code: 'no', name: 'Norština', flag: '🇳🇴', native: 'Norsk' },
            { code: 'fi', name: 'Finština', flag: '🇫🇮', native: 'Suomi' },
            { code: 'el', name: 'Řečtina', flag: '🇬🇷', native: 'Ελληνικά' },
            { code: 'tr', name: 'Turečtina', flag: '🇹🇷', native: 'Türkçe' },
            { code: 'hu', name: 'Maďarština', flag: '🇭🇺', native: 'Magyar' },
            { code: 'ro', name: 'Rumunština', flag: '🇷🇴', native: 'Română' },
            { code: 'bg', name: 'Bulharština', flag: '🇧🇬', native: 'Български' },
            { code: 'hr', name: 'Chorvatština', flag: '🇭🇷', native: 'Hrvatski' },
            { code: 'sr', name: 'Srbština', flag: '🇷🇸', native: 'Српски' },
            { code: 'sl', name: 'Slovinština', flag: '🇸🇮', native: 'Slovenščina' },
            { code: 'zh', name: 'Čínština', flag: '🇨🇳', native: '中文' },
            { code: 'ja', name: 'Japonština', flag: '🇯🇵', native: '日本語' },
            { code: 'ko', name: 'Korejština', flag: '🇰🇷', native: '한국어' },
            { code: 'ar', name: 'Arabština', flag: '🇸🇦', native: 'العربية' },
            { code: 'he', name: 'Hebrejština', flag: '🇮🇱', native: 'עברית' },
            { code: 'hi', name: 'Hindština', flag: '🇮🇳', native: 'हिन्दी' },
            { code: 'th', name: 'Thajština', flag: '🇹🇭', native: 'ไทย' },
            { code: 'vi', name: 'Vietnamština', flag: '🇻🇳', native: 'Tiếng Việt' },
            { code: 'id', name: 'Indonéština', flag: '🇮🇩', native: 'Bahasa Indonesia' },
            { code: 'ms', name: 'Malajština', flag: '🇲🇾', native: 'Bahasa Melayu' },
            { code: 'tl', name: 'Filipínština', flag: '🇵🇭', native: 'Tagalog' },
            { code: 'bn', name: 'Bengálština', flag: '🇧🇩', native: 'বাংলা' },
            { code: 'ta', name: 'Tamilština', flag: '🇱🇰', native: 'தமிழ்' },
            { code: 'fa', name: 'Perština', flag: '🇮🇷', native: 'فارسی' },
            { code: 'ur', name: 'Urdština', flag: '🇵🇰', native: 'اردو' },
            { code: 'sw', name: 'Svahilština', flag: '🇰🇪', native: 'Kiswahili' },
            { code: 'af', name: 'Afrikánština', flag: '🇿🇦', native: 'Afrikaans' },
            { code: 'et', name: 'Estonština', flag: '🇪🇪', native: 'Eesti' },
            { code: 'lv', name: 'Lotyština', flag: '🇱🇻', native: 'Latviešu' },
            { code: 'lt', name: 'Litevština', flag: '🇱🇹', native: 'Lietuvių' },
            { code: 'is', name: 'Islandština', flag: '🇮🇸', native: 'Íslenska' },
            { code: 'ga', name: 'Irština', flag: '🇮🇪', native: 'Gaeilge' },
            { code: 'cy', name: 'Velština', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', native: 'Cymraeg' },
            { code: 'ca', name: 'Katalánština', flag: '🇪🇸', native: 'Català' },
            { code: 'eu', name: 'Baskičtina', flag: '🇪🇸', native: 'Euskara' }
        ];

        // Originální české texty UI (klíče pro překlad)
        const originalTexts = {
            // Header
            appName: 'FIXO',
            appSlogan: 'Okamžité opravy domácích závad',
            navAnalyze: 'Analyzovat',
            navHistory: 'Historie',
            navDatabase: 'Databáze',
            navDiagnostics: 'AI Diagnostika',

            // Home view
            homeTitle: 'Vyfotografujte závadu',
            homeSubtitle: 'AI okamžitě identifikuje problém a nabídne řešení',
            dropzoneText: 'Přetáhněte fotografii sem',
            dropzoneHint: 'nebo klikněte pro výběr souboru',
            dropzoneFormats: 'Podporované formáty: JPG, PNG, GIF, WebP',
            dropzoneDrop: 'Pusťte pro nahrání',
            uploadBtn: 'Vybrat fotografii',
            stat30sec: '30 sekund',
            statSafe: 'Bezpečné',
            stat500repairs: '500+ oprav',

            // Analyzing
            analyzingTitle: 'Analyzuji fotografii...',
            analyzingStep1: 'Detekce objektu',
            analyzingStep2: 'Identifikace závady',
            analyzingStep3: 'Příprava návodů',

            // Results
            detectedWith: 'Detekováno s',
            confidence: 'jistotou',
            identifiedProblem: 'Identifikovaný problém',
            repairTime: 'Čas opravy',
            difficulty: 'Obtížnost',
            risk: 'Riziko',
            safetyWarning: 'Bezpečnostní upozornění',
            startRepair: 'Začít opravu',
            callExpert: 'Zavolat odborníka',

            // Repair
            step: 'Krok',
            of: 'z',
            toolsNeeded: 'Potřebné nástroje a materiál',
            timeRequired: 'Časová náročnost',
            allStepsOverview: 'Přehled všech kroků',
            prevStep: 'Předchozí krok',
            nextStep: 'Další krok',
            completeRepair: 'Dokončit opravu',

            // History
            historyTitle: 'Historie oprav',
            noRepairsYet: 'Zatím nemáte žádné opravy',
            noRepairsHint: 'Nahrajte fotografii a začněte s první opravou',
            completed: 'Dokončeno',
            inProgress: 'Probíhá',
            filterAll: 'Vše',
            filterCompleted: 'Dokončené',
            filterInProgress: 'Probíhající',
            exportCSV: 'Export CSV',
            repairDetails: 'Detail opravy',
            totalRepairs: 'Celkem oprav',
            completedRepairs: 'Dokončených',
            avgTime: 'Průměrný čas',
            close: 'Zavřít',
            tools: 'Nástroje',
            steps: 'Kroky',
            warnings: 'Upozornění',

            // Database
            databaseTitle: 'Databáze závad a oprav',
            showing: 'Zobrazeno',
            outOf: 'z',
            items: 'položek',
            noCategoryItems: 'Žádné položky v této kategorii',
            tryCategoryHint: 'Zkuste vybrat jinou kategorii',
            aboutDatabase: 'O databázi',
            databaseInfo: 'Naše databáze obsahuje více než 500 nejčastějších domácích závad rozdělených do 12 kategorií. Každá oprava obsahuje detailní návod, seznam potřebných nástrojů a bezpečnostní upozornění.',

            // Categories
            catAll: 'Vše',
            catWater: 'Voda',
            catElectric: 'Elektřina',
            catHeating: 'Topení',
            catDoors: 'Dveře & Okna',
            catFurniture: 'Nábytek',
            catAppliances: 'Spotřebiče',
            catKitchen: 'Kuchyň',
            catBathroom: 'Koupelna',
            catWalls: 'Stěny',
            catGarden: 'Zahrada',

            // Footer
            footerSlogan: 'První světový standard pro vizuální diagnostiku domácích závad.',
            footerFeatures: 'Funkce',
            footerAI: 'AI analýza fotografií',
            footer500guides: '500+ návodů na opravy',
            footerSafety: 'Bezpečnostní upozornění',
            footerHistory: 'Historie oprav',
            footerContact: 'Kontakt',
            footerQuote: 'Fix Anything. Anywhere. Instantly.',
            footerCopyright: '© 2025 FIXO. Všechna práva vyhrazena.',
            safetyDisclaimer: 'UPOZORNĚNÍ: Veškeré opravy provádíte na vlastní riziko. FIXO poskytuje pouze informativní návody a nenese žádnou odpovědnost za případné škody, zranění nebo jiné následky vzniklé při provádění oprav. Před zahájením jakékoli opravy zvažte své schopnosti a v případě pochybností kontaktujte odborníka.',

            // Language
            translating: 'Překládám...',
            selectLanguage: 'Vybrat jazyk',

            // AI Diagnostika
            diagnosticsTitle: 'AI Diagnostika',
            diagnosticsSubtitle: 'Pokročilá analýza a statistiky',
            aiPerformance: 'Výkon AI',
            totalAnalyses: 'Celkem analýz',
            accuracyRate: 'Úspěšnost',
            avgResponseTime: 'Průměrný čas',
            learningProgress: 'Pokrok učení',
            aiModels: 'AI Modely',
            modelCache: 'Paměť (Cache)',
            modelEmbedding: 'Podobnost (Embedding)',
            modelClassifier: 'Klasifikátor (TensorFlow)',
            modelAPI: 'Cloud API',
            recentAnalyses: 'Nedávné analýzy',
            viewDetails: 'Zobrazit detail',
            systemHealth: 'Stav systému',
            allSystemsOperational: 'Všechny systémy funkční',
            cacheStatus: 'Stav cache',
            embeddingStatus: 'Stav embeddings',
            classifierStatus: 'Stav klasifikátoru',
            active: 'Aktivní',
            inactive: 'Neaktivní',
            diagnosticsInfo: 'Zde najdete detailní informace o výkonu AI systému FIXO, statistiky analýz a stav jednotlivých modelů.'
        };

        // Předgenerované překlady pro GitHub Pages (fungují offline bez backendu)
        const prebuiltTranslations = {
            en: {
                appName: 'FIXO',
                appSlogan: 'Instant home repair solutions',
                navAnalyze: 'Analyze',
                navHistory: 'History',
                navDatabase: 'Database',
                homeTitle: 'Photograph the problem',
                homeSubtitle: 'AI instantly identifies the issue and offers solutions',
                dropzoneText: 'Drag photo here',
                dropzoneHint: 'or click to select file',
                dropzoneFormats: 'Supported formats: JPG, PNG, GIF, WebP',
                dropzoneDrop: 'Drop to upload',
                uploadBtn: 'Select photo',
                stat30sec: '30 seconds',
                statSafe: 'Safe',
                stat500repairs: '500+ repairs',
                analyzingTitle: 'Analyzing photo...',
                analyzingStep1: 'Object detection',
                analyzingStep2: 'Issue identification',
                analyzingStep3: 'Preparing guides',
                detectedWith: 'Detected with',
                confidence: 'confidence',
                identifiedProblem: 'Identified problem',
                repairTime: 'Repair time',
                difficulty: 'Difficulty',
                risk: 'Risk',
                safetyWarning: 'Safety warning',
                startRepair: 'Start repair',
                callExpert: 'Call expert',
                step: 'Step',
                of: 'of',
                toolsNeeded: 'Required tools and materials',
                timeRequired: 'Time required',
                allStepsOverview: 'All steps overview',
                prevStep: 'Previous step',
                nextStep: 'Next step',
                completeRepair: 'Complete repair',
                historyTitle: 'Repair history',
                noRepairsYet: 'No repairs yet',
                noRepairsHint: 'Upload a photo and start your first repair',
                completed: 'Completed',
                inProgress: 'In progress',
                filterAll: 'All',
                filterCompleted: 'Completed',
                filterInProgress: 'In progress',
                exportCSV: 'Export CSV',
                repairDetails: 'Repair details',
                totalRepairs: 'Total repairs',
                completedRepairs: 'Completed',
                avgTime: 'Average time',
                close: 'Close',
                tools: 'Tools',
                steps: 'Steps',
                warnings: 'Warnings',
                databaseTitle: 'Repair database',
                showing: 'Showing',
                outOf: 'of',
                items: 'items',
                noCategoryItems: 'No items in this category',
                tryCategoryHint: 'Try selecting another category',
                aboutDatabase: 'About database',
                databaseInfo: 'Our database contains over 500 most common home repairs divided into 12 categories. Each repair includes detailed guide, list of required tools and safety warnings.',
                catAll: 'All',
                catWater: 'Water',
                catElectric: 'Electrical',
                catHeating: 'Heating',
                catDoors: 'Doors & Windows',
                catFurniture: 'Furniture',
                catAppliances: 'Appliances',
                catKitchen: 'Kitchen',
                catBathroom: 'Bathroom',
                catWalls: 'Walls',
                catGarden: 'Garden',
                footerSlogan: 'The first global standard for visual home repair diagnostics.',
                footerFeatures: 'Features',
                footerAI: 'AI photo analysis',
                footer500guides: '500+ repair guides',
                footerSafety: 'Safety warnings',
                footerHistory: 'Repair history',
                footerContact: 'Contact',
                footerQuote: 'Fix Anything. Anywhere. Instantly.',
                footerCopyright: '© 2025 FIXO. All rights reserved.',
                safetyDisclaimer: 'WARNING: All repairs are performed at your own risk. FIXO provides informational guides only and bears no responsibility for any damage, injury, or other consequences resulting from repairs. Before starting any repair, consider your abilities and contact a professional if in doubt.',
                translating: 'Translating...',
                selectLanguage: 'Select language',
                navDiagnostics: 'AI Diagnostics',
                diagnosticsTitle: 'AI Diagnostics',
                diagnosticsSubtitle: 'Advanced analysis and statistics',
                aiPerformance: 'AI Performance',
                totalAnalyses: 'Total Analyses',
                accuracyRate: 'Accuracy Rate',
                avgResponseTime: 'Avg Response Time',
                learningProgress: 'Learning Progress',
                aiModels: 'AI Models',
                modelCache: 'Memory (Cache)',
                modelEmbedding: 'Similarity (Embedding)',
                modelClassifier: 'Classifier (TensorFlow)',
                modelAPI: 'Cloud API',
                recentAnalyses: 'Recent Analyses',
                viewDetails: 'View Details',
                systemHealth: 'System Health',
                allSystemsOperational: 'All systems operational',
                cacheStatus: 'Cache status',
                embeddingStatus: 'Embedding status',
                classifierStatus: 'Classifier status',
                active: 'Active',
                inactive: 'Inactive',
                diagnosticsInfo: 'Here you can find detailed information about FIXO AI system performance, analysis statistics and status of individual models.'
            },
            de: {
                appName: 'FIXO',
                appSlogan: 'Sofortige Reparaturlösungen für Zuhause',
                navAnalyze: 'Analysieren',
                navHistory: 'Verlauf',
                navDatabase: 'Datenbank',
                homeTitle: 'Fotografieren Sie das Problem',
                homeSubtitle: 'KI identifiziert sofort das Problem und bietet Lösungen',
                dropzoneText: 'Foto hierher ziehen',
                dropzoneHint: 'oder klicken um Datei auszuwählen',
                dropzoneFormats: 'Unterstützte Formate: JPG, PNG, GIF, WebP',
                dropzoneDrop: 'Zum Hochladen loslassen',
                uploadBtn: 'Foto auswählen',
                stat30sec: '30 Sekunden',
                statSafe: 'Sicher',
                stat500repairs: '500+ Reparaturen',
                analyzingTitle: 'Foto wird analysiert...',
                analyzingStep1: 'Objekterkennung',
                analyzingStep2: 'Problemidentifikation',
                analyzingStep3: 'Anleitungen werden vorbereitet',
                detectedWith: 'Erkannt mit',
                confidence: 'Sicherheit',
                identifiedProblem: 'Identifiziertes Problem',
                repairTime: 'Reparaturzeit',
                difficulty: 'Schwierigkeit',
                risk: 'Risiko',
                safetyWarning: 'Sicherheitshinweis',
                startRepair: 'Reparatur starten',
                callExpert: 'Experten anrufen',
                step: 'Schritt',
                of: 'von',
                toolsNeeded: 'Benötigte Werkzeuge und Materialien',
                timeRequired: 'Zeitaufwand',
                allStepsOverview: 'Übersicht aller Schritte',
                prevStep: 'Vorheriger Schritt',
                nextStep: 'Nächster Schritt',
                completeRepair: 'Reparatur abschließen',
                historyTitle: 'Reparaturverlauf',
                noRepairsYet: 'Noch keine Reparaturen',
                noRepairsHint: 'Laden Sie ein Foto hoch und starten Sie Ihre erste Reparatur',
                completed: 'Abgeschlossen',
                inProgress: 'In Bearbeitung',
                filterAll: 'Alle',
                filterCompleted: 'Abgeschlossen',
                filterInProgress: 'In Bearbeitung',
                exportCSV: 'CSV exportieren',
                repairDetails: 'Reparaturdetails',
                totalRepairs: 'Gesamtreparaturen',
                completedRepairs: 'Abgeschlossen',
                avgTime: 'Durchschnittszeit',
                close: 'Schließen',
                tools: 'Werkzeuge',
                steps: 'Schritte',
                warnings: 'Warnungen',
                databaseTitle: 'Reparaturdatenbank',
                showing: 'Angezeigt',
                outOf: 'von',
                items: 'Einträgen',
                noCategoryItems: 'Keine Einträge in dieser Kategorie',
                tryCategoryHint: 'Versuchen Sie eine andere Kategorie',
                aboutDatabase: 'Über die Datenbank',
                databaseInfo: 'Unsere Datenbank enthält über 500 der häufigsten Haushaltsreparaturen in 12 Kategorien. Jede Reparatur enthält detaillierte Anleitungen, eine Liste der benötigten Werkzeuge und Sicherheitshinweise.',
                catAll: 'Alle',
                catWater: 'Wasser',
                catElectric: 'Elektrik',
                catHeating: 'Heizung',
                catDoors: 'Türen & Fenster',
                catFurniture: 'Möbel',
                catAppliances: 'Geräte',
                catKitchen: 'Küche',
                catBathroom: 'Badezimmer',
                catWalls: 'Wände',
                catGarden: 'Garten',
                footerSlogan: 'Der erste globale Standard für visuelle Hausreparaturdiagnose.',
                footerFeatures: 'Funktionen',
                footerAI: 'KI-Fotoanalyse',
                footer500guides: '500+ Reparaturanleitungen',
                footerSafety: 'Sicherheitshinweise',
                footerHistory: 'Reparaturverlauf',
                footerContact: 'Kontakt',
                footerQuote: 'Fix Anything. Anywhere. Instantly.',
                footerCopyright: '© 2025 FIXO. Alle Rechte vorbehalten.',
                safetyDisclaimer: 'WARNUNG: Alle Reparaturen erfolgen auf eigene Gefahr. FIXO stellt nur informative Anleitungen zur Verfügung und übernimmt keine Haftung für Schäden, Verletzungen oder andere Folgen. Prüfen Sie vor jeder Reparatur Ihre Fähigkeiten und kontaktieren Sie im Zweifelsfall einen Fachmann.',
                translating: 'Übersetzen...',
                selectLanguage: 'Sprache wählen'
            },
            sk: {
                appName: 'FIXO',
                appSlogan: 'Okamžité opravy domácich porúch',
                navAnalyze: 'Analyzovať',
                navHistory: 'História',
                navDatabase: 'Databáza',
                homeTitle: 'Odfotografujte poruchu',
                homeSubtitle: 'AI okamžite identifikuje problém a ponúkne riešenie',
                dropzoneText: 'Pretiahnite fotografiu sem',
                dropzoneHint: 'alebo kliknite pre výber súboru',
                dropzoneFormats: 'Podporované formáty: JPG, PNG, GIF, WebP',
                dropzoneDrop: 'Pustite pre nahratie',
                uploadBtn: 'Vybrať fotografiu',
                stat30sec: '30 sekúnd',
                statSafe: 'Bezpečné',
                stat500repairs: '500+ opráv',
                analyzingTitle: 'Analyzujem fotografiu...',
                analyzingStep1: 'Detekcia objektu',
                analyzingStep2: 'Identifikácia poruchy',
                analyzingStep3: 'Príprava návodov',
                detectedWith: 'Detekované s',
                confidence: 'istotou',
                identifiedProblem: 'Identifikovaný problém',
                repairTime: 'Čas opravy',
                difficulty: 'Obtiažnosť',
                risk: 'Riziko',
                safetyWarning: 'Bezpečnostné upozornenie',
                startRepair: 'Začať opravu',
                callExpert: 'Zavolať odborníka',
                step: 'Krok',
                of: 'z',
                toolsNeeded: 'Potrebné nástroje a materiál',
                timeRequired: 'Časová náročnosť',
                allStepsOverview: 'Prehľad všetkých krokov',
                prevStep: 'Predchádzajúci krok',
                nextStep: 'Ďalší krok',
                completeRepair: 'Dokončiť opravu',
                historyTitle: 'História opráv',
                noRepairsYet: 'Zatiaľ nemáte žiadne opravy',
                noRepairsHint: 'Nahrajte fotografiu a začnite s prvou opravou',
                completed: 'Dokončené',
                inProgress: 'Prebieha',
                filterAll: 'Všetko',
                filterCompleted: 'Dokončené',
                filterInProgress: 'Prebiehajúce',
                exportCSV: 'Export CSV',
                repairDetails: 'Detail opravy',
                totalRepairs: 'Celkom opráv',
                completedRepairs: 'Dokončených',
                avgTime: 'Priemerný čas',
                close: 'Zavrieť',
                tools: 'Nástroje',
                steps: 'Kroky',
                warnings: 'Upozornenia',
                databaseTitle: 'Databáza porúch a opráv',
                showing: 'Zobrazené',
                outOf: 'z',
                items: 'položiek',
                noCategoryItems: 'Žiadne položky v tejto kategórii',
                tryCategoryHint: 'Skúste vybrať inú kategóriu',
                aboutDatabase: 'O databáze',
                databaseInfo: 'Naša databáza obsahuje viac ako 500 najčastejších domácich porúch rozdelených do 12 kategórií. Každá oprava obsahuje detailný návod, zoznam potrebných nástrojov a bezpečnostné upozornenia.',
                catAll: 'Všetko',
                catWater: 'Voda',
                catElectric: 'Elektrina',
                catHeating: 'Kúrenie',
                catDoors: 'Dvere & Okná',
                catFurniture: 'Nábytok',
                catAppliances: 'Spotrebiče',
                catKitchen: 'Kuchyňa',
                catBathroom: 'Kúpeľňa',
                catWalls: 'Steny',
                catGarden: 'Záhrada',
                footerSlogan: 'Prvý svetový štandard pre vizuálnu diagnostiku domácich porúch.',
                footerFeatures: 'Funkcie',
                footerAI: 'AI analýza fotografií',
                footer500guides: '500+ návodov na opravy',
                footerSafety: 'Bezpečnostné upozornenia',
                footerHistory: 'História opráv',
                footerContact: 'Kontakt',
                footerQuote: 'Fix Anything. Anywhere. Instantly.',
                footerCopyright: '© 2025 FIXO. Všetky práva vyhradené.',
                safetyDisclaimer: 'UPOZORNENIE: Všetky opravy vykonávate na vlastné riziko. FIXO poskytuje iba informatívne návody a nenesie žiadnu zodpovednosť za prípadné škody, zranenia alebo iné následky vzniknuté pri vykonávaní opráv. Pred začatím akejkoľvek opravy zvážte svoje schopnosti a v prípade pochybností kontaktujte odborníka.',
                translating: 'Prekladám...',
                selectLanguage: 'Vybrať jazyk'
            },
            pl: {
                appName: 'FIXO',
                appSlogan: 'Natychmiastowe naprawy domowe',
                navAnalyze: 'Analizuj',
                navHistory: 'Historia',
                navDatabase: 'Baza danych',
                homeTitle: 'Sfotografuj usterkę',
                homeSubtitle: 'AI natychmiast zidentyfikuje problem i zaproponuje rozwiązanie',
                dropzoneText: 'Przeciągnij zdjęcie tutaj',
                dropzoneHint: 'lub kliknij aby wybrać plik',
                dropzoneFormats: 'Obsługiwane formaty: JPG, PNG, GIF, WebP',
                dropzoneDrop: 'Upuść aby przesłać',
                uploadBtn: 'Wybierz zdjęcie',
                stat30sec: '30 sekund',
                statSafe: 'Bezpieczne',
                stat500repairs: '500+ napraw',
                analyzingTitle: 'Analizuję zdjęcie...',
                analyzingStep1: 'Wykrywanie obiektu',
                analyzingStep2: 'Identyfikacja usterki',
                analyzingStep3: 'Przygotowanie instrukcji',
                detectedWith: 'Wykryto z',
                confidence: 'pewnością',
                identifiedProblem: 'Zidentyfikowany problem',
                repairTime: 'Czas naprawy',
                difficulty: 'Trudność',
                risk: 'Ryzyko',
                safetyWarning: 'Ostrzeżenie bezpieczeństwa',
                startRepair: 'Rozpocznij naprawę',
                callExpert: 'Zadzwoń do eksperta',
                step: 'Krok',
                of: 'z',
                toolsNeeded: 'Potrzebne narzędzia i materiały',
                timeRequired: 'Wymagany czas',
                allStepsOverview: 'Przegląd wszystkich kroków',
                prevStep: 'Poprzedni krok',
                nextStep: 'Następny krok',
                completeRepair: 'Zakończ naprawę',
                historyTitle: 'Historia napraw',
                noRepairsYet: 'Brak napraw',
                noRepairsHint: 'Prześlij zdjęcie i rozpocznij pierwszą naprawę',
                completed: 'Zakończono',
                inProgress: 'W trakcie',
                filterAll: 'Wszystko',
                filterCompleted: 'Zakończone',
                filterInProgress: 'W trakcie',
                exportCSV: 'Eksport CSV',
                repairDetails: 'Szczegóły naprawy',
                totalRepairs: 'Łączna liczba napraw',
                completedRepairs: 'Zakończonych',
                avgTime: 'Średni czas',
                close: 'Zamknij',
                tools: 'Narzędzia',
                steps: 'Kroki',
                warnings: 'Ostrzeżenia',
                databaseTitle: 'Baza danych usterek i napraw',
                showing: 'Wyświetlono',
                outOf: 'z',
                items: 'pozycji',
                noCategoryItems: 'Brak pozycji w tej kategorii',
                tryCategoryHint: 'Spróbuj wybrać inną kategorię',
                aboutDatabase: 'O bazie danych',
                databaseInfo: 'Nasza baza danych zawiera ponad 500 najczęstszych usterek domowych podzielonych na 12 kategorii. Każda naprawa zawiera szczegółową instrukcję, listę potrzebnych narzędzi i ostrzeżenia bezpieczeństwa.',
                catAll: 'Wszystko',
                catWater: 'Woda',
                catElectric: 'Elektryka',
                catHeating: 'Ogrzewanie',
                catDoors: 'Drzwi & Okna',
                catFurniture: 'Meble',
                catAppliances: 'Urządzenia',
                catKitchen: 'Kuchnia',
                catBathroom: 'Łazienka',
                catWalls: 'Ściany',
                catGarden: 'Ogród',
                footerSlogan: 'Pierwszy światowy standard wizualnej diagnostyki domowych usterek.',
                footerFeatures: 'Funkcje',
                footerAI: 'Analiza zdjęć AI',
                footer500guides: '500+ instrukcji napraw',
                footerSafety: 'Ostrzeżenia bezpieczeństwa',
                footerHistory: 'Historia napraw',
                footerContact: 'Kontakt',
                footerQuote: 'Fix Anything. Anywhere. Instantly.',
                footerCopyright: '© 2025 FIXO. Wszelkie prawa zastrzeżone.',
                safetyDisclaimer: 'OSTRZEŻENIE: Wszystkie naprawy wykonujesz na własne ryzyko. FIXO dostarcza jedynie informacyjne instrukcje i nie ponosi odpowiedzialności za jakiekolwiek szkody, obrażenia lub inne konsekwencje wynikające z napraw. Przed rozpoczęciem jakiejkolwiek naprawy rozważ swoje umiejętności i w razie wątpliwości skontaktuj się ze specjalistą.',
                translating: 'Tłumaczenie...',
                selectLanguage: 'Wybierz język'
            },
            es: {
                appName: 'FIXO',
                appSlogan: 'Soluciones instantáneas de reparación del hogar',
                navAnalyze: 'Analizar',
                navHistory: 'Historial',
                navDatabase: 'Base de datos',
                homeTitle: 'Fotografía el problema',
                homeSubtitle: 'La IA identifica instantáneamente el problema y ofrece soluciones',
                dropzoneText: 'Arrastra la foto aquí',
                dropzoneHint: 'o haz clic para seleccionar archivo',
                dropzoneFormats: 'Formatos soportados: JPG, PNG, GIF, WebP',
                dropzoneDrop: 'Suelta para subir',
                uploadBtn: 'Seleccionar foto',
                stat30sec: '30 segundos',
                statSafe: 'Seguro',
                stat500repairs: '500+ reparaciones',
                analyzingTitle: 'Analizando foto...',
                analyzingStep1: 'Detección de objeto',
                analyzingStep2: 'Identificación del problema',
                analyzingStep3: 'Preparando guías',
                detectedWith: 'Detectado con',
                confidence: 'de confianza',
                identifiedProblem: 'Problema identificado',
                repairTime: 'Tiempo de reparación',
                difficulty: 'Dificultad',
                risk: 'Riesgo',
                safetyWarning: 'Advertencia de seguridad',
                startRepair: 'Iniciar reparación',
                callExpert: 'Llamar experto',
                step: 'Paso',
                of: 'de',
                toolsNeeded: 'Herramientas y materiales necesarios',
                timeRequired: 'Tiempo requerido',
                allStepsOverview: 'Resumen de todos los pasos',
                prevStep: 'Paso anterior',
                nextStep: 'Siguiente paso',
                completeRepair: 'Completar reparación',
                historyTitle: 'Historial de reparaciones',
                noRepairsYet: 'Sin reparaciones aún',
                noRepairsHint: 'Sube una foto y comienza tu primera reparación',
                completed: 'Completado',
                inProgress: 'En progreso',
                filterAll: 'Todo',
                filterCompleted: 'Completadas',
                filterInProgress: 'En progreso',
                exportCSV: 'Exportar CSV',
                repairDetails: 'Detalles de reparación',
                totalRepairs: 'Total de reparaciones',
                completedRepairs: 'Completadas',
                avgTime: 'Tiempo promedio',
                close: 'Cerrar',
                tools: 'Herramientas',
                steps: 'Pasos',
                warnings: 'Advertencias',
                databaseTitle: 'Base de datos de reparaciones',
                showing: 'Mostrando',
                outOf: 'de',
                items: 'elementos',
                noCategoryItems: 'Sin elementos en esta categoría',
                tryCategoryHint: 'Intenta seleccionar otra categoría',
                aboutDatabase: 'Sobre la base de datos',
                databaseInfo: 'Nuestra base de datos contiene más de 500 de las reparaciones domésticas más comunes divididas en 12 categorías. Cada reparación incluye guía detallada, lista de herramientas necesarias y advertencias de seguridad.',
                catAll: 'Todo',
                catWater: 'Agua',
                catElectric: 'Electricidad',
                catHeating: 'Calefacción',
                catDoors: 'Puertas & Ventanas',
                catFurniture: 'Muebles',
                catAppliances: 'Electrodomésticos',
                catKitchen: 'Cocina',
                catBathroom: 'Baño',
                catWalls: 'Paredes',
                catGarden: 'Jardín',
                footerSlogan: 'El primer estándar mundial para diagnóstico visual de reparaciones del hogar.',
                footerFeatures: 'Funciones',
                footerAI: 'Análisis de fotos con IA',
                footer500guides: '500+ guías de reparación',
                footerSafety: 'Advertencias de seguridad',
                footerHistory: 'Historial de reparaciones',
                footerContact: 'Contacto',
                footerQuote: 'Fix Anything. Anywhere. Instantly.',
                footerCopyright: '© 2025 FIXO. Todos los derechos reservados.',
                safetyDisclaimer: 'ADVERTENCIA: Todas las reparaciones se realizan bajo su propio riesgo. FIXO proporciona solo guías informativas y no asume ninguna responsabilidad por daños, lesiones u otras consecuencias derivadas de las reparaciones. Antes de comenzar cualquier reparación, considere sus habilidades y contacte a un profesional en caso de duda.',
                translating: 'Traduciendo...',
                selectLanguage: 'Seleccionar idioma'
            },
            fr: {
                appName: 'FIXO',
                appSlogan: 'Solutions de réparation domestique instantanées',
                navAnalyze: 'Analyser',
                navHistory: 'Historique',
                navDatabase: 'Base de données',
                homeTitle: 'Photographiez le problème',
                homeSubtitle: "L'IA identifie instantanément le problème et propose des solutions",
                dropzoneText: 'Glissez la photo ici',
                dropzoneHint: 'ou cliquez pour sélectionner un fichier',
                dropzoneFormats: 'Formats supportés: JPG, PNG, GIF, WebP',
                dropzoneDrop: 'Déposez pour télécharger',
                uploadBtn: 'Sélectionner photo',
                stat30sec: '30 secondes',
                statSafe: 'Sécurisé',
                stat500repairs: '500+ réparations',
                analyzingTitle: 'Analyse de la photo...',
                analyzingStep1: "Détection d'objet",
                analyzingStep2: 'Identification du problème',
                analyzingStep3: 'Préparation des guides',
                detectedWith: 'Détecté avec',
                confidence: 'de confiance',
                identifiedProblem: 'Problème identifié',
                repairTime: 'Temps de réparation',
                difficulty: 'Difficulté',
                risk: 'Risque',
                safetyWarning: 'Avertissement de sécurité',
                startRepair: 'Commencer la réparation',
                callExpert: 'Appeler un expert',
                step: 'Étape',
                of: 'sur',
                toolsNeeded: 'Outils et matériaux nécessaires',
                timeRequired: 'Temps requis',
                allStepsOverview: 'Aperçu de toutes les étapes',
                prevStep: 'Étape précédente',
                nextStep: 'Étape suivante',
                completeRepair: 'Terminer la réparation',
                historyTitle: 'Historique des réparations',
                noRepairsYet: 'Aucune réparation pour le moment',
                noRepairsHint: 'Téléchargez une photo et commencez votre première réparation',
                completed: 'Terminé',
                inProgress: 'En cours',
                filterAll: 'Tout',
                filterCompleted: 'Terminées',
                filterInProgress: 'En cours',
                exportCSV: 'Exporter CSV',
                repairDetails: 'Détails de la réparation',
                totalRepairs: 'Total des réparations',
                completedRepairs: 'Terminées',
                avgTime: 'Temps moyen',
                close: 'Fermer',
                tools: 'Outils',
                steps: 'Étapes',
                warnings: 'Avertissements',
                databaseTitle: 'Base de données des réparations',
                showing: 'Affichage',
                outOf: 'sur',
                items: 'éléments',
                noCategoryItems: 'Aucun élément dans cette catégorie',
                tryCategoryHint: 'Essayez de sélectionner une autre catégorie',
                aboutDatabase: 'À propos de la base de données',
                databaseInfo: "Notre base de données contient plus de 500 des réparations domestiques les plus courantes réparties en 12 catégories. Chaque réparation comprend un guide détaillé, une liste d'outils nécessaires et des avertissements de sécurité.",
                catAll: 'Tout',
                catWater: 'Eau',
                catElectric: 'Électricité',
                catHeating: 'Chauffage',
                catDoors: 'Portes & Fenêtres',
                catFurniture: 'Meubles',
                catAppliances: 'Appareils',
                catKitchen: 'Cuisine',
                catBathroom: 'Salle de bain',
                catWalls: 'Murs',
                catGarden: 'Jardin',
                footerSlogan: 'La première norme mondiale pour le diagnostic visuel des réparations domestiques.',
                footerFeatures: 'Fonctionnalités',
                footerAI: 'Analyse photo par IA',
                footer500guides: '500+ guides de réparation',
                footerSafety: 'Avertissements de sécurité',
                footerHistory: 'Historique des réparations',
                footerContact: 'Contact',
                footerQuote: 'Fix Anything. Anywhere. Instantly.',
                footerCopyright: '© 2025 FIXO. Tous droits réservés.',
                safetyDisclaimer: 'AVERTISSEMENT : Toutes les réparations sont effectuées à vos propres risques. FIXO fournit uniquement des guides informatifs et décline toute responsabilité pour les dommages, blessures ou autres conséquences résultant des réparations. Avant de commencer toute réparation, évaluez vos compétences et contactez un professionnel en cas de doute.',
                translating: 'Traduction...',
                selectLanguage: 'Choisir la langue'
            }
        };

        // Databáze bude načtena z JSON souboru
        let repairDatabase = {};
        let categoriesData = [];

        // Načtení databáze při startu
        (async function loadDatabase() {
            try {
                const response = await fetch('data/repairs.json');
                if (response.ok) {
                    const data = await response.json();
                    repairDatabase = data.repairs || {};
                    categoriesData = data.categories || [];
                    console.log('✅ Databáze načtena:', Object.keys(repairDatabase).length, 'položek');
                }
            } catch (error) {
                console.error('❌ Chyba při načítání databáze:', error);
            }
        })();

        // Kategorie (fallback) - Font Awesome ikony
        const defaultCategories = [
            { id: 'all', name: 'Vše', icon: 'fa-th-large' },
            { id: 'voda', name: 'Voda', icon: 'fa-tint' },
            { id: 'elektrina', name: 'Elektřina', icon: 'fa-bolt' },
            { id: 'topeni', name: 'Topení', icon: 'fa-thermometer-half' },
            { id: 'dvere_okna', name: 'Dveře & Okna', icon: 'fa-door-open' },
            { id: 'nabytek', name: 'Nábytek', icon: 'fa-couch' },
            { id: 'spotrebice', name: 'Spotřebiče', icon: 'fa-plug' },
            { id: 'kuchyn', name: 'Kuchyň', icon: 'fa-utensils' },
            { id: 'koupelna', name: 'Koupelna', icon: 'fa-shower' },
            { id: 'steny_podlahy', name: 'Stěny', icon: 'fa-home' },
            { id: 'zahrada', name: 'Zahrada', icon: 'fa-leaf' }
        ];

        // Getter pro databázi (používá načtená data nebo prázdný objekt)
        const getRepairDatabase = () => Object.keys(repairDatabase).length > 0 ? repairDatabase : {};
        const getCategories = () => categoriesData.length > 0 ? categoriesData : defaultCategories;

        // Databáze se nyní načítá z data/repairs.json (30 položek)

        function FixoApp() {
            // State pro databázi načtenou z JSON
            const [dbLoaded, setDbLoaded] = useState(false);
            const [categories, setCategories] = useState(defaultCategories);

            // Načtení databáze při prvním renderování
            useEffect(() => {
                const loadData = async () => {
                    try {
                        const response = await fetch('data/repairs.json');
                        if (response.ok) {
                            const data = await response.json();
                            repairDatabase = data.repairs || {};
                            categoriesData = data.categories || [];
                            setCategories(categoriesData.length > 0 ? categoriesData : defaultCategories);
                            setDbLoaded(true);
                            console.log('✅ Databáze načtena v React:', Object.keys(repairDatabase).length, 'položek');
                        }
                    } catch (error) {
                        console.error('❌ Chyba při načítání databáze:', error);
                        setDbLoaded(true); // I při chybě pokračuj s prázdnou databází
                    }
                };
                loadData();
            }, []);
            const [currentView, setCurrentView] = useState('home');
            const [selectedImage, setSelectedImage] = useState(null);
            const [detectedObject, setDetectedObject] = useState(null);
            const [selectedIssue, setSelectedIssue] = useState(null);
            const [analysisResult, setAnalysisResult] = useState(null);
            const [isAnalyzing, setIsAnalyzing] = useState(false);
            const [repairHistory, setRepairHistory] = useState([]);
            const [currentStep, setCurrentStep] = useState(0);
            const [isDragging, setIsDragging] = useState(false);
            const [selectedCategory, setSelectedCategory] = useState('all');
            const [searchTerm, setSearchTerm] = useState(''); // Search in database
            const [expandedSections, setExpandedSections] = useState({}); // Databázové sekce (action_block friendly)
            const [checkedItems, setCheckedItems] = useState({}); // Pre-repair checklist items
            const [checklistPhase, setChecklistPhase] = useState(false); // Show checklist before repair
            const [historyFilter, setHistoryFilter] = useState('all'); // 'all', 'completed', 'in_progress'
            const [selectedRepairDetail, setSelectedRepairDetail] = useState(null);
            const fileInputRef = useRef(null);
            const dropZoneRef = useRef(null);
            const canvasRef = useRef(null);
            const [isDrawingMode, setIsDrawingMode] = useState(false);
            const [isDrawing, setIsDrawing] = useState(false);
            const [brushColor, setBrushColor] = useState('#00ffff'); // Neon cyan
            const [brushSize, setBrushSize] = useState(5);
            const [annotatedImage, setAnnotatedImage] = useState(null);

            // Hamburger menu state
            const [menuOpen, setMenuOpen] = useState(false);
            const [langMenuOpen, setLangMenuOpen] = useState(false);

            // How it works expanded state
            const [expandedStep, setExpandedStep] = useState(null);

            // PWA install state
            const [deferredPrompt, setDeferredPrompt] = useState(null);
            const [showInstallBanner, setShowInstallBanner] = useState(false);

            // Smart Analyzer - AI Learning System
            const [smartAnalyzer, setSmartAnalyzer] = useState(null);
            const [analyzerStats, setAnalyzerStats] = useState(null);

            // Feedback modal pro opravu špatné analýzy
            const [showFeedbackModal, setShowFeedbackModal] = useState(false);
            const [feedbackCategory, setFeedbackCategory] = useState('all');
            const [feedbackSearch, setFeedbackSearch] = useState('');

            // Features modal
            const [showFeaturesModal, setShowFeaturesModal] = useState(false);

            // Inicializace SmartAnalyzer
            useEffect(() => {
                const initSmartAnalyzer = async () => {
                    if (window.SmartAnalyzer) {
                        const analyzer = new window.SmartAnalyzer(API_URL);
                        await analyzer.init();
                        setSmartAnalyzer(analyzer);
                        console.log('🧠 SmartAnalyzer inicializován');

                        // Načíst statistiky
                        const stats = await analyzer.getStats();
                        setAnalyzerStats(stats);
                    }
                };
                initSmartAnalyzer();
            }, []);

            // Funkce pro odeslání feedbacku (opravy)
            const submitFeedback = async (selectedObject, selectedIssue) => {
                if (!smartAnalyzer) return;

                const correctedResult = {
                    object: {
                        name: selectedObject.name,
                        category: selectedObject.category,
                        icon: getCategoryIcon(selectedObject.category)
                    },
                    issue: selectedIssue
                };

                const result = await smartAnalyzer.submitFeedback(correctedResult);

                if (result.success) {
                    alert(result.message);
                    setShowFeedbackModal(false);

                    // Aktualizovat statistiky
                    const stats = await smartAnalyzer.getStats();
                    setAnalyzerStats(stats);
                } else {
                    alert('Chyba: ' + result.message);
                }
            };

            // Manual description & voice input
            const [showDescribeModal, setShowDescribeModal] = useState(false);
            const [problemDescription, setProblemDescription] = useState('');
            const [isListening, setIsListening] = useState(false);
            const [speechSupported, setSpeechSupported] = useState(false);
            const recognitionRef = useRef(null);

            // Upřesňující kroky pro textový popis
            const [clarificationStep, setClarificationStep] = useState(0);
            const [selectedProblemCategory, setSelectedProblemCategory] = useState(null);
            const [selectedProblemObject, setSelectedProblemObject] = useState(null);
            const [suggestedIssues, setSuggestedIssues] = useState([]);

            // Kategorie problémů pro upřesnění
            const problemCategories = [
                { id: 'plumbing', name: 'Voda a instalatérství', icon: 'fa-tint', examples: ['Teče voda', 'Ucpaný odpad', 'Neteče voda', 'Kapající kohoutek'] },
                { id: 'electrical', name: 'Elektřina', icon: 'fa-bolt', examples: ['Nefunguje zásuvka', 'Bliká světlo', 'Vypadávají jističe'] },
                { id: 'furniture', name: 'Nábytek', icon: 'fa-couch', examples: ['Rozbitá židle', 'Vrže postel', 'Padají dvířka'] },
                { id: 'doors_windows', name: 'Dveře a okna', icon: 'fa-door-open', examples: ['Nejdou zavřít', 'Drhnou', 'Netěsní'] },
                { id: 'heating', name: 'Topení', icon: 'fa-thermometer-half', examples: ['Netopí', 'Hučí radiátor', 'Uniká voda'] },
                { id: 'appliances', name: 'Spotřebiče', icon: 'fa-plug', examples: ['Myčka', 'Pračka', 'Lednice', 'Sporák'] },
                { id: 'walls_floors', name: 'Stěny a podlahy', icon: 'fa-layer-group', examples: ['Praskliny', 'Vlhkost', 'Odlepená dlažba'] },
                { id: 'other', name: 'Jiné', icon: 'fa-question-circle', examples: ['Ostatní problémy'] }
            ];

            // Inteligentní vyhledávání v databázi podle popisu
            const findMatchingIssues = (description, category = null) => {
                const searchTerms = description.toLowerCase().split(' ').filter(t => t.length > 2);
                const results = [];

                Object.entries(repairDatabase).forEach(([key, obj]) => {
                    // Filtrovat podle kategorie pokud je zadána
                    if (category && obj.category !== category) return;

                    obj.issues.forEach(issue => {
                        let score = 0;
                        const issueName = issue.name.toLowerCase();
                        const issueDesc = (issue.description || '').toLowerCase();

                        searchTerms.forEach(term => {
                            if (issueName.includes(term)) score += 3;
                            if (issueDesc.includes(term)) score += 2;
                            if (obj.name.toLowerCase().includes(term)) score += 1;
                        });

                        // Bonus za shodu kategorie
                        if (category && obj.category === category) score += 2;

                        if (score > 0 || (category && obj.category === category)) {
                            results.push({
                                ...issue,
                                objectName: obj.name,
                                objectKey: key,
                                category: obj.category,
                                matchScore: score || 1
                            });
                        }
                    });
                });

                return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 8);
            };

            // Toggle detailní karty v databázi (information_block obsahuje otevřené sekce)
            const toggleDatabaseSection = (sectionKey) => {
                setExpandedSections(prev => ({
                    ...prev,
                    [sectionKey]: !prev[sectionKey]
                }));
            };

            // Navigační tlačítka pro databázi (otevřou kartu a posunou pohled)
            const focusDatabaseSection = (sectionKey) => {
                setExpandedSections(prev => ({
                    ...prev,
                    [sectionKey]: true
                }));

                requestAnimationFrame(() => {
                    const sectionEl = document.getElementById(`database-card-${sectionKey}`);
                    if (sectionEl) {
                        sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        sectionEl.classList.add('nav-highlight');
                        setTimeout(() => sectionEl.classList.remove('nav-highlight'), 1200);
                    }
                });
            };

            const getCategoryLabel = (categoryId) => {
                const found = getCategories().find(cat => cat.id === categoryId);
                return found ? found.name : categoryId;
            };

            // Resetovat upřesňující kroky
            const resetClarification = () => {
                setClarificationStep(0);
                setSelectedProblemCategory(null);
                setSelectedProblemObject(null);
                setSuggestedIssues([]);
                setProblemDescription('');
            };

            // Zpracovat textový popis a najít odpovídající problémy
            const processDescription = () => {
                if (!problemDescription.trim() && !selectedProblemCategory) {
                    alert('Prosím popište problém nebo vyberte kategorii');
                    return;
                }

                const matches = findMatchingIssues(problemDescription, selectedProblemCategory);
                setSuggestedIssues(matches);

                if (matches.length > 0) {
                    setClarificationStep(2); // Zobrazit nalezené problémy
                } else {
                    setClarificationStep(1); // Vybrat kategorii pro upřesnění
                }
            };

            // Vybrat konkrétní problém z návrhů
            const selectSuggestedIssue = (issue) => {
                setShowDescribeModal(false);
                resetClarification();

                // Nastavit jako výsledek analýzy
                setAnalysisResult({
                    object: {
                        name: issue.objectName,
                        category: issue.category,
                        icon: getCategoryIcon(issue.category)
                    },
                    issue: issue,
                    confidence: 85,
                    _meta: { source: 'text_description' }
                });
                navigateTo('results');
            };

            // Dark mode state
            const [darkMode, setDarkMode] = useState(() => {
                const saved = localStorage.getItem('fixo-dark-mode');
                if (saved !== null) return saved === 'true';
                return window.matchMedia('(prefers-color-scheme: dark)').matches;
            });

            // Apply dark mode on change
            useEffect(() => {
                document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
                localStorage.setItem('fixo-dark-mode', darkMode);
            }, [darkMode]);

            const toggleDarkMode = () => setDarkMode(prev => !prev);

            // Pre-repair checklist state
            const [showChecklist, setShowChecklist] = useState(false);
            const [pendingIssue, setPendingIssue] = useState(null);
            const [checklistItems, setChecklistItems] = useState({});

            // Craftsmen state
            const [showCraftsmen, setShowCraftsmen] = useState(false);
            const [craftsmenData, setCraftsmenData] = useState(null);
            const [selectedCraftsmanCategory, setSelectedCraftsmanCategory] = useState('all');

            // Nový obchodní model - stav
            const [showDetailedGuidePayment, setShowDetailedGuidePayment] = useState(false);
            const [purchasedGuides, setPurchasedGuides] = useState(() => {
                const saved = localStorage.getItem('fixo_purchased_guides');
                return saved ? JSON.parse(saved) : [];
            });
            const [showNearbySuppliers, setShowNearbySuppliers] = useState(false);
            const [userLocation, setUserLocation] = useState(null);
            const [showSupplierRegistration, setShowSupplierRegistration] = useState(false);
            const [registeredSuppliers, setRegisteredSuppliers] = useState(() => {
                const saved = localStorage.getItem('fixo_registered_suppliers');
                return saved ? JSON.parse(saved) : [];
            });

            // Uložení zakoupených návodů do localStorage
            useEffect(() => {
                localStorage.setItem('fixo_purchased_guides', JSON.stringify(purchasedGuides));
            }, [purchasedGuides]);

            // Získání geolokace uživatele
            const getUserLocation = () => {
                return new Promise((resolve, reject) => {
                    if (!navigator.geolocation) {
                        reject(new Error('Geolokace není podporována'));
                        return;
                    }
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const loc = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            setUserLocation(loc);
                            resolve(loc);
                        },
                        (error) => reject(error),
                        { enableHighAccuracy: true, timeout: 10000 }
                    );
                });
            };

            // Výpočet vzdálenosti mezi dvěma body (Haversine formula)
            const calculateDistance = (lat1, lng1, lat2, lng2) => {
                const R = 6371; // Radius Země v km
                const dLat = (lat2 - lat1) * Math.PI / 180;
                const dLng = (lng2 - lng1) * Math.PI / 180;
                const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLng/2) * Math.sin(dLng/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                return R * c;
            };

            // Kontrola zda je návod zakoupený
            const isGuidePurchased = (issueId) => {
                return purchasedGuides.includes(issueId);
            };

            // Nákup detailního návodu
            const purchaseDetailedGuide = (issue) => {
                // Zde by byla integrace s platební bránou (Stripe, PayPal, etc.)
                const issueId = issue.id || issue.name;
                if (!purchasedGuides.includes(issueId)) {
                    setPurchasedGuides([...purchasedGuides, issueId]);
                    alert(`Děkujeme za nákup! Detailní návod "${issue.name}" je nyní odemčen.\n\nCena: ${PRICING.detailedGuide} ${PRICING.currency}`);
                }
                setShowDetailedGuidePayment(false);
            };

            // Získání nejbližších dodavatelů podle geolokace
            const getNearbySuppliers = async (category = null) => {
                try {
                    const location = userLocation || await getUserLocation();

                    // Demo data dodavatelů (v produkci by byla databáze)
                    const suppliers = [
                        { id: 1, name: 'Jan Novák - Instalatér', category: 'plumbing', lat: 50.0755, lng: 14.4378, phone: '+420 123 456 789', rating: 4.8, distance: 0, isPremium: true },
                        { id: 2, name: 'Elektro Servis Praha', category: 'electrical', lat: 50.0855, lng: 14.4278, phone: '+420 987 654 321', rating: 4.5, distance: 0, isPremium: true },
                        { id: 3, name: 'Truhlářství Koval', category: 'carpentry', lat: 50.0655, lng: 14.4478, phone: '+420 555 666 777', rating: 4.9, distance: 0, isPremium: true },
                        { id: 4, name: 'Zámečnictví Rychlý', category: 'locksmith', lat: 50.0955, lng: 14.4178, phone: '+420 111 222 333', rating: 4.3, distance: 0, isPremium: false },
                        { id: 5, name: 'TopServis - Topení', category: 'heating', lat: 50.0555, lng: 14.4578, phone: '+420 444 555 666', rating: 4.7, distance: 0, isPremium: true }
                    ];

                    // Spočítat vzdálenost a seřadit
                    const withDistance = suppliers.map(s => ({
                        ...s,
                        distance: calculateDistance(location.lat, location.lng, s.lat, s.lng)
                    }));

                    // Filtrovat podle kategorie pokud je zadána
                    let filtered = withDistance;
                    if (category && category !== 'all') {
                        filtered = withDistance.filter(s => s.category === category);
                    }

                    // Seřadit: Premium dodavatelé první, pak podle vzdálenosti
                    return filtered.sort((a, b) => {
                        if (a.isPremium && !b.isPremium) return -1;
                        if (!a.isPremium && b.isPremium) return 1;
                        return a.distance - b.distance;
                    });
                } catch (error) {
                    console.error('Chyba při získávání polohy:', error);
                    return [];
                }
            };

            // PWA Service Worker registration
            useEffect(() => {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register('service-worker.js')
                        .then(reg => console.log('FIXO: Service Worker registrován', reg))
                        .catch(err => console.log('FIXO: Service Worker chyba', err));
                }

                // PWA install prompt
                window.addEventListener('beforeinstallprompt', (e) => {
                    e.preventDefault();
                    setDeferredPrompt(e);
                    setShowInstallBanner(true);
                });
            }, []);

            const handleInstallClick = async () => {
                if (!deferredPrompt) return;
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log('FIXO: Instalace:', outcome);
                setDeferredPrompt(null);
                setShowInstallBanner(false);
            };

            // Inicializace hlasového rozpoznávání
            useEffect(() => {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                if (SpeechRecognition) {
                    setSpeechSupported(true);
                    recognitionRef.current = new SpeechRecognition();
                    recognitionRef.current.continuous = false;
                    recognitionRef.current.interimResults = true;
                    recognitionRef.current.lang = 'cs-CZ';

                    recognitionRef.current.onresult = (event) => {
                        let transcript = '';
                        for (let i = event.resultIndex; i < event.results.length; i++) {
                            transcript += event.results[i][0].transcript;
                        }
                        setProblemDescription(transcript);
                    };

                    recognitionRef.current.onend = () => {
                        setIsListening(false);
                    };

                    recognitionRef.current.onerror = (event) => {
                        console.error('Chyba rozpoznávání:', event.error);
                        setIsListening(false);
                    };
                }
            }, []);

            const startListening = () => {
                if (recognitionRef.current && !isListening) {
                    setProblemDescription('');
                    setIsListening(true);
                    recognitionRef.current.start();
                }
            };

            const stopListening = () => {
                if (recognitionRef.current && isListening) {
                    recognitionRef.current.stop();
                    setIsListening(false);
                }
            };

            // Odeslat popis problému na AI analýzu
            const analyzeWithDescription = async () => {
                if (!problemDescription.trim()) {
                    alert('Prosím popište problém');
                    return;
                }

                setShowDescribeModal(false);
                setIsAnalyzing(true);
                setCurrentView('analyzing');

                try {
                    if (API_URL) {
                        const response = await fetch(`${API_URL}/api/analyze-description`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                description: problemDescription,
                                image: selectedImage
                            })
                        });

                        if (response.ok) {
                            const result = await response.json();
                            if (result.success) {
                                const data = result.data;
                                setAnalysisResult({
                                    object: {
                                        name: data.detection.object.name,
                                        category: data.detection.object.category,
                                        icon: getCategoryIcon(data.detection.object.category)
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
                                });
                                setIsAnalyzing(false);
                                setCurrentView('results');
                                return;
                            }
                        }
                    }

                    // Fallback - simulace s popisem
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    setAnalysisResult({
                        object: { name: 'Popsaný problém', category: 'steny_podlahy', icon: '<i className="fas fa-wrench"></i>' },
                        issue: {
                            name: problemDescription.slice(0, 50) + '...',
                            description: 'Na základě vašeho popisu doporučujeme následující postup.',
                            riskScore: 3,
                            difficulty: 'Střední',
                            timeEstimate: '30 min',
                            tools: ['Základní nářadí', 'Ochranné pomůcky'],
                            steps: [
                                { step: 1, action: 'Prohlédněte problémové místo', time: '5 min', icon: '<i className="fas fa-search"></i>' },
                                { step: 2, action: 'Připravte potřebné nástroje', time: '5 min', icon: '<i className="fas fa-wrench"></i>' },
                                { step: 3, action: 'Proveďte opravu podle popisu', time: '15 min', icon: '<i className="fas fa-cog"></i>' },
                                { step: 4, action: 'Zkontrolujte výsledek', time: '5 min', icon: '<i className="fas fa-check-circle"></i>' }
                            ],
                            safetyWarnings: ['Buďte opatrní při práci', 'V případě pochybností kontaktujte odborníka']
                        },
                        confidence: 70
                    });
                } catch (error) {
                    console.error('Chyba při analýze:', error);
                }

                setIsAnalyzing(false);
                setCurrentView('results');
                setProblemDescription('');
            };

            const toggleMenu = () => {
                setMenuOpen(!menuOpen);
            };

            const navigateTo = (view) => {
                setCurrentView(view);
                setMenuOpen(false);
            };

            // Filtrovat historii podle stavu
            const getFilteredHistory = () => {
                if (historyFilter === 'all') return repairHistory;
                return repairHistory.filter(item => item.status === historyFilter);
            };

            // Statistiky historie
            const getHistoryStats = () => {
                const total = repairHistory.length;
                const completed = repairHistory.filter(r => r.status === 'completed').length;
                return { total, completed, inProgress: total - completed };
            };

            // Export historie do CSV
            const exportToCSV = () => {
                if (repairHistory.length === 0) return;

                const headers = ['ID', 'Objekt', 'Závada', 'Datum', 'Stav', 'Čas opravy'];
                const rows = repairHistory.map(item => [
                    item.id,
                    item.object,
                    item.issue,
                    item.date,
                    item.status === 'completed' ? 'Dokončeno' : 'Probíhá',
                    item.timeEstimate || 'N/A'
                ]);

                const csvContent = [headers, ...rows]
                    .map(row => row.map(cell => `"${cell}"`).join(','))
                    .join('\n');

                const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `fixo_historie_${new Date().toISOString().split('T')[0]}.csv`;
                link.click();
                URL.revokeObjectURL(url);
            };

            // Backend API URL - Render.com pro produkci, localhost pro vývoj
            const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'http://localhost:3000'
                : 'https://fixo-backend.onrender.com'; // Render.com backend

            // === JAZYKOVÝ SYSTÉM S CACHE (vlastní slovník překladů) ===
            const [currentLanguage, setCurrentLanguage] = useState(() => {
                return localStorage.getItem('fixo_language') || 'cs';
            });
            const [translations, setTranslations] = useState(() => {
                const saved = localStorage.getItem('fixo_translations');
                // Sloučit uložené překlady s předgenerovanými (prebuilt mají prioritu)
                const savedTranslations = saved ? JSON.parse(saved) : {};
                return { cs: originalTexts, ...prebuiltTranslations, ...savedTranslations };
            });
            const [isTranslating, setIsTranslating] = useState(false);
            const [langDropdownOpen, setLangDropdownOpen] = useState(false);

            // Získat překlad pro aktuální jazyk
            const t = (key) => {
                // Nejprve zkus předgenerované překlady (pro GitHub Pages)
                if (prebuiltTranslations[currentLanguage] && prebuiltTranslations[currentLanguage][key]) {
                    return prebuiltTranslations[currentLanguage][key];
                }
                if (translations[currentLanguage] && translations[currentLanguage][key]) {
                    return translations[currentLanguage][key];
                }
                return originalTexts[key] || key;
            };

            // Uložit slovník do localStorage (permanentní cache)
            const saveTranslations = (newTranslations) => {
                localStorage.setItem('fixo_translations', JSON.stringify(newTranslations));
                setTranslations(newTranslations);
            };

            // Počet přeložených jazyků ve slovníku (předgenerované + uložené)
            const getTranslatedLanguagesCount = () => {
                const allLangs = new Set([...Object.keys(translations), ...Object.keys(prebuiltTranslations), 'cs']);
                return allLangs.size;
            };

            // Přeložit texty pomocí AI a uložit do slovníku
            const translateTexts = async (targetLang) => {
                // Pokud máme předgenerované překlady, použij je (funguje i offline!)
                if (prebuiltTranslations[targetLang]) {
                    console.log(`🚀 Používám předgenerovaný překlad pro ${targetLang}`);
                    setCurrentLanguage(targetLang);
                    localStorage.setItem('fixo_language', targetLang);
                    return;
                }

                // Pokud už máme překlady v cache, použij je (instant!)
                if (translations[targetLang]) {
                    console.log(`📚 Používám cache pro ${targetLang}`);
                    setCurrentLanguage(targetLang);
                    localStorage.setItem('fixo_language', targetLang);
                    return;
                }

                // Pokud je cílový jazyk čeština, použij originál
                if (targetLang === 'cs') {
                    setCurrentLanguage('cs');
                    localStorage.setItem('fixo_language', 'cs');
                    return;
                }

                // Zkontrolovat jestli máme API
                if (!API_URL) {
                    alert('Pro překlad do nových jazyků je potřeba spustit backend server.\nJakmile je jazyk přeložen jednou, funguje offline.');
                    return;
                }

                setIsTranslating(true);

                try {
                    const textsToTranslate = Object.values(originalTexts);
                    const keys = Object.keys(originalTexts);
                    const langData = languages.find(l => l.code === targetLang);

                    const response = await fetch(`${API_URL}/api/translate`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            texts: textsToTranslate,
                            targetLanguage: langData?.native || targetLang,
                            sourceLanguage: 'čeština'
                        })
                    });

                    if (response.ok) {
                        const result = await response.json();
                        if (result.success && result.translations) {
                            // Vytvořit slovník z přeložených textů
                            const newLangTranslations = {};
                            keys.forEach((key, index) => {
                                newLangTranslations[key] = result.translations[index] || originalTexts[key];
                            });

                            // Uložit do permanentní cache (slovníku)
                            const newTranslations = {
                                ...translations,
                                [targetLang]: newLangTranslations
                            };
                            saveTranslations(newTranslations);
                            setCurrentLanguage(targetLang);
                            localStorage.setItem('fixo_language', targetLang);

                            console.log(`✅ ${langData?.name || targetLang} přidán do slovníku! Celkem jazyků: ${Object.keys(newTranslations).length}`);
                        }
                    }
                } catch (error) {
                    console.error('Chyba při překladu:', error);
                    alert('Nepodařilo se přeložit. Zkuste to znovu.');
                }

                setIsTranslating(false);
            };

            // Změnit jazyk
            const changeLanguage = (langCode) => {
                setLangDropdownOpen(false);
                translateTexts(langCode);
            };

            // Získat aktuální jazyk
            const getCurrentLanguageData = () => {
                return languages.find(l => l.code === currentLanguage) || languages[0];
            };

            // Zjistit jestli jazyk je v cache (včetně předgenerovaných)
            const isLanguageCached = (langCode) => {
                return langCode === 'cs' || !!prebuiltTranslations[langCode] || !!translations[langCode];
            };

            // AI analýza fotky - používá SmartAnalyzer s učením
            const analyzeImage = async (imageData) => {
                setIsAnalyzing(true);
                setCurrentView('analyzing');

                try {
                    // Použít SmartAnalyzer pokud je dostupný
                    if (smartAnalyzer && imageData) {
                        console.log('🧠 Používám SmartAnalyzer s učením...');

                        const result = await smartAnalyzer.analyze(imageData);

                        if (result) {
                            // Zobrazit zdroj výsledku
                            const sourceLabels = {
                                cache: '<i className="fas fa-box"></i> Cache (naučeno)',
                                embedding: '🔗 Podobný obrázek',
                                classifier: '🤖 Lokální AI',
                                api: '🌐 Cloud AI',
                                simulation: '<i className="fas fa-exclamation-triangle"></i> Simulace'
                            };
                            console.log(`<i className="fas fa-check-circle"></i> Výsledek ze zdroje: ${sourceLabels[result._meta?.source] || 'neznámý'}`);

                            setAnalysisResult({
                                object: result.object,
                                issue: result.issue,
                                confidence: result.confidence,
                                _meta: result._meta
                            });

                            // Aktualizovat statistiky
                            const stats = await smartAnalyzer.getStats();
                            setAnalyzerStats(stats);

                            setIsAnalyzing(false);
                            setCurrentView('results');
                            return;
                        }
                    }

                    // Fallback: Původní API volání (pokud SmartAnalyzer není dostupný)
                    if (API_URL && imageData) {
                        console.log('🚀 Fallback: Odesílám přímo na API:', API_URL);

                        const response = await fetch(`${API_URL}/api/analyze-base64`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ image: imageData })
                        });

                        if (response.ok) {
                            const result = await response.json();
                            if (result.success) {
                                const data = result.data;
                                setAnalysisResult({
                                    object: {
                                        name: data.detection.object.name,
                                        category: data.detection.object.category,
                                        icon: getCategoryIcon(data.detection.object.category)
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
                                });
                                setIsAnalyzing(false);
                                setCurrentView('results');
                                return;
                            }
                        }
                    }

                    // Fallback: Simulovaná analýza
                    console.log('🔄 Používám SIMULACI');
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    const objects = Object.keys(repairDatabase);
                    const randomObject = objects[Math.floor(Math.random() * objects.length)];
                    const objectData = repairDatabase[randomObject];
                    const randomIssue = objectData.issues[0];

                    setAnalysisResult({
                        object: objectData,
                        issue: randomIssue,
                        confidence: Math.floor(Math.random() * 20) + 80,
                        _meta: { source: 'simulation' }
                    });
                } catch (error) {
                    console.error('Chyba při analýze:', error);
                    // Fallback na simulaci při chybě
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    const objects = Object.keys(repairDatabase);
                    const randomObject = objects[Math.floor(Math.random() * objects.length)];
                    const objectData = repairDatabase[randomObject];
                    const randomIssue = objectData.issues[0];

                    setAnalysisResult({
                        object: objectData,
                        issue: randomIssue,
                        confidence: Math.floor(Math.random() * 20) + 80,
                        _meta: { source: 'error' }
                    });
                }

                setIsAnalyzing(false);
                setCurrentView('results');
            };

            // Pomocná funkce pro získání ikony kategorie (Font Awesome)
            const getCategoryIcon = (category) => {
                const icons = {
                    voda: 'fa-tint', elektrina: 'fa-bolt', topeni: 'fa-thermometer-half',
                    dvere_okna: 'fa-door-open', nabytek: 'fa-couch', spotrebice: 'fa-plug',
                    kuchyn: 'fa-utensils', koupelna: 'fa-shower', steny_podlahy: 'fa-home', zahrada: 'fa-leaf'
                };
                return icons[category] || 'fa-wrench';
            };

            // === KRESLENÍ NA FOTKU ===
            const initCanvas = () => {
                const canvas = canvasRef.current;
                if (!canvas || !selectedImage) return;

                const img = new Image();
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                };
                img.src = selectedImage;
            };

            // Efekt pro inicializaci canvasu když se změní obrázek
            useEffect(() => {
                if (selectedImage && isDrawingMode) {
                    initCanvas();
                }
            }, [selectedImage, isDrawingMode]);

            const startDrawing = (e) => {
                if (!isDrawingMode) return;
                setIsDrawing(true);
                draw(e);
            };

            const stopDrawing = () => {
                setIsDrawing(false);
                const canvas = canvasRef.current;
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx.beginPath();
                }
            };

            const draw = (e) => {
                if (!isDrawing || !isDrawingMode) return;
                e.preventDefault();
                const canvas = canvasRef.current;
                if (!canvas) return;

                const ctx = canvas.getContext('2d');
                const rect = canvas.getBoundingClientRect();
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;

                // Podpora pro touch i mouse
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;

                const x = (clientX - rect.left) * scaleX;
                const y = (clientY - rect.top) * scaleY;

                // Neon glow effect
                ctx.lineWidth = brushSize * 2;
                ctx.lineCap = 'round';
                ctx.strokeStyle = brushColor;
                ctx.shadowColor = brushColor;
                ctx.shadowBlur = 15;

                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
            };

            // Place a neon marker on click/tap
            const placeMarker = (e) => {
                if (!isDrawingMode) return;
                const canvas = canvasRef.current;
                if (!canvas) return;

                const rect = canvas.getBoundingClientRect();
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;

                // Správný výpočet s poměrem canvas/zobrazení
                const ctx = canvas.getContext('2d');
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;
                const canvasX = (clientX - rect.left) * scaleX;
                const canvasY = (clientY - rect.top) * scaleY;

                // Velikost markeru proporční k rozlišení obrázku
                const markerRadius = Math.min(canvas.width, canvas.height) * 0.03;

                // Draw neon circle marker on canvas
                ctx.beginPath();
                ctx.arc(canvasX, canvasY, markerRadius, 0, 2 * Math.PI);
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = Math.max(4, markerRadius / 5);
                ctx.shadowColor = '#00ffff';
                ctx.shadowBlur = 20;
                ctx.stroke();
                ctx.shadowBlur = 0;
            };

            const clearCanvas = () => {
                initCanvas();
            };

            const saveAnnotatedImage = () => {
                const canvas = canvasRef.current;
                if (canvas) {
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    setAnnotatedImage(dataUrl);
                    setIsDrawingMode(false);
                    return dataUrl;
                }
                return selectedImage;
            };

            const analyzeWithAnnotation = () => {
                const imageToAnalyze = saveAnnotatedImage();
                analyzeImage(imageToAnalyze);
            };

            const handleImageUpload = (event) => {
                const file = event.target.files[0];
                if (file) {
                    processFile(file);
                }
            };

            // Komprese obrázku před odesláním (pro iPhone a vysoké rozlišení)
            const compressImage = (file, maxWidth = 1920, quality = 0.8) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = new Image();
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            let width = img.width;
                            let height = img.height;

                            // Zmenšit pokud je větší než maxWidth
                            if (width > maxWidth) {
                                height = Math.round((height * maxWidth) / width);
                                width = maxWidth;
                            }

                            canvas.width = width;
                            canvas.height = height;

                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0, width, height);

                            // Komprimovat jako JPEG
                            const compressedData = canvas.toDataURL('image/jpeg', quality);
                            console.log(`Komprese: ${(file.size / 1024 / 1024).toFixed(2)}MB -> ${(compressedData.length / 1024 / 1024).toFixed(2)}MB`);
                            resolve(compressedData);
                        };
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                });
            };

            const processFile = async (file) => {
                if (file && file.type.startsWith('image/')) {
                    // Komprimovat obrázek před odesláním
                    const compressedImage = await compressImage(file);
                    setSelectedImage(compressedImage);
                    setAnnotatedImage(null);
                    setIsDrawingMode(false);
                    setCurrentView('preview'); // Zobrazit náhled s možností kreslení
                }
            };

            // Drag & Drop handlers
            const handleDragOver = (e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(true);
            };

            const handleDragLeave = (e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
            };

            const handleDrop = (e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);

                const files = e.dataTransfer.files;
                if (files && files.length > 0) {
                    processFile(files[0]);
                }
            };

            // Filtrování databáze podle kategorie a vyhledávání
            const getFilteredDatabase = () => {
                let results = Object.entries(repairDatabase);

                // Filtrovat podle kategorie
                if (selectedCategory !== 'all') {
                    results = results.filter(([key, item]) => item.category === selectedCategory);
                }

                // Filtrovat podle vyhledávacího výrazu
                if (searchTerm.trim()) {
                    const search = searchTerm.toLowerCase().trim();
                    results = results.filter(([key, item]) => {
                        // Hledat v názvu opravy
                        if (item.name?.toLowerCase().includes(search)) return true;
                        // Hledat v issues
                        if (item.issues?.some(issue =>
                            issue.name?.toLowerCase().includes(search) ||
                            issue.description?.toLowerCase().includes(search) ||
                            issue.tools?.some(tool => tool.toLowerCase().includes(search))
                        )) return true;
                        return false;
                    });
                }

                return results;
            };

            // Generuje checklist items na základě typu opravy
            const generateChecklistItems = (issue) => {
                // Pokud issue má preRepairChecklist z databáze, použij ho
                if (issue.preRepairChecklist && issue.preRepairChecklist.length > 0) {
                    return issue.preRepairChecklist.map(item => ({
                        id: item.id,
                        text: item.text,
                        icon: item.critical ? 'fa-exclamation-triangle' : 'fa-check-circle',
                        important: item.critical
                    }));
                }

                // Fallback na generované položky
                const items = [
                    { id: 'tools', text: 'Mám připravené všechny nástroje', icon: 'fa-toolbox' },
                    { id: 'time', text: `Mám dostatek času (${issue.timeEstimate})`, icon: 'fa-clock' },
                    { id: 'space', text: 'Mám dostatek prostoru pro práci', icon: 'fa-expand' }
                ];

                // Přidat specifické položky podle rizika
                if (issue.riskScore >= 5) {
                    items.unshift({ id: 'safety', text: 'Přečetl/a jsem bezpečnostní varování', icon: 'fa-exclamation-triangle', important: true });
                }

                // Přidat položky podle kategorie/typu opravy
                const issueName = issue.name?.toLowerCase() || '';
                if (issueName.includes('kohoutek') || issueName.includes('voda') || issueName.includes('wc') || issueName.includes('odpad')) {
                    items.push({ id: 'water', text: 'Uzavřel/a jsem přívod vody', icon: 'fa-tint', important: true });
                }
                if (issueName.includes('zásuvk') || issueName.includes('elektr') || issueName.includes('světl') || issueName.includes('vypínač')) {
                    items.push({ id: 'electricity', text: 'Vypnul/a jsem jistič / elektřinu', icon: 'fa-bolt', important: true });
                }
                if (issueName.includes('plyn') || issueName.includes('kotel')) {
                    items.push({ id: 'gas', text: 'Uzavřel/a jsem přívod plynu', icon: 'fa-fire', important: true });
                }

                return items;
            };

            const startRepair = (issue) => {
                // Zobrazit checklist před zahájením
                setPendingIssue(issue);
                const items = generateChecklistItems(issue);
                const initialState = {};
                items.forEach(item => { initialState[item.id] = false; });
                setChecklistItems(initialState);
                setShowChecklist(true);
            };

            const confirmChecklist = () => {
                const issue = pendingIssue;
                setShowChecklist(false);
                setPendingIssue(null);

                setSelectedIssue(issue);
                setCurrentStep(0);
                setCurrentView('repair');

                // Přidat do historie s detaily
                const historyItem = {
                    id: Date.now(),
                    date: new Date().toLocaleString('cs-CZ'),
                    object: analysisResult?.object?.name || 'Neznámý objekt',
                    issue: issue.name,
                    status: 'in_progress',
                    timeEstimate: issue.timeEstimate,
                    tools: issue.tools || [],
                    steps: issue.steps || [],
                    riskScore: issue.riskScore,
                    difficulty: issue.difficulty
                };
                setRepairHistory([historyItem, ...repairHistory]);
            };

            const cancelChecklist = () => {
                setShowChecklist(false);
                setPendingIssue(null);
                setChecklistItems({});
            };

            // Funkce pro načtení a zobrazení řemeslníků
            const loadCraftsmen = async () => {
                try {
                    const response = await fetch('data/craftsmen.json');
                    const data = await response.json();
                    setCraftsmenData(data);
                    setShowCraftsmen(true);
                } catch (error) {
                    console.error('Chyba při načítání řemeslníků:', error);
                    alert('Nepodařilo se načíst databázi řemeslníků. Zkuste to prosím později.');
                }
            };

            const getFilteredCraftsmen = () => {
                if (!craftsmenData) return [];
                let craftsmen = craftsmenData.craftsmen;

                // Filtrovat podle kategorie
                if (selectedCraftsmanCategory !== 'all') {
                    craftsmen = craftsmen.filter(c => c.category === selectedCraftsmanCategory);
                }

                // Seřadit podle hodnocení
                return craftsmen.sort((a, b) => b.rating - a.rating);
            };

            const getCraftsmenForCategory = (category) => {
                if (!craftsmenData) return [];
                return craftsmenData.craftsmen
                    .filter(c => c.category === category || c.specializations?.includes(category))
                    .sort((a, b) => b.rating - a.rating);
            };

            // Affiliate odkazy na e-shopy (pouze e-shopy s affiliate programem)
            // Hornbach NEPODPORUJE affiliate program - odstraněn
            const affiliateLinks = {
                alza: {
                    name: 'Alza',
                    icon: 'fa-shopping-cart',
                    color: '#ff6600',
                    baseUrl: 'https://www.alza.cz/search.htm?exps=',
                    hasAffiliate: true,
                    affiliateId: 'fixo_affiliate'
                },
                mall: {
                    name: 'Mall.cz',
                    icon: 'fa-store',
                    color: '#e4002b',
                    baseUrl: 'https://www.mall.cz/hledej?s=',
                    hasAffiliate: true,
                    affiliateId: 'fixo_mall'
                },
                obi: {
                    name: 'OBI',
                    icon: 'fa-tools',
                    color: '#f47920',
                    baseUrl: 'https://www.obi.cz/search/?q=',
                    hasAffiliate: true,
                    affiliateId: 'fixo_obi'
                },
                datart: {
                    name: 'Datart',
                    icon: 'fa-plug',
                    color: '#e30613',
                    baseUrl: 'https://www.datart.cz/vyhledavani/?q=',
                    hasAffiliate: true,
                    affiliateId: 'fixo_datart'
                },
                conrad: {
                    name: 'Conrad',
                    icon: 'fa-microchip',
                    color: '#0066b3',
                    baseUrl: 'https://www.conrad.cz/search.html?search=',
                    hasAffiliate: true,
                    affiliateId: 'fixo_conrad'
                },
                mountfield: {
                    name: 'Mountfield',
                    icon: 'fa-tractor',
                    color: '#009639',
                    baseUrl: 'https://www.mountfield.cz/hledej?q=',
                    hasAffiliate: true,
                    affiliateId: 'fixo_mountfield'
                }
            };

            // Cenový model
            const PRICING = {
                detailedGuide: 0.99, // € za jeden detailní návod
                supplierMonthly: 9.90, // € měsíčně pro dodavatele
                supplierYearly: 99.00, // € ročně pro dodavatele (2 měsíce zdarma)
                currency: '€'
            };

            const getAffiliateUrl = (shop, toolName, issue = null) => {
                // Pokud máme specifické affiliate odkazy v databázi, použijeme je
                if (issue && issue.affiliateLinks) {
                    const toolLink = issue.affiliateLinks.find(
                        al => al.item.toLowerCase() === toolName.toLowerCase()
                    );
                    if (toolLink && toolLink.links) {
                        const shopLink = toolLink.links.find(
                            l => l.store.toLowerCase() === shop.toLowerCase()
                        );
                        if (shopLink && shopLink.url) {
                            return shopLink.url;
                        }
                    }
                }
                // Fallback na generický vyhledávací odkaz
                const searchTerm = encodeURIComponent(toolName);
                // Kontrola zda shop existuje a má affiliate program
                if (affiliateLinks[shop] && affiliateLinks[shop].hasAffiliate) {
                    return affiliateLinks[shop].baseUrl + searchTerm;
                }
                // Výchozí fallback na Alza
                return affiliateLinks.alza.baseUrl + searchTerm;
            };

            // Export shopping list
            const exportShoppingList = (issue) => {
                if (!issue || !issue.tools) return;

                const listText = [
                    `<i className="fas fa-tools"></i> FIXO - Nákupní seznam`,
                    `<i className="fas fa-clipboard"></i> Oprava: ${issue.name}`,
                    `📅 ${new Date().toLocaleDateString('cs-CZ')}`,
                    ``,
                    `Potřebné nástroje a materiál:`,
                    `─────────────────────────`,
                    ...issue.tools.map((tool, idx) => `☐ ${tool}`),
                    ``,
                    `─────────────────────────`,
                    `Vygenerováno aplikací FIXO`,
                    `www.fixo.cz`
                ].join('\n');

                // Try to use native share if available
                if (navigator.share) {
                    navigator.share({
                        title: 'FIXO - Nákupní seznam',
                        text: listText
                    }).catch(() => {
                        // Fallback to clipboard
                        copyToClipboard(listText);
                    });
                } else {
                    copyToClipboard(listText);
                }
            };

            const copyToClipboard = (text) => {
                navigator.clipboard.writeText(text).then(() => {
                    alert('<i className="fas fa-check-circle"></i> Nákupní seznam zkopírován do schránky!\n\nMůžeš ho vložit do poznámek nebo poslat SMS.');
                }).catch(() => {
                    // Fallback for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = text;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    alert('<i className="fas fa-check-circle"></i> Nákupní seznam zkopírován do schránky!');
                });
            };

            // Offline storage - saved guides
            const [savedGuides, setSavedGuides] = useState(() => {
                const saved = localStorage.getItem('fixo-saved-guides');
                return saved ? JSON.parse(saved) : [];
            });

            // Save guide for offline
            const saveGuideOffline = (issue) => {
                if (!issue) return;

                const guideData = {
                    id: `guide_${Date.now()}`,
                    savedAt: new Date().toISOString(),
                    name: issue.name,
                    description: issue.description,
                    tools: issue.tools,
                    steps: issue.steps,
                    timeEstimate: issue.timeEstimate,
                    difficulty: issue.difficulty,
                    riskScore: issue.riskScore,
                    safetyWarnings: issue.safetyWarnings,
                    costEstimate: issue.costEstimate
                };

                const existingIndex = savedGuides.findIndex(g => g.name === issue.name);
                let newGuides;

                if (existingIndex >= 0) {
                    // Update existing
                    newGuides = [...savedGuides];
                    newGuides[existingIndex] = guideData;
                } else {
                    // Add new
                    newGuides = [guideData, ...savedGuides];
                }

                setSavedGuides(newGuides);
                localStorage.setItem('fixo-saved-guides', JSON.stringify(newGuides));
                alert('<i className="fas fa-check-circle"></i> Návod uložen pro offline použití!\n\nNajdeš ho v sekci "Uložené návody" v menu.');
            };

            const deleteOfflineGuide = (guideId) => {
                const newGuides = savedGuides.filter(g => g.id !== guideId);
                setSavedGuides(newGuides);
                localStorage.setItem('fixo-saved-guides', JSON.stringify(newGuides));
            };

            const isGuideSaved = (issueName) => {
                return savedGuides.some(g => g.name === issueName);
            };

            const loadOfflineGuide = (guide) => {
                setSelectedIssue(guide);
                setCurrentStep(0);
                setCurrentView('repair');
            };

            // Stopwatch/Timer for repair steps
            const [timerRunning, setTimerRunning] = useState(false);
            const [elapsedTime, setElapsedTime] = useState(0);
            const timerRef = useRef(null);

            const startTimer = () => {
                if (!timerRunning) {
                    setTimerRunning(true);
                    timerRef.current = setInterval(() => {
                        setElapsedTime(prev => prev + 1);
                    }, 1000);
                }
            };

            const pauseTimer = () => {
                setTimerRunning(false);
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };

            const resetTimer = () => {
                pauseTimer();
                setElapsedTime(0);
            };

            const formatTime = (seconds) => {
                const hrs = Math.floor(seconds / 3600);
                const mins = Math.floor((seconds % 3600) / 60);
                const secs = seconds % 60;
                if (hrs > 0) {
                    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                }
                return `${mins}:${secs.toString().padStart(2, '0')}`;
            };

            // Cleanup timer on unmount or view change
            useEffect(() => {
                return () => {
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                    }
                };
            }, []);

            // Reset timer when starting new repair
            useEffect(() => {
                if (currentView === 'repair') {
                    resetTimer();
                }
            }, [selectedIssue]);

            // Social sharing state
            const [showShareModal, setShowShareModal] = useState(false);
            const [shareData, setShareData] = useState(null);

            // Generate shareable content
            const generateShareContent = (issue, timeSpent) => {
                const timeText = timeSpent > 0 ? formatTime(timeSpent) : issue?.timeEstimate || 'rychle';
                const savingsMin = issue?.costEstimate ? Math.round((issue.costEstimate.min + issue.costEstimate.max) / 2 * 4) : 500;
                const savingsMax = issue?.costEstimate ? Math.round((issue.costEstimate.min + issue.costEstimate.max) / 2 * 7) : 1500;

                return {
                    title: `Opravil/a jsem: ${issue?.name || 'závadu'}`,
                    text: `Právě jsem opravil/a "${issue?.name || 'závadu'}" za ${timeText}! Ušetřil/a jsem ${savingsMin}-${savingsMax} Kč díky #FIXO. DIY je pecka!`,
                    hashtags: ['FIXO', 'DIY', 'oprava', 'šikovnost', 'ušetřeno'],
                    emoji: '<i className="fas fa-wrench"></i><i className="fas fa-check-circle"></i><i className="fas fa-dumbbell"></i>',
                    url: 'https://fixo.cz'
                };
            };

            const shareToTwitter = (content) => {
                const text = encodeURIComponent(`${content.emoji} ${content.text}`);
                const hashtags = encodeURIComponent(content.hashtags.join(','));
                const url = `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}`;
                window.open(url, '_blank', 'width=600,height=400');
            };

            const shareToFacebook = (content) => {
                const text = encodeURIComponent(`${content.emoji} ${content.text}\n\n#${content.hashtags.join(' #')}`);
                const url = `https://www.facebook.com/sharer/sharer.php?quote=${text}`;
                window.open(url, '_blank', 'width=600,height=400');
            };

            const shareNative = async (content) => {
                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: content.title,
                            text: `${content.emoji} ${content.text}`,
                            url: content.url
                        });
                    } catch (err) {
                        // User cancelled or error
                        copyShareText(content);
                    }
                } else {
                    copyShareText(content);
                }
            };

            const copyShareText = (content) => {
                const fullText = `${content.emoji} ${content.text}\n\n#${content.hashtags.join(' #')}\n${content.url}`;
                navigator.clipboard.writeText(fullText).then(() => {
                    alert('<i className="fas fa-check-circle"></i> Text zkopírován do schránky!\n\nMůžeš ho vložit kamkoliv na sociální sítě.');
                });
            };

            const completeRepair = () => {
                // Aktualizovat historii
                setRepairHistory(prev => prev.map(item =>
                    item.id === repairHistory[0].id
                        ? {...item, status: 'completed', actualTime: elapsedTime}
                        : item
                ));

                // Připravit data pro sdílení a zobrazit modal
                const content = generateShareContent(selectedIssue, elapsedTime);
                setShareData({
                    ...content,
                    issue: selectedIssue,
                    timeSpent: elapsedTime
                });
                setShowShareModal(true);
            };

            const closeShareAndFinish = () => {
                setShowShareModal(false);
                setShareData(null);
                setCurrentView('home');
                setSelectedImage(null);
                setAnalysisResult(null);
                setSelectedIssue(null);
                setCurrentStep(0);
                pauseTimer();
            };

            return (
                <div className="app-bg">
                    {/* Překládání overlay */}
                    {isTranslating && (
                        <div className="translating-overlay">
                            <div className="translating-box">
                                <div className="spinner spinner-lg mb-4"></div>
                                <h3 className="text-xl font-bold mb-2">
                                    {t('translating')}
                                </h3>
                                <p className="text-secondary">Vytvářím slovník pro tento jazyk...</p>
                                <p className="text-muted text-sm mt-2">
                                    (příště bude přepnutí okamžité)
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Modal pro popis problému - s upřesňujícími kroky */}
                    {showDescribeModal && (
                        <div className="translating-overlay" onClick={() => { setShowDescribeModal(false); resetClarification(); }}>
                            <div className="translating-box max-w-[500px] max-h-[85vh] overflow-auto" onClick={e => e.stopPropagation()}>

                                {/* Krok 0: Úvodní popis + volba kategorie */}
                                {clarificationStep === 0 && (
                                    <>
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <i className="fas fa-keyboard text-primary"></i>
                                            Popište problém
                                        </h3>

                                        <p className="text-sm text-secondary mb-4">
                                            Napište co se děje - napopsat můžete cokoliv, co nejde vyfotit.
                                        </p>

                                        {/* Text input */}
                                        <textarea
                                            value={problemDescription}
                                            onChange={(e) => setProblemDescription(e.target.value)}
                                            placeholder="Např: Neteče voda z kohoutku, jak rozložit sedačku, dveře drhnou o podlahu, ze zásuvky jiskří..."
                                            className="w-full min-h-[80px] p-3 mb-4 rounded-lg text-base resize-vertical"
                                        />

                                        {/* Voice input button */}
                                        {speechSupported && (
                                            <button
                                                onClick={isListening ? stopListening : startListening}
                                                className={`btn w-full mb-4 ${isListening ? 'btn-danger' : 'btn-secondary'}`}
                                                style={isListening ? {animation: 'pulse 1s infinite'} : {}}
                                            >
                                                <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'} mr-2`}></i>
                                                {isListening ? 'Nahrávám... (klikni pro stop)' : 'Namluvit hlasem'}
                                            </button>
                                        )}

                                        {/* Nebo vybrat kategorii */}
                                        <div className="mb-4">
                                            <p className="text-sm font-semibold mb-2 text-secondary">
                                                Nebo vyberte kategorii problému:
                                            </p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {problemCategories.map(cat => (
                                                    <button
                                                        key={cat.id}
                                                        onClick={() => setSelectedProblemCategory(selectedProblemCategory === cat.id ? null : cat.id)}
                                                        className="p-2 rounded-lg text-sm cursor-pointer text-left"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <i className={`fas ${cat.icon} ${selectedProblemCategory === cat.id ? "text-primary" : "text-muted"}`}></i>
                                                            <span className="font-medium">{cat.name}</span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => { setShowDescribeModal(false); resetClarification(); }}
                                                className="btn btn-secondary flex-1"
                                            >
                                                Zrušit
                                            </button>
                                            <button
                                                onClick={processDescription}
                                                className="btn btn-primary flex-1"
                                                disabled={!problemDescription.trim() && !selectedProblemCategory}
                                            >
                                                <i className="fas fa-search mr-2"></i>
                                                Najít řešení
                                            </button>
                                        </div>
                                    </>
                                )}

                                {/* Krok 1: Vybrat kategorii (pokud nic nenalezeno) */}
                                {clarificationStep === 1 && (
                                    <>
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <i className="fas fa-question-circle text-warning"></i>
                                            Upřesněte problém
                                        </h3>

                                        <div className="p-3 mb-4 rounded-lg bg-warning-light text-sm">
                                            <p className="m-0">
                                                <strong>Váš popis:</strong> "{problemDescription}"
                                            </p>
                                            <p className="mt-2 text-secondary">
                                                Nenašli jsme přesnou shodu. Vyberte kategorii pro upřesnění:
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2 mb-4">
                                            {problemCategories.map(cat => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => {
                                                        setSelectedProblemCategory(cat.id);
                                                        const matches = findMatchingIssues(problemDescription, cat.id);
                                                        setSuggestedIssues(matches);
                                                        setClarificationStep(2);
                                                    }}
                                                    className="p-3 rounded-lg border border-border bg-secondary cursor-pointer text-left"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <i className={`fas ${cat.icon} text-xl text-primary w-8`}></i>
                                                        <div>
                                                            <div className="font-semibold">{cat.name}</div>
                                                            <div className="text-xs text-muted">
                                                                {cat.examples.slice(0, 3).join(' • ')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setClarificationStep(0)}
                                            className="btn btn-secondary w-full"
                                        >
                                            <i className="fas fa-arrow-left mr-2"></i>
                                            Zpět k popisu
                                        </button>
                                    </>
                                )}

                                {/* Krok 2: Zobrazit nalezené problémy */}
                                {clarificationStep === 2 && (
                                    <>
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <i className="fas fa-list-ul text-success"></i>
                                            Vyberte problém
                                        </h3>

                                        {problemDescription && (
                                            <div className="mb-3 rounded-lg bg-secondary text-sm">
                                                <strong>Hledáme:</strong> "{problemDescription}"
                                            </div>
                                        )}

                                        <p className="text-sm text-secondary mb-3">
                                            Nalezeno {suggestedIssues.length} možných problémů. Vyberte ten správný:
                                        </p>

                                        <div className="flex flex-col gap-2 mb-4 max-h-[300px] overflow-auto">
                                            {suggestedIssues.length > 0 ? suggestedIssues.map((issue, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => selectSuggestedIssue(issue)}
                                                    className="p-3 rounded-lg border border-border cursor-pointer text-left"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <div className="font-semibold mb-1">
                                                                {issue.name}
                                                            </div>
                                                            <div className="text-xs text-muted">
                                                                {issue.objectName}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-xs text-muted">
                                                                <i className="fas fa-clock mr-1"></i>{issue.timeEstimate}
                                                            </div>
                                                            <span className={`text-[10px] px-1.5 py-[2px] rounded-full ${issue.riskScore > 5 ? "bg-danger-light text-danger" : issue.riskScore > 2 ? "bg-warning-light text-warning" : "bg-success-light text-success"}`}>
                                                                Riziko: {issue.riskScore}/10
                                                            </span>
                                                        </div>
                                                    </div>
                                                </button>
                                            )) : (
                                                <div className="text-center p-6 text-muted">
                                                    <i className="fas fa-search text-3xl mb-2 block opacity-50"></i>
                                                    <p>Žádné problémy v této kategorii nenalezeny.</p>
                                                    <p className="text-xs">Zkuste upravit popis nebo vybrat jinou kategorii.</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setClarificationStep(selectedProblemCategory ? 1 : 0)}
                                                className="btn btn-secondary flex-1"
                                            >
                                                <i className="fas fa-arrow-left mr-2"></i>
                                                Zpět
                                            </button>
                                            <button
                                                onClick={analyzeWithDescription}
                                                className="btn btn-primary flex-1"
                                                disabled={!problemDescription.trim()}
                                            >
                                                <i className="fas fa-robot mr-2"></i>
                                                AI analýza
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Modal s informacemi o funkcích FIXO */}
                    {showFeaturesModal && (
                        <div className="translating-overlay" onClick={() => setShowFeaturesModal(false)}>
                            <div className="translating-box max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <span style={{
                                        background: 'var(--gradient-primary)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}>FIXO</span>
                                    <span>Funkce</span>
                                </h3>

                                {/* AI analýza fotografií */}
                                <div className="mb-6 p-4 rounded-lg bg-primary-light border border-primary">
                                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <i className="fas fa-brain text-primary"></i>
                                        AI Analýza fotografií
                                    </h4>
                                    <p className="text-sm text-secondary mb-3">
                                        Pokročilá umělá inteligence analyzuje vaše fotografie a identifikuje závady s vysokou přesností.
                                    </p>
                                    <ul className="text-sm text-secondary m-0 p-0 pl-4 space-y-2 list-none">
                                        <li><i className="fas fa-check text-success mr-2"></i>Rozpoznávání 50+ typů spotřebičů a zařízení</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Detekce konkrétních závad a poruch</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Automatická kategorizace problémů</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Samoučící se systém - přesnost se neustále zlepšuje</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Okamžitá analýza - výsledky za sekundy</li>
                                    </ul>
                                </div>

                                {/* 500+ návodů na opravy */}
                                <div className="mb-6 p-4 rounded-lg bg-success-light border border-success">
                                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <i className="fas fa-tools text-success"></i>
                                        500+ Návodů na opravy
                                    </h4>
                                    <p className="text-sm text-secondary mb-3">
                                        Rozsáhlá databáze krok za krokem návodů pro opravy domácích spotřebičů a zařízení.
                                    </p>
                                    <ul className="text-sm text-secondary m-0 p-0 pl-4 space-y-2 list-none">
                                        <li><i className="fas fa-check text-success mr-2"></i>Kuchyňské spotřebiče (lednice, trouby, mikrovlnky, myčky...)</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Pračky, sušičky a praní</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Elektronika (TV, audio, počítače...)</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Topení, klimatizace a ventilace</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Voda, elektřina a instalace</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Podrobné kroky s ilustracemi</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Časové odhady a potřebné nářadí</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Tipy od zkušených techniků</li>
                                    </ul>
                                </div>

                                {/* Bezpečnostní upozornění */}
                                <div className="mb-6 p-4 rounded-lg bg-danger-light border border-danger">
                                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <i className="fas fa-exclamation-triangle text-danger"></i>
                                        Bezpečnostní upozornění
                                    </h4>
                                    <p className="text-sm text-secondary mb-3">
                                        FIXO vás chrání před nebezpečnými situacemi a radí, kdy je nutné zavolat odborníka.
                                    </p>
                                    <ul className="text-sm text-secondary m-0 p-0 pl-4 space-y-2 list-none">
                                        <li><i className="fas fa-bolt text-warning mr-2"></i>Varování při práci s elektřinou (vysoké napětí, zkraty)</li>
                                        <li><i className="fas fa-fire text-danger mr-2"></i>Upozornění na riziko požáru nebo výbuchu</li>
                                        <li><i className="fas fa-tint text-info mr-2"></i>Varování před únikem vody nebo plynu</li>
                                        <li><i className="fas fa-skull-crossbones text-danger mr-2"></i>Identifikace toxických látek (chladiva, azbestů...)</li>
                                        <li><i className="fas fa-user-cog text-primary mr-2"></i>Doporučení, kdy je nutný certifikovaný technik</li>
                                        <li><i className="fas fa-clipboard-list text-primary mr-2"></i>Právní požadavky a záruční podmínky</li>
                                        <li><i className="fas fa-shield-alt text-primary mr-2"></i>Ochranné pomůcky a bezpečnostní postupy</li>
                                    </ul>
                                </div>

                                {/* Zavřít */}
                                <button
                                    onClick={() => setShowFeaturesModal(false)}
                                    className="btn btn-primary w-full"
                                >
                                    <i className="fas fa-check mr-2"></i>
                                    Rozumím
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Modal pro opravu špatné analýzy (Feedback) */}
                    {showFeedbackModal && (
                        <div className="translating-overlay" onClick={() => setShowFeedbackModal(false)}>
                            <div className="translating-box max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <i className="fas fa-edit text-warning"></i>
                                    Opravit analýzu
                                </h3>

                                <p className="text-sm text-secondary mb-4">
                                    Vyberte správnou závadu z databáze. Vaše oprava pomůže zlepšit rozpoznávání pro všechny.
                                </p>

                                {/* Vyhledávání */}
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Hledat závadu..."
                                        value={feedbackSearch}
                                        onChange={(e) => setFeedbackSearch(e.target.value)}
                                        className="w-full p-3 rounded-lg text-sm"
                                    />
                                </div>

                                {/* Filtry kategorií */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <button
                                        onClick={() => setFeedbackCategory('all')}
                                        className="border-none cursor-pointer"
                                    >
                                        Vše
                                    </button>
                                    {categoriesData.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setFeedbackCategory(cat.id)}
                                            className="border-none cursor-pointer"
                                        >
                                            <i className={`fas ${cat.icon} mr-1`}></i>
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Seznam závad */}
                                <div className="max-h-[300px] overflow-auto mb-4">
                                    {Object.entries(repairDatabase)
                                        .filter(([key, obj]) => {
                                            if (feedbackCategory !== 'all' && obj.category !== feedbackCategory) return false;
                                            if (feedbackSearch) {
                                                const search = feedbackSearch.toLowerCase();
                                                return obj.name.toLowerCase().includes(search) ||
                                                    obj.issues.some(i => i.name.toLowerCase().includes(search));
                                            }
                                            return true;
                                        })
                                        .map(([key, obj]) => (
                                            <div key={key} className="mb-3">
                                                <div className="text-sm text-secondary">
                                                    <i className={`fas ${getCategoryIcon(obj.category)}`}></i>
                                                    {obj.name}
                                                </div>
                                                {obj.issues
                                                    .filter(issue => !feedbackSearch || issue.name.toLowerCase().includes(feedbackSearch.toLowerCase()))
                                                    .map((issue, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => submitFeedback(obj, issue)}
                                                            className="w-full rounded-md border border-border text-sm cursor-pointer text-left"
                                                        >
                                                            <span>{issue.name}</span>
                                                            <i className="fas fa-chevron-right text-muted text-xs"></i>
                                                        </button>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </div>

                                {/* Zavřít */}
                                <button
                                    onClick={() => setShowFeedbackModal(false)}
                                    className="btn btn-secondary w-full"
                                >
                                    Zrušit
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Modal pro platbu za detailní návod */}
                    {showDetailedGuidePayment && analysisResult && (
                        <div className="translating-overlay" onClick={() => setShowDetailedGuidePayment(false)}>
                            <div className="translating-box max-w-md text-center" onClick={e => e.stopPropagation()}>
                                <div className="text-6xl mb-4">
                                    <i className="fas fa-crown text-purple-600"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-2">
                                    Detailní návod
                                </h3>
                                <p className="text-sm text-secondary mb-4">
                                    Získejte kompletní návod s detailními kroky, schématy a tipy odborníků.
                                </p>

                                <div className="p-4 mb-4 rounded-lg">
                                    <div className="text-3xl font-bold">
                                        {PRICING.detailedGuide} {PRICING.currency}
                                    </div>
                                    <div className="text-sm opacity-90">jednorázová platba</div>
                                </div>

                                <ul className="mb-4 text-sm text-left">
                                    <li><i className="fas fa-check text-success mr-2"></i>Kompletní postup s 10+ kroky</li>
                                    <li><i className="fas fa-check text-success mr-2"></i>Technická schémata a diagramy</li>
                                    <li><i className="fas fa-check text-success mr-2"></i>Tipy od profesionálů</li>
                                    <li><i className="fas fa-check text-success mr-2"></i>Seznam kompatibilních náhradních dílů</li>
                                    <li><i className="fas fa-check text-success mr-2"></i>Offline přístup navždy</li>
                                </ul>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowDetailedGuidePayment(false)}
                                        className="btn btn-secondary flex-1"
                                    >
                                        Zrušit
                                    </button>
                                    <button
                                        onClick={() => purchaseDetailedGuide(analysisResult.issue)}
                                        className="btn btn-primary flex-1"
                                        className="gradient-purple"
                                    >
                                        <i className="fas fa-credit-card mr-2"></i>
                                        Koupit
                                    </button>
                                </div>

                                <p className="text-xs text-muted mt-3">
                                    <i className="fas fa-lock mr-1"></i>
                                    Bezpečná platba přes Stripe
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Overlay pro nejbližší dodavatele/opraváře */}
                    {showNearbySuppliers && (
                        <div className="translating-overlay" onClick={() => setShowNearbySuppliers(false)}>
                            <div className="translating-box max-w-lg max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <i className="fas fa-map-marker-alt text-primary"></i>
                                    Odborníci ve vašem okolí
                                </h3>

                                <div className="p-3 mb-4 rounded-lg bg-info-light text-sm">
                                    <i className="fas fa-info-circle mr-2 text-info"></i>
                                    Zobrazujeme ověřené odborníky seřazené podle vzdálenosti od vaší polohy.
                                </div>

                                {/* Seznam dodavatelů */}
                                <div className="flex flex-col gap-3">
                                    {[
                                        { id: 1, name: 'Jan Novák - Instalatér', category: 'Instalatérství', phone: '+420 123 456 789', rating: 4.8, distance: 1.2, isPremium: true },
                                        { id: 2, name: 'Elektro Servis Praha', category: 'Elektrikář', phone: '+420 987 654 321', rating: 4.5, distance: 2.5, isPremium: true },
                                        { id: 3, name: 'Truhlářství Koval', category: 'Truhlář', phone: '+420 555 666 777', rating: 4.9, distance: 3.1, isPremium: true }
                                    ].map(supplier => (
                                        <div key={supplier.id} className="p-4 rounded-lg">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold">{supplier.name}</span>
                                                        {supplier.isPremium && (
                                                            <span className="bg-warning text-white px-1.5 py-[2px] rounded-full text-[10px] font-bold">
                                                                <i className="fas fa-star mr-1"></i>PREMIUM
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-secondary">
                                                        {supplier.category}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-[2px] text-warning text-sm">
                                                        <i className="fas fa-star"></i>
                                                        <span className="font-bold">{supplier.rating}</span>
                                                    </div>
                                                    <div className="text-xs text-muted">
                                                        <i className="fas fa-map-marker-alt mr-1"></i>{supplier.distance} km
                                                    </div>
                                                </div>
                                            </div>
                                            <a
                                                href={`tel:${supplier.phone}`}
                                                className="p-3 rounded-lg"
                                            >
                                                <i className="fas fa-phone"></i>
                                                {supplier.phone}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                {/* Registrace pro dodavatele */}
                                <div className="p-4 rounded-lg text-center">
                                    <p className="font-semibold mb-2">
                                        <i className="fas fa-user-tie mr-2"></i>
                                        Jste odborník nebo firma?
                                    </p>
                                    <p className="text-sm text-secondary mb-3">
                                        Registrujte se a získejte nové zakázky od zákazníků ve vašem okolí.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setShowNearbySuppliers(false);
                                            setShowSupplierRegistration(true);
                                        }}
                                        className="btn btn-primary"
                                    >
                                        <i className="fas fa-plus mr-2"></i>
                                        Registrovat se jako odborník
                                    </button>
                                </div>

                                <button
                                    onClick={() => setShowNearbySuppliers(false)}
                                    className="btn btn-secondary w-full"
                                    className="mt-4"
                                >
                                    Zavřít
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Modal pro registraci dodavatelů/opravářů */}
                    {showSupplierRegistration && (
                        <div className="translating-overlay" onClick={() => setShowSupplierRegistration(false)}>
                            <div className="translating-box max-w-[500px] max-h-[85vh] overflow-auto" onClick={e => e.stopPropagation()}>
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <i className="fas fa-briefcase text-primary"></i>
                                    Registrace odborníka
                                </h3>

                                <div className="p-4 mb-4 rounded-lg text-center">
                                    <p className="text-sm mb-2">
                                        Získejte zakázky od zákazníků ve vašem okolí
                                    </p>
                                    <div className="text-xs opacity-90">
                                        Budete zobrazeni uživatelům podle geolokace - nejbližší k zakázce
                                    </div>
                                </div>

                                {/* Cenové plány */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    {/* Měsíční plán */}
                                    <div className="p-4 rounded-lg text-center">
                                        <div className="text-sm font-semibold mb-2">
                                            Měsíční
                                        </div>
                                        <div className="text-2xl font-bold text-primary">
                                            {PRICING.supplierMonthly} {PRICING.currency}
                                        </div>
                                        <div className="text-xs text-muted">
                                            /měsíc
                                        </div>
                                        <button
                                            onClick={() => alert('Platební brána bude brzy dostupná.\n\nMěsíční členství: ' + PRICING.supplierMonthly + ' ' + PRICING.currency)}
                                            className="btn btn-secondary w-full"
                                            className="mt-3 text-sm"
                                        >
                                            Vybrat
                                        </button>
                                    </div>

                                    {/* Roční plán - zvýhodněný */}
                                    <div className="p-4 rounded-lg text-center">
                                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-success text-white px-2.5 py-[2px] rounded-full text-[10px] font-bold">
                                            2 MĚSÍCE ZDARMA
                                        </div>
                                        <div className="text-sm font-semibold mb-2">
                                            Roční
                                        </div>
                                        <div className="text-2xl font-bold text-success">
                                            {PRICING.supplierYearly} {PRICING.currency}
                                        </div>
                                        <div className="text-xs text-muted">
                                            /rok ({(PRICING.supplierYearly / 12).toFixed(2)} {PRICING.currency}/měs)
                                        </div>
                                        <button
                                            onClick={() => alert('Platební brána bude brzy dostupná.\n\nRoční členství: ' + PRICING.supplierYearly + ' ' + PRICING.currency + '\n\nÚspora: ' + ((PRICING.supplierMonthly * 12) - PRICING.supplierYearly).toFixed(2) + ' ' + PRICING.currency + ' (2 měsíce zdarma)')}
                                            className="btn btn-success w-full"
                                            className="mt-3 text-sm"
                                        >
                                            <i className="fas fa-star mr-1"></i>Vybrat
                                        </button>
                                    </div>
                                </div>

                                {/* Co získáte */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold mb-2">
                                        Co získáte:
                                    </h4>
                                    <ul className="text-sm flex flex-col gap-2">
                                        <li><i className="fas fa-check text-success mr-2"></i>Zobrazení uživatelům v okolí</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Prioritní pozice (podle geolokace)</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>PREMIUM badge pro větší důvěru</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Hodnocení a recenze od zákazníků</li>
                                        <li><i className="fas fa-check text-success mr-2"></i>Správa profilu a specializací</li>
                                    </ul>
                                </div>

                                <button
                                    onClick={() => setShowSupplierRegistration(false)}
                                    className="btn btn-secondary w-full"
                                >
                                    Zavřít
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Před-opravní checklist modal - Compact */}
                    {showChecklist && pendingIssue && (
                        <div className="translating-overlay" onClick={cancelChecklist}>
                            <div className="translating-box p-4" onClick={e => e.stopPropagation()}>
                                <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                                    <i className="fas fa-clipboard-check text-primary"></i>
                                    Před zahájením opravy
                                </h3>

                                {/* Checklist items - compact */}
                                <div className="flex flex-col gap-2 mb-3">
                                    {generateChecklistItems(pendingIssue).map(item => (
                                        <label
                                            key={item.id}
                                            className="p-2 rounded-md text-sm cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={checklistItems[item.id] || false}
                                                onChange={() => setChecklistItems(prev => ({...prev, [item.id]: !prev[item.id]}))}
                                                className="w-4 h-4 accent-success"
                                            />
                                            <span className={`flex-1 ${checklistItems[item.id] ? "line-through opacity-60" : ""}`}>
                                                {item.text}
                                                {item.important && <span className="text-danger">*</span>}
                                            </span>
                                        </label>
                                    ))}
                                </div>

                                {/* Nářadí - inline compact */}
                                {pendingIssue.tools && pendingIssue.tools.length > 0 && (
                                    <div className="text-xs text-secondary mb-3">
                                        <strong>Nářadí:</strong> {pendingIssue.tools.join(', ')}
                                    </div>
                                )}

                                {/* Action buttons */}
                                <div className="flex gap-2">
                                    <button onClick={cancelChecklist} className="btn btn-secondary flex-1 p-2">
                                        Zrušit
                                    </button>
                                    <button
                                        onClick={confirmChecklist}
                                        className="btn btn-success flex-1"
                                        disabled={generateChecklistItems(pendingIssue).filter(i => i.important).some(i => !checklistItems[i.id])}
                                        className="p-2"
                                    >
                                        <i className="fas fa-play mr-1"></i>
                                        Začít
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Craftsmen Modal */}
                    {showCraftsmen && craftsmenData && (
                        <div className="translating-overlay" onClick={() => setShowCraftsmen(false)}>
                            <div className="translating-box" onClick={e => e.stopPropagation()}>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <i className="fas fa-hard-hat text-primary"></i>
                                        Najít řemeslníka
                                    </h3>
                                    <button onClick={() => setShowCraftsmen(false)} className="bg-none border-none text-xl cursor-pointer text-secondary">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>

                                {/* Category filter */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <button
                                        onClick={() => setSelectedCraftsmanCategory('all')}
                                        className="border-none text-sm cursor-pointer"
                                    >
                                        Všichni
                                    </button>
                                    {craftsmenData.categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCraftsmanCategory(cat.id)}
                                            className="border-none text-sm cursor-pointer"
                                        >
                                            {cat.icon} {cat.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Craftsmen list */}
                                <div className="flex flex-col gap-3">
                                    {getFilteredCraftsmen().map(craftsman => (
                                        <div key={craftsman.id} className="p-4 rounded-lg border border-border bg-secondary">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-bold text-base mb-1">
                                                        {craftsman.name}
                                                        {craftsman.verified && (
                                                            <i className="fas fa-check-circle ml-2 text-success text-sm"></i>
                                                        )}
                                                    </h4>
                                                    <p className="text-sm text-secondary">{craftsman.company}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-1 text-warning">
                                                        <i className="fas fa-star"></i>
                                                        <span className="font-bold">{craftsman.rating}</span>
                                                        <span className="text-secondary text-xs">
                                                            ({craftsman.reviewCount})
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-secondary">
                                                        {craftsman.city}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-sm text-secondary mb-3">
                                                {craftsman.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className="rounded-md bg-info-light">
                                                    <i className="fas fa-clock"></i> {craftsman.responseTime}
                                                </span>
                                                <span className="rounded-md">
                                                    <i className="fas fa-calendar"></i> {craftsman.availability}
                                                </span>
                                                <span className="rounded-md bg-warning-light">
                                                    <i className="fas fa-money-bill"></i> {craftsman.priceRange.min}-{craftsman.priceRange.max} {craftsman.priceRange.currency}/{craftsman.priceRange.unit}
                                                </span>
                                            </div>

                                            <div className="flex gap-2">
                                                <a
                                                    href={`tel:${craftsman.phone}`}
                                                    className="rounded-md text-sm"
                                                >
                                                    <i className="fas fa-phone"></i> Zavolat
                                                </a>
                                                {craftsman.email && (
                                                    <a
                                                        href={`mailto:${craftsman.email}`}
                                                        className="rounded-md text-sm"
                                                    >
                                                        <i className="fas fa-envelope"></i> Email
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {getFilteredCraftsmen().length === 0 && (
                                        <div className="text-center p-8 text-secondary">
                                            <i className="fas fa-search text-4xl mb-2 block"></i>
                                            <p>Pro tuto kategorii zatím nemáme řemeslníky.</p>
                                            <p className="text-sm">Zkuste vybrat jinou kategorii.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 p-3 bg-info-light rounded-lg">
                                    <p className="text-sm text-secondary text-center">
                                        <i className="fas fa-info-circle mr-2"></i>
                                        Jste řemeslník? <a href="mailto:remeslnik@fixo.cz" className="text-primary font-semibold">Registrujte se</a> a získejte nové zákazníky!
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Social Share Modal - po dokončení opravy */}
                    {showShareModal && shareData && (
                        <div className="translating-overlay" onClick={closeShareAndFinish}>
                            <div className="translating-box" onClick={e => e.stopPropagation()}>
                                {/* Success animation */}
                                <div className="mb-4">
                                    <i className="fas fa-party-horn"></i>
                                </div>

                                <h2 className="text-2xl font-bold text-success mb-2">
                                    Oprava dokončena!
                                </h2>

                                <p className="mb-4">
                                    {shareData.issue?.name}
                                </p>

                                {/* Stats */}
                                <div className="p-4 bg-secondary">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-primary">
                                            {shareData.timeSpent > 0 ? formatTime(shareData.timeSpent) : shareData.issue?.timeEstimate || '-'}
                                        </div>
                                        <div className="text-xs text-muted uppercase">
                                            <i className="fas fa-stopwatch mr-1"></i> Čas
                                        </div>
                                    </div>
                                    <div className="w-px bg-border"></div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-success">
                                            {shareData.issue?.costEstimate
                                                ? `${Math.round((shareData.issue.costEstimate.min + shareData.issue.costEstimate.max) / 2 * 5)} Kč`
                                                : '~1000 Kč'
                                            }
                                        </div>
                                        <div className="text-xs text-muted uppercase">
                                            <i className="fas fa-piggy-bank mr-1"></i> Ušetřeno
                                        </div>
                                    </div>
                                </div>

                                <p className="mb-4 text-sm text-secondary">
                                    Pochlub se svou šikovností na sociálních sítích!
                                </p>

                                {/* Share preview */}
                                <div className="p-4 mb-4 rounded-lg border border-border text-sm text-left">
                                    <p className="mb-2">
                                        {shareData.emoji} {shareData.text}
                                    </p>
                                    <p className="text-primary text-xs">
                                        #{shareData.hashtags.join(' #')}
                                    </p>
                                </div>

                                {/* Share buttons */}
                                <div className="flex gap-2 mb-4 justify-center flex-wrap">
                                    <button
                                        onClick={() => shareToTwitter(shareData)}
                                        className="rounded-lg border-none cursor-pointer"
                                    >
                                        <i className="fab fa-x-twitter"></i>
                                        X / Twitter
                                    </button>
                                    <button
                                        onClick={() => shareToFacebook(shareData)}
                                        className="rounded-lg border-none cursor-pointer"
                                    >
                                        <i className="fab fa-facebook"></i>
                                        Facebook
                                    </button>
                                    <button
                                        onClick={() => shareNative(shareData)}
                                        className="rounded-lg border-none cursor-pointer"
                                    >
                                        <i className="fas fa-share-alt"></i>
                                        Sdílet
                                    </button>
                                </div>

                                {/* Copy button */}
                                <button
                                    onClick={() => copyShareText(shareData)}
                                    className="btn btn-secondary w-full mb-4 text-sm"
                                >
                                    <i className="fas fa-copy mr-2"></i>
                                    Zkopírovat text
                                </button>

                                {/* Skip button */}
                                <button
                                    onClick={closeShareAndFinish}
                                    className="border-none text-sm text-muted cursor-pointer"
                                >
                                    Přeskočit a dokončit
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Unified Header - Sloučený s taglinem */}
                    <header className="top-header header-block" data-block="header">
                        <div className="top-header-content">
                            {/* Logo & Tagline */}
                            <div className="logo-section" onClick={() => navigateTo('home')}>
                                <div className="logo">FIXO</div>
                                <div className="logo-tagline hide-md">První světový standard pro vizuální diagnostiku</div>
                            </div>

                            {/* Stats - pouze na desktop */}
                            <div className="header-stats hide-md">
                                <div className="header-stat">
                                    <span className="text-base font-bold text-primary">500+</span>
                                    <span className="text-xs text-muted">Závad</span>
                                </div>
                                <div className="header-stat">
                                    <span className="text-base font-bold text-primary">30s</span>
                                    <span className="text-xs text-muted">Analýza</span>
                                </div>
                                <div className="header-stat">
                                    <span className="text-base font-bold text-primary">AI</span>
                                    <span className="text-xs text-muted">Powered</span>
                                </div>
                            </div>

                            {/* Header Actions */}
                            <div className="header-actions">
                                {/* Dark Mode Toggle */}
                                <button
                                    className="header-btn"
                                    onClick={toggleDarkMode}
                                    title={darkMode ? 'Světlý režim' : 'Tmavý režim'}
                                >
                                    <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} ${darkMode ? "text-warning" : "text-primary"}`}></i>
                                </button>

                                {/* Language Selector */}
                                <div className="relative">
                                    <button
                                        className="header-btn"
                                        onClick={() => setLangMenuOpen(!langMenuOpen)}
                                        className="w-auto px-2"
                                    >
                                        <span className="text-lg">{getCurrentLanguageData().flag}</span>
                                    </button>

                                    {/* Language Dropdown */}
                                    {langMenuOpen && (
                                        <div className="p-3 border border-border">
                                            <div className="grid grid-cols-5 gap-2">
                                                {languages.map(lang => (
                                                    <button
                                                        key={lang.code}
                                                        onClick={() => { changeLanguage(lang.code); setLangMenuOpen(false); }}
                                                        className="p-2 rounded-lg cursor-pointer text-center"
                                                        title={lang.native}
                                                    >
                                                        {lang.flag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* NEW: Bottom Navigation Bar */}
                    <nav className="bottom-nav navigation-block" data-block="navigation_block">
                        <button
                            className={`bottom-nav-item ${currentView === 'home' || currentView === 'preview' || currentView === 'analyze' || currentView === 'repair' ? 'active' : ''}`}
                            onClick={() => navigateTo('home')}
                        >
                            <i className="fas fa-camera bottom-nav-icon"></i>
                            <span className="bottom-nav-label">Scan</span>
                        </button>

                        <button
                            className={`bottom-nav-item ${currentView === 'knowledge' ? 'active' : ''}`}
                            onClick={() => navigateTo('knowledge')}
                        >
                            <i className="fas fa-book bottom-nav-icon"></i>
                            <span className="bottom-nav-label">Databáze</span>
                        </button>

                        <button
                            className={`bottom-nav-item ${currentView === 'diagnostics' ? 'active' : ''}`}
                            onClick={() => navigateTo('diagnostics')}
                        >
                            <i className="fas fa-chart-line bottom-nav-icon"></i>
                            <span className="bottom-nav-label">AI</span>
                        </button>

                        <button
                            className={`bottom-nav-item ${currentView === 'offline' ? 'active' : ''}`}
                            onClick={() => navigateTo('offline')}
                        >
                            <i className="fas fa-cloud-download-alt bottom-nav-icon"></i>
                            <span className="bottom-nav-label">Offline</span>
                            {savedGuides.length > 0 && (
                                <span className="bottom-nav-badge">{savedGuides.length}</span>
                            )}
                        </button>
                    </nav>

                    {/* NEW: Floating Action Button - Quick Camera */}
                    {currentView === 'home' && (
                        <button
                            className="fab ripple"
                            onClick={() => fileInputRef.current?.click()}
                            title="Vyfotit závadu"
                        >
                            <i className="fas fa-camera"></i>
                        </button>
                    )}

                    {/* PWA Install Banner */}
                    {showInstallBanner && (
                        <div className="install-banner">
                            <div className="install-banner-text">
                                <div className="install-banner-title">Nainstalovat FIXO</div>
                                <div className="install-banner-subtitle">Rychlý přístup přímo z plochy</div>
                            </div>
                            <button className="install-banner-btn" onClick={handleInstallClick}>
                                Instalovat
                            </button>
                            <button className="install-banner-close" onClick={() => setShowInstallBanner(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    )}

                    {/* Main Content */}
                    <main className="main-content">
                        {/* Home View - Single Page s Hero */}
                        {currentView === 'home' && (
                            <div className="content-two-columns">
                                {/* Levy blok - AKCNI */}
                                <div className="content-left">
                                    <div className="upload-card glass-card">
                                        <div className="text-center mb-4">
                                            <h2 className="text-xl font-bold text-primary mb-2">
                                                {t('homeTitle')}
                                            </h2>
                                            <p className="text-secondary text-sm">
                                                {t('homeSubtitle')}
                                            </p>
                                        </div>

                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />

                                        {/* Drag & Drop Zone */}
                                        <div
                                            ref={dropZoneRef}
                                            className={`drop-zone p-6 ${isDragging ? 'drag-over' : ''}`}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current.click()}
                                        >
                                            <div className="drop-zone-icon">
                                                {isDragging ? (
                                                    <i className="fas fa-cloud-upload-alt"></i>
                                                ) : (
                                                    <i className="fas fa-camera"></i>
                                                )}
                                            </div>
                                            <p className="text-base font-semibold mb-1 text-primary">
                                                {isDragging ? t('dropzoneDrop') : t('dropzoneText')}
                                            </p>
                                            <p className="text-secondary text-sm">
                                                {t('dropzoneHint')}
                                            </p>
                                        </div>

                                        {/* Quick Examples - kompaktní */}
                                        <div className="grid grid-6 grid-cols-6 mt-4 gap-2">
                                            {[
                                                { icon: 'fa-tint', name: 'Kohoutek', category: 'voda' },
                                                { icon: 'fa-toilet', name: 'WC', category: 'koupelna' },
                                                { icon: 'fa-plug', name: 'Zásuvka', category: 'elektrina' },
                                                { icon: 'fa-door-open', name: 'Dveře', category: 'dvere_okna' },
                                                { icon: 'fa-lightbulb', name: 'Světlo', category: 'elektrina' },
                                                { icon: 'fa-thermometer-half', name: 'Topení', category: 'topeni' }
                                            ].map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="example-card p-2 cursor-pointer hover:bg-primary-light transition-all"
                                                    onClick={() => {
                                                        navigateTo('knowledge');
                                                        setSelectedCategory(item.category);
                                                    }}
                                                >
                                                    <i className={`fas ${item.icon} text-lg text-primary`}></i>
                                                    <div className="text-xs text-secondary">{item.name}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Nelze vyfotit? - integrováno */}
                                        <div
                                            onClick={() => {
                                                resetClarification();
                                                setShowDescribeModal(true);
                                            }}
                                            className="p-3 rounded-lg bg-primary-light cursor-pointer text-center"
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <i className="fas fa-keyboard text-lg text-primary"></i>
                                                <span className="font-semibold text-primary-dark text-sm">
                                                    Nelze vyfotit? Popište problém
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            {/* Pravy blok - INFORMATIVNI */}
                            <div className="content-right">
                                {/* Jak to funguje */}
                                        <div className="glass-card flex flex-col">
                                            <h3 className="section-title mb-4">
                                                <i className="fas fa-magic"></i>
                                                Jak to funguje?
                                            </h3>
                                            <div className="flex flex-col gap-3 flex-1">
                                                {[
                                                    {
                                                        icon: 'fa-camera',
                                                        title: 'Vyfoťte',
                                                        desc: 'Nafoťte poškozenou věc nebo nahrajte fotku',
                                                        detail: 'Použijte fotoaparát nebo nahrajte existující fotografii závady. Aplikace podporuje JPG, PNG, GIF a WebP formáty.'
                                                    },
                                                    {
                                                        icon: 'fa-brain',
                                                        title: 'AI Analýza',
                                                        desc: 'Umělá inteligence identifikuje závadu',
                                                        detail: 'Pokročilá AI analyzuje fotografii pomocí několika modelů: cache, embedding, TensorFlow klasifikátor a cloud API. Průměrná doba analýzy je 2-3 sekundy.'
                                                    },
                                                    {
                                                        icon: 'fa-tools',
                                                        title: 'Opravte',
                                                        desc: 'Postupujte podle návodu krok za krokem',
                                                        detail: 'Získáte detailní návod s ilustracemi, seznamem potřebných nástrojů, bezpečnostními upozorněními a časovým odhadem opravy.'
                                                    }
                                                ].map((step, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-primary-light transition-all"
                                                        onClick={() => {
                                                            alert(step.detail);
                                                        }}
                                                    >
                                                        <div className="flex-none w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                                                            <i className={`fas ${step.icon} text-lg text-primary`}></i>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-base mb-1">{step.title}</h4>
                                                            <p className="text-sm text-secondary m-0">{step.desc}</p>
                                                        </div>
                                                        <i className="fas fa-chevron-right text-secondary text-sm"></i>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="glass-card">
                                            {/* Horní sekce - Logo */}
                                            <div className="mb-6">
                                                <div className="text-3xl font-bold">
                                                    <span style={{
                                                        background: 'var(--gradient-primary)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        backgroundClip: 'text'
                                                    }}>FIXO</span>
                                                </div>
                                            </div>

                                            {/* Spodní sekce - Dva sloupce */}
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Levý sloupec - Funkce */}
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-sm mb-3">Funkce</h4>
                                                    <ul className="text-sm text-secondary m-0 p-0 cursor-pointer" onClick={() => setShowFeaturesModal(true)}>
                                                        <li className="mb-1 hover:text-primary transition-colors">• AI analýza fotografií</li>
                                                        <li className="mb-1 hover:text-primary transition-colors">• 500+ návodů na opravy</li>
                                                        <li className="m-0 hover:text-primary transition-colors">• Bezpečnostní upozornění</li>
                                                    </ul>
                                                </div>

                                                {/* Pravý sloupec - Kontakt */}
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-sm mb-3">Kontakt</h4>
                                                    <a href="mailto:support@fixo.app" className="text-sm text-primary">
                                                        support@fixo.app
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                            </div>
                            </div>
                        )}

                        {/* Preview View - Náhled s možností kreslení */}
                        {currentView === 'preview' && selectedImage && (
                            <div className="content-two-columns">
                                {/* Blok A - Fotka a volby */}
                                <div className="content-left">
                                    <div className="glass-card">
                                        {/* Komprimovaná fotka */}
                                        <div className="mb-4">
                                            <div className="drawing-container bg-black rounded-lg overflow-hidden" style={{maxHeight: '300px'}}>
                                                {isDrawingMode ? (
                                                    <canvas
                                                        ref={canvasRef}
                                                        onMouseDown={(e) => { startDrawing(e); }}
                                                        onMouseMove={(e) => { draw(e); }}
                                                        onMouseUp={stopDrawing}
                                                        onMouseLeave={stopDrawing}
                                                        onTouchStart={(e) => { e.preventDefault(); startDrawing(e); }}
                                                        onTouchMove={(e) => { e.preventDefault(); draw(e); }}
                                                        onTouchEnd={(e) => { e.preventDefault(); stopDrawing(); }}
                                                        onClick={placeMarker}
                                                    />
                                                ) : (
                                                    <img
                                                        src={annotatedImage || selectedImage}
                                                        alt="Nahraná fotka"
                                                        className="w-full block"
                                                        style={{maxHeight: '300px', objectFit: 'contain'}}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        {/* Kreslící nástroje */}
                                        {isDrawingMode && (
                                            <div className="card mb-4 p-3 bg-secondary">
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex items-center gap-3">
                                                        <label className="text-sm">Barva:</label>
                                                        <div className="flex gap-2">
                                                            {['#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#ff0000'].map(color => (
                                                                <button
                                                                    key={color}
                                                                    onClick={() => setBrushColor(color)}
                                                                    style={{
                                                                        width: '28px',
                                                                        height: '28px',
                                                                        borderRadius: '50%',
                                                                        backgroundColor: color,
                                                                        border: brushColor === color ? '3px solid #fff' : '2px solid rgba(255,255,255,0.3)',
                                                                        cursor: 'pointer',
                                                                        boxShadow: brushColor === color ? `0 0 8px ${color}` : 'none'
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <label className="text-sm">Velikost:</label>
                                                        <input
                                                            type="range"
                                                            min="2"
                                                            max="15"
                                                            value={brushSize}
                                                            onChange={(e) => setBrushSize(parseInt(e.target.value))}
                                                            className="flex-1"
                                                        />
                                                    </div>
                                                    <button onClick={clearCanvas} className="btn btn-secondary py-2 px-3 w-full">
                                                        <i className="fas fa-eraser mr-1"></i> Smazat
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Akční tlačítka */}
                                        <div className="flex gap-3 flex-col mb-3">
                                            {!isDrawingMode ? (
                                                <>
                                                    <button
                                                        onClick={() => setIsDrawingMode(true)}
                                                        className="btn btn-secondary w-full"
                                                    >
                                                        <i className="fas fa-pencil-alt mr-2"></i>
                                                        Označit problém
                                                    </button>
                                                    <button
                                                        onClick={() => analyzeImage(annotatedImage || selectedImage)}
                                                        className="btn btn-primary w-full"
                                                    >
                                                        <i className="fas fa-search mr-2"></i>
                                                        Analyzovat
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            setIsDrawingMode(false);
                                                            setAnnotatedImage(null);
                                                        }}
                                                        className="btn btn-secondary w-full"
                                                    >
                                                        <i className="fas fa-times mr-2"></i>
                                                        Zrušit
                                                    </button>
                                                    <button
                                                        onClick={analyzeWithAnnotation}
                                                        className="btn btn-primary w-full"
                                                    >
                                                        <i className="fas fa-check mr-2"></i>
                                                        Hotovo - Analyzovat
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        {/* Další volby */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedImage(null);
                                                    setAnnotatedImage(null);
                                                    setIsDrawingMode(false);
                                                    setCurrentView('home');
                                                }}
                                                className="btn btn-link flex-1 text-sm"
                                            >
                                                <i className="fas fa-camera mr-1"></i>
                                                Jiná fotka
                                            </button>
                                            <button
                                                onClick={() => setShowDescribeModal(true)}
                                                className="btn btn-link flex-1 text-sm"
                                            >
                                                <i className="fas fa-comment-alt mr-1"></i>
                                                Popsat problém
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Blok I - Informace a volby */}
                                <div className="content-right">
                                    {/* Horní box - Návod k použití */}
                                    <div className="glass-card">
                                        <h3 className="section-title mb-4">
                                            <i className="fas fa-info-circle"></i>
                                            Jak označit problém?
                                        </h3>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-none w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                                                    <i className="fas fa-pencil-alt text-lg text-primary"></i>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-base mb-1">Nakreslete značku</h4>
                                                    <p className="text-sm text-secondary m-0">Označte problémové místo kruhem nebo šipkou</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="flex-none w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
                                                    <i className="fas fa-crosshairs text-lg text-success"></i>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-base mb-1">Přesná diagnostika</h4>
                                                    <p className="text-sm text-secondary m-0">AI lépe identifikuje závadu podle označení</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="flex-none w-10 h-10 rounded-lg bg-warning-light flex items-center justify-center">
                                                    <i className="fas fa-magic text-lg text-warning"></i>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-base mb-1">Nebo rovnou analyzujte</h4>
                                                    <p className="text-sm text-secondary m-0">Můžete přeskočit a nechat AI analyzovat celou fotku</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spodní box - Další možnosti */}
                                    <div className="glass-card">
                                        <h3 className="section-title mb-4">
                                            <i className="fas fa-ellipsis-h"></i>
                                            Další možnosti
                                        </h3>
                                        <div className="flex flex-col gap-2">
                                            <button
                                                className="btn btn-outline w-full text-left"
                                                onClick={() => {
                                                    setShowNearbySuppliers(true);
                                                }}
                                            >
                                                <i className="fas fa-phone mr-2"></i>
                                                Zavolat odborníka
                                            </button>
                                            <button
                                                className="btn btn-outline w-full text-left"
                                                onClick={() => {
                                                    navigateTo('premium');
                                                }}
                                            >
                                                <i className="fas fa-crown mr-2 text-warning"></i>
                                                Koupit Premium
                                            </button>
                                            <button
                                                className="btn btn-outline w-full text-left"
                                                onClick={() => {
                                                    navigateTo('knowledge');
                                                }}
                                            >
                                                <i className="fas fa-book mr-2"></i>
                                                Procházet databázi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Analyzing View */}
                        {currentView === 'analyzing' && (
                            <div className="center-content">
                                <div className="upload-card max-w-md w-full">
                                    <div className="text-center">
                                        {selectedImage && (
                                            <img
                                                src={selectedImage}
                                                alt="Analyzovaná fotka"
                                                className="image-preview mb-6"
                                            />
                                        )}
                                        <div className="flex-center mb-4">
                                            <div className="spinner spinner-lg"></div>
                                        </div>
                                        <h2 className="text-xl font-bold mb-2">
                                            {t('analyzingTitle')}
                                        </h2>
                                        <div className="text-secondary flex flex-col gap-2">
                                            <div className="flex-center">
                                                <i className="fas fa-check-circle mr-2 text-success"></i>
                                                {t('analyzingStep1')}
                                            </div>
                                            <div className="flex-center animate-pulse">
                                                <i className="fas fa-spinner fa-spin mr-2 text-primary"></i>
                                                {t('analyzingStep2')}
                                            </div>
                                            <div className="flex-center text-muted">
                                                <i className="far fa-circle mr-2"></i>
                                                {t('analyzingStep3')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Results View */}
                        {currentView === 'results' && analysisResult && (
                            <div className="content-two-columns">
                                {/* Blok A - Fotka */}
                                <div className="content-left">
                                    {selectedImage && (
                                        <div className="glass-card">
                                            <h3 className="text-sm font-semibold mb-3 text-secondary">
                                                <i className="fas fa-image mr-2"></i>
                                                Analyzovaný obrázek
                                            </h3>
                                            <img
                                                src={selectedImage}
                                                alt="Analyzovaný obrázek"
                                                className="w-full rounded-lg bg-secondary mb-4"
                                                style={{maxHeight: '400px', objectFit: 'contain'}}
                                            />
                                            <button
                                                onClick={() => navigateTo('home')}
                                                className="btn btn-secondary w-full"
                                            >
                                                <i className="fas fa-camera mr-2"></i>
                                                Nová fotka
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Blok I - Výsledky a akce */}
                                <div className="content-right">
                                    {/* Horní box - Diagnostika */}
                                    <div className="glass-card p-0 overflow-hidden">
                                        {/* Detection Header - kompaktní */}
                                        <div className="p-4 bg-gradient-to-r from-primary to-primary-dark">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <h2 className="text-base font-bold mb-1 truncate">
                                                            {analysisResult.object.name}
                                                        </h2>
                                                        <p className="opacity-90 text-xs mb-1">
                                                            {t('detectedWith')} {analysisResult.confidence}% {t('confidence')}
                                                        </p>
                                                {analysisResult._meta && (
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        marginTop: '4px',
                                                        padding: '2px 6px',
                                                        borderRadius: 'var(--radius-full)',
                                                        fontSize: '10px',
                                                        fontWeight: 'var(--font-medium)',
                                                        background: analysisResult._meta.source === 'cache' || analysisResult._meta.source === 'embedding'
                                                            ? 'rgba(34, 197, 94, 0.3)'
                                                            : analysisResult._meta.source === 'classifier'
                                                                ? 'rgba(59, 130, 246, 0.3)'
                                                                : analysisResult._meta.source === 'api'
                                                                    ? 'rgba(168, 85, 247, 0.3)'
                                                                    : 'rgba(251, 191, 36, 0.3)',
                                                        color: 'white'
                                                    }}>
                                                        <i className={`fas ${
                                                            analysisResult._meta.source === 'cache' ? 'fa-database' :
                                                            analysisResult._meta.source === 'embedding' ? 'fa-brain' :
                                                            analysisResult._meta.source === 'classifier' ? 'fa-robot' :
                                                            analysisResult._meta.source === 'api' ? 'fa-cloud' : 'fa-question'
                                                        }`}></i>
                                                        {analysisResult._meta.source === 'cache' && 'Paměť'}
                                                        {analysisResult._meta.source === 'embedding' && 'Podobný'}
                                                        {analysisResult._meta.source === 'classifier' && 'AI'}
                                                        {analysisResult._meta.source === 'api' && 'Cloud'}
                                                        {analysisResult._meta.source === 'simulation' && 'Demo'}
                                                    </span>
                                                )}
                                                    </div>
                                            <div className="text-2xl flex-shrink-0">
                                                <i className={`fas ${getCategoryIcon(analysisResult.issue.category)} opacity-90`}></i>
                                            </div>
                                                </div>
                                            </div>

                                    {/* Tlačítko pro opravu špatné analýzy - kompaktní */}
                                    <div className="p-2 bg-secondary border-b border-border flex items-center justify-between">
                                        <span className="text-xs text-secondary">
                                            <i className="fas fa-question-circle mr-1"></i>
                                            Nesouhlasíte?
                                        </span>
                                        <button
                                            onClick={() => setShowFeedbackModal(true)}
                                            className="bg-transparent text-xs text-primary cursor-pointer hover:underline"
                                        >
                                            <i className="fas fa-edit mr-1"></i>
                                            Opravit
                                        </button>
                                    </div>

                                    {/* Possible Issues Selection - kompaktní */}
                                    {analysisResult.possibleIssues && analysisResult.possibleIssues.length > 0 && (
                                        <div className="p-3 bg-secondary border-b border-border">
                                            <h3 className="font-semibold mb-2 text-xs text-secondary">
                                                <i className="fas fa-question-circle mr-1"></i>
                                                Vyberte váš problém:
                                            </h3>
                                            <div className="flex flex-col gap-1">
                                                {analysisResult.possibleIssues.map((issue, idx) => (
                                                    <button
                                                        key={issue.id || idx}
                                                        onClick={() => {
                                                            setAnalysisResult(prev => ({
                                                                ...prev,
                                                                issue: {
                                                                    ...prev.issue,
                                                                    name: issue.name,
                                                                    description: issue.description
                                                                }
                                                            }));
                                                        }}
                                                        className="p-2 rounded-lg cursor-pointer text-left hover:bg-tertiary"
                                                    >
                                                        <div className="flex justify-between items-center gap-2">
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-semibold text-xs mb-0 truncate">
                                                                    {issue.name}
                                                                </p>
                                                                <p className="text-xs text-secondary m-0 truncate">
                                                                    {issue.description}
                                                                </p>
                                                            </div>
                                                            <div style={{
                                                                background: idx === 0 ? 'var(--color-success)' : 'var(--color-bg-tertiary)',
                                                                color: idx === 0 ? 'white' : 'var(--color-text-secondary)',
                                                                padding: '2px 6px',
                                                                borderRadius: 'var(--radius-full)',
                                                                fontSize: '10px',
                                                                whiteSpace: 'nowrap',
                                                                flexShrink: 0
                                                            }}>
                                                                {Math.round(issue.probability * 100)}%
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Issue Details - kompaktní */}
                                    <div className="p-3">
                                        <div className="mb-3">
                                            <h3 className="text-sm font-semibold mb-2">
                                                {t('identifiedProblem')}
                                            </h3>
                                            <div className="alert alert-danger p-3">
                                                <p className="font-semibold text-sm mb-1">{analysisResult.issue.name}</p>
                                                <p className="text-xs m-0">
                                                    {analysisResult.issue.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Quick Info - kompaktní */}
                                        <div className="grid grid-3 gap-2 mb-3">
                                            <div className="info-box p-3">
                                                <i className="fas fa-clock text-primary text-lg mb-1 block"></i>
                                                <div className="text-xs text-secondary">{t('repairTime')}</div>
                                                <div className="font-semibold text-sm">{analysisResult.issue.timeEstimate}</div>
                                            </div>
                                            <div className="info-box p-3">
                                                <i className="fas fa-signal text-warning text-lg mb-1 block"></i>
                                                <div className="text-xs text-secondary">{t('difficulty')}</div>
                                                <div className="font-semibold text-sm">{analysisResult.issue.difficulty}</div>
                                            </div>
                                            <div className="info-box p-3">
                                                <i className="fas fa-exclamation-triangle text-danger text-lg mb-1 block"></i>
                                                <div className="text-xs text-secondary">{t('risk')}</div>
                                                <div className="font-semibold text-sm">{analysisResult.issue.riskScore}/10</div>
                                            </div>
                                        </div>

                                        {/* Savings Calculator - kompaktní */}
                                        {analysisResult.issue.materialCost && analysisResult.issue.professionalCost && (
                                            <div className="mb-3">
                                                <h3 className="text-sm font-semibold mb-2">
                                                    <i className="fas fa-piggy-bank text-sm mr-1"></i>
                                                    Kolik ušetříš?
                                                </h3>

                                                <div className="grid grid-cols-2 gap-2">
                                                    {/* DIY Cost */}
                                                    <div className="p-2 rounded-lg bg-success-light text-center">
                                                        <div className="text-xs text-success font-semibold mb-1">
                                                            <i className="fas fa-hand-paper mr-1"></i> DIY
                                                        </div>
                                                        <div className="text-base font-bold text-success">
                                                            {analysisResult.issue.materialCost.min}-{analysisResult.issue.materialCost.max} Kč
                                                        </div>
                                                        <div className="text-xs text-secondary">
                                                            materiál
                                                        </div>
                                                    </div>

                                                    {/* Professional Cost */}
                                                    <div className="p-2 rounded-lg border border-border text-center">
                                                        <div className="text-xs text-secondary font-semibold mb-1">
                                                            <i className="fas fa-user-tie mr-1"></i> Expert
                                                        </div>
                                                        <div className="text-base font-bold text-secondary">
                                                            {analysisResult.issue.professionalCost.min}-{analysisResult.issue.professionalCost.max} Kč
                                                        </div>
                                                        <div className="text-xs text-muted">
                                                            materiál + práce
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Savings highlight - kompaktní */}
                                                <div className="p-2 rounded-lg bg-primary-light text-center mt-2">
                                                    <div className="text-xs mb-1">
                                                        <i className="fas fa-star mr-1"></i> Tvoje úspora
                                                    </div>
                                                    <div className="text-lg font-bold text-primary">
                                                        {analysisResult.issue.professionalCost.min - analysisResult.issue.materialCost.max}-{analysisResult.issue.professionalCost.max - analysisResult.issue.materialCost.min} Kč
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Safety Warnings - kompaktní */}
                                        {analysisResult.issue.riskScore > 5 && (
                                            <div className="alert alert-warning p-3 mb-3">
                                                <p className="font-semibold text-sm mb-1">
                                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                                    {t('safetyWarning')}
                                                </p>
                                                <ul className="text-xs m-0 pl-4">
                                                    {analysisResult.issue.safetyWarnings.map((warning, idx) => (
                                                        <li key={idx}>{warning}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Spodní box - Akce a volby */}
                                <div className="glass-card">
                                    <h3 className="section-title mb-4">
                                        <i className="fas fa-toolbox"></i>
                                        Co dál?
                                    </h3>

                                    {/* Action Buttons - Nový obchodní model */}
                                    <div className="flex flex-col gap-3">
                                            {/* Základní návod - ZDARMA */}
                                            <button
                                                onClick={() => startRepair(analysisResult.issue)}
                                                className="btn btn-success"
                                                className="w-full p-4"
                                            >
                                                <i className="fas fa-play-circle mr-2"></i>
                                                Základní návod (3-6 kroků)
                                                <span style={{
                                                    marginLeft: 'var(--space-2)',
                                                    background: 'rgba(255,255,255,0.2)',
                                                    padding: '2px 8px',
                                                    borderRadius: 'var(--radius-full)',
                                                    fontSize: 'var(--text-xs)'
                                                }}>ZDARMA</span>
                                            </button>

                                            {/* Detailní návod - placený */}
                                            <button
                                                onClick={() => {
                                                    const issueId = analysisResult.issue.id || analysisResult.issue.name;
                                                    if (isGuidePurchased(issueId)) {
                                                        startRepair({...analysisResult.issue, isDetailed: true});
                                                    } else {
                                                        setShowDetailedGuidePayment(true);
                                                    }
                                                }}
                                                className="w-full p-4 rounded-lg border-none cursor-pointer"
                                            >
                                                <i className={`fas ${isGuidePurchased(analysisResult.issue.id || analysisResult.issue.name) ? 'fa-check-circle' : 'fa-crown'}`}></i>
                                                Detailní návod + schémata
                                                <span className="text-sm">
                                                    {isGuidePurchased(analysisResult.issue.id || analysisResult.issue.name) ? 'ODEMČENO' : `${PRICING.detailedGuide} ${PRICING.currency}`}
                                                </span>
                                            </button>

                                            {/* Zavolat odborníka - najde nejbližšího */}
                                            <button
                                                onClick={async () => {
                                                    setShowNearbySuppliers(true);
                                                }}
                                                className="btn btn-secondary"
                                                className="w-full p-4"
                                            >
                                                <i className="fas fa-user-tie mr-2"></i>
                                                {t('callExpert')} v okolí
                                                <span style={{
                                                    marginLeft: 'var(--space-2)',
                                                    background: 'var(--color-success)',
                                                    color: 'white',
                                                    padding: '2px 8px',
                                                    borderRadius: 'var(--radius-full)',
                                                    fontSize: 'var(--text-xs)'
                                                }}>ZDARMA</span>
                                            </button>
                                        </div>

                                    {/* Affiliate odkazy na e-shopy */}
                                    <div className="mt-4 p-3 bg-secondary rounded-lg">
                                        <p className="text-xs text-secondary mb-2 text-center">
                                            <i className="fas fa-shopping-cart mr-1"></i>
                                            Nakupte potřebný materiál:
                                        </p>
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {Object.entries(affiliateLinks).filter(([_, shop]) => shop.hasAffiliate).map(([key, shop]) => (
                                                <a
                                                    key={key}
                                                    href={shop.baseUrl + encodeURIComponent(analysisResult.issue.name)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-md"
                                                >
                                                    <i className={`fas ${shop.icon}`}></i>
                                                    {shop.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}

                        {/* Repair Steps View */}
                        {currentView === 'repair' && selectedIssue && (
                            <div className="app-container pt-4">
                                <div className="glass-card p-0 overflow-hidden">
                                    {/* Progress Bar */}
                                    <div className="progress rounded-none">
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${((currentStep + 1) / selectedIssue.steps.length) * 100}%` }}
                                        ></div>
                                    </div>

                                    {/* Save for Offline & Stopwatch */}
                                    <div className="bg-secondary">
                                        <span className="text-sm font-semibold">
                                            {selectedIssue.name}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {/* Stopwatch */}
                                            <div className="rounded-md text-sm">
                                                <i className="fas fa-stopwatch"></i>
                                                <span>{formatTime(elapsedTime)}</span>
                                            </div>
                                            <button
                                                onClick={timerRunning ? pauseTimer : startTimer}
                                                className="rounded-md border-none cursor-pointer"
                                                title={timerRunning ? 'Pozastavit' : 'Spustit'}
                                            >
                                                <i className={`fas ${timerRunning ? 'fa-pause' : 'fa-play'}`}></i>
                                            </button>
                                            {elapsedTime > 0 && (
                                                <button
                                                    onClick={resetTimer}
                                                    className="rounded-md border-none text-secondary cursor-pointer"
                                                    title="Reset"
                                                >
                                                    <i className="fas fa-undo"></i>
                                                </button>
                                            )}
                                            {/* Save offline button */}
                                            <button
                                                onClick={() => saveGuideOffline(selectedIssue)}
                                                className="rounded-md border-none cursor-pointer"
                                            >
                                                <i className={`fas ${isGuideSaved(selectedIssue.name) ? 'fa-check' : 'fa-download'}`}></i>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Tools Needed with Affiliate Links */}
                                    <div className="bg-info-light p-6 border-b border-border">
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="font-semibold text-info">
                                                <i className="fas fa-toolbox mr-2"></i>
                                                {t('toolsNeeded')}
                                            </h3>
                                            <button
                                                onClick={() => exportShoppingList(selectedIssue)}
                                                className="rounded-md border-none cursor-pointer"
                                                title="Exportovat nákupní seznam"
                                            >
                                                <i className="fas fa-share-alt"></i>
                                                Export
                                            </button>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {selectedIssue.tools.map((tool, idx) => (
                                                <div key={idx} className="rounded-lg border border-border">
                                                    <span className="font-medium text-sm">
                                                        <i className="fas fa-wrench mr-2 text-primary opacity-70"></i>
                                                        {tool}
                                                    </span>
                                                    {/* Affiliate odkazy - pouze e-shopy s affiliate programem */}
                                                    <div className="flex gap-1 flex-wrap">
                                                        {Object.entries(affiliateLinks)
                                                            .filter(([_, shop]) => shop.hasAffiliate)
                                                            .slice(0, 3) // Zobrazit max 3 e-shopy
                                                            .map(([key, shop]) => (
                                                            <a
                                                                key={key}
                                                                href={getAffiliateUrl(key, tool, selectedIssue)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="rounded-md"
                                                                title={`Koupit na ${shop.name}`}
                                                            >
                                                                <i className={`fas ${shop.icon} text-[10px]`}></i>
                                                                {shop.name.length > 5 ? shop.name.slice(0, 4) : shop.name}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Current Step */}
                                    <div className="card-body">
                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold mb-4">
                                                {t('step')} {currentStep + 1} {t('of')} {selectedIssue.steps.length}
                                            </h2>

                                            <div className="step-box">
                                                <div className="text-7xl mb-4">
                                                    {selectedIssue.steps[currentStep].icon}
                                                </div>
                                                <p className="text-xl font-semibold mb-2">
                                                    {selectedIssue.steps[currentStep].action}
                                                </p>

                                                {/* Detailed description */}
                                                {selectedIssue.steps[currentStep].description && (
                                                    <p className="text-base text-secondary mb-3 leading-relaxed">
                                                        {selectedIssue.steps[currentStep].description}
                                                    </p>
                                                )}

                                                {/* Tools for this step */}
                                                {selectedIssue.steps[currentStep].tools_for_step && selectedIssue.steps[currentStep].tools_for_step.length > 0 && (
                                                    <div className="bg-info-light p-3 rounded-lg mb-3 text-left">
                                                        <p className="font-semibold text-sm mb-1">
                                                            <i className="fas fa-wrench mr-2 text-info"></i>Nástroje:
                                                        </p>
                                                        <p className="text-sm">{selectedIssue.steps[currentStep].tools_for_step.join(', ')}</p>
                                                    </div>
                                                )}

                                                {/* Parts for this step */}
                                                {selectedIssue.steps[currentStep].parts_for_step && selectedIssue.steps[currentStep].parts_for_step.length > 0 && (
                                                    <div className="bg-warning-light p-3 rounded-lg mb-3 text-left">
                                                        <p className="font-semibold text-sm mb-1">
                                                            <i className="fas fa-box mr-2 text-warning"></i>Potřebné díly:
                                                        </p>
                                                        <p className="text-sm">{selectedIssue.steps[currentStep].parts_for_step.join(', ')}</p>
                                                    </div>
                                                )}

                                                {/* Tip for this step */}
                                                {selectedIssue.steps[currentStep].tip && (
                                                    <div className="bg-success-light p-3 rounded-lg mb-3 text-left">
                                                        <p className="font-semibold text-sm mb-1">
                                                            <i className="fas fa-lightbulb mr-2 text-success"></i>Tip:
                                                        </p>
                                                        <p className="text-sm">{selectedIssue.steps[currentStep].tip}</p>
                                                    </div>
                                                )}

                                                <p className="text-secondary">
                                                    <i className="fas fa-clock mr-2"></i>
                                                    {t('timeRequired')}: {selectedIssue.steps[currentStep].time}
                                                </p>
                                            </div>
                                        </div>

                                        {/* All Steps Overview */}
                                        <div className="mb-6">
                                            <h3 className="font-semibold mb-3">{t('allStepsOverview')}</h3>
                                            <div className="steps-timeline">
                                                {selectedIssue.steps.map((step, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`step-item ${
                                                            idx === currentStep
                                                                ? 'step-item-active'
                                                                : idx < currentStep
                                                                    ? 'step-item-completed'
                                                                    : 'step-item-pending'
                                                        }`}
                                                    >
                                                        <span className="mr-3 text-2xl">{step.icon}</span>
                                                        <span className={`flex-1 ${idx === currentStep ? "font-semibold" : "font-normal"}`}>
                                                            {step.step}. {step.action}
                                                        </span>
                                                        {idx < currentStep && (
                                                            <i className="fas fa-check-circle text-success"></i>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Navigation */}
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                                                disabled={currentStep === 0}
                                                className={`btn flex-1 ${currentStep === 0 ? 'btn-secondary' : 'btn-secondary'}`}
                                                style={currentStep === 0 ? {opacity: 0.5, cursor: 'not-allowed'} : {}}
                                            >
                                                <i className="fas fa-arrow-left mr-2"></i>
                                                {t('prevStep')}
                                            </button>
                                            {currentStep < selectedIssue.steps.length - 1 ? (
                                                <button
                                                    onClick={() => setCurrentStep(currentStep + 1)}
                                                    className="btn btn-primary flex-1"
                                                >
                                                    {t('nextStep')}
                                                    <i className="fas fa-arrow-right ml-2"></i>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={completeRepair}
                                                    className="btn btn-success flex-1"
                                                >
                                                    <i className="fas fa-check mr-2"></i>
                                                    {t('completeRepair')}
                                                </button>
                                            )}
                                        </div>

                                        {/* Option to find local repair service */}
                                        <div className="mt-6 p-4 bg-secondary rounded-lg text-center">
                                            <p className="text-sm text-secondary mb-3">
                                                <i className="fas fa-question-circle mr-2"></i>
                                                Nevyřešili jste problém? Potřebujete odbornou pomoc?
                                            </p>
                                            <button
                                                onClick={() => {
                                                    const query = encodeURIComponent(`${selectedIssue.name} opravář v mém okolí`);
                                                    window.open(`https://www.google.com/search?q=${query}`, '_blank');
                                                }}
                                                className="btn btn-secondary"
                                                className="mr-2"
                                            >
                                                <i className="fas fa-search mr-2"></i>
                                                Najít opraváře
                                            </button>
                                            <button
                                                onClick={() => navigateTo('suppliers')}
                                                className="btn btn-outline"
                                            >
                                                <i className="fas fa-truck mr-2"></i>
                                                Naši partneři
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Knowledge Base View */}
                        {currentView === 'knowledge' && (
                            <div className="app-container">
                                <div className="page-frame" data-block="layout_shell">
                                    <section className="action-block" data-block="action_block">
                                        <h2 className="section-title mb-4">
                                            <i className="fas fa-book section-title-icon"></i>
                                            {t('databaseTitle')}
                                        </h2>

                                        <div className="card mb-4">
                                            <div className="max-w-lg">
                                                <i className="fas fa-search text-muted"></i>
                                                <input
                                                    type="text"
                                                    placeholder="Hledat opravy, nástroje, problémy..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="w-full text-base"
                                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                                                />
                                                {searchTerm && (
                                                    <button
                                                        onClick={() => setSearchTerm('')}
                                                        className="p-1 border-none text-muted cursor-pointer"
                                                    >
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="category-filter category-filter-desktop">
                                            {categories.map(cat => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => setSelectedCategory(cat.id)}
                                                    className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                                >
                                                    <i className={`fas ${cat.icon} mr-1`}></i>
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>

                                        <p className="text-center text-secondary mb-0 text-sm">
                                            {t('showing')} {getFilteredDatabase().length} {t('outOf')} {Object.keys(repairDatabase).length} {t('items')}
                                        </p>

                                        <div className="card navigation-card mt-4">
                                            <div className="navigation-card-header">
                                                <div className="navigation-card-title">
                                                    <i className="fas fa-compass mr-2"></i>
                                                    Navigace sekcí
                                                </div>
                                                <span className="navigation-card-hint">Klikněte pro otevření detailu</span>
                                            </div>
                                            <div className="database-nav-grid">
                                                {getFilteredDatabase().map(([key, item]) => (
                                                    <button
                                                        key={key}
                                                        className="nav-chip"
                                                        onClick={() => focusDatabaseSection(key)}
                                                    >
                                                        <span className="nav-chip-icon">
                                                            <i className={`fas ${getCategoryIcon(item.category)}`}></i>
                                                        </span>
                                                        <span className="nav-chip-text">
                                                            <strong>{item.name}</strong>
                                                            <small>{item.issues.length} oprav</small>
                                                        </span>
                                                        <i className="fas fa-arrow-right nav-chip-caret"></i>
                                                    </button>
                                                ))}

                                                {getFilteredDatabase().length === 0 && (
                                                    <p className="text-secondary text-sm m-0">Vyberte kategorii nebo zkuste vyhledávání.</p>
                                                )}
                                            </div>
                                        </div>
                                    </section>

                                    <section className="information-block" data-block="information_block">
                                        <div className="database-card-grid">
                                            {getFilteredDatabase().map(([key, item]) => {
                                                const isOpen = expandedSections[key];
                                                return (
                                                    <div
                                                        key={key}
                                                        id={`database-card-${key}`}
                                                        className={`database-card ${isOpen ? 'open' : ''}`}
                                                    >
                                                        <button className="database-card-toggle" onClick={() => toggleDatabaseSection(key)}>
                                                            <div className="database-card-headline">
                                                                <div className="database-card-icon">
                                                                    <i className={`fas ${getCategoryIcon(item.category)}`}></i>
                                                                </div>
                                                                <div>
                                                                    <div className="database-card-title">{item.name}</div>
                                                                    <p className="database-card-subtitle">
                                                                        {getCategoryLabel(item.category)} · {item.issues.length} řešení
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                                        </button>

                                                        {isOpen && (
                                                            <div className="database-card-body">
                                                                {item.issues.map(issue => (
                                                                    <div key={issue.id} className="database-issue">
                                                                        <div className="database-issue-header">
                                                                            <div className="database-issue-title">
                                                                                <i className="fas fa-screwdriver-wrench"></i>
                                                                                <span>{issue.name}</span>
                                                                            </div>
                                                                            <span className={`badge badge-${issue.riskScore > 5 ? 'danger' : issue.riskScore > 2 ? 'warning' : 'success'}`}>
                                                                                {issue.riskScore}/10
                                                                            </span>
                                                                        </div>
                                                                        <p className="database-issue-description">
                                                                            {issue.description || 'Rychlý náhled postupu a nástrojů.'}
                                                                        </p>
                                                                        <div className="database-issue-meta">
                                                                            <span><i className="fas fa-clock"></i> {issue.timeEstimate}</span>
                                                                            <span><i className="fas fa-layer-group"></i> {getCategoryLabel(item.category)}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {getFilteredDatabase().length === 0 && (
                                            <div className="empty-state card">
                                                <div className="empty-state-icon"><i className="fas fa-search"></i></div>
                                                <p className="empty-state-title">{t('noCategoryItems')}</p>
                                                <p className="empty-state-desc">{t('tryCategoryHint')}</p>
                                            </div>
                                        )}

                                        <div className="alert alert-info mt-4">
                                            <p className="alert-title">
                                                <i className="fas fa-info-circle mr-2"></i>
                                                {t('aboutDatabase')}
                                            </p>
                                            <p>
                                                {t('databaseInfo')}
                                            </p>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}

                        {/* About Page View */}
                        {currentView === 'about' && (
                            <div className="app-container pt-4">
                                <h2 className="section-title mb-4">
                                    <i className="fas fa-info-circle section-title-icon"></i>
                                    O nás
                                </h2>

                                <div className="card mb-6">
                                    <div className="card-body text-center p-8">
                                        <div className="text-6xl mb-4"><i className="fas fa-wrench"></i></div>
                                        <h3 className="text-2xl font-bold mb-4">FIXO</h3>
                                        <p className="text-lg text-secondary mb-6">
                                            Váš chytrý pomocník pro domácí opravy
                                        </p>
                                    </div>
                                </div>

                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-lightbulb mr-2 text-warning"></i>Náš příběh</h3>
                                    </div>
                                    <div className="card-body">
                                        <p className="leading-relaxed mb-4">
                                            FIXO vzniklo z jednoduché myšlenky - co kdyby každý mohl snadno opravit běžné domácí závady bez nutnosti volat drahého opraváře?
                                        </p>
                                        <p className="leading-relaxed mb-4">
                                            Díky umělé inteligenci dokážeme z fotografie rozpoznat problém a poskytnout přesný návod krok za krokem. Ušetříte čas, peníze a získáte nové dovednosti.
                                        </p>
                                        <p className="leading-relaxed">
                                            Naše databáze obsahuje stovky návodů pokrývajících vodoinstalaci, elektroinstalaci, topení, bytové opravy a další oblasti.
                                        </p>
                                    </div>
                                </div>

                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-users mr-2 text-primary"></i>Náš tým</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="grid grid-2 gap-4">
                                            <div className="text-center p-4 bg-secondary rounded-lg">
                                                <div className="text-5xl mb-2">👨‍<i className="fas fa-laptop"></i></div>
                                                <p className="font-semibold">Vývojáři</p>
                                                <p className="text-sm text-secondary">AI & technologie</p>
                                            </div>
                                            <div className="text-center p-4 bg-secondary rounded-lg">
                                                <div className="text-5xl mb-2"><i className="fas fa-wrench"></i></div>
                                                <p className="font-semibold">Odborníci</p>
                                                <p className="text-sm text-secondary">Řemeslníci & technici</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-envelope mr-2 text-success"></i>Kontakt</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-3">
                                                <i className="fas fa-envelope text-primary w-5"></i>
                                                <span>support@fixo.app</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <i className="fas fa-globe text-primary w-5"></i>
                                                <span>www.fixo.app</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="alert alert-info">
                                    <p><i className="fas fa-heart mr-2 text-danger"></i>Děkujeme, že používáte FIXO!</p>
                                </div>
                            </div>
                        )}

                        {/* Premium Page View - Freemium Tiers */}
                        {currentView === 'premium' && (
                            <div className="app-container pt-4">
                                <h2 className="section-title mb-4">
                                    <i className="fas fa-crown section-title-icon text-warning"></i>
                                    Vyberte si plán
                                </h2>

                                <p className="text-center text-secondary mb-6">
                                    Začněte zdarma, upgradujte kdykoliv
                                </p>

                                {/* Pricing Cards */}
                                <div className="grid grid-cols-auto-fit gap-4 mb-6">
                                    {/* FREE Tier */}
                                    <div className="card border-2 border-border">
                                        <div className="card-body p-6">
                                            <div className="text-center mb-4">
                                                <span className="text-4xl">🆓</span>
                                                <h3 className="text-xl font-bold mt-2">FREE</h3>
                                                <div className="text-3xl font-bold text-success my-2">0 Kč</div>
                                                <p className="text-sm text-secondary">Navždy zdarma</p>
                                            </div>
                                            <ul className="list-none p-0 mb-4">
                                                <li className="py-2 flex items-center gap-2">
                                                    <i className="fas fa-check text-success"></i>
                                                    <span>3 AI analýzy denně</span>
                                                </li>
                                                <li className="py-2 flex items-center gap-2">
                                                    <i className="fas fa-check text-success"></i>
                                                    <span>Základní návody</span>
                                                </li>
                                                <li className="py-2 flex items-center gap-2">
                                                    <i className="fas fa-check text-success"></i>
                                                    <span>Databáze 67 oprav</span>
                                                </li>
                                                <li className="py-2 flex items-center gap-2 opacity-50">
                                                    <i className="fas fa-times text-muted"></i>
                                                    <span>Kontakty řemeslníků</span>
                                                </li>
                                            </ul>
                                            <button className="btn btn-secondary w-full opacity-70" disabled>
                                                Aktuální plán
                                            </button>
                                        </div>
                                    </div>

                                    {/* PLUS Tier - Most Popular */}
                                    <div className="card border-2 border-primary relative scale-105">
                                        <div style={{
                                            position: 'absolute',
                                            top: '-12px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: 'var(--color-primary)',
                                            color: 'white',
                                            padding: 'var(--space-1) var(--space-3)',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: 'var(--text-xs)',
                                            fontWeight: 'var(--font-bold)'
                                        }}>
                                            NEJOBLÍBENĚJŠÍ
                                        </div>
                                        <div className="card-body p-6">
                                            <div className="text-center mb-4">
                                                <span className="text-4xl">⭐</span>
                                                <h3 className="text-xl font-bold mt-2">PLUS</h3>
                                                <div className="text-3xl font-bold text-primary my-2">49 Kč<span className="text-base font-normal">/měsíc</span></div>
                                                <p className="text-sm text-secondary">nebo 399 Kč/rok (ušetříte 33%)</p>
                                            </div>
                                            <ul className="list-none p-0 mb-4">
                                                <li className="py-2 flex items-center gap-2">
                                                    <i className="fas fa-check text-success"></i>
                                                    <span><strong>Neomezené</strong> AI analýzy</span>
                                                </li>
                                                <li className="py-2 flex items-center gap-2">
                                                    <i className="fas fa-check text-success"></i>
                                                    <span>Affiliate odkazy na materiál</span>
                                                </li>
                                                <li className="py-2 flex items-center gap-2">
                                                    <i className="fas fa-check text-success"></i>
                                                    <span>Odhady nákladů</span>
                                                </li>
                                                <li className="py-2 flex items-center gap-2 opacity-50">
                                                    <i className="fas fa-times text-muted"></i>
                                                    <span>Prioritní podpora</span>
                                                </li>
                                            </ul>
                                            <button className="btn btn-primary w-full" onClick={() => alert('Platební brána bude brzy dostupná!\n\nCena: 49 Kč/měsíc\n\nZískáte:\n• Neomezené AI analýzy\n• Affiliate odkazy')}>
                                                <i className="fas fa-rocket mr-2"></i>
                                                Začít s PLUS
                                            </button>
                                        </div>
                                    </div>

                                    {/* PRO Tier */}
                                    <div className="card border-2 border-warning gradient-yellow">
                                        <div className="card-body p-6">
                                            <div className="text-center mb-4">
                                                <span className="text-4xl"><i className="fas fa-crown"></i></span>
                                                <h3 className="text-xl font-bold mt-2">PRO</h3>
                                                <div className="text-3xl font-bold text-warning-text my-2">99 Kč<span className="text-base font-normal">/měsíc</span></div>
                                                <p className="text-sm text-secondary">nebo 799 Kč/rok (ušetříte 33%)</p>
                                            </div>
                                            <ul className="list-none p-0 mb-4">
                                                <li className="py-2 flex items-center gap-2">
                                                    <i className="fas fa-check text-success"></i>
                                                    <span>Vše z PLUS</span>
                                                </li>
                                                <li className="py-2 flex items-center gap-2">
                                                    <i className="fas fa-check text-success"></i>
                                                    <span><strong>Kontakty řemeslníků</strong></span>
                                                </li>
                                                <li className="py-2 flex items-center gap-2">
                                                    <i className="fas fa-check text-success"></i>
                                                    <span>Technická schémata</span>
                                                </li>
                                                <li className="py-2 flex items-center gap-2">
                                                    <i className="fas fa-check text-success"></i>
                                                    <span>Prioritní podpora 24/7</span>
                                                </li>
                                                <li className="py-2 flex items-center gap-2">
                                                    <i className="fas fa-check text-success"></i>
                                                    <span>Offline režim</span>
                                                </li>
                                            </ul>
                                            <button className="btn w-full gradient-orange text-white" onClick={() => alert('Platební brána bude brzy dostupná!\n\nCena: 99 Kč/měsíc\n\nZískáte VŠE:\n• Neomezené AI analýzy\n• Kontakty řemeslníků\n• Technická schémata\n• Prioritní podpora')}>
                                                <i className="fas fa-crown mr-2"></i>
                                                Získat PRO
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Výhody Premium */}
                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title">Co získáte s Premium</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-success-light text-success p-2 rounded-lg">
                                                    <i className="fas fa-project-diagram"></i>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Technické schémata a diagramy</p>
                                                    <p className="text-sm text-secondary">Detailní nákresy zapojení, rozměry a technické výkresy</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="bg-primary-light text-primary p-2 rounded-lg">
                                                    <i className="fas fa-shopping-cart"></i>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Affiliate odkazy na materiál</p>
                                                    <p className="text-sm text-secondary">Přímé odkazy na potřebný materiál s nejlepšími cenami</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="bg-warning-light text-warning-text p-2 rounded-lg">
                                                    <i className="fas fa-map-marker-alt"></i>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Kontakty na místní opraváře</p>
                                                    <p className="text-sm text-secondary">AI vyhledá ověřené řemeslníky ve vašem okolí</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                                                    <i className="fas fa-infinity"></i>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Neomezené analýzy</p>
                                                    <p className="text-sm text-secondary">Žádné denní limity na AI analýzu fotek</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ */}
                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                            <i className="fas fa-question-circle mr-2"></i>
                                            Časté dotazy
                                        </h3>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="border-b border-border p-4">
                                            <h4 className="font-semibold mb-2">Mohu kdykoliv zrušit předplatné?</h4>
                                            <p className="text-sm text-secondary">Ano, předplatné můžete zrušit kdykoliv bez poplatků. Po zrušení budete moci používat placenou verzi do konce zaplaceného období.</p>
                                        </div>
                                        <div className="border-b border-border p-4">
                                            <h4 className="font-semibold mb-2">Jak funguje roční platba?</h4>
                                            <p className="text-sm text-secondary">Při roční platbě ušetříte 33% oproti měsíční platbě. PLUS stojí 399 Kč/rok místo 588 Kč, PRO stojí 799 Kč/rok místo 1188 Kč.</p>
                                        </div>
                                        <div className="border-b border-border p-4">
                                            <h4 className="font-semibold mb-2">Existují speciální ceny pro důchodce nebo studenty?</h4>
                                            <p className="text-sm text-secondary">Ano! Nabízíme 50% slevu pro seniory (65+) a studenty. Kontaktujte nás na podpora@fixo.cz s dokladem o věku nebo studiu.</p>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-semibold mb-2">Mohu si FIXO vyzkoušet před placením?</h4>
                                            <p className="text-sm text-secondary">Samozřejmě! Verze FREE je navždy zdarma. Navíc nabízíme 7denní zkušební dobu na PLUS a PRO plány.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Pricing Info */}
                                <div className="alert bg-primary-light border-none">
                                    <div className="flex items-start gap-3">
                                        <i className="fas fa-heart text-primary text-xl"></i>
                                        <div>
                                            <p className="font-semibold mb-1">Sociální dostupnost</p>
                                            <p className="text-sm text-secondary">
                                                FIXO věří v dostupnost pro všechny. Senioři 65+ a studenti získají 50% slevu.
                                                Kontaktujte nás na <a href="mailto:podpora@fixo.cz" className="text-primary">podpora@fixo.cz</a>.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="alert alert-info mt-4">
                                    <p><i className="fas fa-shield-alt mr-2"></i>Bezpečná platba přes Stripe. Zrušit můžete kdykoliv.</p>
                                </div>
                            </div>
                        )}

                        {/* Partnership Page View */}
                        {currentView === 'partnership' && (
                            <div className="app-container pt-4">
                                <h2 className="section-title mb-4">
                                    <i className="fas fa-handshake section-title-icon"></i>
                                    Partnerský program
                                </h2>

                                {/* Hero banner */}
                                <div className="card mb-6 gradient-primary text-white">
                                    <div className="card-body text-center p-8">
                                        <div className="text-6xl mb-4"><i className="fas fa-handshake"></i></div>
                                        <h3 className="text-xl font-bold mb-2">Staňte se partnerem FIXO</h3>
                                        <p className="opacity-90">Získejte provize z doporučení a rozšiřte svůj byznys</p>
                                    </div>
                                </div>

                                {/* Typy partnerství */}
                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title">Typy partnerství</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="flex flex-col gap-4">
                                            <div className="card bg-secondary">
                                                <div className="card-body">
                                                    <div className="flex items-start gap-3">
                                                        <div className="text-4xl"><i className="fas fa-wrench"></i></div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold mb-1">Řemeslníci & Opraváři</h4>
                                                            <p className="text-sm text-secondary mb-2">
                                                                Registrujte se jako místní odborník a získávejte zakázky od uživatelů FIXO
                                                            </p>
                                                            <span className="badge badge-success">Provize 15%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card bg-secondary">
                                                <div className="card-body">
                                                    <div className="flex items-start gap-3">
                                                        <div className="text-4xl"><i className="fas fa-store"></i></div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold mb-1">E-shopy & Prodejci</h4>
                                                            <p className="text-sm text-secondary mb-2">
                                                                Nabídněte své produkty přímo v FIXO návodech
                                                            </p>
                                                            <span className="badge badge-primary">Affiliate program</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card bg-secondary">
                                                <div className="card-body">
                                                    <div className="flex items-start gap-3">
                                                        <div className="text-4xl"><i className="fas fa-bullhorn"></i></div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold mb-1">Influenceři & Blogeři</h4>
                                                            <p className="text-sm text-secondary mb-2">
                                                                Sdílejte FIXO se svými sledujícími a získávejte provize
                                                            </p>
                                                            <span className="badge badge-warning">20% z prodejů</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Výhody */}
                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title">Výhody partnerství</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="grid grid-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-check-circle text-success"></i>
                                                <span className="text-sm">Pravidelné výplaty</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-check-circle text-success"></i>
                                                <span className="text-sm">Marketing materiály</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-check-circle text-success"></i>
                                                <span className="text-sm">Detailní statistiky</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-check-circle text-success"></i>
                                                <span className="text-sm">Dedikovaná podpora</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Registrační formulář */}
                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-user-plus mr-2"></i>Registrace partnera</h3>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                                            <div>
                                                <label className="label">Jméno / Firma</label>
                                                <input type="text" className="input" placeholder="Váš název nebo název firmy" />
                                            </div>
                                            <div>
                                                <label className="label">E-mail</label>
                                                <input type="email" className="input" placeholder="vas@email.cz" />
                                            </div>
                                            <div>
                                                <label className="label">Typ partnerství</label>
                                                <select className="input">
                                                    <option value="">Vyberte typ...</option>
                                                    <option value="craftsman">Řemeslník / Opravář</option>
                                                    <option value="shop">E-shop / Prodejce</option>
                                                    <option value="influencer">Influencer / Bloger</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="label">Zpráva (volitelné)</label>
                                                <textarea className="input" rows="3" placeholder="Řekněte nám o sobě..."></textarea>
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-lg">
                                                <i className="fas fa-paper-plane mr-2"></i>
                                                Odeslat žádost
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <div className="alert alert-info">
                                    <p><i className="fas fa-clock mr-2"></i>Žádosti zpracováváme do 48 hodin. Ozveme se vám e-mailem.</p>
                                </div>
                            </div>
                        )}

                        {/* Suppliers Page View */}
                        {currentView === 'suppliers' && (
                            <div className="app-container pt-4">
                                <h2 className="section-title mb-4">
                                    <i className="fas fa-truck section-title-icon"></i>
                                    Dodavatelé a partneři
                                </h2>

                                <p className="text-center text-secondary mb-6">
                                    Spolupracujeme s prověřenými dodavateli materiálu a nářadí
                                </p>

                                {/* Kategorie dodavatelů */}
                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-faucet mr-2 text-info"></i>Vodoinstalace</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                                                <div>
                                                    <p className="font-semibold">SIKO koupelny</p>
                                                    <p className="text-sm text-secondary">Baterie, sprchy, WC</p>
                                                </div>
                                                <span className="badge badge-primary">Partner</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                                                <div>
                                                    <p className="font-semibold">Ptáček velkoobchod</p>
                                                    <p className="text-sm text-secondary">Trubky, fitinky, čerpadla</p>
                                                </div>
                                                <span className="badge badge-success">Ověřený</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-bolt mr-2 text-warning"></i>Elektroinstalace</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                                                <div>
                                                    <p className="font-semibold">ELKOV elektro</p>
                                                    <p className="text-sm text-secondary">Kabely, zásuvky, jističe</p>
                                                </div>
                                                <span className="badge badge-primary">Partner</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                                                <div>
                                                    <p className="font-semibold">K+B Expert</p>
                                                    <p className="text-sm text-secondary">Elektro spotřebiče</p>
                                                </div>
                                                <span className="badge badge-success">Ověřený</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-tools mr-2 text-success"></i>Nářadí a stavební materiál</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                                                <div>
                                                    <p className="font-semibold">Hornbach</p>
                                                    <p className="text-sm text-secondary">Kompletní sortiment</p>
                                                </div>
                                                <span className="badge badge-primary">Partner</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                                                <div>
                                                    <p className="font-semibold">OBI</p>
                                                    <p className="text-sm text-secondary">DIY materiál a nářadí</p>
                                                </div>
                                                <span className="badge badge-success">Ověřený</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                                                <div>
                                                    <p className="font-semibold">Bauhaus</p>
                                                    <p className="text-sm text-secondary">Stavební centrum</p>
                                                </div>
                                                <span className="badge badge-success">Ověřený</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-fire mr-2 text-danger"></i>Topení a klimatizace</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                                                <div>
                                                    <p className="font-semibold">Thermona</p>
                                                    <p className="text-sm text-secondary">Kotle, zásobníky</p>
                                                </div>
                                                <span className="badge badge-primary">Partner</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                                                <div>
                                                    <p className="font-semibold">Vaillant</p>
                                                    <p className="text-sm text-secondary">Tepelná čerpadla, kotle</p>
                                                </div>
                                                <span className="badge badge-success">Ověřený</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Chci být dodavatelem */}
                                <div className="card mb-6 border-primary border-2">
                                    <div className="card-body text-center p-6">
                                        <div className="text-5xl mb-3"><i className="fas fa-handshake"></i></div>
                                        <h3 className="font-bold mb-2">Chcete být náš partner?</h3>
                                        <p className="text-sm text-secondary mb-4">
                                            Nabízíme spolupráci pro výrobce a prodejce materiálu
                                        </p>
                                        <button onClick={() => navigateTo('partnership')} className="btn btn-primary">
                                            <i className="fas fa-arrow-right mr-2"></i>
                                            Registrovat se jako partner
                                        </button>
                                    </div>
                                </div>

                                <div className="alert alert-info">
                                    <p><i className="fas fa-info-circle mr-2"></i>Všichni partneři jsou prověřeni a nabízejí kvalitní produkty s garancí.</p>
                                </div>
                            </div>
                        )}

                        {/* Offline Guides View */}
                        {currentView === 'offline' && (
                            <div className="app-container">
                                <div className="page-frame" data-block="layout_shell">
                                    {/* action_block */}
                                    <section className="action-block" data-block="action_block">
                                        <h2 className="section-title mb-4">
                                            <i className="fas fa-cloud-download-alt section-title-icon"></i>
                                            Uložené návody offline
                                        </h2>

                                        <div className="card mb-4">
                                            <div className="card-body p-5">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-none text-3xl text-primary">
                                                        <i className="fas fa-plug-circle-bolt"></i>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold mb-1">Používejte FIXO bez signálu</h3>
                                                        <p className="text-sm text-secondary mb-3">
                                                            Každý návod můžeš uložit pro offline použití. Kliknutím níže otevřeš databázi a přidáš další řešení do své knihovny.
                                                        </p>
                                                        <div className="flex gap-2 flex-wrap">
                                                            <button onClick={() => navigateTo('knowledge')} className="btn btn-primary btn-sm">
                                                                <i className="fas fa-book mr-2"></i>
                                                                Procházet databázi
                                                            </button>
                                                            <button onClick={() => navigateTo('home')} className="btn btn-secondary btn-sm">
                                                                <i className="fas fa-camera mr-2"></i>
                                                                Nová analýza
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {analyzerStats && (
                                            <div className="card">
                                                <div className="card-body p-4">
                                                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
                                                        <i className="fas fa-brain text-primary"></i>
                                                        AI Učení
                                                    </h3>
                                                    <div className="analyze-stats-grid">
                                                        <div className="text-center p-2 bg-success-light rounded-md">
                                                            <div className="text-lg font-bold text-success">
                                                                {analyzerStats.cacheHits || 0}
                                                            </div>
                                                            <div className="text-xs text-secondary">Cache</div>
                                                        </div>
                                                        <div className="text-center p-2 bg-info-light rounded-md">
                                                            <div className="text-lg font-bold text-info">
                                                                {analyzerStats.localClassifications || 0}
                                                            </div>
                                                            <div className="text-xs text-secondary">Lokální</div>
                                                        </div>
                                                        <div className="text-center p-2 bg-purple-100/10 rounded-md">
                                                            <div className="text-lg font-bold text-purple-500">
                                                                {analyzerStats.apiCalls || 0}
                                                            </div>
                                                            <div className="text-xs text-secondary">Cloud</div>
                                                        </div>
                                                        <div className="text-center p-2 bg-orange-100/10 rounded-md">
                                                            <div className="text-lg font-bold text-orange-400">
                                                                {analyzerStats.feedbackUsed || 0}
                                                            </div>
                                                            <div className="text-xs text-secondary">Opravy</div>
                                                        </div>
                                                        <div className="text-center p-2 bg-pink-100/10 rounded-md">
                                                            <div className="text-lg font-bold text-pink-400">
                                                                {analyzerStats.feedbackSubmitted || 0}
                                                            </div>
                                                            <div className="text-xs text-secondary">Odesláno</div>
                                                        </div>
                                                        <div className="text-center p-2 bg-cyan-100/10 rounded-md">
                                                            <div className="text-lg font-bold text-cyan-400">
                                                                {analyzerStats.feedback?.totalFeedbacks || 0}
                                                            </div>
                                                            <div className="text-xs text-secondary">Feedback</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 bg-secondary rounded-md text-xs">
                                                        <span>
                                                            <i className="fas fa-database mr-1"></i>
                                                            {analyzerStats.cache?.totalAnalyses || 0} závad
                                                        </span>
                                                        <span style={{
                                                            padding: '2px 8px',
                                                            background: analyzerStats.efficiency > 50 ? 'var(--color-success)' : 'var(--color-warning)',
                                                            color: 'white',
                                                            borderRadius: 'var(--radius-full)',
                                                            fontWeight: 'var(--font-bold)'
                                                        }}>
                                                            {analyzerStats.efficiency || 0}% úspora
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </section>

                                    {/* information_block */}
                                    <section className="information-block" data-block="information_block">
                                        <div className="flex items-center justify-between gap-3">
                                            <h3 className="section-title">
                                                <i className="fas fa-folder-open section-title-icon"></i>
                                                Moje uložené návody
                                            </h3>
                                            {savedGuides.length > 0 && (
                                                <button onClick={() => navigateTo('knowledge')} className="btn btn-outline btn-sm">
                                                    <i className="fas fa-plus mr-2"></i>
                                                    Přidat další
                                                </button>
                                            )}
                                        </div>

                                        {savedGuides.length === 0 ? (
                                            <div className="card">
                                                <div className="card-body text-center p-6">
                                                    <div className="text-6xl mb-3 opacity-30">
                                                        <i className="fas fa-cloud-download-alt"></i>
                                                    </div>
                                                    <h3 className="font-semibold mb-2 text-base">
                                                        Žádné uložené návody
                                                    </h3>
                                                    <p className="text-secondary mb-4 text-sm">
                                                        Při prohlížení návodu klikni na "Uložit offline".
                                                    </p>
                                                    <button onClick={() => navigateTo('knowledge')} className="btn btn-primary py-2 px-4 text-sm">
                                                        <i className="fas fa-book mr-2"></i>
                                                        Procházet databázi
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="alert alert-success alert-compact">
                                                    <p className="m-0 text-sm">
                                                        <i className="fas fa-wifi-slash mr-2"></i>
                                                        <strong>Offline!</strong> Návody uložené v zařízení.
                                                    </p>
                                                </div>

                                                <div className="flex flex-col gap-3">
                                                    {savedGuides.map(guide => (
                                                        <div key={guide.id} className="card">
                                                            <div className="card-body">
                                                                <div className="flex justify-between items-start gap-3">
                                                                    <div className="flex-1">
                                                                        <h3 className="font-semibold mb-2">
                                                                            {guide.name}
                                                                        </h3>
                                                                        <p className="text-sm text-secondary mb-3">
                                                                            {guide.description}
                                                                        </p>

                                                                        <div className="flex flex-wrap gap-2 mb-3">
                                                                            <span className="badge">
                                                                                <i className="fas fa-clock mr-1"></i>
                                                                                {guide.timeEstimate}
                                                                            </span>
                                                                            <span className="badge">
                                                                                <i className="fas fa-signal mr-1"></i>
                                                                                {guide.difficulty}
                                                                            </span>
                                                                            <span className="badge">
                                                                                <i className="fas fa-list mr-1"></i>
                                                                                {guide.steps?.length || 0} kroků
                                                                            </span>
                                                                        </div>

                                                                        <p className="text-xs text-muted">
                                                                            <i className="fas fa-save mr-1"></i>
                                                                            Uloženo: {new Date(guide.savedAt).toLocaleDateString('cs-CZ')}
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex flex-col gap-2">
                                                                        <button
                                                                            onClick={() => loadOfflineGuide(guide)}
                                                                            className="btn btn-success btn-sm"
                                                                        >
                                                                            <i className="fas fa-play mr-1"></i>
                                                                            Spustit
                                                                        </button>
                                                                        <button
                                                                            onClick={() => {
                                                                                if (confirm('Opravdu smazat tento uložený návod?')) {
                                                                                    deleteOfflineGuide(guide.id);
                                                                                }
                                                                            }}
                                                                            className="btn btn-secondary btn-sm opacity-70"
                                                                        >
                                                                            <i className="fas fa-trash"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-4 text-center">
                                                    <button onClick={() => navigateTo('knowledge')} className="btn btn-secondary py-2 px-4 text-sm">
                                                        <i className="fas fa-plus mr-2"></i>
                                                        Přidat další návody
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </section>
                                </div>
                            </div>
                        )}

                        {/* AI Diagnostics View */}
                        {currentView === 'diagnostics' && (
                            <div className="app-container pt-4">
                                <div className="content-two-columns">
                                    {/* Levy sloupec - Statistiky a metriky */}
                                    <div className="content-left">
                                        {/* Hlavni statistiky */}
                                        <div className="glass-card">
                                            <h2 className="section-title mb-4">
                                                <i className="fas fa-brain mr-2"></i>
                                                {t('aiPerformance')}
                                            </h2>

                                            <div className="grid grid-2 gap-3 mb-4">
                                                {/* Celkem analyz */}
                                                <div
                                                    className="info-box p-4 cursor-pointer hover:shadow-lg transition-all"
                                                    onClick={() => {
                                                        alert(`Celkem bylo provedeno ${analyzerStats?.totalAnalyses || 0} analýz od spuštění systému.`);
                                                    }}
                                                >
                                                    <i className="fas fa-search text-primary text-2xl mb-2 block"></i>
                                                    <div className="text-xs text-secondary">{t('totalAnalyses')}</div>
                                                    <div className="font-bold text-xl">{analyzerStats?.totalAnalyses || 0}</div>
                                                </div>

                                                {/* Uspesnost */}
                                                <div
                                                    className="info-box p-4 cursor-pointer hover:shadow-lg transition-all"
                                                    onClick={() => {
                                                        const accuracy = analyzerStats?.accuracyRate || 95;
                                                        alert(`Aktuální úspěšnost AI je ${accuracy}%. To znamená, že AI správně identifikuje ${accuracy}% všech závad.`);
                                                    }}
                                                >
                                                    <i className="fas fa-bullseye text-success text-2xl mb-2 block"></i>
                                                    <div className="text-xs text-secondary">{t('accuracyRate')}</div>
                                                    <div className="font-bold text-xl">{analyzerStats?.accuracyRate || 95}%</div>
                                                </div>

                                                {/* Prumerny cas */}
                                                <div
                                                    className="info-box p-4 cursor-pointer hover:shadow-lg transition-all"
                                                    onClick={() => {
                                                        alert('Průměrný čas odezvy zahrnuje detekci objektu, identifikaci závady a přípravu návodů.');
                                                    }}
                                                >
                                                    <i className="fas fa-clock text-warning text-2xl mb-2 block"></i>
                                                    <div className="text-xs text-secondary">{t('avgResponseTime')}</div>
                                                    <div className="font-bold text-xl">{analyzerStats?.avgResponseTime || '2.3'}s</div>
                                                </div>

                                                {/* Pokrok uceni */}
                                                <div
                                                    className="info-box p-4 cursor-pointer hover:shadow-lg transition-all"
                                                    onClick={() => {
                                                        const progress = analyzerStats?.learningProgress || 87;
                                                        alert(`AI se učí z každé analýzy. Aktuální pokrok učení je ${progress}% z cílové přesnosti.`);
                                                    }}
                                                >
                                                    <i className="fas fa-graduation-cap text-info text-2xl mb-2 block"></i>
                                                    <div className="text-xs text-secondary">{t('learningProgress')}</div>
                                                    <div className="font-bold text-xl">{analyzerStats?.learningProgress || 87}%</div>
                                                </div>
                                            </div>

                                            {/* Progress bar pro learning */}
                                            <div className="mb-2">
                                                <div className="flex justify-between text-xs text-secondary mb-1">
                                                    <span>Model Training Progress</span>
                                                    <span>{analyzerStats?.learningProgress || 87}%</span>
                                                </div>
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar bg-gradient-to-r from-primary to-success"
                                                        style={{width: `${analyzerStats?.learningProgress || 87}%`}}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Nedavne analyzy */}
                                        <div className="glass-card">
                                            <h3 className="section-title mb-3">
                                                <i className="fas fa-history mr-2"></i>
                                                {t('recentAnalyses')}
                                            </h3>

                                            {repairHistory.length > 0 ? (
                                                <div className="flex flex-col gap-2">
                                                    {repairHistory.slice(0, 5).map((repair, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="p-3 rounded-lg border border-border cursor-pointer hover:bg-secondary transition-all"
                                                            onClick={() => {
                                                                setSelectedRepairDetail(repair);
                                                            }}
                                                        >
                                                            <div className="flex items-center justify-between gap-2">
                                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                                    <i className={`fas ${getCategoryIcon(repair.category)} text-primary`}></i>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="font-semibold text-sm truncate">{repair.name}</div>
                                                                        <div className="text-xs text-secondary">{new Date(repair.timestamp).toLocaleString('cs-CZ')}</div>
                                                                    </div>
                                                                </div>
                                                                <span className={`badge ${repair.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                                                                    {repair.status === 'completed' ? t('completed') : t('inProgress')}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-6 text-secondary">
                                                    <i className="fas fa-inbox text-4xl mb-2 opacity-30 block"></i>
                                                    <p className="text-sm">{t('noRepairsYet')}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Pravy sloupec - Modely a system */}
                                    <div className="content-right">
                                        {/* AI Modely */}
                                        <div className="glass-card">
                                            <h3 className="section-title mb-4">
                                                <i className="fas fa-microchip mr-2"></i>
                                                {t('aiModels')}
                                            </h3>

                                            <div className="flex flex-col gap-2">
                                                {/* Cache Model */}
                                                <div
                                                    className="p-3 rounded-lg border border-border cursor-pointer hover:bg-success-light transition-all"
                                                    onClick={() => {
                                                        alert('Cache model: Ukládá si již analyzované obrázky pro okamžité načtení. Nejrychlejší metoda.');
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <i className="fas fa-database text-success text-lg"></i>
                                                            <div>
                                                                <div className="font-semibold text-sm">Cache</div>
                                                                <div className="text-xs text-secondary">Paměť - okamžité</div>
                                                            </div>
                                                        </div>
                                                        <span className="badge badge-success">{t('active')}</span>
                                                    </div>
                                                </div>

                                                {/* Embedding Model */}
                                                <div
                                                    className="p-3 rounded-lg border border-border cursor-pointer hover:bg-success-light transition-all"
                                                    onClick={() => {
                                                        alert('Embedding model: Porovnává nové obrázky s databází podobných případů. Velmi přesné.');
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <i className="fas fa-brain text-info text-lg"></i>
                                                            <div>
                                                                <div className="font-semibold text-sm">Embedding</div>
                                                                <div className="text-xs text-secondary">Podobnost - 0.5s</div>
                                                            </div>
                                                        </div>
                                                        <span className="badge badge-success">{t('active')}</span>
                                                    </div>
                                                </div>

                                                {/* Classifier Model */}
                                                <div
                                                    className="p-3 rounded-lg border border-border cursor-pointer hover:bg-warning-light transition-all"
                                                    onClick={() => {
                                                        alert('TensorFlow klasifikátor: Lokální AI model pro rychlou klasifikaci. Funguje offline.');
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <i className="fas fa-robot text-primary text-lg"></i>
                                                            <div>
                                                                <div className="font-semibold text-sm">TensorFlow</div>
                                                                <div className="text-xs text-secondary">Klasifikátor - 2s</div>
                                                            </div>
                                                        </div>
                                                        <span className="badge badge-warning">Loading</span>
                                                    </div>
                                                </div>

                                                {/* API Model */}
                                                <div
                                                    className="p-3 rounded-lg border border-border cursor-pointer hover:bg-primary-light transition-all"
                                                    onClick={() => {
                                                        alert('Cloud API: Pokročilá analýza přes cloud pro složité případy. Vyžaduje internet.');
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <i className="fas fa-cloud text-warning text-lg"></i>
                                                            <div>
                                                                <div className="font-semibold text-sm">Cloud API</div>
                                                                <div className="text-xs text-secondary">Pokročilé - 3-5s</div>
                                                            </div>
                                                        </div>
                                                        <span className="badge badge-success">{t('active')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stav systemu */}
                                        <div className="glass-card">
                                            <h3 className="section-title mb-4">
                                                <i className="fas fa-server mr-2"></i>
                                                {t('systemHealth')}
                                            </h3>

                                            <div className="alert alert-success mb-3">
                                                <i className="fas fa-check-circle mr-2"></i>
                                                {t('allSystemsOperational')}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <div
                                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary cursor-pointer transition-all"
                                                    onClick={() => alert('Cache je aktivní a obsahuje ' + (analyzerStats?.cacheSize || 0) + ' záznamů.')}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-success"></div>
                                                        <span className="text-sm">{t('cacheStatus')}</span>
                                                    </div>
                                                    <span className="text-xs text-success font-semibold">{t('active')}</span>
                                                </div>

                                                <div
                                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary cursor-pointer transition-all"
                                                    onClick={() => alert('Embedding model je připraven a funguje správně.')}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-success"></div>
                                                        <span className="text-sm">{t('embeddingStatus')}</span>
                                                    </div>
                                                    <span className="text-xs text-success font-semibold">{t('active')}</span>
                                                </div>

                                                <div
                                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary cursor-pointer transition-all"
                                                    onClick={() => alert('TensorFlow klasifikátor se načítá. Bude k dispozici za chvíli.')}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-warning animate-pulse"></div>
                                                        <span className="text-sm">{t('classifierStatus')}</span>
                                                    </div>
                                                    <span className="text-xs text-warning font-semibold">Loading</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info panel */}
                                        <div className="glass-card bg-primary-light">
                                            <div className="flex items-start gap-3">
                                                <i className="fas fa-info-circle text-primary text-xl flex-shrink-0"></i>
                                                <div>
                                                    <h4 className="font-semibold text-sm mb-1">O AI Diagnostice</h4>
                                                    <p className="text-xs text-secondary m-0">
                                                        {t('diagnosticsInfo')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            );
        }

        // Render aplikace - React 18 API
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<FixoApp />);
