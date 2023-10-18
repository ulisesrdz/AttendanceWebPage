import './App.css';
import Login from './Pages/Login';
import React, {useState} from "react";
import MainPage from './Pages/MainPage';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (    
    <div>   
      {console.log(isLoggedIn)}   
      {isLoggedIn ? (
        <MainPage />
      ) : (
        <MainPage />
        // <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
