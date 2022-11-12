import { TouchableOpacity, ImageBackground, Text } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants'

const CategoryCard = ({ containerStyle, category }) => {
    return (
        <TouchableOpacity>
            <ImageBackground
                resizeMode='cover'
                source={category?.thumbnail}
                style={{
                    height: 150,
                    width: 200,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: SIZES.padding,
                    justifyContent: 'flex-end',
                    ...containerStyle
                }}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        ...FONTS.h2
                    }}
                >
                    {category.title}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default CategoryCard