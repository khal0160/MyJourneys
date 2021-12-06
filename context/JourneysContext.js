import * as React from "react";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import {
	collection,
	getDocs,
	deleteDoc,
	doc,
	setDoc,
	addDoc,
	GeoPoint,
} from "@firebase/firestore";

const JourneysContext = createContext();

export default function JourneysProvider(props) {
	const [addingJourneys, setAddingJourneys] = useState(false);
	const [journeys, setJourneys] = useState([]);
	const [readySession, setReadySession] = useState(false);
	const [currentJourney, setCurrentJourney] = useState({});

	const journeysCollectionRef = collection(db, "journeys");

	useEffect(() => {
		console.log("this is a test: ", currentJourney);
	}, [currentJourney]);

	useEffect(() => {
		const getJourneys = async () => {
			const data = await getDocs(journeysCollectionRef);
			setJourneys(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		};
		getJourneys();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Edit function
	async function editJourneysObj(objID, newObj) {
		const newArray = [...journeys];
		console.log(objID, "THIS IS THE OBJID, inside edit");

		const arrayToDB = newObj.locationArray.map(
			coordObj => new GeoPoint(coordObj.latitude, coordObj.longitude)
		);

		console.log("arrayTODB", arrayToDB);

		const objToDB = {
			time: newObj.time,
			locationArray: arrayToDB,
		};

		let selectedObj = newArray.find(x => x.id === objID);
		selectedObj.time = newObj.time;
		selectedObj.locationArray = newObj.locationArray;
		setJourneys([...newArray]);
		const updatedDoc = await setDoc(doc(journeysCollectionRef, objID), objToDB);
		console.log(updatedDoc);

		return updatedDoc;
	}

	// Delete function
	function deleteJourneysObj(obj) {
		const docRef = doc(db, "journeys", obj.item.id);
		let newArray = deleteDoc(docRef).then(() => {
			let journeyArray = journeys.filter(
				journeysObj => journeysObj.id !== obj.item.id
			);
			setJourneys([...journeyArray]);
		});

		// setCurrentJourney({});
		// console.log("THIS IS JOURNEYS", journeys);
		return newArray;
	}

	// Save function
	function saveJourneysObj(obj) {
		console.log(obj);
		// obj id is undefined
		const newArray = [...journeys];
		let selectedObj = newArray.find(x => x.id === obj.id);
		console.log(selectedObj);
		selectedObj.journeysItem.title = obj.title;
		selectedObj.journeysItem.category = obj.category;
		selectedObj.journeysItem.isEditing = false;
		setJourneys(newArray);
		let data = {
			journeysItem: {
				isEditing: false,
				category: obj.category,
				title: obj.title,
			},
		};
		setDoc(doc(db, "journeys", obj.id), data);
	}

	// Cancel function
	function cancelEditJourneysObj(obj) {
		const newArray = [...journeys];
		let selectedObj = newArray.find(x => x.id === obj.id);
		selectedObj.journeysItem.isEditing = false;
		setJourneys(newArray);
	}

	// Add function
	function addNewJourneysObj(obj) {
		setAddingJourneys(true);
		// console.log(addingJourneys);
	}
	// Cancel Adding function
	function cancelAddingJourneysObj() {
		setAddingJourneys(false);
	}

	async function saveNewJourneysObj(journeyTime, geoPointsArray) {
		const newArray = [...journeys];

		const geoPointsForDB = geoPointsArray.map(
			coordObj => new GeoPoint(coordObj.latitude, coordObj.longitude)
		);

		const objToDB = {
			time: journeyTime,
			locationArray: geoPointsForDB,
		};

		const newDoc = await addDoc(collection(db, "journeys"), objToDB);
		// console.log("this is the newDoc", newDoc);
		newArray.push(objToDB);
		setJourneys([...newArray]);
		return newArray;
	}

	return (
		<JourneysContext.Provider
			value={{
				saveNewJourneysObj,
				addingJourneys,
				journeys,
				deleteJourneysObj,
				editJourneysObj,
				saveJourneysObj,
				cancelEditJourneysObj,
				addNewJourneysObj,
				cancelAddingJourneysObj,
				readySession,
				setReadySession,
				currentJourney,
				setCurrentJourney,
			}}
			{...props}
		/>
	);
}
export function useJourneys() {
	const context = useContext(JourneysContext);

	if (!context) throw new Error("Not inside the Provider");
	return context;
}
