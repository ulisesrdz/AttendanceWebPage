import React,{useState} from 'react';
import '../css/modal.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const SuccModal = () => {
   
    const [modalOpen, setModalOpen] = useState(false);    
    const toggleModal = () => {
      setModalOpen(!modalOpen);
    };    
   

    
    return (
      <>
       
        <Modal isOpen={modalOpen} toggle={toggleModal}>
        
    
            <ModalHeader toggle={toggleModal} className='custom-modal-header' >
                Success
            </ModalHeader>
          
          <ModalBody>
          <label>Success:</label>
                
          </ModalBody>
          <ModalFooter>
          <Button color="primary" onClick={handleChange}>
              Ok
            </Button>
            
          </ModalFooter>
          
        </Modal>
      </>
    );
  };
  
  export default SuccModal;