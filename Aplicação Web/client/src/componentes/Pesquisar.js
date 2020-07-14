import React from 'react';

//Presencial Pesquisar--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function PesquisarTabela(props) {
    return (
        <div className="input-group mb-3 pesquisar">
            <span className="input-group-text bg-dark"><i className="fa fa-search" aria-hidden="true"></i></span>
            <input type="text" className="form-control" id="pesquisar" onChange={props.handleSearch} placeholder="Pesquisar por qualquer campo"/>
        </div>
    );
}

export default PesquisarTabela;