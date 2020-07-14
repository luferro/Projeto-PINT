package com.example.cliente_app.viagensmarcadas;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.example.cliente_app.Perfil;
import com.example.cliente_app.R;
import com.example.cliente_app.ViagensMarcadasInfo;

import java.util.ArrayList;

public class marcadaadapter extends RecyclerView.Adapter<marcadaadapter.viewholder> {
    private Context ma;
    private ArrayList<marcada> ViagemE;
    public CardView cardView;
    public ImageButton imageButton;
    private OnItemClickListener mListener;

    public interface OnItemClickListener {
        void onItemClick(int position);
    }

    public void setOnItemClickListener (OnItemClickListener listener) {
        mListener = listener;

    }

    public marcadaadapter(Context context, ArrayList<marcada> viageme) {
        ma = context;
        ViagemE = viageme;
    }

    @NonNull
    @Override
    public viewholder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(ma).inflate(R.layout.itemviagemmarcada, viewGroup, false);
        return new viewholder(v, mListener);
    }

    @Override
    public void onBindViewHolder(@NonNull marcadaadapter.viewholder viewholder, int i) {
        final marcada v = ViagemE.get(i);
        final String id = v.getId();
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


        imageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(ma,   ViagensMarcadasInfo.class);
                i.putExtra("ID", id);
                Log.d("viagem", String.valueOf(id));
                ma.startActivity(i);
            }
        });

    }

    @Override
    public int getItemCount() {
        return ViagemE.size();
    }


    public class viewholder extends RecyclerView.ViewHolder {
        public TextView Origem, Destino, Data, Hora, Custo, NPessoas;

        public viewholder(View itemView, final OnItemClickListener listener) {
            super(itemView);

            Origem = itemView.findViewById(R.id.morigem);
            Destino = itemView.findViewById(R.id.mdestino);
            Data = itemView.findViewById(R.id.mdata);
            Hora = itemView.findViewById(R.id.mhora);
            Custo = itemView.findViewById(R.id.mpreco);
            NPessoas = itemView.findViewById(R.id.mnpessoas);
            imageButton = itemView.findViewById(R.id.imageButton7);

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
