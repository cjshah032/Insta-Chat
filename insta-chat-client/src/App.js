import './App.css';
import SignUp from './authentication/SignUp';
import Login from './authentication/Login';
import Home from './home/Home';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext, AuthProvider } from './authentication/auth';
import PrivateRoute from './route-types/PrivateRoute';
import { useContext, useEffect } from 'react';
import SignIn from './authentication/SignIn';

function App() {
  return (
    <AuthProvider>
        <Router>
            <PrivateRoute exact path="/" component={Home}  /> 
            <Route exact path="/signin" component={SignIn} />
        </Router>
    </AuthProvider>
  )
}

export default App;
