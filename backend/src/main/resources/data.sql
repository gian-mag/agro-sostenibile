-- =============================================
-- DATA SEEDING - Aziende del Settore Primario
-- Link PDF verificati il 27/02/2026
-- =============================================

-- 1. Granarolo (Lattiero-caseario / Allevamento)
INSERT INTO companies (company_name, segment, description, history, logo_url, website_url, created_at, updated_at)
VALUES ('Granarolo', 'Allevamento',
        'Granarolo e'' la principale filiera italiana del latte, dalla stalla alla tavola. Cooperativa con oltre 600 allevatori soci, produce latte, yogurt, formaggi e derivati con forte attenzione alla sostenibilita della filiera zootecnica.',
        'Fondata nel 1957 a Bologna come cooperativa di allevatori emiliani, Granarolo e'' cresciuta fino a diventare il primo gruppo lattiero-caseario italiano a capitale interamente italiano, con oltre 1 miliardo di euro di fatturato.',
        NULL, 'https://www.gruppogranarolo.it',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 2. Mutti (Agricoltura / Trasformazione pomodoro)
INSERT INTO companies (company_name, segment, description, history, logo_url, website_url, created_at, updated_at)
VALUES ('Mutti', 'Agricoltura',
        'Mutti e'' leader europeo nel mercato dei derivati del pomodoro. Lavora esclusivamente pomodoro 100% italiano coltivato da una filiera agricola controllata, con un forte impegno per la sostenibilita ambientale e la riduzione dell''impronta idrica.',
        'Fondata nel 1899 a Montechiarugolo (Parma) dalla famiglia Mutti, l''azienda ha trasformato il pomodoro in un''eccellenza italiana conosciuta nel mondo. Dal 2022 pubblica il Bilancio Ambientale in collaborazione con il WWF.',
        NULL, 'https://mutti-parma.com',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 3. Bolton Group (Pesca / Conserve ittiche)
INSERT INTO companies (company_name, segment, description, history, logo_url, website_url, created_at, updated_at)
VALUES ('Bolton Group', 'Pesca',
        'Bolton Group e'' una multinazionale italiana leader nel mercato delle conserve ittiche con i marchi Rio Mare e Saupiquet. Si impegna per una pesca responsabile, la tutela degli ecosistemi marini e la riduzione dell''impatto ambientale del packaging.',
        'Parte del gruppo familiare Nissim, Bolton ha le sue radici nella tradizione conserviera italiana. Rio Mare, il brand di punta, e'' nato nel 1966 e oggi e'' presente in oltre 40 paesi con un forte impegno per la pesca sostenibile.',
        NULL, 'https://www.bolton.com',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 4. Inalca / Gruppo Cremonini (Allevamento / Carni bovine)
INSERT INTO companies (company_name, segment, description, history, logo_url, website_url, created_at, updated_at)
VALUES ('Inalca', 'Allevamento',
        'Inalca, parte del Gruppo Cremonini, e'' il primo produttore italiano di carni bovine e uno dei leader europei del settore. Opera lungo l''intera filiera dalla zootecnia alla distribuzione, con un forte impegno verso la sostenibilita della filiera bovina.',
        'Fondata nel 1963 a Castelvetro di Modena, Inalca ha sviluppato un modello integrato di filiera che va dall''allevamento alla distribuzione. Con 11 edizioni del Bilancio di Sostenibilita, e'' tra le aziende piu trasparenti del settore zootecnico italiano.',
        NULL, 'https://www.inalca.it',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- =============================================
-- REPORTS DI SOSTENIBILITA (link reali verificati)
-- =============================================

-- Granarolo
INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (1, 'Bilancio di Sostenibilita Granarolo 2023', 2023,
        'https://www.improntaetica.org/wp-content/uploads/2024/09/Granarolo-BS2023-ITA.pdf',
        'Granarolo_Bilancio_Sostenibilita_2023.pdf',
        'Nel Bilancio di Sostenibilita 2023, il Gruppo Granarolo rendiconta il proprio impegno lungo la filiera lattiero-casearia: riduzione delle emissioni di CO2, benessere animale negli allevamenti dei soci, valorizzazione del latte 100% italiano e transizione energetica degli stabilimenti. Il report segue lo standard GRI e si allinea agli SDGs dell''Agenda 2030.',
        'GRI', 'climate,animal-welfare,supply-chain,energy', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (1, 'Bilancio di Sostenibilita Granarolo 2022', 2022,
        'https://www.improntaetica.org/wp-content/uploads/2023/07/IT-Granarolo_BS2022-affiancate-web-alta-compresso.pdf',
        'Granarolo_Bilancio_Sostenibilita_2022.pdf',
        'Il Bilancio 2022 di Granarolo si concentra sulla tracciabilita del latte dalla stalla alla tavola, sugli investimenti in energia rinnovabile e sul programma di benessere animale che coinvolge oltre 600 allevatori soci. Particolare attenzione alla riduzione degli sprechi alimentari e al packaging sostenibile.',
        'GRI', 'climate,animal-welfare,packaging,traceability', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Mutti
INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (2, 'Bilancio di Sostenibilita Mutti 2023', 2023,
        'https://mutti-parma.com/app/uploads/sites/7/2024/07/bilancio-sostenibilita-2023-d.pdf',
        'Mutti_Bilancio_Sostenibilita_2023.pdf',
        'Il Bilancio di Sostenibilita 2023 di Mutti documenta l''impegno per la riduzione dell''impronta idrica nella coltivazione del pomodoro, la collaborazione con il WWF per progetti di sostenibilita ambientale, il 100% di pomodoro italiano da filiera controllata e gli investimenti in agricoltura rigenerativa e packaging sostenibile.',
        'GRI', 'water,biodiversity,supply-chain,packaging', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (2, 'Bilancio Ambientale Mutti 2022', 2022,
        'https://mutti-parma.com/app/uploads/sites/7/2023/11/bilancio-ambientale-2022.pdf',
        'Mutti_Bilancio_Ambientale_2022.pdf',
        'Il Bilancio Ambientale 2022 di Mutti, realizzato in collaborazione con il WWF Italia, rendiconta i progressi nella gestione sostenibile della filiera del pomodoro: riduzione dei consumi idrici, efficienza energetica degli stabilimenti e promozione di pratiche agricole a basso impatto ambientale.',
        'GRI', 'water,energy,climate,agriculture', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bolton Group
INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (3, 'Bolton Group Sustainability Report 2023', 2023,
        'https://www.bolton.com/sites/default/files/2024-09/Bolton%20Sustainability%20Report_2023_LOW.pdf',
        'Bolton_Group_Sustainability_Report_2023.pdf',
        'Il Sustainability Report 2023 di Bolton Group documenta l''impegno per una pesca responsabile e la tutela degli oceani. Tra i risultati: tonno Rio Mare proveniente da pesca sostenibile certificata, partnership con WWF e ISSF, riduzione della plastica vergine nel packaging e obiettivi di decarbonizzazione al 2030.',
        'GRI', 'ocean,supply-chain,packaging,climate', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (3, 'Bolton Group Sustainability Report 2022', 2022,
        'https://www.bolton.com/sites/default/files/2024-07/SUSTAINABILITY-REPORT%20(1).pdf',
        'Bolton_Group_Sustainability_Report_2022.pdf',
        'Nel report 2022, Bolton Group rendiconta i progressi nella strategia di sostenibilita: tracciabilita della filiera ittica, riduzione delle emissioni di CO2 nei processi produttivi, investimenti in progetti di rigenerazione degli ecosistemi marini e impegno per il benessere dei dipendenti.',
        'GRI', 'ocean,climate,traceability,social', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Inalca
INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (4, 'Bilancio di Sostenibilita Inalca 2023', 2023,
        'https://www.cremonini.com/wp-content/uploads/2025/01/Bilancio-Sostenibilita-Inalca-2023-ITA_web.pdf',
        'Inalca_Bilancio_Sostenibilita_2023.pdf',
        'Il Bilancio di Sostenibilita 2023 di Inalca presenta i risultati lungo l''intera filiera bovina: dalla gestione responsabile degli allevamenti alla riduzione delle emissioni, dall''economia circolare nella trasformazione alla sicurezza alimentare. Focus su benessere animale, tracciabilita e impegno verso la carbon neutrality.',
        'GRI', 'animal-welfare,climate,supply-chain,circular-economy', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO reports (company_id, title, report_year, pdf_url, pdf_file_name, summary, standard, tags, file_stored, created_at, updated_at)
VALUES (4, 'Bilancio di Sostenibilita Inalca 2022', 2022,
        'https://www.cremonini.com/wp-content/uploads/2024/04/Bilancio-di-sostenibilita_Inalca_22_ita.pdf',
        'Inalca_Bilancio_Sostenibilita_2022.pdf',
        'Nel Bilancio 2022, Inalca rendiconta gli impegni in materia di sostenibilita della filiera zootecnica: efficienza energetica, riduzione degli sprechi, benessere animale certificato, tracciabilita completa dalla stalla alla tavola e investimenti in energie rinnovabili per gli stabilimenti produttivi.',
        'GRI', 'animal-welfare,energy,traceability,waste', false,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

