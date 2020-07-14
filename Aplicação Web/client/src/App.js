import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import {  BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBarTopo from './componentes/NavBar';
import { SidebarPresencialRegistar, SidebarPresencialListar, SidebarPresencialContabilidade, SidebarTelefonistaRegistar, SidebarTelefonistaCancelar, SidebarCMVDashboard, SidebarCMVViagens, SidebarCMVListar, SidebarCMVMotoristas, SidebarCMVViaturas, SidebarAdminRegistarViagens, SidebarAdminViagensMarcadas, SidebarAdminClientes, SidebarAdminMotoristas, SidebarAdminViaturas, SidebarAdminViagensRealizadas } from './componentes/Sidebar';
import { BreadCrumbPresencialRegistar, BreadCrumbPresencialListar, BreadCrumbPresencialContabilidade, BreadCrumbPresencialFatura, BreadCrumbTelefonistaCancelar, BreadCrumbTelefonistaRegistar, BreadCrumbsCMVDashboard, BreadCrumbsCMVViagens, BreadCrumbsCMVListar, BreadCrumbsCMVMotoristas, BreadCrumbsCMVViaturas, BreadCrumbsAdminListarPedidos, BreadCrumbsAdminRegistarViagem, BreadCrumbsAdminViagensMarcadas, BreadCrumbsAdminClientes, BreadCrumbsAdminMotoristas, BreadCrumbsAdminViaturas, BreadCrumbsAdminViagensRealizadas, BreadCrumbsAdminRegistarMotorista, BreadCrumbsAdminregistarViatura } from './componentes/Breadcrumbs';
import { TabelaPresencialListar, TabelaPresencialContabilidade, TabelaTelefonistaCancelar, TabelaCMVViagens, TabelaCMVListar, TabelaCMVMotoristas, TabelaAdminListarPedidos, TabelaAdminViagensMarcadas, TabelaAdminClientes, TabelaAdminMotoristas, TabelaViaturas, TabelaAdminViagensRealizadas } from './componentes/Tabela';
import { FormLogin, FormPresencialRegistar, FormTelefonistaRegistar, FormAdminRegistarMotorista, FormAdminregistarViatura, FormAdminRegistarViagem } from './componentes/Form';
import { ModalLimpar } from './componentes/Modal';
import { ButtonAdminRegistarViatura } from './componentes/Buttons';
import { BackgroundLogin } from './componentes/Background';
import { TabsCMVDashboard } from './componentes/Dashboard';
import { CabecalhoPresencialFatura } from './componentes/Fatura';
const CryptoJS = require("crypto-js");
const APIUrl = "https://api-pint.herokuapp.com";
const chave_secreta = process.env.REACT_APP_KEY;

toast.configure();

function App() {
  let email_encrypt, email;

  if(localStorage.getItem("email")) {
    email_encrypt = localStorage.getItem("email");
    let bytes  = CryptoJS.AES.decrypt(email_encrypt, chave_secreta);
    email = bytes.toString(CryptoJS.enc.Utf8);
  }

  const [perfil, setPerfil] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Verificar se está autenticado
  const checkAuthenticated = async () => {
    try {
      const res = await fetch(APIUrl + "/autenticar/verificar", {
        headers: { "jwtToken": localStorage.jwtToken }
      });

      const parseRes = await res.json();
      
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  };

  //Verificar a que perfil pertence o email
  const checkAdminProfile = async () => {
      try {
        const res = await fetch(APIUrl + "/autenticar/perfil/admin/"+email);
        const existe = await res.json();
        if(existe === 1)
          setPerfil("admin");
      } catch (err) {
        console.error(err.message);
      }
  };

  const checkTelefonistaProfile = async () => {
      try {
          const res = await fetch(APIUrl + "/autenticar/perfil/telefonista/"+email);
          const existe = await res.json();
          if(existe === 1)
            setPerfil("telefonista");
      } catch (err) {
          console.error(err.message);
      }
  };

  const checkPresencialProfile = async () => {
      try {
          const res = await fetch(APIUrl + "/autenticar/perfil/presencial/"+email);
          const existe = await res.json();
          if(existe === 1)
            setPerfil("presencial");
      } catch (err) {
          console.error(err.message);
      }
  };

  const checkCMVProfile = async () => {
      try {
          const res = await fetch(APIUrl + "/autenticar/perfil/cmv/"+email);
          const existe = await res.json();
          if(existe === 1)
            setPerfil("cmv");
      } catch (err) {
          console.error(err.message);
      }
  };

  useEffect(() => {
      checkAuthenticated();
      checkAdminProfile();
      checkTelefonistaProfile();
      checkPresencialProfile();
      checkCMVProfile();
  });

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  
  //Definição dos redirects
  let session = "";
  if(perfil === "admin") {
    if(localStorage.getItem("url") === "/Admin/RegistarViagem") session = "/Admin/ListarPedidos";
    else if(localStorage.getItem("url") === "/Admin/ViagensMarcadas") session = "/Admin/ViagensMarcadas";
    else if(localStorage.getItem("url") === "/Admin/ViagensRealizadas") session = "/Admin/ViagensRealizadas";
    else if(localStorage.getItem("url") === "/Admin/Clientes") session = "/Admin/Clientes";
    else if(localStorage.getItem("url") === "/Admin/Motoristas") session = "/Admin/Motoristas";
    else if(localStorage.getItem("url") === "/Admin/Viaturas") session = "/Admin/Viaturas";
    else if(localStorage.getItem("url") === "/Admin/RegistarMotorista") session = "/Admin/Motoristas";
    else if(localStorage.getItem("url") === "/Admin/RegistarViatura") session = "/Admin/Viaturas";
    else session = "/Admin/ListarPedidos";
  }
  else if(perfil === "telefonista") {
    if(localStorage.getItem("url") === "/Telefonista/Cancelar") session = "/Telefonista/Cancelar";
    else session = "/Telefonista/Registar";;
  }
  else if(perfil === "presencial") {
    if(localStorage.getItem("url") === "/Presencial/Listar") session = "/Presencial/Listar";
    else if(localStorage.getItem("url") === "/Presencial/Contabilidade") session = "/Presencial/Contabilidade";
    else if(localStorage.getItem("url") === "/Presencial/Fatura") session = "/Presencial/Contabilidade";
    else session = "/Presencial/Registar";
  }
  else if(perfil === "cmv") {
    if(localStorage.getItem("url") === "/CMV/Viagens") session = "/CMV/Viagens";
    else if(localStorage.getItem("url") === "/CMV/Clientes") session = "/CMV/Clientes";
    else if(localStorage.getItem("url") === "/CMV/Motoristas") session = "/CMV/Motoristas";
    else if(localStorage.getItem("url") === "/CMV/Viaturas") session = "/CMV/Viaturas";
    else session = "/CMV/Dashboard";
  }

  return (
    <Router>
      <Switch>
          <Route exact path="/" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} />) : (<Redirect to={session}/> )}></Route>              

          <Route path="/Telefonista/Cancelar" render={props => isAuthenticated && perfil === "telefonista" ? (<TelefonistaCancelarRegisto {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/Telefonista/Registar" render={props => isAuthenticated && perfil === "telefonista" ? (<TelefonistaRegistarPedido {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>

          <Route path="/Presencial/Registar" render={props => isAuthenticated && perfil === "presencial" ? (<PresencialRegistarCliente {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/Presencial/Listar" render={props => isAuthenticated && perfil === "presencial" ? (<PresencialListarClientes {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/Presencial/Contabilidade" render={props => isAuthenticated && perfil === "presencial" ? (<PresencialContabilidade {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/Presencial/Fatura" render={props => isAuthenticated && perfil === "presencial" ? (<PresencialFatura {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>

          <Route path="/CMV/Dashboard" render={props => isAuthenticated && perfil === "cmv" ? (<CMVDashboard {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/CMV/Viagens" render={props => isAuthenticated && perfil === "cmv" ? (<CMVViagens {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/CMV/Clientes" render={props => isAuthenticated && perfil === "cmv" ? (<CMVClientes {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/CMV/Motoristas" render={props => isAuthenticated && perfil === "cmv" ? (<CMVMotoristas {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/CMV/Viaturas" render={props => isAuthenticated && perfil === "cmv" ? (<CMVViaturas {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>

          <Route path="/Admin/ListarPedidos" render={props => isAuthenticated && perfil === "admin" ? (<AdminListarPedidos {...props} setAuth={setAuth} setPerfil={setPerfil}/> ) : (<Redirect to="/" />)}></Route>
          <Route path="/Admin/RegistarViagem" render={props => isAuthenticated && perfil === "admin" ? (<AdminRegistarViagem {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/Admin/ViagensMarcadas" render={props => isAuthenticated && perfil === "admin" ? (<AdminViagensMarcadas {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/Admin/ViagensRealizadas" render={props => isAuthenticated && perfil === "admin" ? (<AdminViagensRealizadas {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/Admin/Clientes" render={props => isAuthenticated && perfil === "admin" ? (<AdminClientes {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/Admin/Motoristas" render={props => isAuthenticated && perfil === "admin" ? (<AdminMotoristas {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/Admin/Viaturas" render={props => isAuthenticated && perfil === "admin" ? (<AdminViaturas {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/Admin/RegistarMotorista" render={props => isAuthenticated && perfil === "admin" ? (<AdminRegistarMotorista {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
          <Route path="/Admin/RegistarViatura" render={props => isAuthenticated && perfil === "admin" ? (<AdminRegistarViatura {...props} setAuth={setAuth} setPerfil={setPerfil}/>) : (<Redirect to="/" />)}></Route>
        </Switch>
    </Router>
  );
}

export default App;

function Login({setAuth}) {  
  return (
    <Fragment>
      <BackgroundLogin/>
      <FormLogin setAuth={setAuth}/>
    </Fragment>
  );
}

//Perfil Telefonista--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function TelefonistaCancelarRegisto({setAuth, setPerfil}) {

  localStorage.setItem("url", "/Presencial/Cancelar");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarTelefonistaCancelar/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbTelefonistaCancelar/>
            <h2 className="titulo">Cancelar Pedido</h2>
            <br/>
            <TabelaTelefonistaCancelar/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function TelefonistaRegistarPedido({setAuth, setPerfil}) {

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarTelefonistaRegistar/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbTelefonistaRegistar/>
            <h2 className="titulo">Registar Pedido</h2>
            <br/>
            <FormTelefonistaRegistar/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

//Perfil Presencial--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function PresencialRegistarCliente({setAuth, setPerfil}) {

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarPresencialRegistar/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbPresencialRegistar/>
            <h2 className="titulo">Registar Cliente</h2>
            <br/>
            <FormPresencialRegistar/>
            <ModalLimpar/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function PresencialListarClientes({setAuth, setPerfil}) {

  localStorage.setItem("url", "/Presencial/Listar");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarPresencialListar/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbPresencialListar/>
            <h2 className="titulo">Listar Clientes</h2>
            <br/>
            <TabelaPresencialListar/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function PresencialContabilidade({setAuth, setPerfil}) {

  localStorage.setItem("url", "/Presencial/Contabilidade");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarPresencialContabilidade/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbPresencialContabilidade/>
            <h2 className="titulo">Contabilidade</h2>
            <br/>
            <TabelaPresencialContabilidade/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function PresencialFatura({setAuth, setPerfil}) {

  localStorage.setItem("url", "/Presencial/Fatura");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarPresencialContabilidade/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbPresencialFatura/>
            <h2 className="titulo">Gerar Fatura</h2>
            <br/>
            <CabecalhoPresencialFatura />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

//Perfil CMV----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function CMVDashboard({setAuth, setPerfil}) {

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarCMVDashboard/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsCMVDashboard/>
            <TabsCMVDashboard/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function CMVViagens({setAuth, setPerfil}) {

  localStorage.setItem("url", "/CMV/Viagens");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarCMVViagens/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsCMVViagens/>
            <h2 className="titulo">Lista de Viagens</h2>
            <br/>
            <TabelaCMVViagens/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function CMVClientes({setAuth, setPerfil}) {

  localStorage.setItem("url", "/CMV/Clientes");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarCMVListar/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsCMVListar/>
            <h2 className="titulo">Lista de Clientes</h2>
            <br/>
            <TabelaCMVListar/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function CMVMotoristas({setAuth, setPerfil}) {

  localStorage.setItem("url", "/CMV/Motoristas");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarCMVMotoristas/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsCMVMotoristas/>
            <h2 className="titulo">Lista de Motoristas</h2>
            <br/>
            <TabelaCMVMotoristas/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function CMVViaturas({setAuth, setPerfil}) {

  localStorage.setItem("url", "/CMV/Viaturas");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarCMVViaturas/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsCMVViaturas/>
            <h2 className="titulo">Lista de Viaturas</h2>
            <br/>
            <TabelaViaturas/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

//Perfil Admin--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function AdminListarPedidos({setAuth, setPerfil}) {

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarAdminRegistarViagens/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsAdminListarPedidos/>
            <h2 className="titulo">Lista de Pedidos</h2>
            <br/>
            <TabelaAdminListarPedidos/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function AdminRegistarViagem({setAuth, setPerfil}) {

  localStorage.setItem("url", "/Admin/RegistarViagem");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarAdminRegistarViagens/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsAdminRegistarViagem/>
            <h2 className="titulo">Registar Viagem</h2>
            <br/>
            <FormAdminRegistarViagem/>
            <ModalLimpar/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function AdminViagensMarcadas({setAuth, setPerfil}) {

  localStorage.setItem("url", "/Admin/ViagensMarcadas");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarAdminViagensMarcadas/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsAdminViagensMarcadas/>
            <h2 className="titulo">Lista de Viagens Marcadas</h2>
            <br/>
            <TabelaAdminViagensMarcadas/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function AdminViagensRealizadas({setAuth, setPerfil}) {

  localStorage.setItem("url", "/Admin/ViagensRealizadas");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarAdminViagensRealizadas/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsAdminViagensRealizadas/>
            <h2 className="titulo">Lista de Viagens Realizadas</h2>
            <br/>
            <TabelaAdminViagensRealizadas/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function AdminClientes({setAuth, setPerfil}) {

  localStorage.setItem("url", "/Admin/Clientes");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarAdminClientes/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsAdminClientes/>
            <h2 className="titulo">Lista de Clientes</h2>
            <br/>
            <TabelaAdminClientes/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function AdminMotoristas({setAuth, setPerfil}) {

  localStorage.setItem("url", "/Admin/Motoristas");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarAdminMotoristas/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsAdminMotoristas/>
            <h2 className="titulo">Lista de Motoristas</h2>
            <br/>
            <TabelaAdminMotoristas/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function AdminViaturas({setAuth, setPerfil}) {

  localStorage.setItem("url", "/Admin/Viaturas");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarAdminViaturas/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsAdminViaturas/>
            <h2 className="titulo">Lista de Viaturas</h2>
            <br/>
            <TabelaViaturas/>
            <ButtonAdminRegistarViatura/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function AdminRegistarMotorista({setAuth, setPerfil}) {

  localStorage.setItem("url", "/Admin/RegistarMotorista");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarAdminMotoristas/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsAdminRegistarMotorista/>
            <h2 className="titulo">Registar Motorista</h2>
            <br/>
            <FormAdminRegistarMotorista/>
            <ModalLimpar/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function AdminRegistarViatura({setAuth, setPerfil}) {

  localStorage.setItem("url", "/Admin/RegistarViatura");

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
      localStorage.removeItem("url");
      setPerfil("/");
      setAuth(false);
      toast.success("Sessão terminada com sucesso.");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex" id="wrapper">
        <SidebarAdminViaturas/>
        <div id="page-content">
          <NavBarTopo logout={logout}/>
          <div className="container-fluid">
            <br/>
            <BreadCrumbsAdminregistarViatura/>
            <h2 className="titulo">Registar Viatura</h2>
            <br/>
            <FormAdminregistarViatura/>
            <ModalLimpar/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}