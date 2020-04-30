import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

// export const Navbar = ({title}) => {
export const Navbar = (props) => {
	// стрелочная функция которая принимает props и возвращает jsx
	return (
		
		<View style={styles.navbar}>
			{/*прием свойств*/}
			{/*<Text style={styles.text}>{title}</Text>*/}
			<Text style={styles.text}>{props.title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	navbar: {
		height: 70,
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: '#3949aa',
		paddingBottom: 10
		
	},
	text: {
		color: 'white',
		fontSize: 20
	}
})