import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LibrariesMap from './pages/LibrariesMap';
import LibraryDetails from './pages/LibraryDetails';

const {Navigator, Screen} = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false}}>
                <Screen name="LibrariesMap" component={LibrariesMap} />
                <Screen name="LibraryDetails" component={LibraryDetails} />
            </Navigator>
        </NavigationContainer>
    );
}