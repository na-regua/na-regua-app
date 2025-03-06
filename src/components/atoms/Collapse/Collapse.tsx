import React, {PropsWithChildren, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Box} from '../Box/Box';
import Typography from '../Typography/Typography';
import {CollapseStyle, DownIconStyled, HeaderStyle} from './styles';

interface ICollapseProps {
  title?: string;
  subtitle?: string;
}

const Collapse: React.FC<PropsWithChildren<ICollapseProps>> = ({
  title,
  subtitle,
  children,
}) => {
  const [expand, setExpand] = useState(false);
  const {t} = useTranslation();

  const handleExpand = () => {
    setExpand(curr => !curr);

    flipValue.value = withSpring(expand ? 0 : 180);
  };

  const flipValue = useSharedValue(0);

  const flipStyle = useAnimatedStyle(() => ({
    transform: [{rotateX: `${flipValue.value}deg`}],
  }));

  return (
    <CollapseStyle>
      <HeaderStyle disabled>
        <Typography variant="body1" color="black3">
          {title && t(title)}
        </Typography>

        <Box entering={FadeInUp} style={flipStyle}>
          <DownIconStyled
            width={24}
            height={24}
            disabled={false}
            onPress={handleExpand}
            color="default"
          />
        </Box>
      </HeaderStyle>
      {expand ? (
        <Box entering={FadeInUp.duration(300)} gap={12}>
          {children}
        </Box>
      ) : subtitle ? (
        <Typography variant="caption" color="placeholder">
          {t(subtitle)}
        </Typography>
      ) : null}
    </CollapseStyle>
  );
};

export default Collapse;
