import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "title": "Rick and Morty",
            "status": "Status",
            "species": "Species",
            "gender": "Gender",
            "origin": "Origin",
            "previous": "Previous",
            "next": "Next",
            "page": "Page",
            "footer": "© Rick And Morty",
            "language_en": "EN",
            "language_ger": "GER"
        }
    },
    de: {
        translation: {
            "title": "Rick und Morty",
            "status": "Status",
            "species": "Spezies",
            "gender": "Geschlecht",
            "origin": "Herkunft",
            "previous": "Zurück",
            "next": "Nächste",
            "page": "Seite",
            "footer": "© Rick und Morty",
            "language_en": "EN",
            "language_ger": "DE",
            "Loading": "Wird geladen"
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
