import { createCss } from "@stitches/react";
import { sand } from '@radix-ui/colors'

export const { styled, css, global, getCssString, keyframes } = createCss({
    theme: {
        colors: {
            ...sand,
            white: 'rgba(255,255,255,1)',
            black: 'rgba(0,0,0,1)',
            background: sand.sand2,
            foreground: sand.sand11,
            text: sand.sand2,
            pink: '#FF97CA',
            green: '#1FCF6A',
            orange: '#FF8339',
            blue: '#7187FE',
            yellow: '#EDF41A',
        },
        space: {
            0: "4px",
            1: "8px",
            2: "16px",
            3: "24px",
            4: "32px",
            5: "48px",
        },
        fontSizes: {
            6: "0.8rem",
            5: "1.25rem",
            4: "1.563rem",
            3: "1.953rem",
            2: "2.441rem",
            1: "3.052rem",
            p: "1rem",
        },
        fonts: {
            default: "Satoshi-Variable, Helvetica, Arial, sans-serif",
            data:"SourceCodeVariable-Roman"
        },
        fontWeights: {
            min:300,
            max:900,
        },
        lineHeights: {
            1: "125%",
            2: "120%",
            3: "96%",
            4: "102%",
            5: "102%",
            6: "98%",
            p: "140%;",
        },
        letterSpacings: {},
        sizes: {
            0: "4px",
            1: "8px",
            2: "16px",
            3: "24px",
            4: "32px",
            5: "48px",
            6: "96px",
            7: "124px",
        },
        borderWidths: {},
        borderStyles: {},
        radii: {
            1: "4px",
            2: "8px",
            round: "9999px",
        },
        shadows: {
            normal: "0px 4px 14px rgba(0, 0, 0, 0.7)",
        },
        zIndices: {},
        transitions: {
            fontWeight:'.45s ease-out',
            all: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            color: "color 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            background: "background 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        },
    },
    media: {
        bp1: "(max-width: 544)",
        bp2: "(max-width: 544), (min-width: 768px)",
        bp3: "(min-width: 1024px)",
    },
});

export const fontWeightAnimation = keyframes({
    '0%': { fontWeight: '$min' },
    '20%': { fontWeight: '$max' },
    '100%': { fontWeight: '$max' },

});


//font weights are from 300—900 
export const globalStyles = global({
    "*": {
        margin: 0,
        padding: 0,
        fontSize: "16px",
        fontWeight:'300',
        fontFamily: "Satoshi-Variable, San Francisco, Helvetica, Arial, sans-serif",
    },
    "body, html, #__next": {
        background: '$background',
        minHeight: "100%", height: "100%" },
    h1: { fontSize: "$1", lineHeight: "$6", fontWeight: "300" },
    h2: { fontSize: "$2", lineHeight: "$5" },
    h3: { fontSize: "$3", lineHeight: "$4", fontWeight: "300" },
    h4: { fontSize: "$4", lineHeight: "$3", fontWeight: "300" },
    h5: { fontSize: "$5", lineHeight: "$2", fontWeight: "300" },
    p: { fontSize: "$p", lineHeight: "$p", fontWeight: "300" },
    span: { fontSize: "$p", lineHeight: "$p", fontWeight: "300" },
    b: {
        fontWeight: "500",
    },
    hr: {
        border: 0,
        height: "1px",
        margin: "0",
        padding: "0",
    },
   '@font-face': [{
    fontFamily: 'Satoshi-Variable',
    src: 
    "url('/fonts/fonts/Satoshi-Variable.woff2') format('woff2'),"+
    "url('/fonts/fonts/Satoshi-Variable.woff') format('woff')," +
    "url('/fonts/fonts/Satoshi-Variable.ttf') format('truetype')",
    fontWeight: '300 900',
    fontDisplay: 'swap',
    fontStyle: 'normal'
    },
    {
    fontFamily: 'SourceCodeVariable-Roman',
    src: 
    "url('/fonts/fonts/SourceCodeVariable-Roman.otf.woff2') format('woff2'),"+
    "url('/fonts/fonts/SourceCodeVariable-Roman.ttf') format('truetype')",
    fontWeight: '300 900',
    fontDisplay: 'swap',
    fontStyle: 'normal'
    },

    ],
    // SourceCodeVariable-Roman
    // "@font-face": [
    //     {
    //         fontFamily: "Graphik",
    //         fontWeight: "100",
    //         src: 'local("Graphik-Regular.woff"), url("/fonts/Graphik-Regular.woff")',
    //     },
    //     {
    //         fontFamily: "Graphik",
    //         fontWeight: "300",
    //         src: 'local("Graphik-Semibold.woff"), url("/fonts/Graphik-Semibold.woff")',
    //     },
    // ],
});