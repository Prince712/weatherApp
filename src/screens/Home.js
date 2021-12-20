import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {API_KEY_WEATHER} from '../utils/Constants';
import {VStack, Box, Divider} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
export default function Home() {
  const loggedInUser = useSelector(state => state.auth.loggedInUser);
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${loggedInUser.city}&appid=${API_KEY_WEATHER}`,
      );
      console.log('result', result);
      setData(result.data);
      setloading(false);
    };

    fetchWeather();
  }, []);

  const getDate=(timestamp)=>{
    let date = moment(timestamp,).format("hh:mm a");
    return date;
  }

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
          <Text style={styles.fontStyle}>{loggedInUser.city},{data.sys.country}</Text>
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
          <Text style={[styles.fontStyle,{marginLeft:-1}]}>Sunrises :- {getDate(data.sys.sunrise)}</Text>
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
  },
  textContainer: {flexDirection: 'row', alignItems: 'center',marginTop:5},
  fontStyle: {
    color: '#fff',
    fontWeight:'500',
    marginLeft:8
  },
});
