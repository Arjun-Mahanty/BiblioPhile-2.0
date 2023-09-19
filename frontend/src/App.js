import Books from './pages/Books';
import About from './pages/About';
import Home from './pages/Home';
import DetailsPage from './pages/DetailsPage';

import Footer from './components/Footer';
import "./App.css";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>

      <Route index element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/books' element={<Books/>} />
      <Route exact path='/books/:bookName' element={<DetailsPage/>}/>
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
};


export default App;
