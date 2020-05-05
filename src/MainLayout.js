import React, {useState, useContext} from 'react'
import {Navbar} from "./components/Navbar";
import { View} from "react-native";
import {MainScreen} from "./screens/MainScreen";
import {TodoScreen} from "./screens/TodoScreen";
import {ScreenContext} from "./context/screen/screenContext";

export const MainLayout = () => {
	const {todoId} = useContext(ScreenContext)
	
	return (
		<View style={{flex: 1}}>
			{/*передача props*/}
			<Navbar title="Todo App!"></Navbar>
			{/*здесь будет отбражаться другая страница если todoId !==null*/}
			{todoId ? <TodoScreen/> : <MainScreen/>}
			{/*<Text style={{color: 'green'}}>Open up App.js to start working on your аapp1231231!</Text>*/}
		</View>
	)
}