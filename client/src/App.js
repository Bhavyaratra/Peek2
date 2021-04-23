import './App.css';

import Navbar from './Components/Navigation/Nav';
import Note from './Components/Note/Note';
import {AllNotes} from './Components/Note/AllNotes';
import Login from './Components/Login/Login';
import Logout from './Components/Logout/Logout';
import Register from './Components/Register/Register';

import {BrowserRouter as Router,
          Switch,
          Route,
        }  from 'react-router-dom';
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />


const App= ()=> {

  
  return (<>

       

        <Router>
        <div className="App"> 
        <Navbar/>
        </div> 
        <Switch>
          <Route path="/login">
          
            <Login/>
           
          </Route>

          <Route path="/logout">
          
            <Logout/>
           
          </Route>
          
          <Route path="/register">
          
            <Register/>
           
          </Route>

          <Route path="/">
            <Note/>
            <br/>
            <AllNotes/>
          </Route>
        </Switch>
        </Router>  
        </>
  );
}

export default App;
