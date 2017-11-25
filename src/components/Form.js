import React from 'react';

import Columns from 'grommet/components/Columns';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';

export default ({ history }) => {
  const handleRedirect = type => {
    return e => {
      e.preventDefault();

      history.push(type);
    };
  };

  return (
    <Columns justify="center" size="medium" maxCount={2}>
      <Box pad="medium">
        <Button
          label="Je demenage"
          primary={true}
          onClick={handleRedirect('demenage')}
        />
      </Box>
      <Box pad="medium">
        <Button
          label="Trouver des addresses"
          primary={true}
          onClick={handleRedirect('adresses')}
        />
      </Box>
    </Columns>
  );
};
