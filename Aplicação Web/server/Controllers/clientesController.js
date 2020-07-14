const pool = require("../db");

module.exports = {
    getCliente : async function(req, res){
        try{
            const { id } = req.params;
            const Cliente = await pool.query(
                "SELECT * FROM clientes where id_cli = $1", [id]
            );
            res.json(Cliente.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getClientes : async function(req, res){
        try{
            const TodosClientes = await pool.query(
                "SELECT * FROM clientes"
            );
            res.json(TodosClientes.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    postCliente : async function(req, res){
        try {
            const { pnome_cli, unome_cli, email_cli, foto_cli, contacto_cli, datanascimento_cli, localidade_cli, cc_cli, morada_cli, codpostal_cli, nif_cli, nomeemergencia_cli, contactoemergencia_cli, necessidades_cli, info_cli, comprovativoidentidade_cli, comprovativomorada_cli } = req.body;
            let password = Math.random().toString(36).substr(2, 5);
            
            const newCliente = await pool.query(
              "INSERT INTO clientes (pnome_cli, unome_cli, email_cli, foto_cli, contacto_cli, datanascimento_cli, localidade_cli, cc_cli, morada_cli, codpostal_cli, nif_cli, nomeemergencia_cli, contactoemergencia_cli, necessidades_cli, info_cli, comprovativoidentidade_cli, comprovativomorada_cli, estado, password_cli) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *",
              [pnome_cli, unome_cli, email_cli, foto_cli, contacto_cli, datanascimento_cli, localidade_cli, cc_cli, morada_cli, codpostal_cli, nif_cli, nomeemergencia_cli, contactoemergencia_cli, necessidades_cli, info_cli, comprovativoidentidade_cli, comprovativomorada_cli, "Ativo", password]
            );
        
            res.json(newCliente.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    putCliente : async function(req, res){
        try{
            const { id } = req.params;
            const estado_user = await pool.query(
                "select estado from clientes where id_cli = $1", [id]
            );

            if(estado_user.rows[0].estado == "Suspenso")
                await pool.query(
                    "UPDATE clientes SET estado = 'Ativo' WHERE id_cli = $1", [id]
                );
            if(estado_user.rows[0].estado == "Ativo")
                await pool.query(
                    "UPDATE clientes SET estado = 'Suspenso' WHERE id_cli = $1", [id]
                );

                res.json("Estado do cliente atualizado!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    deleteCliente : async function(req, res){
        try{
            const { id } = req.params;
            await pool.query(
                "DELETE FROM clientes WHERE id_cli = $1", [id]
            );
            res.json("Cliente eliminado!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
}