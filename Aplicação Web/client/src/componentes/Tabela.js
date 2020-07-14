import React, { Fragment, useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import PesquisarTabela from './Pesquisar';
import Pagination from './Pagination';
import { ButtonPresencialContabilidade, ButtonAdminRegistarMotorista } from './Buttons';
import { ModalTelefonistaCancelar, ModalConsultarComprovativos, ModalAdminEliminarViagem, ModalContactoEmergenciaMotorista, ModalContactoEmergenciaCliente, ModalAdminSuspenderCliente, ModalAdminSuspenderMotorista, ModalPresencialContabilidade, ModalPresencialEliminarDivida } from './Modal';
const APIUrl = "https://api-pint.herokuapp.com";

//Presencial Tabela--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function TabelaPresencialListar() {
    //Estados a serem usados
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [search, setSearch] = useState({value: ''});
    const [lastupdated, setLastupdated] = useState("");

    let data = new Date(), history = useHistory();
    
    //Procurar
    let filteredClientes = clientes.filter((clientes) => {
        if((clientes.pnome_cli.toLowerCase()+' '+clientes.unome_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (clientes.pnome_cli.toLowerCase()+' '+clientes.unome_cli.toLowerCase()).includes(search.value.toLowerCase());
        else if((clientes.email_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (clientes.email_cli.toLowerCase()).includes(search.value.toLowerCase());
        else if((clientes.contacto_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (clientes.contacto_cli.toLowerCase()).includes(search.value.toLowerCase());
        else if((clientes.localidade_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (clientes.localidade_cli.toLowerCase()).includes(search.value.toLowerCase());
    })

    const handleSearch = (e) => {
        setSearch({value: e.target.value});
    }

    const refresh = () => {
        history.push('/temp');
        history.goBack();
    }
    
    //Preencher a tabela com informações
    async function getClientes() {
        setLoading(true);
        const res = await fetch(APIUrl + "/clientes");
        const ClientesArray = await res.json();
        setClientes(ClientesArray);
        setLoading(false);
    }
    
    useEffect(() => {
        getClientes();
        let horas = data.getHours(), minutos = data.getMinutes();
        if(horas < 10) horas = "0" + horas;
        if(minutos < 10) minutos = "0" + minutos;
        setLastupdated(horas + ":" + minutos);
    }, []);

    //Animação de loading enquanto é feito o fetch da informação
    if (loading) {
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">A carregar...</span>
                </div>
            </div>
        );
    }

    //Paginação da tabela
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredClientes.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <PesquisarTabela handleSearch={handleSearch}/>
            <p className="font-italic pagination-indicator">Atualizado pela última vez às <b>{lastupdated}</b>&emsp;<button className="refresh_btn" onClick={refresh}>Atualizar <i className="fa fa-refresh" aria-hidden="true"></i></button></p>
            <div className="table-responsive">
                {" "}
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nome do Cliente</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telemóvel</th>
                            <th scope="col">Data de Nascimento</th>
                            <th scope="col">Localidade</th>
                            <th scope="col">Nome do contacto de emergência</th>
                            <th scope="col">Contacto de emergência</th>
                            <th scope="col">Comprovatido de Identidade</th>
                            <th scope="col">Comprovatido de Morada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(clientes => (
                        <tr key={clientes.id_cli}>
                            <td>{clientes.pnome_cli + ' ' + clientes.unome_cli}</td>
                            <td>{clientes.email_cli}</td>
                            <td>{clientes.contacto_cli}</td>
                            <td>{(clientes.datanascimento_cli).slice(0,10)}</td>
                            <td>{clientes.localidade_cli}</td>
                            <td>{clientes.nomeemergencia_cli}</td>
                            <td>{clientes.contactoemergencia_cli}</td>
                            <td>{clientes.comprovativoidentidade_cli}</td>
                            <td>{clientes.comprovativomorada_cli}</td>
                        </tr>
                         ))}
                    </tbody>
                </table>
            </div>
            <p className="font-italic pagination-indicator">Página <b>{currentPage}</b></p>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={clientes.length} paginate={paginate}/>
        </Fragment>			
    );
}

function TabelaPresencialContabilidade() {
    //Estados a serem usados
    const [dividas, setDividas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [search, setSearch] = useState({value: ''});  
    const [emails, setEmails] = useState("");
    const [lastupdated, setLastupdated] = useState("");

    let data = new Date(), history = useHistory();
    
    //Procurar
    let filteredDividas= dividas.filter((dividas) => {
        if((dividas.pnome_cli.toLowerCase()+' '+dividas.unome_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (dividas.pnome_cli.toLowerCase()+' '+dividas.unome_cli.toLowerCase()).includes(search.value.toLowerCase());
        else if((dividas.email_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (dividas.email_cli.toLowerCase()).includes(search.value.toLowerCase());
        else if((dividas.contacto_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (dividas.contacto_cli.toLowerCase()).includes(search.value.toLowerCase());
    })

    const handleSearch = (e) => {
        setSearch({value: e.target.value});
    }

    const refresh = () => {
        history.push('/temp');
        history.goBack();
    }
    
    //Preencher a tabela com informações
    async function getDividas() {
        setLoading(true);
        const res = await fetch(APIUrl + "/dividas");
        const DividasArray = await res.json();
        setDividas(DividasArray);
        setLoading(false);
    }
    
    useEffect(() => {
        getDividas();
        let horas = data.getHours(), minutos = data.getMinutes();
        if(horas < 10) horas = "0" + horas;
        if(minutos < 10) minutos = "0" + minutos;
        setLastupdated(horas + ":" + minutos);
    }, []);

    //Animação de loading enquanto é feito o fetch da informação
    if (loading) {
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">A carregar...</span>
                </div>
            </div>
        );
    }

    //Paginação da tabela
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredDividas.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const getEmails = () => {
        if(document.getElementById("notificar_sel").checked === true) {
            setEmails(emails.concat("," + document.getElementsByTagName("td")[2].innerHTML));
        }
        else setEmails(emails.replace("," + document.getElementsByTagName("td")[2].innerHTML, ""));
    }

    return (
        <Fragment>
            <PesquisarTabela handleSearch={handleSearch}/>
            <p className="font-italic pagination-indicator">Atualizado pela última vez às <b>{lastupdated}</b>&emsp;<button className="refresh_btn" onClick={refresh}>Atualizar <i className="fa fa-refresh" aria-hidden="true"></i></button></p>
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID Cliente</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contacto</th>
                            <th scope="col">Valor em Débito</th>
                            <th scope="col">Divida Paga</th>
                            <th scope="col">Gerar Fatura</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(dividas => (
                        <tr key={dividas.id_cli}>
                            <td>{dividas.id_cli}</td>
                            <td>{dividas.pnome_cli + ' ' + dividas.unome_cli}</td>
                            <td>{dividas.email_cli}</td>
                            <td>{dividas.contacto_cli}</td>
                            <td>{dividas.montante}</td>
                            <td><button type="button" className="btn btn-outline-dark btn-sm" data-toggle="modal" data-target={"#eliminar-divida-"+dividas.id_divida}><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                            <td><Link to={"/Presencial/Fatura?id="+dividas.id_divida}><button type="button" className="btn btn-outline-dark btn-sm"><i className="fa fa-plus" aria-hidden="true"></i></button></Link></td>
                            <td><input type="checkbox" onClick={getEmails} id="notificar_sel" autoComplete="off"/></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="font-italic pagination-indicator">Página <b>{currentPage}</b></p>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={dividas.length} paginate={paginate}/>
            <ButtonPresencialContabilidade/>
            <ModalPresencialEliminarDivida divida_eliminar={dividas} />
            <ModalPresencialContabilidade emails={emails.slice(1, emails.length)}/>
        </Fragment>
    );
}

function TabelaPresencialFatura() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    //Estados a serem usados
    const [dividas, setDividas] = useState([]);
    
    //Preencher a tabela com informações
    async function getDividas() {
        const res = await fetch(APIUrl + "/dividas/"+id);
        const DividasArray = await res.json();
        setDividas(DividasArray);
    }
    
    useEffect(() => {
        getDividas();
    }, []);

    return (
        <Fragment>
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID Cliente</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contacto</th>
                            <th scope="col">Valor em Débito</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{dividas.id_cli}</td>
                            <td>{dividas.pnome_cli + ' ' + dividas.unome_cli}</td>
                            <td>{dividas.email_cli}</td>
                            <td>{dividas.contacto_cli}</td>
                            <td>{dividas.montante}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row text-right">
                <div className="col-sm-8"></div>
                    <div className="col-sm-4">
                        <h3><b>Total:</b></h3>
                        <p className="total_price">{dividas.montante}</p>
                    </div>
            </div>
        </Fragment>
    );
}

//Telefonista Tabela--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function TabelaTelefonistaCancelar() {
    //Estados a serem usados
    const [viagens, setViagens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [search, setSearch] = useState({value: ''});
    const [lastupdated, setLastupdated] = useState("");

    let data = new Date(), history = useHistory();
    
    //Procurar
    let filteredViagens = viagens.filter((viagens) => {
        if((viagens.origem.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.origem.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.destino.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.destino.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.nome.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.nome.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.data_ida.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.data_ida.toLowerCase()).includes(search.value.toLowerCase());
        else if(viagens.data_volta && (viagens.data_volta.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.data_volta.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.hora_ida.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.hora_ida.toLowerCase()).includes(search.value.toLowerCase());
        else if(viagens.hora_volta && (viagens.hora_volta.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.hora_volta.toLowerCase()).includes(search.value.toLowerCase());
        else if(viagens.estado_pedido && (viagens.estado_pedido.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.estado_pedido.toLowerCase()).includes(search.value.toLowerCase());
    })

    const handleSearch = (e) => {
        setSearch({value: e.target.value});
    }

    const refresh = () => {
        history.push('/temp');
        history.goBack();
    }
    
    //Preencher a tabela com informações
    async function getViagens() {
        setLoading(true);
        const res = await fetch(APIUrl + "/pedidosviagem");
        const ViagensArray = await res.json();
        setViagens(ViagensArray);
        setLoading(false);
    }
    
    useEffect(() => {
        getViagens();
        let horas = data.getHours(), minutos = data.getMinutes();
        if(horas < 10) horas = "0" + horas;
        if(minutos < 10) minutos = "0" + minutos;
        setLastupdated(horas + ":" + minutos);
    }, []);

    //Animação de loading enquanto é feito o fetch da informação
    if (loading) {
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">A carregar...</span>
                </div>
            </div>
        );
    }

    //Paginação da tabela
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredViagens.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <PesquisarTabela handleSearch={handleSearch}/>
            <p className="font-italic pagination-indicator">Atualizado pela última vez às <b>{lastupdated}</b>&emsp;<button className="refresh_btn" onClick={refresh}>Atualizar <i className="fa fa-refresh" aria-hidden="true"></i></button></p>
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nome Cidadão</th>
                            <th scope="col">Origem</th>
                            <th scope="col">Destino</th>
                            <th scope="col">Data Ida</th>
                            <th scope="col">Hora Ida</th>
                            <th scope="col">Data Volta</th>
                            <th scope="col">Hora Volta</th>
                            <th scope="col">Estado do pedido</th>
                            <th scope="col">Cancelar Pedido</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentPosts.map(viagens => (
                        <tr key={viagens.id_pedido}>
                            <td>{viagens.nome}</td>
                            <td>{viagens.origem}</td>
                            <td>{viagens.destino}</td>
                            <td>{viagens.data_ida ? (viagens.data_ida).slice(0, 10) : viagens.data_ida }</td>
                            <td>{viagens.hora_ida ? (viagens.hora_ida).slice(0, 5) : viagens.hora_ida }</td>
                            <td>{viagens.data_volta ? (viagens.data_volta).slice(0, 10) : viagens.data_volta }</td>
                            <td>{viagens.hora_volta ? (viagens.hora_volta).slice(0, 5) : viagens.hora_volta }</td>
                            <td>{viagens.estado_pedido}</td>
                            <td><button type="button" className="btn btn-outline-dark btn-sm" data-toggle="modal" data-target={"#cancelar-pedido-"+viagens.id_pedido}><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                        </tr>
                         ))}
                    </tbody>
                </table>
                <br/>
            </div>
            <p className="font-italic pagination-indicator">Página <b>{currentPage}</b></p>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={viagens.length} paginate={paginate}/>
            <ModalTelefonistaCancelar pedido_cancelar={viagens}/>
        </Fragment>
    );
}

//CMV Tabela--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function TabelaCMVViagens() {
    //Estados a serem usados
    const [viagens, setViagens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [search, setSearch] = useState({value: ''});
    const [lastupdated, setLastupdated] = useState("");

    let data = new Date(), history = useHistory();
    
    //Procurar
    let filteredViagens = viagens.filter((viagens) => {
        if((viagens.origem.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.origem.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.destino.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.destino.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.nome.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.nome.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.motorista.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.motorista.toLowerCase()).includes(search.value.toLowerCase());
    })

    const handleSearch = (e) => {
        setSearch({value: e.target.value});
    }

    const refresh = () => {
        history.push('/temp');
        history.goBack();
    }
    
    //Preencher a tabela com informações
    async function getViagens() {
        setLoading(true);
        const res = await fetch(APIUrl + "/viagens");
        const ViagensArray = await res.json();
        setViagens(ViagensArray);
        setLoading(false);
    }
    
    useEffect(() => {
        getViagens();
        let horas = data.getHours(), minutos = data.getMinutes();
        if(horas < 10) horas = "0" + horas;
        if(minutos < 10) minutos = "0" + minutos;
        setLastupdated(horas + ":" + minutos);
    }, []);

    //Animação de loading enquanto é feito o fetch da informação
    if (loading) {
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">A carregar...</span>
                </div>
            </div>
        );
    }

    //Paginação da tabela
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredViagens.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <PesquisarTabela handleSearch={handleSearch}/>
            <p className="font-italic pagination-indicator">Atualizado pela última vez às <b>{lastupdated}</b>&emsp;<button className="refresh_btn" onClick={refresh}>Atualizar <i className="fa fa-refresh" aria-hidden="true"></i></button></p>
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Origem</th>
                            <th scope="col">Destino</th>
                            <th scope="col">Data Ida</th>
                            <th scope="col">Hora Ida</th>
                            <th scope="col">Data Volta</th>
                            <th scope="col">Hora Volta</th>
                            <th scope="col">Custo</th>
                            <th scope="col">Nome Cidadão</th>
                            <th scope="col">Nome Motorista</th>
                            <th scope="col">Viatura</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(viagens => (
                            <tr key={viagens.id_viagem}>
                            <td>{viagens.origem}</td>
                            <td>{viagens.destino}</td>
                            <td>{viagens.data_ida ? (viagens.data_ida).slice(0, 10) : viagens.data_ida }</td>
                            <td>{viagens.hora_ida ? (viagens.hora_ida).slice(0, 5) : viagens.hora_ida }</td>
                            <td>{viagens.data_volta ? (viagens.data_volta).slice(0, 10) : viagens.data_volta }</td>
                            <td>{viagens.hora_volta ? (viagens.hora_volta).slice(0, 5) : viagens.hora_volta }</td>
                            <td>{viagens.custo}</td>
                            <td>{viagens.nome}</td>
                            <td>{viagens.motorista}</td>
                            <td>{viagens.viatura}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="font-italic pagination-indicator">Página <b>{currentPage}</b></p>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={viagens.length} paginate={paginate}/>
        </Fragment>
    );
}

function TabelaCMVListar() {
    //Estados a serem usados
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [search, setSearch] = useState({value: ''});
    const [lastupdated, setLastupdated] = useState("");

    let data = new Date(), history = useHistory();
    
    //Procurar
    let filteredClientes = clientes.filter((clientes) => {
        if((clientes.pnome_cli.toLowerCase()+' '+clientes.unome_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (clientes.pnome_cli.toLowerCase()+' '+clientes.unome_cli.toLowerCase()).includes(search.value.toLowerCase());
        else if((clientes.email_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (clientes.email_cli.toLowerCase()).includes(search.value.toLowerCase());
        else if((clientes.contacto_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (clientes.contacto_cli.toLowerCase()).includes(search.value.toLowerCase());
        else if((clientes.localidade_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (clientes.localidade_cli.toLowerCase()).includes(search.value.toLowerCase());
    })

    const handleSearch = (e) => {
        setSearch({value: e.target.value});
    }

    const refresh = () => {
        history.push('/temp');
        history.goBack();
    }
    
    //Preencher a tabela com informações
    async function getClientes() {
        setLoading(true);
        const res = await fetch(APIUrl + "/clientes");
        const ClientesArray = await res.json();
        setClientes(ClientesArray);
        setLoading(false);
    }
    
    useEffect(() => {
        getClientes();
        let horas = data.getHours(), minutos = data.getMinutes();
        if(horas < 10) horas = "0" + horas;
        if(minutos < 10) minutos = "0" + minutos;
        setLastupdated(horas + ":" + minutos);
    }, []);

    //Animação de loading enquanto é feito o fetch da informação
    if (loading) {
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">A carregar...</span>
                </div>
            </div>
        );
    }

    //Paginação da tabela
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredClientes.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <PesquisarTabela handleSearch={handleSearch}/>
            <p className="font-italic pagination-indicator">Atualizado pela última vez às <b>{lastupdated}</b>&emsp;<button className="refresh_btn" onClick={refresh}>Atualizar <i className="fa fa-refresh" aria-hidden="true"></i></button></p>
            <div className="table-responsive">
                {" "}
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nome do Cliente</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telemóvel</th>
                            <th scope="col">Data de Nascimento</th>
                            <th scope="col">Localidade</th>
                            <th scope="col">Nome do contacto de emergência</th>
                            <th scope="col">Contacto de emergência</th>
                            <th scope="col">Comprovatido de Identidade</th>
                            <th scope="col">Comprovatido de Morada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(clientes => (
                            <tr key={clientes.id_cli}>
                            <td>{clientes.pnome_cli + ' ' + clientes.unome_cli}</td>
                            <td>{clientes.email_cli}</td>
                            <td>{clientes.contacto_cli}</td>
                            <td>{(clientes.datanascimento_cli).slice(0, 10)}</td>
                            <td>{clientes.localidade_cli}</td>
                            <td>{clientes.nomeemergencia_cli}</td>
                            <td>{clientes.contactoemergencia_cli}</td>
                            <td>{clientes.comprovativoidentidade_cli}</td>
                            <td>{clientes.comprovativomorada_cli}</td>
                        </tr>
                         ))}
                    </tbody>
                </table>
            </div>
            <p className="font-italic pagination-indicator">Página <b>{currentPage}</b></p>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={clientes.length} paginate={paginate}/>
        </Fragment>		
    );
}

function TabelaCMVMotoristas() {
    //Estados a serem usados
    const [motoristas, setMotoristas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [search, setSearch] = useState({value: ''});
    const [lastupdated, setLastupdated] = useState("");

    let data = new Date(), history = useHistory();
    
    //Procurar
    let filteredMotoristas = motoristas.filter((motoristas) => {
    if((motoristas.pnome_moto.toLowerCase()+' '+motoristas.unome_moto.toLowerCase()).includes(search.value.toLowerCase()))
        return (motoristas.pnome_moto.toLowerCase()+' '+motoristas.unome_moto.toLowerCase()).includes(search.value.toLowerCase());
    else if((motoristas.email_moto.toLowerCase()).includes(search.value.toLowerCase()))
        return (motoristas.email_moto.toLowerCase()).includes(search.value.toLowerCase());
    else if((motoristas.contacto_moto.toLowerCase()).includes(search.value.toLowerCase()))
        return (motoristas.contacto_moto.toLowerCase()).includes(search.value.toLowerCase());
    else if((motoristas.localidade_moto.toLowerCase()).includes(search.value.toLowerCase()))
        return (motoristas.localidade_moto.toLowerCase()).includes(search.value.toLowerCase());
    })

    const handleSearch = (e) => {
        setSearch({value: e.target.value});
    }

    const refresh = () => {
        history.push('/temp');
        history.goBack();
    }
    
    //Preencher a tabela com informações
    async function getMotoristas() {
        setLoading(true);
        const res = await fetch(APIUrl + "/motoristas");
        const MotoristasArray = await res.json();
        setMotoristas(MotoristasArray);
        setLoading(false);
    }
    
    useEffect(() => {
        getMotoristas();
        let horas = data.getHours(), minutos = data.getMinutes();
        if(horas < 10) horas = "0" + horas;
        if(minutos < 10) minutos = "0" + minutos;
        setLastupdated(horas + ":" + minutos);
    }, []);

    //Animação de loading enquanto é feito o fetch da informação
    if (loading) {
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">A carregar...</span>
                </div>
            </div>
        );
    }

    //Paginação da tabela
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredMotoristas.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <PesquisarTabela handleSearch={handleSearch}/>
            <p className="font-italic pagination-indicator">Atualizado pela última vez às <b>{lastupdated}</b>&emsp;<button className="refresh_btn" onClick={refresh}>Atualizar <i className="fa fa-refresh" aria-hidden="true"></i></button></p>
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nome do Motorista</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telemóvel</th>
                            <th scope="col">Data de Nascimento</th>
                            <th scope="col">Localidade</th>
                            <th scope="col">Contacto de emergência</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(motoristas => (
                            <tr key={motoristas.id_moto}>
                            <td>{motoristas.pnome_moto + ' ' + motoristas.unome_moto}</td>
                            <td>{motoristas.email_moto}</td>
                            <td>{motoristas.contacto_moto}</td>
                            <td>{(motoristas.datanascimento_moto).slice(0, 10)}</td>
                            <td>{motoristas.localidade_moto}</td>                 
                            <td><button type="button" className="btn btn-outline-dark btn-sm" data-toggle="modal" data-target={"#contacto-emergencia-"+motoristas.id_moto}><i className="fa fa-exclamation" aria-hidden="true"></i></button></td>
                            </tr>    
                        ))}
                    </tbody>
                </table>
            </div>	
            <p className="font-italic pagination-indicator">Página <b>{currentPage}</b></p>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={motoristas.length} paginate={paginate}/>
            <ModalContactoEmergenciaMotorista motorista={motoristas}/>
        </Fragment>
    );
}

//Admin Tabela--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function TabelaAdminListarPedidos() {
    //Estados a serem usados
    const [viagens, setViagens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [search, setSearch] = useState({value: ''});
    const [lastupdated, setLastupdated] = useState("");

    let data = new Date(), history = useHistory();
    
    //Procurar
    let filteredViagens = viagens.filter((viagens) => {
        if((viagens.origem.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.origem.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.destino.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.destino.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.nome.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.nome.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.data_ida.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.data_ida.toLowerCase()).includes(search.value.toLowerCase());
        else if(viagens.data_volta && (viagens.data_volta.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.data_volta.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.hora_ida.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.hora_ida.toLowerCase()).includes(search.value.toLowerCase());
        else if(viagens.hora_volta && (viagens.hora_volta.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.hora_volta.toLowerCase()).includes(search.value.toLowerCase());
        else if(viagens.estado_pedido && (viagens.estado_pedido.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.estado_pedido.toLowerCase()).includes(search.value.toLowerCase());
    })

    const handleSearch = (e) => {
        setSearch({value: e.target.value});
    }

    const refresh = () => {
        history.push('/temp');
        history.goBack();
    }
    
    //Preencher a tabela com informações
    async function getViagens() {
        setLoading(true);
        const res = await fetch(APIUrl + "/pedidosviagem/pedidoshoje");
        const ViagensArray = await res.json();
        setViagens(ViagensArray);
        setLoading(false);
    }
    
    useEffect(() => {
        getViagens();
        let horas = data.getHours(), minutos = data.getMinutes();
        if(horas < 10) horas = "0" + horas;
        if(minutos < 10) minutos = "0" + minutos;
        setLastupdated(horas + ":" + minutos);
    }, []);

    //Animação de loading enquanto é feito o fetch da informação
    if (loading) {
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">A carregar...</span>
                </div>
            </div>
        );
    }

    //Paginação da tabela
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredViagens.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
 
    return (
         <Fragment>
            <PesquisarTabela handleSearch={handleSearch}/>
            <p className="font-italic pagination-indicator">Atualizado pela última vez às <b>{lastupdated}</b>&emsp;<button className="refresh_btn" onClick={refresh}>Atualizar <i className="fa fa-refresh" aria-hidden="true"></i></button></p>
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nome Cidadão</th>
                            <th scope="col">Origem</th>
                            <th scope="col">Destino</th>
                            <th scope="col">Data Ida</th>
                            <th scope="col">Hora Ida</th>
                            <th scope="col">Data Volta</th>
                            <th scope="col">Hora Volta</th>
                            <th scope="col">Acompanhantes</th>
                            <th scope="col">Tamanho Bagagem</th>
                            <th scope="col">Quantidade Bagagem</th>
                            <th scope="col">Necessidades especiais</th>
                            <th scope="col">Estado do Pedido</th>
                            <th scope="col">Hora do Pedido</th>
                            <th scope="col">Eliminar pedido</th>
                            <th scope="col">Registar Viagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(viagens => (
                            <tr key={viagens.id_pedido}>
                            <td>{viagens.nome}</td>
                            <td>{viagens.origem}</td>
                            <td>{viagens.destino}</td>
                            <td>{viagens.data_ida ? (viagens.data_ida).slice(0, 10) : viagens.data_ida }</td>
                            <td>{viagens.hora_ida ? (viagens.hora_ida).slice(0, 5) : viagens.hora_ida }</td>
                            <td>{viagens.data_volta ? (viagens.data_volta).slice(0, 10) : viagens.data_volta }</td>
                            <td>{viagens.hora_volta ? (viagens.hora_volta).slice(0, 5) : viagens.hora_volta }</td>
                            <td>{viagens.acompanhantes}</td>
                            <td>{viagens.bagagem}</td>
                            <td>{viagens.bagagem_quant}</td>  
                            <td>{viagens.necessidades}</td>                          
                            <td>{viagens.estado_pedido}</td>                          
                            <td>{viagens.hora_pedido ? (viagens.hora_pedido).slice(0, 10) + " às " + (viagens.hora_pedido).slice(11, 16) : viagens.hora_pedido }</td>                                                                         
                            <td><button type="button" className="btn btn-outline-dark btn-sm" data-toggle="modal" data-target={"#eliminar-viagem-"+viagens.id_pedido}><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                            <td><Link to={"/Admin/RegistarViagem?id="+viagens.id_pedido}><button type="button" className="btn btn-outline-dark btn-sm"><i className="fa fa-plus" aria-hidden="true"></i></button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="font-italic pagination-indicator">Página <b>{currentPage}</b></p>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={viagens.length} paginate={paginate}/>
            <ModalAdminEliminarViagem id={viagens}/>
        </Fragment>
    );
}

function TabelaAdminViagensMarcadas() {
    //Estados a serem usados
    const [viagens, setViagens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [search, setSearch] = useState({value: ''});
    const [lastupdated, setLastupdated] = useState("");

    let data = new Date(), history = useHistory();
    
    //Procurar
    let filteredViagens = viagens.filter((viagens) => {
        if((viagens.origem.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.origem.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.destino.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.destino.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.nome.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.nome.toLowerCase()).includes(search.value.toLowerCase());
       else if((viagens.data_ida.toLowerCase()).includes(search.value.toLowerCase()))
           return (viagens.data_ida.toLowerCase()).includes(search.value.toLowerCase());
       else if(viagens.data_volta && (viagens.data_volta.toLowerCase()).includes(search.value.toLowerCase()))
           return (viagens.data_volta.toLowerCase()).includes(search.value.toLowerCase());
       else if((viagens.hora_ida.toLowerCase()).includes(search.value.toLowerCase()))
           return (viagens.hora_ida.toLowerCase()).includes(search.value.toLowerCase());
       else if(viagens.hora_volta && (viagens.hora_volta.toLowerCase()).includes(search.value.toLowerCase()))
           return (viagens.hora_volta.toLowerCase()).includes(search.value.toLowerCase());
    })

    const handleSearch = (e) => {
        setSearch({value: e.target.value});
    }

    const refresh = () => {
        history.push('/temp');
        history.goBack();
    }
    
    //Preencher a tabela com informações
    async function getViagens() {
        setLoading(true);
        const res = await fetch(APIUrl + "/viagens");
        const ViagensArray = await res.json();
        setViagens(ViagensArray);
        setLoading(false);
    }
    
    useEffect(() => {
        getViagens();
        let horas = data.getHours(), minutos = data.getMinutes();
        if(horas < 10) horas = "0" + horas;
        if(minutos < 10) minutos = "0" + minutos;
        setLastupdated(horas + ":" + minutos);
    }, []);

    //Animação de loading enquanto é feito o fetch da informação
    if (loading) {
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">A carregar...</span>
                </div>
            </div>
        );
    }

    //Paginação da tabela
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredViagens.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <Fragment>
            <PesquisarTabela handleSearch={handleSearch}/>
            <p className="font-italic pagination-indicator">Atualizado pela última vez às <b>{lastupdated}</b>&emsp;<button className="refresh_btn" onClick={refresh}>Atualizar <i className="fa fa-refresh" aria-hidden="true"></i></button></p>
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nome Cidadão</th>
                            <th scope="col">Origem</th>
                            <th scope="col">Destino</th>
                            <th scope="col">Data Ida</th>
                            <th scope="col">Hora Ida</th>
                            <th scope="col">Data Volta</th>
                            <th scope="col">Hora Volta</th>
                            <th scope="col">Acompanhantes</th>
                            <th scope="col">Tamanho Bagagem</th>
                            <th scope="col">Quantidade Bagagem</th>
                            <th scope="col">Necessidades especiais</th>
                            <th scope="col">Motorista</th>
                            <th scope="col">Viatura</th>            
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(viagens => (
                            <tr key={viagens.id_viagem}>
                            <td>{viagens.nome}</td>
                            <td>{viagens.origem}</td>
                            <td>{viagens.destino}</td>
                            <td>{viagens.data_ida ? (viagens.data_ida).slice(0, 10) : viagens.data_ida }</td>
                            <td>{viagens.hora_ida ? (viagens.hora_ida).slice(0, 5) : viagens.hora_ida }</td>
                            <td>{viagens.data_volta ? (viagens.data_volta).slice(0, 10) : viagens.data_volta }</td>
                            <td>{viagens.hora_volta ? (viagens.hora_volta).slice(0, 5) : viagens.hora_volta }</td>
                            <td>{viagens.num_pessoas}</td>
                            <td>{viagens.bagagem}</td>
                            <td>{viagens.bagagem_quant}</td>  
                            <td>{viagens.necessidades}</td>                          
                            <td>{viagens.motorista}</td>  
                            <td>{viagens.viatura}</td>  
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="font-italic pagination-indicator">Página <b>{currentPage}</b></p>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={viagens.length} paginate={paginate}/>
        </Fragment> 
    );
}

function TabelaAdminViagensRealizadas() {
    //Estados a serem usados
    const [viagens, setViagens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [search, setSearch] = useState({value: ''});
    const [lastupdated, setLastupdated] = useState("");

    let data = new Date(), history = useHistory();
    
    //Procurar
    let filteredViagens = viagens.filter((viagens) => {
        if((viagens.origem.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.origem.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.destino.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.destino.toLowerCase()).includes(search.value.toLowerCase());
        else if((viagens.nome.toLowerCase()).includes(search.value.toLowerCase()))
            return (viagens.nome.toLowerCase()).includes(search.value.toLowerCase());
       else if((viagens.data_ida.toLowerCase()).includes(search.value.toLowerCase()))
           return (viagens.data_ida.toLowerCase()).includes(search.value.toLowerCase());
       else if(viagens.data_volta && (viagens.data_volta.toLowerCase()).includes(search.value.toLowerCase()))
           return (viagens.data_volta.toLowerCase()).includes(search.value.toLowerCase());
       else if((viagens.hora_ida.toLowerCase()).includes(search.value.toLowerCase()))
           return (viagens.hora_ida.toLowerCase()).includes(search.value.toLowerCase());
       else if(viagens.hora_volta && (viagens.hora_volta.toLowerCase()).includes(search.value.toLowerCase()))
           return (viagens.hora_volta.toLowerCase()).includes(search.value.toLowerCase());
    })

    const handleSearch = (e) => {
        setSearch({value: e.target.value});
    }

    const refresh = () => {
        history.push('/temp');
        history.goBack();
    }
    
    //Preencher a tabela com informações
    async function getViagens() {
        setLoading(true);
        const res = await fetch(APIUrl + "/viagens/viagensrealizadas");
        const ViagensArray = await res.json();
        setViagens(ViagensArray);
        setLoading(false);
    }
    
    useEffect(() => {
        getViagens();
        let horas = data.getHours(), minutos = data.getMinutes();
        if(horas < 10) horas = "0" + horas;
        if(minutos < 10) minutos = "0" + minutos;
        setLastupdated(horas + ":" + minutos);
    }, []);

    //Animação de loading enquanto é feito o fetch da informação
    if (loading) {
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">A carregar...</span>
                </div>
            </div>
        );
    }

    //Paginação da tabela
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredViagens.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <Fragment>
            <PesquisarTabela handleSearch={handleSearch}/>
            <p className="font-italic pagination-indicator">Atualizado pela última vez às <b>{lastupdated}</b>&emsp;<button className="refresh_btn" onClick={refresh}>Atualizar <i className="fa fa-refresh" aria-hidden="true"></i></button></p>
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nome Cidadão</th>
                            <th scope="col">Origem</th>
                            <th scope="col">Destino</th>
                            <th scope="col">Data Ida</th>
                            <th scope="col">Hora Ida</th>
                            <th scope="col">Data Volta</th>
                            <th scope="col">Hora Volta</th>
                            <th scope="col">Acompanhantes</th>
                            <th scope="col">Tamanho Bagagem</th>
                            <th scope="col">Quantidade Bagagem</th>
                            <th scope="col">Necessidades especiais</th>
                            <th scope="col">Motorista</th>
                            <th scope="col">Viatura</th> 
                            <th scope="col">Custo total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(viagens => (
                            <tr key={viagens.id_viagem}>
                            <td>{viagens.nome}</td>
                            <td>{viagens.origem}</td>
                            <td>{viagens.destino}</td>
                            <td>{viagens.data_ida ? (viagens.data_ida).slice(0, 10) : viagens.data_ida }</td>
                            <td>{viagens.hora_ida ? (viagens.hora_ida).slice(0, 5) : viagens.hora_ida }</td>
                            <td>{viagens.data_volta ? (viagens.data_volta).slice(0, 10) : viagens.data_volta }</td>
                            <td>{viagens.hora_volta ? (viagens.hora_volta).slice(0, 5) : viagens.hora_volta }</td>
                            <td>{viagens.num_pessoas}</td>
                            <td>{viagens.bagagem}</td>
                            <td>{viagens.bagagem_quant}</td>  
                            <td>{viagens.necessidades}</td>                          
                            <td>{viagens.motorista}</td>  
                            <td>{viagens.viatura}</td>  
                            <td>{viagens.custo}</td>  
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="font-italic pagination-indicator">Página <b>{currentPage}</b></p>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={viagens.length} paginate={paginate}/>
        </Fragment>
    );
}

function TabelaAdminClientes() {
    //Estados a serem usados
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [search, setSearch] = useState({value: ''});
    const [lastupdated, setLastupdated] = useState("");

    let data = new Date(), history = useHistory();
    
    //Procurar
    let filteredClientes = clientes.filter((clientes) => {
        if((clientes.pnome_cli.toLowerCase()+' '+clientes.unome_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (clientes.pnome_cli.toLowerCase()+' '+clientes.unome_cli.toLowerCase()).includes(search.value.toLowerCase());
        else if((clientes.email_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (clientes.email_cli.toLowerCase()).includes(search.value.toLowerCase());
        else if((clientes.contacto_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (clientes.contacto_cli.toLowerCase()).includes(search.value.toLowerCase());
        else if((clientes.localidade_cli.toLowerCase()).includes(search.value.toLowerCase()))
            return (clientes.localidade_cli.toLowerCase()).includes(search.value.toLowerCase());
    })

    const handleSearch = (e) => {
        setSearch({value: e.target.value});
    }

    const refresh = () => {
        history.push('/temp');
        history.goBack();
    }
    
    //Preencher a tabela com informações
    async function getClientes() {
        setLoading(true);
        const res = await fetch(APIUrl + "/clientes");
        const ClientesArray = await res.json();
        setClientes(ClientesArray);
        setLoading(false);
    }
    
    useEffect(() => {
        getClientes();
        let horas = data.getHours(), minutos = data.getMinutes();
        if(horas < 10) horas = "0" + horas;
        if(minutos < 10) minutos = "0" + minutos;
        setLastupdated(horas + ":" + minutos);
    }, []);

    //Animação de loading enquanto é feito o fetch da informação
    if (loading) {
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">A carregar...</span>
                </div>
            </div>
        );
    }

    //Paginação da tabela
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredClientes.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <PesquisarTabela handleSearch={handleSearch}/>
            <p className="font-italic pagination-indicator">Atualizado pela última vez às <b>{lastupdated}</b>&emsp;<button className="refresh_btn" onClick={refresh}>Atualizar <i className="fa fa-refresh" aria-hidden="true"></i></button></p>
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nome do Cliente</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telemóvel</th>
                            <th scope="col">Data de Nascimento</th>
                            <th scope="col">Localidade</th>
                            <th scope="col">Estado do cliente</th>
                            <th scope="col">Contacto de emergência</th>
                            <th scope="col">Comprovativos</th>
                            <th scope="col">Suspender/Ativar Cliente</th>
                        </tr>
                    </thead>
                    <tbody>                            
                        {currentPosts.map(clientes => (
                            <tr key={clientes.id_cli}>
                            <td>{clientes.pnome_cli + ' ' + clientes.unome_cli}</td>
                            <td>{clientes.email_cli}</td>
                            <td>{clientes.contacto_cli}</td>
                            <td>{(clientes.datanascimento_cli).slice(0, 10)}</td>
                            <td>{clientes.localidade_cli}</td>
                            <td>{clientes.estado}</td>
                            <td className="id_user" style={{display:"none"}}>{clientes.id_cli}</td> 
                            <td><button type="button" className="btn btn-outline-dark btn-sm" data-toggle="modal" data-target={"#contacto-emergencia-"+clientes.id_cli}><i className="fa fa-exclamation" aria-hidden="true"></i></button></td>
                            <td><button type="button" className="btn btn-outline-dark btn-sm" data-toggle="modal" data-target={"#consultar-comprovativos-"+clientes.id_cli}><i className="fa fa-file-text-o" aria-hidden="true"></i></button></td>
                            <td><button type="button" className="btn btn-outline-dark btn-sm" data-toggle="modal" data-target={"#suspender-user-"+clientes.id_cli}><i className="fa fa-ban" aria-hidden="true"></i></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>	
            <p className="font-italic pagination-indicator">Página <b>{currentPage}</b></p>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={clientes.length} paginate={paginate}/>
            <ModalConsultarComprovativos cliente={clientes}/>
            <ModalContactoEmergenciaCliente cliente={clientes}/>
            <ModalAdminSuspenderCliente cliente={clientes}/>
        </Fragment>
    );
}

function TabelaAdminMotoristas() {
    //Estados a serem usados
    const [motoristas, setMotoristas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [search, setSearch] = useState({value: ''});
    const [lastupdated, setLastupdated] = useState("");

    let data = new Date(), history = useHistory();

    //Procurar
    let filteredMotoristas = motoristas.filter((motoristas) => {
        if((motoristas.pnome_moto.toLowerCase()+' '+motoristas.unome_moto.toLowerCase()).includes(search.value.toLowerCase()))
            return (motoristas.pnome_moto.toLowerCase()+' '+motoristas.unome_moto.toLowerCase()).includes(search.value.toLowerCase());
        else if((motoristas.email_moto.toLowerCase()).includes(search.value.toLowerCase()))
            return (motoristas.email_moto.toLowerCase()).includes(search.value.toLowerCase());
        else if((motoristas.contacto_moto.toLowerCase()).includes(search.value.toLowerCase()))
            return (motoristas.contacto_moto.toLowerCase()).includes(search.value.toLowerCase());
        else if((motoristas.localidade_moto.toLowerCase()).includes(search.value.toLowerCase()))
            return (motoristas.localidade_moto.toLowerCase()).includes(search.value.toLowerCase());
    })

    const handleSearch = (e) => {
        setSearch({value: e.target.value});
    }

    const refresh = () => {
        history.push('/temp');
        history.goBack();
    }

    //Preencher a tabela com informações
    async function getMotoristas() {
        setLoading(true);
        const res = await fetch(APIUrl + "/motoristas");
        const MotoristasArray = await res.json();
        setMotoristas(MotoristasArray);
        setLoading(false);
    }
    
    useEffect(() => {
        getMotoristas();
        let horas = data.getHours(), minutos = data.getMinutes();
        if(horas < 10) horas = "0" + horas;
        if(minutos < 10) minutos = "0" + minutos;
        setLastupdated(horas + ":" + minutos);
    }, []);

    //Animação de loading enquanto é feito o fetch da informação
    if (loading) {
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">A carregar...</span>
                </div>
            </div>
        );
    }

    //Paginação da tabela
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredMotoristas.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <PesquisarTabela handleSearch={handleSearch}/>
            <p className="font-italic pagination-indicator">Atualizado pela última vez às <b>{lastupdated}</b>&emsp;<button className="refresh_btn" onClick={refresh}>Atualizar <i className="fa fa-refresh" aria-hidden="true"></i></button></p>
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nome do Motorista</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telemóvel</th>
                            <th scope="col">Data de Nascimento</th>
                            <th scope="col">Localidade</th>
                            <th scope="col">Estado do motorista</th>
                            <th scope="col">Contacto de emergência</th>
                            <th scope="col">Suspender/Ativar Motorista</th>
                        </tr>
                    </thead>
                    <tbody>                           
                        {currentPosts.map(motoristas => (
                            <tr key={motoristas.id_moto}>
                            <td>{motoristas.pnome_moto + ' ' + motoristas.unome_moto}</td>
                            <td>{motoristas.email_moto}</td>
                            <td>{motoristas.contacto_moto}</td>
                            <td>{(motoristas.datanascimento_moto).slice(0, 10)}</td>
                            <td>{motoristas.localidade_moto}</td>   
                            <td>{motoristas.estado}</td>    
                            <td><button type="button" className="btn btn-outline-dark btn-sm" data-toggle="modal" data-target={"#contacto-emergencia-"+motoristas.id_moto}><i className="fa fa-exclamation" aria-hidden="true"></i></button></td>
                            <td><button type="button" className="btn btn-outline-dark btn-sm" data-toggle="modal" data-target={"#suspender-user-"+motoristas.id_moto}><i className="fa fa-ban" aria-hidden="true"></i></button></td>
                            </tr>    
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="font-italic pagination-indicator">Página <b>{currentPage}</b></p>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={motoristas.length} paginate={paginate}/>
            <ButtonAdminRegistarMotorista/>  
            <ModalContactoEmergenciaMotorista motorista={motoristas}/> 
            <ModalAdminSuspenderMotorista motorista={motoristas}/>
        </Fragment>	
    );
}

function TabelaViaturas() {
    //Estados a serem usados
    const [viaturas, setViaturas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [search, setSearch] = useState({value: ''});
    const [lastupdated, setLastupdated] = useState("");

    let data = new Date(), history = useHistory();

    //Procurar
    let filteredViaturas = viaturas.filter((viaturas) => {
        if((viaturas.matricula.toLowerCase()).includes(search.value.toLowerCase()))
            return (viaturas.matricula.toLowerCase()).includes(search.value.toLowerCase());
        else if((viaturas.marca.toLowerCase()).includes(search.value.toLowerCase()))
            return (viaturas.marca.toLowerCase()).includes(search.value.toLowerCase());
        else if((viaturas.cor.toLowerCase()).includes(search.value.toLowerCase()))
            return (viaturas.cor.toLowerCase()).includes(search.value.toLowerCase());
        else if((viaturas.ano.toLowerCase()).includes(search.value.toLowerCase()))
            return (viaturas.ano.toLowerCase()).includes(search.value.toLowerCase());
        else if((viaturas.num_lugares.toLowerCase()).includes(search.value.toLowerCase()))
            return (viaturas.num_lugares.toLowerCase()).includes(search.value.toLowerCase());
        else if((viaturas.modelo.toLowerCase()).includes(search.value.toLowerCase()))
            return (viaturas.modelo.toLowerCase()).includes(search.value.toLowerCase());
    })

    const handleSearch = (e) => {
        setSearch({value: e.target.value});
    }

    const refresh = () => {
        history.push('/temp');
        history.goBack();
    }

    //Preencher a tabela com informações
    async function getViaturas() {
        setLoading(true);
        const res = await fetch(APIUrl + "/viaturas");
        const ViaturasArray = await res.json();
        setViaturas(ViaturasArray);
        setLoading(false);
    }
    
    useEffect(() => {
        getViaturas();
        let horas = data.getHours(), minutos = data.getMinutes();
        if(horas < 10) horas = "0" + horas;
        if(minutos < 10) minutos = "0" + minutos;
        setLastupdated(horas + ":" + minutos);
    }, []);

    //Animação de loading enquanto é feito o fetch da informação
    if (loading) {
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">A carregar...</span>
                </div>
            </div>
        );
    }

    //Paginação da tabela
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredViaturas.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
         <Fragment>
            <PesquisarTabela handleSearch={handleSearch}/>
            <p className="font-italic pagination-indicator">Atualizado pela última vez às <b>{lastupdated}</b>&emsp;<button className="refresh_btn" onClick={refresh}>Atualizar <i className="fa fa-refresh" aria-hidden="true"></i></button></p>
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Matrícula</th>
                            <th scope="col">Nº de Lugares</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Cor</th>
                            <th scope="col">Ano</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(viaturas => (
                            <tr key={viaturas.id_veiculo}>
                            <td>{viaturas.matricula}</td>
                            <td>{viaturas.num_lugares}</td>
                            <td>{viaturas.marca}</td>
                            <td>{viaturas.modelo}</td>
                            <td>{viaturas.cor}</td>                   
                            <td>{viaturas.ano}</td>                   
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="font-italic pagination-indicator">Página <b>{currentPage}</b></p>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={viaturas.length} paginate={paginate}/>
        </Fragment>
    );
}

export{
    TabelaPresencialListar,
    TabelaPresencialContabilidade,
    TabelaPresencialFatura,
    TabelaTelefonistaCancelar,
    TabelaCMVViagens,
    TabelaCMVListar,
    TabelaCMVMotoristas,
    TabelaAdminListarPedidos,
    TabelaAdminViagensMarcadas,
    TabelaAdminViagensRealizadas,
    TabelaAdminClientes,
    TabelaAdminMotoristas,
    TabelaViaturas
}