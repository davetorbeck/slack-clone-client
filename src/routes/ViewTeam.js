import React from 'react'
import { graphql } from 'react-apollo'
import findIndex from 'lodash/findIndex'
import { Redirect } from 'react-router-dom'

import Header from '../components/Header'
import SendMessage from '../components/SendMessage'
import AppLayout from '../components/AppLayout'
import Sidebar from '../containers/Sidebar'
import MessageContainer from '../containers/MessageContainer'
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

  const teams = [...allTeams, ...inviteTeams]

  if (!teams.length) {
    return <Redirect to="/create-team" />
  }

  let teamIdInteger = parseInt(teamId, 10)

  if (!teamIdInteger) return <Redirect to="/view-team" />

  const teamIdx = teamId ? findIndex(teams, ['id', parseInt(teamId, 10)]) : 0
  const team = teamIdx === -1 ? teams[teamIdx] : teams[teamIdx]
  const channelIdInteger = parseInt(channelId, 10)
  const channelIdx = channelIdInteger ? findIndex(team.channels, ['id', channelIdInteger]) : 0
  const channel = channelIdx === -1 ? team.channels[0] : team.channels[channelIdx]
  const normalizedTeams = teams.map((t) => ({ id: t.id, letter: t.name.charAt(0).toUpperCase() }))

  return (
    <AppLayout>
      <Sidebar teams={normalizedTeams} team={team} />
      {channel && <Header channelName={channel.name} />}
      {channel && <MessageContainer channelId={channel.id} />}
      {channel && <SendMessage channelName={channel.name} />}
    </AppLayout>
  )
}

export default graphql(allTeamsQuery)(ViewTeam)
