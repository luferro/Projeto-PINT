package com.example.cliente_app;

import android.app.AlertDialog;
import android.app.DownloadManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

import okhttp3.*;


public class Login extends AppCompatActivity {

    EditText etEmail, etPassword;
    TextView tvRecover;
    Button btnLogin;
    String resposta;
    ImageButton eye;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Log.d("on create", "ON Create");

        etEmail = (EditText) findViewById(R.id.et_email);
        etPassword = (EditText) findViewById(R.id.et_pass);
        btnLogin = (Button) findViewById(R.id.login_button);
        tvRecover = (TextView) findViewById(R.id.tv_recover);
        etPassword.setTransformationMethod(PasswordTransformationMethod.getInstance());

        tvRecover.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Login.this, Recovery.class);
                startActivity(intent);
            }
        });

        btnLogin.setOnClickListener((v) -> {
            MessageDigest digest = null;
            try {
                digest = MessageDigest.getInstance("sha256");
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }

            post();

        });

        final boolean[] isOpenEye = {false};
        eye = (ImageButton) findViewById(R.id.btn_eye);
        eye.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!isOpenEye[0]) {
                    eye.setSelected(true);
                    isOpenEye[0] = true;
                    etPassword.setTransformationMethod(HideReturnsTransformationMethod.getInstance());
                } else {
                    eye.setSelected(false);
                    isOpenEye[0] = false;
                    etPassword.setTransformationMethod(PasswordTransformationMethod.getInstance());
                }
            }
        });
    }


    private void post() {

        try {

            String url = "https://api-pint.herokuapp.com/mobile/clientes/login";

            RequestQueue queue = Volley.newRequestQueue(this);

            JSONObject jsonBody = new JSONObject();
            jsonBody.put("email", etEmail.getText().toString());
            jsonBody.put("password", etPassword.getText().toString());
            final String mRequestBody = jsonBody.toString();
            //GET NÃO USA ESTAS 4 LINHAS


            StringRequest postRequest = new StringRequest(Request.Method.POST, url,
                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            //VARIAVEL GLOBAL
                            SharedPreferences pref =getApplicationContext().getSharedPreferences("Pref", MODE_PRIVATE);
                            SharedPreferences.Editor editor = pref.edit();

                            Log.d("Resposta esperada", response);

                            if (response.equals("true")){
                                Toast toast = Toast.makeText(getApplicationContext(), "Login efetuado com sucesso!", Toast.LENGTH_SHORT);
                                toast.show();
                                editor.putString("email", etEmail.getText().toString());
                                editor.apply();
                                //NEW INTENT
                                Intent i = new Intent(getApplicationContext(), MarcarViagem.class);
                                startActivity(i);
                            } else {
                                Toast toast1 = Toast.makeText(getApplicationContext(), response.substring(1,response.length()-1), Toast.LENGTH_LONG);
                                toast1.show();
                            }
                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            // error
                            Log.d("Error.Response", error.toString());
                            //TOAST
                            Toast toast2 = Toast.makeText(getApplicationContext(), "Palavra-passe inválida!", Toast.LENGTH_LONG);
                            toast2.show();
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




