package com.example.cliente_app;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
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

import cz.msebera.android.httpclient.HttpStatus;

public class AtualizarPalavraPasse extends AppCompatActivity {

    TextView password;
    Button atualizar;
    String email;
    ImageButton eye;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_atualizarpalavrapasse);

        password = (TextView) findViewById(R.id.palavrapasse);
        atualizar = (Button) findViewById(R.id.btn_atualizar);

        final SharedPreferences pref =getApplicationContext().getSharedPreferences("Pref", MODE_PRIVATE);
        final SharedPreferences.Editor editor = pref.edit();
        email = pref.getString("email", null);

        atualizar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                put();
            }
        });

        final boolean[] isOpenEye = {false};
        eye = (ImageButton) findViewById(R.id.btn_eye);
        eye.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!isOpenEye[0]) {
                    eye.setSelected(true);
                    isOpenEye[0] = true;
                    password.setTransformationMethod(HideReturnsTransformationMethod.getInstance());
                } else {
                    eye.setSelected(false);
                    isOpenEye[0] = false;
                    password.setTransformationMethod(PasswordTransformationMethod.getInstance());
                }
            }
        });
    }

    private void put() {

        try {

            String url = "https://api-pint.herokuapp.com/mobile/clientes/password/" + email;

            RequestQueue queue = Volley.newRequestQueue(this);

            JSONObject jsonBody = new JSONObject();
            jsonBody.put("password", password.getText().toString());
            final String mRequestBody = jsonBody.toString();

            StringRequest postRequest = new StringRequest(Request.Method.PUT, url,
                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            startActivity(new Intent(AtualizarPalavraPasse.this, Perfil.class));
                            Toast sucesso = Toast.makeText(getApplicationContext(), response.substring(1,response.length()-1), Toast.LENGTH_SHORT);
                            sucesso.show();
                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Log.d("Erro", error.toString());
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
