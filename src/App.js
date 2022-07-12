import Header from './Header';
// Header 元件裏有用到 Link 需要包在 BrowserRouter
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Home  from './pages/Home';
import  Signin  from './pages/Signin';
import  NewPost  from './pages/NewPost';
import Post from './pages/Post';
function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* 針對不同路由,指定不同元件 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
