package com.example.apptaxista.Lista;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;



import com.example.apptaxista.Maps;
import com.example.apptaxista.Passageiros;
import com.example.apptaxista.R;

import java.util.ArrayList;

public class RegAdapter extends RecyclerView.Adapter<RegAdapter.viewholder> {
    public Button botao;
    public Button button;
    public Button bota;
    private Context nr ;
    private ArrayList<Registo> nregisto;
    public  RegAdapter(Context context , ArrayList<Registo> registo ){
        nr = context ;
        nregisto = registo;

    }

    @NonNull
    @Override
    public viewholder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(nr).inflate(R.layout.viagens ,viewGroup ,false);
        return new viewholder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull viewholder viewholder, int i) {
        final Registo p = nregisto.get(i);
        String Dia = p.getDia();
        String Hora = p.getHora();
        String Inicio = p.getInicio();
        String Chegada = p.getChegada();
        String Distancia = p.getDistancia();
        String X = p.getX();
        String Y = p.getY();
        String Z = p.getZ();
        final String id =p.getId();
        final String id_cliente = p.getId_cliente();
        viewholder.dia.setText(Dia);
        viewholder.hora.setText(Hora);
        viewholder.distancia.setText(Distancia);
        viewholder.startl.setText(Inicio);
        viewholder.endl.setText(Chegada);
        viewholder.ocupantes.setText(X);
        viewholder.especiais.setText(Y);
        viewholder.carga.setText(Z);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(nr, Maps.class);
                i.putExtra("ID", id);
                 nr.startActivity(i);
            }
        });


        botao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(nr, Passageiros.class);
                i.putExtra("ID", id);
                i.putExtra("IDCli", id_cliente);
                nr.startActivity(i);
            }
        });
    }

    @Override
    public int getItemCount() {
        return nregisto.size();
    }
    public class viewholder extends RecyclerView.ViewHolder{
        public TextView dia ;
        public TextView hora ;
        public TextView distancia ;
        public TextView startl ;
        public TextView endl ;
        public TextView ocupantes ;
        public TextView especiais ;
        public TextView carga ;


        public viewholder(@NonNull View itemView) {
            super(itemView);
            dia =  itemView.findViewById(R.id.dia);
            hora = itemView.findViewById(R.id.hora);
            distancia =  itemView.findViewById(R.id.distance);
            startl =  itemView.findViewById(R.id.startl);
            endl = itemView.findViewById(R.id.endl);
            ocupantes =  itemView.findViewById(R.id.ocupantes);
            especiais = itemView.findViewById(R.id.especiais);
            carga = itemView.findViewById(R.id.carga);
            button  = itemView.findViewById(R.id.iniciar);
            botao = itemView.findViewById(R.id.detalhes);
            bota = itemView.findViewById(R.id.button7);

        }
    }
}
