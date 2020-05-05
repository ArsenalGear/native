import React, {useContext, useEffect, useCallback} from 'react'
import {FlatList, StyleSheet, View, Image, Dimensions} from 'react-native'
import {Todo} from "../components/Todo";
import {AddTodo} from "../components/AddTodo"
import {THEME} from "../theme";
import {TodoContext} from "../context/todo/todoContext";
import {ScreenContext} from "../context/screen/screenContext";
import {AppLoader} from "../components/ui/AppLoader";
import {AppText} from "../components/ui/AppText";
import {AppButton} from "../components/ui/AppButton";

export const MainScreen = () => {
	const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext)
	const {changeScreen} = useContext(ScreenContext)
	const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL;
	// получение данных с сервера
	const loadTodos = useCallback(async() => await fetchTodos(), [fetchTodos])
	
	useEffect(() => {
		loadTodos()
	}, [])
	
	if (loading) {
		return <AppLoader/>
	}
	if (error) {
		return <View style={styles.center}>
			<AppText style={styles.error}>
				{error}
			</AppText>
			<AppButton onPress={loadTodos}>
			Повторить
			</AppButton>
		</View>
	}
	
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
									onOpen={changeScreen}
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
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	error: {
		fontSize: 20,
		color: THEME.DANGER_COLOR
	}
})