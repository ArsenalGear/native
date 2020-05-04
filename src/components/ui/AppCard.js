import React from 'react';
import {StyleSheet, View} from 'react-native'

// будем оборачивать в него другие элементы
// круглые скобки потому что возвращаем jsx и не пишем return
export const AppCard = props => (
	// передача стилей из обертки детям и из детей в обертку
	// которые могут перетереть родительские стили так как идут позже и ниже
	<View style={ {...styles.default, ...props.style} }>
		{/*их мы будем выводить внутри этого view*/}
		{/*их мы можем получить у параметра props и его поля props.children*/}
		{props.children}
		{/*<Text>23423</Text>*/}
	</View>
)

const styles = StyleSheet.create({
	default: {
		// borderWidth: 2,
		// borderColor: 'green',
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		
		// для ios
		shadowColor: '#000',
		shadowRadius: 2,
		shadowOpacity: 0.3,
		shadowOffset: {width: 2, height: 2},
		
		backgroundColor: '#fff',
		borderRadius: 10,
		
		// для андроид тени
		elevation: 8
	}
})