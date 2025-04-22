import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Brands from './pages/brands';
import Campaigns from './pages/campaigns';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Brands />} />
          <Route path="/brands/:id/campaigns" element={<Campaigns />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
