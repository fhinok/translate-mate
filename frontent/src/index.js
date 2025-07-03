import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
const feather = require("feather-icons");

window.Alpine = Alpine;
Alpine.plugin(persist);

// const URL = "http://localhost:3000";
const URL = "";

document.addEventListener('alpine:init', () => {

    Alpine.store("data", {
    availableLanguages: Alpine.$persist([]),
    selectedLanguages: ['de', 'en-GB', 'fr', 'it'], // Default languages
    models: {},
    usage: {},

    init() {
        this.fetchLanguages();
        this.loadLanguageModels();
        this.getUsage()
    },

    loadLanguageModels() {
        this.selectedLanguages.forEach(lang => {
            this.models[lang] = {
                text: '',
                isLoading: false,
            };
        });
    },

    getActiveLanguages() {
        return Object.keys(this.models);
    },

    setActiveLanguage(index, option) {
        this.selectedLanguages[index] = option;
        this.models = {}; // Reset models
        this.loadLanguageModels(); // Load models for new languages
    },

    getLanguageModel(lang) {
        return this.models[lang] || null;
    },

    getLanguageKeyByIndex(index) {
        return Object.keys(this.models)[index] || null;
    },

    translateOthers(lang) {
        let text = this.models[lang].text;
        Object.keys(this.models).forEach(key => {
            if (key !== lang) {
                let model = this.models[key];
                if (!model) return; // Skip if model does not exist
                if (model.isLoading) return; // Skip if already loading
                model.isLoading = true;
                this.translate(text, key, model, lang)
            }
        });
    },

    translate(text, targetLang, model, sourceLang = null) {
        if(!text || !targetLang) {
            model.isLoading = false;
            return;
        }
        fetch(URL+'/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                targetLang: targetLang,
                sourceLang: sourceLang
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            model.text = data.translatedText;
            return
        })
        .catch(error => {
            console.error('Error translating text:', error);
        }).finally(() => {
            model.isLoading = false;
            this.getUsage();
        });
    },

    fetchLanguages() {
        if(this.availableLanguages.length > 0) {
            return;
        }
        fetch(URL+'/languages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }}).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => {
                this.availableLanguages = data;
            }).catch(error => {
                console.error('Error fetching languages:', error);
            });
    },

    getUsage() {
        fetch(URL+'/usage', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }}).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => {
                this.usage = data.character;
            }).catch(error => {
                console.error('Error fetching usage:', error);
                return 'Error fetching usage';
            });
    },

    toClipboard(model) {
        if (!model.text) return;
        navigator.clipboard.writeText(model.text).catch(err => {
            console.error('Failed to copy text:', err);
        });
    },

    clear(lang) {
        if (!this.models[lang]) return;
        this.models[lang].text = '';
    }
});
});

Alpine.start();
feather.replace();