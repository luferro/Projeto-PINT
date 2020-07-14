package com.example.apptaxista;

import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class Passageiros extends AppCompatActivity {
    TextView torigem, tdestino, tnmr, tcliente;
    String   id, id_cliente, origem, destino, nmr, nome_cliente, tele;
    public ImageView sms;
    public ImageView call;
    public Button botao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Configuration config = getResources().getConfiguration();
        if (config.densityDpi >= 400)
        {
            setContentView(R.layout.passageiros);
            Log.d("tipotele", "telegrande");
        }
        else
        {
            setContentView(R.layout.passageirosv2);
            Log.d("tipotele", "telepequeno");
        }

        Bundle bundle = getIntent().getExtras();
        id =  bundle.getString("ID");
        id_cliente =  bundle.getString("IDCli");

        botao = (Button) findViewById(R.id.buttonv);
        botao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(Passageiros.this, Marcacoes.class);
               startActivity(i);
            }
        });

        torigem = (TextView) findViewById(R.id.torigem);
        tdestino = (TextView) findViewById(R.id.tdestino);
        tnmr = (TextView) findViewById(R.id.tnmr);
        tcliente = (TextView) findViewById(R.id.tcliente);


        getviagem();
        getcliente();

        sms = (ImageView) findViewById(R.id.message);
        sms.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Uri uri = Uri.parse("smsto:" +tele);
                Intent intent = new Intent(Intent.ACTION_SENDTO, uri);
                intent.putExtra("sms_body", "Motivo de Contacto.");
                startActivity(intent);
            }
        });
        call = (ImageView) findViewById(R.id.call);
        call.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_DIAL, Uri.fromParts("tel", tele, null));
                startActivity(intent);

            }
        });
    }
    private  void getviagem(){
        String url ="https://api-pint.herokuapp.com/viagens/viagem/"+id;

        StringRequest postReq = new StringRequest(Request.Method.GET, url,


                new Response.Listener<String>() {

                    @Override
                    public void onResponse(String response){
                        try {

                            JSONObject viagem = new JSONObject(response);
                            id = viagem.get("id_viagem").toString();
                            nome_cliente = viagem.get("nome").toString();
                            origem =viagem.get("origem").toString();
                            destino = viagem.get("destino").toString();
                            nmr = viagem.get("num_pessoas").toString();
                            id_cliente = viagem.get("id_cli").toString();

                            tcliente.setText(nome_cliente);
                            torigem.setText(origem);
                            tdestino.setText(destino);
                            tnmr.setText(nmr);
                        }catch (JSONException | NullPointerException e){e.printStackTrace();}


                    }


                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {error.printStackTrace(); }
                }){
        };
        RequestQueue queue = Volley.newRequestQueue(getApplicationContext());
        queue.add(postReq);


    }


    private  void getcliente(){
        String url ="https://api-pint.herokuapp.com/clientes/"+id_cliente;

        StringRequest postReq = new StringRequest(Request.Method.GET, url,


                new Response.Listener<String>() {

                    @Override
                    public void onResponse(String response){
                        try {

                            JSONObject cliente = new JSONObject(response);
                            tele = cliente.getString("contacto_cli");

                        }catch (JSONException | NullPointerException e){e.printStackTrace();}


                    }


                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {error.printStackTrace(); }
                }){
        };
        RequestQueue queue = Volley.newRequestQueue(getApplicationContext());
        queue.add(postReq);


    }

}
