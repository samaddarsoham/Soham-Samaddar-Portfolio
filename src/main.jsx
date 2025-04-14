import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NewApp from './NewApp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NewApp />
  </StrictMode>,
);
