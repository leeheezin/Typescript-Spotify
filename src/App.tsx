import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Loading from './common/components/Loading/Loading';
import useExchangeToken from './hooks/useExchangeToken';

const AppLayout = React.lazy(()=> import('./layout/AppLayout'))
const HomePage = React.lazy(()=>import('./pages/HomePage/Homepage'))
const SearchPage = React.lazy(()=>import('./pages/SearchPage/SearchPage'))
const SearchWithKeywordPage = React.lazy(()=>import('./pages/SearchPage/SearchWithKeywordPage'))
const PlayListPage = React.lazy(()=>import('./pages/PlayListPage/PlayListPage'))
//0. sidebar(playlist,menu) 1. home / 2. search /search 3. search result /search/:keyword 4. play detail /playlist/:id 5. (mobile)playlist view /playlist
function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  const codeVerifier = localStorage.getItem('code_verifier');

  const {mutate:exchangeToken} = useExchangeToken()
  useEffect(() => {
    if(code && codeVerifier) {
      exchangeToken({code, codeVerifier})
    }
  },[code, codeVerifier, exchangeToken])

  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="/callback" element={<Loading />} />
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="search" element={<SearchPage/>}/>
          <Route path="search/:keyword" element={<SearchWithKeywordPage/>}/>
          <Route path="playlist/:id" element={<PlayListPage/>}/>
          {/* <Route path="/playlist" element={<LibraryPage/>}/> */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
