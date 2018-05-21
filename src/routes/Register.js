import React from 'react';
import { Input, Container, Header, Button } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  onSubmit = async () => {
    const { mutate } = this.props;

    const response = await mutate({
      variables: this.state,
    });

    console.log(response);
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;
    const { onChange, onSubmit } = this;

    return (
      <Container>
        <Header as="h2">Register</Header>
        <Input name="username" onChange={onChange} value={username} placeholder="Username" fluid />
        <Input name="email" onChange={onChange} value={email} placeholder="Email" fluid />
        <Input name="password" onChange={onChange} value={password} type="password" placeholder="Password" fluid />
        <Button onClick={onSubmit}>Submit</Button>
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

export default graphql(registerMutation)(Register);
