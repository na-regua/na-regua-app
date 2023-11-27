import React, {PropsWithChildren, useState} from 'react';

import {useTranslation} from 'react-i18next';
import Icons from '../Icons/Icons';
import Typography from '../Typography/Typography';
import {CollapseStyle, HeaderStyle} from './styles';

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
      <HeaderStyle onPress={handleExpand} activeOpacity={0.9}>
        <Typography variant="body1" color="black3">
          {title && t(title)}
        </Typography>

        {expand ? (
          <Icons.ArrowUpIcon
            width={24}
            height={24}
            clickable
            onPress={handleExpand}
            color="default"
          />
        ) : (
          <Icons.ArrowDownIcon
            width={24}
            height={24}
            clickable
            onPress={handleExpand}
            color="default"
          />
        )}
      </HeaderStyle>
      {expand ? (
        children
      ) : subtitle ? (
        <Typography variant="caption" color="placeholder">
          {t(subtitle)}
        </Typography>
      ) : null}
    </CollapseStyle>
  );
};

export default Collapse;
