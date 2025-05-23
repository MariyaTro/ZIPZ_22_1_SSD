import React from 'react';
import InputWord from '../src/components/InputWord';

export default {
    title: 'Components/InputWord',
    component: InputWord,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Компонент для введення слова, яке потрібно перекласти. Підтримує введення з клавіатури та кнопки.'
            }
        }
    },
    argTypes: {
        word: {
            control: 'text',
            description: 'Поточне значення слова в інпуті'
        },
        loading: {
            control: 'boolean',
            description: 'Показує стан завантаження'
        },
        placeholder: {
            control: 'text',
            description: 'Текст placeholder для інпуту'
        },
        setWord: {
            action: 'setWord',
            description: 'Callback для зміни значення слова'
        },
        onTranslate: {
            action: 'onTranslate',
            description: 'Callback для запуску перекладу'
        },
        onClear: {
            action: 'onClear',
            description: 'Callback для очищення форми'
        }
    }
};

const Template = (args) => (
    <div style={{ width: '400px', padding: '20px' }}>
        <InputWord {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    word: '',
    loading: false,
    placeholder: 'Введіть англійське слово...'
};
Default.parameters = {
    docs: {
        description: {
            story: 'Базовий стан компонента з порожнім інпутом.'
        }
    }
};

export const WithWord = Template.bind({});
WithWord.args = {
    word: 'hello',
    loading: false,
    placeholder: 'Введіть англійське слово...'
};
WithWord.parameters = {
    docs: {
        description: {
            story: 'Компонент з введеним словом, показує кнопку очищення.'
        }
    }
};

export const Loading = Template.bind({});
Loading.args = {
    word: 'translate',
    loading: true,
    placeholder: 'Введіть англійське слово...'
};
Loading.parameters = {
    docs: {
        description: {
            story: 'Стан завантаження з заблокованими контролами.'
        }
    }
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
    word: '',
    loading: false,
    placeholder: 'Type English word here...'
};
CustomPlaceholder.parameters = {
    docs: {
        description: {
            story: 'Компонент з кастомним placeholder текстом.'
        }
    }
};

export const LongWord = Template.bind({});
LongWord.args = {
    word: 'antidisestablishmentarianism',
    loading: false,
    placeholder: 'Введіть англійське слово...'
};
LongWord.parameters = {
    docs: {
        description: {
            story: 'Тест з довгим словом для перевірки адаптивності.'
        }
    }
};