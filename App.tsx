import 'react-native-gesture-handler';
import React from 'react';
import ParentNavigation from './src/navigation/ParentNavigation';
import {Provider} from 'react-redux';
import CodePush from 'react-native-code-push';

import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ParentNavigation />
        <Toast />
      </PersistGate>
    </Provider>
  );
}
const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

export default CodePush(codePushOptions)(App);
