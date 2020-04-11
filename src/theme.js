import { theme } from '@chakra-ui/core';

const breakpoints = ['30em', '48em', '62em', '80em'];
// aliases
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

export const lifelikeTheme = {
  ...theme,
  breakpoints,
  fonts: {
    ...theme.fonts,
    body: "'Fira Code', monospace",
    heading: "'Fira Code', monospace",
  },
  colors: {
    ...theme.colors,
    transparent: 'transparent',
    black: '#252020',
    white: '#ebeaea',
    blue: {
      50: '#E9E2E7',
      100: '#D8CBD4',
      200: '#beaab9',
      300: '#a5889c',
      400: '#8b6680',
      500: '#714465',
      600: '#492c41',
      700: '#34202e',
      800: '#20131b',
      900: '#191016',
    },
    orange: {
      50: '#fdf9f3',
      100: '#f7ecd9',
      200: '#f2debd',
      300: '#eccf9e',
      400: '#e5be7c',
      500: '#ddab54',
      600: '#d49325',
      700: '#b67e1d',
      800: '#906417',
      900: '#543a0e',
    },
    gray: {
      50: '#faf9f8',
      100: '#e3e0db',
      200: '#c8c3b9',
      300: '#a79f8f',
      400: '#928875',
      500: '#746b5a',
      600: '#453f33',
      700: '#322e24',
      800: '#23201a',
      900: '#1e1b15',
    },
  },
};
