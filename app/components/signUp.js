import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { Container, Content, Form, Item, Input, Label,Radio, Button, Text, Icon, Thumbnail, Drawer } from 'native-base';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card } from './card';
import { CardSection } from './cardSection';
import { emailChanged, passChanged, loginUser, typeChanged } from '../actions';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPassChange(text) {
        this.props.passChanged(text);
    }

    onTypeChanged(text) {
        this.props.typeChanged(text);
    }

    onButtonPress() {
        console.log(this.props);
        axios.get('http://192.168.43.193:8000/signup?user_name=asydhf&user_email='+this.props.email+'&user_fname=as&user_lname=df&user_gender=m&user_type='+this.props.type+'&user_password='+this.props.password)
          .then(function (response) {
                Actions.login();
          })
          .catch(function (error) {
                Actions.login();
          });

    }

    componentDidUpdate() {
        if (this.props.success===true) {
                Actions.login();
            }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item style={{ marginTop: 0, marginLeft: 20, marginRight:20}} floatingLabel>
                            <Label>Usename</Label>
                            <Input
                                label="Username"       
                        />
                        </Item>

                        <Item style={{ marginLeft: 20, marginRight:20}} floatingLabel>
                            <Label>Email</Label>
                            <Input
                                label="Email"
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.props.email}         
                            />
                        </Item>

                        <Item style={{ marginLeft: 20, marginRight:20}} floatingLabel>
                            <Label>First name</Label>
                            <Input
                                label="Name"
                            />
                        </Item>

                        <Item style={{ marginLeft: 20, marginRight:20}} floatingLabel>
                            <Label>Last name</Label>
                            <Input
                                label="Name"
                            />
                        </Item>

                        
                         <Item style={{ marginLeft: 20, marginRight:20}} floatingLabel>
                            <Label>Type - 1.User 2.NGO</Label>
                            <Input
                                label="Type"
                                onChangeText={this.onTypeChanged.bind(this)}
                                value={this.props.type}          
                            />
                        </Item>
                               
                        <Item style={{ marginLeft: 20, marginRight:20}} floatingLabel>
                            <Label>Address</Label>
                            <Input
                                label="Address"
                            />
                        </Item>

                        <Item style={{ marginLeft: 20, marginRight:20}} floatingLabel>
                            <Label>Password</Label>
                            <Input
                            secureTextEntry={true}
                            label="Password"
                            onChangeText={this.onPassChange.bind(this)}
                            value={this.props.password}
                             />
                        </Item>
                    </Form>
                    
                    <Button  onPress={this.onButtonPress.bind(this)}
                            style={{ marginTop: 10, marginLeft: 20, marginRight:20}} primary full>
                        <Text style={{ fontSize: 17 }}>Create Account</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'orange',
    },
    btnStyle: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    }
};

const mapStateToProps = state => {
    console.log(state.auth);
    return {
        email: state.auth.email,
        password: state.auth.password,
        success: state.auth.success,
        type: state.auth.type
    };                                                          
}; 

export default connect(mapStateToProps, { emailChanged, passChanged, loginUser, typeChanged })(LoginForm); 
