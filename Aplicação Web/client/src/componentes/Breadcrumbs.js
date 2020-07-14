import React from 'react';
import { Link } from "react-router-dom";

//Presencial Breadcrumbs--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function BreadCrumbPresencialRegistar() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Registar Cliente</li>
            </ol>
        </nav>
    );
}

function BreadCrumbPresencialListar() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Lista de Clientes</li>
            </ol>
        </nav>
    );
}

function BreadCrumbPresencialContabilidade() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Contabilidade</li>
            </ol>
        </nav>
    );
}

function BreadCrumbPresencialFatura() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/Presencial/Contabilidade">Contabilidade</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Gerar Fatura</li>
            </ol>
        </nav>
    );
}

//Telefonista Breadcrumbs--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function BreadCrumbTelefonistaCancelar() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Cancelar Pedido</li>
            </ol>
        </nav>
    );
}

function BreadCrumbTelefonistaRegistar() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Registar Pedido</li>
            </ol>
        </nav>
    );
}

//CMV BreadCrumbs--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function BreadCrumbsCMVDashboard() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Estatíticas</li>
            </ol>
        </nav>
    );
}

function BreadCrumbsCMVViagens() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Viagens</li>
            </ol>
        </nav>
    );
}

function BreadCrumbsCMVListar() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Lista de Clientes</li>
            </ol>
        </nav>
    );
}

function BreadCrumbsCMVMotoristas() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Motoristas</li>
            </ol>
        </nav>
    );
}

function BreadCrumbsCMVViaturas() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Viaturas</li>
            </ol>
        </nav>
    );
}

//Admin BreadCrumbs--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function BreadCrumbsAdminListarPedidos() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Pedidos</li>
            </ol>
        </nav>
    );
}

function BreadCrumbsAdminRegistarViagem() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/Admin/ListarPedidos">Pedidos</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Registar Viagem</li>
            </ol>
        </nav>
    );
}

function BreadCrumbsAdminViagensMarcadas() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Viagens Marcadas</li>
            </ol>
        </nav>
    );
}

function BreadCrumbsAdminViagensRealizadas() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Viagens Realizadas</li>
            </ol>
        </nav>
    );
}

function BreadCrumbsAdminClientes() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Clientes</li>
            </ol>
        </nav>
    );
}

function BreadCrumbsAdminMotoristas() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Motoristas</li>
            </ol>
        </nav>
    );
}

function BreadCrumbsAdminViaturas() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Viaturas</li>
            </ol>
        </nav>
    );
}

function BreadCrumbsAdminRegistarMotorista() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/Admin/Motoristas">Motoristas</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Registar Motorista</li>
            </ol>
        </nav>
    );
}

function BreadCrumbsAdminregistarViatura() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/Admin/Viaturas">Viaturas</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Registar Viatura</li>
            </ol>
        </nav>
    );
}

export{
    BreadCrumbPresencialRegistar,
    BreadCrumbPresencialListar,
    BreadCrumbPresencialContabilidade,
    BreadCrumbPresencialFatura,
    BreadCrumbTelefonistaCancelar,
    BreadCrumbTelefonistaRegistar,
    BreadCrumbsCMVDashboard,
    BreadCrumbsCMVViagens,
    BreadCrumbsCMVListar,
    BreadCrumbsCMVMotoristas,
    BreadCrumbsCMVViaturas,
    BreadCrumbsAdminListarPedidos,
    BreadCrumbsAdminRegistarViagem,
    BreadCrumbsAdminViagensMarcadas,
    BreadCrumbsAdminViagensRealizadas,
    BreadCrumbsAdminClientes,
    BreadCrumbsAdminMotoristas,
    BreadCrumbsAdminViaturas,
    BreadCrumbsAdminRegistarMotorista,
    BreadCrumbsAdminregistarViatura
}