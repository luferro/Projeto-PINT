const pool = require("../db");
const nodemailer = require('nodemailer');

module.exports = {
    postEmail : async function(req, res){
        const { email } = req.body;

        try{
            let nome, password;

            const motoristas =  await pool.query(
                "SELECT * FROM motoristas where email_moto = $1", [email]
            );

            const clientes =  await pool.query(
                "SELECT * FROM clientes where email_cli = $1", [email]
            );

            if(motoristas.rows.length > 0) {
                nome = motoristas.rows[0].pnome_moto + " " + motoristas.rows[0].unome_moto;
                password = motoristas.rows[0].password_moto;
            }
            if(clientes.rows.length > 0) {
                nome = clientes.rows[0].pnome_cli + " " + clientes.rows[0].unome_cli;
                password = clientes.rows[0].password_cli;
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
                subject: 'Registo de utilizador na plataforma Projeto PINT',
                text: `
                    Seja bem-vindo ao ProjetoPINT, ${nome}!
                    
                    Pode iniciar sessão na aplicação móvel com a palavra-passe "${password}".
                    Lembre-se de alterar a palavra-passe o mais cedo possível!
                    
                    Favor confirmar receção deste email com o operador que tratou do seu registro na plataforma.
                `,
                html: `
                    <h4><b>Seja bem-vindo ao ProjetoPINT, ${nome}!</b></h4>
                    <br>
                    <p>Pode iniciar sessão na aplicação móvel com a palavra-passe "${password}".</p>
                    <p>Lembre-se de alterar a palavra-passe o mais cedo possível!</p>
                    <br>
                    <h5><b>Favor confirmar receção deste email com o operador que tratou do seu registro na plataforma.</b></h5>
                `
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });  
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    postEmails : async function(req, res){
        const { email } = req.body;

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
            subject: 'Alerta de dívida na plataforma ProjetoPINT',
            text: `
                Notficação de dívida.
                
                Foi verificado que tem dívidas em atraso.
                Proceda ao seu pagamento de forma presencial para regularizar a sua situação.
                
                Pode encontrar-nos das seguintes formas:
                
                Presencialmente
                    Praça da República
                    3514-501 Viseu  

                Email
                    Email: geral@muv.pt 

                Telefone
                    232 427 427  
            `,
            html: `
                <h4><b>Notficação de dívida.</b></h4>
                <br>
                <p>Foi verificado que tem dívidas em atraso.</p>
                <p>Proceda ao seu pagamento de forma presencial para regularizar a sua situação.</p>
                <br>
                <h4><b>Pode encontrar-nos das seguintes formas: </b></h4>
                <br>
                <ul>
                    <li>
                        <b>Presencialmente</b>
                        <p>Praça da República</p>
                        <p>3514-501 Viseu</p>    
                    </li>
                    <li>
                        <b>Email</b>
                        <p>Email: geral@muv.pt</p> 
                    </li>
                    <li>
                        <b>Telefone</b>
                        <p>232 427 427</p>    
                    </li>
                </ul>
            `
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });  
    }
}