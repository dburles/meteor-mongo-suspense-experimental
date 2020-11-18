import { Router } from '@reach/router';
import React, { Suspense } from 'react';
import { Spinner, ThemeProvider } from 'theme-ui';
import queryCache from '../queryCache';
import theme from '../theme';
import QueryContext from './mongo-suspense/QueryContext';
import NotFound from './NotFound';
import Page from './Page';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryContext.Provider value={queryCache}>
        <Suspense fallback={<Spinner />}>
          <Router>
            <Page path="/" />
            <NotFound default />
          </Router>
        </Suspense>
      </QueryContext.Provider>
    </ThemeProvider>
  );
};

export default App;
