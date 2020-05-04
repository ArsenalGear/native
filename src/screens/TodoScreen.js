import React, {useState} from 'react'
//Адаптивность
import {StyleSheet, View, Dimensions} from 'react-native'
import {THEME} from '../theme'
import {AppCard} from '../components/ui/AppCard'
import {AppButton} from '../components/ui/AppButton'
import {EditModal} from "../components/EditModal";
import {AppTextBold} from "../components/ui/AppTextBold";
import {AntDesign, FontAwesome} from '@expo/vector-icons'

export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {
	
	const [modal, setModal] = useState(false)
	
	const saveHandler = (title) => {
		// вызываем метод который приходит из app компонента
		onSave(todo.id, title)
		setModal(false)
	}
	
	return (
		<View style={styles.buttonsView}>
			{/*модалка редактирования*/}
			<EditModal visible={modal}
				// сохранение данных из инпута модалки
					   onSave={saveHandler}
				
				// передача данных title в input модалки для редактирования
					   value={todo.title}
				// закрытие модалки
					   onCancel={() => setModal(false)}/>
			{/*Обертка для элементов*/}
			{/*передача стиля в обертку из компонента*/}
			<AppCard style={styles.card}>
				<AppTextBold style={styles.title}>{todo.title}</AppTextBold>
				<AppButton onPress={() => setModal(true)}>
					<FontAwesome name='edit' size={20}/>
				</AppButton>
			</AppCard>
			
			<View style={styles.buttons}>
				<View style={styles.button}>
					{/*кастомная кнопка*/}
					<AppButton color={THEME.GREY_COLOR} color={THEME.GREY_COLOR} onPress={goBack}>
						<AntDesign name='back' size={20} color='#fff'/>
					</AppButton>
				</View>
				<View style={styles.button}>
					<AppButton
						color={THEME.DANGER_COLOR}
						onPress={() => onRemove(todo.id)}> <FontAwesome color='#fff' name='remove' size={20}/>
					</AppButton>
				</View>
			</View>
		
		</View>
	)
}

const styles = StyleSheet.create({
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between'
		// paddingHorizontal: 20
	},
	button: {
		// width: '45%'
		// Адаптивность 2 параметра window = ширина устройства
		// взять ширину устройства и разделить на 2.5
		// width: Dimensions.get('window').width / 2.5
		width: Dimensions.get('window').width > 400 ? 150 : 100
		
		// или screen
	},
	buttonsView: {
		marginVertical: 20,
		paddingHorizontal: 20
	},
	title: {
		fontSize: 20
	},
	card: {
		marginBottom: 20,
		padding: 15
	}
})