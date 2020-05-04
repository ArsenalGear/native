import React, {useState, useContext} from 'react'
import {Navbar} from "./components/Navbar";
import {Alert, View} from "react-native";
import {MainScreen} from "./screens/MainScreen";
import {TodoScreen} from "./screens/TodoScreen";
import {TodoContext} from "./context/todo/todoContext";

export const MainLayout = () => {
	// экспорт value={{
	// 	// экспорт контекста
	// 	todos: state.todos
	// }} из src/context/todo/todoState
	const todoContext = useContext(TodoContext)
	
	const [todos, setTodos] = useState([])
	// выбранный экран
	const [todoId, setTodoId] = useState(null)
	
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
		setTodos(prev => [...prev,
			{
				id: Date.now().toString(),
				title: title
			}
		])//это короткая запись (так создается элемент todo и добавление в конец state)
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
			// todos={todos} по скольку есть этот ключ todos
			todos={todoContext.todos}
			addTodo={addTodo}
			removeTodo={removeTodo}/>
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
	)
}