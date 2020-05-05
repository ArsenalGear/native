import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
// подключение шрифтов с установкой библиотеки expo fonts
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import {THEME} from "./src/theme";

import {MainLayout} from "./src/MainLayout";
import {TodoState} from "./src/context/todo/todoState";
import {ScreenState} from "./src/context/screen/ScreenState";

async function loadApplication() {
	// возвращение промиса
	await Font.loadAsync({
		'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
		'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
	})
}

export default function App() {
	const [isReady, setIsReady] = useState(false)
	
	if (!isReady) {
		// передача асинхронных функций для загрузки шрифтов
		return <AppLoading
			onFinish={() => setIsReady(true)}
			onError={err => console.log(err)}
			startAsync={loadApplication}/>
	}
	
	return (
		<ScreenState>
			<TodoState>
				<MainLayout/>
			</TodoState>
		</ScreenState>
		
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: THEME.PADDING_HORIZONTAL,
		// paddingVertical: 20,
		marginBottom: 15,
		// flex: 1, //вся доступная высота экрана
		// // height: 300,
		// // flexDirection: 'column',
		// backgroundColor: 'white',
		// alignItems: 'flex-start',
		// justifyContent: 'center',
	},
	
	text: {
		// color: 'brown',
		// fontSize: 26
	},
	
	flat: {
		// overflow: 'hidden',
		// flex: 2
		// color: 'brown',
		// fontSize: 26
		// height: 'auto',
	},
	
});
