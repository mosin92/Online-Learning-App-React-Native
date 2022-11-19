import { View, Text, Image, TextInput } from 'react-native'
import React, { useRef } from 'react'
import { COLORS, dummyData, FONTS, icons, SIZES } from '../../constants'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, interpolate, Extrapolate } from 'react-native-reanimated'
import { FlatList } from 'react-native-gesture-handler'
import { CategoryCard, TextButton } from '../../components'
import { Shadow } from 'react-native-shadow-2'
import { useNavigation } from '@react-navigation/native'

const Search = () => {

    const navigation = useNavigation()
    const scrollviewRef = useRef()
    const ScrollY = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler(event => {
        ScrollY.value = event.contentOffset.y
    })



    const renderTopSearch = () => {
        return (
            <View
            >

                <Text
                    style={{
                        color: COLORS.black,
                        paddingHorizontal: SIZES.padding,
                        ...FONTS.h2
                    }}
                >
                    Top Searches
                </Text>

                <FlatList
                    data={dummyData.top_searches}
                    listKey='topsearch'
                    keyExtractor={item => `topsearch-${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius
                    }}
                    renderItem={({ item, index }) => (
                        <TextButton
                            label={item.label}
                            containerStyle={{
                                backgroundColor: COLORS.gray10,
                                borderRadius: SIZES.radius,
                                paddingHorizontal: SIZES.padding,
                                paddingVertical: SIZES.radius,
                                marginLeft: index === 0 ? SIZES.padding : SIZES.base,
                                marginRight: index === dummyData.top_searches.length - 1 ?
                                    SIZES.padding : 0
                            }}
                            labelStyle={{
                                color: COLORS.gray50
                            }}

                        />
                    )}

                />
            </View>
        )
    }

    const renderBrowseCourse = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <Text
                    style={{
                        color: COLORS.black,
                        ...FONTS.h2,
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    Browse Categories
                </Text>

                <FlatList
                    data={dummyData.categories}
                    numColumns={2}
                    listKey="BrowseCategory"
                    keyExtractor={item => `BrowseCategory-${item.id}`}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTopL: SIZES.radius,
                        paddingHorizontal: SIZES.padding
                    }}
                    keyboardDismissMode='on-drag'
                    renderItem={({ item, index }) => (
                        <CategoryCard
                            sharedElmentPrefix="Search"
                            category={item}
                            containerStyle={{
                                width: (SIZES.width - (SIZES.padding * 2) - SIZES.radius) / 2,
                                marginLeft: (index + 1) % 2 == 0 ? SIZES.radius : 0,
                                marginTop: SIZES.radius
                            }}
                            onPress={() => navigation.navigate("CourseListing", {
                                category: item, sharedElmentPrefix: "Search"
                            })}
                        />
                    )}
                />

            </View>
        )
    }

    const renderSearchBar = () => {
        const inputRange = [0, 55]
        const searchAnimatedStyle = useAnimatedStyle(() => (
            {
                height: interpolate(ScrollY.value, inputRange, [55, 0], Extrapolate.CLAMP),
                opacity: interpolate(ScrollY.value, inputRange, [1, 0], Extrapolate.CLAMP)

            }
        ))

        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 30,
                    left: 0,
                    right: 0,
                    height: 55,
                    paddingHorizontal: SIZES.padding
                }, searchAnimatedStyle]}
            >
                <Shadow
                    distance={2}
                >
                    <View
                        style={{
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            width: "100%",
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: SIZES.radius,
                            borderWidth: 1,
                            borderColor: COLORS.gray20

                        }}
                    >
                        <Image
                            source={icons.search}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.gray40
                            }}
                        />

                        <TextInput
                            style={{
                                flex: 1,
                                marginLeft: SIZES.base
                            }}
                            placeholderTextColor={COLORS.gray30}
                            placeholder={"Search for Topics, Courses & Educator"}
                        />
                    </View>
                </Shadow>
            </Animated.View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            <Animated.ScrollView
                ref={scrollviewRef}
                contentContainerStyle={{
                    marginTop: 100,
                    paddingBottom: 250
                }}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode='on-drag'
                scrollEventThrottle={16}
                onScroll={onScroll}
                onScrollEndDrag={(event) => {
                    if (event.nativeEvent.contentOffset.y > 10 &&
                        event.nativeEvent.contentOffset.y < 50) {
                        scrollviewRef?.current?.scrollTo({
                            x: 0,
                            y: 60,
                            animated: true
                        })
                    }
                }}

            >

                {/* Top Searches */}

                {renderTopSearch()}

                {/* Browse Courses */}

                {renderBrowseCourse()}

            </Animated.ScrollView>
            {renderSearchBar()}
        </View>
    )
}

export default Search