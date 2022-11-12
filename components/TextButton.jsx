import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../constants'

const TextButton = ({ containerStyle, label, labelStyle, onPress, disabled }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                ...containerStyle
            }}
            disabled={disabled}
            onPress={onPress}
        >
            <Text
                style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                    ...labelStyle
                }}
            >{label}</Text>
        </TouchableOpacity>
    )
}

export default TextButton