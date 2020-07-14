package com.example.apptaxista;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.apptaxista.Lista.RegAdapter;
import com.example.apptaxista.Lista.Registo;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;


public class Marcacoes extends AppCompatActivity {

    private RecyclerView mrecyclerView ;
    private RegAdapter regAdapter;
    private ImageView imga;
    String email;
    ImageView imgView;

    protected ArrayList<Registo> nregisto;
    String id_cliente, id, dia, hora, inicio, chegada, distancia, x, y , z;

    public Marcacoes() {
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Configuration config = getResources().getConfiguration();
        if (config.densityDpi >= 400)
        {
            setContentView(R.layout.activity_marcacoes);
            Log.d("tipotele", "telegrande");
        }
        else
        {
            setContentView(R.layout.marcacoesv2);
            Log.d("tipotele", "telepequeno");
        }


        imgView = (ImageView) findViewById(R.id.passe2);
        imgView.setOnClickListener(new  View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Marcacoes.this, Atualizar.class);
                startActivity(intent);


                Toast.makeText(Marcacoes.this, "Redirecionado", Toast.LENGTH_LONG).show();
            }
        });

        mrecyclerView = findViewById(R.id.recicler);
        mrecyclerView.setHasFixedSize(true);
        mrecyclerView.setLayoutManager(new LinearLayoutManager(this));
        final SharedPreferences pref = getApplicationContext().getSharedPreferences("Pref", 0);
        final SharedPreferences.Editor editor = pref.edit();
        email = pref.getString("email", null);

        imga = findViewById(R.id.semvia);
        post();


    }
    private  void post(){
        String url ="https://api-pint.herokuapp.com/mobile/viagens/porfazer/"+email;

        StringRequest postReq = new StringRequest(Request.Method.GET, url,


                new Response.Listener<String>() {

                    @Override
                    public void onResponse(String response){
                        try {
                            Log.d("email", email );
                            nregisto= new ArrayList<Registo>();
                            JSONArray jsonArray = new JSONArray(response);
                            for ( int i=0 ; i< jsonArray.length() ; i++){
                                JSONObject viagem = jsonArray.getJSONObject(i);
                                id_cliente = viagem.get("id_cli").toString();
                                id = viagem.get("id_viagem").toString();
                                hora = viagem.get("hora_ida").toString();
                                dia = viagem.get("data_ida").toString().substring(0,10);
                                inicio = viagem.get("origem").toString();
                                chegada = viagem.get("destino").toString();
                                x = viagem.get("num_pessoas").toString();
                                y = viagem.get("necessidades").toString();
                                z = viagem.get("bagagem_quant").toString();
                                nregisto.add(new Registo(id_cliente, id, dia, hora, inicio, chegada, distancia, x, y , z));
                            }
                            regAdapter = new RegAdapter(Marcacoes.this , nregisto);
                            mrecyclerView.setAdapter(regAdapter);
                            if (nregisto.isEmpty()){
                                mrecyclerView.setVisibility(View.INVISIBLE);
                                imga.setVisibility(View.VISIBLE);
                            }else {
                                imga.setVisibility(View.GONE);


                            }

                        }catch (JSONException| NullPointerException e){e.printStackTrace();}


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