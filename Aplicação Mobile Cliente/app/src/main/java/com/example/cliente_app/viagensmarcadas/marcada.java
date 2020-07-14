package com.example.cliente_app.viagensmarcadas;

public class marcada {

    public String id;
    public String Origem;
    public String Destino;
    public String Data;
    public String Hora;
    public String NPessoas;
    public String Custo;

    public marcada(String id, String origem, String destino, String data, String hora, String NPessoas, String custo) {
        this.id = id;
        Origem = origem;
        Destino = destino;
        Data = data;
        Hora = hora;
        this.NPessoas = NPessoas;
        Custo = custo;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getOrigem() {
        return Origem;
    }
    public void setOrigem(String origem) {
        Origem = origem;
    }
    public String getDestino() {
        return Destino;
    }
    public void setDestino(String destino) {
        Destino = destino;
    }
    public String getData() {
        return Data;
    }
    public void setData(String data) {
        Data = data;
    }

    public String getHora() {
        return Hora;
    }

    public void setHora(String hora) {
        Hora = hora;
    }

    public String getNPessoas() {
        return NPessoas;
    }

    public void setNPessoas(String NPessoas) {
        this.NPessoas = NPessoas;
    }

    public String getCusto() {
        return Custo;
    }

    public void setCusto(String custo) {
        Custo = custo;
    }
}



