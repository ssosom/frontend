import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const Kakao = () => {
  return (
    <Svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <Circle cx="36" cy="36" r="36" fill="#FAE100" />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M36.5 49C46.7173 49 55 42.5081 55 34.5C55 26.4919 46.7173 20 36.5 20C26.2827 20 18 26.4919 18 34.5C18 38.7673 20.3519 42.604 24.095 45.2573L22.7519 49.5387C22.1732 51.3832 24.2881 52.8939 25.8452 51.7485L30.6039 48.248C32.4557 48.7357 34.4385 49 36.5 49Z"
        fill="#3C1E1E"
      />
    </Svg>
  );
};
export default Kakao;
