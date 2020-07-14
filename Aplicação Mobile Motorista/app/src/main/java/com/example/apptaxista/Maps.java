package com.example.apptaxista;

import android.Manifest;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.location.Location;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;


import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;



import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;


import org.json.JSONException;
import org.json.JSONObject;


public class Maps extends AppCompatActivity {

    TextView distance, time, price, ocupantes, especiais, carga;
    SupportMapFragment mapFragment;
    FusedLocationProviderClient client;
    String id, distancia, tempo, preco, x, y, z;
    String id_viagem;
    Button botao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Configuration config = getResources().getConfiguration();
        if (config.densityDpi >= 400)
        {
            setContentView(R.layout.activity_maps);
            Log.d("tipotele", "telegrande");
        }
        else
        {
            setContentView(R.layout.mapsv2);
            Log.d("tipotele", "telepequeno");
        }
        Bundle bundle = getIntent().getExtras();
        id =  bundle.getString("ID");

        botao = (Button) findViewById(R.id.conclusion);
        botao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(Maps.this, FimViagem.class);
                i.putExtra("ID", id);
                startActivity(i);
            }
        });



        distance = (TextView) findViewById(R.id.distance);
        time = (TextView) findViewById(R.id.time);
        price = (TextView) findViewById(R.id.price);
        ocupantes = (TextView) findViewById(R.id.ocupantes);
        especiais = (TextView) findViewById(R.id.especiais);
        carga = (TextView) findViewById(R.id.carga);

        final SharedPreferences pref = getApplicationContext().getSharedPreferences("Pref", 0);
        final SharedPreferences.Editor editor = pref.edit();
         id_viagem = pref.getString("id_viagem", null);

        mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.mapAPI);
        client = LocationServices.getFusedLocationProviderClient(this);
        if (ActivityCompat.checkSelfPermission(Maps.this,
                Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {

            getCurrentLocation();
        } else {
            ActivityCompat.requestPermissions(Maps.this,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 44);
        }
        post();
    }
    private  void post(){
        String url ="https://api-pint.herokuapp.com/viagens/viagem/"+id;

        StringRequest postReq = new StringRequest(Request.Method.GET, url,


                new Response.Listener<String>() {

                    @Override
                    public void onResponse(String response){
                        try {

                            JSONObject viagem = new JSONObject(response);
                            id_viagem = viagem.get("id_viagem").toString();
                            tempo = "10min";
                            preco = viagem.get("custo").toString();
                            distancia = "(10km)";
                            x = viagem.get("num_pessoas").toString();
                            y = viagem.get("necessidades").toString();
                            z = viagem.get("bagagem_quant").toString();

                            distance.setText(distancia);
                            time.setText(tempo);
                            price.setText(preco);
                            ocupantes.setText(x);
                            especiais.setText(y);
                            carga.setText(z);
                        }catch (JSONException| NullPointerException e){e.printStackTrace();}


                    }


                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {error.printStackTrace(); }
                }){
        };
        RequestQueue queue = Volley.newRequestQueue(getApplicationContext());
        queue.add(postReq);




    }

    private void getCurrentLocation() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        Task<Location> task = client.getLastLocation();
        task.addOnSuccessListener(new OnSuccessListener<Location>() {
            @Override
            public void onSuccess(final Location location) {
                if( location != null){
                    mapFragment.getMapAsync(new OnMapReadyCallback() {
                        @Override
                        public void onMapReady(GoogleMap googleMap) {

                            LatLng latLng = new LatLng (location.getLatitude(),
                                    location.getLongitude());
                            MarkerOptions options = new MarkerOptions().position(latLng)
                                    .title("Current Location");
                            googleMap.animateCamera(CameraUpdateFactory.newLatLngZoom(latLng, 10));

                            googleMap.addMarker(options);

                        }
                    });
                }
            }
        });
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == 44){
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED){

                getCurrentLocation();
            }
        }
    }
}
