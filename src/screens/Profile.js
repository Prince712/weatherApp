import React, {useState, useEffect} from 'react';
import { StyleSheet,Platform,KeyboardAvoidingView,ScrollView} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Button, 
  useToast,
  Input,
} from 'native-base';

import  {ShowToast}  from '../components/ShowToast';
import {logout, updateUserInfo} from '../actions';

export default function Profile() {
  const loggedInUser = useSelector(state => state.auth.loggedInUser);
  const [isEditing, setisEditing] = useState(false);
  const [email, setemail] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [mobile, setmobile] = useState('');

  const Toast = useToast();
  let id = 'toast';

  const dispatch = useDispatch();
  const updateUser = params => dispatch(updateUserInfo(params));
  const LOGOUT = params => dispatch(logout(params));

  useEffect(() => {
    setemail(loggedInUser.email);
    setfirstName(loggedInUser.firstName);
    setlastName(loggedInUser.lastName);
    setmobile(loggedInUser.mobile);
    console.log('is updating');
  }, []);


 const handleSave =()=>{
      console.log('all state',firstName);
      if (firstName == '') {
        ShowToast('First name can not be empty!',Toast,id);
        return;
      }     
      if (lastName == '') {
        ShowToast('Last name can not be empty!',Toast,id);
        return;
      } 
      if (mobile == '') {
        ShowToast('Mobile number can not be empty!',Toast,id);
        return;
      } 
    setisEditing(false);

    let params ={
      email,
      firstName,
      lastName,
      mobile
    }
    updateUser(params);

  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 0

  return (
<KeyboardAvoidingView flex={1} contentContainerStyle={{flex:1}}
 behavior={Platform.OS === "ios" ? "padding" : null}
 keyboardVerticalOffset={keyboardVerticalOffset}
  >
    <ScrollView>
      <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
        <Heading size="lg" color="coolGray.800" fontWeight="600">
          Welcome, {loggedInUser.firstName}
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'xs', fontWeight: 500}}>
              Email
            </FormControl.Label>
            <Input
              editable={false}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={email => setemail(email)}
              selectionColor={'#a78bfa'}
              color="#6d28d9"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'xs', fontWeight: 500}}>
              First Name
            </FormControl.Label>
            <Input
              editable={isEditing}
              value={firstName}
              onChangeText={firstName => setfirstName(firstName)}
              selectionColor={'#a78bfa'}
              color="#6d28d9"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'xs', fontWeight: 500}}>
              Last Name
            </FormControl.Label>
            <Input
              editable={isEditing}
              value={lastName}
              onChangeText={lastName => setlastName(lastName)}
              selectionColor={'#a78bfa'}
              color="#6d28d9"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'xs', fontWeight: 500}}>
              Mobile number
            </FormControl.Label>
            <Input
              editable={isEditing}
              value={mobile}
              keyboardType="numeric"
              onChangeText={mobile => setmobile(mobile)}
              selectionColor={'#a78bfa'}
              color="#6d28d9"
            />
          </FormControl>

          {!isEditing ? (
            <Button
              mt="2"
              colorScheme="indigo"
              _text={{color: 'white'}}
              onPress={() => {
                setisEditing(true);
              }}>
              Edit Infomation
            </Button>
          ) : (
            <Button
              mt="2"
              colorScheme="indigo"
              _text={{color: 'white'}}
              onPress={handleSave}>
              Save
            </Button>
          )}
           <Button
              mt="2"
              colorScheme="red"
              _text={{color: 'white'}}
              onPress={()=>{LOGOUT(null)}}>
              Logout
            </Button>
        </VStack>
       
      </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    margin: 10,
    flexDirection: 'row',
  },
  lable: {
    fontWeight: '500',
    color: '#000',
    marginRight: 15,
  },
  contentText: {
    color: '#555555',
  },
});
