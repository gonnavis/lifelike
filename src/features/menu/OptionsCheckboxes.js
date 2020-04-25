import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Flex } from '@chakra-ui/core';

import {
  toggleShouldShowGridlines,
  toggleShouldWrap,
  toggleShouldShowHUD,
  toggleShouldPauseOnStableState,
  // toggleShouldSwapCellColors,
} from 'store/reducers/life';

import { toggleShouldSwapCellColors } from 'store/reducers/theme';

import StyledCheckbox from 'features/menu/StyledCheckbox';

const OptionsCheckboxes = ({ ...rest }) => {
  const shouldShowGridlines = useSelector(
    (state) => state.life.shouldShowGridlines
  );
  const shouldWrap = useSelector((state) => state.life.shouldWrap);
  const shouldShowHUD = useSelector((state) => state.life.shouldShowHUD);
  const shouldPauseOnStableState = useSelector(
    (state) => state.theme.shouldPauseOnStableState
  );
  const shouldSwapCellColors = useSelector(
    (state) => state.theme.shouldSwapCellColors
  );

  const dispatch = useDispatch();

  const handleToggleShouldShowGridlines = React.useCallback(() => {
    dispatch(toggleShouldShowGridlines());
  }, [dispatch]);

  const handleToggleWrap = React.useCallback(() => {
    dispatch(toggleShouldWrap());
  }, [dispatch]);

  const handleToggleShouldShowHUD = React.useCallback(() => {
    dispatch(toggleShouldShowHUD());
  }, [dispatch]);

  const handleToggleShouldPauseOnStableState = React.useCallback(() => {
    dispatch(toggleShouldPauseOnStableState());
  }, [dispatch]);

  const handleToggleShouldSwapCellColors = React.useCallback(() => {
    dispatch(toggleShouldSwapCellColors());
  }, [dispatch]);

  return (
    <Flex {...rest} direction="row" flexWrap="wrap">
      <StyledCheckbox
        isChecked={shouldShowGridlines}
        onChange={handleToggleShouldShowGridlines}
        label="gridlines"
      />

      <StyledCheckbox
        isChecked={shouldWrap}
        onChange={handleToggleWrap}
        label="wrap"
      />

      <StyledCheckbox
        isChecked={shouldShowHUD}
        onChange={handleToggleShouldShowHUD}
        label="HUD"
      />

      <StyledCheckbox
        isChecked={shouldPauseOnStableState}
        onChange={handleToggleShouldPauseOnStableState}
        label="pause on stable state"
      />

      <StyledCheckbox
        isChecked={shouldSwapCellColors}
        onChange={handleToggleShouldSwapCellColors}
        label="swap cell colors"
      />
    </Flex>
  );
};

export default React.memo(OptionsCheckboxes);
