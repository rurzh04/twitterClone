//@ts-nocheck

import { createTheme } from '@mui/material/styles';

import { red } from '@mui/material/colors';

export const theme = createTheme({
    typography: {
        fontFamily: [
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFront',
            'Segoe UI',
            'Roboto',
            'Ubuntu',
            'Helvetica Neue',
            'sans-serif',
        ].join(','),
    },
    palette: {
        default: {
            dark: '#000',
        },
        primary: {
            main: 'rgb(29,161,242)',
            dark: 'rgb(26,145,218)',
            contrastText: '#fff',
        },
        secondary: {
            main: 'rgb(26,145,218)',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
        text: {
            primary: '#14171a',
        },
    },
    shadows: [],

    overrides: {
        MuiButton: {
            root: {
                borderRadius: 30,
                textTransform: 'none',
                fontSize: 16,
                height: 40,
                fontWeight: 700,
            },
            textPrimary: {
                paddingLeft: 20,
                paddingRight: 20,
            },
            outlinedPrimary: {
                // Corrected from 'outlinePrimary' to 'outlinedPrimary'
                borderColor: 'rgb(29,161,243)',
            },
        },
        '& a': {
            color: 'inherit',
            TextDecoderation: 'none',
        },
        MuiFilledInput: {
            underline: {
                '&:after': {
                    borderBottomWidth: '2px',
                },
                '&:before': {
                    borderColor: '#000',
                    borderBottomWidth: '2px',
                },
            },
            input: {
                backgroundColor: 'rgb(245,248,250)',
            },
        },
        MuiDialog: {
            paper: {
                borderRadius: 15,
            },
        },

        MuiDialogTitle: {
            root: {
                borderBottom: '1px solid rgb(204,214,221)',
                marginBottom: 10,
                padding: '10px 15px',
                '& h2': {
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 800,
                },
                '& button': {
                    padding: 8,
                    marginRight: 20,
                },
            },
        },
    },
});

export default theme;
