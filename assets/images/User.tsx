import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const User = () => {
  return (
    <Svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <Circle cx="36" cy="36" r="36" fill="#352C74" />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M41.5048 34.3128C44.1078 32.5471 45.8182 29.5642 45.8182 26.1818C45.8182 20.7594 41.4224 16.3636 36 16.3636C30.5776 16.3636 26.1818 20.7594 26.1818 26.1818C26.1818 29.5595 27.8875 32.5389 30.4845 34.3055C22.3259 35.6052 16.3637 39.7296 16.3636 44.6165V44.6165V56.1205H55.5799V44.6165V44.6165C55.5799 39.7387 49.6399 35.6206 41.5048 34.3128Z"
        fill="white"
      />
    </Svg>
  );
};
export default User;
