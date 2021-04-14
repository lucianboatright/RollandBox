module.export = {
    future: {
        removeDeprecatedGapUtilities: true
    },

    theme: {
        fontSize: {
            sm: ['14px', '20px'],
            base: ['16px', '24px'],
            lg: ['20px', '28px'],
            xl: ['24px', '32px'],
        },
        fill: (theme) => ({
            red: theme('color.red.primary')
        }),
        color: {
            white: '#ffffff',
            blue: {
                medium: '#005c98'
            },
            black: {
                light: '#262626',
                faded: '#00000059'
            },
            grey: {
                base: '#616161',
                background: '#fafafa',
                primary: '#dbdbdb'
            },
            red: {
                primary: '#ed4956'
            }
        },
    },
    variants: {
        display: ['ground-hover']
    }
}