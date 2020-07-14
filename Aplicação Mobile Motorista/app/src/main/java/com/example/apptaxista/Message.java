package com.example.apptaxista;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class Message extends AppCompatActivity {
    private Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Configuration config = getResources().getConfiguration();
        if (config.densityDpi >= 400)
        {
            setContentView(R.layout.activity_message);
            Log.d("tipotele", "telegrande");
        }
        else
        {
            setContentView(R.layout.messagev2);
            Log.d("tipotele", "telepequeno");
        }


        button = (Button) findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openActivityLogin();
            }
        });
    }

    public void openActivityLogin() {
        Intent intent = new Intent(this, Login.class);
        startActivity(intent);
    }
}
