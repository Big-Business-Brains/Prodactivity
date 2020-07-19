import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import RoutineView from './RoutineView';
import RoutineDTO from '../../../models/RoutineDTO';

type RoutineListProps = {
    routines: RoutineDTO[];
};

const RoutineListView = (props: RoutineListProps) => {
    return (
        <FlatList
            data={props.routines}
            renderItem={({ item }) => <RoutineView title={item.name} />}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

const styles = StyleSheet.create({});

export default RoutineListView;
