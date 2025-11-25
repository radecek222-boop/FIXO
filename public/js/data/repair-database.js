/**
 * FIXO - Databáze závad a oprav
 */

const FIXO_REPAIR_DATABASE = {
    'kohoutek': {
        name: 'Kohoutek',
        category: 'voda',
        icon: '🚰',
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
                    {
                        step: 1,
                        action: 'Zavřete hlavní přívod vody',
                        time: '1 min',
                        icon: '🚰',
                        hint: 'Hlavní uzávěr najdete obvykle ve sklepě, pod dřezem nebo vedle vodoměru. Otáčejte ve směru hodinových ručiček.',
                        checkQuestion: {
                            question: 'Je voda skutečně zavřená?',
                            options: ['Ano, zkontroloval/a jsem', 'Ne, nejde zavřít'],
                            correctAnswer: 0,
                            failMessage: 'Zkuste najít jiný uzávěr nebo zavolejte instalatéra.'
                        }
                    },
                    {
                        step: 2,
                        action: 'Odšroubujte hlavici kohoutku',
                        time: '2 min',
                        icon: '🔧',
                        hint: 'Nejprve sejměte dekorativní krytku (páčením nebo odšroubováním). Pod ní najdete šroub, který drží páku.',
                        checkQuestion: null
                    },
                    {
                        step: 3,
                        action: 'Vyměňte těsnění nebo O-kroužek',
                        time: '5 min',
                        icon: '⚙️',
                        hint: 'O-kroužek je gumový kroužek uvnitř. Vezměte starý s sebou do obchodu, abyste koupili správnou velikost.',
                        checkQuestion: {
                            question: 'Máte nové těsnění připravené?',
                            options: ['Ano, mám správnou velikost', 'Ne, potřebuji koupit'],
                            correctAnswer: 0,
                            failMessage: 'Vezměte staré těsnění do železářství a kupte stejnou velikost.'
                        }
                    },
                    {
                        step: 4,
                        action: 'Sestavte kohoutek zpět',
                        time: '3 min',
                        icon: '🔩',
                        hint: 'Postupujte v opačném pořadí než při rozebírání. Neutahujte příliš silně, abyste nepoškodili plastové části.',
                        checkQuestion: null
                    },
                    {
                        step: 5,
                        action: 'Pusťte vodu a zkontrolujte těsnost',
                        time: '2 min',
                        icon: '✅',
                        hint: 'Otevřete hlavní přívod pomalu. Zkontrolujte, zda nikde neprosakuje voda - i pod kohoutkem.',
                        checkQuestion: {
                            question: 'Teče kohoutek správně bez kapání?',
                            options: ['Ano, oprava je úspěšná!', 'Ne, stále kape'],
                            correctAnswer: 0,
                            failMessage: 'Zkuste znovu rozebrat a zkontrolovat, zda je těsnění správně usazené.'
                        }
                    }
                ],
                safetyWarnings: ['Vždy nejdříve zavřete hlavní přívod vody', 'Mějte připravený kbelík']
            }
        ]
    },
    'wc': {
        name: 'Toaleta',
        category: 'voda',
        icon: '🚽',
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
                    {
                        step: 1,
                        action: 'Zavřete přívod vody k WC',
                        time: '1 min',
                        icon: '🚰',
                        hint: 'Uzávěr je obvykle vlevo dole od WC. Otočte ve směru hodinových ručiček až na doraz.',
                        checkQuestion: {
                            question: 'Je přívod vody uzavřen?',
                            options: ['Ano, voda je zavřená', 'Ne, nenašel/la jsem uzávěr'],
                            correctAnswer: 0,
                            failMessage: 'Uzávěr bývá na stěně za WC nebo pod umyvadlem. Případně zavřete hlavní přívod.'
                        }
                    },
                    {
                        step: 2,
                        action: 'Vyprázdněte nádržku splachováním',
                        time: '1 min',
                        icon: '🚽',
                        hint: 'Stiskněte splachovací tlačítko a podržte, dokud nevyteče maximum vody.',
                        checkQuestion: null
                    },
                    {
                        step: 3,
                        action: 'Zkontrolujte plovák a ventil',
                        time: '5 min',
                        icon: '🔍',
                        hint: 'Sejměte víko nádržky. Plovák je kulatý nebo válcovitý díl, který plave na vodě. Ventil je dole uprostřed.',
                        checkQuestion: {
                            question: 'Vidíte problém?',
                            options: ['Ano, plovák je poškozený', 'Ano, ventil netěsní', 'Není mi jasné, co je špatně'],
                            correctAnswer: null,
                            failMessage: 'Zkuste sledovat, odkud voda uniká při napouštění.'
                        }
                    },
                    {
                        step: 4,
                        action: 'Vyměňte vadné díly',
                        time: '10 min',
                        icon: '🔧',
                        hint: 'Plovák se obvykle odšroubuje nebo zaklapne. Ventilové těsnění vytáhněte a nahraďte novým stejné velikosti.',
                        checkQuestion: null
                    },
                    {
                        step: 5,
                        action: 'Pusťte vodu a otestujte',
                        time: '3 min',
                        icon: '✅',
                        hint: 'Otevřete přívod a počkejte na naplnění. Pak sledujte 2 minuty, zda voda neprotéká do mísy.',
                        checkQuestion: {
                            question: 'Přestalo WC protékat?',
                            options: ['Ano, je to v pořádku!', 'Ne, stále protéká'],
                            correctAnswer: 0,
                            failMessage: 'Zkontrolujte, zda je těsnění správně usazené. Pokud problém přetrvává, může být prasklá nádržka.'
                        }
                    }
                ],
                safetyWarnings: ['Použijte gumové rukavice', 'Dbejte na hygienu']
            }
        ]
    },
    'zasuvka': {
        name: 'Elektrická zásuvka',
        category: 'elektrina',
        icon: '🔌',
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
                    {
                        step: 1,
                        action: '⚠️ VYPNĚTE JISTIČ!',
                        time: '1 min',
                        icon: '⚡',
                        hint: 'Jistič najdete v rozvodné skříni. Vypněte ten, který ovládá danou místnost. Pokud si nejste jisti, vypněte hlavní jistič.',
                        checkQuestion: {
                            question: 'Je jistič vypnutý?',
                            options: ['Ano, jistič je vypnutý', 'Nevím, kde je jistič'],
                            correctAnswer: 0,
                            failMessage: 'NEPOKRAČUJTE! Bez vypnutého jističe riskujete úraz elektrickým proudem. Zavolejte elektrikáře.'
                        }
                    },
                    {
                        step: 2,
                        action: 'Ověřte testerem, že není napětí',
                        time: '2 min',
                        icon: '🔌',
                        hint: 'Zasuňte tester do zásuvky. Pokud nesvítí, je obvod vypnutý. Vyzkoušejte obě zdířky!',
                        checkQuestion: {
                            question: 'Ukazuje tester nulové napětí?',
                            options: ['Ano, není napětí', 'Ne, stále je napětí', 'Nemám tester'],
                            correctAnswer: 0,
                            failMessage: 'STOP! Pokud je napětí, vypněte jiný jistič. Bez testeru NEPOKRAČUJTE - zavolejte elektrikáře.'
                        }
                    },
                    {
                        step: 3,
                        action: 'Demontujte kryt zásuvky',
                        time: '2 min',
                        icon: '🔧',
                        hint: 'Odšroubujte středový šroub a opatrně sejměte kryt. Pod ním uvidíte montážní rámeček.',
                        checkQuestion: null
                    },
                    {
                        step: 4,
                        action: 'Zkontrolujte zapojení vodičů',
                        time: '5 min',
                        icon: '🔍',
                        hint: 'Hledejte uvolněné, spálené nebo přerušené vodiče. Modrý = nulový, hnědý/černý = fázový, zelenožlutý = zemnící.',
                        checkQuestion: {
                            question: 'Našli jste problém?',
                            options: ['Ano, vidím uvolněný vodič', 'Ano, zásuvka je poškozená', 'Ne, vše vypadá v pořádku'],
                            correctAnswer: null,
                            failMessage: 'Pokud problém není viditelný, může být v instalaci ve zdi. Doporučujeme zavolat elektrikáře.'
                        }
                    },
                    {
                        step: 5,
                        action: 'Vyměňte zásuvku nebo opravte spoje',
                        time: '15 min',
                        icon: '⚙️',
                        hint: 'Uvolněné vodiče dotáhněte. Při výměně zásuvky si vyfotografujte původní zapojení!',
                        checkQuestion: {
                            question: 'Je oprava dokončena a zásuvka funguje?',
                            options: ['Ano, vše funguje', 'Ne, stále nefunguje'],
                            correctAnswer: 0,
                            failMessage: 'Problém může být hlubší v instalaci. Doporučujeme přivolat elektrikáře.'
                        }
                    }
                ],
                safetyWarnings: ['⚠️ POZOR! Práce s elektřinou!', 'Pokud si nejste jisti, volejte elektrikáře!', 'Vždy vypněte jistič před prací']
            }
        ]
    },
    'svetlo': {
        name: 'Osvětlení',
        category: 'elektrina',
        icon: '💡',
        issues: [
            {
                id: 'flickering',
                name: 'Blikající světlo',
                description: 'Špatný kontakt nebo vadná žárovka',
                riskScore: 5,
                difficulty: 'Střední',
                timeEstimate: '15 min',
                tools: ['Nová žárovka', 'Šroubovák', 'Tester'],
                steps: [
                    {
                        step: 1,
                        action: 'Vypněte vypínač a jistič',
                        time: '1 min',
                        icon: '⚡',
                        hint: 'Nejprve vypněte vypínač na zdi, pak pro jistotu i jistič v rozvaděči.',
                        checkQuestion: {
                            question: 'Je elektřina vypnutá?',
                            options: ['Ano, vypínač i jistič jsou vypnuté', 'Vypnul/a jsem jen vypínač'],
                            correctAnswer: 0,
                            failMessage: 'Pro bezpečnost doporučujeme vypnout i jistič, zvláště při práci s vypínačem.'
                        }
                    },
                    {
                        step: 2,
                        action: 'Vyměňte žárovku za novou',
                        time: '2 min',
                        icon: '💡',
                        hint: 'Počkejte, až žárovka vychladne. Otočte proti směru hodinových ručiček a vyjměte.',
                        checkQuestion: null
                    },
                    {
                        step: 3,
                        action: 'Pokud bliká dál, zkontrolujte vypínač',
                        time: '5 min',
                        icon: '🔍',
                        hint: 'Demontujte kryt vypínače a zkontrolujte, zda jsou vodiče pevně připojené.',
                        checkQuestion: {
                            question: 'Pomohla výměna žárovky?',
                            options: ['Ano, světlo už nebliká', 'Ne, stále bliká'],
                            correctAnswer: 0,
                            failMessage: 'Pokračujte kontrolou vypínače a kontaktů.'
                        }
                    },
                    {
                        step: 4,
                        action: 'Utáhněte uvolněné kontakty',
                        time: '5 min',
                        icon: '🔧',
                        hint: 'Pokud jsou vodiče uvolněné, dotáhněte svorky šroubovákem. Dbejte na správné připojení.',
                        checkQuestion: null
                    },
                    {
                        step: 5,
                        action: 'Zapněte a otestujte',
                        time: '1 min',
                        icon: '✅',
                        hint: 'Zapněte jistič, pak vypínač. Sledujte světlo alespoň minutu.',
                        checkQuestion: {
                            question: 'Svítí světlo stabilně?',
                            options: ['Ano, vše je v pořádku', 'Ne, stále bliká'],
                            correctAnswer: 0,
                            failMessage: 'Problém může být ve svítidle samotném nebo v instalaci. Doporučujeme elektrikáře.'
                        }
                    }
                ],
                safetyWarnings: ['Vždy vypněte proud před prací', 'Nechte žárovku vychladnout']
            }
        ]
    },
    'radiator': {
        name: 'Radiátor',
        category: 'topeni',
        icon: '🌡️',
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
                    {
                        step: 1,
                        action: 'Vypněte topení a nechte vychladnout',
                        time: '15 min',
                        icon: '🌡️',
                        hint: 'Nastavte termostat na minimum nebo vypněte kotel. Počkejte, až radiátor vychladne na dotyk.',
                        checkQuestion: null
                    },
                    {
                        step: 2,
                        action: 'Najděte odvzdušňovací ventil',
                        time: '1 min',
                        icon: '🔍',
                        hint: 'Ventil je malý čtvercový nebo šestihranný šroubek v horním rohu radiátoru (obvykle naproti termostatické hlavici).',
                        checkQuestion: {
                            question: 'Našli jste odvzdušňovací ventil?',
                            options: ['Ano, mám ho', 'Ne, nemohu najít'],
                            correctAnswer: 0,
                            failMessage: 'Zkuste prohlédnout oba horní rohy radiátoru. Některé starší radiátory mají ventil uprostřed nahoře.'
                        }
                    },
                    {
                        step: 3,
                        action: 'Pod ventil umístěte nádobu',
                        time: '30 s',
                        icon: '🪣',
                        hint: 'Miska nebo hrnek zachytí vodu, která vyteče. Mějte po ruce i hadřík pro případ stříknutí.',
                        checkQuestion: null
                    },
                    {
                        step: 4,
                        action: 'Pomalu otevřete ventil klíčem',
                        time: '2 min',
                        icon: '🔧',
                        hint: 'Otáčejte proti směru hodinových ručiček (max půl otáčky). Uslyšíte syčení - to je vzduch.',
                        checkQuestion: {
                            question: 'Slyšíte unikající vzduch?',
                            options: ['Ano, syčí vzduch', 'Ne, hned teče voda', 'Nic se neděje'],
                            correctAnswer: null,
                            failMessage: 'Pokud hned teče voda, radiátor neobsahuje vzduch. Pokud se nic neděje, zkuste otevřít víc.'
                        }
                    },
                    {
                        step: 5,
                        action: 'Až poteče voda, ventil zavřete',
                        time: '2 min',
                        icon: '✅',
                        hint: 'Jakmile přestane syčet a začne téct čistá voda (bez bublinek), zavřete ventil ve směru hodinových ručiček.',
                        checkQuestion: {
                            question: 'Podařilo se odvzdušnit radiátor?',
                            options: ['Ano, ventil je zavřený', 'Ne, pořád uniká vzduch'],
                            correctAnswer: 0,
                            failMessage: 'Pokud stále uniká vzduch, může být problém v celém topném systému. Zkontrolujte tlak v kotli.'
                        }
                    }
                ],
                safetyWarnings: ['Pozor na horkou vodu', 'Mějte připravený hadřík']
            }
        ]
    },
    'dvere': {
        name: 'Dveře',
        category: 'dvere_okna',
        icon: '🚪',
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
                    {
                        step: 1,
                        action: 'Otevřete dveře do poloviny',
                        time: '10 s',
                        icon: '🚪',
                        hint: 'Dveře by měly být stabilní a nepohybovat se samy od sebe.',
                        checkQuestion: null
                    },
                    {
                        step: 2,
                        action: 'Nastříkejte mazivo na panty',
                        time: '1 min',
                        icon: '🔧',
                        hint: 'Nastříkejte WD-40 nebo kapněte olej přímo na čepy pantů - místa, kde se otáčejí.',
                        checkQuestion: null
                    },
                    {
                        step: 3,
                        action: 'Pohybujte dveřmi tam a zpět',
                        time: '1 min',
                        icon: '↔️',
                        hint: 'Pomalu otevírejte a zavírejte dveře, aby se mazivo dostalo do všech částí pantu.',
                        checkQuestion: {
                            question: 'Přestaly dveře vrzat?',
                            options: ['Ano, jsou tiché', 'Ne, stále vrzají'],
                            correctAnswer: 0,
                            failMessage: 'Zkuste přidat více maziva nebo zkontrolovat, zda panty nejsou ohnuté či poškozené.'
                        }
                    },
                    {
                        step: 4,
                        action: 'Setřete přebytečné mazivo',
                        time: '1 min',
                        icon: '🧹',
                        hint: 'Hadříkem otřete mazivo, které vyteklo, aby nezanechalo skvrny.',
                        checkQuestion: null
                    }
                ],
                safetyWarnings: ['Větrejte při použití sprejů']
            }
        ]
    },
    'okno': {
        name: 'Okno',
        category: 'dvere_okna',
        icon: '🪟',
        issues: [
            {
                id: 'drafty',
                name: 'Táhne z okna',
                description: 'Opotřebované těsnění',
                riskScore: 1,
                difficulty: 'Nízká',
                timeEstimate: '20 min',
                tools: ['Nové těsnění', 'Nůž', 'Čistič'],
                steps: [
                    { step: 1, action: 'Odstraňte staré těsnění', time: '5 min', icon: '🔧' },
                    { step: 2, action: 'Očistěte drážku od nečistot', time: '3 min', icon: '🧹' },
                    { step: 3, action: 'Naměřte a ustřihněte nové těsnění', time: '2 min', icon: '📏' },
                    { step: 4, action: 'Zatlačte těsnění do drážky', time: '8 min', icon: '👆' },
                    { step: 5, action: 'Zkontrolujte těsnost zavřením okna', time: '1 min', icon: '✅' }
                ],
                safetyWarnings: ['Opatrně s ostrým nožem']
            }
        ]
    },
    'zidle': {
        name: 'Židle',
        category: 'nabytek',
        icon: '🪑',
        issues: [
            {
                id: 'wobbly',
                name: 'Viklající se židle',
                description: 'Uvolněné šrouby nebo poškozené nohy',
                riskScore: 1,
                difficulty: 'Nízká',
                timeEstimate: '10 min',
                tools: ['Šroubovák', 'Klíč', 'Lepidlo na dřevo'],
                steps: [
                    { step: 1, action: 'Otočte židli nohama nahoru', time: '30 s', icon: '🪑' },
                    { step: 2, action: 'Zkontrolujte všechny šrouby', time: '2 min', icon: '🔍' },
                    { step: 3, action: 'Dotáhněte uvolněné šrouby', time: '5 min', icon: '🔧' },
                    { step: 4, action: 'Pokud je spoj rozklížený, použijte lepidlo', time: '2 min', icon: '🧴' },
                    { step: 5, action: 'Nechte zaschnout a otestujte', time: '1 min', icon: '✅' }
                ],
                safetyWarnings: ['Netestujte židli, dokud lepidlo nezaschne']
            }
        ]
    },
    'pracka': {
        name: 'Pračka',
        category: 'spotrebice',
        icon: '🧺',
        issues: [
            {
                id: 'not-draining',
                name: 'Pračka nevypouští vodu',
                description: 'Ucpaný filtr nebo hadice',
                riskScore: 3,
                difficulty: 'Střední',
                timeEstimate: '25 min',
                tools: ['Hadřík', 'Nádoba', 'Kartáč'],
                steps: [
                    { step: 1, action: 'Vypněte pračku a odpojte ze zásuvky', time: '1 min', icon: '🔌' },
                    { step: 2, action: 'Najděte servisní dvířka (dole vpředu)', time: '1 min', icon: '🔍' },
                    { step: 3, action: 'Podložte nádobu a pomalu otevřete filtr', time: '3 min', icon: '🪣' },
                    { step: 4, action: 'Vyčistěte filtr od nečistot', time: '10 min', icon: '🧹' },
                    { step: 5, action: 'Vraťte filtr zpět a otestujte', time: '5 min', icon: '✅' }
                ],
                safetyWarnings: ['Pozor na vytékající vodu', 'Vždy odpojte ze zásuvky']
            }
        ]
    },
    'sporak': {
        name: 'Sporák',
        category: 'kuchyn',
        icon: '🍳',
        issues: [
            {
                id: 'burner-not-lighting',
                name: 'Hořák nezapaluje',
                description: 'Ucpaná tryska nebo vadný zapalovač',
                riskScore: 5,
                difficulty: 'Střední',
                timeEstimate: '15 min',
                tools: ['Jehla nebo špendlík', 'Hadřík', 'Kartáček'],
                steps: [
                    { step: 1, action: 'Zavřete přívod plynu', time: '1 min', icon: '⛽' },
                    { step: 2, action: 'Sejměte mřížku a rozdělovač plamene', time: '1 min', icon: '🔧' },
                    { step: 3, action: 'Vyčistěte trysku jehlou', time: '5 min', icon: '📍' },
                    { step: 4, action: 'Očistěte zapalovač kartáčkem', time: '3 min', icon: '🧹' },
                    { step: 5, action: 'Složte vše zpět a otestujte', time: '2 min', icon: '✅' }
                ],
                safetyWarnings: ['Vždy zavřete plyn před čištěním', 'Větrejte při práci s plynem']
            }
        ]
    },
    'sprcha': {
        name: 'Sprchová hlavice',
        category: 'koupelna',
        icon: '🚿',
        issues: [
            {
                id: 'low-pressure',
                name: 'Slabý proud vody',
                description: 'Zanesená sprchová hlavice vodním kamenem',
                riskScore: 1,
                difficulty: 'Nízká',
                timeEstimate: '30 min',
                tools: ['Ocet', 'Igelitový sáček', 'Gumička', 'Kartáček'],
                steps: [
                    { step: 1, action: 'Naplňte sáček octem', time: '1 min', icon: '🧴' },
                    { step: 2, action: 'Navlékněte sáček na hlavici a upevněte gumičkou', time: '2 min', icon: '🎒' },
                    { step: 3, action: 'Nechte působit 2-4 hodiny', time: '2-4 hod', icon: '⏰' },
                    { step: 4, action: 'Sundejte sáček a dočistěte kartáčkem', time: '5 min', icon: '🧹' },
                    { step: 5, action: 'Propláchněte vodou', time: '2 min', icon: '✅' }
                ],
                safetyWarnings: ['Ocet může dráždit oči - buďte opatrní']
            }
        ]
    },
    'stena': {
        name: 'Stěna',
        category: 'steny_podlahy',
        icon: '🏠',
        issues: [
            {
                id: 'hole',
                name: 'Díra ve stěně',
                description: 'Malá díra po hmoždince nebo hřebíku',
                riskScore: 1,
                difficulty: 'Nízká',
                timeEstimate: '15 min',
                tools: ['Tmel', 'Špachtle', 'Brusný papír', 'Barva'],
                steps: [
                    { step: 1, action: 'Očistěte díru od prachu', time: '1 min', icon: '🧹' },
                    { step: 2, action: 'Naneste tmel do díry špachtlí', time: '3 min', icon: '🔧' },
                    { step: 3, action: 'Uhlaďte povrch a nechte zaschnout', time: '30 min', icon: '⏰' },
                    { step: 4, action: 'Přebruste jemným papírem', time: '2 min', icon: '📄' },
                    { step: 5, action: 'Přetřete barvou', time: '5 min', icon: '🎨' }
                ],
                safetyWarnings: ['Větrejte při práci s tmelem a barvou']
            }
        ]
    },
    'hadice': {
        name: 'Zahradní hadice',
        category: 'zahrada',
        icon: '🌱',
        issues: [
            {
                id: 'leaking',
                name: 'Děravá hadice',
                description: 'Malá díra nebo prasklina v hadici',
                riskScore: 1,
                difficulty: 'Nízká',
                timeEstimate: '10 min',
                tools: ['Opravná páska na hadice', 'Nůžky', 'Hadřík'],
                steps: [
                    { step: 1, action: 'Najděte místo úniku', time: '2 min', icon: '🔍' },
                    { step: 2, action: 'Osušte a očistěte oblast kolem díry', time: '2 min', icon: '🧹' },
                    { step: 3, action: 'Odstřihněte kus opravné pásky', time: '1 min', icon: '✂️' },
                    { step: 4, action: 'Přilepte pásku přes díru s přesahem', time: '3 min', icon: '🩹' },
                    { step: 5, action: 'Pusťte vodu a zkontrolujte opravu', time: '2 min', icon: '✅' }
                ],
                safetyWarnings: ['Ujistěte se, že je hadice suchá před lepením']
            }
        ]
    },
    'sifon': {
        name: 'Sifon/Odpad',
        category: 'koupelna',
        icon: '🔄',
        issues: [
            {
                id: 'clogged',
                name: 'Ucpaný odpad',
                description: 'Pomalý odtok vody z umyvadla nebo vany',
                riskScore: 2,
                difficulty: 'Nízká',
                timeEstimate: '20 min',
                tools: ['Zvon (pumpa)', 'Gumové rukavice', 'Kbelík', 'Čistič odpadů'],
                steps: [
                    {
                        step: 1,
                        action: 'Zkuste nejdřív zvon (pumpu)',
                        time: '3 min',
                        icon: '🪠',
                        hint: 'Naplňte umyvadlo vodou asi 5 cm. Přitiskněte zvon k odpadu a rychle pumpujte nahoru-dolů.',
                        checkQuestion: {
                            question: 'Odtéká voda lépe?',
                            options: ['Ano, je to v pořádku', 'Ne, stále je ucpaný'],
                            correctAnswer: 0,
                            failMessage: 'Pokračujte dalším krokem - rozebráním sifonu.'
                        }
                    },
                    {
                        step: 2,
                        action: 'Položte kbelík pod sifon',
                        time: '1 min',
                        icon: '🪣',
                        hint: 'Sifon je ta zahnutá trubka pod umyvadlem. V kbelíku zachytíte vodu a nečistoty.',
                        checkQuestion: null
                    },
                    {
                        step: 3,
                        action: 'Odšroubujte sifon',
                        time: '3 min',
                        icon: '🔧',
                        hint: 'Většina sifonů má plastové matice, které povolíte rukou. Otáčejte proti směru hodinových ručiček.',
                        checkQuestion: null
                    },
                    {
                        step: 4,
                        action: 'Vyčistěte sifon od nečistot',
                        time: '10 min',
                        icon: '🧹',
                        hint: 'Odstraňte vlasy, mýdlo a další usazeniny. Propláchněte sifon horkou vodou.',
                        checkQuestion: {
                            question: 'Je sifon čistý?',
                            options: ['Ano, je vyčištěný', 'Ucpávka je hlouběji v trubce'],
                            correctAnswer: 0,
                            failMessage: 'Zkuste použít chemický čistič odpadů nebo zavolejte instalatéra.'
                        }
                    },
                    {
                        step: 5,
                        action: 'Sifon vraťte zpět a otestujte',
                        time: '3 min',
                        icon: '✅',
                        hint: 'Utáhněte matice rukou. Pusťte vodu a zkontrolujte, zda nikde neprosakuje.',
                        checkQuestion: {
                            question: 'Odtéká voda správně a sifon netěsní?',
                            options: ['Ano, vše funguje', 'Ne, někde kape'],
                            correctAnswer: 0,
                            failMessage: 'Zkontrolujte, zda jsou těsnění správně usazena a matice dotaženy.'
                        }
                    }
                ],
                safetyWarnings: ['Použijte gumové rukavice', 'Větrejte při použití chemických čističů']
            }
        ]
    },
    'mycka': {
        name: 'Myčka nádobí',
        category: 'spotrebice',
        icon: '🍽️',
        issues: [
            {
                id: 'not-cleaning',
                name: 'Myčka špatně myje',
                description: 'Nádobí zůstává špinavé nebo mastné',
                riskScore: 2,
                difficulty: 'Nízká',
                timeEstimate: '25 min',
                tools: ['Hadřík', 'Ocet', 'Kartáček na zuby', 'Párátko'],
                steps: [
                    {
                        step: 1,
                        action: 'Vyčistěte filtr myčky',
                        time: '5 min',
                        icon: '🔍',
                        hint: 'Filtr je na dně myčky. Vytáhněte ho, rozeberte a propláchněte pod tekoucí vodou.',
                        checkQuestion: {
                            question: 'Byl filtr zanesený?',
                            options: ['Ano, byl hodně špinavý', 'Ne, vypadal čistě'],
                            correctAnswer: null,
                            failMessage: 'I tak pokračujte dalšími kroky pro kompletní údržbu.'
                        }
                    },
                    {
                        step: 2,
                        action: 'Zkontrolujte a vyčistěte ostřikovací ramena',
                        time: '8 min',
                        icon: '💫',
                        hint: 'Ramena mají dírky, které se ucpávají. Vyčistěte je párátkem nebo jehlou. Ramena většinou jdou vyjmout.',
                        checkQuestion: null
                    },
                    {
                        step: 3,
                        action: 'Otřete těsnění dveří',
                        time: '3 min',
                        icon: '🧽',
                        hint: 'Na těsnění se hromadí mastnota a plíseň. Otřete ho hadříkem s octem.',
                        checkQuestion: null
                    },
                    {
                        step: 4,
                        action: 'Spusťte prázdný cyklus s octem',
                        time: '5 min',
                        icon: '🧴',
                        hint: 'Dejte hrnek octa na horní koš a spusťte nejkratší program na nejvyšší teplotě.',
                        checkQuestion: null
                    },
                    {
                        step: 5,
                        action: 'Zkontrolujte dávkování leštidla a soli',
                        time: '3 min',
                        icon: '✅',
                        hint: 'Doplňte speciální sůl a leštidlo, pokud jsou zásobníky prázdné.',
                        checkQuestion: {
                            question: 'Jsou zásobníky doplněny?',
                            options: ['Ano, vše doplněno', 'Nemám sůl/leštidlo'],
                            correctAnswer: 0,
                            failMessage: 'Sůl a leštidlo jsou důležité pro kvalitu mytí. Dokupte je.'
                        }
                    }
                ],
                safetyWarnings: ['Před čištěním odpojte myčku od elektřiny', 'Pozor na ostré hrany filtru']
            }
        ]
    },
    'klika': {
        name: 'Klika dveří',
        category: 'dvere_okna',
        icon: '🚪',
        issues: [
            {
                id: 'loose',
                name: 'Uvolněná klika',
                description: 'Klika se viklá nebo propadá',
                riskScore: 1,
                difficulty: 'Nízká',
                timeEstimate: '10 min',
                tools: ['Šroubovák', 'Imbusový klíč'],
                steps: [
                    {
                        step: 1,
                        action: 'Najděte zajišťovací šroub',
                        time: '1 min',
                        icon: '🔍',
                        hint: 'Šroub je obvykle na spodní straně kliky nebo pod dekorativní krytkou na štítku.',
                        checkQuestion: {
                            question: 'Našli jste šroub?',
                            options: ['Ano, vidím ho', 'Ne, nemohu najít'],
                            correctAnswer: 0,
                            failMessage: 'Zkuste odklopit/odšroubovat dekorativní krytku na štítku kolem kliky.'
                        }
                    },
                    {
                        step: 2,
                        action: 'Dotáhněte zajišťovací šroub',
                        time: '2 min',
                        icon: '🔧',
                        hint: 'Obvykle je to malý imbusový nebo křížový šroub. Dotáhněte ho, ale nepřetahujte.',
                        checkQuestion: null
                    },
                    {
                        step: 3,
                        action: 'Zkontrolujte štítek kliky',
                        time: '2 min',
                        icon: '🔩',
                        hint: 'Pokud se viklá celý štítek, dotáhněte i šrouby, které ho drží ke dveřím.',
                        checkQuestion: null
                    },
                    {
                        step: 4,
                        action: 'Otestujte kliku',
                        time: '2 min',
                        icon: '✅',
                        hint: 'Několikrát stiskněte kliku a zkontrolujte, zda se neviklá a zda správně ovládá zámek.',
                        checkQuestion: {
                            question: 'Je klika pevná a funkční?',
                            options: ['Ano, vše je v pořádku', 'Ne, stále se viklá'],
                            correctAnswer: 0,
                            failMessage: 'Může být poškozený vnitřní mechanismus. Zvažte výměnu celé kliky.'
                        }
                    }
                ],
                safetyWarnings: ['Při práci držte dveře otevřené, abyste se nezamkli']
            }
        ]
    },
    'lednice': {
        name: 'Lednice',
        category: 'spotrebice',
        icon: '🧊',
        issues: [
            {
                id: 'seal-problem',
                name: 'Netěsnící dvířka',
                description: 'Lednice nechladí dobře kvůli úniku chladu',
                riskScore: 1,
                difficulty: 'Nízká',
                timeEstimate: '15 min',
                tools: ['Hadřík', 'Teplá voda s mycím prostředkem', 'Fén'],
                steps: [
                    {
                        step: 1,
                        action: 'Zkontrolujte těsnění papírem',
                        time: '2 min',
                        icon: '📄',
                        hint: 'Vložte list papíru mezi dvířka a zavřete. Pokud papír snadno vytáhnete, těsnění netěsní.',
                        checkQuestion: {
                            question: 'Drží papír pevně?',
                            options: ['Ano, nejde vytáhnout', 'Ne, vytáhne se snadno'],
                            correctAnswer: 0,
                            failMessage: 'Těsnění potřebuje opravu. Pokračujte dalšími kroky.'
                        }
                    },
                    {
                        step: 2,
                        action: 'Vyčistěte těsnění',
                        time: '5 min',
                        icon: '🧽',
                        hint: 'Omyjte těsnění teplou vodou s mycím prostředkem. Odstraňte všechny nečistoty ze záhybů.',
                        checkQuestion: null
                    },
                    {
                        step: 3,
                        action: 'Narovnejte deformované těsnění fénem',
                        time: '5 min',
                        icon: '💨',
                        hint: 'Zahřejte těsnění fénem na nízký stupeň a rukou ho vytvarujte do správné polohy.',
                        checkQuestion: null
                    },
                    {
                        step: 4,
                        action: 'Zkontrolujte vyrovnání dvířek',
                        time: '2 min',
                        icon: '📐',
                        hint: 'Dvířka musí být rovná. Pokud jsou šikmá, upravte výšku nožiček lednice.',
                        checkQuestion: null
                    },
                    {
                        step: 5,
                        action: 'Otestujte těsnost znovu',
                        time: '1 min',
                        icon: '✅',
                        hint: 'Zopakujte test s papírem na několika místech po obvodu dvířek.',
                        checkQuestion: {
                            question: 'Těsní dvířka správně?',
                            options: ['Ano, papír drží pevně', 'Ne, stále netěsní'],
                            correctAnswer: 0,
                            failMessage: 'Těsnění může být trvale poškozené a bude nutné ho vyměnit.'
                        }
                    }
                ],
                safetyWarnings: ['Při použití fénu dejte pozor na vodu', 'Nepoužívejte ostré nástroje na těsnění']
            }
        ]
    },
    'podlaha': {
        name: 'Dřevěná podlaha',
        category: 'steny_podlahy',
        icon: '🪵',
        issues: [
            {
                id: 'squeaky',
                name: 'Vrzající podlaha',
                description: 'Podlaha vrže při chůzi',
                riskScore: 1,
                difficulty: 'Nízká',
                timeEstimate: '20 min',
                tools: ['Mastek nebo dětský pudr', 'Kartáč', 'Hadřík'],
                steps: [
                    {
                        step: 1,
                        action: 'Najděte místo vrzání',
                        time: '3 min',
                        icon: '🔍',
                        hint: 'Pomalu procházejte místnost a označte si místa, kde podlaha vrže (např. kouskem pásky).',
                        checkQuestion: {
                            question: 'Našli jste vrzající místa?',
                            options: ['Ano, mám je označená', 'Vrže to všude'],
                            correctAnswer: 0,
                            failMessage: 'Pokud vrže celá podlaha, může být problém v podkladu. Zvažte konzultaci s odborníkem.'
                        }
                    },
                    {
                        step: 2,
                        action: 'Nasypte mastek do spár',
                        time: '5 min',
                        icon: '🧴',
                        hint: 'Nasypte mastek nebo dětský pudr do spár mezi prkny v místě vrzání.',
                        checkQuestion: null
                    },
                    {
                        step: 3,
                        action: 'Zameťte mastek do spár',
                        time: '5 min',
                        icon: '🧹',
                        hint: 'Kartáčem nebo hadříkem vtlačte mastek hluboko do spár. Pohybujte se po podlaze, aby se dostal dovnitř.',
                        checkQuestion: null
                    },
                    {
                        step: 4,
                        action: 'Setřete přebytečný mastek',
                        time: '3 min',
                        icon: '✨',
                        hint: 'Hadříkem nebo mopem odstraňte přebytečný pudr z povrchu podlahy.',
                        checkQuestion: null
                    },
                    {
                        step: 5,
                        action: 'Otestujte podlahu',
                        time: '2 min',
                        icon: '✅',
                        hint: 'Projděte se po opravených místech a zkontrolujte, zda vrzání ustalo.',
                        checkQuestion: {
                            question: 'Přestala podlaha vrzat?',
                            options: ['Ano, je ticho', 'Ne, stále vrže'],
                            correctAnswer: 0,
                            failMessage: 'Zkuste postup zopakovat nebo použít speciální mazivo na podlahy. U silného vrzání může být nutné prkna přišroubovat.'
                        }
                    }
                ],
                safetyWarnings: ['Mastek může být kluzký - buďte opatrní při chůzi']
            }
        ]
    },
    'wc_ucpane': {
        name: 'Ucpaná toaleta',
        category: 'voda',
        icon: '🚽',
        issues: [
            {
                id: 'blocked',
                name: 'Ucpaný záchod',
                description: 'Voda neodtéká nebo se vrací zpět',
                riskScore: 3,
                difficulty: 'Střední',
                timeEstimate: '20 min',
                tools: ['Zvon na WC', 'Gumové rukavice', 'Kbelík', 'Horká voda'],
                steps: [
                    {
                        step: 1,
                        action: 'Nepokračujte ve splachování!',
                        time: '1 min',
                        icon: '⚠️',
                        hint: 'Další splachování by mohlo způsobit přetečení. Pokud hladina stoupá, zavřete přívod vody.',
                        checkQuestion: {
                            question: 'Je hladina vody stabilní?',
                            options: ['Ano, nestoupá', 'Ne, stále stoupá'],
                            correctAnswer: 0,
                            failMessage: 'Okamžitě zavřete přívod vody (ventil za WC) a počkejte, až hladina klesne.'
                        }
                    },
                    {
                        step: 2,
                        action: 'Nalijte horkou vodu',
                        time: '5 min',
                        icon: '🫖',
                        hint: 'Nalijte kbelík horké (ne vařící!) vody z výšky pasu. Teplota a tlak mohou uvolnit ucpání.',
                        checkQuestion: {
                            question: 'Začala voda odtékat?',
                            options: ['Ano, problém vyřešen', 'Ne, stále ucpáno'],
                            correctAnswer: 0,
                            failMessage: 'Pokračujte použitím zvonu.'
                        }
                    },
                    {
                        step: 3,
                        action: 'Použijte zvon (pumpu) na WC',
                        time: '5 min',
                        icon: '🪠',
                        hint: 'Ponořte zvon do vody (musí být ponořený!). Pomalu zatlačte dolů, pak rychle vytáhněte. Opakujte 10-15x.',
                        checkQuestion: null
                    },
                    {
                        step: 4,
                        action: 'Spláchněte a zkontrolujte',
                        time: '2 min',
                        icon: '🚽',
                        hint: 'Opatrně spláchněte. Mějte připravenou ruku na zavření přívodu, kdyby voda stoupala.',
                        checkQuestion: {
                            question: 'Odtéká voda normálně?',
                            options: ['Ano, je odcpaný', 'Ne, stále problém'],
                            correctAnswer: 0,
                            failMessage: 'Ucpání může být hluboko v potrubí. Zkuste enzymatický čistič přes noc nebo zavolejte instalatéra.'
                        }
                    },
                    {
                        step: 5,
                        action: 'Vyčistěte nástroje a umyjte si ruce',
                        time: '3 min',
                        icon: '🧼',
                        hint: 'Dezinfikujte zvon a důkladně si umyjte ruce.',
                        checkQuestion: null
                    }
                ],
                safetyWarnings: ['Vždy používejte gumové rukavice', 'Dbejte na hygienu', 'Nepoužívejte chemické čističe po použití zvonu']
            }
        ]
    },
    'zaluzie': {
        name: 'Žaluzie',
        category: 'dvere_okna',
        icon: '🪟',
        issues: [
            {
                id: 'stuck',
                name: 'Zaseknuté žaluzie',
                description: 'Žaluzie nejdou vytáhnout, spustit nebo naklápět',
                riskScore: 1,
                difficulty: 'Střední',
                timeEstimate: '20 min',
                tools: ['Šroubovák', 'WD-40 nebo silikonový sprej', 'Hadřík'],
                steps: [
                    {
                        step: 1,
                        action: 'Identifikujte typ problému',
                        time: '2 min',
                        icon: '🔍',
                        hint: 'Zkuste, zda nejdou vytáhnout, spustit, nebo naklápět. Podle toho určíte, kde je problém.',
                        checkQuestion: {
                            question: 'Jaký je problém?',
                            options: ['Nejdou vytáhnout/spustit', 'Nejdou naklápět', 'Padají samy dolů'],
                            correctAnswer: null,
                            failMessage: 'Pokračujte podle zjištěného problému.'
                        }
                    },
                    {
                        step: 2,
                        action: 'Zkontrolujte šňůru a mechanismus',
                        time: '5 min',
                        icon: '🧵',
                        hint: 'Podívejte se, zda není šňůra zamotaná nebo vyskočená z kladky. U starších žaluzií může být přetržená.',
                        checkQuestion: null
                    },
                    {
                        step: 3,
                        action: 'Nastříkejte mazivo na mechanismus',
                        time: '3 min',
                        icon: '🔧',
                        hint: 'Nastříkejte WD-40 nebo silikonový sprej na horní lištu, kde je ovládací mechanismus.',
                        checkQuestion: null
                    },
                    {
                        step: 4,
                        action: 'Uvolněte a znovu napněte šňůru',
                        time: '8 min',
                        icon: '⚙️',
                        hint: 'Pokud šňůra vyskočila, otevřete kryt horní lišty a vraťte ji do správné polohy v kladce.',
                        checkQuestion: null
                    },
                    {
                        step: 5,
                        action: 'Otestujte funkčnost',
                        time: '2 min',
                        icon: '✅',
                        hint: 'Vyzkoušejte vytahování, spouštění i naklápění lamel.',
                        checkQuestion: {
                            question: 'Fungují žaluzie správně?',
                            options: ['Ano, vše funguje', 'Ne, stále mají problém'],
                            correctAnswer: 0,
                            failMessage: 'Mechanismus může být poškozen. Zvažte výměnu ovládacího dílu nebo celých žaluzií.'
                        }
                    }
                ],
                safetyWarnings: ['Při práci s výškou použijte stabilní schůdky', 'Opatrně s ostrými hranami lamel']
            }
        ]
    }
};

// Kategorie pro filtrování
const FIXO_CATEGORIES = [
    { id: 'all', name: 'Vše', icon: '📋' },
    { id: 'voda', name: 'Voda', icon: '🚰' },
    { id: 'elektrina', name: 'Elektřina', icon: '⚡' },
    { id: 'topeni', name: 'Topení', icon: '🌡️' },
    { id: 'dvere_okna', name: 'Dveře & Okna', icon: '🚪' },
    { id: 'nabytek', name: 'Nábytek', icon: '🪑' },
    { id: 'spotrebice', name: 'Spotřebiče', icon: '🔌' },
    { id: 'kuchyn', name: 'Kuchyň', icon: '🍳' },
    { id: 'koupelna', name: 'Koupelna', icon: '🚿' },
    { id: 'steny_podlahy', name: 'Stěny', icon: '🏠' },
    { id: 'zahrada', name: 'Zahrada', icon: '🌱' }
];
