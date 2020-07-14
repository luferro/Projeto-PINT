package com.example.apptaxista;

import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

public class Pagamentos extends AppCompatActivity {
    TextView pagar, textorigem, textdestino, textnmr, textcliente;
    Button botao;
    Button button;
    Button pay;
    Button npay;
    String   id, id_cliente, origem, destino, preco, nmr, nome_cliente;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Configuration config = getResources().getConfiguration();
        if (config.densityDpi >= 400)
        {
            setContentView(R.layout.pagamentos);
            Log.d("tipotele", "telegrande");
        }
        else
        {
            setContentView(R.layout.pagamentosv2);
            Log.d("tipotele", "telepequeno");
        }

        Bundle bundle = getIntent().getExtras();
        id =  bundle.getString("ID");
        Log.d("idviagem", id);

        botao = (Button) findViewById(R.id.buttonr);
        botao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(Pagamentos.this, FaltaComparencia.class);
                startActivity(i);
            }
        });
        button = (Button) findViewById(R.id.buttonc);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(Pagamentos.this, Marcacoes.class);
                startActivity(i);
            }
        });
        pay = (Button) findViewById(R.id.pay);
        pay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(Pagamentos.this, ConfirmarPag.class);
                startActivity(i);
            }
        });
        npay = (Button) findViewById(R.id.npay);
        npay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                post();
                Toast.makeText(Pagamentos.this, "Dívida Acumulada.", Toast.LENGTH_LONG).show();
            }
        });

        pagar = (TextView) findViewById(R.id.pagar);
        textorigem = (TextView) findViewById(R.id.textorigem);
        textdestino = (TextView) findViewById(R.id.textdestino);
        textnmr = (TextView) findViewById(R.id.textnmr);
        textcliente = (TextView) findViewById(R.id.textcliente);

        get();
    }

    private  void get(){
        String url ="https://api-pint.herokuapp.com/viagens/viagem/"+id;

        StringRequest postReq = new StringRequest(Request.Method.GET, url,


                new Response.Listener<String>() {

                    @Override
                    public void onResponse(String response){
                        try {

                            JSONObject viagem = new JSONObject(response);
                            id = viagem.get("id_viagem").toString();
                            nome_cliente = viagem.get("nome").toString();
                            preco = viagem.get("custo").toString();
                            origem =viagem.get("origem").toString();
                            destino = viagem.get("destino").toString();
                            nmr = viagem.get("num_pessoas").toString();
                            id_cliente = viagem.get("id_cli").toString();

                            textcliente.setText(nome_cliente);
                            textorigem.setText(origem);
                            pagar.setText(preco);
                            textdestino.setText(destino);
                            textnmr.setText(nmr);
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


    private void post() {
        try {
            String url = "https://api-pint.herokuapp.com/mobile/clientes/divida";
            RequestQueue queue = Volley.newRequestQueue(this);

            JSONObject jsonBody = new JSONObject();
            jsonBody.put("id_cli", id_cliente);
            jsonBody.put("montante", preco);
            final String mRequestBody = jsonBody.toString();
            //GET NÃO USA ESTAS 4 LINHAS


            StringRequest postRequest = new StringRequest(Request.Method.POST, url,
                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            Log.d("resposta", response);

                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            // error
                            Log.d("Error.Response", error.toString());

                        }
                    }
            ) {

                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    HashMap<String, String> params = new HashMap<String, String>();
                    params.put("Content-Type", "application/json");

                    return params;
                }

                @Override
                public byte[] getBody() throws AuthFailureError {
                    try {
                        return mRequestBody == null ? null : mRequestBody.getBytes("utf-8");
                    } catch (UnsupportedEncodingException uee) {
                        VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s", mRequestBody, "utf-8");
                        return null;
                    }
                }

            };
            queue.add(postRequest);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
