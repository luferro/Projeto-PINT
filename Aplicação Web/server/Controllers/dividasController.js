const pool = require("../db");

module.exports = {
    getDivida : async function(req, res){
        try{
            const { id } = req.params;
            const Divida = await pool.query(
                "SELECT clientes.id_cli, dividas.id_divida, clientes.pnome_cli, clientes.unome_cli, clientes.email_cli, clientes.contacto_cli, dividas.montante FROM clientes INNER JOIN dividas ON dividas.id_cli=clientes.id_cli where id_divida = $1;", [id]
            );
            res.json(Divida.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getDividas : async function(req, res){
        try{
            const TodosDividas = await pool.query(
                "SELECT clientes.id_cli, dividas.id_divida, clientes.pnome_cli, clientes.unome_cli, clientes.email_cli, clientes.contacto_cli, dividas.montante FROM clientes INNER JOIN dividas ON dividas.id_cli=clientes.id_cli;"
            );
            res.json(TodosDividas.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    deleteDivida : async function(req, res){
        try{
            const { id } = req.params;
            await pool.query(
                "DELETE FROM dividas WHERE id_divida = $1", [id]
            );
            res.json("Divida eliminada!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
}