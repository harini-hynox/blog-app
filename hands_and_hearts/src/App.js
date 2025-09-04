import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/homePage/Home';
import About from './pages/aboutPage/About';
import Contact from './pages/contactPage/Contact';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
