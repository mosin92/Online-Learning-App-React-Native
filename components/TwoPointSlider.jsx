import { View, Text } from 'react-native'
import React from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { COLORS, FONTS, SIZES } from '../constants'

const TwoPointSlider = ({ min, max, value, prefix, postfix, onChange }) => {
    return (
        <MultiSlider
            values={value}
            sliderLength={SIZES.width - (SIZES.padding * 3)}
            min={min}
            max={max}
            step={1}
            selectedStyle={{
                height: 2,
                backgroundColor: COLORS.primary
            }}
            valuePrefix="hi"
            valueSuffix='jdsd'
            markerOffsetY={25}
            trackStyle={{
                height: 1,
                backgroundColor: COLORS.gray30,
                borderRadius: 10
            }}
            customMarker={(e) => (
                <View
                    style={{
                        height: 60,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            height: 15,
                            width: 15,
                            backgroundColor: COLORS.white,
                            borderWidth: 2,
                            borderColor: COLORS.primary,
                            borderRadius: 10
                        }}
                    />

                    <Text
                        style={{
                            color: COLORS.gray80,
                            marginTop: 5,
                            ...FONTS.body3
                        }}
                    >
                        {prefix} {e.currentValue} {postfix}
                    </Text>

                </View>
            )}
            onValuesChange={(value) => onChange(value)}
        />
    )
}

export default TwoPointSlider