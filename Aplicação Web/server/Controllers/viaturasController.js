const pool = require("../db");

module.exports = {
    getViatura : async function(req, res){
        try{
            const { id } = req.params;
            const Viatura = await pool.query(
                "SELECT * FROM veiculos where id_veiculo = $1", [id]
            );
            res.json(Viatura.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getViaturasLivres : async function(req, res){
        try{
            const { id } = req.params;

            const datas =  await pool.query(
                "SELECT * FROM pedidos_viagem where id_pedido = $1", [id]
            );

            const data_ida = datas.rows[0].data_ida;
            const hora_ida = datas.rows[0].hora_ida;
            const data_volta = datas.rows[0].data_volta;
            const hora_volta = datas.rows[0].hora_volta;

            if(data_volta) {
                var TodosViaturas = await pool.query(
                    "SELECT * FROM veiculos l WHERE  NOT EXISTS (SELECT * FROM viagens WHERE  id_veiculo = l.id_veiculo and ((data_ida = '"+data_ida.toLocaleString().slice(0,10)+"' and hora_ida = '"+hora_ida.slice(0,10)+"') or (data_volta = '"+data_volta.toLocaleString().slice(0,10)+"' and hora_volta = '"+hora_volta.slice(0,10)+"')));"
                );
            }
            else {
                var TodosViaturas = await pool.query(
                    "SELECT * FROM veiculos l WHERE  NOT EXISTS (SELECT * FROM viagens WHERE  id_veiculo = l.id_veiculo and ((data_ida = '"+data_ida.toLocaleString().slice(0,10)+"' and hora_ida = '"+ hora_ida.slice(0,10)+"')));"
                );
            }

            res.json(TodosViaturas.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },


    getViaturas : async function(req, res){
        try{
            const TodosViaturas = await pool.query(
                "SELECT * FROM veiculos"
            );
            res.json(TodosViaturas.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    postViatura : async function(req, res){
        try {
            console.log(req.body);
            const { marca, modelo, cor, ano, matricula, num_lugares } = req.body;
            const newViatura = await pool.query(
                "INSERT INTO veiculos (marca, modelo, cor, ano, matricula, num_lugares) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
                [marca, modelo, cor, ano, matricula, num_lugares]
            );
        
            res.json(newViatura.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    putViatura : async function(req, res){
        try{
            const { id } = req.params;
            const { description } = req.body;
            await pool.query(
                "UPDATE veiculos SET description = $1 WHERE id_veiculo = $2", [description], [id]
            );
            res.json("Viatura atualizada!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    deleteViatura : async function(req, res){
        try{
            const { id } = req.params;
            await pool.query(
                "DELETE FROM veiculos WHERE id_veiculo = $1", [id]
            );
            res.json("Viatura eliminado!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
}