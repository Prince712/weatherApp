import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import {useSelector} from 'react-redux';

export default function Map() {
  const MapInfo = useSelector(state => state.auth.map);
  
  return (
    <View style={styles.container}>
    {/*Render our MapView*/}
      <MapView
        style={styles.map}
        //specify our coordinates.
        initialRegion={{
          latitude: MapInfo.latitude,
          longitude: MapInfo.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          <MapView.Marker
            // coordinate={{latitude:data.coord.lat,
            // longitude: data.coord.lon}}
            coordinate={{latitude:MapInfo.latitude,
            longitude: MapInfo.longitude}}
            // title={"Your city"}
            // description={"description"}
         />
  </MapView>
    </View>
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
