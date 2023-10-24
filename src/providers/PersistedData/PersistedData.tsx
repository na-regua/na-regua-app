import {AppDispatch} from '@/store/Store';
import {getPersistedUser, getSkipPre} from '@/store/slicers';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

const PersistedData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPersistedUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSkipPre());
  }, [dispatch]);

  return <></>;
};

export default PersistedData;
