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
            selectLanguage: 'Vybrat jazyk'
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
                selectLanguage: 'Select language'
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
                        object: { name: 'Popsaný problém', category: 'steny_podlahy', icon: '🔧' },
                        issue: {
                            name: problemDescription.slice(0, 50) + '...',
                            description: 'Na základě vašeho popisu doporučujeme následující postup.',
                            riskScore: 3,
                            difficulty: 'Střední',
                            timeEstimate: '30 min',
                            tools: ['Základní nářadí', 'Ochranné pomůcky'],
                            steps: [
                                { step: 1, action: 'Prohlédněte problémové místo', time: '5 min', icon: '🔍' },
                                { step: 2, action: 'Připravte potřebné nástroje', time: '5 min', icon: '🔧' },
                                { step: 3, action: 'Proveďte opravu podle popisu', time: '15 min', icon: '⚙️' },
                                { step: 4, action: 'Zkontrolujte výsledek', time: '5 min', icon: '✅' }
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
                : 'https://fixo.onrender.com'; // Render.com backend

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
                                cache: '📦 Cache (naučeno)',
                                embedding: '🔗 Podobný obrázek',
                                classifier: '🤖 Lokální AI',
                                api: '🌐 Cloud AI',
                                simulation: '⚠️ Simulace'
                            };
                            console.log(`✅ Výsledek ze zdroje: ${sourceLabels[result._meta?.source] || 'neznámý'}`);

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
                    `🛠️ FIXO - Nákupní seznam`,
                    `📋 Oprava: ${issue.name}`,
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
                    alert('✅ Nákupní seznam zkopírován do schránky!\n\nMůžeš ho vložit do poznámek nebo poslat SMS.');
                }).catch(() => {
                    // Fallback for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = text;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    alert('✅ Nákupní seznam zkopírován do schránky!');
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
                alert('✅ Návod uložen pro offline použití!\n\nNajdeš ho v sekci "Uložené návody" v menu.');
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
                    emoji: '🔧✅💪',
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
                    alert('✅ Text zkopírován do schránky!\n\nMůžeš ho vložit kamkoliv na sociální sítě.');
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
                                <h3 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)'}}>
                                    {t('translating')}
                                </h3>
                                <p className="text-secondary">Vytvářím slovník pro tento jazyk...</p>
                                <p className="text-muted" style={{fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)'}}>
                                    (příště bude přepnutí okamžité)
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Modal pro popis problému - s upřesňujícími kroky */}
                    {showDescribeModal && (
                        <div className="translating-overlay" onClick={() => { setShowDescribeModal(false); resetClarification(); }}>
                            <div className="translating-box" onClick={e => e.stopPropagation()} style={{maxWidth: '500px', maxHeight: '85vh', overflow: 'auto'}}>

                                {/* Krok 0: Úvodní popis + volba kategorie */}
                                {clarificationStep === 0 && (
                                    <>
                                        <h3 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                            <i className="fas fa-keyboard" style={{color: 'var(--color-primary)'}}></i>
                                            Popište problém
                                        </h3>

                                        <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)'}}>
                                            Napište co se děje - napopsat můžete cokoliv, co nejde vyfotit.
                                        </p>

                                        {/* Text input */}
                                        <textarea
                                            value={problemDescription}
                                            onChange={(e) => setProblemDescription(e.target.value)}
                                            placeholder="Např: Neteče voda z kohoutku, jak rozložit sedačku, dveře drhnou o podlahu, ze zásuvky jiskří..."
                                            style={{
                                                width: '100%',
                                                minHeight: '80px',
                                                padding: 'var(--space-3)',
                                                borderRadius: 'var(--radius-lg)',
                                                border: '2px solid var(--color-border)',
                                                fontSize: 'var(--text-base)',
                                                resize: 'vertical',
                                                marginBottom: 'var(--space-4)'
                                            }}
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
                                        <div style={{marginBottom: 'var(--space-4)'}}>
                                            <p style={{fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)', color: 'var(--color-text-secondary)'}}>
                                                Nebo vyberte kategorii problému:
                                            </p>
                                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)'}}>
                                                {problemCategories.map(cat => (
                                                    <button
                                                        key={cat.id}
                                                        onClick={() => setSelectedProblemCategory(selectedProblemCategory === cat.id ? null : cat.id)}
                                                        style={{
                                                            padding: 'var(--space-2)',
                                                            borderRadius: 'var(--radius-lg)',
                                                            border: selectedProblemCategory === cat.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                                            background: selectedProblemCategory === cat.id ? 'var(--color-primary-light)' : 'var(--color-bg-secondary)',
                                                            cursor: 'pointer',
                                                            textAlign: 'left',
                                                            fontSize: 'var(--text-sm)'
                                                        }}
                                                    >
                                                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                            <i className={`fas ${cat.icon}`} style={{color: selectedProblemCategory === cat.id ? 'var(--color-primary)' : 'var(--color-text-muted)'}}></i>
                                                            <span style={{fontWeight: 'var(--font-medium)'}}>{cat.name}</span>
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
                                        <h3 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                            <i className="fas fa-question-circle" style={{color: 'var(--color-warning)'}}></i>
                                            Upřesněte problém
                                        </h3>

                                        <div style={{
                                            background: 'var(--color-warning-light)',
                                            padding: 'var(--space-3)',
                                            borderRadius: 'var(--radius-lg)',
                                            marginBottom: 'var(--space-4)',
                                            fontSize: 'var(--text-sm)'
                                        }}>
                                            <p style={{margin: 0}}>
                                                <strong>Váš popis:</strong> "{problemDescription}"
                                            </p>
                                            <p style={{margin: '8px 0 0 0', color: 'var(--color-text-secondary)'}}>
                                                Nenašli jsme přesnou shodu. Vyberte kategorii pro upřesnění:
                                            </p>
                                        </div>

                                        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-4)'}}>
                                            {problemCategories.map(cat => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => {
                                                        setSelectedProblemCategory(cat.id);
                                                        const matches = findMatchingIssues(problemDescription, cat.id);
                                                        setSuggestedIssues(matches);
                                                        setClarificationStep(2);
                                                    }}
                                                    style={{
                                                        padding: 'var(--space-3)',
                                                        borderRadius: 'var(--radius-lg)',
                                                        border: '1px solid var(--color-border)',
                                                        background: 'var(--color-bg-secondary)',
                                                        cursor: 'pointer',
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-3)'}}>
                                                        <i className={`fas ${cat.icon}`} style={{fontSize: 'var(--text-xl)', color: 'var(--color-primary)', width: '30px'}}></i>
                                                        <div>
                                                            <div style={{fontWeight: 'var(--font-semibold)'}}>{cat.name}</div>
                                                            <div style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)'}}>
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
                                        <h3 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                            <i className="fas fa-list-ul" style={{color: 'var(--color-success)'}}></i>
                                            Vyberte problém
                                        </h3>

                                        {problemDescription && (
                                            <div style={{
                                                background: 'var(--color-bg-secondary)',
                                                padding: 'var(--space-2) var(--space-3)',
                                                borderRadius: 'var(--radius-lg)',
                                                marginBottom: 'var(--space-3)',
                                                fontSize: 'var(--text-sm)'
                                            }}>
                                                <strong>Hledáme:</strong> "{problemDescription}"
                                            </div>
                                        )}

                                        <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)'}}>
                                            Nalezeno {suggestedIssues.length} možných problémů. Vyberte ten správný:
                                        </p>

                                        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', maxHeight: '300px', overflow: 'auto'}}>
                                            {suggestedIssues.length > 0 ? suggestedIssues.map((issue, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => selectSuggestedIssue(issue)}
                                                    style={{
                                                        padding: 'var(--space-3)',
                                                        borderRadius: 'var(--radius-lg)',
                                                        border: '1px solid var(--color-border)',
                                                        background: 'var(--color-bg-primary)',
                                                        cursor: 'pointer',
                                                        textAlign: 'left',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                                        <div style={{flex: 1}}>
                                                            <div style={{fontWeight: 'var(--font-semibold)', marginBottom: '4px'}}>
                                                                {issue.name}
                                                            </div>
                                                            <div style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)'}}>
                                                                {issue.objectName}
                                                            </div>
                                                        </div>
                                                        <div style={{textAlign: 'right'}}>
                                                            <div style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)'}}>
                                                                <i className="fas fa-clock mr-1"></i>{issue.timeEstimate}
                                                            </div>
                                                            <span style={{
                                                                fontSize: '10px',
                                                                padding: '2px 6px',
                                                                borderRadius: 'var(--radius-full)',
                                                                background: issue.riskScore > 5 ? 'var(--color-danger-light)' : issue.riskScore > 2 ? 'var(--color-warning-light)' : 'var(--color-success-light)',
                                                                color: issue.riskScore > 5 ? 'var(--color-danger)' : issue.riskScore > 2 ? 'var(--color-warning)' : 'var(--color-success)'
                                                            }}>
                                                                Riziko: {issue.riskScore}/10
                                                            </span>
                                                        </div>
                                                    </div>
                                                </button>
                                            )) : (
                                                <div style={{textAlign: 'center', padding: 'var(--space-6)', color: 'var(--color-text-muted)'}}>
                                                    <i className="fas fa-search" style={{fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)', display: 'block', opacity: 0.5}}></i>
                                                    <p>Žádné problémy v této kategorii nenalezeny.</p>
                                                    <p style={{fontSize: 'var(--text-xs)'}}>Zkuste upravit popis nebo vybrat jinou kategorii.</p>
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

                    {/* Modal pro opravu špatné analýzy (Feedback) */}
                    {showFeedbackModal && (
                        <div className="translating-overlay" onClick={() => setShowFeedbackModal(false)}>
                            <div className="translating-box" onClick={e => e.stopPropagation()} style={{maxHeight: '80vh', overflow: 'auto'}}>
                                <h3 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                    <i className="fas fa-edit" style={{color: 'var(--color-warning)'}}></i>
                                    Opravit analýzu
                                </h3>

                                <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)'}}>
                                    Vyberte správnou závadu z databáze. Vaše oprava pomůže zlepšit rozpoznávání pro všechny.
                                </p>

                                {/* Vyhledávání */}
                                <div style={{marginBottom: 'var(--space-4)'}}>
                                    <input
                                        type="text"
                                        placeholder="Hledat závadu..."
                                        value={feedbackSearch}
                                        onChange={(e) => setFeedbackSearch(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: 'var(--space-3)',
                                            borderRadius: 'var(--radius-lg)',
                                            border: '2px solid var(--color-border)',
                                            fontSize: 'var(--text-sm)'
                                        }}
                                    />
                                </div>

                                {/* Filtry kategorií */}
                                <div style={{display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)'}}>
                                    <button
                                        onClick={() => setFeedbackCategory('all')}
                                        style={{
                                            padding: 'var(--space-1) var(--space-2)',
                                            borderRadius: 'var(--radius-full)',
                                            border: 'none',
                                            fontSize: 'var(--text-xs)',
                                            background: feedbackCategory === 'all' ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
                                            color: feedbackCategory === 'all' ? 'white' : 'var(--color-text-secondary)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Vše
                                    </button>
                                    {categoriesData.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setFeedbackCategory(cat.id)}
                                            style={{
                                                padding: 'var(--space-1) var(--space-2)',
                                                borderRadius: 'var(--radius-full)',
                                                border: 'none',
                                                fontSize: 'var(--text-xs)',
                                                background: feedbackCategory === cat.id ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
                                                color: feedbackCategory === cat.id ? 'white' : 'var(--color-text-secondary)',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <i className={`fas ${cat.icon} mr-1`}></i>
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Seznam závad */}
                                <div style={{maxHeight: '300px', overflow: 'auto', marginBottom: 'var(--space-4)'}}>
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
                                            <div key={key} style={{marginBottom: 'var(--space-3)'}}>
                                                <div style={{
                                                    fontSize: 'var(--text-sm)',
                                                    fontWeight: 'var(--font-semibold)',
                                                    color: 'var(--color-text-secondary)',
                                                    marginBottom: 'var(--space-1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 'var(--space-1)'
                                                }}>
                                                    <i className={`fas ${getCategoryIcon(obj.category)}`}></i>
                                                    {obj.name}
                                                </div>
                                                {obj.issues
                                                    .filter(issue => !feedbackSearch || issue.name.toLowerCase().includes(feedbackSearch.toLowerCase()))
                                                    .map((issue, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => submitFeedback(obj, issue)}
                                                            style={{
                                                                width: '100%',
                                                                padding: 'var(--space-2) var(--space-3)',
                                                                marginBottom: 'var(--space-1)',
                                                                borderRadius: 'var(--radius-md)',
                                                                border: '1px solid var(--color-border)',
                                                                background: 'var(--color-bg-primary)',
                                                                textAlign: 'left',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                fontSize: 'var(--text-sm)'
                                                            }}
                                                        >
                                                            <span>{issue.name}</span>
                                                            <i className="fas fa-chevron-right" style={{color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)'}}></i>
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
                            <div className="translating-box" onClick={e => e.stopPropagation()} style={{maxWidth: '400px', textAlign: 'center'}}>
                                <div style={{fontSize: '4rem', marginBottom: 'var(--space-4)'}}>
                                    <i className="fas fa-crown" style={{color: '#8b5cf6'}}></i>
                                </div>
                                <h3 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)'}}>
                                    Detailní návod
                                </h3>
                                <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)'}}>
                                    Získejte kompletní návod s detailními kroky, schématy a tipy odborníků.
                                </p>

                                <div style={{
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                                    color: 'white',
                                    padding: 'var(--space-4)',
                                    borderRadius: 'var(--radius-lg)',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    <div style={{fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)'}}>
                                        {PRICING.detailedGuide} {PRICING.currency}
                                    </div>
                                    <div style={{fontSize: 'var(--text-sm)', opacity: 0.9}}>jednorázová platba</div>
                                </div>

                                <ul style={{
                                    textAlign: 'left',
                                    fontSize: 'var(--text-sm)',
                                    marginBottom: 'var(--space-4)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--space-2)'
                                }}>
                                    <li><i className="fas fa-check text-success mr-2"></i>Kompletní postup s 10+ kroky</li>
                                    <li><i className="fas fa-check text-success mr-2"></i>Technická schémata a diagramy</li>
                                    <li><i className="fas fa-check text-success mr-2"></i>Tipy od profesionálů</li>
                                    <li><i className="fas fa-check text-success mr-2"></i>Seznam kompatibilních náhradních dílů</li>
                                    <li><i className="fas fa-check text-success mr-2"></i>Offline přístup navždy</li>
                                </ul>

                                <div style={{display: 'flex', gap: 'var(--space-3)'}}>
                                    <button
                                        onClick={() => setShowDetailedGuidePayment(false)}
                                        className="btn btn-secondary flex-1"
                                    >
                                        Zrušit
                                    </button>
                                    <button
                                        onClick={() => purchaseDetailedGuide(analysisResult.issue)}
                                        className="btn btn-primary flex-1"
                                        style={{background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'}}
                                    >
                                        <i className="fas fa-credit-card mr-2"></i>
                                        Koupit
                                    </button>
                                </div>

                                <p style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-3)'}}>
                                    <i className="fas fa-lock mr-1"></i>
                                    Bezpečná platba přes Stripe
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Overlay pro nejbližší dodavatele/opraváře */}
                    {showNearbySuppliers && (
                        <div className="translating-overlay" onClick={() => setShowNearbySuppliers(false)}>
                            <div className="translating-box" onClick={e => e.stopPropagation()} style={{maxWidth: '500px', maxHeight: '80vh', overflow: 'auto'}}>
                                <h3 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                    <i className="fas fa-map-marker-alt" style={{color: 'var(--color-primary)'}}></i>
                                    Odborníci ve vašem okolí
                                </h3>

                                <div style={{
                                    background: 'var(--color-info-light)',
                                    padding: 'var(--space-3)',
                                    borderRadius: 'var(--radius-lg)',
                                    marginBottom: 'var(--space-4)',
                                    fontSize: 'var(--text-sm)'
                                }}>
                                    <i className="fas fa-info-circle mr-2" style={{color: 'var(--color-info)'}}></i>
                                    Zobrazujeme ověřené odborníky seřazené podle vzdálenosti od vaší polohy.
                                </div>

                                {/* Seznam dodavatelů */}
                                <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'}}>
                                    {[
                                        { id: 1, name: 'Jan Novák - Instalatér', category: 'Instalatérství', phone: '+420 123 456 789', rating: 4.8, distance: 1.2, isPremium: true },
                                        { id: 2, name: 'Elektro Servis Praha', category: 'Elektrikář', phone: '+420 987 654 321', rating: 4.5, distance: 2.5, isPremium: true },
                                        { id: 3, name: 'Truhlářství Koval', category: 'Truhlář', phone: '+420 555 666 777', rating: 4.9, distance: 3.1, isPremium: true }
                                    ].map(supplier => (
                                        <div key={supplier.id} style={{
                                            padding: 'var(--space-4)',
                                            background: supplier.isPremium ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' : 'var(--color-bg-secondary)',
                                            borderRadius: 'var(--radius-lg)',
                                            border: supplier.isPremium ? '2px solid var(--color-warning)' : '1px solid var(--color-border)'
                                        }}>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)'}}>
                                                <div>
                                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                        <span style={{fontWeight: 'var(--font-bold)'}}>{supplier.name}</span>
                                                        {supplier.isPremium && (
                                                            <span style={{
                                                                background: 'var(--color-warning)',
                                                                color: 'white',
                                                                padding: '2px 6px',
                                                                borderRadius: 'var(--radius-full)',
                                                                fontSize: '10px',
                                                                fontWeight: 'var(--font-bold)'
                                                            }}>
                                                                <i className="fas fa-star mr-1"></i>PREMIUM
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>
                                                        {supplier.category}
                                                    </div>
                                                </div>
                                                <div style={{textAlign: 'right'}}>
                                                    <div style={{display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--color-warning)', fontSize: 'var(--text-sm)'}}>
                                                        <i className="fas fa-star"></i>
                                                        <span style={{fontWeight: 'var(--font-bold)'}}>{supplier.rating}</span>
                                                    </div>
                                                    <div style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)'}}>
                                                        <i className="fas fa-map-marker-alt mr-1"></i>{supplier.distance} km
                                                    </div>
                                                </div>
                                            </div>
                                            <a
                                                href={`tel:${supplier.phone}`}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: 'var(--space-2)',
                                                    padding: 'var(--space-3)',
                                                    background: 'var(--color-success)',
                                                    color: 'white',
                                                    borderRadius: 'var(--radius-lg)',
                                                    textDecoration: 'none',
                                                    fontWeight: 'var(--font-semibold)'
                                                }}
                                            >
                                                <i className="fas fa-phone"></i>
                                                {supplier.phone}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                {/* Registrace pro dodavatele */}
                                <div style={{
                                    marginTop: 'var(--space-6)',
                                    padding: 'var(--space-4)',
                                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                                    borderRadius: 'var(--radius-lg)',
                                    textAlign: 'center'
                                }}>
                                    <p style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)'}}>
                                        <i className="fas fa-user-tie mr-2"></i>
                                        Jste odborník nebo firma?
                                    </p>
                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)'}}>
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
                                    style={{marginTop: 'var(--space-4)'}}
                                >
                                    Zavřít
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Modal pro registraci dodavatelů/opravářů */}
                    {showSupplierRegistration && (
                        <div className="translating-overlay" onClick={() => setShowSupplierRegistration(false)}>
                            <div className="translating-box" onClick={e => e.stopPropagation()} style={{maxWidth: '500px', maxHeight: '85vh', overflow: 'auto'}}>
                                <h3 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                    <i className="fas fa-briefcase" style={{color: 'var(--color-primary)'}}></i>
                                    Registrace odborníka
                                </h3>

                                <div style={{
                                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                    color: 'white',
                                    padding: 'var(--space-4)',
                                    borderRadius: 'var(--radius-lg)',
                                    marginBottom: 'var(--space-4)',
                                    textAlign: 'center'
                                }}>
                                    <p style={{fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)'}}>
                                        Získejte zakázky od zákazníků ve vašem okolí
                                    </p>
                                    <div style={{fontSize: 'var(--text-xs)', opacity: 0.9}}>
                                        Budete zobrazeni uživatelům podle geolokace - nejbližší k zakázce
                                    </div>
                                </div>

                                {/* Cenové plány */}
                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)'}}>
                                    {/* Měsíční plán */}
                                    <div style={{
                                        padding: 'var(--space-4)',
                                        border: '2px solid var(--color-border)',
                                        borderRadius: 'var(--radius-lg)',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)'}}>
                                            Měsíční
                                        </div>
                                        <div style={{fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)'}}>
                                            {PRICING.supplierMonthly} {PRICING.currency}
                                        </div>
                                        <div style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)'}}>
                                            /měsíc
                                        </div>
                                        <button
                                            onClick={() => alert('Platební brána bude brzy dostupná.\n\nMěsíční členství: ' + PRICING.supplierMonthly + ' ' + PRICING.currency)}
                                            className="btn btn-secondary w-full"
                                            style={{marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)'}}
                                        >
                                            Vybrat
                                        </button>
                                    </div>

                                    {/* Roční plán - zvýhodněný */}
                                    <div style={{
                                        padding: 'var(--space-4)',
                                        border: '2px solid var(--color-success)',
                                        borderRadius: 'var(--radius-lg)',
                                        textAlign: 'center',
                                        background: 'var(--color-success-light)',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: '-10px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: 'var(--color-success)',
                                            color: 'white',
                                            padding: '2px 10px',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '10px',
                                            fontWeight: 'var(--font-bold)'
                                        }}>
                                            2 MĚSÍCE ZDARMA
                                        </div>
                                        <div style={{fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)'}}>
                                            Roční
                                        </div>
                                        <div style={{fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-success)'}}>
                                            {PRICING.supplierYearly} {PRICING.currency}
                                        </div>
                                        <div style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)'}}>
                                            /rok ({(PRICING.supplierYearly / 12).toFixed(2)} {PRICING.currency}/měs)
                                        </div>
                                        <button
                                            onClick={() => alert('Platební brána bude brzy dostupná.\n\nRoční členství: ' + PRICING.supplierYearly + ' ' + PRICING.currency + '\n\nÚspora: ' + ((PRICING.supplierMonthly * 12) - PRICING.supplierYearly).toFixed(2) + ' ' + PRICING.currency + ' (2 měsíce zdarma)')}
                                            className="btn btn-success w-full"
                                            style={{marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)'}}
                                        >
                                            <i className="fas fa-star mr-1"></i>Vybrat
                                        </button>
                                    </div>
                                </div>

                                {/* Co získáte */}
                                <div style={{marginBottom: 'var(--space-4)'}}>
                                    <h4 style={{fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)'}}>
                                        Co získáte:
                                    </h4>
                                    <ul style={{fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)'}}>
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
                            <div className="translating-box" onClick={e => e.stopPropagation()} style={{padding: 'var(--space-4)'}}>
                                <h3 style={{fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                    <i className="fas fa-clipboard-check" style={{color: 'var(--color-primary)'}}></i>
                                    Před zahájením opravy
                                </h3>

                                {/* Checklist items - compact */}
                                <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-3)'}}>
                                    {generateChecklistItems(pendingIssue).map(item => (
                                        <label
                                            key={item.id}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--space-2)',
                                                padding: 'var(--space-2)',
                                                background: checklistItems[item.id] ? 'var(--color-success-light)' : (item.important ? 'var(--color-warning-light)' : 'var(--color-bg-secondary)'),
                                                borderRadius: 'var(--radius-md)',
                                                cursor: 'pointer',
                                                fontSize: 'var(--text-sm)'
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={checklistItems[item.id] || false}
                                                onChange={() => setChecklistItems(prev => ({...prev, [item.id]: !prev[item.id]}))}
                                                style={{width: '16px', height: '16px', accentColor: 'var(--color-success)'}}
                                            />
                                            <span style={{
                                                flex: 1,
                                                textDecoration: checklistItems[item.id] ? 'line-through' : 'none',
                                                opacity: checklistItems[item.id] ? 0.6 : 1
                                            }}>
                                                {item.text}
                                                {item.important && <span style={{color: 'var(--color-danger)'}}>*</span>}
                                            </span>
                                        </label>
                                    ))}
                                </div>

                                {/* Nářadí - inline compact */}
                                {pendingIssue.tools && pendingIssue.tools.length > 0 && (
                                    <div style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)'}}>
                                        <strong>Nářadí:</strong> {pendingIssue.tools.join(', ')}
                                    </div>
                                )}

                                {/* Action buttons */}
                                <div className="flex gap-2">
                                    <button onClick={cancelChecklist} className="btn btn-secondary flex-1" style={{padding: 'var(--space-2)'}}>
                                        Zrušit
                                    </button>
                                    <button
                                        onClick={confirmChecklist}
                                        className="btn btn-success flex-1"
                                        disabled={generateChecklistItems(pendingIssue).filter(i => i.important).some(i => !checklistItems[i.id])}
                                        style={{
                                            padding: 'var(--space-2)',
                                            opacity: generateChecklistItems(pendingIssue).filter(i => i.important).some(i => !checklistItems[i.id]) ? 0.5 : 1
                                        }}
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
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)'}}>
                                    <h3 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                        <i className="fas fa-hard-hat" style={{color: 'var(--color-primary)'}}></i>
                                        Najít řemeslníka
                                    </h3>
                                    <button onClick={() => setShowCraftsmen(false)} style={{background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--color-text-secondary)'}}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>

                                {/* Category filter */}
                                <div style={{display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)'}}>
                                    <button
                                        onClick={() => setSelectedCraftsmanCategory('all')}
                                        style={{
                                            padding: 'var(--space-1) var(--space-3)',
                                            borderRadius: 'var(--radius-full)',
                                            border: 'none',
                                            background: selectedCraftsmanCategory === 'all' ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                                            color: selectedCraftsmanCategory === 'all' ? 'white' : 'var(--color-text-primary)',
                                            cursor: 'pointer',
                                            fontSize: 'var(--text-sm)',
                                            fontWeight: 'var(--font-medium)'
                                        }}
                                    >
                                        Všichni
                                    </button>
                                    {craftsmenData.categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCraftsmanCategory(cat.id)}
                                            style={{
                                                padding: 'var(--space-1) var(--space-3)',
                                                borderRadius: 'var(--radius-full)',
                                                border: 'none',
                                                background: selectedCraftsmanCategory === cat.id ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                                                color: selectedCraftsmanCategory === cat.id ? 'white' : 'var(--color-text-primary)',
                                                cursor: 'pointer',
                                                fontSize: 'var(--text-sm)',
                                                fontWeight: 'var(--font-medium)'
                                            }}
                                        >
                                            {cat.icon} {cat.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Craftsmen list */}
                                <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'}}>
                                    {getFilteredCraftsmen().map(craftsman => (
                                        <div key={craftsman.id} style={{
                                            background: 'var(--color-bg-secondary)',
                                            borderRadius: 'var(--radius-lg)',
                                            padding: 'var(--space-4)',
                                            border: '1px solid var(--color-border)'
                                        }}>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)'}}>
                                                <div>
                                                    <h4 style={{fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-1)'}}>
                                                        {craftsman.name}
                                                        {craftsman.verified && (
                                                            <i className="fas fa-check-circle ml-2" style={{color: 'var(--color-success)', fontSize: 'var(--text-sm)'}}></i>
                                                        )}
                                                    </h4>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>{craftsman.company}</p>
                                                </div>
                                                <div style={{textAlign: 'right'}}>
                                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--color-warning)'}}>
                                                        <i className="fas fa-star"></i>
                                                        <span style={{fontWeight: 'var(--font-bold)'}}>{craftsman.rating}</span>
                                                        <span style={{color: 'var(--color-text-secondary)', fontSize: 'var(--text-xs)'}}>
                                                            ({craftsman.reviewCount})
                                                        </span>
                                                    </div>
                                                    <span style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)'}}>
                                                        {craftsman.city}
                                                    </span>
                                                </div>
                                            </div>

                                            <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)'}}>
                                                {craftsman.description}
                                            </p>

                                            <div style={{display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-3)'}}>
                                                <span style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)',
                                                    background: 'var(--color-info-light)', padding: 'var(--space-1) var(--space-2)',
                                                    borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)'
                                                }}>
                                                    <i className="fas fa-clock"></i> {craftsman.responseTime}
                                                </span>
                                                <span style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)',
                                                    background: 'var(--color-success-light)', padding: 'var(--space-1) var(--space-2)',
                                                    borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)'
                                                }}>
                                                    <i className="fas fa-calendar"></i> {craftsman.availability}
                                                </span>
                                                <span style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)',
                                                    background: 'var(--color-warning-light)', padding: 'var(--space-1) var(--space-2)',
                                                    borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)'
                                                }}>
                                                    <i className="fas fa-money-bill"></i> {craftsman.priceRange.min}-{craftsman.priceRange.max} {craftsman.priceRange.currency}/{craftsman.priceRange.unit}
                                                </span>
                                            </div>

                                            <div style={{display: 'flex', gap: 'var(--space-2)'}}>
                                                <a
                                                    href={`tel:${craftsman.phone}`}
                                                    style={{
                                                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
                                                        padding: 'var(--space-2) var(--space-3)',
                                                        background: 'var(--color-success)', color: 'white',
                                                        borderRadius: 'var(--radius-md)', textDecoration: 'none',
                                                        fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)'
                                                    }}
                                                >
                                                    <i className="fas fa-phone"></i> Zavolat
                                                </a>
                                                {craftsman.email && (
                                                    <a
                                                        href={`mailto:${craftsman.email}`}
                                                        style={{
                                                            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
                                                            padding: 'var(--space-2) var(--space-3)',
                                                            background: 'var(--color-primary)', color: 'white',
                                                            borderRadius: 'var(--radius-md)', textDecoration: 'none',
                                                            fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)'
                                                        }}
                                                    >
                                                        <i className="fas fa-envelope"></i> Email
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {getFilteredCraftsmen().length === 0 && (
                                        <div style={{textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-secondary)'}}>
                                            <i className="fas fa-search" style={{fontSize: '2rem', marginBottom: 'var(--space-2)', display: 'block'}}></i>
                                            <p>Pro tuto kategorii zatím nemáme řemeslníky.</p>
                                            <p style={{fontSize: 'var(--text-sm)'}}>Zkuste vybrat jinou kategorii.</p>
                                        </div>
                                    )}
                                </div>

                                <div style={{marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--color-info-light)', borderRadius: 'var(--radius-lg)'}}>
                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', textAlign: 'center'}}>
                                        <i className="fas fa-info-circle mr-2"></i>
                                        Jste řemeslník? <a href="mailto:remeslnik@fixo.cz" style={{color: 'var(--color-primary)', fontWeight: 'var(--font-semibold)'}}>Registrujte se</a> a získejte nové zákazníky!
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
                                <div style={{
                                    fontSize: '4rem',
                                    marginBottom: 'var(--space-4)',
                                    animation: 'pulse 1s ease-in-out'
                                }}>
                                    🎉
                                </div>

                                <h2 style={{
                                    fontSize: 'var(--text-2xl)',
                                    fontWeight: 'var(--font-bold)',
                                    color: 'var(--color-success)',
                                    marginBottom: 'var(--space-2)'
                                }}>
                                    Oprava dokončena!
                                </h2>

                                <p style={{
                                    fontSize: 'var(--text-lg)',
                                    fontWeight: 'var(--font-semibold)',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    {shareData.issue?.name}
                                </p>

                                {/* Stats */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 'var(--space-6)',
                                    marginBottom: 'var(--space-6)',
                                    padding: 'var(--space-4)',
                                    background: 'var(--color-bg-secondary)',
                                    borderRadius: 'var(--radius-xl)'
                                }}>
                                    <div style={{textAlign: 'center'}}>
                                        <div style={{fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)'}}>
                                            {shareData.timeSpent > 0 ? formatTime(shareData.timeSpent) : shareData.issue?.timeEstimate || '-'}
                                        </div>
                                        <div style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase'}}>
                                            <i className="fas fa-stopwatch mr-1"></i> Čas
                                        </div>
                                    </div>
                                    <div style={{width: '1px', background: 'var(--color-border)'}}></div>
                                    <div style={{textAlign: 'center'}}>
                                        <div style={{fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-success)'}}>
                                            {shareData.issue?.costEstimate
                                                ? `${Math.round((shareData.issue.costEstimate.min + shareData.issue.costEstimate.max) / 2 * 5)} Kč`
                                                : '~1000 Kč'
                                            }
                                        </div>
                                        <div style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase'}}>
                                            <i className="fas fa-piggy-bank mr-1"></i> Ušetřeno
                                        </div>
                                    </div>
                                </div>

                                <p style={{
                                    fontSize: 'var(--text-sm)',
                                    color: 'var(--color-text-secondary)',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    Pochlub se svou šikovností na sociálních sítích!
                                </p>

                                {/* Share preview */}
                                <div style={{
                                    background: 'var(--color-bg-tertiary)',
                                    padding: 'var(--space-4)',
                                    borderRadius: 'var(--radius-lg)',
                                    marginBottom: 'var(--space-4)',
                                    textAlign: 'left',
                                    fontSize: 'var(--text-sm)',
                                    border: '1px solid var(--color-border)'
                                }}>
                                    <p style={{marginBottom: 'var(--space-2)'}}>
                                        {shareData.emoji} {shareData.text}
                                    </p>
                                    <p style={{color: 'var(--color-primary)', fontSize: 'var(--text-xs)'}}>
                                        #{shareData.hashtags.join(' #')}
                                    </p>
                                </div>

                                {/* Share buttons */}
                                <div style={{display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap'}}>
                                    <button
                                        onClick={() => shareToTwitter(shareData)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--space-2)',
                                            padding: 'var(--space-3) var(--space-4)',
                                            background: '#000000',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 'var(--radius-lg)',
                                            fontWeight: 'var(--font-semibold)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <i className="fab fa-x-twitter"></i>
                                        X / Twitter
                                    </button>
                                    <button
                                        onClick={() => shareToFacebook(shareData)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--space-2)',
                                            padding: 'var(--space-3) var(--space-4)',
                                            background: '#1877f2',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 'var(--radius-lg)',
                                            fontWeight: 'var(--font-semibold)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <i className="fab fa-facebook"></i>
                                        Facebook
                                    </button>
                                    <button
                                        onClick={() => shareNative(shareData)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--space-2)',
                                            padding: 'var(--space-3) var(--space-4)',
                                            background: 'var(--color-primary)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 'var(--radius-lg)',
                                            fontWeight: 'var(--font-semibold)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <i className="fas fa-share-alt"></i>
                                        Sdílet
                                    </button>
                                </div>

                                {/* Copy button */}
                                <button
                                    onClick={() => copyShareText(shareData)}
                                    className="btn btn-secondary w-full mb-4"
                                    style={{fontSize: 'var(--text-sm)'}}
                                >
                                    <i className="fas fa-copy mr-2"></i>
                                    Zkopírovat text
                                </button>

                                {/* Skip button */}
                                <button
                                    onClick={closeShareAndFinish}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--color-text-muted)',
                                        cursor: 'pointer',
                                        fontSize: 'var(--text-sm)'
                                    }}
                                >
                                    Přeskočit a dokončit
                                </button>
                            </div>
                        </div>
                    )}

                    {/* NEW: Top Header - Kompaktní, centralizovaný */}
                    <header className="top-header">
                        <div className="top-header-content">
                            {/* Logo */}
                            <div className="logo" onClick={() => navigateTo('home')}>
                                FIXO
                            </div>

                            {/* Header Actions */}
                            <div className="header-actions">
                                {/* Dark Mode Toggle */}
                                <button
                                    className="header-btn"
                                    onClick={toggleDarkMode}
                                    title={darkMode ? 'Světlý režim' : 'Tmavý režim'}
                                >
                                    <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`} style={{color: darkMode ? 'var(--color-warning)' : 'var(--color-primary)'}}></i>
                                </button>

                                {/* Language Selector */}
                                <div style={{position: 'relative'}}>
                                    <button
                                        className="header-btn"
                                        onClick={() => setLangMenuOpen(!langMenuOpen)}
                                        style={{width: 'auto', padding: '0 var(--space-2)'}}
                                    >
                                        <span style={{fontSize: 'var(--text-lg)'}}>{getCurrentLanguageData().flag}</span>
                                    </button>

                                    {/* Language Dropdown */}
                                    {langMenuOpen && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 'calc(100% + 8px)',
                                            right: 0,
                                            background: 'var(--color-bg-primary)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-xl)',
                                            boxShadow: 'var(--shadow-xl)',
                                            padding: 'var(--space-3)',
                                            minWidth: '280px',
                                            maxHeight: '350px',
                                            overflowY: 'auto',
                                            zIndex: 1000
                                        }}>
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(5, 1fr)',
                                                gap: 'var(--space-2)'
                                            }}>
                                                {languages.map(lang => (
                                                    <button
                                                        key={lang.code}
                                                        onClick={() => { changeLanguage(lang.code); setLangMenuOpen(false); }}
                                                        style={{
                                                            padding: 'var(--space-2)',
                                                            borderRadius: 'var(--radius-lg)',
                                                            border: currentLanguage === lang.code ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                                            background: currentLanguage === lang.code ? 'var(--color-primary-light)' : 'var(--color-bg-secondary)',
                                                            cursor: 'pointer',
                                                            fontSize: 'var(--text-lg)',
                                                            textAlign: 'center',
                                                            transition: 'var(--transition-fast)'
                                                        }}
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

                    {/* Sub-header info bar se stats */}
                    <div className="sub-header-bar">
                        <div className="sub-header-content">
                            <div className="sub-header-info">
                                <span className="sub-header-brand">FIXO</span>
                                <span className="sub-header-tagline">První světový standard pro vizuální diagnostiku domácích závad</span>
                            </div>
                            <div className="sub-header-stats">
                                <div className="sub-header-stat">
                                    <span className="sub-header-stat-value">500+</span>
                                    <span className="sub-header-stat-label">Závad</span>
                                </div>
                                <div className="sub-header-stat">
                                    <span className="sub-header-stat-value">30s</span>
                                    <span className="sub-header-stat-label">Analýza</span>
                                </div>
                                <div className="sub-header-stat">
                                    <span className="sub-header-stat-value">AI</span>
                                    <span className="sub-header-stat-label">Powered</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NEW: Bottom Navigation Bar */}
                    <nav className="bottom-nav">
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
                            <div className="app-container">
                                {/* Desktop: Upload + Jak to funguje vedle sebe */}
                                <div className="home-two-columns">
                                    {/* Main Upload Section */}
                                    <div className="upload-card glass-card upload-card-compact">
                                        <div className="text-center mb-4">
                                            <h2 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)'}}>
                                                {t('homeTitle')}
                                            </h2>
                                            <p className="text-secondary" style={{fontSize: 'var(--text-sm)'}}>
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
                                            className={`drop-zone ${isDragging ? 'drag-over' : ''}`}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current.click()}
                                            style={{padding: 'var(--space-6)'}}
                                        >
                                            <div className="drop-zone-icon">
                                                {isDragging ? (
                                                    <i className="fas fa-cloud-upload-alt"></i>
                                                ) : (
                                                    <i className="fas fa-camera"></i>
                                                )}
                                            </div>
                                            <p style={{fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-1)', color: 'var(--color-text-primary)'}}>
                                                {isDragging ? t('dropzoneDrop') : t('dropzoneText')}
                                            </p>
                                            <p className="text-secondary" style={{fontSize: 'var(--text-sm)'}}>
                                                {t('dropzoneHint')}
                                            </p>
                                        </div>

                                        {/* Quick Examples - kompaktní */}
                                        <div className="grid grid-6 mt-4 gap-2" style={{gridTemplateColumns: 'repeat(6, 1fr)'}}>
                                            {[
                                                { icon: 'fa-tint', name: 'Kohoutek' },
                                                { icon: 'fa-toilet', name: 'WC' },
                                                { icon: 'fa-plug', name: 'Zásuvka' },
                                                { icon: 'fa-door-open', name: 'Dveře' },
                                                { icon: 'fa-lightbulb', name: 'Světlo' },
                                                { icon: 'fa-thermometer-half', name: 'Topení' }
                                            ].map((item, idx) => (
                                                <div key={idx} className="example-card" style={{padding: 'var(--space-2)'}}>
                                                    <i className={`fas ${item.icon}`} style={{fontSize: 'var(--text-lg)', color: 'var(--color-primary)'}}></i>
                                                    <div style={{fontSize: '10px', color: 'var(--color-text-secondary)'}}>{item.name}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Nelze vyfotit? - integrováno */}
                                        <div
                                            onClick={() => {
                                                resetClarification();
                                                setShowDescribeModal(true);
                                            }}
                                            style={{
                                                marginTop: 'var(--space-3)',
                                                padding: 'var(--space-3)',
                                                background: 'var(--color-primary-light)',
                                                borderRadius: 'var(--radius-lg)',
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                                border: '1px dashed var(--color-primary)'
                                            }}
                                        >
                                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)'}}>
                                                <i className="fas fa-keyboard" style={{fontSize: 'var(--text-lg)', color: 'var(--color-primary)'}}></i>
                                                <span style={{fontWeight: 'var(--font-semibold)', color: 'var(--color-primary-dark)', fontSize: 'var(--text-sm)'}}>
                                                    Nelze vyfotit? Popište problém
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Jak to funguje - stejná výška */}
                                    <div className="glass-card" style={{display: 'flex', flexDirection: 'column'}}>
                                        <h3 className="section-title section-title-compact" style={{justifyContent: 'center', marginBottom: 'var(--space-3)'}}>
                                            <i className="fas fa-magic section-title-icon"></i>
                                            Jak to funguje?
                                        </h3>
                                        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1}}>
                                            {[
                                                {
                                                    num: '1', icon: 'fa-camera', title: 'Vyfoťte',
                                                    desc: 'Nafoťte poškozenou věc nebo nahrajte fotku',
                                                    detail: 'Stačí namířit fotoaparát na závadu – rozbitý kohoutek, prasklou zásuvku, nefunkční spotřebič.'
                                                },
                                                {
                                                    num: '2', icon: 'fa-brain', title: 'AI Analýza',
                                                    desc: 'Umělá inteligence identifikuje závadu',
                                                    detail: 'Naše AI analyzuje fotku během několika sekund. Rozpozná typ zařízení a identifikuje příčinu.'
                                                },
                                                {
                                                    num: '3', icon: 'fa-tools', title: 'Opravte',
                                                    desc: 'Postupujte podle návodu krok za krokem',
                                                    detail: 'Získáte přehledný návod s jednotlivými kroky a seznamem potřebného nářadí.'
                                                }
                                            ].map((step, idx) => (
                                                <div
                                                    key={idx}
                                                    className="info-box ripple"
                                                    onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                                                    style={{
                                                        flexDirection: 'column',
                                                        alignItems: 'flex-start',
                                                        textAlign: 'left',
                                                        minHeight: 'auto',
                                                        padding: 'var(--space-3)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                        flex: expandedStep === idx ? 'auto' : '1'
                                                    }}
                                                >
                                                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-3)', width: '100%'}}>
                                                        <div style={{
                                                            width: '36px', height: '36px', borderRadius: 'var(--radius-lg)',
                                                            background: expandedStep === idx ? 'var(--gradient-primary)' : 'var(--color-bg-tertiary)',
                                                            color: expandedStep === idx ? 'white' : 'var(--color-primary)',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            fontSize: 'var(--text-sm)',
                                                            flexShrink: 0
                                                        }}>
                                                            <i className={`fas ${step.icon}`}></i>
                                                        </div>
                                                        <div style={{flex: 1}}>
                                                            <h4 style={{fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', margin: 0}}>{step.title}</h4>
                                                            <p style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0}}>{step.desc}</p>
                                                        </div>
                                                        <i className={`fas fa-chevron-${expandedStep === idx ? 'up' : 'down'}`} style={{color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)'}}></i>
                                                    </div>
                                                    {expandedStep === idx && (
                                                        <div style={{
                                                            marginTop: 'var(--space-2)',
                                                            paddingTop: 'var(--space-2)',
                                                            borderTop: '1px solid var(--color-border)',
                                                            fontSize: 'var(--text-xs)',
                                                            color: 'var(--color-text-secondary)',
                                                            lineHeight: 1.4
                                                        }}>
                                                            {step.detail}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer - Kompaktní */}
                                <div className="app-footer" style={{marginTop: 'var(--space-4)', background: 'transparent', padding: 'var(--space-4) 0'}}>
                                    <div className="footer-logo" style={{fontSize: 'var(--text-lg)'}}>FIXO</div>
                                    <p className="footer-text" style={{fontSize: 'var(--text-xs)'}}>
                                        "Fix Anything. Anywhere. Instantly."
                                    </p>
                                    <p className="footer-copyright" style={{fontSize: 'var(--text-xs)'}}>
                                        © 2025 FIXO • Váš domácí pomocník
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Preview View - Náhled s možností kreslení */}
                        {currentView === 'preview' && selectedImage && (
                            <div className="app-container" style={{paddingTop: 'var(--space-4)'}}>
                                <div className="upload-card glass-card">
                                    <div className="text-center mb-4">
                                        <h2 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)'}}>
                                            <i className="fas fa-edit mr-2"></i>
                                            Označte problém na fotce
                                        </h2>
                                        <p className="text-secondary">
                                            Nakreslete kruh nebo šipku k místu s problémem pro přesnější analýzu
                                        </p>
                                    </div>

                                    {/* Canvas / Image container - Fixed for touch */}
                                    <div className="drawing-container" style={{marginBottom: 'var(--space-4)', background: '#000', borderRadius: 'var(--radius-lg)', overflow: 'hidden'}}>
                                        {isDrawingMode ? (
                                            <>
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
                                            </>
                                        ) : (
                                            <img
                                                src={annotatedImage || selectedImage}
                                                alt="Nahraná fotka"
                                                style={{
                                                    width: '100%',
                                                    maxHeight: '400px',
                                                    objectFit: 'contain',
                                                    display: 'block'
                                                }}
                                            />
                                        )}
                                    </div>

                                    {/* Kreslící nástroje */}
                                    {isDrawingMode && (
                                        <div className="card mb-4" style={{padding: 'var(--space-3)', background: 'var(--color-bg-secondary)'}}>
                                            <div className="flex-between flex-wrap gap-3">
                                                <div className="flex items-center gap-3">
                                                    <label style={{fontSize: 'var(--text-sm)'}}>Barva:</label>
                                                    <div className="flex gap-2">
                                                        {['#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#ff0000'].map(color => (
                                                            <button
                                                                key={color}
                                                                onClick={() => setBrushColor(color)}
                                                                style={{
                                                                    width: '32px',
                                                                    height: '32px',
                                                                    borderRadius: '50%',
                                                                    backgroundColor: color,
                                                                    border: brushColor === color ? '3px solid #fff' : '2px solid rgba(255,255,255,0.3)',
                                                                    cursor: 'pointer',
                                                                    boxShadow: brushColor === color ? `0 0 10px ${color}, 0 0 20px ${color}` : 'none'
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <label style={{fontSize: 'var(--text-sm)'}}>Velikost:</label>
                                                    <input
                                                        type="range"
                                                        min="2"
                                                        max="15"
                                                        value={brushSize}
                                                        onChange={(e) => setBrushSize(parseInt(e.target.value))}
                                                        style={{width: '80px'}}
                                                    />
                                                </div>
                                                <button onClick={clearCanvas} className="btn btn-secondary" style={{padding: 'var(--space-2) var(--space-3)'}}>
                                                    <i className="fas fa-eraser mr-1"></i> Smazat
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Akční tlačítka */}
                                    <div className="flex gap-3" style={{flexWrap: 'wrap'}}>
                                        {!isDrawingMode ? (
                                            <>
                                                <button
                                                    onClick={() => setIsDrawingMode(true)}
                                                    className="btn btn-secondary flex-1"
                                                >
                                                    <i className="fas fa-pencil-alt mr-2"></i>
                                                    Označit problém
                                                </button>
                                                <button
                                                    onClick={() => analyzeImage(annotatedImage || selectedImage)}
                                                    className="btn btn-primary flex-1"
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
                                                    className="btn btn-secondary flex-1"
                                                >
                                                    <i className="fas fa-times mr-2"></i>
                                                    Zrušit
                                                </button>
                                                <button
                                                    onClick={analyzeWithAnnotation}
                                                    className="btn btn-primary flex-1"
                                                >
                                                    <i className="fas fa-check mr-2"></i>
                                                    Hotovo - Analyzovat
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Nová fotka + Popsat problém */}
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => {
                                                setSelectedImage(null);
                                                setAnnotatedImage(null);
                                                setIsDrawingMode(false);
                                                setCurrentView('home');
                                            }}
                                            className="btn btn-link flex-1"
                                        >
                                            <i className="fas fa-camera mr-2"></i>
                                            Jiná fotka
                                        </button>
                                        <button
                                            onClick={() => setShowDescribeModal(true)}
                                            className="btn btn-link flex-1"
                                            style={{color: 'var(--color-warning)'}}
                                        >
                                            <i className="fas fa-comment-alt mr-2"></i>
                                            Popsat problém
                                        </button>
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
                                        <h2 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)'}}>
                                            {t('analyzingTitle')}
                                        </h2>
                                        <div className="text-secondary" style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-2)'}}>
                                            <div className="flex-center">
                                                <i className="fas fa-check-circle mr-2" style={{color: 'var(--color-success)'}}></i>
                                                {t('analyzingStep1')}
                                            </div>
                                            <div className="flex-center animate-pulse">
                                                <i className="fas fa-spinner fa-spin mr-2" style={{color: 'var(--color-primary)'}}></i>
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
                            <div className="app-container" style={{paddingTop: 'var(--space-4)'}}>
                                {/* Desktop: Obrázek vlevo, výsledky vpravo */}
                                <div className="results-desktop-layout">
                                    {/* Levý sloupec - analyzovaný obrázek (pouze desktop) */}
                                    {selectedImage && (
                                        <div className="results-image-section" style={{display: 'none'}}>
                                            <div className="glass-card" style={{padding: 'var(--space-4)', marginBottom: 'var(--space-4)'}}>
                                                <h3 style={{fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)'}}>
                                                    <i className="fas fa-image mr-2"></i>
                                                    Analyzovaný obrázek
                                                </h3>
                                                <img
                                                    src={selectedImage}
                                                    alt="Analyzovaný obrázek"
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        maxHeight: '400px',
                                                        objectFit: 'contain',
                                                        borderRadius: 'var(--radius-lg)',
                                                        background: 'var(--color-bg-secondary)'
                                                    }}
                                                />
                                                <div style={{marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)', justifyContent: 'center'}}>
                                                    <button
                                                        onClick={() => navigateTo('home')}
                                                        className="btn btn-secondary"
                                                        style={{fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-3)'}}
                                                    >
                                                        <i className="fas fa-camera mr-1"></i>
                                                        Nová fotka
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Pravý sloupec - výsledky analýzy */}
                                    <div>
                                        <div className="glass-card" style={{padding: 0, overflow: 'hidden'}}>
                                            {/* Detection Header */}
                                            <div className="result-header">
                                                <div className="flex-between">
                                                    <div>
                                                        <h2 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)'}}>
                                                            {analysisResult.object.name}
                                                        </h2>
                                                        <p style={{opacity: 0.9, fontSize: 'var(--text-sm)'}}>
                                                            {t('detectedWith')} {analysisResult.confidence}% {t('confidence')}
                                                        </p>
                                                {analysisResult._meta && (
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: 'var(--space-1)',
                                                        marginTop: 'var(--space-2)',
                                                        padding: 'var(--space-1) var(--space-2)',
                                                        borderRadius: 'var(--radius-full)',
                                                        fontSize: 'var(--text-xs)',
                                                        fontWeight: 'var(--font-medium)',
                                                        background: analysisResult._meta.source === 'cache' || analysisResult._meta.source === 'embedding'
                                                            ? 'rgba(34, 197, 94, 0.2)'
                                                            : analysisResult._meta.source === 'classifier'
                                                                ? 'rgba(59, 130, 246, 0.2)'
                                                                : analysisResult._meta.source === 'api'
                                                                    ? 'rgba(168, 85, 247, 0.2)'
                                                                    : 'rgba(251, 191, 36, 0.2)',
                                                        color: 'white'
                                                    }}>
                                                        <i className={`fas ${
                                                            analysisResult._meta.source === 'cache' ? 'fa-database' :
                                                            analysisResult._meta.source === 'embedding' ? 'fa-brain' :
                                                            analysisResult._meta.source === 'classifier' ? 'fa-robot' :
                                                            analysisResult._meta.source === 'api' ? 'fa-cloud' : 'fa-question'
                                                        }`}></i>
                                                        {analysisResult._meta.source === 'cache' && 'Z paměti'}
                                                        {analysisResult._meta.source === 'embedding' && 'Podobný obrázek'}
                                                        {analysisResult._meta.source === 'classifier' && 'Lokální AI'}
                                                        {analysisResult._meta.source === 'api' && 'Cloud AI'}
                                                        {analysisResult._meta.source === 'simulation' && 'Demo režim'}
                                                        {analysisResult._meta.cached && ` (${analysisResult._meta.duration}ms)`}
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{fontSize: 'var(--text-4xl)'}}>
                                                <i className={`fas ${getCategoryIcon(analysisResult.issue.category)}`} style={{opacity: 0.9}}></i>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tlačítko pro opravu špatné analýzy */}
                                    <div style={{
                                        padding: 'var(--space-3) var(--space-4)',
                                        background: 'var(--color-bg-secondary)',
                                        borderBottom: '1px solid var(--color-border)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>
                                            <i className="fas fa-question-circle mr-2"></i>
                                            Nesouhlasíte s výsledkem?
                                        </span>
                                        <button
                                            onClick={() => setShowFeedbackModal(true)}
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid var(--color-warning)',
                                                color: 'var(--color-warning)',
                                                padding: 'var(--space-1) var(--space-3)',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: 'var(--text-sm)',
                                                fontWeight: 'var(--font-medium)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--space-1)'
                                            }}
                                        >
                                            <i className="fas fa-edit"></i>
                                            Opravit
                                        </button>
                                    </div>

                                    {/* Possible Issues Selection */}
                                    {analysisResult.possibleIssues && analysisResult.possibleIssues.length > 0 && (
                                        <div style={{padding: 'var(--space-4)', background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)'}}>
                                            <h3 style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>
                                                <i className="fas fa-question-circle mr-2"></i>
                                                Vyberte váš problém:
                                            </h3>
                                            <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-2)'}}>
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
                                                        style={{
                                                            padding: 'var(--space-3)',
                                                            borderRadius: 'var(--radius-lg)',
                                                            border: analysisResult.issue.name === issue.name
                                                                ? '2px solid var(--color-primary)'
                                                                : '1px solid var(--color-border)',
                                                            background: analysisResult.issue.name === issue.name
                                                                ? 'var(--color-primary-light)'
                                                                : 'var(--color-bg-primary)',
                                                            textAlign: 'left',
                                                            cursor: 'pointer',
                                                            transition: 'all var(--transition-fast)'
                                                        }}
                                                    >
                                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                                            <div>
                                                                <p style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-1)'}}>
                                                                    {issue.name}
                                                                </p>
                                                                <p style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)'}}>
                                                                    {issue.description}
                                                                </p>
                                                            </div>
                                                            <div style={{
                                                                background: idx === 0 ? 'var(--color-success)' : 'var(--color-bg-tertiary)',
                                                                color: idx === 0 ? 'white' : 'var(--color-text-secondary)',
                                                                padding: 'var(--space-1) var(--space-2)',
                                                                borderRadius: 'var(--radius-full)',
                                                                fontSize: 'var(--text-xs)',
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                {Math.round(issue.probability * 100)}%
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Issue Details */}
                                    <div className="card-body">
                                        <div className="mb-6">
                                            <h3 style={{fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)'}}>
                                                {t('identifiedProblem')}
                                            </h3>
                                            <div className="alert alert-danger">
                                                <p className="alert-title">{analysisResult.issue.name}</p>
                                                <p style={{fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)'}}>
                                                    {analysisResult.issue.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Quick Info */}
                                        <div className="grid grid-3 gap-4 mb-6">
                                            <div className="info-box">
                                                <i className="fas fa-clock" style={{color: 'var(--color-primary)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)', display: 'block'}}></i>
                                                <div style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>{t('repairTime')}</div>
                                                <div className="font-semibold">{analysisResult.issue.timeEstimate}</div>
                                            </div>
                                            <div className="info-box">
                                                <i className="fas fa-signal" style={{color: 'var(--color-warning)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)', display: 'block'}}></i>
                                                <div style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>{t('difficulty')}</div>
                                                <div className="font-semibold">{analysisResult.issue.difficulty}</div>
                                            </div>
                                            <div className="info-box">
                                                <i className="fas fa-exclamation-triangle" style={{color: 'var(--color-danger)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)', display: 'block'}}></i>
                                                <div style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>{t('risk')}</div>
                                                <div className="font-semibold">{analysisResult.issue.riskScore}/10</div>
                                            </div>
                                        </div>

                                        {/* 💰 Savings Calculator - DIY vs Professional */}
                                        {analysisResult.issue.materialCost && analysisResult.issue.professionalCost && (
                                            <div style={{
                                                background: 'var(--color-success-light)',
                                                border: '2px solid var(--color-success)',
                                                borderRadius: 'var(--radius-xl)',
                                                padding: 'var(--space-6)',
                                                marginBottom: 'var(--space-6)'
                                            }}>
                                                <h3 style={{
                                                    fontWeight: 'var(--font-bold)',
                                                    color: 'var(--color-success-text)',
                                                    marginBottom: 'var(--space-4)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 'var(--space-2)'
                                                }}>
                                                    <i className="fas fa-piggy-bank" style={{fontSize: 'var(--text-xl)'}}></i>
                                                    Kolik ušetříš?
                                                </h3>

                                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)'}}>
                                                    {/* DIY Cost */}
                                                    <div style={{
                                                        background: 'white',
                                                        padding: 'var(--space-4)',
                                                        borderRadius: 'var(--radius-lg)',
                                                        textAlign: 'center',
                                                        border: '2px solid var(--color-success)'
                                                    }}>
                                                        <div style={{fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-success)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-1)'}}>
                                                            <i className="fas fa-hand-paper mr-1"></i> DIY oprava
                                                        </div>
                                                        <div style={{fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-success-text)'}}>
                                                            {analysisResult.issue.materialCost.min}-{analysisResult.issue.materialCost.max} Kč
                                                        </div>
                                                        <div style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)'}}>
                                                            pouze materiál
                                                        </div>
                                                    </div>

                                                    {/* Professional Cost */}
                                                    <div style={{
                                                        background: 'white',
                                                        padding: 'var(--space-4)',
                                                        borderRadius: 'var(--radius-lg)',
                                                        textAlign: 'center',
                                                        border: '1px solid var(--color-border)'
                                                    }}>
                                                        <div style={{fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-text-secondary)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-1)'}}>
                                                            <i className="fas fa-user-tie mr-1"></i> Profesionál
                                                        </div>
                                                        <div style={{fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-secondary)'}}>
                                                            {analysisResult.issue.professionalCost.min}-{analysisResult.issue.professionalCost.max} Kč
                                                        </div>
                                                        <div style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)'}}>
                                                            materiál + práce
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Savings highlight */}
                                                <div style={{
                                                    background: 'var(--color-success)',
                                                    color: 'white',
                                                    padding: 'var(--space-4)',
                                                    borderRadius: 'var(--radius-lg)',
                                                    textAlign: 'center'
                                                }}>
                                                    <div style={{fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)'}}>
                                                        <i className="fas fa-star mr-1"></i> Tvoje úspora s FIXO
                                                    </div>
                                                    <div style={{fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)'}}>
                                                        {analysisResult.issue.professionalCost.min - analysisResult.issue.materialCost.max}-{analysisResult.issue.professionalCost.max - analysisResult.issue.materialCost.min} Kč
                                                    </div>
                                                    <div style={{fontSize: 'var(--text-xs)', opacity: 0.9}}>
                                                        To je {Math.round((analysisResult.issue.professionalCost.min + analysisResult.issue.professionalCost.max) / 2 / 79)} měsíců FIXO Premium zdarma! 💪
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Safety Warnings */}
                                        {analysisResult.issue.riskScore > 5 && (
                                            <div className="alert alert-warning mb-6">
                                                <p className="alert-title">
                                                    <i className="fas fa-exclamation-triangle mr-2"></i>
                                                    {t('safetyWarning')}
                                                </p>
                                                <ul style={{fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)'}}>
                                                    {analysisResult.issue.safetyWarnings.map((warning, idx) => (
                                                        <li key={idx}>• {warning}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Action Buttons - Nový obchodní model */}
                                        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'}}>
                                            {/* Základní návod - ZDARMA */}
                                            <button
                                                onClick={() => startRepair(analysisResult.issue)}
                                                className="btn btn-success"
                                                style={{width: '100%', padding: 'var(--space-4)'}}
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
                                                style={{
                                                    width: '100%',
                                                    padding: 'var(--space-4)',
                                                    background: isGuidePurchased(analysisResult.issue.id || analysisResult.issue.name)
                                                        ? 'var(--color-success)'
                                                        : 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 'var(--radius-lg)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: 'var(--space-2)',
                                                    fontWeight: 'var(--font-semibold)'
                                                }}
                                            >
                                                <i className={`fas ${isGuidePurchased(analysisResult.issue.id || analysisResult.issue.name) ? 'fa-check-circle' : 'fa-crown'}`}></i>
                                                Detailní návod + schémata
                                                <span style={{
                                                    background: 'rgba(255,255,255,0.2)',
                                                    padding: '2px 10px',
                                                    borderRadius: 'var(--radius-full)',
                                                    fontSize: 'var(--text-sm)'
                                                }}>
                                                    {isGuidePurchased(analysisResult.issue.id || analysisResult.issue.name) ? 'ODEMČENO' : `${PRICING.detailedGuide} ${PRICING.currency}`}
                                                </span>
                                            </button>

                                            {/* Zavolat odborníka - najde nejbližšího */}
                                            <button
                                                onClick={async () => {
                                                    setShowNearbySuppliers(true);
                                                }}
                                                className="btn btn-secondary"
                                                style={{width: '100%', padding: 'var(--space-4)'}}
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
                                        <div style={{marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
                                            <p style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)', textAlign: 'center'}}>
                                                <i className="fas fa-shopping-cart mr-1"></i>
                                                Nakupte potřebný materiál:
                                            </p>
                                            <div style={{display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', justifyContent: 'center'}}>
                                                {Object.entries(affiliateLinks).filter(([_, shop]) => shop.hasAffiliate).map(([key, shop]) => (
                                                    <a
                                                        key={key}
                                                        href={shop.baseUrl + encodeURIComponent(analysisResult.issue.name)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '4px',
                                                            padding: '4px 10px',
                                                            background: shop.color,
                                                            color: 'white',
                                                            borderRadius: 'var(--radius-md)',
                                                            textDecoration: 'none',
                                                            fontSize: 'var(--text-xs)',
                                                            fontWeight: 'var(--font-semibold)'
                                                        }}
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
                                </div>
                            </div>
                        )}

                        {/* Repair Steps View */}
                        {currentView === 'repair' && selectedIssue && (
                            <div className="app-container" style={{paddingTop: 'var(--space-4)'}}>
                                <div className="glass-card" style={{padding: 0, overflow: 'hidden'}}>
                                    {/* Progress Bar */}
                                    <div className="progress" style={{borderRadius: 0}}>
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${((currentStep + 1) / selectedIssue.steps.length) * 100}%` }}
                                        ></div>
                                    </div>

                                    {/* Save for Offline & Stopwatch */}
                                    <div style={{
                                        background: 'var(--color-bg-secondary)',
                                        padding: 'var(--space-2) var(--space-4)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderBottom: '1px solid var(--color-border)',
                                        flexWrap: 'wrap',
                                        gap: 'var(--space-2)'
                                    }}>
                                        <span style={{fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)'}}>
                                            {selectedIssue.name}
                                        </span>
                                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                            {/* Stopwatch */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--space-1)',
                                                background: timerRunning ? 'var(--color-success)' : 'var(--color-bg-tertiary)',
                                                color: timerRunning ? 'white' : 'var(--color-text-primary)',
                                                padding: 'var(--space-1) var(--space-2)',
                                                borderRadius: 'var(--radius-md)',
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: 'var(--text-sm)',
                                                fontWeight: 'var(--font-bold)'
                                            }}>
                                                <i className="fas fa-stopwatch"></i>
                                                <span>{formatTime(elapsedTime)}</span>
                                            </div>
                                            <button
                                                onClick={timerRunning ? pauseTimer : startTimer}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '28px',
                                                    height: '28px',
                                                    background: timerRunning ? 'var(--color-warning)' : 'var(--color-success)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 'var(--radius-md)',
                                                    cursor: 'pointer',
                                                    fontSize: 'var(--text-xs)'
                                                }}
                                                title={timerRunning ? 'Pozastavit' : 'Spustit'}
                                            >
                                                <i className={`fas ${timerRunning ? 'fa-pause' : 'fa-play'}`}></i>
                                            </button>
                                            {elapsedTime > 0 && (
                                                <button
                                                    onClick={resetTimer}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: '28px',
                                                        height: '28px',
                                                        background: 'var(--color-bg-tertiary)',
                                                        color: 'var(--color-text-secondary)',
                                                        border: 'none',
                                                        borderRadius: 'var(--radius-md)',
                                                        cursor: 'pointer',
                                                        fontSize: 'var(--text-xs)'
                                                    }}
                                                    title="Reset"
                                                >
                                                    <i className="fas fa-undo"></i>
                                                </button>
                                            )}
                                            {/* Save offline button */}
                                            <button
                                                onClick={() => saveGuideOffline(selectedIssue)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 'var(--space-1)',
                                                    padding: 'var(--space-1) var(--space-2)',
                                                    background: isGuideSaved(selectedIssue.name) ? 'var(--color-success)' : 'var(--color-primary)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 'var(--radius-md)',
                                                    fontSize: 'var(--text-xs)',
                                                    fontWeight: 'var(--font-semibold)',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <i className={`fas ${isGuideSaved(selectedIssue.name) ? 'fa-check' : 'fa-download'}`}></i>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Tools Needed with Affiliate Links */}
                                    <div style={{background: 'var(--color-info-light)', padding: 'var(--space-6)', borderBottom: '1px solid var(--color-border)'}}>
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)'}}>
                                            <h3 style={{fontWeight: 'var(--font-semibold)', color: 'var(--color-info)'}}>
                                                <i className="fas fa-toolbox mr-2"></i>
                                                {t('toolsNeeded')}
                                            </h3>
                                            <button
                                                onClick={() => exportShoppingList(selectedIssue)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 'var(--space-1)',
                                                    padding: 'var(--space-1) var(--space-2)',
                                                    background: 'var(--color-success)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 'var(--radius-md)',
                                                    fontSize: 'var(--text-xs)',
                                                    fontWeight: 'var(--font-semibold)',
                                                    cursor: 'pointer'
                                                }}
                                                title="Exportovat nákupní seznam"
                                            >
                                                <i className="fas fa-share-alt"></i>
                                                Export
                                            </button>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-2)'}}>
                                            {selectedIssue.tools.map((tool, idx) => (
                                                <div key={idx} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    background: 'var(--color-bg-primary)',
                                                    padding: 'var(--space-2) var(--space-3)',
                                                    borderRadius: 'var(--radius-lg)',
                                                    border: '1px solid var(--color-border)'
                                                }}>
                                                    <span style={{fontWeight: 'var(--font-medium)', fontSize: 'var(--text-sm)'}}>
                                                        <i className="fas fa-wrench mr-2" style={{color: 'var(--color-primary)', opacity: 0.7}}></i>
                                                        {tool}
                                                    </span>
                                                    {/* Affiliate odkazy - pouze e-shopy s affiliate programem */}
                                                    <div style={{display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap'}}>
                                                        {Object.entries(affiliateLinks)
                                                            .filter(([_, shop]) => shop.hasAffiliate)
                                                            .slice(0, 3) // Zobrazit max 3 e-shopy
                                                            .map(([key, shop]) => (
                                                            <a
                                                                key={key}
                                                                href={getAffiliateUrl(key, tool, selectedIssue)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    padding: 'var(--space-1) var(--space-2)',
                                                                    background: shop.color,
                                                                    color: 'white',
                                                                    borderRadius: 'var(--radius-md)',
                                                                    fontSize: 'var(--text-xs)',
                                                                    textDecoration: 'none',
                                                                    fontWeight: 'var(--font-semibold)',
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '3px'
                                                                }}
                                                                title={`Koupit na ${shop.name}`}
                                                            >
                                                                <i className={`fas ${shop.icon}`} style={{fontSize: '10px'}}></i>
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
                                            <h2 style={{fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)'}}>
                                                {t('step')} {currentStep + 1} {t('of')} {selectedIssue.steps.length}
                                            </h2>

                                            <div className="step-box">
                                                <div style={{fontSize: 'var(--text-6xl)', marginBottom: 'var(--space-4)'}}>
                                                    {selectedIssue.steps[currentStep].icon}
                                                </div>
                                                <p style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)'}}>
                                                    {selectedIssue.steps[currentStep].action}
                                                </p>

                                                {/* Detailed description */}
                                                {selectedIssue.steps[currentStep].description && (
                                                    <p style={{fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)', lineHeight: 1.6}}>
                                                        {selectedIssue.steps[currentStep].description}
                                                    </p>
                                                )}

                                                {/* Tools for this step */}
                                                {selectedIssue.steps[currentStep].tools_for_step && selectedIssue.steps[currentStep].tools_for_step.length > 0 && (
                                                    <div style={{background: 'var(--color-info-light)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-3)', textAlign: 'left'}}>
                                                        <p style={{fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)'}}>
                                                            <i className="fas fa-wrench mr-2" style={{color: 'var(--color-info)'}}></i>Nástroje:
                                                        </p>
                                                        <p style={{fontSize: 'var(--text-sm)'}}>{selectedIssue.steps[currentStep].tools_for_step.join(', ')}</p>
                                                    </div>
                                                )}

                                                {/* Parts for this step */}
                                                {selectedIssue.steps[currentStep].parts_for_step && selectedIssue.steps[currentStep].parts_for_step.length > 0 && (
                                                    <div style={{background: 'var(--color-warning-light)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-3)', textAlign: 'left'}}>
                                                        <p style={{fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)'}}>
                                                            <i className="fas fa-box mr-2" style={{color: 'var(--color-warning)'}}></i>Potřebné díly:
                                                        </p>
                                                        <p style={{fontSize: 'var(--text-sm)'}}>{selectedIssue.steps[currentStep].parts_for_step.join(', ')}</p>
                                                    </div>
                                                )}

                                                {/* Tip for this step */}
                                                {selectedIssue.steps[currentStep].tip && (
                                                    <div style={{background: 'var(--color-success-light)', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-3)', textAlign: 'left'}}>
                                                        <p style={{fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)'}}>
                                                            <i className="fas fa-lightbulb mr-2" style={{color: 'var(--color-success)'}}></i>Tip:
                                                        </p>
                                                        <p style={{fontSize: 'var(--text-sm)'}}>{selectedIssue.steps[currentStep].tip}</p>
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
                                            <h3 style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)'}}>{t('allStepsOverview')}</h3>
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
                                                        <span style={{marginRight: 'var(--space-3)', fontSize: 'var(--text-2xl)'}}>{step.icon}</span>
                                                        <span className="flex-1" style={{fontWeight: idx === currentStep ? 'var(--font-semibold)' : 'normal'}}>
                                                            {step.step}. {step.action}
                                                        </span>
                                                        {idx < currentStep && (
                                                            <i className="fas fa-check-circle" style={{color: 'var(--color-success)'}}></i>
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
                                        <div style={{marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', textAlign: 'center'}}>
                                            <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)'}}>
                                                <i className="fas fa-question-circle mr-2"></i>
                                                Nevyřešili jste problém? Potřebujete odbornou pomoc?
                                            </p>
                                            <button
                                                onClick={() => {
                                                    const query = encodeURIComponent(`${selectedIssue.name} opravář v mém okolí`);
                                                    window.open(`https://www.google.com/search?q=${query}`, '_blank');
                                                }}
                                                className="btn btn-secondary"
                                                style={{marginRight: 'var(--space-2)'}}
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
                            <div className="app-container" style={{paddingTop: 'var(--space-4)'}}>
                                <h2 className="section-title" style={{marginBottom: 'var(--space-4)'}}>
                                    <i className="fas fa-book section-title-icon"></i>
                                    {t('databaseTitle')}
                                </h2>

                                {/* Search Input */}
                                <div style={{marginBottom: 'var(--space-6)'}}>
                                    <div style={{
                                        position: 'relative',
                                        maxWidth: '500px',
                                        margin: '0 auto'
                                    }}>
                                        <i className="fas fa-search" style={{
                                            position: 'absolute',
                                            left: 'var(--space-4)',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'var(--color-text-muted)'
                                        }}></i>
                                        <input
                                            type="text"
                                            placeholder="Hledat opravy, nástroje, problémy..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: 'var(--space-3) var(--space-4) var(--space-3) var(--space-10)',
                                                borderRadius: 'var(--radius-full)',
                                                border: '2px solid var(--color-border)',
                                                fontSize: 'var(--text-base)',
                                                transition: 'all var(--transition-fast)',
                                                outline: 'none'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                                        />
                                        {searchTerm && (
                                            <button
                                                onClick={() => setSearchTerm('')}
                                                style={{
                                                    position: 'absolute',
                                                    right: 'var(--space-4)',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'var(--color-text-muted)',
                                                    cursor: 'pointer',
                                                    padding: 'var(--space-1)'
                                                }}
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Category Filter - kompaktní na desktopu */}
                                <div className="category-filter category-filter-desktop">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                        >
                                            <i className={`fas ${cat.icon}`} style={{marginRight: 'var(--space-1)'}}></i>
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Results count */}
                                <p className="text-center text-secondary mb-4" style={{fontSize: 'var(--text-sm)'}}>
                                    {t('showing')} {getFilteredDatabase().length} {t('outOf')} {Object.keys(repairDatabase).length} {t('items')}
                                </p>

                                {/* Knowledge Grid - 4-6 sloupců na desktopu */}
                                <div className="grid grid-3 knowledge-grid-desktop gap-4">
                                    {getFilteredDatabase().map(([key, item]) => (
                                        <div key={key} className="knowledge-card knowledge-card-compact">
                                            <div className="knowledge-card-header">
                                                <div className="flex-between items-center">
                                                    <h3 style={{fontWeight: 'var(--font-bold)', fontSize: 'var(--text-base)'}}>{item.name}</h3>
                                                    <i className={`fas ${getCategoryIcon(item.category)}`} style={{fontSize: 'var(--text-xl)', opacity: 0.9}}></i>
                                                </div>
                                            </div>
                                            <div className="p-3 scrollable-content" style={{maxHeight: '180px'}}>
                                                <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-2)'}}>
                                                    {item.issues.map(issue => (
                                                        <div key={issue.id} className="issue-item" style={{padding: 'var(--space-2)', paddingLeft: 'var(--space-3)'}}>
                                                            <p style={{fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)'}}>{issue.name}</p>
                                                            <div style={{marginTop: 'var(--space-1)', display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', flexWrap: 'wrap'}}>
                                                                <span><i className="fas fa-clock mr-1"></i>{issue.timeEstimate}</span>
                                                                <span className={`badge badge-${issue.riskScore > 5 ? 'danger' : issue.riskScore > 2 ? 'warning' : 'success'}`} style={{fontSize: '10px', padding: '1px 6px'}}>
                                                                    {issue.riskScore}/10
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {getFilteredDatabase().length === 0 && (
                                    <div className="empty-state card">
                                        <div className="empty-state-icon"><i className="fas fa-search"></i></div>
                                        <p className="empty-state-title">{t('noCategoryItems')}</p>
                                        <p className="empty-state-desc">{t('tryCategoryHint')}</p>
                                    </div>
                                )}

                                <div className="alert alert-info mt-8">
                                    <p className="alert-title">
                                        <i className="fas fa-info-circle mr-2"></i>
                                        {t('aboutDatabase')}
                                    </p>
                                    <p>
                                        {t('databaseInfo')}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* About Page View */}
                        {currentView === 'about' && (
                            <div className="app-container" style={{paddingTop: 'var(--space-4)'}}>
                                <h2 className="section-title" style={{marginBottom: 'var(--space-4)'}}>
                                    <i className="fas fa-info-circle section-title-icon"></i>
                                    O nás
                                </h2>

                                <div className="card mb-6">
                                    <div className="card-body text-center" style={{padding: 'var(--space-8)'}}>
                                        <div style={{fontSize: '4rem', marginBottom: 'var(--space-4)'}}>🔧</div>
                                        <h3 style={{fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-4)'}}>FIXO</h3>
                                        <p style={{fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)'}}>
                                            Váš chytrý pomocník pro domácí opravy
                                        </p>
                                    </div>
                                </div>

                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-lightbulb mr-2" style={{color: 'var(--color-warning)'}}></i>Náš příběh</h3>
                                    </div>
                                    <div className="card-body">
                                        <p style={{lineHeight: 1.7, marginBottom: 'var(--space-4)'}}>
                                            FIXO vzniklo z jednoduché myšlenky - co kdyby každý mohl snadno opravit běžné domácí závady bez nutnosti volat drahého opraváře?
                                        </p>
                                        <p style={{lineHeight: 1.7, marginBottom: 'var(--space-4)'}}>
                                            Díky umělé inteligenci dokážeme z fotografie rozpoznat problém a poskytnout přesný návod krok za krokem. Ušetříte čas, peníze a získáte nové dovednosti.
                                        </p>
                                        <p style={{lineHeight: 1.7}}>
                                            Naše databáze obsahuje stovky návodů pokrývajících vodoinstalaci, elektroinstalaci, topení, bytové opravy a další oblasti.
                                        </p>
                                    </div>
                                </div>

                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-users mr-2" style={{color: 'var(--color-primary)'}}></i>Náš tým</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="grid grid-2 gap-4">
                                            <div className="text-center" style={{padding: 'var(--space-4)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
                                                <div style={{fontSize: '2.5rem', marginBottom: 'var(--space-2)'}}>👨‍💻</div>
                                                <p style={{fontWeight: 'var(--font-semibold)'}}>Vývojáři</p>
                                                <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>AI & technologie</p>
                                            </div>
                                            <div className="text-center" style={{padding: 'var(--space-4)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
                                                <div style={{fontSize: '2.5rem', marginBottom: 'var(--space-2)'}}>🔧</div>
                                                <p style={{fontWeight: 'var(--font-semibold)'}}>Odborníci</p>
                                                <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Řemeslníci & technici</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-envelope mr-2" style={{color: 'var(--color-success)'}}></i>Kontakt</h3>
                                    </div>
                                    <div className="card-body">
                                        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'}}>
                                            <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-3)'}}>
                                                <i className="fas fa-envelope" style={{color: 'var(--color-primary)', width: '20px'}}></i>
                                                <span>support@fixo.app</span>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-3)'}}>
                                                <i className="fas fa-globe" style={{color: 'var(--color-primary)', width: '20px'}}></i>
                                                <span>www.fixo.app</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="alert alert-info">
                                    <p><i className="fas fa-heart mr-2" style={{color: 'var(--color-danger)'}}></i>Děkujeme, že používáte FIXO!</p>
                                </div>
                            </div>
                        )}

                        {/* Premium Page View - Freemium Tiers */}
                        {currentView === 'premium' && (
                            <div className="app-container" style={{paddingTop: 'var(--space-4)'}}>
                                <h2 className="section-title" style={{marginBottom: 'var(--space-4)'}}>
                                    <i className="fas fa-crown section-title-icon" style={{color: 'var(--color-warning)'}}></i>
                                    Vyberte si plán
                                </h2>

                                <p style={{textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)'}}>
                                    Začněte zdarma, upgradujte kdykoliv
                                </p>

                                {/* Pricing Cards */}
                                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)'}}>
                                    {/* FREE Tier */}
                                    <div className="card" style={{border: '2px solid var(--color-border)'}}>
                                        <div className="card-body" style={{padding: 'var(--space-6)'}}>
                                            <div style={{textAlign: 'center', marginBottom: 'var(--space-4)'}}>
                                                <span style={{fontSize: '2rem'}}>🆓</span>
                                                <h3 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginTop: 'var(--space-2)'}}>FREE</h3>
                                                <div style={{fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-success)', margin: 'var(--space-2) 0'}}>0 Kč</div>
                                                <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Navždy zdarma</p>
                                            </div>
                                            <ul style={{listStyle: 'none', padding: 0, marginBottom: 'var(--space-4)'}}>
                                                <li style={{padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                    <i className="fas fa-check" style={{color: 'var(--color-success)'}}></i>
                                                    <span>3 AI analýzy denně</span>
                                                </li>
                                                <li style={{padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                    <i className="fas fa-check" style={{color: 'var(--color-success)'}}></i>
                                                    <span>Základní návody</span>
                                                </li>
                                                <li style={{padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                    <i className="fas fa-check" style={{color: 'var(--color-success)'}}></i>
                                                    <span>Databáze 67 oprav</span>
                                                </li>
                                                <li style={{padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', opacity: 0.5}}>
                                                    <i className="fas fa-times" style={{color: 'var(--color-text-muted)'}}></i>
                                                    <span>Kontakty řemeslníků</span>
                                                </li>
                                            </ul>
                                            <button className="btn btn-secondary w-full" disabled style={{opacity: 0.7}}>
                                                Aktuální plán
                                            </button>
                                        </div>
                                    </div>

                                    {/* PLUS Tier - Most Popular */}
                                    <div className="card" style={{border: '2px solid var(--color-primary)', position: 'relative', transform: 'scale(1.02)'}}>
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
                                        <div className="card-body" style={{padding: 'var(--space-6)'}}>
                                            <div style={{textAlign: 'center', marginBottom: 'var(--space-4)'}}>
                                                <span style={{fontSize: '2rem'}}>⭐</span>
                                                <h3 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginTop: 'var(--space-2)'}}>PLUS</h3>
                                                <div style={{fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary)', margin: 'var(--space-2) 0'}}>49 Kč<span style={{fontSize: 'var(--text-base)', fontWeight: 'normal'}}>/měsíc</span></div>
                                                <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>nebo 399 Kč/rok (ušetříte 33%)</p>
                                            </div>
                                            <ul style={{listStyle: 'none', padding: 0, marginBottom: 'var(--space-4)'}}>
                                                <li style={{padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                    <i className="fas fa-check" style={{color: 'var(--color-success)'}}></i>
                                                    <span><strong>Neomezené</strong> AI analýzy</span>
                                                </li>
                                                <li style={{padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                    <i className="fas fa-check" style={{color: 'var(--color-success)'}}></i>
                                                    <span>Affiliate odkazy na materiál</span>
                                                </li>
                                                <li style={{padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                    <i className="fas fa-check" style={{color: 'var(--color-success)'}}></i>
                                                    <span>Odhady nákladů</span>
                                                </li>
                                                <li style={{padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', opacity: 0.5}}>
                                                    <i className="fas fa-times" style={{color: 'var(--color-text-muted)'}}></i>
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
                                    <div className="card" style={{border: '2px solid var(--color-warning)', background: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)'}}>
                                        <div className="card-body" style={{padding: 'var(--space-6)'}}>
                                            <div style={{textAlign: 'center', marginBottom: 'var(--space-4)'}}>
                                                <span style={{fontSize: '2rem'}}>👑</span>
                                                <h3 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginTop: 'var(--space-2)'}}>PRO</h3>
                                                <div style={{fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-warning-text)', margin: 'var(--space-2) 0'}}>99 Kč<span style={{fontSize: 'var(--text-base)', fontWeight: 'normal'}}>/měsíc</span></div>
                                                <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>nebo 799 Kč/rok (ušetříte 33%)</p>
                                            </div>
                                            <ul style={{listStyle: 'none', padding: 0, marginBottom: 'var(--space-4)'}}>
                                                <li style={{padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                    <i className="fas fa-check" style={{color: 'var(--color-success)'}}></i>
                                                    <span>Vše z PLUS</span>
                                                </li>
                                                <li style={{padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                    <i className="fas fa-check" style={{color: 'var(--color-success)'}}></i>
                                                    <span><strong>Kontakty řemeslníků</strong></span>
                                                </li>
                                                <li style={{padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                    <i className="fas fa-check" style={{color: 'var(--color-success)'}}></i>
                                                    <span>Technická schémata</span>
                                                </li>
                                                <li style={{padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                    <i className="fas fa-check" style={{color: 'var(--color-success)'}}></i>
                                                    <span>Prioritní podpora 24/7</span>
                                                </li>
                                                <li style={{padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                    <i className="fas fa-check" style={{color: 'var(--color-success)'}}></i>
                                                    <span>Offline režim</span>
                                                </li>
                                            </ul>
                                            <button className="btn w-full" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white'}} onClick={() => alert('Platební brána bude brzy dostupná!\n\nCena: 99 Kč/měsíc\n\nZískáte VŠE:\n• Neomezené AI analýzy\n• Kontakty řemeslníků\n• Technická schémata\n• Prioritní podpora')}>
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
                                        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-4)'}}>
                                            <div style={{display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)'}}>
                                                <div style={{background: 'var(--color-success-light)', color: 'var(--color-success)', padding: 'var(--space-2)', borderRadius: 'var(--radius-lg)'}}>
                                                    <i className="fas fa-project-diagram"></i>
                                                </div>
                                                <div>
                                                    <p style={{fontWeight: 'var(--font-semibold)'}}>Technické schémata a diagramy</p>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Detailní nákresy zapojení, rozměry a technické výkresy</p>
                                                </div>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)'}}>
                                                <div style={{background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: 'var(--space-2)', borderRadius: 'var(--radius-lg)'}}>
                                                    <i className="fas fa-shopping-cart"></i>
                                                </div>
                                                <div>
                                                    <p style={{fontWeight: 'var(--font-semibold)'}}>Affiliate odkazy na materiál</p>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Přímé odkazy na potřebný materiál s nejlepšími cenami</p>
                                                </div>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)'}}>
                                                <div style={{background: 'var(--color-warning-light)', color: 'var(--color-warning-text)', padding: 'var(--space-2)', borderRadius: 'var(--radius-lg)'}}>
                                                    <i className="fas fa-map-marker-alt"></i>
                                                </div>
                                                <div>
                                                    <p style={{fontWeight: 'var(--font-semibold)'}}>Kontakty na místní opraváře</p>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>AI vyhledá ověřené řemeslníky ve vašem okolí</p>
                                                </div>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)'}}>
                                                <div style={{background: '#faf5ff', color: '#9333ea', padding: 'var(--space-2)', borderRadius: 'var(--radius-lg)'}}>
                                                    <i className="fas fa-infinity"></i>
                                                </div>
                                                <div>
                                                    <p style={{fontWeight: 'var(--font-semibold)'}}>Neomezené analýzy</p>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Žádné denní limity na AI analýzu fotek</p>
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
                                    <div className="card-body" style={{padding: 0}}>
                                        <div style={{borderBottom: '1px solid var(--color-border)', padding: 'var(--space-4)'}}>
                                            <h4 style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)'}}>Mohu kdykoliv zrušit předplatné?</h4>
                                            <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Ano, předplatné můžete zrušit kdykoliv bez poplatků. Po zrušení budete moci používat placenou verzi do konce zaplaceného období.</p>
                                        </div>
                                        <div style={{borderBottom: '1px solid var(--color-border)', padding: 'var(--space-4)'}}>
                                            <h4 style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)'}}>Jak funguje roční platba?</h4>
                                            <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Při roční platbě ušetříte 33% oproti měsíční platbě. PLUS stojí 399 Kč/rok místo 588 Kč, PRO stojí 799 Kč/rok místo 1188 Kč.</p>
                                        </div>
                                        <div style={{borderBottom: '1px solid var(--color-border)', padding: 'var(--space-4)'}}>
                                            <h4 style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)'}}>Existují speciální ceny pro důchodce nebo studenty?</h4>
                                            <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Ano! Nabízíme 50% slevu pro seniory (65+) a studenty. Kontaktujte nás na podpora@fixo.cz s dokladem o věku nebo studiu.</p>
                                        </div>
                                        <div style={{padding: 'var(--space-4)'}}>
                                            <h4 style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)'}}>Mohu si FIXO vyzkoušet před placením?</h4>
                                            <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Samozřejmě! Verze FREE je navždy zdarma. Navíc nabízíme 7denní zkušební dobu na PLUS a PRO plány.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Pricing Info */}
                                <div className="alert" style={{background: 'var(--color-primary-light)', border: 'none'}}>
                                    <div style={{display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)'}}>
                                        <i className="fas fa-heart" style={{color: 'var(--color-primary)', fontSize: 'var(--text-xl)'}}></i>
                                        <div>
                                            <p style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-1)'}}>Sociální dostupnost</p>
                                            <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>
                                                FIXO věří v dostupnost pro všechny. Senioři 65+ a studenti získají 50% slevu.
                                                Kontaktujte nás na <a href="mailto:podpora@fixo.cz" style={{color: 'var(--color-primary)'}}>podpora@fixo.cz</a>.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="alert alert-info" style={{marginTop: 'var(--space-4)'}}>
                                    <p><i className="fas fa-shield-alt mr-2"></i>Bezpečná platba přes Stripe. Zrušit můžete kdykoliv.</p>
                                </div>
                            </div>
                        )}

                        {/* Partnership Page View */}
                        {currentView === 'partnership' && (
                            <div className="app-container" style={{paddingTop: 'var(--space-4)'}}>
                                <h2 className="section-title" style={{marginBottom: 'var(--space-4)'}}>
                                    <i className="fas fa-handshake section-title-icon"></i>
                                    Partnerský program
                                </h2>

                                {/* Hero banner */}
                                <div className="card mb-6" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, #4338ca 100%)', color: 'white'}}>
                                    <div className="card-body text-center" style={{padding: 'var(--space-8)'}}>
                                        <div style={{fontSize: '3rem', marginBottom: 'var(--space-4)'}}>🤝</div>
                                        <h3 style={{fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)'}}>Staňte se partnerem FIXO</h3>
                                        <p style={{opacity: 0.9}}>Získejte provize z doporučení a rozšiřte svůj byznys</p>
                                    </div>
                                </div>

                                {/* Typy partnerství */}
                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title">Typy partnerství</h3>
                                    </div>
                                    <div className="card-body">
                                        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-4)'}}>
                                            <div className="card" style={{background: 'var(--color-bg-secondary)'}}>
                                                <div className="card-body">
                                                    <div style={{display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)'}}>
                                                        <div style={{fontSize: '2rem'}}>🔧</div>
                                                        <div style={{flex: 1}}>
                                                            <h4 style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-1)'}}>Řemeslníci & Opraváři</h4>
                                                            <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)'}}>
                                                                Registrujte se jako místní odborník a získávejte zakázky od uživatelů FIXO
                                                            </p>
                                                            <span className="badge badge-success">Provize 15%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card" style={{background: 'var(--color-bg-secondary)'}}>
                                                <div className="card-body">
                                                    <div style={{display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)'}}>
                                                        <div style={{fontSize: '2rem'}}>🏪</div>
                                                        <div style={{flex: 1}}>
                                                            <h4 style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-1)'}}>E-shopy & Prodejci</h4>
                                                            <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)'}}>
                                                                Nabídněte své produkty přímo v FIXO návodech
                                                            </p>
                                                            <span className="badge badge-primary">Affiliate program</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card" style={{background: 'var(--color-bg-secondary)'}}>
                                                <div className="card-body">
                                                    <div style={{display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)'}}>
                                                        <div style={{fontSize: '2rem'}}>📢</div>
                                                        <div style={{flex: 1}}>
                                                            <h4 style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-1)'}}>Influenceři & Blogeři</h4>
                                                            <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)'}}>
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
                                            <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                <i className="fas fa-check-circle" style={{color: 'var(--color-success)'}}></i>
                                                <span style={{fontSize: 'var(--text-sm)'}}>Pravidelné výplaty</span>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                <i className="fas fa-check-circle" style={{color: 'var(--color-success)'}}></i>
                                                <span style={{fontSize: 'var(--text-sm)'}}>Marketing materiály</span>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                <i className="fas fa-check-circle" style={{color: 'var(--color-success)'}}></i>
                                                <span style={{fontSize: 'var(--text-sm)'}}>Detailní statistiky</span>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-2)'}}>
                                                <i className="fas fa-check-circle" style={{color: 'var(--color-success)'}}></i>
                                                <span style={{fontSize: 'var(--text-sm)'}}>Dedikovaná podpora</span>
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
                                        <form onSubmit={(e) => e.preventDefault()} style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-4)'}}>
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
                            <div className="app-container" style={{paddingTop: 'var(--space-4)'}}>
                                <h2 className="section-title" style={{marginBottom: 'var(--space-4)'}}>
                                    <i className="fas fa-truck section-title-icon"></i>
                                    Dodavatelé a partneři
                                </h2>

                                <p className="text-center text-secondary mb-6">
                                    Spolupracujeme s prověřenými dodavateli materiálu a nářadí
                                </p>

                                {/* Kategorie dodavatelů */}
                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-faucet mr-2" style={{color: 'var(--color-info)'}}></i>Vodoinstalace</h3>
                                    </div>
                                    <div className="card-body">
                                        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'}}>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
                                                <div>
                                                    <p style={{fontWeight: 'var(--font-semibold)'}}>SIKO koupelny</p>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Baterie, sprchy, WC</p>
                                                </div>
                                                <span className="badge badge-primary">Partner</span>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
                                                <div>
                                                    <p style={{fontWeight: 'var(--font-semibold)'}}>Ptáček velkoobchod</p>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Trubky, fitinky, čerpadla</p>
                                                </div>
                                                <span className="badge badge-success">Ověřený</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-bolt mr-2" style={{color: 'var(--color-warning)'}}></i>Elektroinstalace</h3>
                                    </div>
                                    <div className="card-body">
                                        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'}}>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
                                                <div>
                                                    <p style={{fontWeight: 'var(--font-semibold)'}}>ELKOV elektro</p>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Kabely, zásuvky, jističe</p>
                                                </div>
                                                <span className="badge badge-primary">Partner</span>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
                                                <div>
                                                    <p style={{fontWeight: 'var(--font-semibold)'}}>K+B Expert</p>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Elektro spotřebiče</p>
                                                </div>
                                                <span className="badge badge-success">Ověřený</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-tools mr-2" style={{color: 'var(--color-success)'}}></i>Nářadí a stavební materiál</h3>
                                    </div>
                                    <div className="card-body">
                                        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'}}>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
                                                <div>
                                                    <p style={{fontWeight: 'var(--font-semibold)'}}>Hornbach</p>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Kompletní sortiment</p>
                                                </div>
                                                <span className="badge badge-primary">Partner</span>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
                                                <div>
                                                    <p style={{fontWeight: 'var(--font-semibold)'}}>OBI</p>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>DIY materiál a nářadí</p>
                                                </div>
                                                <span className="badge badge-success">Ověřený</span>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
                                                <div>
                                                    <p style={{fontWeight: 'var(--font-semibold)'}}>Bauhaus</p>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Stavební centrum</p>
                                                </div>
                                                <span className="badge badge-success">Ověřený</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-6">
                                    <div className="card-header">
                                        <h3 className="card-title"><i className="fas fa-fire mr-2" style={{color: 'var(--color-danger)'}}></i>Topení a klimatizace</h3>
                                    </div>
                                    <div className="card-body">
                                        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'}}>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
                                                <div>
                                                    <p style={{fontWeight: 'var(--font-semibold)'}}>Thermona</p>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Kotle, zásobníky</p>
                                                </div>
                                                <span className="badge badge-primary">Partner</span>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
                                                <div>
                                                    <p style={{fontWeight: 'var(--font-semibold)'}}>Vaillant</p>
                                                    <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)'}}>Tepelná čerpadla, kotle</p>
                                                </div>
                                                <span className="badge badge-success">Ověřený</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Chci být dodavatelem */}
                                <div className="card mb-6" style={{borderColor: 'var(--color-primary)', borderWidth: '2px'}}>
                                    <div className="card-body text-center" style={{padding: 'var(--space-6)'}}>
                                        <div style={{fontSize: '2.5rem', marginBottom: 'var(--space-3)'}}>🤝</div>
                                        <h3 style={{fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)'}}>Chcete být náš partner?</h3>
                                        <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)'}}>
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
                            <div className="app-container" style={{paddingTop: 'var(--space-4)'}}>
                                {/* Desktop: AI Learning + Guides vedle sebe */}
                                <div className="offline-desktop-layout">
                                    {/* AI Learning Stats - levý sloupec na desktopu */}
                                    <div>
                                        {analyzerStats && (
                                            <div className="card mb-4">
                                                <div className="card-body" style={{padding: 'var(--space-4)'}}>
                                                    <h3 style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-base)'}}>
                                                        <i className="fas fa-brain" style={{color: 'var(--color-primary)'}}></i>
                                                        AI Učení
                                                    </h3>
                                                    {/* Desktop: 6 sloupců, mobil: 3 */}
                                                    <div className="analyze-stats-grid">
                                                        <div style={{textAlign: 'center', padding: 'var(--space-2)', background: 'var(--color-success-light)', borderRadius: 'var(--radius-md)'}}>
                                                            <div style={{fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--color-success)'}}>
                                                                {analyzerStats.cacheHits || 0}
                                                            </div>
                                                            <div style={{fontSize: '10px', color: 'var(--color-text-secondary)'}}>Cache</div>
                                                        </div>
                                                        <div style={{textAlign: 'center', padding: 'var(--space-2)', background: 'var(--color-info-light)', borderRadius: 'var(--radius-md)'}}>
                                                            <div style={{fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--color-info)'}}>
                                                                {analyzerStats.localClassifications || 0}
                                                            </div>
                                                            <div style={{fontSize: '10px', color: 'var(--color-text-secondary)'}}>Lokální</div>
                                                        </div>
                                                        <div style={{textAlign: 'center', padding: 'var(--space-2)', background: 'rgba(168, 85, 247, 0.1)', borderRadius: 'var(--radius-md)'}}>
                                                            <div style={{fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: '#a855f7'}}>
                                                                {analyzerStats.apiCalls || 0}
                                                            </div>
                                                            <div style={{fontSize: '10px', color: 'var(--color-text-secondary)'}}>Cloud</div>
                                                        </div>
                                                        <div style={{textAlign: 'center', padding: 'var(--space-2)', background: 'rgba(251, 146, 60, 0.1)', borderRadius: 'var(--radius-md)'}}>
                                                            <div style={{fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: '#fb923c'}}>
                                                                {analyzerStats.feedbackUsed || 0}
                                                            </div>
                                                            <div style={{fontSize: '10px', color: 'var(--color-text-secondary)'}}>Opravy</div>
                                                        </div>
                                                        <div style={{textAlign: 'center', padding: 'var(--space-2)', background: 'rgba(244, 114, 182, 0.1)', borderRadius: 'var(--radius-md)'}}>
                                                            <div style={{fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: '#f472b6'}}>
                                                                {analyzerStats.feedbackSubmitted || 0}
                                                            </div>
                                                            <div style={{fontSize: '10px', color: 'var(--color-text-secondary)'}}>Odesláno</div>
                                                        </div>
                                                        <div style={{textAlign: 'center', padding: 'var(--space-2)', background: 'rgba(34, 211, 238, 0.1)', borderRadius: 'var(--radius-md)'}}>
                                                            <div style={{fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: '#22d3ee'}}>
                                                                {analyzerStats.feedback?.totalFeedbacks || 0}
                                                            </div>
                                                            <div style={{fontSize: '10px', color: 'var(--color-text-secondary)'}}>Feedback</div>
                                                        </div>
                                                    </div>
                                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-2)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)'}}>
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
                                    </div>

                                    {/* Offline guides - pravý sloupec na desktopu */}
                                    <div>
                                        <h2 className="section-title section-title-compact" style={{marginBottom: 'var(--space-3)'}}>
                                            <i className="fas fa-cloud-download-alt section-title-icon"></i>
                                            Offline návody
                                        </h2>

                                        {savedGuides.length === 0 ? (
                                            <div className="card">
                                                <div className="card-body text-center" style={{padding: 'var(--space-6)'}}>
                                                    <div style={{fontSize: '3rem', marginBottom: 'var(--space-3)', opacity: 0.3}}>
                                                        <i className="fas fa-cloud-download-alt"></i>
                                                    </div>
                                                    <h3 style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-base)'}}>
                                                        Žádné uložené návody
                                                    </h3>
                                                    <p style={{color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)'}}>
                                                        Při prohlížení návodu klikni na "Uložit offline".
                                                    </p>
                                                    <button onClick={() => navigateTo('knowledge')} className="btn btn-primary" style={{padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)'}}>
                                                        <i className="fas fa-book mr-2"></i>
                                                        Procházet databázi
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="alert alert-success alert-compact mb-4">
                                                    <p style={{margin: 0, fontSize: 'var(--text-sm)'}}>
                                                        <i className="fas fa-wifi-slash mr-2"></i>
                                                        <strong>Offline!</strong> Návody uložené v zařízení.
                                                    </p>
                                                </div>

                                                <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-3)'}}>
                                            {savedGuides.map(guide => (
                                                <div key={guide.id} className="card">
                                                    <div className="card-body">
                                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)'}}>
                                                            <div style={{flex: 1}}>
                                                                <h3 style={{fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)'}}>
                                                                    {guide.name}
                                                                </h3>
                                                                <p style={{fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)'}}>
                                                                    {guide.description}
                                                                </p>

                                                                <div style={{display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-3)'}}>
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

                                                                <p style={{fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)'}}>
                                                                    <i className="fas fa-save mr-1"></i>
                                                                    Uloženo: {new Date(guide.savedAt).toLocaleDateString('cs-CZ')}
                                                                </p>
                                                            </div>

                                                            <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-2)'}}>
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
                                                                    className="btn btn-secondary btn-sm"
                                                                    style={{opacity: 0.7}}
                                                                >
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{marginTop: 'var(--space-4)', textAlign: 'center'}}>
                                            <button onClick={() => navigateTo('knowledge')} className="btn btn-secondary" style={{padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)'}}>
                                                <i className="fas fa-plus mr-2"></i>
                                                Přidat další návody
                                            </button>
                                        </div>
                                    </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>

                    {/* Footer */}
                    <footer className="footer">
                        <div className="container">
                            <div className="footer-grid">
                                <div>
                                    <h3 className="footer-title">{t('appName')}</h3>
                                    <p className="footer-text">
                                        {t('footerSlogan')}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="footer-title">{t('footerFeatures')}</h3>
                                    <ul className="footer-links">
                                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}>• {t('footerAI')}</a></li>
                                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('knowledge'); }}>• {t('footer500guides')}</a></li>
                                        <li><a href="#" onClick={(e) => { e.preventDefault(); alert(t('safetyDisclaimer')); }}>• {t('footerSafety')}</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="footer-title">{t('footerContact')}</h3>
                                    <p className="footer-text">
                                        support@fixo.app<br/>
                                        "{t('footerQuote')}"
                                    </p>
                                </div>
                            </div>
                            <div className="footer-bottom">
                                {t('footerCopyright')}
                            </div>
                        </div>
                    </footer>
                </div>
            );
        }

        // Render aplikace
        ReactDOM.render(<FixoApp />, document.getElementById('root'));
