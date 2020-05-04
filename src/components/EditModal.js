import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Button, Modal, Alert} from 'react-native'
import {THEME} from "../theme";
import {AppButton} from "./ui/AppButton";

// onCancel - функция меняющая state на главном экране
export const EditModal = ({visible, onCancel, value, onSave}) => {
	// редактирование из модалки
	const [title, setTitle] = useState(value)
	const saveHandler = () => {
		if (title.trim().length < 3) {
			Alert.alert('Ошибка', `Мин длинна 3 символа. Сейчас ${title.trim().length} символов`)
		} else {
			onSave(title)
		}
	}
	return (
		<Modal visible={visible} animationType="slide"
			// прозрачность
			   transparent={false}
		>
			<View style={styles.wrap}>
				<TextInput style={styles.input}
						   value={title}
					// изменение заголовка
						   onChangeText={setTitle}
						   placeholder='введите todo'
						   autoCapitalize="none"
						   autoCorrect={false}
						   maxLength={64}
				/>
				{/*передача функции вверх для вызова*/}
				<View style={styles.buttons}>
					
					<AppButton color={THEME.DANGER_COLOR} onPress={onCancel}>Отменить</AppButton>
					<AppButton onPress={saveHandler}> Сохранить </AppButton>
				</View>
			
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	
	input: {
		padding: 10,
		borderBottomColor: THEME.MAIN_COLOR,
		borderBottomWidth: 2,
		width: '80%'
	},
	buttons: {
		width: '100%',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
})