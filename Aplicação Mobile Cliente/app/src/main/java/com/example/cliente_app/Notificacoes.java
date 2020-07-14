
package com.example.cliente_app;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.SearchView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.cliente_app.notificacao.notificaadapter;
import com.example.cliente_app.notificacao.notificacao;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

public class Notificacoes extends AppCompatActivity {

    private RecyclerView mrecyclerView;
    private notificaadapter madapternot;

    protected ArrayList<notificacao> mnotificacao;
    String texto, datenot;
    int id, id_not=0;
    String email;
    TextView vazio;
    ImageButton btn_refresh;

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


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notificacoes);

        mrecyclerView = (RecyclerView) findViewById(R.id.notirecycl);
        mrecyclerView.setHasFixedSize(true);
        mrecyclerView.setLayoutManager(new LinearLayoutManager(this));

        final SharedPreferences pref = getApplicationContext().getSharedPreferences("Pref", 0);
        final SharedPreferences.Editor editor = pref.edit();
        email = pref.getString("email", null);

        vazio = (TextView) findViewById(R.id.txtvazio);
        btn_refresh = (ImageButton) findViewById(R.id.refresh);
        btn_refresh.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent ref = new Intent(Notificacoes.this, Notificacoes.class);
                startActivity(ref);
                finish();
            }
        });

        mnotificacao = new ArrayList<>();

        get();
        Log.d("id_notificacao", String.valueOf(id_not));
        mnotificacao.clear();

    }

    private void get() {

        String url = "https://api-pint.herokuapp.com/mobile/clientes/notificacoes/" + email;

        RequestQueue queue = Volley.newRequestQueue(this);

        StringRequest postRequest = new StringRequest(Request.Method.GET, url,

                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            mnotificacao = new ArrayList<notificacao>();
                            JSONArray jsonArray = new JSONArray(response);

                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject cliente = jsonArray.getJSONObject(i);

                                id = Integer.valueOf(cliente.getString("id_cli"));
                                texto = cliente.getString("notificacao");
                                datenot = cliente.getString("data").substring(0,10);
                                id_not = Integer.valueOf(cliente.getString("id_notificacao"));

                                mnotificacao.add(new notificacao(texto, id, datenot, id_not));
                            }

                            madapternot = new notificaadapter(Notificacoes.this, mnotificacao);
                            mrecyclerView.setAdapter(madapternot);
                            if (mnotificacao.isEmpty()) {
                                mrecyclerView.setVisibility(View.INVISIBLE);
                            }
                            vazio.setVisibility(View.GONE);

                        }catch(JSONException | NullPointerException e){
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        error.printStackTrace();
                    }
                })

                    {

                        @Override
                        public Map<String, String> getHeaders () throws AuthFailureError {
                            HashMap<String, String> params = new HashMap<String, String>();
                            params.put("email", email);

                            return params;
                        }
                };

        queue.add(postRequest);
    }
}
