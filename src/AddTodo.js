import React, {useState } from 'react'
import {View, StyleSheet, TextInput, Button, Alert} from 'react-native'

// 55555 вызывается метод onSubmit сюда передается функция addTodo
export const  AddTodo = ({onSubmit}) => {
	const [value, setValue] = useState('')
	// 666666
	const pressHandler = () => {
		if(value.trim()) {
			onSubmit(value)
			setValue('')
		} else {
			Alert.alert('поле не должно быть пустым  ')
		}
		
	}
	
	return (
		<View style={styles.block}>
			<TextInput style={styles.input}
					   //onChangeText из документации к ReactNative
					   // onChangeText={text =>setValue(text)}
				// можно сократить до
					   onChangeText={setValue}
					   value={value}
					   autoCorrect={true}
					   keyboardType="numeric"
					   autoCapitalize="none"
					   placeholder="Введите название дела..."
			/>
			{/*77777 передаем без скобок чтобы не вызвалась*/}
			<Button title="Добавить" onPress={pressHandler}/>
		</View>
	)
}

const styles = StyleSheet.create({
	block: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	
	input: {
		width: '70%',
		borderStyle: 'solid',
		padding: 10,
		// borderWidth: 2,
		// borderColor: '#3949ab',
		borderBottomWidth: 2,
		borderBottomColor: '#3949ab',
	}
})