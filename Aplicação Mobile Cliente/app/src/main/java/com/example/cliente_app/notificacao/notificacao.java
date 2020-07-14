package com.example.cliente_app.notificacao;

public class notificacao {

    public String Texto;
    public int id;
    public String Datenot;
    public int idnotificacao;

    public notificacao(String texto, int id, String datenot, int idnotificacao) {
        Texto = texto;
        this.id = id;
        Datenot = datenot;
        this.idnotificacao = idnotificacao;
    }

    public String getTexto() {
        return Texto;
    }

    public void setTexto(String texto) {
        Texto = texto;
    }

    public int getId() { return id; }

    public void setId(int id) { this.id = id; }

    public String getDatenot() { return Datenot; }

    public void setDatenot(String datenot) { Datenot = datenot; }

    public int getIdnotificacao() { return idnotificacao; }

    public void setIdnotificacao(int idnotificacao) { this.idnotificacao = idnotificacao; }
}
