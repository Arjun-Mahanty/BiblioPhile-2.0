import Home from './pages/Home';
import Footer from './components/Footer';
import "./App.css";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>

      {/* <Route index element={} /> */}
      {/* <Route path='/about' element={} /> */}
      <Route path='/books' element={<Home/>} />
      </Routes>
      <Footer/>
    </Router>
  );
};


export default App;
