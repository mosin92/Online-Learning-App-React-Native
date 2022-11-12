import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import IconLabel from './IconLabel'

const HorizontalCourseCard = ({ containerStyle, course }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                ...containerStyle
            }}
        >
            {/* thumbnail */}

            <ImageBackground
                source={course.thumbnail}
                style={{
                    height: 130,
                    width: 130
                }}
                resizeMode='cover'
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        height: 30,
                        width: 30,
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source={icons.favourite}
                        resizeMode='contain'
                        style={{
                            height: 15,
                            width: 15,
                            tintColor: course?.is_favourite ? COLORS.secondary : COLORS.additionalColor4
                        }}
                    />
                </View>
            </ImageBackground>

            {/* info  */}

            <View
                style={{
                    marginLeft: SIZES.radius,
                    flex: 1
                }}
            >
                <Text
                    style={{
                        color: COLORS.black,
                        ...FONTS.h3,
                        fontSize: 18
                    }}
                >
                    {course.title}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.base
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.black,
                            ...FONTS.body4
                        }}
                    >
                        By {course.instructor}
                    </Text>

                    <IconLabel
                        icon={icons.time}
                        containerStyle={{
                            marginLeft: SIZES.base
                        }}
                        iconStyle={{
                            width: 15,
                            height: 15,
                        }}
                        label={course.duration}
                    />

                </View>

                {/* Ratting and price */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.base
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.primary,
                            ...FONTS.h2
                        }}
                    >
                        ${course.price}
                    </Text>

                    <IconLabel
                        icon={icons.star}
                        containerStyle={{
                            marginLeft: SIZES.base
                        }}
                        iconStyle={{
                            width: 15,
                            height: 15,
                        }}
                        labelStyle={{
                            color: COLORS.black,
                            ...FONTS.h3
                        }}
                        label={course.ratings}
                    />

                </View>

            </View>
        </TouchableOpacity>
    )
}

export default HorizontalCourseCard