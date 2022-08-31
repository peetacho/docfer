import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const styles = {
    global: props => ({
        body: {
            bg: mode('white', 'inherit')(props),
            overflow: "overlay"
        },
        '*': {
            fontFamily: 'Inter, Lexend'
        }
    })
}

const colors = {
    brand: {
        400: "#1C64F2"
    },
    sub: {
        400: "#1C64F212"
    },
    primary: {
        400: "#111928"
    },
    secondary: {
        400: "#4B5563"
    },
    bgPrimary: {
        400: "white"
    },
    bgSecondary: {
        400: "#F7F8FA"
    }
}

const fonts = {
    fonts: {
        heading: 'Inter, Lexend, sans-serif',
        body: 'Inter, Lexend, sans-serif',
    }
}

const theme = extendTheme({ config, styles, fonts, colors })

export default theme