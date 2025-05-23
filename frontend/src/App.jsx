import React, { useState } from 'react';
import axios from 'axios';
import InputWord from './components/InputWord';
import TranslationResult from './components/TranslationResult';
import CookieConsent from 'react-cookie-consent';
import { toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

const appStyles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px 20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        width: '100%',
        maxWidth: '500px'
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    },
    footer: {
        marginTop: '40px',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14px'
    }
};

function App() {
    const [word, setWord] = useState('');
    const [translationData, setTranslationData] = useState(null);
    const [partOfSpeechData, setPartOfSpeechData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTranslate = async () => {
        if (!word.trim()) {
            toast.error('Будь ласка, введіть слово для перекладу');
            return;
        }

        setLoading(true);
        setError('');
        setTranslationData(null);
        setPartOfSpeechData(null);

        try {
            const [translationResponse, partOfSpeechResponse] = await Promise.all([
                axios.get(`${BACKEND_URL}/api/translate`, {
                    params: { word: word.trim() }
                }),
                axios.get(`${BACKEND_URL}/api/partofspeech`, {
                    params: { word: word.trim() }
                })
            ]);

            setTranslationData(translationResponse.data);
            setPartOfSpeechData(partOfSpeechResponse.data);
            toast.success('Переклад знайдено!');
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                `Не вдалося знайти переклад для слова "${word}". Перевірте написання.`;
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setWord('');
        setTranslationData(null);
        setPartOfSpeechData(null);
        setError('');
    };

    return (
        <div style={appStyles.container}>
            <div style={appStyles.card}>
                <h1 style={appStyles.title}>Simple Translator</h1>

                <InputWord
                    word={word}
                    setWord={setWord}
                    onTranslate={handleTranslate}
                    onClear={handleClear}
                    loading={loading}
                />

                {error && (
                    <div style={{
                        color: '#e74c3c',
                        backgroundColor: '#fadbd8',
                        padding: '15px',
                        borderRadius: '8px',
                        marginTop: '20px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <TranslationResult
                    translationData={translationData}
                    partOfSpeechData={partOfSpeechData}
                    loading={loading}
                />
            </div>

            <div style={appStyles.footer}>
                <p>© 2025 Simple Translator.</p>
                <p>Використовує Free Dictionary API</p>
            </div>

            <CookieConsent
                location="bottom"
                buttonText="Прийняти всі cookies"
                declineButtonText="Відхилити"
                enableDeclineButton
                cookieName="simple-translator-consent"
                style={{
                    background: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(10px)"
                }}
                buttonStyle={{
                    color: "#ffffff",
                    background: "#4c57d7",
                    fontSize: "14px",
                    borderRadius: "6px",
                    border: "none",
                    padding: "10px 20px"
                }}
                declineButtonStyle={{
                    color: "#667eea",
                    background: "transparent",
                    fontSize: "14px",
                    borderRadius: "6px",
                    border: "1px solid #667eea",
                    padding: "10px 20px"
                }}
                expires={365}
                overlay
            >
                <div style={{ fontSize: "14px", lineHeight: "1.5" }}>
                    <strong>🍪 Використання Cookies</strong>
                    <br />
                    Цей сайт використовує cookies для покращення користувацького досвіду
                    та відповідності вимогам GDPR. Ми зберігаємо лише необхідні дані для
                    функціонування сайту.
                    <br />
                    <a href="PRIVACY_POLICY.md" style={{ color: "#89CFF0", textDecoration: "underline" }}>
                        Політика конфіденційності
                    </a>
                </div>
            </CookieConsent>
        </div>
    );
}

export default App;