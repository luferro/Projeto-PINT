package com.example.apptaxista;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

public class FimViagem extends AppCompatActivity {
    String id;
    Button bota;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Configuration config = getResources().getConfiguration();
        if (config.densityDpi >= 400)
        {
            setContentView(R.layout.fimviagem);
            Log.d("tipotele", "telegrande");
        }
        else
        {
            setContentView(R.layout.fimviagemv2);
            Log.d("tipotele", "telepequeno");
        }
        Bundle bundle = getIntent().getExtras();
        id =  bundle.getString("ID");

        bota = (Button) findViewById(R.id.button7);


        bota.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(FimViagem.this, Pagamentos.class);
                i.putExtra("ID", id);
                startActivity(i);
            }
        });
    }
}
