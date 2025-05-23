import React from 'react';
import TranslationResult from '../src/components/TranslationResult';

export default {
    title: 'Components/TranslationResult',
    component: TranslationResult,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Компонент для відображення результатів перекладу, включаючи визначення, частину мови та синоніми.'
            }
        }
    },
    argTypes: {
        translationData: {
            control: 'object',
            description: 'Дані перекладу з API'
        },
        partOfSpeechData: {
            control: 'object',
            description: 'Дані про частину мови з API'
        },
        loading: {
            control: 'boolean',
            description: 'Показує стан завантаження'
        }
    }
};

const Template = (args) => (
    <div style={{ width: '500px', padding: '20px' }}>
        <TranslationResult {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    translationData: null,
    partOfSpeechData: null,
    loading: false
};
Default.parameters = {
    docs: {
        description: {
            story: 'Початковий стан без результатів перекладу.'
        }
    }
};

export const Loading = Template.bind({});
Loading.args = {
    translationData: null,
    partOfSpeechData: null,
    loading: true
};
Loading.parameters = {
    docs: {
        description: {
            story: 'Стан завантаження з анімованим спінером.'
        }
    }
};

export const CompleteTranslation = Template.bind({});
CompleteTranslation.args = {
    translationData: {
        word: 'hello',
        translation: 'a greeting or expression of goodwill',
        phonetic: '/həˈloʊ/'
    },
    partOfSpeechData: {
        word: 'hello',
        partOfSpeech: 'interjection',
        partOfSpeechUa: 'вигук',
        synonyms: ['hi', 'hey', 'greetings', 'salutation']
    },
    loading: false
};
CompleteTranslation.parameters = {
    docs: {
        description: {
            story: 'Повний результат перекладу з усіма даними: визначення, фонетика, частина мови та синоніми.'
        }
    }
};

export const TranslationOnly = Template.bind({});
TranslationOnly.args = {
    translationData: {
        word: 'computer',
        translation: 'an electronic device for storing and processing data',
        phonetic: '/kəmˈpjuːtər/'
    },
    partOfSpeechData: null,
    loading: false
};
TranslationOnly.parameters = {
    docs: {
        description: {
            story: 'Результат лише з даними перекладу, без інформації про частину мови.'
        }
    }
};

export const NoSynonyms = Template.bind({});
NoSynonyms.args = {
    translationData: {
        word: 'unique',
        translation: 'being the only one of its kind; unlike anything else',
        phonetic: '/juːˈniːk/'
    },
    partOfSpeechData: {
        word: 'unique',
        partOfSpeech: 'adjective',
        partOfSpeechUa: 'прикметник',
        synonyms: []
    },
    loading: false
};
NoSynonyms.parameters = {
    docs: {
        description: {
            story: 'Результат без синонімів - секція синонімів не відображається.'
        }
    }
};

export const LongDefinition = Template.bind({});
LongDefinition.args = {
    translationData: {
        word: 'serendipity',
        translation: 'the occurrence and development of events by chance in a happy or beneficial way; a pleasant surprise or fortunate discovery that happens by accident',
        phonetic: '/ˌserənˈdɪpəti/'
    },
    partOfSpeechData: {
        word: 'serendipity',
        partOfSpeech: 'noun',
        partOfSpeechUa: 'іменник',
        synonyms: ['chance', 'fortune', 'luck', 'providence', 'destiny']
    },
    loading: false
};
LongDefinition.parameters = {
    docs: {
        description: {
            story: 'Результат з довгим визначенням для тестування компонування тексту.'
        }
    }
};