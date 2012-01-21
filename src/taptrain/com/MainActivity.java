package taptrain.com;

import android.os.Bundle;
import com.phonegap.*;

public class MainActivity extends DroidGap
{
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
        
        //WebView engine = (WebView) findViewById(R.id.web_engine);  
        //engine.loadUrl("file:///android_asset/www/index.html"); 

    }
}
