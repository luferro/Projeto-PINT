const pool = require("../db");

var date = new Date();
var dia = date.getDate();
var mes = date.getMonth() + 1;
var ano = date.getFullYear();

module.exports = {
    getPedido : async function(req, res){
        try{
            const { id } = req.params;
            const PedidoViagem = await pool.query(
                "SELECT * FROM pedidos_viagem where id_pedido = $1", [id]
            );
            res.json(PedidoViagem.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getPedidos : async function(req, res){
        try{
            const TodosPedidosViagens = await pool.query(
                "SELECT * FROM pedidos_viagem"
            );
            res.json(TodosPedidosViagens.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    getPedidosHoje : async function(req, res){
        try{
            let dia_anterior;
            if(dia-1 === 0) dia_anterior = 31;
            else dia_anterior = dia - 1;

            console.log(dia_anterior)

            const TodosPedidosViagens = await pool.query(
                "SELECT * FROM pedidos_viagem where hora_pedido <= timestamp '"+ano+"-"+mes+"-"+dia+" 17:00:00' and hora_pedido > timestamp '"+ano+"-"+mes+"-"+dia_anterior+" 17:00:00'"
            );
            res.json(TodosPedidosViagens.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    postPedido: async function(req, res){
        try {
            const { identificador, nome, origem, destino, data_ida, hora_ida, data_volta, hora_volta, bagagem, bagagem_quant, acompanhantes, necessidades, estado_pedido } = req.body;

            const clientetemdivida = await pool.query("SELECT * FROM dividas WHERE id_cli = $1", [identificador]);

            console.log(clientetemdivida)

            if(clientetemdivida.rows.length > 0)
                return res.status(401).json("Cliente tem dividas pendentes.");

            if(data_volta)
                var newViagem = await pool.query(
                    "INSERT INTO pedidos_viagem (id_cli, nome, origem, destino, data_ida, hora_ida, data_volta, hora_volta, bagagem, bagagem_quant, acompanhantes, necessidades, estado_pedido) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
                    [identificador , nome, origem, destino, data_ida, hora_ida, data_volta, hora_volta, bagagem, bagagem_quant, acompanhantes, necessidades, estado_pedido],
                );
            else
                var newViagem = await pool.query(
                    "INSERT INTO pedidos_viagem (id_cli, nome, origem, destino, data_ida, hora_ida, bagagem, bagagem_quant, acompanhantes, necessidades, estado_pedido) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
                    [identificador , nome, origem, destino, data_ida, hora_ida, bagagem, bagagem_quant, acompanhantes, necessidades, estado_pedido],
                );

            await pool.query(
                "INSERT INTO notificacoes (notificacao) VALUES ($1) RETURNING *",
                ["Pedido de viagem com origem em " + origem + " e destino em " + destino + " efetuado com sucesso."],
            );

            const notificacoes = await pool.query("SELECT * FROM notificacoes WHERE notificacao = $1",  ["Pedido de viagem com origem em " + origem + " e destino em " + destino + " efetuado com sucesso."]);

            await pool.query(
                "INSERT INTO notificacoes_geradas (id_cli, id_notificacao, data, notificacao) VALUES ($1,$2,$3,$4) RETURNING *",
                [identificador, notificacoes.rows[0].id_notificacao, ano+"-"+mes+"-"+dia, "Pedido de viagem com origem em " + origem + " e destino em " + destino + " efetuado com sucesso."],
            );
        
            res.json(newViagem.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    putPedido : async function(req, res){
        try{
            const { id } = req.params;

            const pedido = await pool.query("SELECT * FROM pedidos_viagem WHERE id_pedido = $1", [id]);

            await pool.query(
                "UPDATE pedidos_viagem SET estado_pedido = 'Cancelar', hora_pedido = now() WHERE id_pedido = $1", [id]
            );

            await pool.query(
                "INSERT INTO notificacoes (notificacao) VALUES ($1) RETURNING *",
                ["Pedido de cancelamento da viagem com origem em " + pedido.rows[0].origem + " e destino em " + pedido.rows[0].destino + " efetuado com sucesso."],
            );

            const notificacoes = await pool.query("SELECT * FROM notificacoes WHERE notificacao = $1",  ["Pedido de cancelamento da viagem com origem em " + pedido.rows[0].origem + " e destino em " + pedido.rows[0].destino + " efetuado com sucesso."]);

            await pool.query(
                "INSERT INTO notificacoes_geradas (id_cli, id_notificacao, data, notificacao) VALUES ($1,$2,$3,$4) RETURNING *",
                [pedido.rows[0].id_cli, notificacoes.rows[0].id_notificacao, ano+"-"+mes+"-"+dia, "Pedido de cancelamento da viagem com origem em " + pedido.rows[0].origem + " e destino em " + pedido.rows[0].destino + " efetuado com sucesso."],
            );

            res.json("Pedido Viagem atualizado!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    },

    deletePedido : async function(req, res){
        try{
            const { id } = req.params;

            const viagem = await pool.query("SELECT * FROM pedidos_viagem WHERE id_pedido = $1", [id]);

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
                "DELETE FROM viagens WHERE id_pedido = $1", [id] 
            );
            await pool.query(
                "DELETE FROM pedidos_viagem WHERE id_pedido = $1", [id] 
            );

            res.json("Pedido Viagem eliminado!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
}