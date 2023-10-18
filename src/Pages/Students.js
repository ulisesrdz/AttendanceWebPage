import React,{useState} from "react";
import {Box,Grid} from '@material-ui/core'
import '../css/styles.css';
import { Form, Input, Button } from "antd";
 import Modal from '../Components/StudentsModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';

const FormItem = Form.Item;


function Students(){

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí puedes realizar la lógica para enviar los datos del formulario al servidor
      console.log('Datos enviados:', { nombre, email, password });
    };

    const columns =[
      {
        name:'Name',
        selector: row => row.name,
        sortable:true,
      },
      {
        name:'Email',
        selector: row => row.email,
        sortable:true,
      },
      {
        name:'Age',
        selector: row => row.age,
        sortable:true,
      }
    ];

    const data = [
      {
        id:1,
        name:'Ulises',
        email:'ingulisesrdz@gmail.com',
        age:'35'
      },
      {
        id:2,
        name:'Amador',
        email:'ingulisesrdz@gmail.com',
        age:'35'
      },
      {
        id:3,
        name:'Uriel',
        email:'ingulisesrdz@gmail.com',
        age:'35'
      },
      {
        id:4,
        name:'Gabriela',
        email:'ingulisesrdz@gmail.com',
        age:'35'
      },
      {
        id:5,
        name:'Ana',
        email:'ingulisesrdz@gmail.com',
        age:'35'
      }
     
    ]

    return(
        <>    
       
       <div className="conteiner mt-5">
        
        <div className="text-start">
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            
        </div>
        <div className="text-end"> 
            
          <input type="text"/>
        </div>
      
          <DataTable
            columns={columns}
            data={data}
            
            
            pagination
          ></DataTable>
       </div>
        {/* <form className="main-form" onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
          </div>
          
          <FormItem>
            <Input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
          </FormItem>
          
          <div>
            <label>Materia:</label>
          </div>
          <FormItem>
            <Input 
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
          </FormItem>
        
          <div>
            <label>Grupo:</label>
          </div>
          <div>
            <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
          </div>
          <br />
      <br />
      <button type="submit">Registrarse</button>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>

    </form> */}
   
        </>
    );
}

export default Students;