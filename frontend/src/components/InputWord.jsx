import React from 'react';

const styles = {
    container: {
        marginBottom: '30px'
    },
    inputGroup: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px'
    },
    input: {
        flex: 1,
        padding: '12px 16px',
        fontSize: '16px',
        border: '2px solid #e0e6ed',
        borderRadius: '8px',
        outline: 'none',
        transition: 'all 0.3s ease',
        backgroundColor: '#ffffff'
    },
    inputFocus: {
        borderColor: '#667eea',
        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    button: {
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '600',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        minWidth: '120px'
    },
    primaryButton: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff'
    },
    secondaryButton: {
        background: '#f8f9fa',
        color: '#6c757d',
        border: '1px solid #dee2e6'
    },
    buttonDisabled: {
        opacity: 0.6,
        cursor: 'not-allowed'
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'center'
    },
    hint: {
        fontSize: '14px',
        color: '#6c757d',
        textAlign: 'center',
        marginTop: '10px'
    }
};

function InputWord({
                       word,
                       setWord,
                       onTranslate,
                       onClear,
                       loading = false,
                       placeholder = "Введіть англійське слово..."
                   }) {
    const [focused, setFocused] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!loading && word.trim()) {
            onTranslate();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder={placeholder}
                        style={{
                            ...styles.input,
                            ...(focused ? styles.inputFocus : {})
                        }}
                        disabled={loading}
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>

                <div style={styles.buttonGroup}>
                    <button
                        type="submit"
                        style={{
                            ...styles.button,
                            ...styles.primaryButton,
                            ...(loading || !word.trim() ? styles.buttonDisabled : {})
                        }}
                        disabled={loading || !word.trim()}
                    >
                        {loading ? '🔍 Шукаю...' : '🔍 Перекласти'}
                    </button>

                    {word && (
                        <button
                            type="button"
                            onClick={onClear}
                            style={{
                                ...styles.button,
                                ...styles.secondaryButton
                            }}
                            disabled={loading}
                        >
                            🗑️ Очистити
                        </button>
                    )}
                </div>
            </form>

            <div style={styles.hint}>
                💡 Підказка: Введіть англійське слово та натисніть Enter або кнопку "Перекласти"
            </div>
        </div>
    );
}

export default InputWord;