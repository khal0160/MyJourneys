import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { useJourneys } from "../context/JourneysContext";

export default function StopwatchContainer({
	timerOn,
	setTimerOn,
	location,
	polylineCoords,
}) {
	const [time, setTime] = useState(0);

	const { saveNewJourneysObj, journeys } = useJourneys();

	useEffect(() => {
		let interval = null;
		if (timerOn) {
			interval = setInterval(() => {
				setTime(prevTime => prevTime + 10);
			}, 10);
		} else if (!timerOn) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [timerOn]);

	function handleToggle() {
		setTimerOn(!timerOn);
	}

	function saveJourney() {
		saveNewJourneysObj(time, polylineCoords);
	}

	return (
		<View style={styles.container}>
			<View style={styles.parent}>
				<Text style={styles.child}>
					{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
				</Text>
				<Text style={styles.child}>
					{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
				</Text>
				<Text style={styles.child}>
					{("0" + ((time / 10) % 100)).slice(-2)}
				</Text>
			</View>

			<View style={styles.buttonParent}>
				<Pressable style={styles.button} onPress={handleToggle}>
					<Text style={styles.buttonText}>{!timerOn ? "Start" : "Stop"}</Text>
				</Pressable>
				{!timerOn && (
					<Pressable style={styles.button} onPress={saveJourney}>
						<Text style={styles.buttonText}>Save Journey</Text>
					</Pressable>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	parent: {
		display: "flex",
		flexDirection: "row",
		borderRadius: 80,
		paddingLeft: "8%",
		paddingRight: "8%",
		paddingTop: ".5%",
		paddingBottom: ".5%",
	},

	child: {
		fontSize: 40,
		color: "black",
	},

	buttonParent: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: "12%",
	},

	button: {
		paddingTop: "5%",
		paddingBottom: "5%",
		paddingLeft: "5%",
		paddingRight: "5%",
		display: "flex",
		borderRadius: 20,
		height: 60,
	},

	buttonText: {
		color: "black",
		fontSize: 20,
		alignSelf: "center",
	},

	container: {
		paddingTop: 40,
	},
});
