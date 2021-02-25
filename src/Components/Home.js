//npm i bootstrap reactstrap axios sweetalert react-bootstrap-icons
import React from 'react';
//para trabajar con imagenes
//primero la tengo que importar de dnde esta
import imagenes from '../assets/imagenes';
import "../assets/css/Home.css";

const inicio = () => {
    return (
        <div className="App fondo">
            <div className="info">
                <h1>GIV COVID-19</h1>
                <h2>Gestión integral de la vacunación COVID-19</h2>
                <div>
                    <img src={imagenes.img5} alt="Logo del Ministerior de Sanidad, Consumo y Bienestar Social"></img>
                </div>
            </div>
            <img src={imagenes.img6} alt="Imagen de portada"></img>
        </div>
    )
}

export default inicio;