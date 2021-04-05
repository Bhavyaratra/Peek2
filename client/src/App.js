import './App.css';
import Navbar from './Components/Navigation/Nav';
import Note from './Components/Note/Note';
import {AllNotes} from './Components/Note/AllNotes';


function App() {
  return (<>
        <div className="App"> 
        <Navbar/>
        </div> 

          <Note/>
          <br/>
          <AllNotes/>
          
        </>
  );
}

export default App;
