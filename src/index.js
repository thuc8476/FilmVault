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
import { PackagesProvider } from './context/PackageProvider';
import { FeaturesProvider } from './context/FeaturesProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationProvider>
      <BrowserRouter>
        <AccountsProvider>
          <AuthsProvider>
            <FeaturesProvider>
              <CategoriesProvider>
                <ActorsProvider>
                  <AuthorsProvider>
                    <CharactersProvider>
                      <PlansProvider>
                        <MoviesProvider>
                          <EpisodeProvider>
                            <PackagesProvider>
                              <App />
                            </PackagesProvider>
                          </EpisodeProvider>
                        </MoviesProvider>
                      </PlansProvider>
                    </CharactersProvider>
                  </AuthorsProvider>
                </ActorsProvider>
              </CategoriesProvider>
            </FeaturesProvider>
          </AuthsProvider>
        </AccountsProvider>
      </BrowserRouter>
    </NotificationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
