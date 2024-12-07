import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CategoriesProvider } from './context/CategoriesProvider';
import { ActorsProvider } from './context/ActorsProvider';
import { NotificationProvider } from './context/NotificationProvider';
import { AuthorsProvider } from './context/AuthorsProvider';
import { CharactersProvider } from './context/CharactersProvider';
import { PlansProvider } from './context/PlansProvider';
import { MoviesProvider } from './context/MovieProvider';
import { EpisodeProvider } from './context/EpisodeProvider';
import { AuthsProvider } from './context/AuthsProvider';
import { AccountsProvider } from './context/AccountProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationProvider>
      <BrowserRouter>
      <AuthsProvider>
        <AccountsProvider>
        <CategoriesProvider>
          <ActorsProvider>
            <AuthorsProvider>
              <CharactersProvider>
                <PlansProvider>
                  <MoviesProvider>
                    <EpisodeProvider>
                    <App />
                    </EpisodeProvider>                   
                  </MoviesProvider>
                </PlansProvider>
              </CharactersProvider>
            </AuthorsProvider>
          </ActorsProvider>
        </CategoriesProvider>
        </AccountsProvider>      
      </AuthsProvider>
      </BrowserRouter>
    </NotificationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
