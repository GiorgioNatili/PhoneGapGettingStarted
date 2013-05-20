package com.plugin.GCM;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import com.google.android.gcm.*;


/**
 * @author awysocki
 */

public class PushPlugin extends CordovaPlugin {

    public static final String ME = "PushPlugin";

    public static final String REGISTER = "register";
    public static final String UNREGISTER = "unregister";
    public static final String EXIT = "exit";

    private static CordovaPlugin gwebView;
    private static CordovaWebView staticWebView;
    private static String gECB;
    private static String gSenderID;


    @SuppressWarnings("deprecation")
    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbak) {

        Log.v(ME + ":execute", "action=" + action);
        JSONObject result;

        if (REGISTER.equals(action)) {

            Log.v(ME + ":execute", "data=" + data.toString());

            try {

                JSONObject jo = new JSONObject(data.toString().substring(1, data.toString().length() - 1));

                gwebView = this;
                staticWebView = webView;

                Log.v(ME + ":execute", "jo=" + jo.toString());

                gECB = (String) jo.get("ecb");
                gSenderID = (String) jo.get("senderID");

                Log.v(ME + ":execute", "ECB=" + gECB + " senderID=" + gSenderID);

                GCMRegistrar.register(cordova.getActivity(), gSenderID);


                Log.v(ME + ":execute", "GCMRegistrar.register called ");

                callbak.success(jo);

                return true;

            } catch (JSONException e) {

                Log.e(ME, "Got JSON Exception " + e.getMessage());
                callbak.error(e.getMessage());

            }

            // if a notification was touched while we were completely exited, process it now
            try {

                BufferedReader inputReader = new BufferedReader(new InputStreamReader(cordova.getActivity().getApplicationContext().openFileInput("cached_payload")));
                String inputString;
                StringBuffer stringBuffer = new StringBuffer();

                while ((inputString = inputReader.readLine()) != null) {

                    stringBuffer.append(inputString);
                }

                // surface the cached payload
                JSONObject jsonObj = new JSONObject(stringBuffer.toString());
                sendJavascript(jsonObj);
                cordova.getActivity().getApplicationContext().getFileStreamPath("cached_payload").delete();

                callbak.success(jsonObj);

                return true;

            } catch (FileNotFoundException fnf) {

                Log.e("REGISTER", fnf.getMessage());
                callbak.error(fnf.getMessage());


            } catch (IOException io) {

                io.printStackTrace();
                callbak.error(io.getMessage());


            } catch (JSONException j) {

                j.printStackTrace();
                callbak.error(j.getMessage());

            }

            PushHandlerActivity.EXITED = false;

        } else if (UNREGISTER.equals(action)) {

            GCMRegistrar.unregister(this.cordova.getActivity());

            Log.v(ME + ":" + UNREGISTER, "GCMRegistrar.unregister called ");

            callbak.success("Unregistration Success");

            return true;

        } else {

            Log.e(ME, "Invalid action : " + action);

            callbak.error("Unregistration Failed");

            return false;
        }

        return false;
    }

    public static void sendJavascript(JSONObject _json) {

        String _d = "javascript:" + gECB + "(" + _json.toString() + ")";
        Log.v(ME + ":sendJavascript", _d);

        if (gECB != null) {

            staticWebView.sendJavascript(_d);

        }
    }


    public void onDestroy() {
        super.onDestroy();

        // let the service know we are exiting so it can cache the next notification payload.
        PushHandlerActivity.EXITED = true;
        GCMRegistrar.onDestroy(cordova.getActivity());
    }
}
