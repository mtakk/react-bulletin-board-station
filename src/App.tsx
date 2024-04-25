import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Threads } from './components/pages/Threads';
import { NewThread } from './components/pages/NewThread';
import { Header } from './components/organism/layout/Header';
import { ThreadPosts } from './components/pages/ThreadPosts';

function App() {

  return (
    <div className=" bg-gray-200">
        <BrowserRouter>
          <Routes>
            <Route path='/threads' element={<Header><Threads /></Header>}/>
            <Route path='/threads/new' element={<Header><NewThread /></Header>}/>
            <Route path="/threads/:threadId/posts" element={<Header><ThreadPosts /></Header>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
