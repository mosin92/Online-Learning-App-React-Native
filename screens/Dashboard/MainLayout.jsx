import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Animated, TouchableOpacity, Image } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, constants, FONTS, SIZES, } from '../../constants'
import { Home, Profile, Search } from '../../screens'
import { useSelector } from 'react-redux'


const bottom_tabs = constants.bottom_tabs.map(items => (
    {
        ...items,
        ref: React.createRef()
    }
))

const TabIndicator = ({ measureLayout, ScrollX }) => {

    const inputRange = bottom_tabs.map((_, i) => i * SIZES.width)

    const tabIndicator = ScrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.width)
    })

    const translateX = ScrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    })

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: 0,
                width: tabIndicator,
                height: '100%',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                transform: [
                    {
                        translateX
                    }
                ]
            }}
        />

    )
}
const Tabs = ({ ScrollX, onBottomTabPress }) => {

    const containerRef = useRef()
    const [measureLayout, setmeasureLayout] = useState([])

    useEffect(() => {

        let data = []

        bottom_tabs.forEach(tabs => {
            tabs?.ref?.current?.measureLayout(
                containerRef.current,
                (x, y, width, heigth) => {
                    data.push({
                        x, y, width, heigth
                    })

                    if (data.length === bottom_tabs.length)
                        setmeasureLayout(data)
                }
            )
        })
    }, [containerRef.current])


    return (
        <View
            ref={containerRef}
            style={{
                flex: 1,
                flexDirection: 'row',
            }}
        >
            {measureLayout.length > 0 &&

                <TabIndicator measureLayout={measureLayout} ScrollX={ScrollX} />
            }

            {
                bottom_tabs.map((items, i) => (

                    <TouchableOpacity
                        key={`bottom_tabs${items.id}`}
                        ref={items.ref}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                            paddingHorizontal: 15
                        }}
                        onPress={() => onBottomTabPress(i)}
                    >
                        <Image
                            resizeMode='contain'
                            source={items.icon}
                            style={{
                                width: 25,
                                height: 25
                            }}
                        />


                        <Text
                            style={{
                                marginTop: 3,
                                color: COLORS.white,
                                ...FONTS.h3
                            }}
                        >
                            {items.label}
                        </Text>

                    </TouchableOpacity>
                ))
            }
        </View>
    )
}


const MainLayout = () => {

    const appTheme = useSelector(state => state.appTheme)
    const flatlistRef = useRef()
    const ScrollX = useRef(new Animated.Value(0)).current

    const onBottomTabPress = (index) => {
        console.log("88")
        flatlistRef?.current.scrollToOffset({
            offset: index * SIZES.width
        })
    }

    const renderContent = () => {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <Animated.FlatList
                    ref={flatlistRef}
                    scrollEnabled={false}
                    horizontal
                    data={constants.bottom_tabs}
                    keyExtractor={item => `key-${item.id}`}
                    pagingEnabled
                    snapToInterval={SIZES.width}
                    decelerationRate='fast'
                    snapToAlignment={"center"}
                    showsHorizontalScrollIndicator={false}
                    onScroll={
                        Animated.event([
                            { nativeEvent: { contentOffset: { x: ScrollX } } }
                        ], {
                            useNativeDriver: false
                        })
                    }

                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    height: SIZES.height,
                                    width: SIZES.width
                                }}
                            >
                                {item.label === constants.screens.home && <Home />}
                                {item.label === constants.screens.search && <Search />}
                                {item.label === constants.screens.profile && <Profile />}

                            </View>
                        )
                    }}
                />

            </View>
        )
    }

    const renderBottomTabs = () => {
        return (
            <View
                style={{
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.base,
                    height: 105,
                    width: "100%",
                    backgroundColor: appTheme?.backgroundColor1
                }}
            >
                <Shadow
                    distance={8}
                    containerViewStyle={{ marginVertical: 20 }}
                    radius={8}
                >
                    <View
                        style={{
                            backgroundColor:appTheme?.backgroundColor2,
                            flex: 1,
                            borderRadius: SIZES.radius,
                            width: SIZES.width - (SIZES.padding * 2)
                        }}
                    >

                        <Tabs onBottomTabPress={onBottomTabPress} ScrollX={ScrollX} />

                    </View>
                </Shadow>



            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Content */}
            {renderContent()}

            {/* Bottom Tabs */}
            {renderBottomTabs()}
        </View>
    )
}

export default MainLayout