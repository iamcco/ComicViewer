import { ScrollView, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import splashScreen from 'react-native-splash-screen'

import { SCREEN_WIDTH } from 'Constant'
import { Swiper } from 'Component'
import { comic } from 'ActionCreators'
import HotComic from './hotComic'

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    hotComics: PropTypes.object,
    slides: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  componentDidMount () {
    this.props.navigation.dispatch(
      comic.fetchCategories()
    )
    splashScreen.hide()
  }

  onPressSlide = (item) => {
  }

  render () {
    console.log(this.props.hotComics.toJS(), this.props.slides.toJS())
    const {
      hotComics,
      slides
    } = this.props

    console.log(slide =>
      ({ uri: slide.get('image'), url: slide.get('url') }))

    return (
      <View>
        <StatusBar
          backgroundColor='rgba(0,0,0,0.2)'
          barStyle='light-content'
          translucent
        />
        <ScrollView>
          <Swiper
            width={SCREEN_WIDTH}
            height={300}
            data={slides.map(slide =>
              ({ uri: slide.get('image'), url: slide.get('url') }))
            }
            onPress={this.onPressSlide}
          />
          {
            hotComics.toArray().map((type, idx) => (
              <HotComic type={type} key={idx} />
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

export default connect(({ comic }) => ({
  hotComics: comic.get('hotComics'),
  slides: comic.get('slides')
}))(Home)
