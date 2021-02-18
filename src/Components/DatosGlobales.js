import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DatosGlobales.css';

const Pricing = () => {
    const baseUrl = "http://localhost:5000/vacunas/";
    const [data, setData] = useState([]);
    const [entregadas, setEntregadas] = useState([0]);
    const [administradas, setAdministradas] = useState([0]);
    const [porcentaje_Entregadas, setPorcentajeEntregadas] = useState([0]);
    const [pauta, setPauta] = useState([0]);
    const [porcentaje_Pauta, setPorcentajePauta] = useState([0]);

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                var dosisTotales = 0, dosisAdministradas = 0, pautaCompleta = 0;
                var porcRecibidas, porcAdministradas;

                setData(response.data);
                //console.log(response.data);

                response.data.map(function (item, i) {
                    dosisTotales += item.pzifer;
                    dosisTotales += item.moderna;
                    dosisAdministradas += item.dosis_Administradas;
                    pautaCompleta += item.pauta_Completa;
                });

                porcRecibidas = parseFloat(dosisAdministradas * 100 / dosisTotales).toFixed(2);
                porcAdministradas = parseFloat(pautaCompleta * 100 / dosisAdministradas).toFixed(2);
                console.log("Dosis entregadas en CC.AA: " + dosisTotales);
                console.log("Dosis Administradas: " + dosisAdministradas);
                console.log("Pauta Completa: " + pautaCompleta);
                console.log("Porcentaje dosis administradas de las recibidas: " + porcRecibidas);
                console.log("Porcentaje personas pauta completa de las dosis administradas: " + porcAdministradas);

                setEntregadas(dosisTotales);
                setAdministradas(dosisAdministradas);
                setPorcentajeEntregadas(porcRecibidas);
                setPauta(pautaCompleta);
                setPorcentajePauta(porcAdministradas);

                //setDosisEntregadas()
            }).catch(error => {
                console.log(error);
            })
    }//peticionGet
    useEffect(() => {
        peticionGet();
    }, [])
    return (
        <div className="App" style={{ textAlign: 'center' }}>
            <h1 className="gradient-text">Datos Globales</h1>
            <div className="global">
                <div className="bg-success rounded bg-custom-1 text-white align-middle">
                    <p>Dosis entregadas en CC.AA</p>
                    <p className="font-weight-bold font-size-xx-large">{entregadas.toLocaleString("es-ES")}</p>
                </div>
                <div className="bg-success rounded bg-custom-2 text-white align-middle">
                    <p>Dosis administradas</p>
                    <p className="font-weight-bold font-size-large border-bottom border-light">{administradas.toLocaleString("es-ES")}</p>
                    <p><b className="font-size-medium">{porcentaje_Entregadas.toLocaleString("es-ES")} %</b> dosis recibidas </p>
                </div>
                <div className="bg-success rounded bg-custom-1 text-white align-middle">
                    <p>Nº Personas con pauta completa</p>
                    <p className="font-weight-bold font-size-large border-bottom border-light">{pauta.toLocaleString("es-ES")}</p>
                    <p><b className="font-size-medium">{porcentaje_Pauta.toLocaleString("es-ES")} %</b> dosis administradas</p>
                </div>
            </div>
        </div>
    )
}

export default Pricing;