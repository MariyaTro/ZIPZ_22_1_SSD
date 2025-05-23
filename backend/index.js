const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:6006'],
    credentials: true
}));
app.use(express.json());

/**
 * @swagger
 * /api/translate:
 *   get:
 *     summary: Отримати переклад слова
 *     description: Повертає переклад англійського слова та його визначення
 *     parameters:
 *       - in: query
 *         name: word
 *         required: true
 *         schema:
 *           type: string
 *         description: Слово для перекладу
 *     responses:
 *       200:
 *         description: Успішний переклад
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 word:
 *                   type: string
 *                   example: "hello"
 *                 translation:
 *                   type: string
 *                   example: "a greeting or expression of goodwill"
 *                 phonetic:
 *                   type: string
 *                   example: "/həˈloʊ/"
 *       400:
 *         description: Відсутній параметр word
 *       404:
 *         description: Слово не знайдено
 */
app.get('/api/translate', async (req, res) => {
    const { word } = req.query;

    if (!word) {
        return res.status(400).json({
            error: 'Parameter "word" is required',
            message: 'Параметр "word" є обовязковим'
        });
    }

    try {
        const response = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
        );

        const data = response.data[0];
        const meanings = data.meanings || [];
        const firstMeaning = meanings[0];
        const definition = firstMeaning?.definitions?.[0]?.definition || 'No definition found';
        const phonetic = data.phonetic || data.phonetics?.[0]?.text || '';

        res.json({
            word: word.toLowerCase(),
            translation: definition,
            phonetic: phonetic,
            success: true
        });
    } catch (error) {
        console.error('Translation error:', error.message);
        res.status(404).json({
            error: 'Word not found',
            message: `Слово "${word}" не знайдено в словнику`,
            word: word.toLowerCase()
        });
    }
});

/**
 * @swagger
 * /api/partofspeech:
 *   get:
 *     summary: Отримати частину мови слова
 *     description: Повертає частину мови (іменник, дієслово, тощо) для заданого слова
 *     parameters:
 *       - in: query
 *         name: word
 *         required: true
 *         schema:
 *           type: string
 *         description: Слово для визначення частини мови
 *     responses:
 *       200:
 *         description: Успішне визначення частини мови
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 word:
 *                   type: string
 *                   example: "hello"
 *                 partOfSpeech:
 *                   type: string
 *                   example: "interjection"
 *                 partOfSpeechUa:
 *                   type: string
 *                   example: "вигук"
 *                 synonyms:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Відсутній параметр word
 *       404:
 *         description: Слово не знайдено
 */
app.get('/api/partofspeech', async (req, res) => {
    const { word } = req.query;

    if (!word) {
        return res.status(400).json({
            error: 'Parameter "word" is required',
            message: 'Параметр "word" є обовязковим'
        });
    }

    try {
        const response = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
        );

        const data = response.data[0];
        const meanings = data.meanings || [];
        const firstMeaning = meanings[0];
        const partOfSpeech = firstMeaning?.partOfSpeech || 'unknown';
        const synonyms = firstMeaning?.synonyms || [];

        const partOfSpeechMap = {
            'noun': 'іменник',
            'verb': 'дієслово',
            'adjective': 'прикметник',
            'adverb': 'прислівник',
            'pronoun': 'займенник',
            'preposition': 'прийменник',
            'conjunction': 'сполучник',
            'interjection': 'вигук',
            'article': 'артикль',
            'unknown': 'невідомо'
        };

        res.json({
            word: word.toLowerCase(),
            partOfSpeech: partOfSpeech,
            partOfSpeechUa: partOfSpeechMap[partOfSpeech] || partOfSpeech,
            synonyms: synonyms.slice(0, 5), // Обмежуємо до 5 синонімів
            success: true
        });
    } catch (error) {
        console.error('Part of speech error:', error.message);
        res.status(404).json({
            error: 'Word not found',
            message: `Слово "${word}" не знайдено в словнику`,
            word: word.toLowerCase()
        });
    }
});


app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Simple Translator API'
    });
});

app.listen(port, () => {
    console.log(`🚀 Backend server running at http://localhost:${port}`);
    console.log(`📖 API endpoints:`);
    console.log(`   GET /api/translate?word=hello`);
    console.log(`   GET /api/partofspeech?word=hello`);
    console.log(`   GET /api/health`);
});