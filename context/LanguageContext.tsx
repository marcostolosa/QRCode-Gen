/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { createContext, useContext, useState, useMemo } from 'react';
import { translations, type Translation } from '../i18n/translations';
import type { Language } from '../App';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    translations: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const contextValue = useMemo(() => ({
        language,
        setLanguage,
        translations: translations[language]
    }), [language]);

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};