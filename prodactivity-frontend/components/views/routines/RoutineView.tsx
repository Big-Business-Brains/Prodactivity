import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

type RoutineProps = {
    title: string;
};

const RoutineView = (props: RoutineProps) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/icons/book.png')} style={styles.routineIcon} />
            <Text style={styles.text}>{props.title}</Text>
            <Image source={require('../../../assets/icons/dot-menu.png')} style={styles.menuIcon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        color: 'red',
        backgroundColor: 'white',
    },
    text: {
        flex: 1,
        fontFamily: 'NotoSansHK-Medium',
    },
    routineIcon: {
        marginRight: 15,
        height: 25,
        width: 25,
    },
    menuIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
});

export default RoutineView;
