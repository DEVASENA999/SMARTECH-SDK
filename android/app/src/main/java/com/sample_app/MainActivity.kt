package com.sample_app

import android.os.Bundle
import com.netcore.android.smartechpush.SmartechPushReactNativeModule
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        SmartechPushReactNativeModule.init(intent) // Initialize Smartech
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : DefaultReactActivityDelegate(this, mainComponentName) {
            override fun getLaunchOptions(): Bundle? {
                val initialProps = Bundle()
                // You can add initial props here if needed
                return initialProps
            }
        }
    }
}
