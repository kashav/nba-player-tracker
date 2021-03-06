import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as c from '../../constants';
import PlayerHeader from '../../components/PlayerHeader';
import HeadlineStatsBox from '../../components/Box/HeadlineStatsBox';
import GameLogBox from '../../components/Box/GameLogBox';
import UpcomingGamesBox from '../../components/Box/UpcomingGamesBox';
import NewsBox from '../../components/Box/NewsBox';

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    }
  }

  handleLinkPress(link) {
    Linking.canOpenURL(link)
      .then(supported => supported ? Linking.openURL(link) : null)
      .catch(err => console.error('Couldn\'t open URL.'))
  }

  handleError(error, caller) {
    console.log(error)

    let { errors } = this.state;
    errors[caller] = error;

    this.setState({ errors });
  }

  render() {
    let { player } = this.props;
    let { player_info, headline_stats } = player;

    return (
      <View style={s.container}>
        <PlayerHeader
          player={this.props.player}
          handleLinkPress={this.handleLinkPress.bind(
            this,
            `http://nba.com/players/${player_info.first_name}/${player_info.last_name}/${player.person_id}`
          )}>

          <View style={s.content}>

            <HeadlineStatsBox stats={headline_stats} />

            {!this.state.errors.GAMELOG && (
              <View style={s.contextBox}>
                <Text style={s.boxHeading}>Game Logs</Text>
                <GameLogBox player={this.props.player} handleError={this.handleError.bind(this)} />
              </View>
            )}

            {!this.state.errors.UPCOMING && (
              <View style={s.contentBox}>
                <Text style={s.boxHeading}>Upcoming Games</Text>
                <UpcomingGamesBox player={this.props.player} handleError={this.handleError.bind(this)} />
              </View>
            )}

            {!this.state.errors.NEWS && (
              <View style={s.contentBox}>
                <Text style={s.boxHeading}>News</Text>
                <NewsBox playerId={this.props.player.person_id} handleError={this.handleError.bind(this)} />
              </View>
            )}

          </View>
        </PlayerHeader>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
  },
  contentBox: {
  },
  boxHeading: {
    color: '#F7F7F7',
    fontSize: 16,
    fontFamily: 'sans-serif-condensed',
    padding: 10,
    backgroundColor: '#333',
  },
});
