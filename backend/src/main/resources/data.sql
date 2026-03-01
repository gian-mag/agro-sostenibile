-- =============================================
-- DATA SEEDING - Aziende del Settore Primario
-- 4 aziende reali (agricoltura e allevamento)
-- Link PDF verificati il 01/03/2026
-- =============================================

-- 1. BF SpA (Bonifiche Ferraresi) - Agricoltura
INSERT INTO companies (company_name, segment, description, history, logo_url, website_url, created_at, updated_at)
VALUES ('BF SpA', 'Agricoltura',
        'BF SpA (Bonifiche Ferraresi) e'' la piu grande azienda agricola italiana per superficie coltivata, con oltre 6.500 ettari gestiti direttamente. Produce cereali, riso, colture industriali e ortofrutta, operando nel cuore del settore primario con un modello di agricoltura sostenibile e innovativa.',
        'Fondata nel 1872 a Jolanda di Savoia (Ferrara), Bonifiche Ferraresi nasce dalla bonifica delle paludi del delta del Po. Quotata in Borsa Italiana, e'' oggi il principale operatore agricolo del Paese, con un fatturato di gruppo superiore al miliardo di euro e un impegno crescente nella transizione ecologica dell''agricoltura.',
        NULL, 'https://www.bfspa.it',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 2. Consorzio Casalasco del Pomodoro - Agricoltura
INSERT INTO companies (company_name, segment, description, history, logo_url, website_url, created_at, updated_at)
VALUES ('Casalasco', 'Agricoltura',
        'Casalasco Societa Agricola e'' un consorzio che riunisce oltre 800 aziende agricole e coltiva 12.000 ettari di pomodoro nel nord Italia. E'' il primo produttore italiano di derivati del pomodoro con un modello di filiera corta che parte direttamente dal campo.',
        'Fondato nel 1977 a Rivarolo del Re (Cremona), il Consorzio Casalasco del Pomodoro e'' cresciuto fino a raggiungere un fatturato consolidato di 630 milioni di euro nel 2023. Con i marchi Pomi e De Rica, esporta in oltre 60 paesi mantenendo il legame diretto con gli agricoltori del territorio.',
        NULL, 'https://www.casalasco.com',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 3. Amadori - Allevamento (Avicolo Integrato)
INSERT INTO companies (company_name, segment, description, history, logo_url, website_url, created_at, updated_at)
VALUES ('Amadori', 'Allevamento',
        'Amadori e'' uno dei principali gruppi avicoli italiani con una filiera completamente integrata: dai mangimifici agli allevamenti propri, dalla trasformazione alla distribuzione. Controlla direttamente ogni fase della produzione garantendo tracciabilita e sicurezza alimentare.',
        'Fondato nel 1969 a San Vittore di Cesena da Francesco Amadori, il gruppo ha raggiunto un fatturato di 1.780 milioni di euro nel 2023. Con oltre 9.000 dipendenti e una rete di allevamenti su tutto il territorio nazionale, Amadori rappresenta un pilastro della filiera avicola italiana.',
        NULL, 'https://www.amadori.it',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 4. Eurovo - Allevamento (Uova)
INSERT INTO companies (company_name, segment, description, history, logo_url, website_url, created_at, updated_at)
VALUES ('Eurovo', 'Allevamento',
        'Eurovo e'' il leader europeo nella produzione e distribuzione di uova e ovoprodotti, con 15 milioni di uova prodotte al giorno. Gestisce direttamente i propri allevamenti e dal 2023 tutti gli stabilimenti italiani sono cage-free (biologico, all''aperto o a terra).',
        'Fondato nel 1966 a Imola (Bologna), il Gruppo Eurovo si e'' affermato come riferimento continentale per qualita e innovazione nel settore delle uova. Con 16 impianti fotovoltaici e 2.000 alberi piantati nello stabilimento di Mordano, l''azienda integra sostenibilita ambientale e benessere animale nella propria strategia di crescita.',
        NULL, 'https://www.eurovo.com',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- =============================================
-- REPORTS DI SOSTENIBILITA (link PDF verificati)
-- =============================================

-- BF SpA
INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (1, 'Dichiarazione Non Finanziaria BF 2023', 2023,
        'https://www.bfspa.it/files/02286/gruppobfdnf2023.pdf',
        'BF_SpA_DNF_2023.pdf',
        'La Dichiarazione Non Finanziaria 2023 del Gruppo BF rendiconta l''impegno dell''azienda nella gestione sostenibile di oltre 6.500 ettari di terreni agricoli. Tra i temi principali: la riduzione dell''impatto ambientale delle coltivazioni, l''adozione di tecniche di agricoltura di precisione, la gestione responsabile delle risorse idriche e la tutela della biodiversita nei territori gestiti. Il documento e'' redatto ai sensi del D.Lgs. 254/2016.',
        'GRI', 'clima,agricoltura,acqua,biodiversita', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (1, 'Dichiarazione Non Finanziaria BF 2022', 2022,
        'https://www.bfspa.it/files/01086/bfdnf2022.pdf',
        'BF_SpA_DNF_2022.pdf',
        'La DNF 2022 del Gruppo BF documenta i progressi nella transizione verso un''agricoltura sempre piu sostenibile: investimenti in energie rinnovabili, riduzione dei consumi idrici per ettaro coltivato, rotazione delle colture per la salute del suolo e iniziative di economia circolare. Il report copre tutte le societa controllate del gruppo.',
        'GRI', 'clima,energia,acqua,economia-circolare', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Casalasco
INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (2, 'Bilancio di Sostenibilita Casalasco 2023', 2023,
        'https://www.emilianaconserve.it/wp-content/uploads/2024/12/Bilancio-Consorzio-Casalasco-241127.pdf',
        'Casalasco_Bilancio_Sostenibilita_2023.pdf',
        'Il sesto Bilancio di Sostenibilita del Consorzio Casalasco documenta la gestione sostenibile di 12.000 ettari di coltivazione di pomodoro e il coinvolgimento di oltre 800 aziende agricole socie. Tra i risultati principali: riduzione dell''impronta idrica, investimenti in agricoltura di precisione, packaging sostenibile e valorizzazione della filiera corta dal campo alla tavola. Redatto con il supporto di Deloitte secondo standard GRI.',
        'GRI', 'acqua,filiera,packaging,agricoltura', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (2, 'Bilancio di Sostenibilita Casalasco 2022', 2022,
        'https://www.casalasco.com/media/filer_public/cc/fc/ccfc714d-e332-480c-9b48-191742f539e3/237-23-bilancio_consorzio_casalasco_del_pomodoro_2022.pdf',
        'Casalasco_Bilancio_Sostenibilita_2022.pdf',
        'Il Bilancio 2022 del Consorzio Casalasco rendiconta i progressi nei cinque pilastri della strategia sostenibile: ambiente, innovazione, ricerca e sviluppo, persone e filiera. Focus sulla riduzione dei consumi energetici, sulla gestione delle risorse idriche nella coltivazione del pomodoro e sugli investimenti in tecnologie agricole innovative.',
        'GRI', 'acqua,energia,agricoltura,innovazione', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Amadori
INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (3, 'Report di Sostenibilita Amadori 2023', 2023,
        'https://www.amadori.it/hubfs/Amadori%202022/Report_Sostenibilit%C3%A0/Ama_report_sost_2023.pdf',
        'Amadori_Report_Sostenibilita_2023.pdf',
        'Il quarto Report di Sostenibilita del Gruppo Amadori copre l''esercizio 2023 secondo gli standard GRI 2021. Il documento rendiconta la gestione della filiera avicola integrata: dagli allevamenti alla distribuzione, con focus su benessere animale, sicurezza alimentare, riduzione delle emissioni, efficienza energetica degli stabilimenti e impegno sociale verso le comunita locali. Il fatturato del gruppo ha raggiunto 1.780 milioni di euro.',
        'GRI', 'benessere-animale,filiera,clima,sociale', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (3, 'Report di Sostenibilita Amadori 2022', 2022,
        'https://www.amadori.it/hubfs/Amadori%202022/Report%20Sostenibilit%C3%A0/Amadori_report_sost_2022.pdf',
        'Amadori_Report_Sostenibilita_2022.pdf',
        'Il terzo Report di Sostenibilita di Amadori documenta i progressi nella gestione responsabile della filiera avicola: tracciabilita completa dal mangime al prodotto finito, investimenti nel benessere animale, riduzione dell''uso di antibiotici, efficienza energetica e progetti di economia circolare per la valorizzazione dei sottoprodotti.',
        'GRI', 'benessere-animale,tracciabilita,energia,economia-circolare', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Eurovo
INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (4, 'Bilancio di Sostenibilita Eurovo 2023', 2023,
        'https://www.eurovo.com/sostenibilita/IT/Bds_25_IT.pdf',
        'Eurovo_Bilancio_Sostenibilita_2023.pdf',
        'Il terzo Bilancio di Sostenibilita del Gruppo Eurovo rendiconta i risultati del leader europeo nella produzione di uova: completamento della transizione cage-free in tutti gli allevamenti italiani, installazione di 16 impianti fotovoltaici, piantumazione di 2.000 alberi per la cattura di 16,5 tonnellate di CO2 annue e sviluppo di progetti di economia circolare e biodiversita.',
        'GRI', 'benessere-animale,energia,biodiversita,economia-circolare', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (4, 'Bilancio di Sostenibilita Eurovo 2022', 2022,
        'https://www.eurovo.com/sites/default/files/Bilancio_sostenibilita_2022_IT_web_0.pdf',
        'Eurovo_Bilancio_Sostenibilita_2022.pdf',
        'Il secondo Bilancio di Sostenibilita di Eurovo si fonda su cinque pilastri: benessere animale, qualita e sicurezza alimentare, innovazione e salute, sostenibilita ambientale e impegno sociale. Il report documenta l''avvio della transizione verso allevamenti cage-free, gli investimenti in energia rinnovabile e le iniziative per la protezione della biodiversita.',
        'GRI', 'benessere-animale,energia,innovazione,sociale', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
