import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from 'react-router-dom';
const APIUrl = "https://api-pint.herokuapp.com";

toast.configure();

//Presencial Modal--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function ModalPresencialRegistar() {
    return (
        <div className="modal fade" role="dialog" tabIndex="-1" id="registar-cliente" aria-labelledby="registarC" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Confirmação para registo de cliente</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Deseja submeter o registo do cliente?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                        <button type="submit" className="btn btn-submeter">Registar Cliente</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ModalPresencialContabilidade(props) {
    let history = useHistory(), email = props.emails;

    const notificar = async () => {
        try{
            if(email === "") {
                document.getElementsByClassName("close")[0].click();
                return toast.error("Não selecionou nenhum cliente para notificar.");
            }
            else {
                document.getElementsByClassName("close")[0].click();
                history.push('/temp');
                history.goBack();
                toast.success("Clientes selecionados foram notificados!");
            }

            const body = { email };
            await fetch(APIUrl + "/send/emails/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="modal fade" role="dialog" tabIndex="-1" id="notificar-cliente" aria-labelledby="notificarC" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Notificar cliente(s)</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Deseja notificar o(s) cliente(s) selecionado(s)?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                        <button type="button" onClick={notificar} className="btn btn-submeter">Notificar Cliente(s)</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ModalPresencialEliminarDivida({divida_eliminar}) {
    let history = useHistory();

    const deleteDivida = async (id_divida) => {
        try{
            await fetch(APIUrl + "/dividas/"+id_divida, {
                method: "DELETE"
            });
            
            history.push('/temp');
            history.goBack();
            toast.success("Divida eliminada com sucesso.");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        divida_eliminar.map(id => (
        <div className="modal fade" role="dialog" tabIndex="-1" id={"eliminar-divida-"+id.id_divida} aria-labelledby="eliminarD" aria-hidden="true" key={id.id_divida}>
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Eliminar Divida</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p> Deseja eliminar esta divida? </p>
                        <p> Apenas elimine se o cliente já tiver a situação regularizada e se já tiver emitido a fatura. </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                        <button type="button" onClick={() => deleteDivida(id.id_divida)} className="btn btn-submeter" data-dismiss="modal">Eliminar divida</button>
                    </div>
                </div>
            </div>
        </div>
        ))
    );
}

function ModalPresencialFatura(props) {
    return (
        <div className="modal fade" role="dialog" tabIndex="-1" id="gerar-fatura" aria-labelledby="gerarF" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Gerar PDF</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Deseja gerar o PDF para esta fatura?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-submeter" onClick={props.gerarPDF} data-dismiss="modal">Gerar PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

//Telefonista Modal--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function ModalTelefonistaCancelar({pedido_cancelar}) {
    let history = useHistory();

    const updatePedido = async (id_pedido) => {
        try{
            await fetch(APIUrl + "/pedidosviagem/pedido/"+id_pedido, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            });

            history.push('/temp');
            history.goBack();
            toast.success("Pedido de cancelamento submetido com sucesso!");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        pedido_cancelar.map(pedido_cancelar => (
        <div className="modal fade" role="dialog" tabIndex="-1" id={"cancelar-pedido-"+pedido_cancelar.id_pedido} aria-labelledby="cancelarP" aria-hidden="true" key={pedido_cancelar.id_pedido}>
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Cancelamento do pedido</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p> Deseja submeter este pedido de cancelamento?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                        <button type="button" onClick={() => updatePedido(pedido_cancelar.id_pedido)} className="btn btn-submeter" data-dismiss="modal">Submeter Cancelamento</button>
                    </div>
                </div>
            </div>
        </div>
        ))
    );
}

function ModalTelefonistaRegistar() {
    return (
        <div className="modal fade" role="dialog" tabIndex="-1" id="submissao-viagem" aria-labelledby="submissaoV" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Confirmação de submissão</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p> Deseja submeter este pedido de viagem?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                        <button type="submit" className="btn btn-submeter">Submeter Viagem</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

//Admin Modal--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function ModalAdminEliminarViagem({id}) {
    let history = useHistory();

    const deletePedidoViagem = async (id_pedido) => {
        try{
            await fetch(APIUrl + "/pedidosviagem/pedido/"+id_pedido, {
                method: "DELETE"
            });
            
            history.push('/temp');
            history.goBack();
            toast.success("Viagem eliminada com sucesso!");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        id.map(id => (
        <div className="modal fade" role="dialog" tabIndex="-1" id={"eliminar-viagem-"+id.id_pedido} aria-labelledby="eliminarV" aria-hidden="true" key={id.id_pedido}>
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Eliminar Pedido</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p> Deseja eliminar este pedido de viagem? </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                        <button type="button" onClick={() => deletePedidoViagem(id.id_pedido)} className="btn btn-submeter" data-dismiss="modal">Eliminar pedido</button>
                    </div>
                </div>
            </div>
        </div>
        ))
    );
}

function ModalAdminRegistarViagem() {
    return (
        <div className="modal fade" role="dialog" tabIndex="-1" id="registar-viagem" aria-labelledby="registarVi" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Confirmação para registo de viagem</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Deseja submeter o registo de viagem?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                        <button type="submit" className="btn btn-submeter">Registar viagem</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ModalAdminRegistarMotorista() {
    return (
        <div className="modal fade" role="dialog" tabIndex="-1" id="registar-motorista" aria-labelledby="registarM" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Confirmação para registo de motorista</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Deseja submeter o registo do motorista?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                        <button type="submit" className="btn btn-submeter">Registar motorista</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ModalAdminRegistarViatura() {
    return (
        <div className="modal fade" role="dialog" tabIndex="-1" id="registar-viatura" aria-labelledby="registarM" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Confirmação para registo de viatura</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Deseja submeter o registo da viatura?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                        <button type="submit" className="btn btn-submeter">Registar viatura</button>
                    </div>
                </div>
            </div>
        </div>	
    );
}

function ModalAdminSuspenderCliente({cliente}) {
    let history = useHistory();

    const updateUser = async (id_cliente) => {
        try{
            await fetch(APIUrl + "/clientes/"+id_cliente, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            });

            history.push('/temp');
            history.goBack();
            toast.success("Cliente atualizado com sucesso!");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        cliente.map(cliente => (
        <div className="modal fade" role="dialog" tabIndex="-1" id={"suspender-user-"+cliente.id_cli} aria-labelledby="suspenderU" aria-hidden="true" key={cliente.id_cli}>
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Confirmação de suspensão do cliente {cliente.pnome_cli + ' ' + cliente.unome_cli}</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Deseja confirmar esta suspensão?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                        <button type="submit" onClick={() => updateUser(cliente.id_cli)} className="btn btn-submeter" data-dismiss="modal">Suspender/Ativar Cliente</button>
                    </div>
                </div>
            </div>
        </div>
        ))
    );
}

function ModalAdminSuspenderMotorista({motorista}) {
    let history = useHistory();
    const updateUser = async (id_motorista) => {
        try{
            await fetch(APIUrl + "/motoristas/motorista/"+id_motorista, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            });
            
            history.push('/temp');
            history.goBack();
            toast.success("Motorista atualizado com sucesso!");
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        motorista.map(motorista => (
        <div className="modal fade" role="dialog" tabIndex="-1" id={"suspender-user-"+motorista.id_moto} aria-labelledby="suspenderU" aria-hidden="true" key={motorista.id_moto}>
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Confirmação de suspensão do motorista {motorista.pnome_moto + ' ' + motorista.unome_moto}</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Deseja confirmar esta suspensão?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                        <button type="submit" onClick={() => updateUser(motorista.id_moto)} className="btn btn-submeter" data-dismiss="modal">Suspender/Ativar Motorista</button>
                    </div>
                </div>
            </div>
 
        </div>
        ))
    );
}

function ModalLimpar() {
    let history = useHistory();
    
    const Limpar = () => {
        history.push('/temp');
        history.goBack();
        toast.success("Formulário limpo!");
    }

    return (
        <div className="modal fade" role="dialog" tabIndex="-1" id="limpar-campos" aria-labelledby="limparC" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Confirmação para limpar campos</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Deseja limpar os dados do formulário?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                        <button type="button" onClick={Limpar} className="btn btn-submeter" data-dismiss="modal" aria-label="Close">Limpar Campos</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ModalContactoEmergenciaMotorista({motorista}) {
    return (
        motorista.map(motorista => (
        <div className="modal fade" role="dialog" tabIndex="-1" id={"contacto-emergencia-"+motorista.id_moto} aria-labelledby="contactoE" aria-hidden="true" key={motorista.id_moto}>
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Contacto de emergência</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Nome do contacto de emergência: {motorista.nomeemergencia_moto}</p>
                        <p>Contacto: {motorista.contactoemergencia_moto}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        ))
    );
}

function ModalContactoEmergenciaCliente({cliente}) {
    return (
        cliente.map(cliente => (
        <div className="modal fade" role="dialog" tabIndex="-1" id={"contacto-emergencia-"+cliente.id_cli} aria-labelledby="contactoE" aria-hidden="true" key={cliente.id_cli}>
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Contacto de emergência</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Nome do contacto de emergência: {cliente.nomeemergencia_cli}</p>
                        <p>Contacto: {cliente.contactoemergencia_cli}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        ))
    );
}

function ModalConsultarComprovativos({cliente}) {
    return (
        cliente.map(cliente => (
        <div className="modal fade" role="dialog" tabIndex="-1" id={"consultar-comprovativos-"+cliente.id_cli} aria-labelledby="consultarC" aria-hidden="true" key={cliente.id_cli}>
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h4 className="modal-title">Consultar Comprovativos</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Comprovatido de Identidade: {cliente.comprovativoidentidade_cli}</p>
                        <p>Comprovatido de Morada: {cliente.comprovativomorada_cli}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        ))
    );
}

export{
    ModalLimpar,
    ModalPresencialRegistar,
    ModalPresencialContabilidade,
    ModalPresencialFatura,
    ModalPresencialEliminarDivida,
    ModalTelefonistaCancelar,
    ModalTelefonistaRegistar,
    ModalAdminRegistarMotorista,
    ModalAdminEliminarViagem,
    ModalAdminRegistarViatura,
    ModalAdminRegistarViagem,
    ModalContactoEmergenciaMotorista,
    ModalContactoEmergenciaCliente,
    ModalConsultarComprovativos,
    ModalAdminSuspenderCliente,
    ModalAdminSuspenderMotorista
}