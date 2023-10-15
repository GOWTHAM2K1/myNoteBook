import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/NoteState';
import Modal from 'react-modal';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';



Modal.setAppElement('#root');


function App() {


  return (
    <NoteState>
     <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="signup/*" element={<Signup/>}/>
        <Route path="home/*" element={<Home />} />
        <Route path="about/*" element={<About/>} />
      </Routes> 
    </BrowserRouter>
    </NoteState>
  );
}

export default App;
