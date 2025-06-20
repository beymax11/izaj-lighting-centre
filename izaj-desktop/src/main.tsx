 import './App.css'; 

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { NotificationsProvider } from './util/notificationsProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </BrowserRouter>
);