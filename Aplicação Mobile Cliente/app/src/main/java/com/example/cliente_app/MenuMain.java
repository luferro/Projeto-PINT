package com.example.cliente_app;

import android.os.Bundle;
import android.view.MenuInflater;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ImageButton;


public class MenuMain extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar myToolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(myToolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setHomeButtonEnabled(true);
        getSupportActionBar().setHomeAsUpIndicator(R.drawable.ic_menu);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
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
}

