import React, { Fragment, useState, useEffect } from 'react';
const APIUrl = "https://api-pint.herokuapp.com";

//CMV Dashboard--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function CardCMVDashboard() {
    const [origem_menos_popular, setOrigem_menos_popular] = useState([]);
    const [destino_menos_popular, setDestino_menos_popular] = useState([]);
    const [origem_mais_popular, setOrigem_mais_popular] = useState([]);
    const [destino_mais_popular, setDestino_mais_popular] = useState([]);
    const [motorista, setMotorista] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [viagem, setViagem] = useState([]);

    async function getGeralOrigemMenosPopular() {
        const res = await fetch(APIUrl + "/estatisticas/geral/origemmenospopular");
        const GeralArray = await res.json();
        setOrigem_menos_popular(GeralArray);
    }
    async function getGeralDestinoMenosPopular() {
        const res = await fetch(APIUrl + "/estatisticas/geral/destinomenospopular");
        const GeralArray = await res.json();
        setDestino_menos_popular(GeralArray);
    }
    async function getGeralOrigemMaisPopular() {
        const res = await fetch(APIUrl + "/estatisticas/geral/origemmaispopular");
        const GeralArray = await res.json();
        setOrigem_mais_popular(GeralArray);
    }
    async function getGeralDestinoMaisPopular() {
        const res = await fetch(APIUrl + "/estatisticas/geral/destinomaispopular");
        const GeralArray = await res.json();
        setDestino_mais_popular(GeralArray);
    }
    async function getGeralClientes() {
        const res = await fetch(APIUrl + "/estatisticas/geral/clientes");
        const GeralArray = await res.json();
        setCliente(GeralArray);
    }
    async function getGeralMotoristas() {
        const res = await fetch(APIUrl + "/estatisticas/geral/motoristas");
        const GeralArray = await res.json();
        setMotorista(GeralArray);
    }
    async function getGeralViagens() {
        const res = await fetch(APIUrl + "/estatisticas/geral/viagens");
        const GeralArray = await res.json();
        setViagem(GeralArray);
    }

    useEffect(() => {
        getGeralOrigemMaisPopular();
        getGeralDestinoMaisPopular();
        getGeralOrigemMenosPopular();
        getGeralDestinoMenosPopular();
        getGeralClientes();
        getGeralMotoristas();
        getGeralViagens();
    }, []);

    return (
        <Fragment>
            <div className="card-deck">
                <div className="card card-body bg-light h-100">
                    <h4 className="card-title">Total de viagens</h4>
                    <hr/>
                    {viagem.map(viagem => (
                        <h4 key="1">{viagem.num_viagens}</h4>
                    ))}
                </div>
                <div className="card card-body bg-light h-100">
                    <h4 className="card-title">Total de motoristas</h4>
                    <hr/>
                    {motorista.map(motorista => (
                        <h4 key="1">{motorista.num_moto}</h4>
                    ))}
                </div>
                <div className="card card-body bg-light h-100">
                    <h4 className="card-title">Total de clientes</h4>
                    <hr/>
                    {cliente.map(cliente => (
                        <h4 key="1">{cliente.num_cli}</h4>
                    ))}
                </div>
            </div>
            <div className="card-deck">
                <div className="card card-body bg-light h-100">
                    <h4 className="card-title">Origem mais popular</h4>
                    <hr/>
                    {origem_mais_popular.map(origem_mais_popular => (
                        <h4 key="1">{origem_mais_popular.origem}</h4>
                    ))}
                </div>
                <div className="card card-body bg-light h-100">
                    <h4 className="card-title">Destino mais popular</h4>
                    <hr/>
                    {destino_mais_popular.map(destino_mais_popular => (
                        <h4 key="1">{destino_mais_popular.destino}</h4>
                    ))}
                </div>
            </div>
            <div className="card-deck">
                <div className="card card-body bg-light h-100">
                    <h4 className="card-title">Origem menos popular</h4>
                    <hr/>
                    {origem_menos_popular.map(origem_menos_popular => (
                        <h4 key="1">{origem_menos_popular.origem}</h4>
                    ))}
                </div>
                <div className="card card-body bg-light h-100">
                    <h4 className="card-title">Destino menos popular</h4>
                    <hr/>
                    {destino_menos_popular.map(destino_menos_popular => (
                        <h4 key="1">{destino_menos_popular.destino}</h4>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

function TabsCMVDashboard() {
    return (
        <Fragment>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
                <a className="nav-link active" id="geral-tab" data-toggle="tab" href="#geral" role="tab" aria-controls="geral" aria-selected="true">Geral</a>
            </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="geral" role="tabpanel" aria-labelledby="geral-tab"><CardCMVDashboard/></div>
            </div>
        </Fragment>
    );
}

export{
    TabsCMVDashboard
}
