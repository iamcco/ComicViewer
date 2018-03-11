import { Button, View } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import splashScreen from 'react-native-splash-screen'

import { home } from 'ActionCreators'

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  componentDidMount () {
    splashScreen.hide()
  }

  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title='click me'
          onPress={() => {
            this.props.navigation.dispatch(
              home.fetchHomePage()
            )
          }}
        />
      </View>
    )
  }
}
