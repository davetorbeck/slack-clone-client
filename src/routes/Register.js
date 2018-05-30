import React from 'react'
import { Form, Message, Input, Container, Header, Button } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  }

  onSubmit = async () => {
    const { mutate } = this.props

    const response = await mutate({
      variables: this.state,
    })

    const { ok, errors } = response.data.register

    if (ok) {
      this.props.history.push('/')
    } else {
      const err = {}
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message
      })

      this.setState(err)
    }
  }

  onChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { username, email, password, usernameError, passwordError, emailError } = this.state
    const { onChange, onSubmit } = this
    const errorList = []

    if (usernameError) {
      errorList.push(usernameError)
    }

    if (emailError) {
      errorList.push(emailError)
    }

    if (passwordError) {
      errorList.push(passwordError)
    }

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Form>
          <Form.Field error={!!usernameError}>
            <Input name="username" onChange={onChange} value={username} placeholder="Username" fluid />
          </Form.Field>
          <Form.Field error={!!emailError}>
            <Input name="email" onChange={onChange} value={email} placeholder="Email" fluid />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input name="password" onChange={onChange} value={password} type="password" placeholder="Password" fluid />
          </Form.Field>
          <Button onClick={onSubmit}>Submit</Button>
        </Form>
        {errorList.length ? (
          <Message error header="There was some errors with your submission" list={errorList} />
        ) : null}
      </Container>
    )
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`

export default graphql(registerMutation)(Register)
