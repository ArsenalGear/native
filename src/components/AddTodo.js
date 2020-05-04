import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Alert, Keyboard} from 'react-native'
// expo vector icons
import {AntDesign} from '@expo/vector-icons'
import {THEME} from "../theme";

// 55555 вызывается метод onSubmit сюда передается функция addTodo
// фигурные скобки потому что функция
export const  AddTodo = ({onSubmit}) => {
	const [value, setValue] = useState('')
	// 666666
	const pressHandler = () => {
		if(value.trim()) {
			onSubmit(value)
			setValue('')
			// скрыть клавиатуру
			Keyboard.dismiss()
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
			
			{/*импорт кнопки с иконкой*/}
			<AntDesign.Button name='pluscircleo' onPress={pressHandler}>
				Добавить
			</AntDesign.Button>
			
			{/*запись без иконки*/}
			{/*<Button title="Добавить" onPress={pressHandler}/>*/}
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
		width: '60%',
		borderStyle: 'solid',
		padding: 10,
		// borderWidth: 2,
		// borderColor: '#3949ab',
		borderBottomWidth: 2,
		borderBottomColor: THEME.MAIN_COLOR,
	}
})