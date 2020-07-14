import React from 'react';
import { Link } from 'react-router-dom';

//Presencial Buttons--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function ButtonPresencialContabilidade() {
    return (
        <div className="row text-right">
            <div className="col-sm-4"></div>
            <div className="col-sm-5">
                <button type="button" className="btn btn-submeter" data-toggle="modal" data-target="#notificar-cliente">Notificar cliente</button>
            </div>
        </div>
    );
}

function ButtonPresencialFatura() {
    return (
        <div className="row text-right">
            <div className="col-sm-2"></div>
            <div className="col-sm-5">
                <button type="button" className="btn btn-submeter" data-toggle="modal" data-target="#gerar-fatura">Gerar PDF</button>
            </div>
        </div>	
    );
}

//Admin Buttons--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function ButtonAdminRegistarMotorista() {
    return (
        <div className="row text-center">
            <div className="col-sm-12">
                <button type="button" className="btn btn-submeter"><Link to="/Admin/RegistarMotorista">Registar Novo Motorista</Link></button>
            </div>
        </div>
    );
}

function ButtonAdminRegistarViatura() {
    return (
        <div className="row text-center">
            <div className="col-sm-12">
                <button type="button" className="btn btn-submeter"><Link to="/Admin/RegistarViatura">Registar Nova Viatura</Link></button>
            </div>
        </div>
    );
}

export{
    ButtonPresencialContabilidade,
    ButtonPresencialFatura,
    ButtonAdminRegistarMotorista,
    ButtonAdminRegistarViatura
}