import './App.css';
import Upload from './components/Upload';
import { BrowserRouter as Router} from 'react-router-dom';
import {Route,Routes} from "react-router";
import Retrieve from './components/Retrieve';
import Home from "./components/Home"
import Cache from "./components/Cache"
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      
      <Router>
      <Navbar/>
      <Routes>
      
        <Route path='/' element={<Home/>} exact/>
        
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/retrieve' element={<Retrieve/>}/>
        <Route path='/cache' element={<Cache/>}/>
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
