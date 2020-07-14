package com.example.cliente_app;

import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.nfc.Tag;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Spinner;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SwitchCompat;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;

import okhttp3.RequestBody;

public class MarcarViagem extends AppCompatActivity {

    private static String TAG;

    Button btnDatePicker1, btnTimePicker1, btnDatePicker2, btnTimePicker2;
    Button Cancelar, Marcar;
    EditText txtDate, txtTime, txtBagagem, txtDateVolta, txtTimeVolta;
    int mYear, mMonth, mDay, mHour, mMinute;
    String email;
    TextView viagensexistentes, quantbagagem, quantacompanhantes;
    Switch necessidadesswitch, bagagemswitch, acompanhantesswitch, idaevoltaswitch;

    Spinner o_spinner;
    Spinner d_spinner;

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
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_marcarviagem);

       o_spinner=  (Spinner) findViewById(R.id.spinner_origem);
       d_spinner = (Spinner) findViewById(R.id.spinner_destino);

        ArrayAdapter<String> madapter = new ArrayAdapter<String>(MarcarViagem.this,
                android.R.layout.simple_list_item_1, getResources().getStringArray(R.array.localidades));
        madapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        o_spinner.setAdapter(madapter);
        d_spinner.setAdapter(madapter);

        btnDatePicker1 = (Button) findViewById(R.id.btn_date);
        btnTimePicker1 = (Button) findViewById(R.id.btn_time);
        btnDatePicker2 = (Button) findViewById(R.id.btn_datevolta);
        btnTimePicker2 = (Button) findViewById(R.id.btn_timevolta);
        Cancelar = (Button) findViewById(R.id.btn_cancel);
        Marcar = (Button) findViewById(R.id.btn_save);
        txtDate = (EditText) findViewById(R.id.et_date);
        txtDateVolta = (EditText) findViewById(R.id.et_datevolta);
        txtTime = (EditText) findViewById(R.id.et_time);
        txtTimeVolta = (EditText) findViewById(R.id.et_timevolta);
        txtBagagem = (EditText) findViewById(R.id.et_bag);
        quantbagagem = (TextView) findViewById(R.id.nbagagem);
        quantacompanhantes = (TextView) findViewById(R.id.nacompanhantes);
        bagagemswitch =  (Switch) findViewById(R.id.switch_bagagem);
        necessidadesswitch = (Switch) findViewById(R.id.switch_necessidades);
        acompanhantesswitch = (Switch) findViewById(R.id.switch_acompanhantes);
        idaevoltaswitch = (Switch) findViewById(R.id.switch_idavolta);

        quantacompanhantes.setVisibility(View.INVISIBLE);
        quantbagagem.setVisibility(View.INVISIBLE);
        txtBagagem.setVisibility(View.INVISIBLE);
        bagagemswitch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (bagagemswitch.isChecked()) {
                    quantbagagem.setVisibility(View.VISIBLE);
                    txtBagagem.setVisibility(View.VISIBLE);
                }
                else {
                    quantbagagem.setVisibility(View.INVISIBLE);
                    txtBagagem.setVisibility(View.INVISIBLE);
                }
            }
        });

        acompanhantesswitch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (acompanhantesswitch.isChecked()) {
                    quantacompanhantes.setVisibility(View.VISIBLE);
                }
                else {
                    quantacompanhantes.setVisibility(View.INVISIBLE);
                }
            }
        });

        Marcar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    t();
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
        });

        viagensexistentes = (TextView) findViewById(R.id.ver_viagens);

        txtDateVolta.setVisibility(View.INVISIBLE);
        txtTimeVolta.setVisibility(View.INVISIBLE);
        btnDatePicker2.setVisibility(View.INVISIBLE);
        btnTimePicker2.setVisibility(View.INVISIBLE);

        idaevoltaswitch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (idaevoltaswitch.isChecked()) {
                    btnDatePicker2.setVisibility(View.VISIBLE);
                    btnTimePicker2.setVisibility(View.VISIBLE);
                    txtDateVolta.setVisibility(View.VISIBLE);
                    txtTimeVolta.setVisibility(View.VISIBLE);
                }
                else {
                    btnDatePicker2.setVisibility(View.INVISIBLE);
                    btnTimePicker2.setVisibility(View.INVISIBLE);
                    txtDateVolta.setVisibility(View.INVISIBLE);
                    txtTimeVolta.setVisibility(View.INVISIBLE);
                }
            }
        });

        btnDatePicker1.setOnClickListener(this::onClick);
        btnTimePicker1.setOnClickListener(this::onClick);
        btnDatePicker2.setOnClickListener(this::onClick);
        btnTimePicker2.setOnClickListener(this::onClick);

        final SharedPreferences pref =getApplicationContext().getSharedPreferences("Pref", MODE_PRIVATE);
        final SharedPreferences.Editor editor = pref.edit();
        email = pref.getString("email", null);


       viagensexistentes.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MarcarViagem.this, ViagensExistentes.class));
            }
        });
    }

    public void onClick(View view) {

        if (view == btnDatePicker1) {
            final Calendar c = Calendar.getInstance();
            mYear = c.get(Calendar.YEAR);
            mMonth = c.get(Calendar.MONTH);
            mDay = c.get(Calendar.DAY_OF_MONTH);

            DatePickerDialog datePickerDialog = new DatePickerDialog(this, new DatePickerDialog.OnDateSetListener() {
                @Override
                public void onDateSet(DatePicker view, int year, int month, int day) {
                    txtDate.setText(year + "-" + (month + 1) + "-" + day);
                }
            }, mYear, mMonth, mDay);
            datePickerDialog.show();
        }

        if (view == btnDatePicker2) {
            final Calendar c = Calendar.getInstance();
            mYear = c.get(Calendar.YEAR);
            mMonth = c.get(Calendar.MONTH);
            mDay = c.get(Calendar.DAY_OF_MONTH);

            DatePickerDialog datePickerDialog = new DatePickerDialog(this, new DatePickerDialog.OnDateSetListener() {
                @Override
                public void onDateSet(DatePicker view, int year, int month, int day) {
                    txtDateVolta.setText(year + "-" + (month + 1) + "-" + day);
                }
            }, mYear, mMonth, mDay);
            datePickerDialog.show();
        }

        if (view == btnTimePicker1) {
            final Calendar c = Calendar.getInstance();
            mHour = c.get(Calendar.HOUR_OF_DAY);
            mMinute = c.get(Calendar.MINUTE);

            TimePickerDialog timePickerDialog = new TimePickerDialog(this, new TimePickerDialog.OnTimeSetListener() {
                @Override
                public void onTimeSet(TimePicker view, int hour, int minute) {
                    txtTime.setText(hour + ":" + minute);
                }
            }, mHour, mMinute, true);
            timePickerDialog.show();
        }

        if (view == btnTimePicker2) {
            final Calendar c = Calendar.getInstance();
            mHour = c.get(Calendar.HOUR_OF_DAY);
            mMinute = c.get(Calendar.MINUTE);

            TimePickerDialog timePickerDialog = new TimePickerDialog(this, new TimePickerDialog.OnTimeSetListener() {
                @Override
                public void onTimeSet(TimePicker view, int hour, int minute) {
                    txtTimeVolta.setText(hour + ":" + minute);
                }
            }, mHour, mMinute, true);
            timePickerDialog.show();
        }
    }

    private void post() {

        try {

            String url = "https://api-pint.herokuapp.com/mobile/clientes/pedido";

            RequestQueue queue = Volley.newRequestQueue(this);

            JSONObject jsonBody = new JSONObject();
            jsonBody.put("email", email);
            jsonBody.put("origem", o_spinner.getSelectedItem().toString().toUpperCase());
            jsonBody.put("destino", d_spinner.getSelectedItem().toString().toUpperCase());
            jsonBody.put("data_ida", txtDate.getText().toString());
            jsonBody.put("hora_ida", txtTime.getText().toString());
            if (idaevoltaswitch.isChecked()) {
                jsonBody.put("data_volta", txtDateVolta.getText().toString());
                jsonBody.put("hora_volta",txtTimeVolta.getText().toString());
            } else {
                jsonBody.put("data_volta", "");
                jsonBody.put("hora_volta", "");
            }
            jsonBody.put("bagagem", txtBagagem.getText().toString());
            jsonBody.put("bagagem_quant", quantbagagem.getText().toString());
            if (acompanhantesswitch.isChecked())
                jsonBody.put("acompanhantes", quantacompanhantes.getText().toString());
            else jsonBody.put("acompanhantes", "0");
            if (necessidadesswitch.isChecked())
                jsonBody.put("necessidades", "Tem");
            else jsonBody.put("necessidades", "Não tem");

            final String mRequestBody = jsonBody.toString();
            //GET NÃO USA ESTAS 4 LINHAS


            StringRequest postRequest = new StringRequest(Request.Method.POST, url,
                    new Response.Listener<String>() {
                        @Override
                        public void onResponse(String response) {
                            startActivity(new Intent(MarcarViagem.this, ViagemMarcadaSucesso.class));
                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Toast toast = Toast.makeText(getApplicationContext(), "Ocorreu um erro ou tem dívidas pendentes." +
                                    "Caso tenha dívidas pendentes, regularize a sua situação presencialmente.", Toast.LENGTH_LONG);
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
        }catch (JSONException e) {e.printStackTrace();}
    }


    public void t() throws ParseException {
        boolean erro = false;

        if(o_spinner.getSelectedItem().toString().length() == 0) {
            erro = true;
        }

        if(d_spinner.getSelectedItem().toString().length() == 0) {
            erro = true;
        }

        if (o_spinner.getSelectedItem().toString() == d_spinner.getSelectedItem().toString()) {
            erro = true;
        }

        if (txtDate.getText().toString().length() == 0) {
            txtDate.setError("Insira uma data!");
            erro = true;
        }

        if (txtTime.getText().toString().length() == 0) {
            txtTime.setError("Insira uma hora!");
            erro = true;
        }

        if (idaevoltaswitch.isChecked()) {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date dataida = format.parse(txtDate.getText().toString());
            Date datavolta = format.parse(txtDateVolta.getText().toString());

            if (datavolta.compareTo(dataida) <= 0 ) {
                txtDateVolta.setError("A data volta é inferior à data ida.");
                erro = true;
            }
        }

        if (!erro) {
            MessageDigest digest = null;
            try {
                digest = MessageDigest.getInstance("sha256");
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }

            post();
        }
    }
}


