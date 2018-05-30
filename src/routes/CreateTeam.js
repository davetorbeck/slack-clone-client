import React from 'react'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Form, Container, Header, Input, Button, Message } from 'semantic-ui-react'

class CreateTeam extends React.Component {
  constructor(props) {
    super(props)

    extendObservable(this, {
      name: '',
      errors: {},
    })
  }

  onSubmit = async () => {
    const { name } = this
    let response = null

    try {
      response = await this.props.mutate({
        variables: { name },
      })
    } catch (err) {
      console.log(err)
      this.props.history.push('/login')
      return
    }

    const { ok, errors, team } = response.data.createTeam

    if (ok) {
      this.props.history.push(`/view-team/${team.id}`)
    } else {
      const err = {}
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message
      })

      console.log(err)
      this.errors = err
    }
  }

  onChange = (e) => {
    const { name, value } = e.target
    this[name] = value
  }

  render() {
    const {
      name,
      errors: { nameError },
      onChange,
      onSubmit,
    } = this

    const errorList = []

    if (name) {
      errorList.push(nameError)
    }
    console.log(errorList)
    return (
      <Container text>
        <Header as="h2">Create Team</Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input name="name" onChange={onChange} value={name} placeholder="Team Name" fluid />
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

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`

export default graphql(createTeamMutation)(observer(CreateTeam))
