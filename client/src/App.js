import './App.css';
import React,{createContext,useReducer} from 'react';
import Navbar from './Components/Navigation/Nav';
import Note from './Components/Note/Note';
import {AllNotes} from './Components/Note/AllNotes';
import Login from './Components/Login/Login';
import Logout from './Components/Logout/Logout';
import Register from './Components/Register/Register';
import {initialState,reducer} from '../src/reducer/UseReducer';
import {BrowserRouter as Router,
          Switch,
          Route,
        }  from 'react-router-dom';
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

export const UserContext = createContext();
const App= ()=> {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (<>

        <UserContext.Provider value={{state, dispatch}}>

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
        </UserContext.Provider>
        </>
  );
}

export default App;
