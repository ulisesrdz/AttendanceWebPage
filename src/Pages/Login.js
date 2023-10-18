import React, {useState} from "react";
import { DatePicker } from 'antd';
import { Form, Input, Button } from "antd";
import background from "../img/listBackgroud.png";
import logo from "../img/logo.png";
import axios from 'axios';
import { Label } from "reactstrap";
import '../css/login.css';

const FormItem = Form.Item;
const divStyle = {
  width: '88%',
  height: '800px',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover'   
};

  const Login = ({ onLogin }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [usernameReg,setUsernameReg] = useState('');
    const [passwordReg,setPasswordReg] = useState('');
    const [loginStatus,setLoginStatus] = useState('');
    const [data] = useState([]); 
    

  const login =() => {   
    console.log('Hola');
    //axios.post('http://localhost/WebAPIAsistencia/Request/login.php', {
    //axios.get('https://asistenciadia.000webhostapp.com/WebAPIAsistencia/Request/login.php', {
    axios.post('http://localhost/WebAPIAsistencia/Request/login.php', {
      username: usernameReg,
      Password: passwordReg
    } ).then(response => {
      console.log('Adios');
      //console.log(response);
      // if(response.data.message){
      //   setLoginStatus(response.data.message);
      //   setIsLoggedIn(true);
      // }  else{
        //if(response.data.length > 0){
          //setLoginStatus(response.data[0].user_name);
          onLogin();
          console.log(isLoggedIn);
          setIsLoggedIn(true);
          console.log(isLoggedIn);
        //}        
      //}
      //console.log(response);
      })
      .catch(error => {
        alert("Error fetching data", error.message);
        //console.error('Error fetching data', error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // You can now access the form data in the `formData` state
    console.log('Form data submitted:', isLoggedIn);
  };
  
  
    return(
      <figure>
      {/* <form onSubmit={handleSubmit}> */}
        <head>
          <meta charSet="utf-8"/>
          <title>Form Login</title>
          <link rel="stylesheet" href="../css/login.css"/>
        </head>
        <body>
          <div className="login-box">
            <img className="avatar" src={logo} alt="Logo"/>
            <h1>Login Here</h1>
            <form>
              {/* USERNAME */}
              <Label for="username">Username</Label>
              <input type="text" placeholder="Enter Username" onChange={(e) => {setUsernameReg(e.target.value);}}></input>
              {/* PASSWORD */}
              <Label for="password">Password</Label>
              <input type="password" placeholder="Enter Password" onChange={(e) => {setPasswordReg(e.target.value);}}></input>
              {/* <input type="submit" value="Login" onClick={login}/> */}
              <Button onClick={login}>Login</Button>
              <a href="#">Lost your password</a>
              <br/>
              <a href="#">Don't have an account?</a>
            </form>
          </div>          
        </body>
      {/* </form> */}
        
      </figure>

        //    <div className="lItem" style={divStyle}>
        //    <div className="loginForm">
        //         <h2>Login</h2>
        //          <Form  className="login-form"> 
        //       <FormItem>                
        //           <Input                   
        //             placeholder="Username" type="text" 
        //             onChange={(e) => {
        //               setUsernameReg(e.target.value);                      
        //             }}
        //           />                
        //       </FormItem>
        //       <FormItem>
               
        //           <Input                   
        //             type="password"
        //             placeholder="Password"
        //             onChange={(e) => {
        //               setPasswordReg(e.target.value);
        //             }}
        //           />
                   
        //       </FormItem>
        //       <FormItem>
        //       <Button                  
        //           className="login-form-button"
        //           onClick={login}
        //         >
        //           Log in
        //         </Button>
        //       </FormItem>
        //       </Form>
        //    </div>
        //    <div>
        //     <h1>Data from the Database</h1>
        //     <ul>
        //       {data.map(item => (
        //         <li key={item.id}>{item.password}</li>
        //       ))}
        //     </ul>
        //     <h1>{loginStatus}</h1>
        //   </div>
        // </div>
    );
}

export default Login;