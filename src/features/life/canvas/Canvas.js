import React from 'react';
import PropTypes from 'prop-types';

import { Flex, useTheme, useColorMode } from '@chakra-ui/core';

export const Canvas = React.memo(
  ({
    canvasRef,
    canvasWidth,
    canvasHeight,
    canvasContainerRef,
    canvasGridOverlayRef,
    canvasDrawOverlayRef,
    isRunning,
    ...rest
  }) => {
    const theme = useTheme();
    const { colorMode } = useColorMode();

    return (
      <Flex
        {...rest}
        ref={canvasContainerRef}
        position="relative"
        justify="center"
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            padding: '0',
            margin: '0',
            display: 'flex',
            justifyContent: 'stretch',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: canvasWidth || '100%',
              height: canvasHeight || '100%',
              boxSizing: 'border-box',
              borderRadius: '1px',
              border: `1px solid ${
                colorMode === 'light'
                  ? theme.colors.blackAlpha[300]
                  : theme.colors.whiteAlpha[300]
              }`,
            }}
          ></canvas>
          <canvas
            ref={canvasGridOverlayRef}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: '1',
              width: canvasWidth || '100%',
              height: canvasHeight || '100%',
              boxSizing: 'border-box',
              borderRadius: '1px',
              border: '1px solid transparent',
            }}
          ></canvas>
          <canvas
            ref={canvasDrawOverlayRef}
            style={{
              touchAction: 'none',
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: '2',
              width: canvasWidth || '100%',
              height: canvasHeight || '100%',
              boxSizing: 'border-box',
              borderRadius: '1px',
              border: '1px solid transparent',
            }}
          ></canvas>
        </div>
      </Flex>
    );
  }
);

Canvas.propTypes = {
  canvasRef: PropTypes.object.isRequired,
  canvasWidth: PropTypes.number,
  canvasHeight: PropTypes.number,
  canvasContainerRef: PropTypes.object.isRequired,
  canvasContainerWidth: PropTypes.number,
  canvasContainerHeight: PropTypes.number,
  canvasGridOverlayRef: PropTypes.object.isRequired,
  canvasDrawOverlayRef: PropTypes.object.isRequired,
  isRunning: PropTypes.bool.isRequired,
};
