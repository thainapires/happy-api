import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {Feather} from '@expo/vector-icons';
import mapMarker from '../images/map-marker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Library{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function LibrariesMap(){

    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../images/hapy.jpg')}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#29B6D1'
    },

    logo:{
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

});
