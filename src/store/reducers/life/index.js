import { clamp } from 'lodash';
import { lifelikeTheme } from 'theme';

import { Neighborhoods } from 'features/life/neighborhoods';

import { createCells } from 'store/reducers/life/createCells';
import { getNextCells as stepCells } from 'store/reducers/life/getNextCells';
import { speedToMs, getDensity } from 'store/reducers/life/utilities';

const CLEAR_CELLS = 'CLEAR_CELLS';
const DECREMENT_SPEED = 'DECREMENT_SPEED';
const GET_NEXT_CELLS = 'GET_NEXT_CELLS';
const INCREMENT_SPEED = 'INCREMENT_SPEED';
const RANDOMIZE_CELLS = 'RANDOMIZE_CELLS';
const SET_ARRAY_OF_CELLS = 'SET_ARRAY_OF_CELLS';
const TRANSLATE_CELLS = 'TRANSLATE_CELLS';
const SET_BORN = 'SET_BORN';
const SET_COLOR_MODE = 'SET_COLOR_MODE';
const SET_FPS = 'SET_FPS';
const SET_PREVIOUS_FRAMETIME = 'SET_PREVIOUS_FRAMETIME';
const SET_GRID = 'SET_GRID';
const SET_NEIGHBORHOOD = 'SET_NEIGHBORHOOD';
const SET_SPEED = 'SET_SPEED';
const SET_SURVIVE = 'SET_SURVIVE';
const TOGGLE_IS_RUNNING = 'TOGGLE_IS_RUNNING';
const TOGGLE_SHOULD_SHOW_GRIDLINES = 'TOGGLE_SHOULD_SHOW_GRIDLINES';
const TOGGLE_SHOULD_SHOW_HUD = 'TOGGLE_SHOULD_SHOW_HUD';
const TOGGLE_SHOULD_PAUSE_ON_STABLE_STATE =
  'TOGGLE_SHOULD_PAUSE_ON_STABLE_STATE';
const TOGGLE_SHOULD_SWAP_CELL_COLORS = 'TOGGLE_SHOULD_SWAP_CELL_COLORS';
const TOGGLE_SHOULD_WRAP = 'TOGGLE_SHOULD_WRAP';
const SET_IS_RECORDING_ARCHIVE = 'SET_IS_RECORDING_ARCHIVE';
const SET_IS_RECORDING_VIDEO = 'SET_IS_RECORDING_VIDEO';

const initialState = {
  cells: [],
  width: 0,
  height: 0,
  px: window.matchMedia(`(max-width: ${lifelikeTheme.breakpoints.md})`).matches
    ? 3
    : 5,
  neighborhood: Neighborhoods.MOORE,
  born: [false, false, false, true, false, false, false, false, false],
  survive: [false, false, true, true, false, false, false, false, false],
  shouldWrap: true,
  shouldShowGridlines: false,
  isRunning: false,
  isRecordingArchive: false,
  isRecordingVideo: false,
  shouldPauseOnStableState: false,
  shouldShowHUD: false,
  generation: 0,
  population: 0,
  density: 0,
  cellsChanged: true,
  visibleChangeCounter: 0,
  canvasWidth: 0,
  canvasHeight: 0,
  canvasContainerWidth: 0,
  canvasContainerHeight: 0,
  speed: 70,
  msDelay: speedToMs(70),
  fps: 0,
  previousFrameTime: 0,
  lightModeColors: {
    deadCellColor: lifelikeTheme.colors.white,
    aliveCellColor: lifelikeTheme.colors.blue['600'],
    gridlineColor: `${lifelikeTheme.colors.blue['500']}80`,
  },
  darkModeColors: {
    deadCellColor: lifelikeTheme.colors.blue['100'],
    aliveCellColor: '#1A202C', // the Chakra UI background color
    gridlineColor: `${lifelikeTheme.colors.blue['600']}80`,
  },
  shouldSwapCellColors: false,
  colorMode: null,
  colors: {},
  minWidth: 1,
  maxWidth: 2000,
  minHeight: 1,
  maxHeight: 2000,
  minPx: 1,
  maxPx: 25,
  minSpeed: 0,
  maxSpeed: 100,
};

export default function life(state = initialState, action) {
  switch (action.type) {
    case SET_FPS:
      return {
        ...state,
        fps: action.fps,
      };
    case SET_BORN:
      return {
        ...state,
        born: state.born.map((val, i) => (i === action.index ? !val : val)),
      };
    case SET_SURVIVE:
      return {
        ...state,
        survive: state.survive.map((val, i) =>
          i === action.index ? !val : val
        ),
      };
    case RANDOMIZE_CELLS:
      const [randomizedCells, randomizedCellsPopulation] = createCells({
        width: state.width,
        height: state.height,
        fill: 'random',
      });
      return {
        ...state,
        generation: 0,
        cells: randomizedCells,
        cellsChanged: true,
        visibleChangeCounter: state.visibleChangeCounter + 1,
        population: randomizedCellsPopulation,
        density: getDensity(
          randomizedCellsPopulation,
          state.width,
          state.height
        ),
      };
    case CLEAR_CELLS:
      const [clearedCells, clearedCellsPopulation] = createCells({
        width: state.width,
        height: state.height,
        fill: 0,
      });
      return {
        ...state,
        generation: 0,
        cells: clearedCells,
        population: clearedCellsPopulation,
        cellsChanged: true,
        visibleChangeCounter: state.visibleChangeCounter + 1,

        density: getDensity(clearedCellsPopulation, state.width, state.height),
      };
    case TOGGLE_IS_RUNNING:
      return {
        ...state,
        isRunning: !state.isRunning,
      };
    case TOGGLE_SHOULD_WRAP:
      return {
        ...state,
        shouldWrap: !state.shouldWrap,
      };
    case TOGGLE_SHOULD_SHOW_GRIDLINES:
      return {
        ...state,
        shouldShowGridlines: !state.shouldShowGridlines,
        visibleChangeCounter: state.visibleChangeCounter + 1,
      };
    case TOGGLE_SHOULD_SHOW_HUD:
      return {
        ...state,
        shouldShowHUD: !state.shouldShowHUD,
      };
    case TOGGLE_SHOULD_PAUSE_ON_STABLE_STATE:
      return {
        ...state,
        shouldPauseOnStableState: !state.shouldPauseOnStableState,
      };
    case SET_NEIGHBORHOOD:
      return {
        ...state,
        neighborhood: Neighborhoods[action.neighborhood],
      };
    case SET_SPEED: {
      return {
        ...state,
        speed: action.speed,
        msDelay: speedToMs(action.speed),
      };
    }
    case INCREMENT_SPEED: {
      const newSpeed = clamp(state.speed + 5, 0, 100);

      return {
        ...state,
        speed: newSpeed,
        msDelay: speedToMs(newSpeed),
      };
    }
    case DECREMENT_SPEED: {
      const newSpeed = clamp(state.speed - 5, 0, 100);
      return {
        ...state,
        speed: newSpeed,
        msDelay: speedToMs(newSpeed),
      };
    }
    case SET_PREVIOUS_FRAMETIME: {
      return {
        ...state,
        previousFrameTime: action.previousFrameTime,
      };
    }
    case GET_NEXT_CELLS: {
      const [nextCells, nextPopulation, cellsChanged] = stepCells(
        state.cells,
        state.width,
        state.height,
        state.born,
        state.survive,
        state.shouldWrap,
        state.neighborhood
      );
      return {
        ...state,
        generation: state.generation + 1,
        cells: nextCells,
        population: nextPopulation,
        cellsChanged: cellsChanged,
        visibleChangeCounter: state.visibleChangeCounter + 1,

        density: getDensity(nextPopulation, state.width, state.height),
      };
    }
    case SET_GRID: {
      const [setGridCells, setGridPopulation] = createCells({
        width: action.payload.width,
        height: action.payload.height,
        fill: state.cells.length ? state.cells : 'random',
      });
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        px: action.payload.px,
        canvasWidth: action.payload.canvasWidth,
        canvasHeight: action.payload.canvasHeight,
        canvasContainerWidth: action.payload.canvasContainerWidth,
        canvasContainerHeight: action.payload.canvasContainerHeight,
        cells: setGridCells,
        cellsChanged: true,
        visibleChangeCounter: state.visibleChangeCounter + 1,

        population: setGridPopulation,
        density: getDensity(
          setGridPopulation,
          action.payload.width,
          action.payload.height
        ),
      };
    }
    case SET_COLOR_MODE: {
      const { colorMode } = action;
      const { shouldSwapCellColors } = state;
      let aliveCellColor, deadCellColor, gridlineColor;

      if (colorMode === 'light') {
        if (shouldSwapCellColors) {
          aliveCellColor = state.lightModeColors.deadCellColor;
          deadCellColor = state.lightModeColors.aliveCellColor;
        } else {
          aliveCellColor = state.lightModeColors.aliveCellColor;
          deadCellColor = state.lightModeColors.deadCellColor;
        }
        gridlineColor = state.lightModeColors.gridlineColor;
      } else {
        if (shouldSwapCellColors) {
          aliveCellColor = state.darkModeColors.deadCellColor;
          deadCellColor = state.darkModeColors.aliveCellColor;
        } else {
          aliveCellColor = state.darkModeColors.aliveCellColor;
          deadCellColor = state.darkModeColors.deadCellColor;
        }
        gridlineColor = state.darkModeColors.gridlineColor;
      }

      return {
        ...state,
        colorMode: colorMode,
        visibleChangeCounter: state.visibleChangeCounter + 1,

        colors: {
          aliveCellColor,
          deadCellColor,
          gridlineColor,
        },
      };
    }
    case TOGGLE_SHOULD_SWAP_CELL_COLORS: {
      const shouldSwapCellColors = !state.shouldSwapCellColors;
      const { colorMode } = state;

      let aliveCellColor, deadCellColor, gridlineColor;

      if (colorMode === 'light') {
        if (shouldSwapCellColors) {
          aliveCellColor = state.lightModeColors.deadCellColor;
          deadCellColor = state.lightModeColors.aliveCellColor;
        } else {
          aliveCellColor = state.lightModeColors.aliveCellColor;
          deadCellColor = state.lightModeColors.deadCellColor;
        }
        gridlineColor = state.lightModeColors.gridlineColor;
      } else {
        if (shouldSwapCellColors) {
          aliveCellColor = state.darkModeColors.deadCellColor;
          deadCellColor = state.darkModeColors.aliveCellColor;
        } else {
          aliveCellColor = state.darkModeColors.aliveCellColor;
          deadCellColor = state.darkModeColors.deadCellColor;
        }
        gridlineColor = state.darkModeColors.gridlineColor;
      }

      return {
        ...state,
        shouldSwapCellColors,
        visibleChangeCounter: state.visibleChangeCounter + 1,

        colors: { aliveCellColor, deadCellColor, gridlineColor },
      };
    }
    case SET_ARRAY_OF_CELLS: {
      let newArrayOfCells = [...state.cells];

      action.arrayOfCells.forEach(({ x, y }) => {
        if (state.shouldWrap) {
          if (x < 0) {
            x = state.width + x;
          } else if (x >= state.width) {
            x = x - state.width;
          }

          if (y < 0) {
            y = state.height + y;
          } else if (y >= state.height) {
            y = y - state.height;
          }

          newArrayOfCells[x][y] = action.invertState ? 0 : 1;
        } else {
          if (x >= 0 && x < state.width && y >= 0 && y < state.height) {
            newArrayOfCells[x][y] = action.invertState ? 0 : 1;
          }
        }
      });

      let newPopulation = newArrayOfCells
        .flat()
        .reduce((sum, val) => sum + val, 0);

      return {
        ...state,
        cells: newArrayOfCells,
        population: newPopulation,
        cellsChanged: true,
        visibleChangeCounter: state.visibleChangeCounter + 1,

        density: getDensity(newPopulation, state.width, state.height),
      };
    }
    case TRANSLATE_CELLS: {
      const { width, height } = state;
      const { deltaX, deltaY } = action;

      let translatedCells = Array.from(Array(width), () => new Array(height));

      if (state.shouldWrap) {
        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            let _x = x + deltaX;
            let _y = y + deltaY;

            if (x + deltaX < 0) {
              _x = state.width + x + deltaX;
            } else if (x + deltaX >= state.width) {
              _x = x + deltaX - state.width;
            }

            if (y + deltaY < 0) {
              _y = state.height + y + deltaY;
            } else if (y + deltaY >= state.height) {
              _y = y + deltaY - state.height;
            }

            translatedCells[_x][_y] = state.cells[x][y];
          }
        }
      } else {
        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            let _x = x - deltaX;
            let _y = y - deltaY;

            translatedCells[x][y] =
              _x >= 0 && _x < width && _y >= 0 && _y < height
                ? state.cells[_x][_y]
                : 0;
          }
        }
      }
      return {
        ...state,
        cells: translatedCells,
        cellsChanged: true,
        visibleChangeCounter: state.visibleChangeCounter + 1,
      };
    }
    case SET_IS_RECORDING_ARCHIVE: {
      return {
        ...state,
        isRecordingArchive: action.isRecordingArchive,
      };
    }
    case SET_IS_RECORDING_VIDEO: {
      return {
        ...state,
        isRecordingVideo: action.isRecordingVideo,
      };
    }
    default:
      return state;
  }
}

export const toggleIsRunning = () => ({ type: TOGGLE_IS_RUNNING });

export const toggleShouldWrap = () => ({ type: TOGGLE_SHOULD_WRAP });

export const toggleShouldShowHUD = () => ({ type: TOGGLE_SHOULD_SHOW_HUD });

export const toggleShouldShowGridlines = () => ({
  type: TOGGLE_SHOULD_SHOW_GRIDLINES,
});

export const toggleShouldPauseOnStableState = () => ({
  type: TOGGLE_SHOULD_PAUSE_ON_STABLE_STATE,
});

export const setIsRecordingVideo = (isRecordingVideo) => ({
  type: SET_IS_RECORDING_VIDEO,
  isRecordingVideo,
});

export const setIsRecordingArchive = (isRecordingArchive) => ({
  type: SET_IS_RECORDING_ARCHIVE,
  isRecordingArchive,
});

export const setGrid = ({
  width,
  height,
  px,
  canvasWidth,
  canvasHeight,
  canvasContainerWidth,
  canvasContainerHeight,
}) => ({
  type: SET_GRID,
  payload: {
    width,
    height,
    px,
    canvasWidth,
    canvasHeight,
    canvasContainerWidth,
    canvasContainerHeight,
  },
});

export const setSpeed = ({ speed }) => ({ type: SET_SPEED, speed });

export const incrementSpeed = () => ({
  type: INCREMENT_SPEED,
});

export const decrementSpeed = () => ({
  type: DECREMENT_SPEED,
});

export const setPreviousFrameTime = (previousFrameTime) => ({
  type: SET_PREVIOUS_FRAMETIME,
  previousFrameTime,
});

export const setNeighborhood = ({ neighborhood }) => ({
  type: SET_NEIGHBORHOOD,
  neighborhood,
});

export const setBorn = ({ index }) => ({ type: SET_BORN, index });

export const setSurvive = ({ index }) => ({ type: SET_SURVIVE, index });

export const clearCells = () => ({ type: CLEAR_CELLS });

export const randomizeCells = () => ({ type: RANDOMIZE_CELLS });

export const getNextCells = () => ({ type: GET_NEXT_CELLS });

export const setColorMode = ({ colorMode }) => ({
  type: SET_COLOR_MODE,
  colorMode,
});

export const toggleShouldSwapCellColors = () => ({
  type: TOGGLE_SHOULD_SWAP_CELL_COLORS,
});

export const setArrayOfCells = ({ arrayOfCells, invertState }) => ({
  type: SET_ARRAY_OF_CELLS,
  arrayOfCells,
  invertState,
});

export const setFps = (fps) => ({
  type: SET_FPS,
  fps,
});

export const translateCells = ({ deltaX, deltaY }) => ({
  type: TRANSLATE_CELLS,
  deltaX,
  deltaY,
});
