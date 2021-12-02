import { StatusBar } from "expo-status-bar";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";

import * as Location from "expo-location";
import StopwatchContainer from '../components/StopwatchContainer'

export default function Journey({ navigation, route }) {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [sessionStarted, setSessionStarted] = useState(false);

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
				await Location.watchPositionAsync(
					{
						accuracy: 5,
						distanceInterval: 10,
					},
					locationObj => {
						const { coords } = locationObj;

						let location = new Object({
							latitude: coords.latitude,
							longitude: coords.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						});

						console.log(location);
						setLocation(location);
					}
				);
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
			<MapView
				style={styles.map}
				//specify our coordinates.
				// initialRegion={{
				// 	latitude: 37.78825,
				// 	longitude: -122.4324,
				// 	latitudeDelta: 0.0922,
				// 	longitudeDelta: 0.0421,
				// }}
				region={location && location}
			>
				<Marker
					coordinate={{
						latitude: location ? location.latitude : 37.78825,
						longitude: location ? location.longitude : -122.43,
					}}
				/>
			</MapView>
			<Text style={styles.paragraph}>{text}</Text>
			<StopwatchContainer/>
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
});
