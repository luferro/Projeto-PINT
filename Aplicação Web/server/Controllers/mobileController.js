const pool = require("../db");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

var date = new Date();
var dia = date.getDate();
var mes = date.getMonth() + 1;
var ano = date.getFullYear();
var horas = date.getHours() + 1;
var minutos = date.getMinutes();
if(horas < 10) horas = "0" + horas;
if(minutos < 10) minutos = "0" + minutos;

module.exports = {
    getViagensExistentes : async function(req, res){
        try{
            const TodosViagens = await pool.query(
                "SELECT * FROM viagens where data_ida >= '"+ano+"-"+mes+"-"+dia+"' or data_volta >= '"+ano+"-"+mes+"-"+dia+"'"
            );
            res.json(TodosViagens.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getViagensPorFazer : async function(req, res){
        try{
            const { email } = req.params;

            const motorista = await pool.query(
                "select id_moto from motoristas where email_moto = $1", [email]
            );

            const TodosViagens = await pool.query(
                "SELECT * FROM viagens where (data_ida >= '"+ano+"-"+mes+"-"+dia+"' or data_volta >= '"+ano+"-"+mes+"-"+dia+"') AND id_moto = $1", [motorista.rows[0].id_moto]
            );
            res.json(TodosViagens.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getViagensRealizadas : async function(req, res){
        try{
            const { email } = req.params;

            const cliente = await pool.query(
                "select id_cli from clientes where email_cli = $1", [email]
            );

            const TodosViagens = await pool.query(
                "SELECT * FROM viagens where (data_ida <= '"+ano+"-"+mes+"-"+dia+"' or data_volta <= '"+ano+"-"+mes+"-"+dia+"') and id_cli = $1", [cliente.rows[0].id_cli]
            );
            res.json(TodosViagens.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    postLoginMotoristas : async function(req, res){
        const { email, password } = req.body;

        try {
            const motorista = await pool.query("SELECT * FROM motoristas WHERE email_moto = $1", [email]);

            if(motorista.rows.length === 0) {
                return res.json("Credenciais inválidas.");
            }

            if(motorista.rows[0].estado != "Ativo") {
                return res.json("Conta suspensa.");
            }

            const validPassword = await bcrypt.compare(password, motorista.rows[0].password_moto);

            if(!validPassword) {
                if(password != motorista.rows[0].password_moto)
                    return res.status(401).json("Palavra-Passe Inválida.");
            }

            return res.json(true);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    postLoginClientes : async function(req, res){
        const { email, password } = req.body;

        try {
            const cliente = await pool.query("SELECT * FROM clientes WHERE email_cli = $1", [email]);

            if(cliente.rows.length === 0) {
                return res.json("Credenciais inválidas.");
            }

            if(cliente.rows[0].estado != "Ativo") {
                return res.json("Conta suspensa.");
            }

            const validPassword = await bcrypt.compare(password, cliente.rows[0].password_cli);

            if(!validPassword) {
                if(password != cliente.rows[0].password_cli)
                    return res.status(401).json("Palavra-Passe Inválida.");
            }

            return res.json(true);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    postPedidoClientes: async function(req, res){
        try {
            const { email, origem, destino, data_ida, hora_ida, data_volta, hora_volta, bagagem, bagagem_quant, acompanhantes, necessidades } = req.body;

            const cliente = await pool.query("SELECT * FROM clientes WHERE email_cli = $1", [email]);

            const clientetemdivida = await pool.query("SELECT * FROM dividas WHERE id_cli = $1", [cliente.rows[0].id_cli]);

            if(clientetemdivida.rows.length > 0)
                return res.status(401).json("Tem dividas pendentes. Regularize a sua situação presencialmente.");

            if(data_volta !== "")
                var newViagem = await pool.query(
                    "INSERT INTO pedidos_viagem (id_cli, nome, origem, destino, data_ida, hora_ida, data_volta, hora_volta, bagagem, bagagem_quant, acompanhantes, necessidades, estado_pedido) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
                    [cliente.rows[0].id_cli, cliente.rows[0].pnome_cli + " " + cliente.rows[0].unome_cli, origem, destino, data_ida, hora_ida, data_volta, hora_volta, bagagem, bagagem_quant, acompanhantes, necessidades, "Disponivel"],
                );
            else
                var newViagem = await pool.query(
                    "INSERT INTO pedidos_viagem (id_cli, nome, origem, destino, data_ida, hora_ida, bagagem, bagagem_quant, acompanhantes, necessidades, estado_pedido) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
                    [cliente.rows[0].id_cli, cliente.rows[0].pnome_cli + " " + cliente.rows[0].unome_cli, origem, destino, data_ida, hora_ida, bagagem, bagagem_quant, acompanhantes, necessidades, "Disponivel"],
                );

            await pool.query(
                "INSERT INTO notificacoes (notificacao) VALUES ($1) RETURNING *",
                ["Pedido de viagem com origem em " + origem + " e destino em " + destino + " efetuado com sucesso."],
            );

            const notificacoes = await pool.query("SELECT * FROM notificacoes WHERE notificacao = $1",  ["Pedido de viagem com origem em " + origem + " e destino em " + destino + " efetuado com sucesso."]);

            await pool.query(
                "INSERT INTO notificacoes_geradas (id_cli, id_notificacao, data, notificacao) VALUES ($1,$2,$3,$4) RETURNING *",
                [cliente.rows[0].id_cli, notificacoes.rows[0].id_notificacao, ano+"-"+mes+"-"+dia, "Pedido de viagem com origem em " + origem + " e destino em " + destino + " efetuado com sucesso."],
            );
        
            res.json(newViagem.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    postPedidoCancelamento: async function(req, res){
        try {
            const { id_viagem } = req.body;

            const viagem = await pool.query("SELECT * FROM viagens WHERE id_viagem = $1", [id_viagem]);

            await pool.query(
                "UPDATE pedidos_viagem SET estado_pedido = 'Cancelar', hora_pedido = now() WHERE id_pedido = $1", [viagem.rows[0].id_pedido]
            );
        
            res.json("Pedido Viagem atualizado!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    postDivida: async function(req, res){
        try {
            const { id_cli, montante } = req.body;

            const divida = await pool.query(
                "INSERT INTO dividas (id_cli, montante) VALUES ($1,$2) RETURNING *",
                [id_cli, montante],
            );

            await pool.query(
                "INSERT INTO notificacoes (notificacao) VALUES ($1) RETURNING *",
                ["Tem um montante em divida no valor de " + montante + "EUR. Proceda ao pagamento desta divida de forma presencial."],
            );

            const notificacoes = await pool.query("SELECT * FROM notificacoes WHERE notificacao = $1",  ["Tem um montante em divida no valor de " + montante + "EUR. Proceda ao pagamento desta divida de forma presencial."]);

            await pool.query(
                "INSERT INTO notificacoes_geradas (id_cli, id_notificacao, data, notificacao) VALUES ($1,$2,$3,$4) RETURNING *",
                [id_cli, notificacoes.rows[0].id_notificacao, ano+"-"+mes+"-"+dia, "Tem um montante em divida no valor de " + montante + "EUR. Proceda ao pagamento desta divida de forma presencial."],
            );
        
            res.json(divida.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getViagensMotoristas : async function(req, res){
        try{
            const { email } = req.params;

            const motorista = await pool.query(
                "select id_moto from motoristas where email_moto = $1", [email]
            );

            const MotoViagens = await pool.query(
                "SELECT * FROM viagens where id_moto = $1", [motorista.rows[0].id_moto]
            );
            res.json(MotoViagens.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getViagensClientes : async function(req, res){
        try{
            const { email } = req.params;

            const cliente = await pool.query(
                "select id_cli from clientes where email_cli = $1", [email]
            );

            const CliViagens = await pool.query(
                "SELECT * FROM viagens where id_cli = $1", [cliente.rows[0].id_cli]
            );
            res.json(CliViagens.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getClientePerfil : async function(req, res){
        try{
            const { email } = req.params;

            const cliente = await pool.query(
                "select * from clientes where email_cli = $1", [email]
            );

            res.json(cliente.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getNotificacoesClientes : async function(req, res){
        try{
            const { email } = req.params;

            const cliente = await pool.query(
                "select id_cli from clientes where email_cli = $1", [email]
            );

            const CliNoti = await pool.query(
                "SELECT * FROM NOTIFICACOES_GERADAS where id_cli = $1", [cliente.rows[0].id_cli]
            );
            res.json(CliNoti.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    deleteNotificacoesClientes : async function(req, res){
        try{
            const { id } = req.params;

            await pool.query(
                "delete from notificacoes_geradas where id_notificacao = $1", [id]
            );

            await pool.query(
                "delete from notificacoes where id_notificacao = $1", [id]
            );
            res.json("Apagado.");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    putPasswordMotoristas : async function(req, res){
        try{
            const { email } = req.params;
            const { password } = req.body;

            const salt = await bcrypt.genSalt(10);
            const bcryptPassword = await bcrypt.hash(password, salt);
            
            await pool.query(
                "UPDATE motoristas SET password_moto = $1 where email_moto = $2", [bcryptPassword, email]
            );

            res.json("Palavra-Passe atualizada!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    putPasswordClientes : async function(req, res){
        try{
            const { email } = req.params;
            const { password } = req.body;

            const salt = await bcrypt.genSalt(10);
            const bcryptPassword = await bcrypt.hash(password, salt);
            
            await pool.query(
                "UPDATE clientes SET password_cli = $1 where email_cli = $2", [bcryptPassword, email]
            );

            res.json("Palavra-Passe atualizada!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    postEmailMobile : async function(req, res){
        const { email } = req.body;

        try{
            let nome, password = Math.random().toString(36).substr(2, 5);

            const motoristas =  await pool.query(
                "SELECT * FROM motoristas where email_moto = $1", [email]
            );

            const clientes =  await pool.query(
                "SELECT * FROM clientes where email_cli = $1", [email]
            );

            if(motoristas.rows.length > 0) {
                await pool.query(
                    "UPDATE motoristas SET password_moto = $1 where email_moto = $2", [password, email]
                );

                nome = motoristas.rows[0].pnome_moto + " " + motoristas.rows[0].unome_moto;
            }
            if(clientes.rows.length > 0) {
                await pool.query(
                    "UPDATE clientes SET password_cli = $1 where email_cli = $2", [password, email]
                );

                nome = clientes.rows[0].pnome_cli + " " + clientes.rows[0].unome_cli;
            }
            if(motoristas.rows.length === 0 && clientes.rows.length === 0) return res.status(401).json("Nenhum utilizador encontrado."); 

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: true, // use TLS          
                auth: {
                  user: 'pintnoreply@gmail.com',
                  pass: 'estgv16790'
                }
            });
            
            let mailOptions = {
                from: 'pintnoreply@gmail.com',
                to: email,
                subject: 'Recuperação da palavra-passe na plataforma Projeto PINT',
                text: `
                    Olá, ${nome}!
                    
                    Pode iniciar sessão na aplicação móvel com a palavra-passe "${password}".
                    Lembre-se de alterar a palavra-passe o mais cedo possível!
                `,
                html: `
                    <h4><b>Olá, ${nome}!</b></h4>
                    <br>
                    <p>Pode iniciar sessão na aplicação móvel com a palavra-passe "${password}".</p>
                    <p>Lembre-se de alterar a palavra-passe o mais cedo possível!</p>
                `
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send("Email enviado com sucesso!")
                }
            });  
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
}