import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Button, Loading } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage'; 

class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password:'',
      verify_password:'',
      default_company:'',
      error: '',
      loading: false
    };
    this.registerUser = this.registerUser.bind(this);
  }
  
  registerUser() {
    const { firstname, lastname, email, password, verify_password, default_company } = this.state;

    this.setState({ error: '', loading: true });
    
    axios.post("https://apidev.kanvas.dev/v1/users",{
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        verify_password: verify_password,
        default_company: default_company
     
    },)
    .then((response) => {
      deviceStorage.saveKey("token", response.data.token);
      this.props.newJWT(response.data.token);
    })
    .catch((error) => {
      console.log(error);
      this.onRegistrationFail();
    });
    
  }
  onRegistrationFail() {
    this.setState({
      error: 'Registration Failed',
      loading: false
    });
  }

  render() {
    const { firstname, lastname, email, password, verify_password, default_company, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;
    
    return (
      <Fragment>
        <View style={form}>
            <View style={section}>
                <Input 
                    placeholder="Juan"
                    label="First Name"
                    value={firstname}
                    onChangeText={firstname => this.setState({ firstname })}
                    />
                    </View>
           <View style={section}>
                <Input 
                    placeholder="Perez"
                    label="Last Name"
                    value={lastname}
                    onChangeText={lastname => this.setState({ lastname })}
                />
            </View>
            <View style={section}>
                <Input
                    placeholder="user@email.com"
                    label="Email"
                    value={email}
                    onChangeText={email => this.setState({ email })}
                 />
            </View>
            <View style={section}>
                <Input
                    secureTextEntry
                    placeholder="password"
                    label="Password"
                    value={password}
                    onChangeText={password => this.setState({ password })}
                />
            </View>
            <View style={section}>
                <Input
                    secureTextEntry
                    placeholder="confirm password"
                    label="Confirm password"
                    value={verify_password}
                    onChangeText={verify_password => this.setState({ verify_password })}
                 />
            </View>
            <View style={section}>
                <Input 
                    placeholder="company example"
                    label="Company"
                    value={default_company}
                    onChangeText={default_company => this.setState({ default_company })}
                />
            </View>
            <Text style={errorTextStyle}>
                {error}
            </Text>
            {!loading ?
              <Button onPress={this.registerUser}>
                 Register
              </Button>
            :
              <Loading size={'large'} />
            }
        </View>  
          <TextLink onPress={this.props.authSwitch}>
            Log in
          </TextLink>
        </Fragment>
             
    );
  }
}

const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
    },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    },
  errorTextStyle:{
      alignSelf:'center',
      fontSize: 18,
      color: 'red'
  }
};

export { Registration };