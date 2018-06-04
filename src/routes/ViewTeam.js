import React from 'react'
import { graphql } from 'react-apollo'
import findIndex from 'lodash/findIndex'
import { Redirect } from 'react-router-dom'

import Header from '../components/Header'
import Messages from '../components/Messages'
import SendMessage from '../components/SendMessage'
import AppLayout from '../components/AppLayout'
import Sidebar from '../containers/Sidebar'
import { allTeamsQuery } from '../graphql/team'

const ViewTeam = ({
  data: { loading, allTeams },
  match: {
    params: { teamId, channelId },
  },
}) => {
  if (loading) {
    return null
  }

  if (!allTeams.length) {
    return <Redirect to="/create-team" />
  }

  let teamIdInteger = parseInt(teamId, 10)

  if (!teamIdInteger) return <Redirect to="/view-team" />

  const teamIdx = teamId ? findIndex(allTeams, ['id', parseInt(teamId, 10)]) : 0
  const team = allTeams[teamIdx]

  const channelIdInteger = parseInt(channelId, 10)
  const channelIdx = channelIdInteger ? findIndex(team.channels, ['id', channelIdInteger]) : 0
  const channel = team.channels[channelIdx]
  const teams = allTeams.map((t) => ({ id: t.id, letter: t.name.charAt(0).toUpperCase() }))
  return (
    <AppLayout>
      <Sidebar teams={teams} team={team} />
      {channel && <Header channelName={channel.name} />}
      {channel && (
        <Messages>
          <ul className="message-list">
            <li />
            <li />
          </ul>
        </Messages>
      )}
      {channel && <SendMessage channelName={channel.name} />}
    </AppLayout>
  )
}

export default graphql(allTeamsQuery)(ViewTeam)
