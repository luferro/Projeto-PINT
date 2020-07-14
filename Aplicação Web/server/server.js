const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//----------------------------------------------------------------------

app.use("/autenticar", require("./Routes/autenticacaoRoute"));
app.use("/clientes", require("./Routes/clientesRoute"));
app.use("/motoristas", require("./Routes/motoristasRoute"));
app.use("/viagens", require("./Routes/viagensRoute"));
app.use("/dividas", require("./Routes/dividasRoute"));
app.use("/pedidosviagem", require("./Routes/pedidosRoute"));
app.use("/viaturas", require("./Routes/viaturasRoute"));
app.use("/localidades", require("./Routes/localidadesRoute"));
app.use("/estatisticas", require("./Routes/estatisticasRoute"));
app.use("/send", require("./Routes/emailRoute"));
app.use("/mobile", require("./Routes/mobileRoute"));

//----------------------------------------------------------------------

app.listen(PORT, () => {
	console.log("Servidor iniciado na porta " + PORT);
});