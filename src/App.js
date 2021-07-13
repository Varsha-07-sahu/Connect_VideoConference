import VideoBox from './Components/Conference_page/VideoBox';
import Box from '@material-ui/core/Box';
import './App.css';
import { Container } from '@material-ui/core';
import SignInSide from './Components/Sign_in_page/SignInSide';
import Welcome_page from './Screens/Welcome_page';
import JoiningPage from './Screens/JoiningPage';
import PopUpGetId from './Components/Start_page/PopUpGetId';
import DialogBox from './Components/Start_page/DialogBox';
import { Route } from 'react-router-dom';
import Notification_toAcceptCall from './Components/Permission/Notification_toAcceptCall';
import VideoConferenceMainPage from './Components/Conference_page/VideoConferenceMainPage';



function App() {
  return (
    // <VideoConferenceMainPage />

    <div>
      <Route path="/" exact >
        <Welcome_page />
      </Route>

      <Route path="/Welcome">
        <Welcome_page />
      </Route>

      <Route path="/Join" >
        <JoiningPage />
      </Route>

      <Route exact path="/Connect">
        <VideoConferenceMainPage />
      </Route>
      {/* 
      <Route path="*">
        Error 404
      </Route> */}
    </div>


  );
}

export default App;
