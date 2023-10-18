import React,{useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/table.css';
import {Table,Pagination, PaginationItem, PaginationLink, Button, Modal,
  ModalHeader, ModalBody, FormGroup, ModalFooter,} from "reactstrap";
import courseURL from "../API/courseURL";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';

function Materias() {
    const [formData, setFormData] = useState({
      id:'',
      course_name: '',
      METHOD:'',
    });
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalEntry, setModalEntry] = useState(false);
    const [ data, setData] = useState([]);
    const [currentPage, setCurrentPage ] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(5);
    const [inputValue, setInputValue] = useState('');
    const config = {
      headers: {
        
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      }
    };

    const username = 'Ulises';
    const password = 'Ulises870911!';
    const basicAuth = 'Basic ' + btoa(username + ':' + password);
    //axios.defaults.headers.common['Authorization'] = basicAuth;
    //const [closeModalUpdate, setCloseModalUpdate] = useState(false);
    //const [displayModalEntry, setDisplayModalEntry] = useState(false);
    //const [closeModalEntry, setCloseModalEntry] = useState(false);
    

    const [form, setForm] = useState([]);
    const handleClick = (event) => {
      setCurrentPage(Number(event.target.id));
    };
    
//#region Database    
   
    useEffect(() => {    

      const fetchData = async () => {
        try {   
          //axios.defaults.headers.common['Authorization'] = basicAuth;
          const response = await axios.get("http://localhost/WebAPIAsistencia/Courses"
          // ,{
          //   //withCredentials: true,
          //   headers: {
          //     "Access-Control-Allow-Origin": "*",
          //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          //     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          //   },
          //   responseType: "json",
          // }
          );
          
         //console.log(response.data.result);
          
          setData(response.data.result);
        } catch (error) {          
          alert(error);
          console.error(error);
        }
      };
    
      fetchData();
    }, []);
    
    const updateDB = async (dt) => {
      
        setFormData({ ...formData, ["METHOD"]: 'POST' });    
        await axios.post(courseURL('post'), formData)
        //console.log('Respuesta del servidor:', response.status);
        .then(resonse =>{
          console.log(dt);
          var count = 0;
          var array = data;
          alert('Saved');
          array.map(() => {
            if (dt.id === array[count].id) {
              array[count].course_name = dt.course_name;                   
            }
            count++;
          });
          setModalUpdate(false);
        }).catch(error=>{
          alert(error);
          console.log(error);
        })
      //   if (response.status === 200) 
      //   {
          
      //   }
      // } catch (error) {
      //   alert(error);
      //   console.error('Error en la solicitud:', error);
      // }
    };

    const deleteDB = async (dt) => {
      try {
        const response = await axios.delete(courseURL('delete') + formData.id, config);
        //console.log('Respuesta del servidor:', response.status);
        if (response.status === 200) 
        {
          var count = 0;
          var array = data;
          array.map(() => {
            if (dt.id === array[count].id) {
              array.splice(count, 1);
            }
            count++;
          });
        }
      } catch (error) {
        alert(error);
        console.error('Error en la solicitud:', error);
      }
    };
//#endregion
//#region Functions

    // handleClick(event) {
    //     this.setState({
    //       currentPage: Number(event.target.id),
    //     });
    //   };

    const displayModalUpdate = (dt) => {
      setForm(dt);  
      setInputValue(dt.course_name)    
      setModalUpdate(true);
    };
    
    const  closeModalUpdate = () => {      
       setModalUpdate(false);
      };
    
     const displayModalEntry = () => {        
          setModalEntry(true);
      };
    
     const closeModalEntry = () => {
        setModalEntry(false);
      };

    const handleChange = (e) => {
      const courseValue = e.target.value;
        setInputValue(courseValue);
        console.log(courseValue);
       
        setFormData({ ...formData, ["course_name"]: courseValue });       
      };

      const update = (dt) => {
  
        setFormData({ ...formData, ["id"]: dt.id });
        //console.log(formData);
        updateDB(formData);
        
      }; 
    
      const deletes = (dt) => {
        var option = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dt.id);
        if (option === true) {
          deleteDB();          
          
        }
      };
    
      const entry = ()=>{
       
        console.log(formData);
        
      };

//#endregion

//#region Pagination

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    //console.log('currentItems',currentPage);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

    const handleSelectChange = (event) => {      
      setOpcionSeleccionada(event.target.value);      
      setItemsPerPage(event.target.value);      
    };

//#endregion


return (

    <div className="">
       <CssBaseline />
      <AppBar position="absolute" color="default" className="appBar">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Company name
        </Typography>
      </Toolbar>
    </AppBar>
    <main className="layout">
    <Paper className="paper">
      
      <section className="content">
        <h1>
          Administrar Clientes
         
          <small className="texto">Panel de Control</small>
        </h1>
        <ol className="breadcrumb">
          <li><a href="inicio"><i className="fa fa-dashboard"></i> Inicio</a></li>
          
          <li className="active">Administrar Clientes</li>
        </ol>
      </section>
  
      </Paper>
      </main>
      <Paper className="paper">
      {/* <body> */}
          <div className="datatable-container">
            <div className="header-tools">
                <div className="tools">
                   <ul>
                    {/* <li><span><input type="checkbox"/></span></li> */}
                    <li>
                      <Button color="success" onClick={()=>displayModalEntry()}>
                      <AddIcon />                 
                      </Button>
                    </li>
                    {/* <li>
                      <Button color="success" onClick={()=>displayModalEntry()}>
                      <EditIcon />
                      </Button>
                    </li>
                    <li>
                      <Button color="success" onClick={()=>displayModalEntry()}>
                      <DeleteIcon />
                      </Button>
                    </li>
                    <li>
                      <Button color="success" onClick={()=>displayModalEntry()}>
                      <ShareIcon />
                      </Button>
                    </li> */}
                  </ul> 
                </div>
                <div className="search">
                    <input type="text" name="" id="" className="search-input"></input>
                </div>      
            </div>
            <table className="datatable">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Materia</th>                
                    <th>Acción</th>
                  </tr>
                </thead>
                  <tbody>
                    {currentItems.map(item => (
                      <tr key={item.id}>
                        {/* <td className="table-checkbox"><input type="checkbox" name="" id=""></input></td> */}
                        <td>{item.id}</td>
                        <td>{item.course_name}</td>
                        <td>
                            <Button
                              color="primary"
                              onClick={() => displayModalUpdate(item)}
                            >
                              <EditIcon />
                            </Button>
                            {" "}
                            <Button color="danger" onClick={()=> deletes(item)}>
                              <DeleteIcon />
                            </Button>
                          </td>
                      </tr>
                    ))}            
                  </tbody>
            </table>
            <div className="footer-tools">
              <div className="list-items">
                <ul>
                  Show
                  <select name="n-entries" id="n-enties" className="n-entries" value={opcionSeleccionada} onChange={handleSelectChange}>
                    <option value={5} >5</option>
                    <option value={10} defaultValue={true}>10</option>
                    <option value={15} >15</option>
                  </select>
                  entries
                </ul>
                
              </div>
              <div className="pages">
                <ul>
                  <li>
                    <Pagination>
                      {pageNumbers.map(number => (
                         <PaginationItem key={number} active={number === currentPage}>
                        {/* /   <PaginationItem> */}
                          <PaginationLink
                             id={number}
                            onClick={handleClick}
                          >
                            {number}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </Pagination>
                  </li>
                </ul>
                </div>
            </div>
          </div>
      {/* </body>    */}
      </Paper>                
      <div>    
        <Modal isOpen={modalUpdate}>
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={form.id}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Materia: 
              </label>
              <input
                className="form-control"
                name="coursename"
                type="text"
                onChange={handleChange}
                value={inputValue}
              />
            </FormGroup>              
           
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
               onClick={() => update(form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => closeModalUpdate()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEntry}>
          <ModalHeader>
          <div><h3>Insertar Personaje</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                // value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Materia: 
              </label>
              <input
                className="form-control"
                name="materia"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>              
           
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => entry()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => closeModalEntry()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>  
  );

}

export default Materias;