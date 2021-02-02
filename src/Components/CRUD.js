
//npm i bootstrap reactstrap axios sweetalert
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
//libreria para mejorar los alert   https://sweetalert.js.org/guides/
//npm install sweetalert --save
import swal from 'sweetalert';
function CRUD() {
    //direccion de la API
    const baseUrl="http://localhost:4004/users/";
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]= useState(false);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [frameworkSeleccionado, setFrameworkSeleccionado]=useState({
      id: '',
      firstName: '',
      lastName: ''
      
    });
  
    const handleChange=e=>{
      const {name, value}=e.target;
      setFrameworkSeleccionado((prevState)=>({
        ...prevState,
        [name]: value
      }))
      console.log(frameworkSeleccionado);
    }
  
    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }
  
    const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
    }
  
    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }
  
    const peticionGet=async()=>{
      
     
      await axios.get(baseUrl)
      .then(response=>{
        setData(response.data);
        //console.log(response.data);
      }).catch(error=>{
        console.log(error);
      })
    }//peticionGet
  
    const peticionPost=async()=>{
      const usuario={
        firstName:frameworkSeleccionado.firstName,
        lastName:frameworkSeleccionado.lastName
      };
      
      await axios.post(baseUrl+"insertar/", usuario)
      .then(response=>{
       
        //cerramos la ventana modal
        abrirCerrarModalInsertar();
        //refresco la tabla haciendo una peticion get
        peticionGet();
        
      }).catch(error=>{
        console.log(error);
      })
    }//peticionPost
  
    const peticionPut=async()=>{
      
      
      const usuario={
        firstName:frameworkSeleccionado.firstName,
        lastName:frameworkSeleccionado.lastName
      };
      await axios.put(baseUrl+"modificar/"+frameworkSeleccionado.id,usuario)
      .then(response=>{
        if (response.data!=null)
        {
         //swal("Good job!", "You clicked the button!", "success"); 
          swal("Buen trabajo!","Registro Modificado Satisfactoriamente","success");
         
          abrirCerrarModalEditar();
           //refresco la tabla haciendo una peticion delete
           peticionGet();
        }  
       
      }).catch(error=>{
        console.log(error);
      })
    }//peticionPut
  
    const peticionDelete=async()=>{
     
      axios.delete(baseUrl+"borrar/"+frameworkSeleccionado.id).then(response=>{
      if (response.data!=null)
      {
        swal("Buen trabajo!","Registro Borrado Satisfactoriamente","success");
        abrirCerrarModalEliminar();
         //refresco la tabla haciendo una peticion delete
         peticionGet();
      }
      
       
      }).catch(error=>{
        console.log(error);
       
      })
    }//peticionDelete
  
    const seleccionarFramework=(framework, caso)=>{
      setFrameworkSeleccionado(framework);
  
      (caso==="Editar")?
      abrirCerrarModalEditar():
      abrirCerrarModalEliminar()
    }
  
    useEffect(()=>{
      peticionGet();
    },[])
  
    return (
      <div style={{textAlign: 'center'}}>
  <br />
        <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
        <br /><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {console.log(data[0])}
          {data.map(framework=>(
            <tr key={framework.id}>
              {/*console.log(framework.first_name)*/}
              {/* el nombre de los campos que vienen a continuacion tienes que ser
              los que nos devuelve el JSON. Fijate en como se llaman cuando te devuelve 
              haciendo una peticion get por la url http://localhost:4008/users/
              [{"id":1,"firstName":"juan","lastName":"Perez"},
              {"id":2,"firstName":"Ana","lastName":"Soria"},
              {"id":3,"firstName":"Luis","lastName":"Rodrigo"},
              {"id":4,"firstName":"Raquel","lastName":"Segovia"}]
  
              
              */}
              <td>{framework.id}</td>
              <td>{framework.firstName}</td>
              <td>{framework.lastName}</td>
              
            <td>
            <button className="btn btn-primary" onClick={()=>seleccionarFramework(framework, "Editar")}>Editar</button> 
            <button className="btn btn-danger" onClick={()=>seleccionarFramework(framework, "Eliminar")}>Eliminar</button>
            </td>
            </tr>
          ))}
  
  
        </tbody> 
  
      </table>
  
  
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Usuarios</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>First Name: </label>
            <br />
            <input type="text" className="form-control" name="firstName" onChange={handleChange}/>
            <br />
            <label>Last Name: </label>
            <br />
            <input type="text" className="form-control" name="lastName" onChange={handleChange}/>
            <br />
            
          </div>
        </ModalBody>
        <ModalFooter>
          
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
  
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Usuarios</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="firstName" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.firstName}/>
            <br />
            <label>Lanzamiento: </label>
            <br />
            <input type="text" className="form-control" name="lastName" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.lastName}/>
            <br />
            
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPut()}>Modificar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
  
      <Modal isOpen={modalEliminar}>
          <ModalBody>
          ¿Estás seguro que deseas eliminar al Usuario {frameworkSeleccionado && frameworkSeleccionado.nombre}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionDelete()}>
              Sí
            </button>
            <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()} >
              No
            </button>
          </ModalFooter>
        </Modal>
  
      </div>
    );
  }
  
  export default CRUD;