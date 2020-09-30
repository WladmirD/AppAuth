import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Loading } from '../components/common/';
import axios from 'axios';

export default class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      id:'',
      firstname: '',
      lastname: '',
      email: '',
      default_company:'',
      created_at:'',
      updated_at:'',
      error: ''
    }
  }

  componentDidMount(){
    const headers = {
      'Authorization': 'Bearer ' + this.props.jwt
    };
    
    axios({
      method: 'GET',
      url: 'https://apidev.kanvas.dev/v1/users',
      headers: headers,
    }).then((response) => {     
      this.setState({
        
        id:response.data[0].id,
        firstname: response.data[0].firstname,
        lastname: response.data[0].lastname,
        email: response.data[0].email,
        default_company:response.data[0].default_company,
        created_at:response.data[0].created_at,
        updated_at:response.data[0].updated_at,
        loading: false
      });
    }).catch((error) => {
      this.setState({
        error: error.response.data.errors.message,
        loading: false
      });
    });
  }

  render() {
    const { container, emailText, errorText } = styles;
    const { loading, email, error, id, firstname, lastname, default_company, created_at, updated_at } = this.state;

    if (loading){
      return(
        <View style={container}>
          <Loading size={'large'} />
        </View>
      )
    } else {
        return(
          <View style={container}>
            <View>
              {email ?
                <Text style={emailText}>
                  id: {id} {"\n"}
                  first name: {firstname}{"\n"}
                  last name: { lastname }{"\n"}
                  email: {email}{"\n"}
                  company: {default_company}{"\n"}
                  created: {created_at}{"\n"}
                  updated: {updated_at}{"\n"}
                </Text>
                :
                <Text style={errorText}>
                  {error}
                </Text>}
            </View>
            <Button onPress={this.props.deleteJWT}>
              Log Out
            </Button>
          </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  emailText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};