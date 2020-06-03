import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native';
import RoutineView from './RoutineView';
import RoutineViewModel from '../../../models/RoutineViewModel';

type RoutineListProps = {
    routines: RoutineViewModel[];
}

export default function RoutineListView(props: RoutineListProps) {
    return (
        <FlatList
            data={props.routines}
            renderItem={({ item }) => <RoutineView title={item.name}/>}
            keyExtractor={(item, index) => index.toString()}
        / >
    );
}

const styles = StyleSheet.create({
});