import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import { useSelector } from 'react-redux'

const ProfileValue = ({
    icon, label, value
}) => {

    const appTheme = useSelector(state => state.appTheme)

    return (

        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 80
            }}
        >

            <View

                style={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    backgroundColor: appTheme?.backgroundColor3
                }}
            >
                <Image
                    resizeMode='contain'
                    source={icon}
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.primary
                    }}
                />

            </View>

            <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius
                }}
            >

                {label &&

                    <Text
                        style={{
                            color: COLORS.gray30,
                            ...FONTS.body3
                        }}
                    >
                        {label}
                    </Text>
                }

                <Text
                    style={{
                        color: appTheme?.textColor,
                        ...FONTS.h3
                    }}
                >
                    {value}
                </Text>
            </View>

            <Image
                source={icons.right_arrow}
                style={{
                    width: 15,
                    height: 15,
                    tintColor: appTheme?.tintColor
                }}
            />

        </TouchableOpacity >
    )
}

export default ProfileValue