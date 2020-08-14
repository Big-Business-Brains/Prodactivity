import React, { useState } from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';

interface SelectableCircleProps {
    title: string;
    onPress: (day: string) => void;
    style: StyleProp<ViewStyle>;
}

/**
 * Displays a single selectable weekday
 * @param props
 */
const SelectableCircleView = (props: SelectableCircleProps): JSX.Element => {
    const [isSelected, setIsSelected] = React.useState<boolean>(false);

    const onPress = (): void => {
        setIsSelected(!isSelected);
        props.onPress(props.title);
    };

    return (
        <>
            <Text
                onPress={onPress}
                style={[
                    styles.container,
                    props.style,
                    isSelected ? styles.containerSelected : styles.containerDeselected,
                ]}>
                {props.title}
            </Text>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 35,
        height: 35,
        lineHeight: 32,
        borderRadius: 35 / 2,
        borderColor: 'gray',
        borderWidth: 0.5,
        overflow: 'hidden',
        textAlign: 'center',
        fontFamily: 'NotoSansHK-Medium',
    },
    containerDeselected: {},
    containerSelected: {
        backgroundColor: 'gray',
    },
});

export default SelectableCircleView;
