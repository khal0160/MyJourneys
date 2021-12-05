import React, { useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import StopwatchContainer from "../StopwatchContainer";

import { Polyline } from "react-native-maps";
import MapView from "react-native-maps";
import { useJourneys } from "../../context/JourneysContext";
import timeFormatter from "../../utils/utils";

export default function SessionInfo({ goToDashboard }) {
	
	const { currentJourney, setReadySession, deleteJourneysObj  } = useJourneys();

	const { item } = currentJourney;

	console.log("current journey obj", currentJourney);

	const coordsForMap = {
		latitude: item.locationArray[item.locationArray.length - 1].latitude,
		longitude: item.locationArray[item.locationArray.length - 1].longitude,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	async function handleDelete (obj){
		await deleteJourneysObj(obj)
		goToDashboard()
	}
	

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={currentJourney && coordsForMap}
			>
				<Polyline
					coordinates={
						currentJourney.locationArray && currentJourney.locationArray
					}
					strokeWidth={styles.polyline.width}
					strokeColor={styles.polyline.color}
				/>
			</MapView>
			<Text>Time: {timeFormatter(item.time)}</Text>
			<Text>Start: </Text>
			<Text>Latitude: {item.locationArray[0].latitude}</Text>
			<Text>Longitude: {item.locationArray[0].longitude}</Text>

			<Text>End:</Text>
			<Text>
				Latitude: {item.locationArray[item.locationArray.length - 1].latitude}
			</Text>
			<Text>
				Longitude: {item.locationArray[item.locationArray.length - 1].latitude}
			</Text>
			<Button title='Continue' onPress={() => setReadySession(true)} />
			<Button title='Delete' onPress={() => handleDelete(currentJourney)} />
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
