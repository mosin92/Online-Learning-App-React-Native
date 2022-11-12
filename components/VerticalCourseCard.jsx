import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import IconLabel from './IconLabel'

const VerticalCourseCard = ({ containerStyle, course }) => {
    return (
        <TouchableOpacity
            style={{
                width: 280,
                ...containerStyle
            }}
        >
            {/* thumbnail */}
            <Image
                source={course.thumbnail}
                resizeMode='cover'
                style={{
                    width: '100%',
                    height: 150,
                    marginBottom: SIZES.radius,
                    borderRadius: SIZES.radius,
                }}
            />

            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                {/* Play */}
                <View
                    style={{
                        height: 45,
                        width: 45,
                        justifyContent: "center",
                        alignItems: 'center',
                        borderRadius: 25,
                        backgroundColor: COLORS.primary
                    }}
                >
                    <Image
                        source={icons.play}
                        resizeMode='contain'
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />

                </View>

                {/* Info */}
                <View
                    style={{
                        flexShrink: 1,
                        paddingHorizontal: SIZES.radius
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.black,
                            ...FONTS.h3,
                            fontSize: 18,
                        }}
                    >
                        {course.title}
                    </Text>

                    <IconLabel
                        icon={icons.time}
                        label={course.duration}
                        containerStyle={{
                            marginTop: SIZES.base
                        }}
                    />
                </View>
            </View>


        </TouchableOpacity>
    )
}

export default VerticalCourseCard