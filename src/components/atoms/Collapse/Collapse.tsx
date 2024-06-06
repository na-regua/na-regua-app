import React, {PropsWithChildren, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {FadeInUp} from 'react-native-reanimated';
import {Box} from '../Box/Box';
import Typography from '../Typography/Typography';
import {
  CollapseStyle,
  DownIconStyled,
  HeaderStyle,
  UpIconStyled,
} from './styles';

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
  };

  return (
    <CollapseStyle>
      <HeaderStyle disabled>
        <Typography variant="body1" color="black3">
          {title && t(title)}
        </Typography>

        {expand ? (
          <UpIconStyled
            width={24}
            height={24}
            disabled={false}
            onPress={handleExpand}
            color="default"
          />
        ) : (
          <DownIconStyled
            width={24}
            height={24}
            disabled={false}
            onPress={handleExpand}
            color="default"
          />
        )}
      </HeaderStyle>
      {expand ? (
        <Box entering={FadeInUp.duration(300)}>{children}</Box>
      ) : subtitle ? (
        <Typography variant="caption" color="placeholder">
          {t(subtitle)}
        </Typography>
      ) : null}
    </CollapseStyle>
  );
};

export default Collapse;
