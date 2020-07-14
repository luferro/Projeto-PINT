const pool = require("../db");

module.exports = {
    getGeralViagens : async function(req, res){
        try{
            const TodosViagens = await pool.query(
                "SELECT count(id_viagem) as num_viagens FROM viagens;"
            );
            res.json(TodosViagens.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getGeralMotoristas : async function(req, res){
        try{
            const TodosMotoristas = await pool.query(
                "SELECT count(id_moto) as num_moto FROM motoristas;"
            );
            res.json(TodosMotoristas.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getGeralClientes : async function(req, res){
        try{
            const TodosClientes = await pool.query(
                "SELECT count(id_cli) as num_cli FROM clientes;"
            );
            res.json(TodosClientes.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getGeralOrigemMenosPopular : async function(req, res){
        try{
            const TodosOrigem = await pool.query(
                "SELECT origem, count(origem) as num_origem FROM viagens group by origem order by count(origem) ASC limit 1;"
            );
            res.json(TodosOrigem.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getGeralDestinoMenosPopular : async function(req, res){
        try{
            const TodosDestino = await pool.query(
                "SELECT destino, count(destino) as num_destino FROM viagens group by destino order by count(destino) ASC limit 1;"
            );
            res.json(TodosDestino.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getGeralOrigemMaisPopular : async function(req, res){
        try{
            const TodosOrigem = await pool.query(
                "SELECT origem, count(origem) as num_origem FROM viagens group by origem order by count(origem) DESC limit 1;"
            );
            res.json(TodosOrigem.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getGeralDestinoMaisPopular : async function(req, res){
        try{
            const TodosDestino = await pool.query(
                "SELECT destino, count(destino) as num_destino FROM viagens group by destino order by count(destino) DESC limit 1;"
            );
            res.json(TodosDestino.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
}