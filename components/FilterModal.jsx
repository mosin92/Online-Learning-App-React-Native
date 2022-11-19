import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, withDecay, withDelay, withTiming } from 'react-native-reanimated'
import { COLORS, constants, dummyData, FONTS, icons, images, SIZES } from '../constants'
import TextButton from './TextButton'
import LineDivider from './LineDivider'
import TwoPointSlider from './TwoPointSlider'


const ClassTypeOptions = ({ isSelected, classType, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                height: 100,
                width: 90,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.base,
                paddingHorizontal: SIZES.radius,
                backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor9,
                ...containerStyle
            }}
            onPress={onPress}
        >

            <Image
                source={classType?.icon}
                resizeMode='contain'
                style={{
                    height: 40,
                    width: 40,
                    tintColor: isSelected ? COLORS.white : COLORS.gray80
                }}
            />

            <Text
                style={{
                    marginTop: SIZES.base,
                    color: isSelected ? COLORS.white : COLORS.gray80
                }}
            >
                {classType?.label}
            </Text>

        </TouchableOpacity>
    )
}

const ClassLevelOptions = ({ isLastItem, isSelected, onPress, classLevel, containerStyle }) => {

    return (

        <>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                    ...containerStyle
                }}
                onPress={onPress}
            >

                <Text
                    style={{
                        flex: 1,
                        color: COLORS.black,
                        ...FONTS.body3
                    }}
                >
                    {classLevel.label}
                </Text>

                {/* radio Icon */}

                <Image
                    resizeMode='contain'
                    source={isSelected ? icons.checkbox_on : icons.checkbox_off}
                    style={{
                        width: 20,
                        height: 20
                    }}
                />

            </TouchableOpacity>

            {!isLastItem &&
                <LineDivider
                    lineStyle={{
                        height: 1,
                        backgroundColor: COLORS.gray20
                    }}
                />
            }
        </>

    )
}


const FilterModal = ({ modalSharedValue1, modalSharedValue2 }) => {

    const [selectedTypeClass, setSelectedtypeClass] = useState('')
    const [selectedClassLevel, setSelectedClassLevel] = useState("")
    const [selectedCreatedWithin, setSelectedCreatedWithin] = useState('')

    // main container Style
    const ModalContainerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(modalSharedValue1.value,
                [SIZES.height, 0], [1, 1]
            ),
            transform: [
                {
                    translateY: modalSharedValue1.value
                }
            ]
        }
    })

    // bg animated Style

    const ModalbgAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(modalSharedValue2.value,
                [SIZES.height, 0], [0, 1]
            )
        }
    })

    // animated Style content Container Style

    const ModalContentStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(modalSharedValue2.value,
                [SIZES.height, 0], [0, 1]
            ),
            transform: [
                {
                    translateY: modalSharedValue2.value
                }
            ]
        }
    })

    // UI renders

    const renderHeader = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding
                }}
            >

                <View
                    style={{
                        width: 60
                    }}
                />

                <Text
                    style={{
                        flex: 1,
                        color: COLORS.black,
                        textAlign: 'center',
                        ...FONTS.h1
                    }}
                >
                    Filter
                </Text>

                {/* cance btn */}

                <TextButton
                    label={"Cancel"}
                    labelStyle={{
                        color: COLORS.black,
                        ...FONTS.body3
                    }}

                    onPress={() => {
                        modalSharedValue2.value = withTiming(
                            SIZES.height, {
                            duration: 500
                        })

                        modalSharedValue1.value = withDelay(500, withTiming(SIZES.height, {
                            duration: 100
                        }))
                    }}
                />


            </View>
        )
    }

    const renderClassType = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >

                {/* title */}

                <Text
                    style={{
                        color: COLORS.black,
                        ...FONTS.h3
                    }}
                >
                    Class Type
                </Text>

                {/* Class Options */}

                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius
                    }}
                >
                    {
                        constants.class_types.map(
                            (items, index) => (
                                <ClassTypeOptions
                                    key={`ClassType-${index}`}
                                    classType={items}
                                    isSelected={selectedTypeClass === items.id}
                                    containerStyle={{
                                        marginLeft: index === 0 ? 0 : SIZES.base
                                    }}
                                    onPress={() => setSelectedtypeClass(items.id)}
                                />
                            )
                        )
                    }

                </View>

            </View>
        )
    }

    const renderClassLevel = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >

                {/* title */}

                <Text
                    style={{
                        color: COLORS.black,
                        ...FONTS.h3
                    }}
                >
                    Class Level
                </Text>

                {/* Class Levels Optons */}

                <View
                    style={{
                        // flexDirection: 'row'
                    }}
                >

                    {constants.class_levels.map(
                        (items, index) => (
                            <ClassLevelOptions
                                key={`Class-Level-${index}`}
                                classLevel={items}
                                isLastItem={index === constants.class_levels.length - 1}
                                isSelected={selectedClassLevel === items.id}
                                onPress={() => {
                                    setSelectedClassLevel(items.id)
                                }}
                            />
                        )
                    )}

                </View>
            </View>
        )
    }

    const renderCreatedWithIn = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                {/* title */}

                <Text
                    style={{
                        color: COLORS.black,
                        ...FONTS.h3
                    }}
                >
                    Created WithIn
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}
                >

                    {constants.created_within.map(
                        (item, index) => (
                            <TextButton
                                label={item.label}
                                key={`CreatedWithIn-${index}`}
                                containerStyle={{
                                    height: 35,
                                    paddingHorizontal: SIZES.radius,
                                    borderRadius: SIZES.radius,
                                    marginTop: SIZES.radius,
                                    backgroundColor: item.id === selectedCreatedWithin ? COLORS.primary3 : COLORS.white,
                                    borderColor: COLORS.gray20,
                                    borderWidth: 1,
                                    marginLeft: index % 3 === 0 ? 0 : SIZES.base
                                }}
                                labelStyle={{
                                    color: item.id === selectedCreatedWithin ? COLORS.white : COLORS.black,
                                    ...FONTS.body3
                                }}
                                onPress={() => setSelectedCreatedWithin(item.id)}
                            />
                        )
                    )}

                </View>

            </View>
        )
    }

    const renderClassLength = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                {/* title */}

                <Text
                    style={{
                        color: COLORS.black,
                        ...FONTS.h3
                    }}
                >
                    Class Length
                </Text>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TwoPointSlider
                        key={"Multi-Slider"}
                        min={15}
                        max={60}
                        value={[20, 50]}
                        onChange={(value) => console.log(value)}
                        // prefix="min"
                        postfix={"min"}
                    />
                </View>



            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    flexDirection: 'row',
                    marginBottom: SIZES.radius,
                    height: 50,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <TextButton
                    label={"Reset"}
                    containerStyle={{
                        flex: 1,
                        borderRadius: SIZES.radius,
                        borderWidth: 1,
                    }}

                    labelStyle={{
                        color: COLORS.black,
                        ...FONTS.h3
                    }}
                />

                <TextButton
                    label={"Apply"}
                    containerStyle={{
                        marginLeft: SIZES.base,
                        flex: 1,
                        borderRadius: SIZES.radius,
                        marginLeft:SIZES.radius,
                        backgroundColor: COLORS.primary
                    }}

                    labelStyle={{
                        color: COLORS.white,
                        ...FONTS.h3
                    }}
                />

            </View>
        )
    }
    // main container
    return (
        <Animated.View
            style={[{
                position: 'absolute',
                bottom: 0,
                height: SIZES.height,
                width: SIZES.width,
            }, ModalContainerAnimatedStyle]}
        >

            {/* background */}

            <Animated.View
                style={[{
                    flex: 1,
                    height: SIZES.height,
                    width: SIZES.width,
                    backgroundColor: COLORS.transparentBlack7
                }, ModalbgAnimatedStyle]}
            >

                {/* content container */}

                <Animated.View
                    style={[{
                        position: 'absolute',
                        bottom: 0,
                        height: SIZES.height * 0.9,
                        width: SIZES.width,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: COLORS.white,
                    }, ModalContentStyle]}
                >
                    {renderHeader()}

                    <ScrollView
                        contentContainerStyle={{
                            paddingHorizontal: SIZES.padding,
                            paddingBottom: SIZES.padding * 3,
                            flexGrow: 1
                        }}
                    >
                        {/* class type */}

                        {renderClassType()}

                        {/* Class Level */}

                        {renderClassLevel()}

                        {/* Craeted WithIn */}

                        {renderCreatedWithIn()}

                        {/* Class Length */}

                        {renderClassLength()}
                    </ScrollView>

                    {/* Footer */}
                    {renderFooter()}
                </Animated.View>


            </Animated.View>
        </Animated.View>
    )
}

export default FilterModal