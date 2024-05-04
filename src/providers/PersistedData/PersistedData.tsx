import {AppDispatch, RootState} from '@/store/Store';
import {getCurrentUser} from '@/store/slicers';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSocket} from '../../socket';

const PersistedData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {token, isAuthenticated} = useSelector(
    (state: RootState) => state.auth,
  );

  const {connect, socket} = useSocket();

  useEffect(() => {
    if (isAuthenticated && token && !socket) {
      connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isAuthenticated]);

  const handlePersistedUser = useCallback(async () => {
    await dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    handlePersistedUser();
  }, [handlePersistedUser]);

  return <></>;
};

export default PersistedData;
