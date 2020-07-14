const pool = require("../db");

module.exports = {
    getLocalidade : async function(req, res){
        try{
            const { id } = req.params;
            const Localidade = await pool.query(
                "SELECT * FROM localidades where id_localidade = $1", [id]
            );
            res.json(Localidade.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getLocalidades : async function(req, res){
        try{
            const TodosLocalidades = await pool.query(
                "SELECT * FROM localidades"
            );
            res.json(TodosLocalidades.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
}