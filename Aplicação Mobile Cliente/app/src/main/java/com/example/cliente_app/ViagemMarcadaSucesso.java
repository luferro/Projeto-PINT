package com.example.cliente_app;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;

import androidx.appcompat.app.AppCompatActivity;

public class ViagemMarcadaSucesso extends AppCompatActivity {


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


    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_marcacaocomsucesso);

        Button continuar;

        continuar = (Button) findViewById(R.id.btn_sucesso);

        continuar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(ViagemMarcadaSucesso.this, MarcarViagem.class));
            }
        });
    }
}