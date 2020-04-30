import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {Navbar} from "./src/Navbar";
import {AddTodo} from "./src/AddTodo";
import {Todo} from "./src/Todo";

export default function App() {
	const [todos, setTodos] = useState([])
	
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
	
	return (
		<View style={{flex: 1}}>
			{/*передача props*/}
			<Navbar title="Todo App!"></Navbar>
			
				{/*111111  передаем сюда функцию но без скобок которая будет вызвана когда мы нажмем
				на добавление и она будет менять сам стейт - невызывем передаем референс*/}
				
				{/*4444 после передаем через параметр имя любое onSubmit*/}
				<AddTodo  onSubmit={addTodo}/>
				
				{/*замена скрола*/}
				<FlatList style={styles.container } data={todos}
						  keyExtractor={item => item.id.toString()}
				renderItem={({item} )=>(<Todo todo={item} />)}
				/>
				
				{/*без скрола*/}
				{/*/!*обработка кнопки*!/*/}
				{/*<ScrollView>*/}
				{/*<View>*/}
				{/*/!*	/!*{ todos.map(*!/*!/*/}
				{/*/!*	/!*	todo => {*!/*!/*/}
				{/*/!*	/!*		// return <Text key={todo.id}>{todo.title}</Text>*!/*!/*/}
				{/*/!*	/!*		// передаем параметр todo который совпадает со значением todo*!/*!/*/}
				{/*/!*	/!*		return <Todo todo={todo} key={todo.id}/>*!/*!/*/}
				{/*/!*	/!*	}*!/*!/*/}
				{/*/!*	/!*) }*!/*!/*/}
				{/*/!*	*!/*/}
				{/*/!*	/!*88888 вывод тудушек по изменению хука укороченая запись*!/*!/*/}
				{/*	{todos.map(todo => (*/}
				{/*			<Todo todo={todo} key={todo.id}/>*/}
				{/*		)*/}
				{/*	)}*/}
				{/*</View>*/}
				{/*</ScrollView>*/}
			
			
			{/*<Text>Open up App.js to start working on your ap!</Text>*/}
			{/*<Text style={styles.text }>Open up App.js to start working on y </Text>*/}
			{/*<Text style={{color: 'green'}}>Open up App.js to start working on your аapp1231231!</Text>*/}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
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
