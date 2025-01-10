import { createRoot } from 'react-dom/client';
import { Toaster } from './components/ui/sonner';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store'; // Assuming the store is exported from 'store.js'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster />
  </BrowserRouter>,
);