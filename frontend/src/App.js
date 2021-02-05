import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './routes/home/home';
import Signup from './routes/signup/signup';
import Login from './routes/login/login';
import Chatroom from './routes/chatroom/chatroom';
import Join from './routes/join/join';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/signup' exact component={Signup}/>
          <Route path='/login' exact component={Login}/>
          <Route path='/join' exact component={Join}/>
          <Route path='/chatroom' exact component={Chatroom}/>
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
