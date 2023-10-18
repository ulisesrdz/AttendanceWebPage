import React,{useState} from 'react';
import '../css/modal.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Input, ButtonAnt,Select, Space } from "antd";
import AlertModal from '../Components/SuccModal';
import axios from 'axios';

const FormItem = Form.Item;
const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const CourseModal = () => {
   
    const [modalOpen, setModalOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const toggleModal = () => {
      setModalOpen(!modalOpen);
    };

    const register = async () => {   
    
      //axios.post('http://localhost/WebAPIAsistencia/Request/login.php', {
      //axios.post('https://asistenciadia.000webhostapp.com/WebAPIAsistencia/Request/login.php', {
      await axios.post('http://localhost/WebAPIAsistencia/Request/createCourse.php', {
        course_name: nombre
      } ).then(response => {
        //console.log(response.data.code);
        if(response.data.message){
          
          if(response.data.code === 200){
            console.log(response.data.code);
            setModalOpen(false)
            //setModalOpen(true);
            alert("Save Success");
          }
           
          //setLoginStatus(response.data.message);
        }  else{
          setSuccModalOpen(true);
        }
        //console.log(response);
        })
        .catch(error => {
          console.error('Error fetching data', error);
        });
    }


    const getCourses = async () => {   
    
      //axios.post('http://localhost/WebAPIAsistencia/Request/login.php', {
      //axios.post('https://asistenciadia.000webhostapp.com/WebAPIAsistencia/Request/login.php', {
      await axios.post('http://localhost/WebAPIAsistencia/Request/getCourses.php', {
        course_name: ""
      } ).then(response => {
        //console.log(response.data.code);
        if(response.data.message){
          
          if(response.data.code === 200){
            console.log(response);
          }
           
          
        }  else{
          setSuccModalOpen(true);
        }
       
        })
        .catch(error => {
          console.error('Error fetching data', error);
        });
    }
    const [SuccModalOpen, setSuccModalOpen] = React.useState(false);
    return (
      <>
        <Button color="primary" onClick={toggleModal}>
          Open Modal
        </Button>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
        
    
            <ModalHeader toggle={toggleModal} className='custom-modal-header' >
                Materias
            </ModalHeader>
          
          <ModalBody>
          <label>Nombre:</label>
          <FormItem>
            <Input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
          </FormItem>        
          </ModalBody>
          <ModalFooter>
          <Button color="primary" onClick={register}>
              Guardar
            </Button>
            <Button color="secondary" onClick={toggleModal}>
              Close
            </Button>
          </ModalFooter>
          
        </Modal>

        <AlertModal isOpen={SuccModalOpen} onClose={() => setSuccModalOpen(false)}/>
      </>
    );
  };
  
  export default CourseModal;