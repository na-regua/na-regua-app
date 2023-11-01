import {AppDispatch} from '@/store/Store';
import {getCurrentUser, getSkipPre} from '@/store/slicers';
import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';

const PersistedData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePersistedUser = useCallback(async () => {
    await dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    handlePersistedUser();
  }, [handlePersistedUser]);

  useEffect(() => {
    dispatch(getSkipPre());
  }, [dispatch]);

  return <></>;
};

export default PersistedData;
