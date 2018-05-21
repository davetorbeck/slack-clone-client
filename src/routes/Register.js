import React from 'react';
import { Input, Container, Header } from 'semantic-ui-react';

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  onChange = (e) => {
    const { name, value } = e.target.name;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <Container>
        <Header as="h2">Register</Header>
        <Input name="username" onChange={this.onChange} value={username} placeholder="Username" fluid />
        <Input name="password" onChange={this.onChange} value={email} placeholder="Email" fluid />
        <Input name="email" onChange={this.onChange} value={password} type="password" placeholder="Password" fluid />
      </Container>
    );
  }
}

export default Register;
