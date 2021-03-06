//npm i bootstrap reactstrap axios sweetalert react-bootstrap-icons
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {PencilFill, TrashFill} from 'react-bootstrap-icons';
import axios from 'axios';
//libreria para mejorar los alert   https://sweetalert.js.org/guides/
//npm install sweetalert --save
import swal from 'sweetalert';
import '../assets/css/CRUD.css';

function CRUD() {
  //direccion de la API
  const baseUrl = "http://localhost:5000/vacunas/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
    id: '',
    comunidad: '',
    pzifer: '',
    moderna: '',
    dosisAdministradas: '',
    pautaCompleta: '',
    fechaUltVacuna: ''

  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFrameworkSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(frameworkSeleccionado);
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const peticionGet = async () => {


    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      })
  }//peticionGet

  const peticionPost = async () => {
    { console.log(frameworkSeleccionado.dosisAdministradas) };
    const vacuna = {
      comunidad: frameworkSeleccionado.comunidad,
      pzifer: frameworkSeleccionado.pzifer,
      moderna: frameworkSeleccionado.moderna,
      dosisAdministradas: frameworkSeleccionado.dosisAdministradas,
      pautaCompleta: frameworkSeleccionado.pautaCompleta,
      fechaUltVacuna: frameworkSeleccionado.fechaUltVacuna
    };

    await axios.post(baseUrl + "insertar/", vacuna)
      .then(response => {

        //cerramos la ventana modal
        abrirCerrarModalInsertar();
        //refresco la tabla haciendo una peticion get
        peticionGet();

      }).catch(error => {
        console.log(error);
      })
  }//peticionPost

  const peticionPut = async () => {


    const vacuna = {
      comunidad: frameworkSeleccionado.comunidad,
      pzifer: frameworkSeleccionado.pzifer,
      moderna: frameworkSeleccionado.moderna,
      dosisAdministradas: frameworkSeleccionado.dosisAdministradas,
      pautaCompleta: frameworkSeleccionado.pautaCompleta,
      fechaUltVacuna: frameworkSeleccionado.fechaUltVacuna
    };
    await axios.put(baseUrl + "modificar/" + frameworkSeleccionado.id, vacuna)
      .then(response => {
        if (response.data != null) {
          //swal("Good job!", "You clicked the button!", "success"); 
          swal("Buen trabajo!", "Registro Modificado Satisfactoriamente", "success");

          abrirCerrarModalEditar();
          //refresco la tabla haciendo una peticion delete
          peticionGet();
        }

      }).catch(error => {
        console.log(error);
      })
  }//peticionPut

  const peticionDelete = async () => {

    axios.delete(baseUrl + "borrar/" + frameworkSeleccionado.id).then(response => {
      if (response.data != null) {
        swal("Buen trabajo!", "Registro Borrado Satisfactoriamente", "success");
        abrirCerrarModalEliminar();
        //refresco la tabla haciendo una peticion delete
        peticionGet();
      }


    }).catch(error => {
      console.log(error);

    })
  }//peticionDelete

  const seleccionarFramework = (framework, caso) => {
    setFrameworkSeleccionado(framework);

    (caso === "Editar") ?
      abrirCerrarModalEditar() :
      abrirCerrarModalEliminar()
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      <button className="btn btn-success" style={{fontSize: "24px"}}  onClick={() => abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
      <table className="table table-striped container-xl">
        <thead>
          <tr className="bg-info text-white">
            <th>ID</th>
            <th>Comunidad</th>
            <th>Pzifer</th>
            <th>Moderna</th>
            <th>Dosis administradas</th>
            <th>Pautas completas</th>
            <th>Fecha de última vacunación</th>
            <th>Opción</th>
          </tr>
        </thead>
        <tbody>
          {/*console.log(data[0])*/}
          {data.map(framework => (
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
              <td>{framework.comunidad}</td>
              <td>{framework.pzifer}</td>
              <td>{framework.moderna}</td>
              <td>{framework.dosisAdministradas}</td>
              <td>{framework.pautaCompleta}</td>
              <td>{framework.fechaUltVacuna}</td>
              {/*console.log(framework)*/}
              <td className="custom">
                <button className="btn btn-primary" onClick={() => seleccionarFramework(framework, "Editar")}><PencilFill/></button>
                <button className="btn btn-danger" onClick={() => seleccionarFramework(framework, "Eliminar")}><TrashFill/></button>
              </td>
            </tr>
          ))}


        </tbody>

      </table>


      <Modal isOpen={modalInsertar}>
        {/*
        <ModalHeader>Insertar Usuarios</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Comunidad: </label>
            <br />
            <input type="text" className="form-control" name="comunidad" required onChange={handleChange} />
            <br />
            <label>Pzifer: </label>
            <br />
            <input type="text" className="form-control" name="pzifer" required onChange={handleChange} />
            <br />
            <label>Moderna: </label>
            <br />
            <input type="text" className="form-control" name="moderna" required onChange={handleChange} />
            <br />
            <label>Dosis Administradas: </label>
            <br />
            <input type="text" className="form-control" name="dosisAdministradas" required onChange={handleChange} />
            <br />
            <label>Pauta Completa: </label>
            <br />
            <input type="text" className="form-control" name="pautaCompleta" required onChange={handleChange} />
            <br />
            <label>Fecha Ult Vacuna: </label>
            <br />
            <input type="text" className="form-control" name="fechaUltVacuna" required placeholder="YYYY-MM-DD" pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])/(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])/(?:30))|(?:(?:0\[13578\]|1\[02\])-31))" title="Por favor, introduce una fecha válida [YYYY-MM-DD]" onChange={handleChange} />
          </div>
        </ModalBody>
        <ModalFooter>

          <button className="btn btn-primary" onClick={() => peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
        */}
        <ModalHeader>Insertar Usuarios</ModalHeader>
        <Form className="form-group">
          <ModalBody>
            <Col>
              <FormGroup>
                <Label>Comunidad</Label>
                <Input type="text" className="form-control required" name="comunidad" placeholder="Nombre de la comunidad" required onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Pzifer</Label>
                <Input type="number" className="form-control" name="pzifer" placeholder="Nº vacunas suministradas" onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Moderna</Label>
                <Input type="number" className="form-control" name="moderna" placeholder="Nº vacunas suministradas" onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Dosis Administradas</Label>
                <Input type="number" className="form-control" name="dosisAdministradas" placeholder="Nº dosis administradas" required onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Pauta completa</Label>
                <Input type="number" className="form-control" name="pautaCompleta" placeholder="Nº personas con pauta completa" required onChange={handleChange} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Fecha de la última vacuna</Label>
                <Input type="text" className="form-control" name="fechaUltVacuna" placeholder="Fecha de la última vacunación" required onChange={handleChange} />
              </FormGroup>
            </Col>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => peticionPost()}>Insertar</button>{"   "}
            <Button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Usuarios</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Comunidad: </label>
            <br />
            <input type="text" className="form-control" name="comunidad" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.comunidad} />
            <br />
            <label>Pzifer: </label>
            <br />
            <input type="text" className="form-control" name="pzifer" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.pzifer} />
            <br />
            <label>Moderna: </label>
            <br />
            <input type="text" className="form-control" name="moderna" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.moderna} />
            <br />
            <label>Dosis Administradas: </label>
            <br />
            <input type="text" className="form-control" name="dosisAdministradas" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.dosisAdministradas} />
            <br />
            <label>Pauta Completa: </label>
            <br />
            <input type="text" className="form-control" name="pautaCompleta" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.pautaCompleta} />
            <br />
            <label>Fecha Ult Vacuna: </label>
            <br />
            <input type="text" className="form-control" name="fechaUltVacuna" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.fechaUltVacuna} />
            <br />

          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()}>Modificar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar la Comunidad {frameworkSeleccionado && frameworkSeleccionado.comunidad}?
          </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()}>
            Sí
            </button>
          <button className="btn btn-secondary" onClick={() => abrirCerrarModalEliminar()} >
            No
            </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default CRUD;