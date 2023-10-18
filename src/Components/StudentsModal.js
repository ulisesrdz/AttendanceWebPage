import React,{useState} from 'react';
 import '../css/modal.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Input, ButtonAnt,Select, Space } from "antd";

const FormItem = Form.Item;
const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

const StudentModal = () => {
   
    const [modalOpen, setModalOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const toggleModal = () => {
      setModalOpen(!modalOpen);
    };
    return (
      <>
        <Button color="primary" onClick={toggleModal}>
          Agregar Estudiantes
        </Button>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
        
    
            <ModalHeader toggle={toggleModal} className='custom-modal-header' >
                Estudiantes
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
        <Space wrap>
        <Select
            defaultValue="lucy"
            style={{
                width: 120,
            }}
            allowClear
            onChange={handleChange}
            options={[
                {
                value: 'lucy',
                label: 'Lucy',
                },
            ]}
        />
        </Space>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Close
            </Button>
          </ModalFooter>
          
        </Modal>
      </>
    );
  };
  
  export default StudentModal;