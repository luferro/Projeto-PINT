import React from 'react';
import { Link } from "react-router-dom";

//Presencial Sidebar--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SidebarPresencialRegistar() {
    return (
        <div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Presencial</b></p>
			</div>
			<div className="list-group list-group-flush">
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-user-plus" aria-hidden="true"></i>	Registar Cliente</button>
				<Link to="/Presencial/Listar" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-user" aria-hidden="true"></i> Lista de Clientes</Link>
				<Link to="/Presencial/Contabilidade" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-money" aria-hidden="true"></i> Contabilidade</Link>
			</div>
			<div className="logo">
				<img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
    );
}

function SidebarPresencialListar() {
    return (
        <div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Presencial</b></p>
			</div>
			<div className="list-group list-group-flush">
				<Link to="/Presencial/Registar" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-user-plus" aria-hidden="true"></i> Registar Cliente</Link>
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-user" aria-hidden="true"></i> Lista de Clientes</button>
				<Link to="/Presencial/Contabilidade" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-money" aria-hidden="true"></i> Contabilidade</Link>
			</div>
			<div className="logo">
                <img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
    );
}

function SidebarPresencialContabilidade() {
    return (
        <div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Presencial</b></p>
			</div>
			<div className="list-group list-group-flush">
				<Link to="/Presencial/Registar" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-user-plus" aria-hidden="true"></i> Registar Cliente</Link>
				<Link to="/Presencial/Listar" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-user" aria-hidden="true"></i> Lista de Clientes</Link>
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-money" aria-hidden="true"></i> Contabilidade</button>
			</div>
			<div className="logo">
				<img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
    );
}

//Telefonista Sidebar--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SidebarTelefonistaRegistar() {
    return (
        <div id="sidebar">
            <div className="sidebar-heading">
                <p><b>Telefonista</b></p>
            </div>
            <div className="list-group list-group-flush">
                <button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-plus-square-o" aria-hidden="true"></i> Registar Pedidos</button>
                <Link to="/Telefonista/Cancelar" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-minus-square-o" aria-hidden="true"></i> Cancelamentos</Link>
            </div>
            <div className="logo">
                <img src="/imagens/CMV.svg" alt="Logo CMV"/>
            </div>
            <div className="footer">Todos os direitos reservados.</div>
        </div>
    );
}

function SidebarTelefonistaCancelar() {
    return (
      <div id="sidebar">
          <div className="sidebar-heading">
              <p><b>Telefonista</b></p>
          </div>
          <div className="list-group list-group-flush">
              <Link to="/Telefonista/Registar" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-plus-square-o" aria-hidden="true"></i> Registar Pedidos</Link>
              <button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-minus-square-o" aria-hidden="true"></i> Cancelamentos</button>
          </div>
          <div className="logo">
              <img src="/imagens/CMV.svg" alt="Logo CMV"/>
          </div>
          <div className="footer">Todos os direitos reservados.</div>
      </div>
    );
}

//CMV Sidebar--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SidebarCMVDashboard() {
    return (
        <div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Câmara Municipal</b></p>
			</div>
			<div className="list-group list-group-flush">
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-bar-chart" aria-hidden="true"></i> Estatísticas</button>
				<Link to="/CMV/Viagens" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-car" aria-hidden="true"></i> Viagens</Link>
				<Link to="/CMV/Clientes" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-user" aria-hidden="true"></i> Clientes</Link>
				<Link to="/CMV/Motoristas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-users" aria-hidden="true"></i> Motoristas</Link>
				<Link to="/CMV/Viaturas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-car" aria-hidden="true"></i> Viaturas</Link>
			</div>
			<div className="logo">
				<img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
    );
}

function SidebarCMVViagens() {
    return (
        <div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Câmara Municipal</b></p>
			</div>
			<div className="list-group list-group-flush">
				<Link to="/CMV/Dashboard" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-bar-chart" aria-hidden="true"></i> Estatísticas</Link>
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-car" aria-hidden="true"></i> Viagens</button>
				<Link to="/CMV/Clientes" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-user" aria-hidden="true"></i> Clientes</Link>
				<Link to="/CMV/Motoristas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-users" aria-hidden="true"></i> Motoristas</Link>
				<Link to="/CMV/Viaturas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-car" aria-hidden="true"></i> Viaturas</Link>
			</div>
			<div className="logo">
				<img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
    );
}

function SidebarCMVListar() {
    return (
        <div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Câmara Municipal</b></p>
			</div>
			<div className="list-group list-group-flush">
				<Link to="/CMV/Dashboard" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-bar-chart" aria-hidden="true"></i> Estatísticas</Link>
				<Link to="/CMV/Viagens" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-car" aria-hidden="true"></i> Viagens</Link>
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-user" aria-hidden="true"></i> Clientes</button>
				<Link to="/CMV/Motoristas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-users" aria-hidden="true"></i> Motoristas</Link>
				<Link to="/CMV/Viaturas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-car" aria-hidden="true"></i> Viaturas</Link>
			</div>
			<div className="logo">
				<img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
    );
}

function SidebarCMVMotoristas() {
    return (
        <div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Câmara Municipal</b></p>
			</div>
			<div className="list-group list-group-flush">
				<Link to="/CMV/Dashboard" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-bar-chart" aria-hidden="true"></i> Estatísticas</Link>
				<Link to="/CMV/Viagens" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-car" aria-hidden="true"></i> Viagens</Link>
				<Link to="/CMV/Clientes" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-user" aria-hidden="true"></i> Clientes</Link>
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-users" aria-hidden="true"></i> Motoristas</button>
				<Link to="/CMV/Viaturas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-car" aria-hidden="true"></i> Viaturas</Link>
			</div>
			<div className="logo">
				<img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
    );
}

function SidebarCMVViaturas() {
    return (
        <div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Câmara Municipal</b></p>
			</div>
			<div className="list-group list-group-flush">
				<Link to="/CMV/Dashboard" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-bar-chart" aria-hidden="true"></i> Estatísticas</Link>
				<Link to="/CMV/Viagens" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-car" aria-hidden="true"></i> Viagens</Link>
				<Link to="/CMV/Clientes" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-user" aria-hidden="true"></i> Clientes</Link>
				<Link to="/CMV/Motoristas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-users" aria-hidden="true"></i> Motoristas</Link>
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-car" aria-hidden="true"></i> Viaturas</button>
			</div>
			<div className="logo">
				<img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
    );
}

//Administrador Sidebar--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function SidebarAdminRegistarViagens() {
	return (
		<div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Administrador</b></p>
			</div>
			<div className="list-group list-group-flush">
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-list" aria-hidden="true"></i> Pedidos</button>
				<Link to="/Admin/ViagensMarcadas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-check" aria-hidden="true"></i> Viagens Marcadas</Link>
				<Link to="/Admin/ViagensRealizadas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-ticket" aria-hidden="true"></i> Viagens Realizadas</Link>
				<Link to="/Admin/Clientes" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-user" aria-hidden="true"></i> Clientes</Link>
				<Link to="/Admin/Motoristas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-users" aria-hidden="true"></i> Motoristas</Link>
				<Link to="/Admin/Viaturas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-car" aria-hidden="true"></i> Viaturas</Link>
			</div>
			<div className="logo">
				<img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
	);
}

function SidebarAdminViagensMarcadas() {
	return (
		<div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Administrador</b></p>
			</div>
			<div className="list-group list-group-flush">
				<Link to="/Admin/ListarPedidos" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-list" aria-hidden="true"></i> Pedidos</Link>
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-check" aria-hidden="true"></i> Viagens Marcadas</button>
				<Link to="/Admin/ViagensRealizadas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-ticket" aria-hidden="true"></i> Viagens Realizadas</Link>
				<Link to="/Admin/Clientes" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-user" aria-hidden="true"></i> Clientes</Link>
				<Link to="/Admin/Motoristas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-users" aria-hidden="true"></i> Motoristas</Link>
				<Link to="/Admin/Viaturas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-car" aria-hidden="true"></i> Viaturas</Link>
			</div>
			<div className="logo">
				<img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
	);
}

function SidebarAdminViagensRealizadas() {
	return (
		<div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Administrador</b></p>
			</div>
			<div className="list-group list-group-flush">
				<Link to="/Admin/ListarPedidos" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-list" aria-hidden="true"></i> Pedidos</Link>
				<Link to="/Admin/ViagensMarcadas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-check" aria-hidden="true"></i> Viagens Marcadas</Link>
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-ticket" aria-hidden="true"></i> Viagens Realizadas</button>
				<Link to="/Admin/Clientes" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-user" aria-hidden="true"></i> Clientes</Link>
				<Link to="/Admin/Motoristas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-users" aria-hidden="true"></i> Motoristas</Link>
				<Link to="/Admin/Viaturas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-car" aria-hidden="true"></i> Viaturas</Link>
			</div>
			<div className="logo">
				<img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
	);
}

function SidebarAdminClientes() {
	return (
		<div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Administrador</b></p>
			</div>
			<div className="list-group list-group-flush">
				<Link to="/Admin/ListarPedidos" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-list" aria-hidden="true"></i> Pedidos</Link>
				<Link to="/Admin/ViagensMarcadas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-check" aria-hidden="true"></i> Viagens Marcadas</Link>
				<Link to="/Admin/ViagensRealizadas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-ticket" aria-hidden="true"></i> Viagens Realizadas</Link>
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-user" aria-hidden="true"></i> Clientes</button>
				<Link to="/Admin/Motoristas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-users" aria-hidden="true"></i> Motoristas</Link>
				<Link to="/Admin/Viaturas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-car" aria-hidden="true"></i> Viaturas</Link>
			</div>
			<div className="logo">
				<img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
	);
}

function SidebarAdminMotoristas() {
	return (
		<div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Administrador</b></p>
			</div>
			<div className="list-group list-group-flush">
				<Link to="/Admin/ListarPedidos" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-list" aria-hidden="true"></i> Pedidos</Link>
				<Link to="/Admin/ViagensMarcadas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-check" aria-hidden="true"></i> Viagens Marcadas</Link>
				<Link to="/Admin/ViagensRealizadas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-ticket" aria-hidden="true"></i> Viagens Realizadas</Link>
				<Link to="/Admin/Clientes" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-user" aria-hidden="true"></i> Clientes</Link>
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-users" aria-hidden="true"></i> Motoristas</button>
				<Link to="/Admin/Viaturas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-car" aria-hidden="true"></i> Viaturas</Link>
			</div>
			<div className="logo">
				<img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
	);
}

function SidebarAdminViaturas() {
	return (
		<div id="sidebar">
			<div className="sidebar-heading">
				<p><b>Administrador</b></p>
			</div>
			<div className="list-group list-group-flush">
				<Link to="/Admin/ListarPedidos" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-list" aria-hidden="true"></i> Pedidos</Link>
				<Link to="/Admin/ViagensMarcadas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-check" aria-hidden="true"></i> Viagens Marcadas</Link>
				<Link to="/Admin/ViagensRealizadas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-ticket" aria-hidden="true"></i> Viagens Realizadas</Link>
				<Link to="/Admin/Clientes" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-user" aria-hidden="true"></i> Clientes</Link>
				<Link to="/Admin/Motoristas" className="list-group-item list-group-item-action bg-dark"><i className="fa fa-users" aria-hidden="true"></i> Motoristas</Link>
				<button className="list-group-item list-group-item-action bg-dark atual"><i className="fa fa-car" aria-hidden="true"></i> Viaturas</button>
			</div>
			<div className="logo">
				<img src="/imagens/CMV.svg" alt="Logo CMV"/>
			</div>
			<div className="footer">Todos os direitos reservados.</div>
		</div>
	);
}

export{
    SidebarPresencialRegistar,
    SidebarPresencialListar,
    SidebarPresencialContabilidade,
    SidebarTelefonistaRegistar,
    SidebarTelefonistaCancelar,
    SidebarCMVDashboard,
    SidebarCMVViagens,
    SidebarCMVListar,
	SidebarCMVMotoristas,
	SidebarCMVViaturas,
	SidebarAdminRegistarViagens,
	SidebarAdminViagensMarcadas,
	SidebarAdminViagensRealizadas,
	SidebarAdminClientes,
	SidebarAdminMotoristas,
	SidebarAdminViaturas
}