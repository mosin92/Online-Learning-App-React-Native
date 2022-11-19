import { TouchableOpacity, ImageBackground, Text, Image, View, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants'
import { SharedElement } from 'react-navigation-shared-element'
const CategoryCard = ({ sharedElmentPrefix, containerStyle, category, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: 200,
                height: 150,
                ...containerStyle
            }}
        >

            <SharedElement
                id={`${sharedElmentPrefix}-category-image-${category?.id}`}
                style={[StyleSheet.absoluteFillObject]}
            >
                <Image

                    source={category?.thumbnail}
                    resizeMode='cover'
                    style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: SIZES.radius,
                        justifyContent: 'flex-end',
                    }}
                />

            </SharedElement>

            {/* Title */}

            <View
                style={{
                    position: 'absolute',
                    bottom: 50,
                    left: 5
                }}
            >
                <SharedElement
                    id={`${sharedElmentPrefix}-category-title-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Text
                        style={{
                            position:'absolute',
                            color: COLORS.white,
                            ...FONTS.h3,
                            fontSize: 20
                        }}
                    >
                        {category.title}
                    </Text>
                </SharedElement>

            </View>

        </TouchableOpacity>
    )
}

export default CategoryCard