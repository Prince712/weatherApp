import React, {useEffect, useState} from 'react';
import {View,Platform,KeyboardAvoidingView,ScrollView} from 'react-native';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
  useToast,Input, Center,
} from 'native-base';
import {useDispatch,useSelector} from 'react-redux';
import {registerUser} from '../actions';
import  {ShowToast}  from '../components/ShowToast';

export default function Register({navigation}) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [mobile, setmobile] = useState('');
  const [city, setcity] = useState('');
  const [inputValue, setInputValue] = useState('');
  const Toast = useToast();
  let id = 'toast';

  const dispatch = useDispatch();
  const RegisterUser = params => dispatch(registerUser(params));

  const Users = useSelector(state => state.auth.users)


  const handleRegistraion = () => {
    console.log("users",Users);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

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
    if (city == '') {
      ShowToast('City can not be empty!',Toast,id);
      return;
    }     
    if (email == '') {
      ShowToast('Email can not be empty!',Toast,id);
      return;
    }     
    else if (!reg.test(email))  {
       ShowToast('Enter Valid email!',Toast,id);
       return;
    }    
    else if (password == '') {
      ShowToast('Password can not be empty!',Toast,id);    
      return;
    } 
    else if (password.length < 8) {
      ShowToast('Password should be atleast \n 8 charachter long! ',Toast,id);    
      return;
    }
    else if (confirmPassword == '') {
      ShowToast('Please Confirm Password!',Toast,id); 
      return   
    } else if (password !== confirmPassword) {
      ShowToast("Password din't matched",Toast,id); 
      return;         
    }

  let userExist = Users.length > 0 && Users.filter(user => user.email == email );

    if(userExist.length > 0){
      ShowToast("Email already exist",Toast,id); 
      return;
    }



    let params ={     
      firstName,
      lastName,
      mobile,
      city,
      email,
      password,      
    }
    RegisterUser(params).then(res =>{

    }).catch(e => {
      console.log('error',e)
    });
    console.log('register');

  };

  
  

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 0
  return (
<KeyboardAvoidingView flex={1} contentContainerStyle={{flex:1}}
 behavior={Platform.OS === "ios" ? "padding" : null}
 keyboardVerticalOffset={keyboardVerticalOffset}
  >
    <ScrollView>
    <Box safeArea flex={1} p="2" w="90%" mx="auto" py="8">
      <Heading size="lg" color="coolGray.800" fontWeight="600">
        Welcome
      </Heading>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        Sign up to continue!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'xs', fontWeight: 500}}>
              First Name
            </FormControl.Label>
            <Input  value={firstName}  onChangeText={(firstName) => setfirstName(firstName)} selectionColor={'#a78bfa'} color= '#6d28d9' />
        </FormControl>

        <FormControl>
          <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'xs', fontWeight: 500}}>
              Last Name
            </FormControl.Label>
            <Input  value={lastName}  onChangeText={(lastName) => setlastName(lastName)}  selectionColor={'#a78bfa'} color= '#6d28d9' />
        </FormControl>
       
        <FormControl>
          <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'xs', fontWeight: 500}}>
             Mobile number
            </FormControl.Label>
            <Input  value={mobile} keyboardType = 'numeric' onChangeText={(mobile) => setmobile(mobile)}  selectionColor={'#a78bfa'} color= '#6d28d9' />
        </FormControl>
        <FormControl>
          <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'xs', fontWeight: 500}}>
             City 
            </FormControl.Label>
            <Input  value={city}  onChangeText={(city) => setcity(city)}  selectionColor={'#a78bfa'} color= '#6d28d9' />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'xs', fontWeight: 500}}>
            Email
          </FormControl.Label>
          <Input keyboardType="email-address" autoCapitalize='none'  value={email}  onChangeText={(email) => setemail(email)}  selectionColor={'#a78bfa'} color= '#6d28d9' />
        </FormControl>

        <FormControl>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'xs', fontWeight: 500}}>
            Password
          </FormControl.Label>
          <Input
            type="password"
            value={password}
            onChangeText={password => setpassword(password)}
            selectionColor={'#a78bfa'} 
            color= '#6d28d9'
          />
          </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{color: 'muted.700', fontSize: 'xs', fontWeight: 500}}>
            Confirm Password
          </FormControl.Label>
          <Input
            autoCapitalize='none' 
            secureTextEntry
            value={confirmPassword}
            onChangeText={confirmPassword => setconfirmPassword(confirmPassword)}
            selectionColor={'#a78bfa'}
             color= '#6d28d9'
             returnKeyType='next'
          />
        </FormControl>
        <Button
          mt="2"
          colorScheme="indigo"
          _text={{color: 'white'}}
          onPress={handleRegistraion}>
          Sign up
        </Button>
        <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              Already have an account?{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              // href="#"
              onPress={()=> navigation.navigate("Login")}
              >
              Sign In
            </Link>
          </HStack>
      </VStack>
    </Box>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
