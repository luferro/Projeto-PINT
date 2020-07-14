package com.example.cliente_app.viagensrealizadas;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.example.cliente_app.R;

import java.util.ArrayList;

public class realizadaadapter extends RecyclerView.Adapter<realizadaadapter.viewholder> {
    private Context ma;
    private ArrayList<realizada> ViagemE;
    public CardView cardView;
    private com.example.cliente_app.viagensrealizadas.realizadaadapter.OnItemClickListener mListener;

    public interface OnItemClickListener {
        void onItemClick(int position);
    }

    public void setOnItemClickListener (com.example.cliente_app.viagensrealizadas.realizadaadapter.OnItemClickListener listener) {
        mListener = listener;

    }

    public realizadaadapter(Context context, ArrayList<realizada> viageme) {
        ma = context;
        ViagemE = viageme;
    }

    @NonNull
    @Override
    public com.example.cliente_app.viagensrealizadas.realizadaadapter.viewholder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(ma).inflate(R.layout.itemviagemrealizada, viewGroup, false);
        return new com.example.cliente_app.viagensrealizadas.realizadaadapter.viewholder(v, mListener);
    }

    @Override
    public void onBindViewHolder(@NonNull com.example.cliente_app.viagensrealizadas.realizadaadapter.viewholder viewholder, int i) {
        final realizada v = ViagemE.get(i);
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

        public viewholder(View itemView, final com.example.cliente_app.viagensrealizadas.realizadaadapter.OnItemClickListener listener) {
            super(itemView);
            Origem = itemView.findViewById(R.id.morigem);
            Destino = itemView.findViewById(R.id.mdestino);
            Data = itemView.findViewById(R.id.mdata);
            Hora = itemView.findViewById(R.id.mhora);
            Custo = itemView.findViewById(R.id.mpreco);
            NPessoas = itemView.findViewById(R.id.mnpessoas);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (listener != null) {
                        int position = getAdapterPosition();
                        if (position != RecyclerView.NO_POSITION);
                        listener.onItemClick(position);

                    }
                }
            });
        }
    }
}
