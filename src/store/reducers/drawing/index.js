import { clamp } from 'lodash';
import { getBrushPoints } from './getBrushPoints';

const SET_BRUSH = 'SET_BRUSH';
const TOGGLE_IS_IN_DRAW_MODE = 'TOGGLE_IS_IN_DRAW_MODE';
const TOGGLE_IS_INVERT_DRAW = 'TOGGLE_IS_INVERT_DRAW';
const TOGGLE_IS_IN_TRANSLATE_MODE = 'TOGGLE_IS_IN_TRANSLATE_MODE';
const TOGGLE_SHOULD_DRAW_CROSSHAIRS = 'TOGGLE_SHOULD_DRAW_CROSSHAIRS';
const TOGGLE_SHOULD_SHOW_GRIDLINES = 'TOGGLE_SHOULD_SHOW_GRIDLINES';

const initialState = {
  brushShape: 'circle',
  validBrushShapes: ['square', 'circle', 'pencil'],
  brushRadius: 3,
  minBrushRadius: 1,
  maxBrushRadius: 50,
  brushPoints: [],
  brushFill: 'solid',
  validBrushFills: ['solid', 'outline', 'spray'], // 'random' is not so nice
  isInDrawMode: false,
  isInTranslateMode: false,
  isInvertDraw: false,
  shouldDrawCrosshairs: false,
  shouldShowGridlines: false,
};

export default function drawing(state = initialState, action) {
  switch (action.type) {
    case SET_BRUSH: {
      const { brushRadius, brushFill, brushShape } = action;
      const clampedBrushRadius = clamp(
        brushRadius,
        state.minBrushRadius,
        state.maxBrushRadius
      );

      const newBrushPoints = getBrushPoints({
        brushShape: brushShape,
        brushRadius: clampedBrushRadius,
        brushFill: brushFill,
      });

      return {
        ...state,
        brushShape: brushShape,
        brushRadius: clampedBrushRadius,
        brushFill: brushFill,
        brushPoints: newBrushPoints,
      };
    }
    case TOGGLE_IS_IN_DRAW_MODE: {
      return {
        ...state,
        isInDrawMode: !state.isInDrawMode,
      };
    }
    case TOGGLE_IS_INVERT_DRAW: {
      return {
        ...state,
        isInvertDraw: !state.isInvertDraw,
      };
    }
    case TOGGLE_IS_IN_TRANSLATE_MODE: {
      return {
        ...state,
        isInTranslateMode: !state.isInTranslateMode,
      };
    }
    case TOGGLE_SHOULD_DRAW_CROSSHAIRS: {
      return {
        ...state,
        shouldDrawCrosshairs: !state.shouldDrawCrosshairs,
      };
    }
    case TOGGLE_SHOULD_SHOW_GRIDLINES:
      return {
        ...state,
        shouldShowGridlines: !state.shouldShowGridlines,
      };
    default:
      return state;
  }
}

export const setBrush = ({ brushShape, brushRadius, brushFill }) => ({
  type: SET_BRUSH,
  brushShape,
  brushRadius,
  brushFill,
});

export const toggleIsInDrawMode = () => ({ type: TOGGLE_IS_IN_DRAW_MODE });

export const toggleIsInTranslateMode = () => ({
  type: TOGGLE_IS_IN_TRANSLATE_MODE,
});

export const toggleIsInvertDraw = () => ({ type: TOGGLE_IS_INVERT_DRAW });

export const toggleShouldDrawCrosshairs = () => ({
  type: TOGGLE_SHOULD_DRAW_CROSSHAIRS,
});

export const toggleShouldShowGridlines = () => ({
  type: TOGGLE_SHOULD_SHOW_GRIDLINES,
});
