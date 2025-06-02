import React, { Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Loading from './common/components/Loading/Loading';

const AppLayout = React.lazy(()=> import('./layout/AppLayout'))
const HomePage = React.lazy(()=>import('./pages/HomePage/Homepage'))
const SearchPage = React.lazy(()=>import('./pages/SearchPage/SearchPage'))
const SearchWithKeywordPage = React.lazy(()=>import('./pages/SearchPage/SearchWithKeywordPage'))
const PlayListPage = React.lazy(()=>import('./pages/PlayListPage/PlayListPage'))
//0. sidebar(playlist,menu) 1. home / 2. search /search 3. search result /search/:keyword 4. play detail /playlist/:id 5. (mobile)playlist view /playlist
function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
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
