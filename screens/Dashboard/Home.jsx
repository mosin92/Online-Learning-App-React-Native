import { View, Text, ScrollView, ImageBackground, Image } from 'react-native'
import React from 'react'
import { COLORS, dummyData, FONTS, icons, images, SIZES } from '../../constants'
import { CategoryCard, HorizontalCourseCard, IconButton, LineDivider, TextButton, VerticalCourseCard } from '../../components'
import { FlatList } from 'react-native-gesture-handler'


const Section = ({ title, containerStyle, children }) => {
    return (
        <View
            style={{
                ...containerStyle
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        color: COLORS.black,
                        flex: 1,
                        ...FONTS.h2
                    }}
                >
                    {title}
                </Text>

                <TextButton
                    label={"See All"}
                    containerStyle={{
                        backgroundColor: COLORS.primary,
                        width: 80,
                        borderRadius: 30
                    }}
                />
            </View>

            {children}
        </View>
    )
}

const Home = () => {

    const renderHeader = () => {
        return (
            <View

                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    justifyContent: 'space-between'
                }}
            >
                {/* Greeting */}

                <View>
                    <Text
                        style={{
                            color: COLORS.black,
                            ...FONTS.h2
                        }}

                    >
                        Hello, Mohsin Malik!
                    </Text>

                    <Text
                        style={{
                            color: COLORS.gray50,
                            ...FONTS.body3
                        }}
                    >
                        Sunday, 9th Sept 2021
                    </Text>
                </View>

                {/* Notification */}

                <IconButton
                    iconStyle={{
                        tintColor: COLORS.black
                    }}
                    icon={icons.notification}
                />
            </View>
        )
    }

    const renderStartLearning = () => {
        return (
            <ImageBackground
                source={images.featured_bg_image}
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 16,
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >

                {/* info */}
                <View>

                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.body2
                        }}

                    >
                        HOW TO</Text>

                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}
                    >
                        Make your brand more visible with our checklist
                    </Text>

                    <Text
                        style={{
                            marginTop: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.body4
                        }}
                    >
                        By Scott Harris
                    </Text>

                </View>

                {/* Image  */}
                <Image
                    source={images.start_learning}
                    style={{
                        width: '100%',
                        height: 110,
                        marginTop: SIZES.padding
                    }}
                />

                {/* Button */}
                <TextButton
                    label={"Start Learning"}
                    containerStyle={{
                        backgroundColor: COLORS.white,
                        height: 40,
                        width: 160,
                        borderRadius: 20
                    }}
                    labelStyle={{
                        color: COLORS.black
                    }}
                />
            </ImageBackground>
        )
    }

    const renderCourses = () => {
        return (
            <FlatList
                data={dummyData.courses_list_1}
                horizontal
                showsHorizontalScrollIndicator={false}
                listKey="Course"
                contentContainerStyle={{
                    marginTop: SIZES.padding
                }}
                keyExtractor={item => `course-${item.id}`}
                renderItem={({ item, index }) => (
                    <VerticalCourseCard
                        containerStyle={{
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index === dummyData.courses_list_1.length - 1 ?
                                SIZES.padding : 0,
                        }}
                        course={item}
                    />
                )}
            />
        )
    }

    const renderCategory = () => {
        return (
            <Section
                title={"Categories"}
            >
                <FlatList
                    data={dummyData.categories}
                    listKey="Categories"
                    keyExtractor={item => `categories-${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius
                    }}
                    renderItem={({ item, index }) => (
                        <CategoryCard
                            category={item}
                            containerStyle={{
                                marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                                marginRight: index === dummyData.categories.length - 1 ? SIZES.padding : 0
                            }}
                        />

                    )}
                />

            </Section>
        )
    }


    const renderPopularCourses = () => {
        return (
            <Section
                title={"Popular Courses"}
                containerStyle={{
                    marginTop: SIZES.padding
                }}
            >
                <FlatList
                    data={dummyData.courses_list_2}
                    listKey="popularCourses"
                    keyExtractor={item => `popularCourses-${item.id}`}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius,
                        paddingHorizontal: SIZES.padding
                    }}

                    ItemSeparatorComponent={() => (
                        <LineDivider
                            lineStyle={{
                                backgroundColor: COLORS.gray20
                            }}
                        />
                    )}
                    renderItem={({ item, index }) => (
                        <HorizontalCourseCard
                            course={item}
                            containerStyle={{
                                marginVertical: SIZES.padding,
                                marginTop: index === 0 ? SIZES.radius : SIZES.padding

                            }}
                        />
                    )}

                />

            </Section>
        )
    }


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* content */}
            <ScrollView
                scrollEnabled
                contentContainerStyle={{
                    paddingBottom: 160,
                    flexGrow: 1
                }}
            >

                {/* start learning  */}

                {renderStartLearning()}

                {/* courses */}

                {renderCourses()}

                <LineDivider
                    lineStyle={{
                        marginVertical: SIZES.padding
                    }}
                />

                {/* Categories */}

                {renderCategory()}

                {/* Popular course */}

                {renderPopularCourses()}
            </ScrollView>
        </View>
    )
}

export default Home