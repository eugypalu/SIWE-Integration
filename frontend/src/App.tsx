import { useEffect }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import CreateProfile from './pages/CreateProfile';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import { connectWallet } from './utils/siweAuth';

declare global {
  interface Window {
    ethereum: any;
  }
}

const App = () => {
  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={SignIn} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/createprofile" component={CreateProfile} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;