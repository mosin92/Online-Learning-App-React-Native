import { View, Text, TouchableOpacity, Image, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'

const ProfileRadioButton = ({ icon, label, onPress, isSelected, value }) => {

    const radioAnimated = useRef(new Animated.Value(0)).current

    const lineColorAnimated = radioAnimated.interpolate({
        inputRange: [0, 17],
        outputRange: [COLORS.additionalColor4, COLORS.additionalColor13]
    })

    const CircleColorAnimated = radioAnimated.interpolate({
        inputRange: [0, 17],
        outputRange: [COLORS.gray40, COLORS.primary]
    })

    useEffect(() => {

        if (isSelected) {
            Animated.timing(radioAnimated, {
                toValue: 17,
                duration: 300,
                useNativeDriver: false
            }).start()
        }
        else {
            Animated.timing(radioAnimated, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start()
        }
    }, [isSelected])


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

                <Text
                    style={{
                        color: COLORS.black,
                        ...FONTS.h3
                    }}
                >
                    {label}
                </Text>
            </View>

            <TouchableOpacity
                style={{
                    height: 40,
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={onPress}
            >

                <Animated.View
                    style={{
                        width: '100%',
                        height: 5,
                        borderRadius: 3,
                        backgroundColor: lineColorAnimated
                    }}
                >
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: -10,
                            left: radioAnimated,
                            width: 25,
                            height: 25,
                            borderRadius: 15,
                            borderWidth: 5,
                            borderColor: CircleColorAnimated,
                            backgroundColor: COLORS.white
                        }}
                    />

                </Animated.View>
            </TouchableOpacity>

        </TouchableOpacity >
    )
}

export default ProfileRadioButton