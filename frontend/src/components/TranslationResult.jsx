import React from 'react';

const styles = {
    container: {
        marginTop: '30px'
    },
    loadingContainer: {
        textAlign: 'center',
        padding: '40px 20px',
        color: '#6c757d'
    },
    loadingSpinner: {
        display: 'inline-block',
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #667eea',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '16px'
    },
    resultCard: {
        backgroundColor: '#f8f9ff',
        border: '1px solid #e0e6ff',
        borderRadius: '12px',
        padding: '24px',
        marginTop: '20px'
    },
    wordTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    phonetic: {
        fontSize: '16px',
        color: '#667eea',
        fontStyle: 'italic',
        marginBottom: '16px'
    },
    section: {
        marginBottom: '20px'
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#4a5568',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    definition: {
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#2d3748',
        backgroundColor: '#ffffff',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
    },
    partOfSpeech: {
        display: 'inline-block',
        backgroundColor: '#667eea',
        color: '#ffffff',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '8px'
    },
    synonyms: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px'
    },
    synonym: {
        backgroundColor: '#e2e8f0',
        color: '#4a5568',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px'
    },
    noResult: {
        textAlign: 'center',
        padding: '40px 20px',
        color: '#6c757d',
        fontSize: '16px'
    }
};

const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function TranslationResult({ translationData, partOfSpeechData, loading }) {
    // Inject CSS animation
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = spinKeyframes;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loadingContainer}>
                    <div style={styles.loadingSpinner}></div>
                    <div>Шукаю переклад...</div>
                </div>
            </div>
        );
    }

    if (!translationData && !partOfSpeechData) {
        return (
            <div style={styles.container}>
                <div style={styles.noResult}>
                    📚 Введіть слово вище, щоб отримати переклад та граматичну інформацію
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {translationData && (
                <div style={styles.resultCard}>
                    <div style={styles.wordTitle}>
                        📖 {translationData.word.charAt(0).toUpperCase() + translationData.word.slice(1)}
                    </div>

                    {translationData.phonetic && (
                        <div style={styles.phonetic}>
                            🔊 {translationData.phonetic}
                        </div>
                    )}

                    <div style={styles.section}>
                        <div style={styles.sectionTitle}>
                            💭 Визначення:
                        </div>
                        <div style={styles.definition}>
                            {translationData.translation}
                        </div>
                    </div>

                    {partOfSpeechData && (
                        <div style={styles.section}>
                            <div style={styles.sectionTitle}>
                                🎯 Частина мови:
                            </div>
                            <div>
                <span style={styles.partOfSpeech}>
                  {partOfSpeechData.partOfSpeechUa} ({partOfSpeechData.partOfSpeech})
                </span>
                            </div>
                        </div>
                    )}

                    {partOfSpeechData && partOfSpeechData.synonyms && partOfSpeechData.synonyms.length > 0 && (
                        <div style={styles.section}>
                            <div style={styles.sectionTitle}>
                                🔗 Синоніми:
                            </div>
                            <div style={styles.synonyms}>
                                {partOfSpeechData.synonyms.map((synonym, index) => (
                                    <span key={index} style={styles.synonym}>
                    {synonym}
                  </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TranslationResult;