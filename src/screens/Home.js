import { Button, View } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import splashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'

import { comic } from 'ActionCreators'
import { Loading } from 'BizComponent'

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  componentDidMount () {
    this.props.navigation.dispatch(
      comic.fetchCategories()
    )
    splashScreen.hide()
  }

  render () {
    console.log(this.props.hotComics.toJS())
    console.log(this.props.slides.toJS())
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title='click me'
          onPress={() => {
            Loading.LoadingHandler.show()
          }}
        />
      </View>
    )
  }
}

export default connect(({ comic }) => ({
  hotComics: comic.get('hotComics'),
  slides: comic.get('slides')
}))(Home)
