import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Signin from './pages/Signin';
import Home from './pages/Home'
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Home />}      
        />
        <Route path="/signin" element={<Signin />}      
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
