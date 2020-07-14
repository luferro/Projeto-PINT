package com.example.apptaxista;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

public class ConfirmarPag extends AppCompatActivity {
    Button botao;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Configuration config = getResources().getConfiguration();
        if (config.densityDpi >= 400)
        {
            setContentView(R.layout.confirmar);
        }
        else
        {
            setContentView(R.layout.confirmarv2);
        }

        botao = (Button) findViewById(R.id.conc);
        botao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(ConfirmarPag.this, Marcacoes.class);
                startActivity(i);
            }
        });
    }
}
