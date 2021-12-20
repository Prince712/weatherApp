import React, {useState, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';

export default function RouteComponent() {
  const isLoggedIn = useSelector(state => state.auth.loggedInUser);

  useEffect(() => {
    console.log('route ', isLoggedIn);
  }, [isLoggedIn]);
  return (
    <NavigationContainer>
      {/* <TabNavigator/>      */}
      {isLoggedIn == null ? <AuthNavigator /> : <TabNavigator />}
      {/* <AuthNavigator /> */}
    </NavigationContainer>
  );
}
