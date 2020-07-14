package com.example.cliente_app;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.cliente_app.viagensmarcadas.marcada;
import com.example.cliente_app.viagensmarcadas.marcadaadapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Perfil extends AppCompatActivity {

    ImageButton imageButton;
    Button atualizar;
    String email;
    TextView nome, idade, mail, telemovel, localidade, ncc;
    String nomeM, idadeM, mailM, telemovelM, localidadeM, nccM;

    //--------------MENU-------------//

    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_main, menu);
        return true;
    }

    public boolean onOptionsItemSelected(MenuItem item) {
        switch(item.getItemId()) {
            case R.id.nav_marcarviagem:
                startActivity(new Intent(this, MarcarViagem.class));
                return true;
            case R.id.nav_marcadas:
                startActivity(new Intent(this, ViagensMarcadas.class));
                return true;
            case R.id.nav_realizadas:
                startActivity(new Intent(this, ViagensRealizadas.class));
                return true;
            case R.id.nav_notificacoes:
                startActivity(new Intent(this, Notificacoes.class));
                return true;
            case R.id.nav_perfil:
                startActivity(new Intent(this, Perfil.class));
                return true;
            case R.id.nav_termos:
                startActivity(new Intent(this, Termos.class));
                return true;
            case R.id.nav_logout:
                startActivity(new Intent(this, Login.class));
                return true;
            default:
                return super.onOptionsItemSelected(item);

        }
    }

    //--------------!MENU-------------//


    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_perfil);


        final SharedPreferences pref = getApplicationContext().getSharedPreferences("Pref", 0);
        final SharedPreferences.Editor editor = pref.edit();
        email = pref.getString("email", null);


        nome = (TextView) findViewById(R.id.textView);
        idade = (TextView) findViewById(R.id.textView2);
        mail = (TextView) findViewById(R.id.textView3);
        telemovel = (TextView) findViewById(R.id.textView10);
        localidade = (TextView) findViewById(R.id.textView25);
        ncc = (TextView) findViewById(R.id.textView26);
        imageButton =(ImageButton) findViewById(R.id.imageButton2);
        atualizar = (Button) findViewById(R.id.btn_atualizarpass);

        atualizar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(Perfil.this, AtualizarPalavraPasse.class));
            }
        });

        imageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Perfil.this, MarcarViagem.class);
                startActivity(intent);
            }
        });

        get();
    }

    private void get() {

        String url = "https://api-pint.herokuapp.com/mobile/clientes/" + email;

        RequestQueue queue = Volley.newRequestQueue(this);

        StringRequest postRequest = new StringRequest(Request.Method.GET, url,

                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject perfil =new JSONObject(response);;

                            nomeM = perfil.getString("pnome_cli") + " " + perfil.getString("unome_cli");
                            idadeM = String.valueOf((2020 - Integer.parseInt(perfil.getString("datanascimento_cli").substring(0,4))));
                            localidadeM = perfil.getString("localidade_cli");
                            mailM = perfil.getString("email_cli");
                            telemovelM = perfil.getString("contacto_cli");
                            nccM = perfil.getString("cc_cli");

                            nome.setText(nomeM);
                            idade.setText(idadeM);
                            mail.setText(mailM);
                            localidade.setText(localidadeM);
                            telemovel.setText(telemovelM);
                            ncc.setText(nccM);


                        } catch (JSONException | NullPointerException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        error.printStackTrace();
                    }
                });

        queue.add(postRequest);
    }
}


