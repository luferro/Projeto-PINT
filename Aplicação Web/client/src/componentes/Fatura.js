import React, { Fragment, useState, useEffect } from 'react';
import { TabelaPresencialFatura } from './Tabela';
import { ButtonPresencialFatura } from './Buttons';
import { ModalPresencialFatura } from './Modal';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const APIUrl = "https://api-pint.herokuapp.com";

toast.configure();

function gerarPDF() {
    html2canvas(document.getElementById('fatura'))
    .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');   
        var doc = new jsPDF("p", "mm", "a4");
        var width = doc.internal.pageSize.getWidth();    
        doc.addImage(imgData, 'JPEG', 0, 0, width, 100);
        doc.save("Fatura.pdf");  
    });

    toast.success("PDF gerado!");
}

function CabecalhoPresencialFatura() {
    let data = new Date();
    let horas = data.getHours(), minutos = data.getMinutes();
    if(minutos < 10) minutos = "0" + minutos;
    if(horas < 10) horas = "0" + horas;
    let data_pedido = data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear() + ' às ' + horas + ':' + minutos;

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
            <div id="fatura">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>MUV | Mobilidade Urbana de Viseu</h3>
                        <p>Praça da República</p>
                        <p>3514-501 Viseu</p>
                        <p>Email: geral@muv.pt</p>
                        <p>Tel: 232 427 427</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <h5><b>Fatura para:</b></h5>
                        <p>{dividas.pnome_cli + ' ' + dividas.unome_cli}</p>
                    </div>
                    <div className="col-sm-6 text-right">
                        <h5><b>Data do pedido:</b></h5>
                        <p>{data_pedido}</p>
                    </div>
                </div>
                <TabelaPresencialFatura />
            </div>
            <ButtonPresencialFatura/>
            <ModalPresencialFatura  gerarPDF={gerarPDF}/>
        </Fragment>
    );
}

export{
    CabecalhoPresencialFatura
}