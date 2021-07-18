import './App.css';
import Navbar from './Components/Navigation/Nav';
import {Note} from './Components/Note/NoteServerless';
import Login from './Components/Login/Login';
import Logout from './Components/Logout/Logout';
import Filedata from './Components/Note/Filedata';
import Register from './Components/Register/Register';
import {GeneratePDF} from './Components/Pdf/GeneratePDF';
import {InputPDF} from './Components/Pdf/InputPDF';
import {Weatherapi} from './Components/Apicomponent/Weatherapi';
import {Richtexttable} from './Components/Pdf/RichTextTable';

import { useEffect } from 'react';
import {BrowserRouter as Router,
          Switch,
          Route,
        }  from 'react-router-dom';

import * as Realm from "realm-web";

const REALM_APP_ID = "peeknote-niylh"; // e.g. myapp-abcde
const app = new Realm.App({ id: REALM_APP_ID });
const credentials = Realm.Credentials.anonymous();  

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />


const App= ()=> {

  useEffect(()=>{
    app.logIn(credentials)
    .then(res=>{
      console.log(res.id);
    })
  
  },[]);
  
  return (<>
        <Router>
        <div className="App"> 
        <Navbar/>
        </div> 
        <Switch>

        <Route exact path="/richtexttable">
          <Richtexttable app={app}/>
        </Route>

        <Route exact path="/weatherapi">
          <Weatherapi app={app}/>
        </Route>

        <Route exact path="/filedata">
          <Filedata app={app}/>
        </Route>

        <Route exact path="/generatepdf">
          <GeneratePDF app={app}/>
        </Route>

        <Route exact path="/inputpdf">
          <InputPDF app={app}/>
        </Route>

          <Route path="/login">
          
            <Login app={app}/>
           
          </Route>

          <Route path="/logout">
          
            <Logout/>
           
          </Route>
          
          <Route path="/register">
          
            <Register app={app}/>
           
          </Route>

          <Route path="/">
            <Note app={app}/>
            <br/>
           {/* <AllNotes/> */}
          </Route>
        </Switch>
        </Router>  
        </>
  );
}

export default App;
