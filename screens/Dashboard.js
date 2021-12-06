import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { FAB } from "react-native-elements";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	FlatList,
	Pressable,
} from "react-native";

import cuid from "cuid";

import { useJourneys } from "../context/JourneysContext";
import timeFormatter from "../utils/utils";
export default function Dashboard({ navigation, route }) {
	const { journeys, setReadySession, setCurrentJourney } = useJourneys();

	function goToReadySession() {
		setReadySession(true);
		setCurrentJourney({});
		navigation.navigate("Journey");
	}

	function goToInfoSession() {
		console.log("goToInfo Called");
		setReadySession(false);
		navigation.navigate("Journey");
	}

	function JourneyObj({ journey }) {
		console.log(journey);
		return (
			<Pressable
				style={styles.row}
				onPress={() => {
					setCurrentJourney(journey);
					goToInfoSession();
				}}
			>
				<Text style={styles.text}>Journey</Text>
				<Text style={styles.text}>ID : {journey.item.id}</Text>
				<Text style={styles.text}>
					Time : {timeFormatter(journey.item.time)}{" "}
				</Text>
			</Pressable>
		);
	}

	return (
		<SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
			<FlatList
				data={journeys}
				renderItem={item => <JourneyObj journey={item} />}
				keyExtractor={_ => cuid()}
				// refreshing={isRefreshing}
				// onRefresh={() => {
				// 	setIsRefreshing(true);
				// 	getData();
				// }}
				ListEmptyComponent={<Text>Sorry! No Journeys to display : </Text>}
			/>
			<FAB
				visible={true}
				icon={{ name: "add", color: "white" }}
				onPress={() => {
					goToReadySession();
				}}
				style={styles.fab}
			/>
			<StatusBar style='auto' />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
	},
	row: {
		margin: 20,
		backgroundColor: "beige",
		height: 100,
		justifyContent: "center",
		alignItems: "flex-start",
		width: 300,
		paddingHorizontal: 10,
		borderRadius: 20,
		paddingLeft: 30,
	},
	fab: {
		width: "100%",
		justifyContent: "flex-end",
		paddingHorizontal: "9%",
		paddingTop: "3%",
	},

	text: {
		paddingVertical: 4,
	},
});

