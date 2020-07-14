package com.example.apptaxista;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

public class FaltaComparencia extends AppCompatActivity {
    Button botao;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Configuration config = getResources().getConfiguration();
        if (config.densityDpi >= 400)
        {
            setContentView(R.layout.faltacomparencia);
            Log.d("tipotele", "telegrande");
        }
        else
        {
            setContentView(R.layout.faltacomparenciav2);
            Log.d("tipotele", "telepequeno");
        }

        botao = (Button) findViewById(R.id.button8);
        botao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(FaltaComparencia.this, Marcacoes.class);
                startActivity(i);
            }
        });
    }
}
