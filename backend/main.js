const express = require('express');
const cors = require('cors');
const deepl = require('deepl-node');

const API_KEY = process.env.API_KEY;
const deeplClient = new deepl.DeepLClient(API_KEY);

const CONTEXT = {
    'de': 'E-Commerce Produktnamen, Beschreibungen und Attribute für ein Schweizer Event-Tech-Unternehmen',
    'en': 'E-Commerce Product Names, Descriptions and Attributes for a Swiss event tech company',
    'fr': 'Noms de produits, descriptions et attributs e-commerce pour une entreprise suisse de technologie événementielle',
    'it': 'Nomi di prodotti, descrizioni e attributi e-commerce per un\'azienda svizzera di tecnologia per eventi'  
}

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:1234', // Adjust this to your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/translate', async (req, res) => {
    const { text, targetLang, sourceLang } = req.body;
    if (!text || !targetLang) {
        return res.status(400).json({ error: "Text and target language are required" });
    }
    try {
        const translatedText = await translateText(text, targetLang, sourceLang);
        res.json({ translatedText });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/languages', (req, res) => {
    getSupportedLanguages()
        .then(languages => res.json(languages))
        .catch(error => res.status(500).json({ error: error.message }));
});

app.get('/usage', (req, res) => {
    getUsage()
        .then(usage => res.json(usage))
        .catch(error => res.status(500).json({ error: error.message }));
});

async function getUsage() {
    try {
        const usage = await deeplClient.getUsage();
        return usage;
    } catch (error) {
        console.error("Error fetching usage:", error);
        throw new Error("Failed to fetch usage");
    }
}

async function translateText(text, targetLang, sourceLang = null) {
    if(sourceLang && sourceLang.includes('-')) {
        sourceLang = sourceLang.split('-')[0]; // Handle language codes like 'en-GB'
    }
    try {
        const response = await deeplClient.translateText(text, sourceLang, targetLang, {
            preserveFormatting: true,
            tagHandling: 'html',
            context: CONTEXT[targetLang] || CONTEXT['en'],
            splitSentences: '1',
            formality: 'prefer_less'
        });
        return response.text;
    } catch (error) {
        console.error("Translation error:", error);
        throw new Error("Translation failed", error);
    }
}

async function getSupportedLanguages() {
    try {
        const languages = await deeplClient.getTargetLanguages();
        return languages.map(lang => ({ language: lang.code, name: lang.name }));
    } catch (error) {
        console.error("Error fetching languages:", error);
        throw new Error("Failed to fetch languages");
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});