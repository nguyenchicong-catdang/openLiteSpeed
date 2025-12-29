import { createRoot } from 'react-dom/client';
import App from './learn-react/App';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);

