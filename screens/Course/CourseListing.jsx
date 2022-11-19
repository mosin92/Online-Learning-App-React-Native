import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, { useRef } from 'react'
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { COLORS, dummyData, FONTS, icons, images, SIZES } from '../../constants'
import { SharedElement } from 'react-navigation-shared-element'
import { FilterModal, HorizontalCourseCard, IconButton, LineDivider } from '../../components'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const CourseListing = ({ navigation, route }) => {

    const HeaderHeight = 250;
    const { category, sharedElmentPrefix } = route.params

    const AnimatedSharedvalue = useSharedValue(80)
    const modalSharedValue1 = useSharedValue(SIZES.height)
    const modalSharedValue2 = useSharedValue(SIZES.height)

    const flatlistRef = useRef()
    const ScrollY = useSharedValue(0)

    const onScroll = useAnimatedScrollHandler((event) => {
        ScrollY.value = event.contentOffset.y
    })
    const BackHandler = () => {
        navigation.goBack()
    }

    function renderHeader() {

        const inputRange = [0, HeaderHeight - 50]

        AnimatedSharedvalue.value = withDelay(
            500,
            withTiming(0, {
                duration: 500
            })
        )

        const headerAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(AnimatedSharedvalue.value, [80, 0], [0, 1])
            }
        })

        const headerTranslateStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateY: AnimatedSharedvalue.value
                    }
                ]
            }
        })

        const headerHeightAnimated = useAnimatedStyle(() => {
            return {
                height: interpolate(ScrollY.value, inputRange, [HeaderHeight, 120], Extrapolate.CLAMP)
            }
        })

        const headerHideonScroll = useAnimatedStyle(() => {
            return {
                opacity: interpolate(ScrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
                transform: [
                    {
                        translateY: interpolate(ScrollY.value, inputRange, [0, 200], Extrapolate.CLAMP)
                    }
                ]
            }
        })

        const headerTitleAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(ScrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
                transform: [
                    {
                        translateY: interpolate(ScrollY.value, inputRange, [50, 130], Extrapolate.CLAMP)
                    }
                ]
            }
        })



        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 250,
                    overflow: 'hidden'
                }, headerHeightAnimated]}
            >
                {/* background */}
                <SharedElement
                    id={`${sharedElmentPrefix}-category-image-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Image
                        resizeMode='cover'
                        source={category?.thumbnail}
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            borderBottomLeftRadius: 60
                        }}
                    />
                </SharedElement>

                {/* Title */}

                <Animated.View
                    style={[{
                        position: 'absolute',
                        bottom: 70,
                        left: 30,
                    }, headerHideonScroll]}
                >
                    <SharedElement
                        id={`${sharedElmentPrefix}-category-title-${category?.id}`}
                        style={[StyleSheet.absoluteFillObject]}
                    >
                        <Text
                            style={{
                                position: 'absolute',
                                color: COLORS.white,
                                ...FONTS.h1
                            }}
                        >
                            {category.title}
                        </Text>

                    </SharedElement>
                </Animated.View>

                {/* Animated Title onScroll */}

                <Animated.View
                    style={[{
                        position: 'absolute',
                        top: -80,
                        left: 0,
                        right: 0
                    }, headerTitleAnimatedStyle]}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            textAlign: 'center',
                            ...FONTS.h1
                        }}
                    >
                        {category.title}
                    </Text>

                </Animated.View>

                {/* Back Button */}

                <Animated.View
                    style={headerAnimatedStyle}
                >
                    <IconButton
                        icon={icons.back}
                        containerStyle={{
                            position: 'absolute',
                            top: 40,
                            left: 20,
                            backgroundColor: COLORS.white,
                            width: 50,
                            height: 50,
                            borderRadius: 30
                        }}
                        onPress={() => {

                            if (ScrollY.value > 0 && ScrollY.value <= 200) {
                                flatlistRef.current.scrollToOffset({
                                    offset: 0,
                                    animated: true
                                })

                                setTimeout(() => {
                                    AnimatedSharedvalue.value = withTiming(80, {
                                        duration: 500,

                                    }, () => {
                                        runOnJS(BackHandler)()
                                    })
                                }, 100);
                            }
                            else {
                                BackHandler()
                            }

                        }}
                    />

                </Animated.View>

                {/* Category Image */}

                <Animated.Image
                    source={images.mobile_image}
                    style={[{
                        position: 'absolute',
                        right: 30,
                        bottom: -40,
                        width: 100,
                        height: 200
                    }, headerAnimatedStyle, headerTranslateStyle, headerHideonScroll]}
                />
            </Animated.View >
        )
    }

    const renderResults = () => {
        return (
            <AnimatedFlatList
                ref={flatlistRef}
                data={dummyData.courses_list_2}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => `key-${item.id}`}
                scrollEventThrottle={16}
                keyboardDismissMode='on-drag'
                onScroll={onScroll}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.radius
                }}
                ListHeaderComponent={
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 270,
                            marginBottom: SIZES.base,
                        }}
                    >
                        <Text
                            style={{
                                flex: 1,
                                color: COLORS.black,
                                ...FONTS.h3
                            }}
                        >
                            3,765 Results
                        </Text>

                        {/* filter */}

                        <IconButton
                            icon={icons.filter}
                            containerStyle={{
                                height: 40,
                                width: 40,
                                borderRadius: 10,
                                backgroundColor: COLORS.primary
                            }}
                            onPress={() => {
                                modalSharedValue1.value = withTiming(0, {
                                    duration: 100
                                })

                                modalSharedValue2.value = withDelay(100,
                                    withTiming(0, {
                                        duration: 500
                                    })
                                )
                            }}
                        />

                    </View>
                }

                renderItem={({ item, index }) => (
                    <HorizontalCourseCard
                        course={item}
                        containerStyle={{
                            marginVertical: SIZES.padding,
                            marginTop: index === 0 ? SIZES.radius : SIZES.padding
                        }}
                    />
                )}

                ItemSeparatorComponent={
                    <LineDivider
                        lineStyle={{
                            backgroundColor: COLORS.gray20
                        }}
                    />
                }
            />
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* list & result */}
            {renderResults()}
            {/* header */}

            {renderHeader()}

            {/* filter modal */}
            <FilterModal
                modalSharedValue1={modalSharedValue1}
                modalSharedValue2={modalSharedValue2}
            />

        </View>
    )
}

CourseListing.sharedElements = (route, otherRoute, showing) => {
    const { category, sharedElmentPrefix } = route.params;
    return [
        {
            id: `${sharedElmentPrefix}-category-title-${category?.id}`
        },
        {
            id: `${sharedElmentPrefix}-category-image-${category?.id}`
        }
    ]
}

export default CourseListing