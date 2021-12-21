import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {API_KEY_WEATHER} from '../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import {updateMapInfo} from '../actions';
export default function Home() {
  const loggedInUser = useSelector(state => state.auth.loggedInUser);
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);

  const dispatch = useDispatch();
  const updateMap = params => dispatch(updateMapInfo(params));

  useEffect(() => {
    const fetchWeather = async () => {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${loggedInUser.city}&appid=${API_KEY_WEATHER}`,
      );
      // console.log('result', result);
      setData(result.data);
      setloading(false);
      let params = {
        lat: result.data.coord.lat,
        lon: result.data.coord.lon,
      };
      updateMap(params);
    };

    fetchWeather();
  }, []);

  const getDate = timestamp => {
    let date = moment.unix(timestamp).format('hh:mm a');
    return date;
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.textContainer}>
          <Icon name={'ios-pin-outline'} size={20} color={'#ffffff'} />
          <Text style={styles.fontStyle}>
            {loggedInUser.city},{data.sys.country}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Icon
            name={'ios-sunny-outline'}
            size={20}
            color={'#ffffff'}
            fontWeight={'bold'}
          />
          <Text style={styles.fontStyle}>{data.weather[0].description}</Text>
        </View>
        <View style={styles.textContainer}>
          <FeatherIcon
            name={'sunrise'}
            size={20}
            color={'#ffffff'}
            fontWeight={'bold'}
          />
          <Text style={[styles.fontStyle]}>
            Sunrises :- {getDate(data.sys.sunrise)}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <FeatherIcon
            name={'sunset'}
            size={20}
            color={'#ffffff'}
            fontWeight={'bold'}
          />
          <Text style={[styles.fontStyle]}>
            Sunset :- {getDate(data.sys.sunset)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: '#7c3aed',
    borderRadius: 10,
    marginTop: 180,
  },
  textContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  fontStyle: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 8,
  },
});
