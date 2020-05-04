import {ADD_TODO} from '../types'
import {REMOVE_TODO} from '../types'
import {UPDATE_TODO} from '../types'

export const todoReducer = (state, action) => {
	switch (action.type) {
		// добавление нового элемента todo
		case ADD_TODO:
			return {
				...state, todos: [...state.todos,
					{
						id: Date.now().toString(),
						title: action.title
					}
				]
			};
		case REMOVE_TODO:
			return state
		case UPDATE_TODO:
			return state
		default:
			return state
	}
}