package com.tns.gen.com.mapbox.mapboxsdk.maps;

public class MapboxMap_OnMoveListener implements com.mapbox.mapboxsdk.maps.MapboxMap.OnMoveListener {
	public MapboxMap_OnMoveListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onMoveBegin(com.mapbox.android.gestures.MoveGestureDetector param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onMoveBegin", void.class, args);
	}

	public void onMove(com.mapbox.android.gestures.MoveGestureDetector param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onMove", void.class, args);
	}

	public void onMoveEnd(com.mapbox.android.gestures.MoveGestureDetector param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onMoveEnd", void.class, args);
	}

}
