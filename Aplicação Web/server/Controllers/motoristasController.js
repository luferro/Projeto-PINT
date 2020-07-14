const pool = require("../db");

module.exports = {
    getMotorista : async function(req, res){
        try{
            const { id } = req.params;
            const Motorista = await pool.query(
                "SELECT * FROM motoristas where id_moto = $1", [id]
            );
            res.json(Motorista.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getMotoristas : async function(req, res){
        try{
            const TodosMotoristas = await pool.query(
                "SELECT * FROM motoristas"
            );
            res.json(TodosMotoristas.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getMotoristasLivres : async function(req, res){
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
                var TodosMotoristas = await pool.query(
                    "SELECT * FROM motoristas l WHERE  NOT EXISTS (SELECT * FROM viagens WHERE  id_moto = l.id_moto and ((data_ida = '"+data_ida.toLocaleString().slice(0,10)+"' and hora_ida = '"+hora_ida.slice(0,10)+"') or (data_volta = '"+data_volta.toLocaleString().slice(0,10)+"' and hora_volta = '"+hora_volta.slice(0,10)+"')));"
                );
            }
            else {
                var TodosMotoristas = await pool.query(
                    "SELECT * FROM motoristas l WHERE  NOT EXISTS (SELECT * FROM viagens WHERE  id_moto = l.id_moto and ((data_ida = '"+data_ida.toLocaleString().slice(0,10)+"' and hora_ida = '"+ hora_ida.slice(0,10)+"')));"
                );
            }

            res.json(TodosMotoristas.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    postMotorista : async function(req, res){
        try {
            const { pnome_moto, unome_moto, email_moto, foto_moto, contacto_moto, datanascimento_moto, localidade_moto, cc_moto, morada_moto, codpostal_moto, nif_moto, nomeemergencia_moto, contactoemergencia_moto} = req.body;
            let password = Math.random().toString(36).substr(2, 5);
            
            const newMotorista = await pool.query(
                "INSERT INTO motoristas (pnome_moto, unome_moto, email_moto, foto_moto, contacto_moto, datanascimento_moto, localidade_moto, cc_moto, morada_moto, codpostal_moto, nif_moto, nomeemergencia_moto, contactoemergencia_moto, estado, password_moto) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *",
                [pnome_moto, unome_moto, email_moto, foto_moto, contacto_moto, datanascimento_moto, localidade_moto, cc_moto, morada_moto, codpostal_moto, nif_moto, nomeemergencia_moto, contactoemergencia_moto, "Ativo", password]
            );
        
            res.json(newMotorista.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    putMotorista : async function(req, res){
        try{
            const { id } = req.params;
            const estado_user = await pool.query(
                "select estado from motoristas where id_moto = $1", [id]
            );

            if(estado_user.rows[0].estado == "Suspenso")
                await pool.query(
                    "UPDATE motoristas SET estado = 'Ativo' WHERE id_moto = $1", [id]
                );
            if(estado_user.rows[0].estado == "Ativo")
                await pool.query(
                    "UPDATE motoristas SET estado = 'Suspenso' WHERE id_moto = $1", [id]
                );

                res.json("Estado do motorista atualizado!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    deleteMotorista : async function(req, res){
        try{
            const { id } = req.params;
            await pool.query(
                "DELETE FROM motoristas WHERE id_moto = $1", [id]
            );
            res.json("Motorista eliminado!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
}