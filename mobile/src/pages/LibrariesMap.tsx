import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
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

    const [libraries, setLibraries] = useState<Library[]>([]); 
    const navigation = useNavigation();

    useFocusEffect(() => {
      api.get('libraries').then(response => {
        setLibraries(response.data);
      });
    });

    function handleNavigateToLibraryDetails(id: number){
        navigation.navigate('LibraryDetails', {id});
    }
    function handleNavigateToCreateLibrary(){
        navigation.navigate('SelectMapPosition');
    }
    
    return(
        <View style={styles.container}>
          <MapView 
          style={styles.map} 
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude:-22.8931889,
            longitude:-43.2464443,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}>

          {libraries.map(library => {
            return (
              <Marker 
                key={library.id}
                icon={mapMarker}
                calloutAnchor={{
                  x: 2.7,
                  y: 0.8,
                }}
                coordinate={{
                  latitude:library.latitude,
                  longitude: library.longitude,
                }}
              >
                <Callout tooltip={true} onPress={() => handleNavigateToLibraryDetails(library.id)}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{library.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{libraries.length} bibliotecas encontradas</Text>
        <RectButton style={styles.createLibraryButton} onPress={handleNavigateToCreateLibrary}>
            <Feather name="plus" size={20} color="#FFF"/>
        </RectButton>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
  
    calloutText:{
      color: '#0089A5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
    },
  
    footer:{
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
      backgroundColor: '#FFF',
      borderRadius:20,
      height: 46,
      paddingLeft: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation:3,
    },
  
    footerText:{
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold',
    },
  
    createLibraryButton:{
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });  
