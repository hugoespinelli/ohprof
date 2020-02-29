import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';

function Badge({src, alt, tooltip}) {
  return (
    <Tooltip title={tooltip}>
      <img src={src} width={36} alt={alt} />
    </Tooltip>
);
}

export default Badge;
