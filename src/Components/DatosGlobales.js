import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pricing = () => {
    const baseUrl = "http://localhost:5000/vacunas/";
    const [data, setData] = useState([]);
    const [dosis_entregadas, setDosisEntregadas] = useState([0]);

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
                console.log(response.data);
                //setDosisEntregadas()
            }).catch(error => {
                console.log(error);
            })
    }//peticionGet
    useEffect(() => {
        peticionGet();
    }, [])
    return (
        <div className="App">
            <h1>Datos Globales</h1>
            {dosis_entregadas}
        </div>
    )
}

export default Pricing;