import {AppDispatch} from '@/store/Store';
import {AuthThunks} from '@/store/slicers';
import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';

const PersistedData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePersistedUser = useCallback(async () => {
    await dispatch(AuthThunks.getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    handlePersistedUser();
  }, [handlePersistedUser]);

  return <></>;
};

export default PersistedData;
