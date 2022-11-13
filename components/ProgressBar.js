import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'

const ProgressBar = ({ containerStyle, progress }) => {
    return (
        <View
            style={{
                width: '100%',
                height: 13,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...containerStyle
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    width: progress,
                    height: '100%',
                    left: 0,
                    backgroundColor: COLORS.primary,
                    borderRadius: SIZES.radius
                }}
            />
        </View>
    )
}

export default ProgressBar