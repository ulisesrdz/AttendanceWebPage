import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/table.css';
import {
  Table,Pagination, PaginationItem, PaginationLink, Button, Modal,
  ModalHeader, ModalBody, FormGroup, ModalFooter,} from "reactstrap";
import courseURL from "../API/courseURL";
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';

const data = [
  // { id: 1, personaje: "Naruto", anime: "Naruto" },
  // { id: 2, personaje: "Goku", anime: "Dragon Ball" },
  // { id: 3, personaje: "Kenshin Himura", anime: "Rurouni Kenshin" },
  // { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" },
  // { id: 5, personaje: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood"},
  // { id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!" },
];



function createData(id,course_name) {
    return {
      id,
      course_name,    
    };
  }

async function fetchData() {
  try {
    //console.log('url',courseURL('get'));
    //data.length = 0;
    //const response = await axios.get(courseURL('get'));
    const response = await axios.get("http://localhost/WebAPIAsistencia");
    response.data.forEach(post => {
        data.push(createData(post.id,post.course_name));
    });
    
    console.log(data)
    //return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function createDAta(name){
  try {
    //console.log('url',courseURL('get'));
    //data.length = 0;
    const response = await axios.post(courseURL('post'),{
      course_name:name,
    });
    response.data.forEach(post => {
        data.push(createData(post.id,post.course_name));
    });
    
    console.log(data)
    //return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

fetchData();
// useEffect(() => {
//   fetchData();
// },[]);   


class Course extends React.Component {
  //D;
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        course_name: '',
      },
    };
  }
  
  state = {
    data: data,//fetchData(),
    modalUpdate: false,
    modalEntry: false,
    currentPage: 1,
    itemsPerPage: 10,
    form: {
      id: "",
      Materia: "",      
    },
  };
 
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  displayModalUpdate = (dt) => {
    this.setState({
      form: dt,
      modalUpdate: true,
    });
  };

  closeModalUpdate = () => {
    this.setState({ modalUpdate: false });
  };

  displayModalEntry = () => {
    this.setState({
      modalEntry: true,
    });
  };

  closeModalEntry = () => {
    this.setState({ modalEntry: false });
  };

  update = (dt) => {
    var count = 0;
    var array = this.state.data;
    array.map((entry) => {
      if (dt.id === entry.id) {
        array[count].course_name = dt.course_name;       
      }
      count++;
    });
    this.setState({ data: array, modalUpdate: false });
  };

  delete = (dt) => {
    var option = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dt.id);
    if (option === true) {
      var count = 0;
      var array = this.state.data;
      array.map((registro) => {
        if (dt.id === registro.id) {
          array.splice(count, 1);
        }
        count++;
      });
      this.setState({ data: array, modalUpdate: false });
    }
  };

  entry = ()=>{
   
    console.log(formData);
    //createDAta(newValue.Materia);
    // newValue.id=this.state.data.length+1;
    // var list= this.state.data;
    // list.push(newValue);
    // this.setState({ modalEntry: false, data: list });
  }
  

  handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    this.setState({
      form: {
        ...this.state.form,
        
        [e.target.name]: e.target.value,
      },
    });
  };
  

  render() {   
   
    const { data, currentPage, itemsPerPage } = this.state;
    //const pageNumbers = [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    

    //console.log('url',courseURL('get'));
    //console.log('url');
    //fetchData();
   
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
                      <li><span><input type="checkbox"/></span></li>
                      <li>
                        <Button  onClick={()=>this.displayModalEntry()}>
                        <AddIcon />                 
                        </Button>
                      </li>
                      <li>
                        <Button color="success" onClick={()=>this.displayModalEntry()}>
                        <EditIcon />
                        </Button>
                      </li>
                      <li>
                        <Button color="success" onClick={()=>this.displayModalEntry()}>
                        <DeleteIcon />
                        </Button>
                      </li>
                      <li>
                        <Button color="success" onClick={()=>this.displayModalEntry()}>
                        <ShareIcon />
                        </Button>
                      </li>
                    </ul>
                  </div>
                  <div className="search">
                      <input type="text" name="" id="" className="search-input"></input>
                  </div>      
              </div>
              <table className="datatable">
                  <thead>
                    <tr>
                      <th></th>
                      <th>ID</th>
                      <th>Materia</th>                
                      <th>Acción</th>
                    </tr>
                  </thead>
                    <tbody>
                      {currentItems.map(item => (
                        <tr key={item.id}>
                          <td className="table-checkbox"><input type="checkbox" name="" id=""></input></td>
                          <td>{item.id}</td>
                          <td>{item.course_name}</td>
                          <td>
                              <Button
                                color="primary"
                                onClick={() => this.displayModalUpdate(item)}
                              >
                                Editar
                              </Button>{" "}
                              <Button color="danger" onClick={()=> this.delete(item)}>Eliminar</Button>
                            </td>
                        </tr>
                      ))}            
                    </tbody>
              </table>
              <div className="footer-tools">
                <div className="list-items">
                  <ul>
                    Show
                    <select name="n-entries" id="n-enties" className="n-entries">
                      <option value={5}>5</option>
                      <option value={10} defaultValue={true}>10</option>
                      <option value={15}>15</option>
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
                            <PaginationLink
                              id={number}
                              onClick={this.handleClick.bind(this)}
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
          <Modal isOpen={this.state.modalUpdate}>
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
                  value={this.state.form.id}
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
                  onChange={this.handleChange}
                  value={this.state.form.course_name}
                />
              </FormGroup>              
             
            </ModalBody>

            <ModalFooter>
              <Button
                color="primary"
                onClick={() => this.update(this.state.form)}
              >
                Editar
              </Button>
              <Button
                color="danger"
                onClick={() => this.closeModalUpdate()}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>



          <Modal isOpen={this.state.modalEntry}>
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
                  value={this.state.data.length+1}
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
                  onChange={this.handleChange}
                />
              </FormGroup>              
             
            </ModalBody>

            <ModalFooter>
              <Button
                color="primary"
                onClick={() => this.entry()}
              >
                Insertar
              </Button>
              <Button
                className="btn btn-danger"
                onClick={() => this.closeModalEntry()}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>  
    );
  }
}
export default Course;

// // import * as React from 'react';
// // import PropTypes from 'prop-types';
// // import { alpha } from '@mui/material/styles';
// // import Box from '@mui/material/Box';
// // import Table from '@mui/material/Table';
// // import TableBody from '@mui/material/TableBody';
// // import TableCell from '@mui/material/TableCell';
// // import TableContainer from '@mui/material/TableContainer';
// // import TableHead from '@mui/material/TableHead';
// // import TablePagination from '@mui/material/TablePagination';
// // import TableRow from '@mui/material/TableRow';
// // import TableSortLabel from '@mui/material/TableSortLabel';
// // import Toolbar from '@mui/material/Toolbar';
// // import Typography from '@mui/material/Typography';
// // import Paper from '@mui/material/Paper';
// // import Checkbox from '@mui/material/Checkbox';
// // import IconButton from '@mui/material/IconButton';
// // import Tooltip from '@mui/material/Tooltip';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import Switch from '@mui/material/Switch';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import FilterListIcon from '@mui/icons-material/FilterList';
// // import { visuallyHidden } from '@mui/utils';
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import axios from 'axios';
// import IconButton from '@mui/material/IconButton';

// function createData(id,name) {
//   return {
//     id,
//     name,    
//   };
// }

// function GetUsers(){   
    
  
//     axios.get('http://localhost/WebAPIAsistencia/Request/Course.php').then(response => {
    
//     if(response.status===200){
//       response.data.forEach(post => {
//         rows.push(createData(post.id,post.course_name));
//       });
//     }
    
//     },[])
//     .catch(error => {
//       alert("Error fetching data", error.message);     
//     });
// }

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// // function createData(name, calories, fat, carbs, protein) {
// //   return { name, calories, fat, carbs, protein };
// // }
// // function createData(name, id) {
// //   return { id, name};
// // }

// const rows = [
//    //createData(159,'Frozen yoghurt'),
//   // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   // createData('Eclair', 262, 16.0, 24, 6.0),
//   // createData('Cupcake', 305, 3.7, 67, 4.3),
//   // createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function CustomizedTables() {

//   React.useEffect(() => {
//     //const [data, setData] = React.useState([]);
//     if(rows.length===0){
//       async function fetchDataAndSetState() {
//         await GetUsers(); // Call the fetchData function
       
//        //setLoading(false);
//      }
 
//      fetchDataAndSetState();
//     }
//      // Call the function when the component mounts

//   }, []);

//   return (
//     <div className="conteiner mt-4">
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 200 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
          
//             <StyledTableCell>#</StyledTableCell>
//             <StyledTableCell align="left">Materia</StyledTableCell>
//             <StyledTableCell align="left">Actions&nbsp;</StyledTableCell>            
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <StyledTableRow key={row.name}>
              
//               <StyledTableCell align="left">{row.id}</StyledTableCell>
//               <StyledTableCell component="th" scope="row">
//                 {row.name}
//               </StyledTableCell>              
//             </StyledTableRow>
//           ))}

// <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => true}
//           >
           
//           </IconButton>
//         </TableCell>
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </div>
//   );
// }

// // const rows = [];
// //   //createData(1,'Cupcake'),
// //   // createData('Donut', 452, 25.0, 51, 4.9),
// //   // createData('Eclair', 262, 16.0, 24, 6.0),
// //   // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// //   // createData('Gingerbread', 356, 16.0, 49, 3.9),
// //   // createData('Honeycomb', 408, 3.2, 87, 6.5),
// //   // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// //   // createData('Jelly Bean', 375, 0.0, 94, 0.0),
// //   // createData('KitKat', 518, 26.0, 65, 7.0),
// //   // createData('Lollipop', 392, 0.2, 98, 0.0),
// //   // createData('Marshmallow', 318, 0, 81, 2.0),
// //   // createData('Nougat', 360, 19.0, 9, 37.0),
// //   // createData('Oreo', 437, 18.0, 63, 4.0),
// // //];

// // function descendingComparator(a, b, orderBy) {
// //   if (b[orderBy] < a[orderBy]) {
// //     return -1;
// //   }
// //   if (b[orderBy] > a[orderBy]) {
// //     return 1;
// //   }
// //   return 0;
// // }

// // function getComparator(order, orderBy) {
// //   return order === 'desc'
// //     ? (a, b) => descendingComparator(a, b, orderBy)
// //     : (a, b) => -descendingComparator(a, b, orderBy);
// // }

// // // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// // // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// // // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// // // with exampleArray.slice().sort(exampleComparator)
// // function stableSort(array, comparator) {
// //   const stabilizedThis = array.map((el, index) => [el, index]);
// //   stabilizedThis.sort((a, b) => {
// //     const order = comparator(a[0], b[0]);
// //     if (order !== 0) {
// //       return order;
// //     }
// //     return a[1] - b[1];
// //   });
// //   return stabilizedThis.map((el) => el[0]);
// // }

// // const headCells = [
// //   {
// //     id: 'name',
// //     numeric: false,
// //     disablePadding: true,
// //     label: 'Dessert (100g serving)',
// //   },
// //   {
// //     id: 'calories',
// //     numeric: true,
// //     disablePadding: false,
// //     label: 'Calories',
// //   },
// //   {
// //     id: 'fat',
// //     numeric: true,
// //     disablePadding: false,
// //     label: 'Fat (g)',
// //   },
// //   {
// //     id: 'carbs',
// //     numeric: true,
// //     disablePadding: false,
// //     label: 'Carbs (g)',
// //   },
// //   {
// //     id: 'protein',
// //     numeric: true,
// //     disablePadding: false,
// //     label: 'Protein (g)',
// //   },
// // ];

// // function EnhancedTableHead(props) {
// //   GetUsers();
// //   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
// //     props;
// //   const createSortHandler = (property) => (event) => {
// //     onRequestSort(event, property);
// //   };

// //   return (

// //     <TableHead>
// //       <TableRow>
// //         <TableCell padding="checkbox">
// //           <Checkbox
// //             color="primary"
// //             indeterminate={numSelected > 0 && numSelected < rowCount}
// //             checked={rowCount > 0 && numSelected === rowCount}
// //             onChange={onSelectAllClick}
// //             inputProps={{
// //               'aria-label': 'select all desserts',
// //             }}
// //           />
// //         </TableCell>
// //         {headCells.map((headCell) => (
// //           <TableCell
// //             key={headCell.id}
// //             align={headCell.numeric ? 'right' : 'left'}
// //             padding={headCell.disablePadding ? 'none' : 'normal'}
// //             sortDirection={orderBy === headCell.id ? order : false}
// //           >
// //             <TableSortLabel
// //               active={orderBy === headCell.id}
// //               direction={orderBy === headCell.id ? order : 'asc'}
// //               onClick={createSortHandler(headCell.id)}
// //             >
// //               {headCell.label}
// //               {orderBy === headCell.id ? (
// //                 <Box component="span" sx={visuallyHidden}>
// //                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
// //                 </Box>
// //               ) : null}
// //             </TableSortLabel>
// //           </TableCell>
// //         ))}
// //       </TableRow>
// //     </TableHead>
// //   );
// // }

// // EnhancedTableHead.propTypes = {
// //   numSelected: PropTypes.number.isRequired,
// //   onRequestSort: PropTypes.func.isRequired,
// //   onSelectAllClick: PropTypes.func.isRequired,
// //   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
// //   orderBy: PropTypes.string.isRequired,
// //   rowCount: PropTypes.number.isRequired,
// // };

// // function EnhancedTableToolbar(props) {
// //   const { numSelected } = props;

// //   return (
// //     <Toolbar
// //       sx={{
// //         pl: { sm: 2 },
// //         pr: { xs: 1, sm: 1 },
// //         ...(numSelected > 0 && {
// //           bgcolor: (theme) =>
// //             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
// //         }),
// //       }}
// //     >
// //       {numSelected > 0 ? (
// //         <Typography
// //           sx={{ flex: '1 1 100%' }}
// //           color="inherit"
// //           variant="subtitle1"
// //           component="div"
// //         >
// //           {numSelected} selected
// //         </Typography>
// //         //console.log('YES')
// //       ) : (
// //         //console.log('NO')
// //         <Typography
// //           sx={{ flex: '1 1 100%' }}
// //           variant="h6"
// //           id="tableTitle"
// //           component="div"
// //         >
// //           Nutrition
// //         </Typography>
// //       )}

// //       {numSelected > 0 ? (
// //         //console.log('YES')
// //         <Tooltip title="Delete">
// //           <IconButton>
// //             <DeleteIcon />
// //           </IconButton>
// //         </Tooltip>
// //       ) : (
// //         // console.log('NO')
// //         <Tooltip title="Filter list">
// //           <IconButton>
// //             <FilterListIcon />
// //           </IconButton>
// //         </Tooltip>
// //       )}
// //     </Toolbar>
// //     //console.log('Hola ',numSelected)
// //   );
 
// // }

// // EnhancedTableToolbar.propTypes = {
// //   numSelected: PropTypes.number.isRequired,
// // };

// // export default function Course() {
// //   const [order, setOrder] = React.useState('asc');
// //   const [orderBy, setOrderBy] = React.useState('calories');
// //   const [selected, setSelected] = React.useState([]);
// //   const [page, setPage] = React.useState(0);
// //   const [dense, setDense] = React.useState(false);
// //   const [rowsPerPage, setRowsPerPage] = React.useState(5);

// //   const handleRequestSort = (event, property) => {
// //     const isAsc = orderBy === property && order === 'asc';
// //     setOrder(isAsc ? 'desc' : 'asc');
// //     setOrderBy(property);
// //   };

// // const [data, setData] = React.useState([]);
// // const [loading, setLoading] = React.useState(true);




// //   // React.useEffect(() => {
// //   //   //GetUsers();
// //   //   //setLoading(false);
    
// //   //   const fetchData = async () => {
// //   //     try {
// //   //       const response = await axios.get('http://localhost/WebAPIAsistencia/Request/Course.php');
// //   //       setData(response.data);
// //   //       //console.log(data);
      
// //   //       // data.forEach(post => {
// //   //       //   //console.log('Post ID:', post.id);
// //   //       //   //console.log('Post Title:', post.course_name);
// //   //       //   rows.push(createData(post.id,post.course_name));
          
// //   //       //   // You can perform other operations on each post here
// //   //       // });
// //   //       console.log('rows',rows);
        
// //   //       setLoading(false);
// //   //     } catch (error) {
// //   //       console.error('Error fetching data:', error);
// //   //       setLoading(false);
// //   //     }
// //   //   };
// //   //   //console.log('hora');
// //   //   console.log('rows',rows.length );
// //   //   if(rows.length === 1){
// //   //   fetchData();
// //   // }
    
// //   // });

// //   const handleSelectAllClick = (event) => {
// //     if (event.target.checked) {
// //       const newSelected = rows.map((n) => n.name);
// //       setSelected(newSelected);
// //       return;
// //     }
// //     setSelected([]);
    
// //   };

// //   const handleClick = (event, name) => {
// //     const selectedIndex = selected.indexOf(name);
// //     let newSelected = [];

// //     if (selectedIndex === -1) {
// //       newSelected = newSelected.concat(selected, name);
// //     } else if (selectedIndex === 0) {
// //       newSelected = newSelected.concat(selected.slice(1));
// //     } else if (selectedIndex === selected.length - 1) {
// //       newSelected = newSelected.concat(selected.slice(0, -1));
// //     } else if (selectedIndex > 0) {
// //       newSelected = newSelected.concat(
// //         selected.slice(0, selectedIndex),
// //         selected.slice(selectedIndex + 1),
// //       );
// //     }

// //     setSelected(newSelected);
// //   };

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const handleChangeDense = (event) => {
// //     setDense(event.target.checked);
// //   };

// //   const isSelected = (name) => selected.indexOf(name) !== -1;

// //   // Avoid a layout jump when reaching the last page with empty rows.
// //   const emptyRows =
// //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

// //   const visibleRows = React.useMemo(
// //     () =>
    
// //       stableSort(rows, getComparator(order, orderBy)).slice(
// //         page * rowsPerPage,
// //         page * rowsPerPage + rowsPerPage,
// //       ),
// //     [order, orderBy, page, rowsPerPage],
// //   );

// //   return (
// //     <Box sx={{ width: '100%' }}>
// //       <Paper sx={{ width: '100%', mb: 2 }}>
// //         <EnhancedTableToolbar numSelected={selected.length} />
// //         <TableContainer>
// //           <Table
// //             sx={{ minWidth: 750 }}
// //             aria-labelledby="tableTitle"
// //             size={dense ? 'small' : 'medium'}
// //           >
// //             <EnhancedTableHead
// //               numSelected={selected.length}
// //               order={order}
// //               orderBy={orderBy}
// //               onSelectAllClick={handleSelectAllClick}
// //               onRequestSort={handleRequestSort}
// //               rowCount={rows.length}
// //             />
// //             <TableBody>
// //               {visibleRows.map((row, index) => {
// //                 const isItemSelected = isSelected(row.name);
// //                 const labelId = `enhanced-table-checkbox-${index}`;

// //                 return (
// //                   <TableRow
// //                     hover
// //                     onClick={(event) => handleClick(event, row.name)}
// //                     role="checkbox"
// //                     aria-checked={isItemSelected}
// //                     tabIndex={-1}
// //                     key={row.name}
// //                     selected={isItemSelected}
// //                     sx={{ cursor: 'pointer' }}
// //                   >
// //                     <TableCell padding="checkbox">
// //                       <Checkbox
// //                         color="primary"
// //                         checked={isItemSelected}
// //                         inputProps={{
// //                           'aria-labelledby': labelId,
// //                         }}
// //                       />
// //                     </TableCell>
// //                     <TableCell
// //                       component="th"
// //                       id={labelId}
// //                       scope="row"
// //                       padding="none"
// //                     >
// //                       {row.name}
// //                     </TableCell>
// //                     <TableCell align="right">{row.calories}</TableCell>
// //                     <TableCell align="right">{row.fat}</TableCell>
// //                     <TableCell align="right">{row.carbs}</TableCell>
// //                     <TableCell align="right">{row.protein}</TableCell>
// //                   </TableRow>
// //                 );
// //               })}
// //               {emptyRows > 0 && (
// //                 <TableRow
// //                   style={{
// //                     height: (dense ? 33 : 53) * emptyRows,
// //                   }}
// //                 >
// //                   <TableCell colSpan={6} />
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //         <TablePagination
// //           rowsPerPageOptions={[5, 10, 25]}
// //           component="div"
// //           count={rows.length}
// //           rowsPerPage={rowsPerPage}
// //           page={page}
// //           onPageChange={handleChangePage}
// //           onRowsPerPageChange={handleChangeRowsPerPage}
// //         />
// //       </Paper>
// //       <FormControlLabel
// //         control={<Switch checked={dense} onChange={handleChangeDense} />}
// //         label="Dense padding"
// //       />
// //     </Box>
// //   );
// // }

// // import React,{useState} from "react";
// // import {Box,Grid} from '@material-ui/core'
// // import '../css/styles.css';
// // import { Form, Input, Button, AutoComplete } from "antd";
// //  import Modal from '../Components/CourseModal';

// // import DataTable from 'react-data-table-component';

// // const columns =[
// //     {
// //       name:'#',   
// //       selector: row => row.total,  
// //       width:10,
// //     },
// //     {
// //         name:'Name',
// //         selector: row => row.name,
// //         sortable:true,
        
// //       }
// //   ];

// //   const data = [
// //     {
// //       id:1,
// //       total:1,
// //       name:'Matematicas'      
// //     }
   
   
// //   ];


// // function Course(){
// //     const [modalOpen, setModalOpen] = useState(false);
    
// //     return(
// //         <>
// //        <div className="text-start">
// //                 <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />            
// //             </div>
// //             <div className="text-end">
// //             <input type="text"/>
// //             </div>
// //         <div className="conteiner mt-5">        
            
// //             <DataTable columns={columns} data={data} pagination></DataTable>
// //        </div>
// //        </>
// //     );
// // }

// // export default Course;