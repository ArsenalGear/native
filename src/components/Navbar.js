import React from 'react'
import {View, StyleSheet, Platform} from 'react-native'
import {THEME} from '../theme'
import {AppTextBold} from "./ui/AppTextBold";

// export const Navbar = ({title}) => {
export const Navbar = (props) => {
	// стрелочная функция которая принимает props и возвращает jsx
	return (
		
		// Platform определение платформы
		<View style={{
			...styles.navbar, ...Platform.select({
				ios: styles.navbarIos,
				android: styles.navbarAndroid
			})
		}}>
			
			
			{/*прием свойств*/}
			{/*<Text style={styles.text}>{title}</Text>*/}
			<AppTextBold style={styles.text}>{props.title}</AppTextBold>
		</View>
	)
}

const styles = StyleSheet.create({
	navbar: {
		height: 70,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 10
		
	},
	// Platform определение платформы
	navbarAndroid: {
		backgroundColor: THEME.MAIN_COLOR,
	},
	navbarIos: {
		borderBottomColor: THEME.MAIN_COLOR,
		borderWidth: 1,
	},
	
	// Platform определение платформы
	text: {
		color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : 'white',
		fontSize: 20
	}
})