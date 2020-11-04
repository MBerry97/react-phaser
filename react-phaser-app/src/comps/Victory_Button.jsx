import React from 'react';
import { Link } from '@reach/router';

const VictoryButton = (props) => {

  return (
    <div>
      <Link to='/win'>
        <button>Win</button>
      </Link>
    </div>
  )
}

export default VictoryButton;