import './App.css';
// import SignUp from './authentication/SignUp';
// import Login from './authentication/Login';
import Home from './home/Home';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from './authentication/auth';
import PrivateRoute from './route-types/PrivateRoute';
import ProtectedRoute from './route-types/ProtectedRoute';
// import { useContext, useEffect } from 'react';
import SignIn from './authentication/SignIn';
import SignUpProfile from './authentication/SignUpProfile';

function App() {
    console.log("App");
  return (
    <AuthProvider>
        <Router>
            <PrivateRoute exact path="/" component={Home}  /> 
            <Route exact path="/signin" component={SignIn} />
            <ProtectedRoute exact path="/signup-profile" component={SignUpProfile} />
        </Router>
    </AuthProvider>
  )
}

export default App;
