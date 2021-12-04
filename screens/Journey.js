import { StatusBar } from "expo-status-bar";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";

import * as Location from "expo-location";
import StopwatchContainer from "../components/StopwatchContainer";
import { Polyline } from "react-native-maps";

export default function Journey({ navigation, route }) {
	const tokyoRegion = {
		latitude: 35.6762,
		longitude: 139.6503,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	};
	const [location, setLocation] = useState(tokyoRegion);
	const [errorMsg, setErrorMsg] = useState(null);
	const [sessionStarted, setSessionStarted] = useState(false);
	const [polylineCoords, setPolylineCoords] = useState([]);

	const [timerOn, setTimerOn] = useState(false);

	useEffect(() => {
		console.log(polylineCoords, polylineCoords.length);
	}, [polylineCoords]);

	useEffect(() => {
		let interval;
		console.log(timerOn);
		if (timerOn) {
			interval = setInterval(() => getPosition(), 3000);
		} else {
			clearInterval(interval);
		}
		//cleanup function to avoid memory leaks
		return () => clearInterval(interval);
	}, [timerOn]);

	async function getPosition() {
		let locationCoords = await Location.getCurrentPositionAsync({
			accuracy: 5,
		});

		let locationObj = {
			longitude: locationCoords.coords.longitude,
			latitude: locationCoords.coords.latitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		};

		setLocation(locationObj);

		let locationPath = {
			longitude: locationCoords.coords.longitude,
			latitude: locationCoords.coords.latitude,
		};

		console.log(locationPath);
		setPolylineCoords(polylineCoords => [...polylineCoords, locationPath]);
	}

	useEffect(() => {
		(async () => {
			if (Platform.OS === "android" && !Constants.isDevice) {
				setErrorMsg(
					"Oops, this will not work on Snack in an Android emulator. Try it on your device!"
				);
				return;
			}
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			} else {
				getPosition();
			}
		})();
	}, []);

	let text = "Waiting..";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
	}
	function startSession(obj) {
		setSessionStarted(!sessionStarted);
		// Replace Session component with StartedSession component
		// If obj is empty , create one
		// Session Object { path : [ interval 1, interval2]}
		// interval i : { currentTime : {}, currentLat, currentLon}
		// Start Timer in StopWatchContainer
		// Every 3 seconds :
		// Create an interval object
		// Grab current time from StopWatchContainer
		// Grab lat and lon from user location
		// Update Object with grabbed info
		// push the object into the path array
		// Object.path.push(interval)
	}

	function stopSession(obj) {
		// Break the 3 second loop in obj
		// Replace StartedSession component with StoppedSession component
	}

	function continueSession(obj) {
		// Replace StoppedSession component with Session component
		// Fill Session with current position
		// Fill Session with last obj path interval time
	}

	return (
		<View style={styles.container}>
			<MapView style={styles.map} region={location && location}>
				<Marker
					coordinate={{
						latitude: location ? location.latitude : 37.78825,
						longitude: location ? location.longitude : -122.43,
					}}
				/>
				<Polyline
					coordinates={polylineCoords && polylineCoords}
					strokeWidth={styles.polyline.width}
					strokeColor={styles.polyline.color}
				/>
			</MapView>
			<Text style={styles.paragraph}>{text}</Text>
			<StopwatchContainer
				timerOn={timerOn}
				setTimerOn={setTimerOn}
				location={location}
				polylineCoords={polylineCoords}
			/>
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
	},
	mediumPoster: {
		width: 350,
		height: 350,
	},
	title: {
		paddingVertical: 20,
	},
	map: {
		width: 350,
		height: 350,
	},
	paragraph: {
		fontSize: 18,
		textAlign: "center",
	},
	polyline: {
		width: 2,
		color: "#1c5469",
	},
});
