import { Outlet } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from './pages/Navbar/Navbar';
import Footer from './pages/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
