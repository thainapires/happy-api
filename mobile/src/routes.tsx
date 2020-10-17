import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LibrariesMap from './pages/LibrariesMap';
import Landing from './pages/Landing';

import LibraryDetails from './pages/LibraryDetails';

import SelectMapPosition from './pages/CreateLibrary/SelectMapPosition';
import LibraryData from './pages/CreateLibrary/LibraryData';

import Header from './components/Header';


const {Navigator, Screen} = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'}}}>
                
                <Screen name="LibrariesMap" component={LibrariesMap} />
                
                <Screen name="LibraryDetails" 
                    component={LibraryDetails} 
                    options={{headerShown: true, 
                    header: () => <Header showCancel={false} title="Biblioteca"/>
                    }} 
                />
                <Screen name="SelectMapPosition" 
                    component={SelectMapPosition} 
                    options={{headerShown: true, 
                        header: () => <Header title="Selecione no mapa"/>
                    }} 
                />
                <Screen name="LibraryData" 
                    component={LibraryData} 
                    options={{headerShown: true, 
                        header: () => <Header title="Informe os dados"/>
                    }} 
                />
            </Navigator>
        </NavigationContainer>
    );
}