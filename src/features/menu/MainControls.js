import React from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaBackward,
  FaForward,
  FaPencilAlt,
  FaArrowsAlt,
} from 'react-icons/fa';
import { Flex, IconButton } from '@chakra-ui/core';

import { toggleIsRunning, getNextCells } from 'store/reducers/life';

import { incrementSpeed, decrementSpeed } from 'store/reducers/performance';

import {
  toggleIsInDrawMode,
  toggleIsInTranslateMode,
} from 'store/reducers/drawing';

import Bookmarks from './Bookmarks';

const MainControls = ({
  isMobile,
  canvasBaseLayerRef,
  canvasGridLayerRef,
  canvasDrawLayerRef,
  ...rest
}) => {
  const dispatch = useDispatch();

  const isRunning = useSelector((state) => state.life.isRunning);

  const speed = useSelector((state) => state.performance.speed);

  const { isInDrawMode, isInTranslateMode } = useSelector(
    (state) => state.drawing
  );

  const handleToggleIsRunning = React.useCallback(
    () => dispatch(toggleIsRunning()),
    [dispatch]
  );

  const handleGetNextCells = React.useCallback(() => dispatch(getNextCells()), [
    dispatch,
  ]);

  const handleToggleIsInDrawMode = React.useCallback(
    () => dispatch(toggleIsInDrawMode()),
    [dispatch]
  );

  const handleToggleIsInTranslateMode = React.useCallback(
    () => dispatch(toggleIsInTranslateMode()),
    [dispatch]
  );

  return (
    <Flex {...rest}>
      <IconButton
        style={{ touchAction: 'manipulation' }}
        icon={isRunning ? FaPause : FaPlay}
        variant="solid"
        aria-label="start/stop"
        onClick={handleToggleIsRunning}
        variantColor="blue"
      />

      <IconButton
        style={{ touchAction: 'manipulation' }}
        isDisabled={isRunning}
        icon={FaStepForward}
        variant="solid"
        aria-label="tick"
        onClick={handleGetNextCells}
        variantColor="blue"
      />

      <IconButton
        style={{ touchAction: 'manipulation' }}
        isDisabled={speed === 0}
        icon={FaBackward}
        variant="solid"
        aria-label="slower"
        onPointerDown={() => dispatch(decrementSpeed())}
        variantColor="blue"
      />

      <IconButton
        style={{ touchAction: 'manipulation' }}
        isDisabled={speed === 100}
        icon={FaForward}
        variant="solid"
        aria-label="faster"
        onPointerDown={() => dispatch(incrementSpeed())}
        variantColor="blue"
      />

      <Bookmarks />

      <IconButton
        style={{ touchAction: 'manipulation' }}
        icon={FaArrowsAlt}
        variant={isInTranslateMode ? 'outline' : 'link'}
        aria-label="toggle translate mode"
        onClick={handleToggleIsInTranslateMode}
        variantColor="blue"
      />

      <IconButton
        style={{ touchAction: 'manipulation' }}
        icon={FaPencilAlt}
        variant={isInDrawMode ? 'outline' : 'link'}
        aria-label="toggle drawing mode"
        onClick={handleToggleIsInDrawMode}
        variantColor="blue"
      />
    </Flex>
  );
};

MainControls.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  canvasBaseLayerRef: PropTypes.object.isRequired,
  canvasGridLayerRef: PropTypes.object.isRequired,
  canvasDrawLayerRef: PropTypes.object.isRequired,
};

export default React.memo(MainControls);
