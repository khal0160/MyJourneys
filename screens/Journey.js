import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet } from "react-native";

import SessionInfo from "../components/Session/SessionInfo";
import SessionReady from "../components/Session/SessionReady";
import { useJourneys } from "../context/JourneysContext";

export default function Journey({ navigation, route }) {
	console.log(route);
	const { readySession, currentJourney } = useJourneys();

	function goToDashboard() {
		navigation.navigate("Dashboard");
	}

	return (
		<View style={styles.container}>
			{readySession ? (
				<SessionReady navFunc={goToDashboard} />
			) : (
				<SessionInfo
					currentJourney={currentJourney}
					goToDashboard={goToDashboard}
				/>
			)}
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
