import {API_ORIGIN} from '@/app/api';
import {RootState} from '@/store/Store';
import React, {PropsWithChildren, createContext, useState} from 'react';
import {useSelector} from 'react-redux';
import {Socket, io} from 'socket.io-client';

interface SocketContextProps {
  socket: Socket | null;
  connect: () => Promise<void>;
}

const SocketContext = createContext<SocketContextProps | null>(null);

const SocketProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const {token} = useSelector((state: RootState) => state.auth);

  const connect = async () => {
    try {
      const instance = io(API_ORIGIN, {
        extraHeaders: {Authorization: `Bearer ${token}`},
      });

      instance.on('connect', () => {
        console.log('Connected to socket server');
      });

      setSocket(instance);
    } catch (error) {
      console.log(error);
      setSocket(null);
    }
  };

  return (
    <SocketContext.Provider value={{socket, connect}}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = (): SocketContextProps => {
  const context = React.useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};

export {SocketProvider, useSocket};
