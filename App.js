import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
// подключение шрифтов с установкой библиотеки expo fonts
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import {THEME} from "./src/theme";

import {Navbar} from "./src/components/Navbar";
import {MainScreen} from "./src/screens/MainScreen";
import {TodoScreen} from "./src/screens/TodoScreen";

async function loadApplication() {
	// возвращение промиса
	await Font.loadAsync({
		'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
		'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
	})
}

export default function App() {
	const [todos, setTodos] = useState([
		{id: '1', title: 'выучить React Native'}
		// {id: '2', title: 'написать приложение '},
	])
	const [todoId, setTodoId] = useState(null)
	const [isReady, setIsReady] = useState(false)
	
	if (!isReady) {
		// передача асинхронных функций для загрузки шрифтов
		return <AppLoading
			onFinish={()=> setIsReady(true)}
			onError={err => console.log(err)}
			startAsync={loadApplication}/>
	}
	
	const addTodo = (title) => {
		//22222 параметр title мы получаем из формы <AddTodo onSubmit={addTodo}/>
		// здесь формируется новый элемент todo
		
		// const newTodo = {
		// 	id: Date.now().toString(),
		// 	title: title
		// }
		// // setTodos(todos.concat([newTodo])) - один из вариантов записи
		
		// // предеча callback функции которая принимает предыдущий state prevTodos
		// //33333333 prevTodos - это предыдущее состояние массива todos если первый раз то просто []
		// setTodos((prevTodos) => {
		// 	// возвращаем новый state склеиваем предыдущий и новый state
		// 	return [ //возвращение нового state возвращаем массив
		// 		...prevTodos, newTodo
		// 	]
		// }) //это длинная запись
		
		//получаем предущее значение и добавляем новое
		// //333333333 prev - это предыдущее состояние массива todos если первый раз то просто []
		setTodos(prev => [...prev, {
			id: Date.now().toString(),
			title: title
		}])//это короткая запись (так создается элемент todo и добавление в конец state)
	}
	
	const removeTodo = id => {
		// получение по id нужного элемента
		// чтобы получить ниже ${todo.title} из const todo
		const todo = todos.find(t => t.id === id)
		
		// Works on both Android and iOS
		Alert.alert(
			'Удаление элемента',
			`Вы уверены что хотите удалить "${todo.title}" ?`,
			[
				// {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
				{
					text: 'Отмена',
					// onPress: () => console.log('Cancel Pressed'),
					
					// стиль характерный для ios
					style: 'cancel',
				},
				{
					text: 'Удалить',
					// стиль характерный для ios
					style: 'destructive',
					onPress: () => {
						// вернуться на главный экран после удаления
						setTodoId(null)
						// если не равняется тогда оставляем, если равняется то удалем
						setTodos(prev => prev.filter(todo => todo.id !== id))
					}
				},
			],
			// клик по оверлею не закрывает модалку
			{cancelable: false},
		);
	}
	
	const updateTodo = (id, title) => {
		// преобразование для перезаписи title
		setTodos(old => old.map(todo => {
			// если todo.id равняется тому что передали из модалки
			// тогда переписываем в нем title
			todo.id === id ? todo.title = title : null
			return todo
		}))
	}
	
	let content = (
		// отдельный компонент со страницей
		<MainScreen
			// получаем todo который необходимо открыть
			// изменится стейт и откроется нужный экран
			// openTodo={(id) => {
			// 	setTodoId(id)
			// }}
			//
			openTodo={setTodoId}
			todos={todos} addTodo={addTodo} removeTodo={removeTodo}/>
	)
	
	if (todoId) {
		//константа выбранного todo
		const selectedTodo = todos.find(todo => todo.id === todoId)
		//передаем константу
		content = (
			<TodoScreen
				// обновление данных из модалки
				onSave={updateTodo}
				
				// удаление со страницы todo
				onRemove={removeTodo}
				todo={selectedTodo}
				goBack={() => setTodoId(null)}/>
		)
	}
	
	return (
		<View style={{flex: 1}}>
			{/*передача props*/}
			<Navbar title="Todo App!"></Navbar>
			{/*здесь будет отбражаться другая страница если todoId !==null*/}
			{content}
			{/*<Text>Open up App.js to start working on your ap!</Text>*/}
			{/*<Text style={styles.text }>Open up App.js to start working on y </Text>*/}
			{/*<Text style={{color: 'green'}}>Open up App.js to start working on your аapp1231231!</Text>*/}
		</View>
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
