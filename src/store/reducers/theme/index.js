import { lifelikeTheme } from 'theme';

import Color from 'color';

const SET_THEME_COLOR = 'SET_THEME_COLOR';

const initialState = {
  theme: {
    ...lifelikeTheme,
    colors: {
      ...lifelikeTheme.colors,
      blue: lifelikeTheme.colors['green'],
    },
  },
  aliveCellColor: null, // lifelikeTheme.colors.green['600'],
  deadCellColor: null, // lifelikeTheme.colors.lightBackground,
  gridlineColor: null, // `${lifelikeTheme.colors.green['500']}80`,
  themeColor: 'green',
  colorMode: 'light',
  shouldSwapCellColors: false,
  headerColor: null, // lifelikeTheme.colors.green['600'],
  sliderThumbBgColor: null, // lifelikeTheme.colors.lightBackground,
  sliderDisabledThumbBgColor: null, // lifelikeTheme.colors.gray['300'],
  sliderThumbColor: null, // lifelikeTheme.colors.green['600'],
  buttonBackgroundColor: null,
  buttonBackgroundColorHover: null,
};

export default function theme(state = initialState, action) {
  switch (action.type) {
    case SET_THEME_COLOR: {
      const {
        themeColor = state.themeColor,
        colorMode = state.colorMode,
        shouldSwapCellColors = state.shouldSwapCellColors,
      } = action;

      let aliveCellColor,
        deadCellColor,
        gridlineColor,
        headerColor,
        sliderThumbBgColor,
        sliderThumbColor,
        sliderDisabledThumbBgColor,
        buttonBackgroundColor,
        buttonBackgroundColorHover;

      if (colorMode === 'light') {
        if (shouldSwapCellColors) {
          deadCellColor = lifelikeTheme.colors[themeColor]['600'];
          aliveCellColor = lifelikeTheme.colors.lightBackground;
        } else {
          deadCellColor = lifelikeTheme.colors.lightBackground;
          aliveCellColor = lifelikeTheme.colors[themeColor]['600'];
        }
        headerColor = lifelikeTheme.colors[themeColor]['800'];
        sliderThumbBgColor = lifelikeTheme.colors.lightBackground;
        sliderDisabledThumbBgColor = lifelikeTheme.colors.gray['300'];
        sliderThumbColor = lifelikeTheme.colors[themeColor]['600'];
        gridlineColor = `${lifelikeTheme.colors[themeColor]['500']}80`;
        buttonBackgroundColor = 'blackAlpha.200';
        buttonBackgroundColorHover = 'blackAlpha.300';
      } else {
        if (shouldSwapCellColors) {
          deadCellColor = lifelikeTheme.colors[themeColor]['200'];
          aliveCellColor = lifelikeTheme.colors.darkBackground;
        } else {
          deadCellColor = lifelikeTheme.colors.darkBackground;
          aliveCellColor = lifelikeTheme.colors[themeColor]['200'];
        }
        headerColor = lifelikeTheme.colors[themeColor]['50'];
        sliderThumbBgColor = lifelikeTheme.colors[themeColor]['200'];
        sliderDisabledThumbBgColor = Color(
          lifelikeTheme.colors[themeColor]['200']
        )
          .desaturate(0.8)
          .darken(0.5)
          .hex();
        sliderThumbColor = lifelikeTheme.colors.darkBackground;
        gridlineColor = `${lifelikeTheme.colors[themeColor]['600']}80`;
        buttonBackgroundColor = 'whiteAlpha.100';
        buttonBackgroundColorHover = 'whiteAlpha.300';
      }

      return {
        ...state,
        aliveCellColor,
        deadCellColor,
        gridlineColor,
        headerColor,
        sliderThumbBgColor,
        sliderThumbColor,
        sliderDisabledThumbBgColor,
        themeColor,
        colorMode,
        shouldSwapCellColors,
        buttonBackgroundColor,
        buttonBackgroundColorHover,
        theme: {
          ...lifelikeTheme,
          colors: {
            ...lifelikeTheme.colors,
            blue: lifelikeTheme.colors[themeColor],
          },
        },
      };
    }
    default:
      return state;
  }
}

export const setThemeColor = ({
  themeColor,
  colorMode,
  shouldSwapCellColors,
}) => {
  return {
    type: SET_THEME_COLOR,
    themeColor,
    colorMode,
    shouldSwapCellColors,
  };
};
