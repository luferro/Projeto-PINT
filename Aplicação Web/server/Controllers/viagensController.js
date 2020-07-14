const pool = require("../db");

var date = new Date();
var dia = date.getDate();
var mes = date.getMonth() + 1;
var ano = date.getFullYear();
var horas = date.getHours() + 1;
var minutos = date.getMinutes();
if(horas < 10) horas = "0" + horas;
if(minutos < 10) minutos = "0" + minutos;

module.exports = {
    getViagem : async function(req, res){
        try{
            const { id } = req.params;
            const viagem = await pool.query(
                "SELECT * FROM viagens where id_viagem = $1", [id]
            );
            res.json(viagem.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getViagens : async function(req, res){
        try{
            const TodosViagens = await pool.query(
                "SELECT * FROM viagens"
            );
            res.json(TodosViagens.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getViagensRealizadas : async function(req, res){
        try{
            const TodosViagens = await pool.query(
                "SELECT * FROM viagens where data_ida <= '"+ano+"-"+mes+"-"+dia+"' or data_volta <= '"+ano+"-"+mes+"-"+dia+"'"
            );
            res.json(TodosViagens.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    postViagem : async function(req, res){
        try {
            const { id_motorista, id_viatura, id_pedido, id_cli, nome, origem, destino, data_ida, hora_ida, data_volta, hora_volta, num_pessoas, necessidades, bagagem, bagagem_quant, motorista, viatura } = req.body;
            
            const localidade = await pool.query("SELECT * FROM localidades WHERE nome_localidade = $1", [origem]);
            
            let preço;
            if(localidade.rows[0].zona === 4) {
                if(Number(num_pessoas) + 1 == 1) preço = Number((localidade.rows[0].tarifabase).slice(1,6)) + 6.90; 
                if(Number(num_pessoas) + 1 == 2) preço = Number((localidade.rows[0].tarifabase).slice(1,6)) + 3.45; 
                if(Number(num_pessoas) + 1 == 3) preço = Number((localidade.rows[0].tarifabase).slice(1,6)) + 2.30; 
                if(Number(num_pessoas) + 1 >= 4) preço = Number((localidade.rows[0].tarifabase).slice(1,6)) + 1.73; 
            }
            else {
                if(Number(num_pessoas) + 1 == 1) preço = Number((localidade.rows[0].tarifabase).slice(1,6)) + 7.80; 
                if(Number(num_pessoas) + 1 == 2) preço = Number((localidade.rows[0].tarifabase).slice(1,6)) + 3.90; 
                if(Number(num_pessoas) + 1 == 3) preço = Number((localidade.rows[0].tarifabase).slice(1,6)) + 2.60; 
                if(Number(num_pessoas) + 1 >= 4) preço = Number((localidade.rows[0].tarifabase).slice(1,6)) + 1.95; 
            }

            if(data_volta) {
                var newViagem = await pool.query(
                    "INSERT INTO viagens (id_moto, id_veiculo, id_pedido, id_cli, nome, origem, destino, data_ida, hora_ida, data_volta, hora_volta, num_pessoas, necessidades, bagagem, bagagem_quant, motorista, viatura, custo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING *",
                    [id_motorista, id_viatura, id_pedido, id_cli, nome, origem, destino, data_ida, hora_ida, data_volta, hora_volta, num_pessoas, necessidades, bagagem, bagagem_quant, motorista, viatura, preço]
                );
            }
            else {
                var newViagem = await pool.query(
                    "INSERT INTO viagens (id_moto, id_veiculo, id_pedido, id_cli, nome, origem, destino, data_ida, hora_ida, num_pessoas, necessidades, bagagem, bagagem_quant, motorista, viatura, custo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *",
                    [id_motorista, id_viatura, id_pedido, id_cli, nome, origem, destino, data_ida, hora_ida, num_pessoas, necessidades, bagagem, bagagem_quant, motorista, viatura, preço]
                );
            }

            await pool.query(
                "INSERT INTO notificacoes (notificacao) VALUES ($1) RETURNING *",
                ["Viagem com origem em " + origem + " e destino em " + destino + " marcada!"],
            );

            const notificacoes = await pool.query("SELECT * FROM notificacoes WHERE notificacao = $1",  ["Viagem com origem em " + origem + " e destino em " + destino + " marcada!"]);

            await pool.query(
                "INSERT INTO notificacoes_geradas (id_cli, id_notificacao, data, notificacao) VALUES ($1,$2,$3,$4) RETURNING *",
                [id_cli, notificacoes.rows[0].id_notificacao, ano+"-"+mes+"-"+dia, "Viagem com origem em " + origem + " e destino em " + destino + " marcada!"],
            );

            await pool.query(
                "UPDATE pedidos_viagem SET estado_pedido = 'Marcado' WHERE id_pedido = $1", [id_pedido]
            );
            res.json(newViagem.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    deleteViagem : async function(req, res){
        try{
            const { id } = req.params;
            
            const viagem = await pool.query("SELECT * FROM viagens WHERE id_viagem = $1", [id]);

            await pool.query(
                "INSERT INTO notificacoes (notificacao) VALUES ($1) RETURNING *",
                ["Viagem com origem em " + viagem.rows[0].origem + " e destino em " + viagem.rows[0].destino + " foi cancelada."],
            );

            const notificacoes = await pool.query("SELECT * FROM notificacoes WHERE notificacao = $1",  ["Viagem com origem em " + viagem.rows[0].origem + " e destino em " + viagem.rows[0].destino + " foi cancelada."]);

            await pool.query(
                "INSERT INTO notificacoes_geradas (id_cli, id_notificacao, data, notificacao) VALUES ($1,$2,$3,$4) RETURNING *",
                [viagem.rows[0].id_cli, notificacoes.rows[0].id_notificacao, ano+"-"+mes+"-"+dia, "Viagem com origem em " + viagem.rows[0].origem + " e destino em " + viagem.rows[0].destino + " foi cancelada."],
            );

            await pool.query(
                "DELETE FROM viagens WHERE id_viagem = $1", [id]
            );

            res.json("Viagem eliminada!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
}