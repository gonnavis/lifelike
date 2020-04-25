import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { Text, Radio, Box, Flex } from '@chakra-ui/core';

import { setNeighborhood } from 'store/reducers/life';
import { Neighborhoods } from 'features/life/neighborhoods';

const NeighborhoodRadio = ({ ...rest }) => {
  const neighborhood = useSelector(
    (state) => state.life.neighborhood,
    shallowEqual
  );
  const dispatch = useDispatch();

  const handleNeighborhoodChange = React.useCallback(
    (neighborhood) => {
      dispatch(setNeighborhood({ neighborhood }));
    },
    [dispatch]
  );

  return (
    <Flex {...rest} fontSize="sm">
      <Text>n ~></Text>
      <Flex px="0.5rem" justify="space-between" flex="1 1 auto">
        {Neighborhoods.types.map((n, i) => (
          <Box key={`neighborhood${i}`}>
            <Radio
              value={n}
              size="sm"
              isChecked={neighborhood.id === n}
              onChange={() => handleNeighborhoodChange(n)}
            >
              <Text>{Neighborhoods[n].name}</Text>
            </Radio>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default React.memo(NeighborhoodRadio);
