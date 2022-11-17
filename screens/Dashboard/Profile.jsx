import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, icons, images, SIZES } from '../../constants'
import { IconButton, LineDivider, ProfileRadioButton, ProfileValue, ProgressBar, TextButton } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { ToggleTheme } from '../../Store/ThemeAction'

const Profile = () => {

    const dispatch = useDispatch()
    const [NewcourseNotification, setnewCourseNotification] = useState(false)
    const [studyReminder, setStudyReminder] = useState(false)

    const apptheme = useSelector(state => state.appTheme)
    console.log("----- app theme --- ", apptheme)

    // handler 

    const ToggleThemeHandler = () => {
        if (apptheme?.name == 'dark') {
            dispatch(ToggleTheme('light'))
        }
        else {
            dispatch(ToggleTheme('dark'))
        }
    }

    // render
    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 40,
                    paddingHorizontal: SIZES.padding
                }}
            >

                {/* title */}

                <Text
                    style={{
                        color: apptheme?.textColor,
                        ...FONTS.h2
                    }}
                >
                    Profile
                </Text>

                <IconButton
                    onPress={() => ToggleThemeHandler()}
                    icon={icons.sun}
                    iconStyle={{
                        tintColor: apptheme?.tintColor
                    }}
                />
            </View>
        )
    }


    const renderProfile = () => {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: apptheme?.backgroundColor2,
                    marginTop: SIZES.padding,
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    paddingVertical: 20
                }}
            >

                {/* Profile Image */}

                <TouchableOpacity
                    style={{
                        width: 80,
                        height: 80
                    }}
                >
                    <Image
                        resizeMode='contain'
                        source={images.profile}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 40,
                            borderColor: COLORS.white,
                            borderWidth: 1
                        }}
                    />

                    {/* camera icon */}


                    <View
                        style={{
                            width: "100%",
                            height: '100%',
                            position: 'absolute',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}
                    >

                        <View
                            style={{
                                width: 30,
                                height: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: COLORS.primary,
                                borderRadius: SIZES.padding,
                                marginBottom: -10
                            }}
                        >
                            <Image
                                source={icons.camera}
                                resizeMode='contain'
                                style={{
                                    width: 18,
                                    height: 18
                                }}
                            />

                        </View>

                    </View>

                </TouchableOpacity>

                {/* Detail */}

                <View
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        alignItems: 'flex-start'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}
                    >
                        Mohsin Malik
                    </Text>

                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.body4
                        }}
                    >
                        React Native Developer
                    </Text>

                    {/* Progress bar */}

                    <ProgressBar
                        containerStyle={{
                            marginTop: SIZES.radius
                        }}
                        progress={'58%'}
                    />

                    {/* overall progress */}

                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.base
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                                flex: 1,
                                ...FONTS.body4
                            }}
                        >
                            Overall Progress
                        </Text>

                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.body4
                            }}
                        >
                            58%
                        </Text>
                    </View>

                    {/* Member */}

                    <TextButton
                        label={"+ Become Member"}
                        containerStyle={{
                            backgroundColor: apptheme?.backgroundColor4,
                            borderRadius: SIZES.padding,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: SIZES.padding,
                            paddingHorizontal: SIZES.radius,
                            height: 35
                        }}
                        labelStyle={{
                            color: apptheme?.textColor2
                        }}
                    />


                </View>

            </View>
        )
    }

    const renderProfileSection1 = () => {
        return (
            <View
                style={styles.profileContainer}
            >
                <ProfileValue
                    icon={icons.profile}
                    label={"Mohsin Maliik"}
                    value={"React Native Dev"}
                />
                <LineDivider />

                <ProfileValue
                    icon={icons.email}
                    label={"Email"}
                    value={"mohsina994@gmail.com"}

                />

                <LineDivider />

                <ProfileValue
                    icon={icons.password}
                    label={"Password"}
                    value={"Updated 2 weeks ago"}

                />
                <LineDivider />

                <ProfileValue
                    icon={icons.call}
                    label={"Contact Number"}
                    value={"+923355427476"}
                />
            </View>
        )
    }

    const renderProfileSection2 = () => {
        return (
            <View
                style={styles.profileContainer}
            >
                <ProfileValue
                    icon={icons.star_1}
                    value={"Pages "}

                />
                <LineDivider />

                <ProfileRadioButton
                    icon={icons.new_icon}
                    label={'New course Notification'}
                    isSelected={NewcourseNotification}
                    onPress={() => {
                        setnewCourseNotification(!NewcourseNotification)
                    }}
                />
                <LineDivider />
                <ProfileRadioButton
                    icon={icons.new_icon}
                    label={'Study Reminder'}
                    isSelected={studyReminder}
                    onPress={() => {
                        setStudyReminder(!studyReminder)
                    }}
                />

            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: apptheme?.backgroundColor1
            }}
        >
            {/* header */}

            {renderHeader()}

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 250
                }}
            >

                {/* profile */}
                {renderProfile()}

                {/* Profile section 1 */}

                {renderProfileSection1()}

                {/* Profile Section2 */}

                {renderProfileSection2()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.gray20
    }
})
export default Profile