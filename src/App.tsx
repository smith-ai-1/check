import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { client } from './apolloConfig';
import { store } from './store';
import { useTelegram } from "./hooks/useTelegram";
import MainContent from './components/MainContent';
import { ThemeProvider } from './ThemeContext';

function App() {
  let userId = "68226963";

  const { onToggleButton, tg } = useTelegram();
  React.useEffect(() => {
    tg.ready();
  }, [tg])

  const initData = tg.initDataUnsafe;
  if (initData.user !== undefined) {
    userId = String(initData.user.id);
  };

  console.log("Init with userId: " + userId);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <MainContent userId={userId} />
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;