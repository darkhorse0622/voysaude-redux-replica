
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Dashboard from './Dashboard';

const Index = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};

export default Index;
