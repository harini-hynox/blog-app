import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home.js';
import About from './About.js';
import Posts from './Post.js';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
