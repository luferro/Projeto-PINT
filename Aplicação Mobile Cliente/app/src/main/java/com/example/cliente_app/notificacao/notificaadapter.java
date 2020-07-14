package com.example.cliente_app.notificacao;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.icu.text.IDNA;
import android.provider.MediaStore;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.cliente_app.Notificacoes;
import com.example.cliente_app.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class notificaadapter extends RecyclerView.Adapter<notificaadapter.viewholder> {
    private Context ma;
    private ArrayList<notificacao> Noti;
    public CardView cardView;

    public notificaadapter(Context context, ArrayList<notificacao> noti) {
        ma = context;
        Noti = noti;
    }

    @NonNull
    @Override
    public viewholder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(ma).inflate(R.layout.itemnotificacao, viewGroup, false);
        return new viewholder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull notificaadapter.viewholder viewholder, int i) {
        final notificacao p = Noti.get(i);
        String Data = p.getDatenot();
        String Texto = p.getTexto();
        viewholder.Date.setText(Data);
        viewholder.Texto.setText(Texto);

        viewholder.btn_delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                delete(p.getIdnotificacao());
            }
        });

    }

    @Override
    public int getItemCount() {
        return  Noti.size();
    }

    public class viewholder extends RecyclerView.ViewHolder {
        public TextView Date;
        public TextView Texto;
        public ImageButton btn_delete;

        public viewholder(@NonNull View itemView) {
            super(itemView);
            Date = itemView.findViewById(R.id.notdate);
            Texto = itemView.findViewById(R.id.testnot);
            btn_delete = itemView.findViewById(R.id.btn_deletenot);
        }
    }

    private void delete(int id) {

        String url = "https://api-pint.herokuapp.com/mobile/clientes/notificacoes/" + id;

        RequestQueue queue = Volley.newRequestQueue(ma.getApplicationContext());

        StringRequest postRequest = new StringRequest(Request.Method.DELETE, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Toast toast = Toast.makeText(ma.getApplicationContext(), "Notificação Apagada com Sucesso!", Toast.LENGTH_SHORT);
                        toast.show();
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // error
                        Log.d("Error.Response", error.toString());
                        //TOAST
                        Toast toast2 = Toast.makeText(ma.getApplicationContext(), "Erro! Tente novamente mais tarde!", Toast.LENGTH_LONG);
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
        };
        queue.add(postRequest);
    }
}
