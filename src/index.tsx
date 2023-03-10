import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from '@/components/app/app';
import { AuthProvider } from '@/authContext';
import { initializeAPI } from '@/api';
import '@/styles/style.css';

const firebaseApp = initializeAPI();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <AuthProvider firebaseApp={firebaseApp}>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </StrictMode>
);
