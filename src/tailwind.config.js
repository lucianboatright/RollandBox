const colors = require('tailwindcss/colors')

module.export = {
    theme: {
        extend: {
            colors: {
                // transparent: 'transparent',
                // current: 'currentColor',
                'ink': '#000F55',
                'custom-teal': '#008080',
            },

        },
        fontSize: {
            sm: ['14px', '20px'],
            base: ['16px', '24px'],
            lg: ['20px', '28px'],
            xl: ['24px', '32px'],
        },
        fill: (theme) => ({
            red: theme('color.red.primary')
        }),
    },
    variants: {
        display: ['ground-hover']
    }
}