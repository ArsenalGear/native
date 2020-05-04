import React, {useReducer} from 'react'
import {TodoContext} from './todoContext'
import {todoReducer} from './todoReducer'

export const TodoState = ({children}) => {
	
	const initialState = {
		todos: [{id: '1', title: 'выучить React Native'}]
	}
	
	// названия любые стейт и ф-я диспатч меняющая стейт через редьсер
	const [state, dispatch] = useReducer(todoReducer, initialState)
	
	return <TodoContext.Provider
		value={{
			// экспорт контекста
			todos: state.todos
		}}>
		{children}</TodoContext.Provider>
}