import React,{useState} from'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as  Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { LaptopMac } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

  

function App() {

  const [{user}, dispatch]=useStateValue();
  return (
    <div className="app">
      <div className="green">
        
      </div>
      
      {!user? (
        <Login/>
      ):(
        <div className="app__body" >


          <Router>
           <Sidebar/>

            <Switch>
              
              

              <Route path='/Rooms/:RoomId'>
                
                <Chat/>

              </Route>
              <Route path ='/'>
                
                  <div className="new">
                      <img src="https://web.whatsapp.com/img/c98cc75f2aa905314d74375a975d2cf2.jpg" 
                      alt=""/>
                    
                    
                      <h1 >Keep your phone connected</h1>
                      <h6 >
                        WhatsApp connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.
                      </h6>
                      <hr> 
                      </hr>          
                      <p >
                          <IconButton>
                          <LaptopMac/> 

                          </IconButton>
                          
                           WhatsApp is available for Windows. 
                      </p>
                  </div> 




                


                  
                  
                
                

              </Route>

              
            </Switch>  
              



          </Router>
        
            
        

        </div>

      )
      }
      
        

    </div>
    
  );
}

export default App;
