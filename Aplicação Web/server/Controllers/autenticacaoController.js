const pool = require("../db");
const GeradorTokens = require("../Utils/GeradorTokens");

module.exports = {
    postLogin : async function(req, res){
        const { email, password } = req.body;

        try {
            const admin = await pool.query("SELECT * FROM Perfis WHERE email_adm = $1", [email]);   //Perfis é uma view criada que junta todos os utilizadores

            if (admin.rows.length === 0) {
                return res.status(401).json("Credenciais inválidas.");
            }

            if(password != admin.rows[0].password_adm) {
                return res.status(401).json("Palavra-Passe Inválida.");
            }

            const jwtToken = GeradorTokens(admin.rows[0].email_adm);
            return res.json({ jwtToken });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getVerificar : async function(req, res){
        try {
            res.json(true);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getPerfilAdmin : async function(req, res){
        try {
            const { email } = req.params;
            let existe = 0;
            const admin = await pool.query(
                "SELECT * FROM administradores where email_adm = $1", [email]
            );

            if (admin.rows.length === 0) {
                existe = 0;
            } else existe = 1;

            res.json(existe);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getPerfilTelefonista : async function(req, res){
        try {
            const { email } = req.params;
            let existe = 0;
            const telefonista = await pool.query(
                "SELECT * FROM telefonistas where email_tel = $1", [email]
            );

            if (telefonista.rows.length === 0) {
                existe = 0;
            } else existe = 1;

            res.json(existe);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getPerfilPresencial : async function(req, res){
        try {
            const { email } = req.params;
            let existe = 0;
            const presencial = await pool.query(
                "SELECT * FROM operadores where email_op = $1", [email]
            );

            if (presencial.rows.length === 0) {
                existe = 0;
            } else existe = 1;

            res.json(existe);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getPerfilCMV : async function(req, res){
        try {
            const { email } = req.params;
            let existe = 0;
            const cmv = await pool.query(
                "SELECT * FROM cmv where email_cmv = $1", [email]
            );

            if (cmv.rows.length === 0) {
                existe = 0;
            } else existe = 1;

            res.json(existe);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
    
}