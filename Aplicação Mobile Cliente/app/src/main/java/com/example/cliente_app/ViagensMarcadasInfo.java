package com.example.cliente_app;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
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

public class ViagensMarcadasInfo extends AppCompatActivity {

    Button button;
    String id;
    TextView numpassageiros, viatura, condutor, data, hora, custo, necessidades, bagagem;
    String DataM, HoraM, PrecoM, PassageirosM, CondutorM, ViaturaM, NecessidadesM, BagagemM;

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
        setContentView(R.layout.activity_viagensmarcadasinfo);

        Bundle bundle = getIntent().getExtras();
        id = bundle.getString("ID");


        numpassageiros = (TextView) findViewById(R.id.textView24);
        viatura = (TextView) findViewById(R.id.textView23);
        condutor = (TextView) findViewById(R.id.textView22);
        data = (TextView) findViewById(R.id.editText);
        hora = (TextView) findViewById(R.id.editText3);
        custo = (TextView) findViewById(R.id.editText4);
        necessidades = (TextView) findViewById(R.id.textView28);
        bagagem = (TextView) findViewById(R.id.textView27);


        get();
    }

    private void get() {
        String url = "https://api-pint.herokuapp.com/viagens/viagem/" + id;

        StringRequest postReq = new StringRequest(Request.Method.GET, url,

                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {

                        try {


                            JSONObject viagem = new JSONObject(response);


                            PassageirosM = viagem.get("num_pessoas").toString();
                            ViaturaM = viagem.get("viatura").toString();
                            CondutorM = viagem.get("motorista").toString();
                            DataM = viagem.get("data_ida").toString().substring(0, 10);
                            HoraM = viagem.get("hora_ida").toString().substring(0,4);
                            PrecoM = viagem.get("custo").toString().substring(1,5);
                            NecessidadesM = viagem.get("necessidades").toString();
                            BagagemM = viagem.get("bagagem_quant").toString();


                            numpassageiros.setText(PassageirosM);
                            viatura.setText(ViaturaM);
                            condutor.setText(CondutorM);
                            data.setText(DataM);
                            hora.setText(HoraM);
                            custo.setText(PrecoM);
                            necessidades.setText(NecessidadesM);
                            bagagem.setText(BagagemM);

                        } catch (JSONException e) {
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

        RequestQueue queue = Volley.newRequestQueue(getApplicationContext());
        queue.add(postReq);

        button = (Button) findViewById(R.id.buttonEliminar);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                post();
            }
        });
    }

    private void post() {

        try {

            String url = "https://api-pint.herokuapp.com/mobile/clientes/cancelar/";

            RequestQueue queue = Volley.newRequestQueue(this);

            JSONObject jsonBody = new JSONObject();
            jsonBody.put("id_viagem", id);
            final String mRequestBody = jsonBody.toString();


            StringRequest postRequest = new StringRequest(Request.Method.POST, url,
                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {

                            startActivity(new Intent(ViagensMarcadasInfo.this, ViagensMarcadas.class));

                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            // error
                            Log.d("Error.Response", error.toString());
                            //TOAST
                            Toast toast = Toast.makeText(getApplicationContext(), "occoreu um erro", Toast.LENGTH_LONG);
                            toast.show();
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
        }catch (JSONException e) {
            e.printStackTrace();
        }
    }
}