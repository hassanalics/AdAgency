import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Brands from './pages/brands';
import Campaigns from './pages/campaigns';
import Navbar from './components/Navbar';
import Home from './pages/home';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/campaigns" element={<Campaigns />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
