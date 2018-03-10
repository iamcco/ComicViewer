import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import { addListener } from '../middleware'
import Home from '../screens/Home'
import Detail from '../screens/Detail'

export const initialRouteName = 'Home'

export const RootNavigator = StackNavigator({
  Home: {
    screen: Home
  },
  Detail: {
    screen: Detail
  }
}, {
  initialRouteName,
  headerMode: 'none'
})

class AppWithNavigationState extends Component {
  static propTypes = {
    nav: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render () {
    const { dispatch, nav } = this.props
    return (
      <RootNavigator
        navigation={
          addNavigationHelpers({
            state: nav,
            dispatch,
            addListener
          })
        }
      />
    )
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)
