import React, {useReducer, useContext} from 'react'
import {TodoContext} from './todoContext'
import {Alert} from 'react-native'
import {todoReducer} from './todoReducer'
import {
	ADD_TODO,
	HIDE_LOADER,
	CLEAR_ERROR,
	REMOVE_TODO,
	SHOW_ERROR,
	SHOW_LOADER,
	UPDATE_TODO,
	FETCH_TODOS
} from "../types";
import {ScreenContext} from "../screen/screenContext";
import {Http} from '../../http'

export const TodoState = ({children}) => {
	
	const initialState = {
		todos: [],
		loading: false,
		error: null
	}
	
	const {changeScreen} = useContext(ScreenContext)
	
	// названия любые стейт и ф-я диспатч меняющая стейт через редьсер
	const [state, dispatch] = useReducer(todoReducer, initialState)
	
	const addTodo = async title => {
		const data = await Http.post('https://rn-todo-app-15daf.firebaseio.com/todos.json', {title})
		// предача id ответа
		dispatch({type: ADD_TODO, title: title, id: data.name})
	}
	
	const removeTodo = id => {
		const todo = state.todos.find(t => t.id === id)
		Alert.alert(
			'Удаление элемента',
			`Вы уверены что хотите удалить "${todo.title}" ?`,
			[
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
					onPress: async () => {
						/// удаление и показ пустого экрана
						changeScreen(null)
						await fetch(`https://rn-todo-app-15daf.firebaseio.com/todos/${id}.json`, {
							method: 'DELETE',
							headers: {'Content-Type': 'application/json'},
						})
						dispatch({type: REMOVE_TODO, id})
					}
				},
			],
			// клик по оверлею не закрывает модалку
			{cancelable: false},
		);
	}
	
	// получение todo с сервера
	const fetchTodos = async () => {
		showLoader()
		// если есть ошибка то приповторной загрузке убрать ее
		clearError()
		//обработка ошибок
		try {
			const responce = await fetch('https://rn-todo-app-15daf.firebaseio.com/todos.json', {
				headers: {'Content-Type': 'application/json'},
			})
			const data = await responce.json()
			// console.log('fetch data', data)
			const todos = Object.keys(data).map(key => ({...data[key], id: key}))
			dispatch({type: FETCH_TODOS, todos})
		} catch (e) {
			showError('что то не так...')
			console.log('e', e);
		} finally {
			hideLoader()
		}
	}
	
	const updateTodo = async (id, title) => {
		clearError()
		try {
			await fetch(`https://rn-todo-app-15daf.firebaseio.com/todos/${id}.json`, {
				method: 'PATCH',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({title}),
			})
			dispatch({type: UPDATE_TODO, id, title})
		} catch (e) {
			showError('что то не так...')
		} finally {
		
		}
		
	}
	
	const showLoader = () => dispatch({type: SHOW_LOADER})
	const hideLoader = () => dispatch({type: HIDE_LOADER})
	const showError = (error) => dispatch({type: SHOW_ERROR, error})
	const clearError = () => dispatch({type: CLEAR_ERROR})
	
	return <TodoContext.Provider
		value={{
			// экспорт контекста
			todos: state.todos,
			loading: state.loading,
			error: state.error,
			addTodo, removeTodo, updateTodo, fetchTodos
		}}>
		{children}</TodoContext.Provider>
}