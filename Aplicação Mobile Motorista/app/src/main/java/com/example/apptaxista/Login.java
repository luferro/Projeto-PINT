package com.example.apptaxista;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.os.Bundle;
import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;
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


public class Login extends AppCompatActivity {
    private Button button;
    TextView textView;
    EditText etEmail;
    EditText etPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Configuration config = getResources().getConfiguration();
        if (config.densityDpi >= 400)
        {
            setContentView(R.layout.login);
            Log.d("tipotele", "telegrande");
        }
        else
        {
            setContentView(R.layout.loginv2);
            Log.d("tipotele", "telepequeno");
        }
        button = (Button) findViewById(R.id.button);
        etEmail = (EditText) findViewById(R.id.email);
        etPassword = (EditText) findViewById(R.id.pass);
        etPassword.setTransformationMethod(PasswordTransformationMethod.getInstance());
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                post();
            }
        });


        textView = (TextView) findViewById(R.id.recover);
        textView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Login.this, Recovery.class);
                startActivity(intent);


                Toast.makeText(Login.this, "Redirecionado", Toast.LENGTH_LONG).show();
            }
        });

        final ImageButton eye;

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
            String url = "https://api-pint.herokuapp.com/mobile/motoristas/login";
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
                            SharedPreferences pref = getApplicationContext().getSharedPreferences("Pref", MODE_PRIVATE);
                            SharedPreferences.Editor editor = pref.edit();

                            Log.d("Resposta esperada", response);

                            if (response.equals("true")) {
                                Toast toast = Toast.makeText(getApplicationContext(), "Login efetuado com sucesso!", Toast.LENGTH_SHORT);
                                toast.show();
                                editor.putString("email", etEmail.getText().toString());
                                editor.apply();
                                //NEW INTENT
                                Intent i = new Intent(getApplicationContext(), Marcacoes.class);
                                startActivity(i);
                            } else {
                                Toast toast1 = Toast.makeText(getApplicationContext(), response.substring(1, response.length() - 1), Toast.LENGTH_LONG);
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
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
