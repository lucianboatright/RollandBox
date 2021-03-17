module.export = {
    future: {
        removeDeprecatedGapUtilities: true
    },

    theme: {
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
        }
    },
}