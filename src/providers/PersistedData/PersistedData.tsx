import {AppDispatch} from '@/store/Store';
import {getPersistedUser} from '@/store/slicers';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

const PersistedData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPersistedUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default PersistedData;
