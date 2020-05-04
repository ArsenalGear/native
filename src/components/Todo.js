import React from 'react'
import { View, StyleSheet, TouchableOpacity} from 'react-native'
import {AppText} from "./ui/AppText";

export const Todo = ({todo, onRemove, onOpen}) => {
	const longPressHandler = () => {
		onRemove(todo.id)
	}
	
	return (
		<TouchableOpacity activeOpacity={0.3}
			// передача callback функции
			// onPress={()=> Alert.alert('поле не должно быть пустым  ')}
			// 			  onPress={() => console.log('pressed', todo.id)}
						  onPress={() => onOpen(todo.id)}
			// передача callback функции иначе вызывется сразу а нам это не нужно
			// 			  onLongPress={() => onRemove(todo.id)}
			// или передать через отдельную функцию longPressHandler
						  onLongPress={longPressHandler}
		>
			<View style={styles.todo}>
				<AppText >{todo.title}</AppText>
			</View>
		</TouchableOpacity>
	
	)
}

const styles = StyleSheet.create({
	todo: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 5,
		marginBottom: 10,
	},
	
})