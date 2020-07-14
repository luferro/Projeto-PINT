import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalPresencialRegistar, ModalTelefonistaRegistar, ModalAdminRegistarMotorista, ModalAdminRegistarViatura, ModalAdminRegistarViagem } from './Modal';
import { useHistory } from 'react-router-dom';
const CryptoJS = require("crypto-js");
const APIUrl = "https://api-pint.herokuapp.com";
const chave_secreta = process.env.REACT_APP_KEY;

toast.configure();

//Scripts--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("foto_preview").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("preview").src = oFREvent.target.result;
    };
}

function check_checkbox() {
    if(document.getElementById("ida").checked === true)
        document.getElementById("ida_volta").disabled = "true";
    else document.getElementById("ida_volta").removeAttribute('disabled');

    if(document.getElementById("ida_volta").checked)
        document.getElementById("ida").disabled = "true";
    else document.getElementById("ida").removeAttribute('disabled');
}

//Login Form--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function FormLogin({setAuth}) {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;
    
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch(APIUrl + "/autenticar/login",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
    
            const parseRes = await response.json();
    
            if (parseRes.jwtToken) {
                localStorage.setItem("jwtToken", parseRes.jwtToken);
                localStorage.setItem("email", CryptoJS.AES.encrypt(email, chave_secreta).toString());
                setAuth(true);
                toast.success("Sessão iniciada com sucesso!");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <div id="login">
		  <img className="img-fluid" src="/imagens/login_logo.svg" alt="Logo CMV"/>
		  <form onSubmit={onSubmitForm}>
			  <div className="input-group mb-3">
				  <div className="input-group-prepend bg-transparent">
					  <span className="input-group-text bg-transparent border-0" id="basic-addon1"><i className="fa fa-user"></i></span>
				  </div>
				  <input type="email" name="email" className="form-control border-0" id="Email" placeholder="Endereço de Email" value={email} onChange={e => onChange(e)}/>
			  </div>
			  <div className="input-group mb-3">
				  <div className="input-group-prepend bg-transparent">
					  <span className="input-group-text bg-transparent border-0" id="CEmail"><i className="fa fa-key"></i></span>
				  </div>
				  <input type="password" name="password" className="form-control border-0" id="Password" placeholder="Palavra-Passe" value={password} onChange={e => onChange(e)}/>
			  </div>
			  <div className="row">
                  <div className="col-sm-12 text-center">
                  <button type="submit" className="btn btn-primary">Login</button>
                  </div>
			  </div>
		  </form>
		  <div className="footer">Todos os direitos reservados.</div>
		</div>
    );
}

//Presencial Form--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const FormPresencialRegistar = () => {
    let history = useHistory();

    window.onload = function() {
        if ( document.getElementById("data_nascimento").type !== 'date' ) document.getElementById("data_nascimento").datepicker();
    };

    const [inputs, setInputs] = useState({
        pnome_cli: "",
        unome_cli: "",
        email_cli: "",
        foto_cli: "",
        contacto_cli: "",
        datanascimento_cli: "2002-01-01",
        localidade_cli: "",
        cc_cli: "",
        morada_cli: "",
        codpostal_cli: "",
        nif_cli: "",
        nomeemergencia_cli: "",
        contactoemergencia_cli: "",
        info_cli: "",
        comprovativoidentidade_cli: "",
        comprovativomorada_cli: ""
    }) 

    const[checkbox, setCheckbox] = useState({
        necessidades_cli: "Não tem"
    })

    const { pnome_cli, unome_cli, email_cli, foto_cli, contacto_cli, datanascimento_cli, localidade_cli, cc_cli, morada_cli, codpostal_cli, nif_cli, nomeemergencia_cli, contactoemergencia_cli, info_cli, comprovativoidentidade_cli, comprovativomorada_cli } = inputs;
    const { necessidades_cli } = checkbox;

    const onChange = (e) => {
        setInputs({
            ...inputs, [e.target.name]:e.target.value
            
        });
        setCheckbox({
            ...checkbox, [e.target.name]:"Tem"
        });
    };

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { pnome_cli, unome_cli, email_cli, foto_cli, contacto_cli, datanascimento_cli, localidade_cli, cc_cli, morada_cli, codpostal_cli, nif_cli, nomeemergencia_cli, contactoemergencia_cli, necessidades_cli, info_cli, comprovativoidentidade_cli, comprovativomorada_cli };
            await fetch(APIUrl + "/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const email = { email_cli };
            await fetch(APIUrl + "/send/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(email)
            });

            document.getElementsByClassName("close")[0].click();
            history.push('/temp');
            history.goBack();
            toast.success("Cliente registado com sucesso!");
            toast.info("Confirme a receção do email com o utilizador!");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <form id="registo" onSubmit={onSubmitForm}>
            <h4>Informação Geral</h4>
            <hr/>
            <br/>
            <div className="form-row">
                <div className="col-sm-6">
                    <label htmlFor="primeironome">Primeiro Nome</label>
                    <input type="text" name="pnome_cli" className="form-control" id="primeironome" pattern="^[a-zA-Z]+$" value={pnome_cli} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="ultimonome">Último Nome</label>
                    <input type="text" name="unome_cli" className="form-control" id="ultimonome" pattern="^[a-zA-Z]+$" value={unome_cli} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email_cli" className="form-control" id="email" value={email_cli} onChange={ e => onChange(e) } required/>
                    <br/>
                </div>
                <div className="col-sm-6">
                    <div className="container">
                        <img id="preview" className="img-responsive" src="/imagens/placeholder.svg" alt="Fotografia do cliente a registar"/>
                        <input id="foto_preview" type="file" name="foto_cli" accept="image/*" autoComplete="off" value={foto_cli} onChange={ (e) => {onChange(e); PreviewImage();} } required/>
                    </div>
                </div>
            </div>
            <br/>
            <div className="form-row">
                <div className="col-sm-6">
                    <label htmlFor="telemovel">Telemóvel</label>
                    <input type="tel" name="contacto_cli" className="form-control" id="telemovel" pattern="[9][1236][0-9]{7}" value={contacto_cli} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="morada">Morada</label>
                    <input type="text" name="morada_cli" className="form-control" id="morada" value={morada_cli} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="localidade">Localidade</label>
                    <input type="text" name="localidade_cli" className="form-control" id="localidade" pattern="^[a-zA-Z]+$" value={localidade_cli} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="num_cc">Número do Cartão de Cidadão</label>
                    <input type="text" name="cc_cli" className="form-control" id="num_cc" pattern="[0-9]{8}" value={cc_cli} onChange={ e => onChange(e) } required/>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="data_nascimento">Data de nascimento</label>
                    <input type="date" name="datanascimento_cli" min="1900-01-01" max="2002-12-31" className="form-control" id="data_nascimento" value={datanascimento_cli} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="codigo_postal">Código Postal</label>
                    <input type="text" name="codpostal_cli" className="form-control" id="codigo_postal" pattern="[3][5][0-9]{2}[\-]?[0-9]{3}" placeholder="nnnn-nnn" value={codpostal_cli} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="num_contribuinte">Número de Contribuinte</label>
                    <input type="text" name="nif_cli" className="form-control" id="num_contribuinte" pattern="[0-9]{9}" value={nif_cli} onChange={ e => onChange(e) } required/>
                </div>
            </div>
            <br/><br/><br/>
            <h4>Informação em caso de emergência</h4>
            <hr/>
            <br/>
            <div className="form-row">
                <div className="col-sm-6">
                    <label htmlFor="nome_emergencia">Nome do contacto de emergência</label>
                    <input type="tel" name="nomeemergencia_cli" className="form-control" id="nome_emergencia" pattern="^[a-zA-Z ]+$" value={nomeemergencia_cli} onChange={ e => onChange(e) } required/>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="contacto_emergencia">Contacto de emergência</label>
                    <input type="tel" name="contactoemergencia_cli" className="form-control" id="contacto_emergencia" pattern="[9][1236][0-9]{7}" value={contactoemergencia_cli} onChange={ e => onChange(e) } required/>
                </div>
            </div>
            <br/><br/><br/>
            <h4>Informação Adicional</h4>
            <hr/>
            <br/>
            <div className="form-row">
                <div className="col-sm-5">
                    <input type="checkbox" name="necessidades_cli" id="necessidades" autoComplete="off" value={necessidades_cli} onChange={ e => onChange(e) } />
                    <label htmlFor="necessidades">Necessidades especiais</label>
                    <br/>
                    <label htmlFor="outras_info">Outras informações</label>
                    <textarea name="info_cli" rows="3" className="form-control z-depth-1" id="outras_info" value={info_cli} onChange={ e => onChange(e) }></textarea>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-5">
                    <h5>Documentos</h5>
                    <label htmlFor="identidade">Comprovativo de identidade:</label>
                    <input type="file" name="comprovativoidentidade_cli" id="identidade" accept="application/pdf, image/*" value={comprovativoidentidade_cli} onChange={ e => onChange(e) } required/>
                    <br/><br/>
                    <label htmlFor="morada">Comprovativo de morada:</label>
                    <input type="file" name="comprovativomorada_cli" id="morada" accept="application/pdf, image/*" value={comprovativomorada_cli} onChange={ e => onChange(e) } required/>
                </div>
            </div>
            <br/>
            <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#limpar-campos" style={{float:'left'}}>Limpar Campos</button>
            <button type="button" className="btn btn-submeter" data-toggle="modal" data-target="#registar-cliente">Registar Cliente</button>
            <ModalPresencialRegistar/>
        </form>
    );
}

//Telefonista Form--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function FormTelefonistaRegistar() {
    let history = useHistory();

    const [clientes, setClientes] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [estado, setEstado] = useState("");
    const [inputs, setInputs] = useState({
        nome: "",
        origem: "",
        destino: "",
        data_ida: "",
        hora_ida: "",
        data_volta: "",
        hora_volta: "",
        bagagem: "",
        bagagem_quant: "",
        acompanhantes: "0",
        estado_pedido: "Disponivel"
    }) 
    const[checkbox, setCheckbox] = useState({
        necessidades: "Não tem"
    })
    const[identificador, setIdentificador] = useState(null);

    async function getClientes() {
        const res = await fetch(APIUrl + "/clientes");
        const ClientesArray = await res.json();
        setClientes(ClientesArray);
    }

    async function getLocalidades() {
        const res = await fetch(APIUrl + "/localidades");
        const LocalidadesArray = await res.json();
        setLocalidades(LocalidadesArray);
    }
    
    useEffect(() => {
        getClientes();
        getLocalidades();
    }, []);

    const { nome, origem, destino, data_ida, hora_ida, data_volta, hora_volta, bagagem, bagagem_quant, acompanhantes, estado_pedido } = inputs;
    const { necessidades } = checkbox;

    const onChange = (e) => {
        const selectedIndexC = document.getElementById("cliente_sel").options.selectedIndex;
        setInputs({
            ...inputs, [e.target.name]:e.target.value
        });
        setCheckbox({
            ...checkbox, [e.target.name]:"Tem"
        });
        setIdentificador(Number(document.getElementById("cliente_sel").options[selectedIndexC].getAttribute('data-cliente')));
    };

    function dateValidate() {
        const data_pedido_ida = document.getElementById("data_pedido_ida");
        const data_pedido_volta = document.getElementById("data_pedido_volta");

        if(data_pedido_ida.value)
            var data_ida = data_pedido_ida.value;
        if(data_pedido_volta.value)
            var data_volta = data_pedido_volta.value;

        if(data_volta < data_ida)
            data_pedido_volta.setCustomValidity("Selected date is invalid.");
        else data_pedido_volta.setCustomValidity("");
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { identificador, nome, origem, destino, data_ida, hora_ida, data_volta, hora_volta, bagagem, bagagem_quant, acompanhantes, necessidades, estado_pedido };
            const res = await fetch(APIUrl + "/pedidosviagem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            document.getElementsByClassName("close")[0].click();
            history.push('/temp');
            history.goBack();
            if(res.status === 401)
                toast.warning("Cliente tem dividas pendentes. Deve regularizar a sua situação presencialmente.");
            else toast.success("Pedido de viagem submetido com sucesso!");
        } catch (err) {
            console.error(err.message);
        }
    };

    const toggle = escolha => () => {
        if(escolha === "ida" ){
            const { ida } = estado;
            setEstado({
                ida: !ida,
                bagagem_state: bagagem_state
            });
        }
        if(escolha === "ida_volta") {
            const { ida_volta } = estado;
            setEstado({
                ida_volta: !ida_volta,
                bagagem_state: bagagem_state
            });
        }   
        if(escolha === "bagagem_state") {
            const { bagagem_state } = estado;
            setEstado({
                ida: ida,
                ida_volta: ida_volta,
                bagagem_state: !bagagem_state
            });
        }
    }

    const { ida } = estado;
    const { ida_volta } = estado;
    const { bagagem_state } = estado;

    return (
        <form onSubmit={onSubmitForm}>
            <br/>
            <div className="form-row">
                <div className="col-sm-4">
                    <label htmlFor="cliente_sel">Cidadão</label>
                    <select className="form-control" name="nome" id="cliente_sel" value={nome} onChange={ e => onChange(e) } required>
                        <option value="" disabled="disabled"> Selecione um cliente</option>
                        {clientes.map(clientes => (
                            <option key={clientes.id_cli} data-cliente={clientes.id_cli}>{clientes.pnome_cli + ' ' + clientes.unome_cli}</option>
                        ))}
                    </select>
                </div>
                <div className="col-sm-4">
                    <label htmlFor="origem_pedido">Origem</label>
                    <select className="form-control" name="origem" id="origem_pedido" value={origem} onChange={ e => onChange(e) } required>
                        <option value="" disabled="disabled"> Selecione uma origem</option>
                        {localidades.map(localidades => (
                            <option key={localidades.id_localidade}>{localidades.nome_localidade}</option>
                        ))}
                    </select>
                </div>
                <div className="col-sm-4">
                    <label htmlFor="destino_pedido">Destino</label>
                    <select className="form-control" name="destino" id="destino_pedido" value={destino} onChange={ e => onChange(e) } required>
                        <option value="" disabled="disabled"> Selecione um destino</option>
                        {localidades.map(localidades => (
                            <option key={localidades.id_localidade}>{localidades.nome_localidade}</option>
                        ))}
                    </select>
                </div>
            </div>
            <br/><br/>
            <div className="form-row text-center">
                <div className="col-sm-4"></div>
                <div className="custom-control custom-switch col-sm-2">
                    <input type="checkbox" name="ida_pedido" className="custom-control-input" id="ida" autoComplete="off" onClick={toggle("ida")} onChange={check_checkbox}/>
                    <label htmlFor="ida" className="custom-control-label" >Ida</label>
                </div>
                <div className="custom-control custom-switch col-sm-2">
                    <input type="checkbox" name="idavolta_pedido" className="custom-control-input" id="ida_volta" autoComplete="off" onClick={toggle("ida_volta")} onChange={check_checkbox}/>
                    <label htmlFor="ida_volta" className="custom-control-label" >Ida e Volta</label>
                </div>
            </div>
            <br/>
            {   ida && (
                <div className="form-row ida">
                    <div className="col-sm-6">
                        <label htmlFor="data_pedido">Data da viagem</label>
                        <input type="date" name="data_ida" className="form-control datahora_pedido" id="data_pedido" value={data_ida} onChange={ e => onChange(e) }/>
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="hora_pedido">Hora da viagem</label>
                        <input type="time" name="hora_ida" className="form-control datahora_pedido" id="hora_pedido" value={hora_ida} onChange={ e => onChange(e) }/>
                    </div>
                </div>
            )}
            {   ida_volta && (
                <div>
                    <div className="form-row ida_volta">
                        <div className="col-sm-5">
                            <label htmlFor="data_pedido_ida">Data da viagem ida</label>
                            <input type="date" name="data_ida" className="form-control datahora_pedido" id="data_pedido_ida" value={data_ida} onInput={dateValidate} onChange={ e => onChange(e) }/>
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-5">
                            <label htmlFor="data_pedido_volta">Data da viagem volta</label>
                            <input type="date" name="data_volta" className="form-control datahora_pedido" id="data_pedido_volta" value={data_volta} onInput={dateValidate} onChange={ e => onChange(e) }/>
                        </div>
                    </div>
                    <br/>
                    <div className="form-row ida_volta">
                        <div className="col-sm-5">
                            <label htmlFor="hora_pedido_ida">Hora da viagem ida</label>
                            <input type="time" name="hora_ida" className="form-control datahora_pedido" id="hora_pedido_ida" value={hora_ida} onChange={ e => onChange(e) }/>
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-5">
                            <label htmlFor="hora_pedido_volta">Hora da viagem volta</label>
                            <input type="time" name="hora_volta" className="form-control datahora_pedido" id="hora_pedido_volta" value={hora_volta} onChange={ e => onChange(e) }/>
                        </div>
                    </div>
                </div>
            )}
            <br/>
            <h4 className="text-left">Preferências de viagem</h4>
            <br/>
            <div className="form-row text-center">
                <div className="custom-control custom-switch col-sm-4">
                    <input type="checkbox" name="necessidades" className="custom-control-input" id="necessidades_especiais" value={necessidades} onChange={ e => onChange(e) } autoComplete="off"/>
                    <label htmlFor="necessidades_especiais" className="custom-control-label" >Necessidades especiais</label>
                </div>
                <div className="custom-control custom-switch col-sm-4">
                    <input type="checkbox" name="tem_bagagem" className="custom-control-input" id="bagagem" autoComplete="off" onClick={toggle("bagagem_state")}/>
                    <label htmlFor="bagagem" className="custom-control-label" >Bagagem</label>
                </div>
                <div className="col-sm-4">
                    <span id="acomp"><input type="number" min="0" name="acompanhantes" className="form-control" value={acompanhantes} onChange={ e => onChange(e) }/>&nbsp;Acompanhantes</span>
                </div>
            </div>
            <br/>
            {   bagagem_state && (
                <div>
                    <h4 className="text-left bagagem">Bagagem</h4>
                    <br/>
                    <div className="form-row text-left bagagem">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-4">
                            <label htmlFor="origem_pedido">Tamanho da bagagem</label>
                            <select className="form-control" name="bagagem" id="tamanho_bagagem" value={bagagem} onChange={ e => onChange(e) }>
                                <option value="" disabled="disabled"> Selecione tamanho da bagagem</option>
                                <option>Bagagem pequena</option>
                                <option>Bagagem média</option>
                                <option>Bagagem grande</option>
                            </select>
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="quantidade_bagagem">Quantidade de bagagem</label>
                            <input type="number" name="bagagem_quant" className="form-control" id="quantidade_bagagem" min="0" value={bagagem_quant} onChange={ e => onChange(e) }/>
                        </div>
                    </div>
                </div>
            )}
            <br/><br/>
            <button type="button" className="btn btn-dark mb-5" data-toggle="modal" data-target="#submissao-viagem">Submeter Pedido</button>
            <ModalTelefonistaRegistar/>
        </form>
    );
}

//Admin Form--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function FormAdminRegistarViagem() {
    let history = useHistory();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    const [inputs, setInputs] = useState({
        motorista: "",
        viatura: ""
    });
    const[identificador, setIdentificador] = useState({
        id_motorista: null,
        id_viatura: null
    })
    const [pedido, setPedido] = useState([]);
    const [motoristas, setMotoristas] = useState([]);
    const [viaturas, setViaturas] = useState([]);

    async function getPedido() {
        const res = await fetch(APIUrl + "/pedidosviagem/pedido/"+id);
        const PedidoArray = await res.json();
        setPedido(PedidoArray);
    }

    async function getMotoristas() {
        const res = await fetch(APIUrl + "/motoristas/livres/"+id);
        const MotoristasArray = await res.json();
        setMotoristas(MotoristasArray);
    }

    async function getViaturas() {
        const res = await fetch(APIUrl + "/viaturas/livres/"+id);
        const ViaturasArray = await res.json();
        setViaturas(ViaturasArray);
    }
    
    useEffect(() => {
        getPedido();
        getMotoristas();
        getViaturas();
    }, []);

    const id_pedido = pedido.id_pedido, id_cli = pedido.id_cli, nome = pedido.nome, origem = pedido.origem, destino = pedido.destino, data_ida = pedido.data_ida, hora_ida = pedido.hora_ida, data_volta = pedido.data_volta, hora_volta = pedido.hora_volta, num_pessoas = pedido.acompanhantes, necessidades = pedido.necessidades, bagagem = pedido.bagagem, bagagem_quant = pedido.bagagem_quant;
    const { motorista, viatura } = inputs;
    const { id_motorista, id_viatura } = identificador;

    

    const onChange = (e) => {
        const selectedIndexM = document.getElementById("motorista_sel").options.selectedIndex;
        const selectedIndexV = document.getElementById("viatura_sel").options.selectedIndex;
        setInputs({
            ...inputs, [e.target.name]:e.target.value
        });
        setIdentificador({
            id_motorista: Number(document.getElementById("motorista_sel").options[selectedIndexM].getAttribute('data-moto')), 
            id_viatura: Number(document.getElementById("viatura_sel").options[selectedIndexV].getAttribute('data-viatura'))
        })
    };

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            console.log(data_ida)
            const body = { id_motorista, id_viatura, id_pedido, id_cli, nome, origem, destino, data_ida, hora_ida, data_volta, hora_volta, num_pessoas, necessidades, bagagem, bagagem_quant, motorista, viatura };
            await fetch(APIUrl + "/viagens", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            document.getElementsByClassName("close")[0].click();
            history.push('/Admin/ListarPedidos');
            toast.success("Viagem registada com sucesso!");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <form id="registo" onSubmit={onSubmitForm}>
            <h4>Informação Geral</h4>
            <hr/>
            <br/>
            <div className="form-row text-center">
                <div className="col-sm-4">
                    <b>Nome do Cidadão</b>
                    <p>{pedido.nome}</p>
                </div>
                <div className="col-sm-4">
                    <b>Origem</b>
                    <p>{pedido.origem}</p>
                </div>
                <div className="col-sm-4">
                    <b>Destino</b>
                    <p>{pedido.destino}</p>
                </div>
            </div>
            <div className="form-row text-center">       
                <div className="col-sm-4">
                    <b>Data Ida</b>
                    <p>{pedido.data_ida ? (pedido.data_ida).slice(0, 10) : pedido.data_ida}</p>
                </div>
                <div className="col-sm-4">
                    <b>Hora Ida</b>
                    <p>{pedido.hora_ida ? (pedido.hora_ida).slice(0, 5) : pedido.hora_ida}</p>
                </div>
                <div className="col-sm-4">
                    <b>Acompanhantes</b>
                    <p>{pedido.acompanhantes}</p>
                </div>
            </div>
            <div className="form-row text-center">
                <div className="col-sm-4">
                    <b>Data Volta</b>
                    <p>{pedido.data_volta ? (pedido.data_volta).slice(0, 10) : pedido.data_volta}</p>
                </div>
                <div className="col-sm-4">
                    <b>Hora Volta</b>
                    <p>{pedido.hora_volta ? (pedido.hora_volta).slice(0, 5) : pedido.hora_volta}</p>
                </div>
                <div className="col-sm-4">
                    <b>Necessidades Especiais</b>
                    <p>{pedido.necessidades}</p>
                </div>
            </div>
            <div className="form-row text-center">
                <div className="col-sm-6">
                    <b>Tamanho da Bagagem</b>
                    <p>{pedido.bagagem}</p>
                </div>
                <div className="col-sm-6">
                    <b>Quantidade da Bagagem</b>
                    <p>{pedido.bagagem_quant}</p>
                </div>
            </div>
            <br/>
            <h4>Atribuir Motorista e Viatura</h4>
            <hr/>
            <br/>
            <div className="form-row">
                <div className="col-sm-6">
                    <label htmlFor="motorista_sel">Motorista</label>
                    <select className="form-control" name="motorista" id="motorista_sel" value={motorista} onChange={ e => onChange(e) } required>
                        <option value="" disabled="disabled"> Selecione um motorista</option>
                        {motoristas.map(motoristas => (
                            <option key={motoristas.id_moto} data-moto={motoristas.id_moto}>{motoristas.pnome_moto + " " + motoristas.unome_moto}</option>
                        ))}
                    </select>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="viatura_sel">Viatura</label>
                    <select className="form-control" name="viatura" id="viatura_sel" value={viatura} onChange={ e => onChange(e) } required>
                        <option value="" disabled="disabled"> Selecione uma viatura</option>
                        {viaturas.map(viaturas => (
                            <option key={viaturas.id_veiculo} data-viatura={viaturas.id_veiculo}>{viaturas.marca + " " + viaturas.matricula + " (" + viaturas.num_lugares + " lugares)"}</option>
                        ))}
                    </select>
                </div>
            </div>
            <br/><br/>
            <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#limpar-campos" style={{float:'left'}}>Limpar Campos</button>
            <button type="button" className="btn btn-submeter" data-toggle="modal" data-target="#registar-viagem">Registar Viagem</button>
            <ModalAdminRegistarViagem/>
        </form>
    );
}

function FormAdminRegistarMotorista() {
    let history = useHistory();

    window.onload = function() {
        if ( document.getElementById("data_nascimento").type !== 'date' ) document.getElementById("data_nascimento").datepicker();
    };

    const [inputs, setInputs] = useState({
        pnome_moto: "",
        unome_moto: "",
        email_moto: "",
        foto_moto: "",
        contacto_moto: "",
        datanascimento_moto: "2002-01-01",
        localidade_moto: "",
        cc_moto: "",
        morada_moto: "",
        codpostal_moto: "",
        nif_moto: "",
        nomeemergencia_moto: "",
        contactoemergencia_moto: ""
    }) 

    const { pnome_moto, unome_moto, email_moto, foto_moto, contacto_moto, datanascimento_moto, localidade_moto, cc_moto, morada_moto, codpostal_moto, nif_moto, nomeemergencia_moto, contactoemergencia_moto } = inputs;

    const onChange = (e) => {
        setInputs({
            ...inputs, [e.target.name]:e.target.value
        });
    };

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { pnome_moto, unome_moto, email_moto, foto_moto, contacto_moto, datanascimento_moto, localidade_moto, cc_moto, morada_moto, codpostal_moto, nif_moto, nomeemergencia_moto, contactoemergencia_moto };
            await fetch(APIUrl + "/motoristas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const email = { email_moto };
            await fetch(APIUrl + "/send/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(email)
            });

            document.getElementsByClassName("close")[0].click();
            history.push('/temp');
            history.goBack();
            toast.success("Motorista registado com sucesso!");
            toast.info("Confirme a receção do email com o utilizador!");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <form id="registo" onSubmit={onSubmitForm}>
            <h4>Informação Geral</h4>
            <hr/>
            <br/>
            <div className="form-row">
                <div className="col-sm-6">
                    <label htmlFor="primeironome">Primeiro Nome</label>
                    <input type="text" name="pnome_moto" className="form-control" id="primeironome" pattern="^[a-zA-Z]+$" value={pnome_moto} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="ultimonome">Último Nome</label>
                    <input type="text" name="unome_moto" className="form-control" id="ultimonome" pattern="^[a-zA-Z]+$" value={unome_moto} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email_moto" className="form-control" id="email" value={email_moto} onChange={ e => onChange(e) } required/>
                    <br/>
                </div>
                <div className="col-sm-6">
                    <div className="container">
                        <img id="preview" className="img-responsive" src="/imagens/placeholder.svg" alt="Fotografia do cliente a registar"/>
                        <input id="foto_preview" type="file" name="foto_moto" accept="image/*" autoComplete="off" value={foto_moto} onChange={ (e) => {onChange(e); PreviewImage();} } required/>
                    </div>
                </div>
            </div>
            <br/>
            <div className="form-row">
                <div className="col-sm-6">
                    <label htmlFor="telemovel">Telemóvel</label>
                    <input type="tel" name="contacto_moto" className="form-control" id="telemovel" pattern="[9][1236][0-9]{7}" value={contacto_moto} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="morada">Morada</label>
                    <input type="text" name="morada_moto" className="form-control" id="morada" value={morada_moto} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="localidade">Localidade</label>
                    <input type="text" name="localidade_moto" className="form-control" id="localidade" pattern="^[a-zA-Z]+$" value={localidade_moto} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="num_cc">Número do Cartão de Cidadão</label>
                    <input type="text" name="cc_moto" className="form-control" id="num_cc" pattern="[0-9]{8}" value={cc_moto} onChange={ e => onChange(e) } required/>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="data_nascimento">Data de nascimento</label>
                    <input type="date" name="datanascimento_moto" min="1900-01-01" max="2002-12-31" className="form-control" id="data_nascimento" value={datanascimento_moto} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="codigo_postal">Código Postal</label>
                    <input type="text" name="codpostal_moto" className="form-control" id="codigo_postal" pattern="[3][5][0-9]{2}[\-]?[0-9]{3}" placeholder="nnnn-nnn" value={codpostal_moto} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="num_contribuinte">Número de Contribuinte</label>
                    <input type="text" name="nif_moto" className="form-control" id="num_contribuinte" pattern="[0-9]{9}" value={nif_moto} onChange={ e => onChange(e) } required/>
                </div>
            </div>
            <br/><br/><br/>
            <h4>Informação em caso de emergência</h4>
            <hr/>
            <br/>
            <div className="form-row">
                <div className="col-sm-6">
                    <label htmlFor="nome_emergencia">Nome do contacto de emergência</label>
                    <input type="tel" name="nomeemergencia_moto" className="form-control" id="nome_emergencia" pattern="^[a-zA-Z ]+$" value={nomeemergencia_moto} onChange={ e => onChange(e) } required/>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="contacto_emergencia">Contacto de emergência</label>
                    <input type="tel" name="contactoemergencia_moto" className="form-control" id="contacto_emergencia" pattern="[9][1236][0-9]{7}" value={contactoemergencia_moto} onChange={ e => onChange(e) } required/>
                </div>
            </div>
            <br/><br/>
            <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#limpar-campos" style={{float:'left'}}>Limpar Campos</button>
            <button type="button" className="btn btn-submeter" data-toggle="modal" data-target="#registar-motorista">Registar Motorista</button>
            <ModalAdminRegistarMotorista/>
        </form>
    );
}

function FormAdminregistarViatura() {
    let history = useHistory();
    const [inputs, setInputs] = useState({
        matricula: "",
        marca: "",
        cor: "",
        modelo: "",
        ano: "",
        num_lugares: "",
        foto:""
    }) 

    const { matricula, marca, cor, modelo, ano, num_lugares, foto } = inputs;

    const onChange = (e) => {
        setInputs({
            ...inputs, [e.target.name]:e.target.value
        });
    };

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { matricula, marca, cor, modelo, ano, num_lugares, foto };
            await fetch(APIUrl + "/viaturas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            document.getElementsByClassName("close")[0].click();
            history.push('/temp');
            history.goBack();
            toast.success("Viatura registada com sucesso!");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <form id="registo"  onSubmit={onSubmitForm}>
            <div className="form-row">
                <div className="col-sm-6">
                    <label htmlFor="marca">Marca</label>
                    <input type="text" name="marca" className="form-control" id="marca" pattern="^[a-zA-Z]+$" value={marca} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="modelo">Modelo</label>
                    <input type="text" name="modelo" className="form-control" id="modelo" value={modelo} onChange={ e => onChange(e) } required/>
                    <br/>
                    <label htmlFor="ano">Ano</label>
                    <input type="number" name="ano" className="form-control" id="ano" value={ano} onChange={ e => onChange(e) } required/>
                    <br/>
                </div>
                <div className="col-sm-6">
                    <div className="container">
                        <img id="preview" className="img-responsive" src="/imagens/placeholder.svg" alt="Fotografia da viatura a registar"/>
                        <input id="foto_preview" type="file" name="foto" accept="image/*" autoComplete="off" value={foto} onChange={ (e) => {onChange(e); PreviewImage();} } required/>
                    </div>
                </div>
            </div>
            <br/>
            <div className="form-row">
                <div className="col-sm-4">
                    <label htmlFor="matricula">Matrícula</label>
                    <input type="text" name="matricula" className="form-control" id="matricula" pattern="[a-zA-Z0-9]{6}" placeholder="nlnlnl" value={matricula} onChange={ e => onChange(e) } required/>
                </div>
                <div className="col-sm-4">
                    <label htmlFor="cor">Cor</label>
                    <input type="text" name="cor" className="form-control" id="cor" pattern="^[a-zA-Z]+$" value={cor} onChange={ e => onChange(e) } required/>
                 </div>
                 <div className="col-sm-4">
                    <label htmlFor="num_lugares">Número de Lugares</label>
                    <input type="number" name="num_lugares" className="form-control" id="num_lugares" value={num_lugares} onChange={ e => onChange(e) } required/>    
                </div>
            </div>
            <br/><br/>
            <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#limpar-campos" style={{float:'left'}}>Limpar Campos</button>
            <button type="button" className="btn btn-submeter" data-toggle="modal" data-target="#registar-viatura">Registar Viatura</button>
            <ModalAdminRegistarViatura/>
        </form>
    );
}

export{
    FormLogin,
    FormPresencialRegistar,
    FormTelefonistaRegistar,
    FormAdminRegistarViagem,
    FormAdminRegistarMotorista,
    FormAdminregistarViatura
}