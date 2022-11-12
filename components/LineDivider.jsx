import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const LineDivider = ({ lineStyle }) => {
    return (
        <View
            style={{
                height: 2,
                backgroundColor: COLORS.gray20,
                width: '100%',
                ...lineStyle
            }}
        />
    )
}

export default LineDivider