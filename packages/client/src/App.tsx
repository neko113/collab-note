import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useGetMe } from './hooks/queries/user';
import PageRoutes from './routes';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { LoadingSpinner } from './components/common';
import ErrorFallback from './components/base/ErrorFallback';

const App = () => {
  useGetMe();

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorFallback
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <PageRoutes />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default App;
