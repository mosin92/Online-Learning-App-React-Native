import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'

const ProfileValue = ({
    icon, label, value
}) => {

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
                    backgroundColor: COLORS.additionalColor11
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
                        color: COLORS.black,
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
                    height: 15
                }}
            />

        </TouchableOpacity >
    )
}

export default ProfileValue