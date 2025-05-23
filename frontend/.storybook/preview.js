/** @type { import('@storybook/react').Preview } */
const preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'light',
                    value: '#ffffff',
                },
                {
                    name: 'dark',
                    value: '#333333',
                },
                {
                    name: 'gradient',
                    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                },
            ],
        },
    },
};

export default preview;