package com.example.apptaxista.Lista;

public class Registo {
    private String id_cliente, id, dia, hora, inicio, chegada, distancia, x, y, z;

    public Registo(String id_cliente, String id, String dia, String hora, String inicio, String chegada, String distancia, String x, String y, String z) {
        this.id_cliente = id_cliente;
        this.id = id;
        this.dia = dia;
        this.hora = hora;
        this.inicio = inicio;
        this.chegada = chegada;
        this.distancia = distancia;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public String getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(String id_cliente) {
        this.id_cliente = id_cliente;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public String getInicio() {
        return inicio;
    }

    public void setInicio(String inicio) {
        this.inicio = inicio;
    }

    public String getChegada() {
        return chegada;
    }

    public void setChegada(String chegada) {
        this.chegada = chegada;
    }

    public String getDistancia() {
        return distancia;
    }

    public void setDistancia(String distancia) {
        this.distancia = distancia;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getZ() {
        return z;
    }

    public void setZ(String z) {
        this.z = z;
    }
}
