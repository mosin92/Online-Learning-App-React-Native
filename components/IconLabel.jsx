import { View, Text, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants'

const IconLabel = ({ containerStyle, icon, iconStyle, label, labelStyle }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                ...containerStyle
            }}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                    ...iconStyle
                }}
            />

            <Text
                style={{
                    color: COLORS.gray30,
                    marginLeft: SIZES.radius,
                    ...FONTS.body3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>
        </View>
    )
}

export default IconLabel