import { TouchableOpacity, Image } from 'react-native'
import React from 'react'

const IconButton = ({ containerStyle, icon, iconStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image
                resizeMode='contain'
                source={icon}
                style={{
                    width: 25,
                    height: 25,
                    ...iconStyle
                }}
            />
        </TouchableOpacity>
    )
}

export default IconButton