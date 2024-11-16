import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CategoriesProvider } from './context/CategoriesProvider';
import { ActorsProvider } from './context/ActorContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthorsProvider } from './context/AuthorsContext';
import { CharactersProvider } from './context/Characters';
import { PlansProvider } from './context/PlansContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationProvider>
      <BrowserRouter>
        <CategoriesProvider>
          <ActorsProvider>
            <AuthorsProvider>
              <CharactersProvider>
                <PlansProvider>
                  <App />
                </PlansProvider>
              </CharactersProvider>
            </AuthorsProvider>
          </ActorsProvider>
        </CategoriesProvider>
      </BrowserRouter>
    </NotificationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
