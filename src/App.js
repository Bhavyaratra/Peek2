import './App.css';
import Navbar from './Components/Navigation/Nav';
import Note from './Components/Note/Note';

function App() {
  return (<>
        <div className="App"> 
        <Navbar/>
        </div> 

          <Note/>
          
        </>
  );
}

export default App;
