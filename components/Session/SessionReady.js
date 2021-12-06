import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import StopwatchContainer from "../StopwatchContainer";

import { Polyline } from "react-native-maps";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useJourneys } from "../../context/JourneysContext";
import { StatusBar } from "expo-status-bar";

import * as Location from "expo-location";

export default function SessionReady(props) {
	const tokyoRegion = {
		latitude: 35.6762,
		longitude: 139.6503,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	};

	const [location, setLocation] = useState(tokyoRegion);
	const [timerOn, setTimerOn] = useState(false);
	const [polylineCoords, setPolylineCoords] = useState([]);

	const { readySession, currentJourney } = useJourneys();

	const isCurrentJourneyEmpty = Object.values(currentJourney) >= 0;

	// console.log(isCurrentJourneyEmpty);

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

	useEffect(() => {
		getPosition();
	}, []);

	useEffect(() => {
		!isCurrentJourneyEmpty &&
			setPolylineCoords(currentJourney.item.locationArray);
	}, []);

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

	useEffect(() => {
		console.log("this is the current journey", currentJourney);
	}, [currentJourney]);

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

		// console.log(locationPath);
		setPolylineCoords(polylineCoords => [...polylineCoords, locationPath]);
	}

	let coordsForMap;
	if (!isCurrentJourneyEmpty) {
		coordsForMap = {
			latitude:
				currentJourney.item.locationArray[
					currentJourney.item.locationArray.length - 1
				].latitude,
			longitude:
				currentJourney.item.locationArray[
					currentJourney.item.locationArray.length - 1
				].longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		};
	}

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				region={!isCurrentJourneyEmpty ? coordsForMap : location}
			>
				<Polyline
					coordinates={
						!isCurrentJourneyEmpty
							? currentJourney.item.locationArray
							: polylineCoords && polylineCoords
					}
					strokeWidth={styles.polyline.width}
					strokeColor={styles.polyline.color}
				/>
			</MapView>
			<StopwatchContainer
				timerOn={timerOn}
				setTimerOn={setTimerOn}
				location={!isCurrentJourneyEmpty ? coordsForMap : location}
				polylineCoords={polylineCoords}
				navFunc={props.navFunc}
				savedTime={!isCurrentJourneyEmpty && currentJourney.item.time}
				isCurrentJourneyEmpty={isCurrentJourneyEmpty}
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
