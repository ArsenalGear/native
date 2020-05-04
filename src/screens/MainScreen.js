import React from 'react'
import {FlatList, StyleSheet, View, Image, Dimensions} from 'react-native'
import {Todo} from "../components/Todo";
import {AddTodo} from "../components/AddTodo"
import {THEME} from "../theme";

export const MainScreen = ({addTodo, todos, removeTodo, openTodo}) => {
	
	const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL;
	
	let content = (
		// задать контейнеру View ширину в зависимости от величины экрана
		<View style={{width: width}}>
			
			{/*замена скрола*/}
			<FlatList style={styles.container}
					  data={todos}
					  keyExtractor={item => item.id.toString()}
					  renderItem={
						  ({item}) => (
							  <Todo  todo={item}
									onOpen={openTodo}
									onRemove={removeTodo}/>)
					  }
			/>
		</View>
	);
	
	if (todos.length === 0) {
		content = (
			<View style={styles.imgWrap}>
				<Image style={styles.image}
					   source={require('../../assets/no-items.png')}
					// source={{
					// 	uri:
					// 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
					// }}
				/>
			</View>
		)
	}
	
	return (
		<View>
			{/*111111  передаем сюда функцию но без скобок которая будет вызвана когда мы нажмем
				на добавление и она будет менять сам стейт - невызывем передаем референс*/}
			
			{/*4444 после передаем через параметр имя любое onSubmit*/}
			<AddTodo onSubmit={addTodo}/>
			
			{content}
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
		</View>
	)
}

const styles = StyleSheet.create({
	
	container: {
		paddingLeft: 10
	},
	
	imgWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		height: 300,
	},
	
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain'
	}
})