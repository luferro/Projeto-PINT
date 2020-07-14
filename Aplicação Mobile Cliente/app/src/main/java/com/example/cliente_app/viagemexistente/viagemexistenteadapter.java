package com.example.cliente_app.viagemexistente;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.example.cliente_app.R;

import java.util.ArrayList;

public class viagemexistenteadapter extends RecyclerView.Adapter<viagemexistenteadapter.viewholder> {
    private Context ma;
    private ArrayList<viagemexistente> ViagemE;
    public CardView cardView;

    public viagemexistenteadapter(Context context, ArrayList<viagemexistente> viageme) {
        ma = context;
        ViagemE = viageme;
    }

    @NonNull
    @Override
    public viewholder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(ma).inflate(R.layout.itemviagemexistente, viewGroup, false);
        return new viewholder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull viagemexistenteadapter.viewholder viewholder, int i) {
        final viagemexistente v = ViagemE.get(i);
        String Origem = v.getOrigem();
        String Destino = v.getDestino();
        String Data = v.getData();
        String Hora = v.getHora();
        String Custo = v.getCusto();
        String NPessoas = v.getNPessoas();
        viewholder.Origem.setText(Origem);
        viewholder.Destino.setText(Destino);
        viewholder.Data.setText(Data);
        viewholder.Hora.setText(Hora);
        viewholder.Custo.setText(Custo);
        viewholder.NPessoas.setText(NPessoas);
    }

    @Override
    public int getItemCount() {
        return ViagemE.size();
    }


    public class viewholder extends RecyclerView.ViewHolder {
        public TextView Origem, Destino, Data, Hora, Custo, NPessoas;

        public viewholder(View itemView) {
            super(itemView);
            Origem = itemView.findViewById(R.id.e_origem);
            Destino = itemView.findViewById(R.id.e_destino);
            Data = itemView.findViewById(R.id.e_data);
            Hora = itemView.findViewById(R.id.e_hora);
            Custo = itemView.findViewById(R.id.e_preco);
            NPessoas = itemView.findViewById(R.id.e_npessoas);
        }
    }
}
