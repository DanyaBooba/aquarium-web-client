import { extendTheme } from '@mui/joy/styles';
import {
    themeLight0,
    themeLight1,
    themeLight2,
    themeLight3,
    themeLight4,
    themeLight5,
    themeLight6,
    themeLight7,
    themeLight8,
    themeLight9,
    themeLight10,
} from './variants/themes-light';
import {
    themeDark0,
    themeDark1,
    themeDark2,
    themeDark3,
    themeDark4,
    themeDark5,
    themeDark6,
    themeDark7,
    themeDark8,
    themeDark9,
    themeDark10,
} from './variants/themes-dark';

export function createTheme(lightVariant = '0', darkVariant = '0') {
    const light = {
        '0': themeLight0,
        '1': themeLight1,
        '2': themeLight2,
        '3': themeLight3,
        '4': themeLight4,
        '5': themeLight5,
        '6': themeLight6,
        '7': themeLight7,
        '8': themeLight8,
        '9': themeLight9,
        '10': themeLight10,
    };

    const dark = {
        '0': themeDark0,
        '1': themeDark1,
        '2': themeDark2,
        '3': themeDark3,
        '4': themeDark4,
        '5': themeDark5,
        '6': themeDark6,
        '7': themeDark7,
        '8': themeDark8,
        '9': themeDark9,
        '10': themeDark10,
    };

    return extendTheme({
        colorSchemes: {
            light: light[lightVariant] ?? themeLight0,
            dark: dark[darkVariant] ?? themeDark0,
        },
    });
}
