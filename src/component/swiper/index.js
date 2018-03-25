import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Carousel from 'react-native-banner-carousel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const styles = StyleSheet.create({
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode: 'stretch'
  },
  pageIndicatorContainerStyle: {
    position: 'absolute',
    right: 5,
    bottom: 10
  },
  pageIndicatorStyle: {
    marginHorizontal: 5,
    width: 6,
    height: 6,
    borderRadius: 3
  },
  activePageIndicatorStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000'
  }
})

class Swiper extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onPress: PropTypes.func
  }

  static defaultProps = {
    data: [],
    onPress: () => {}
  }

  render () {
    const {
      data,
      height,
      width,
      onPress,
      ...carouselProps
    } = this.props

    return (
      <View style={{width, height}}>
        <Carousel
          loop
          autoplay
          autoplayTimeout={4000}
          index={0}
          pageSize={width}
          pageIndicatorContainerStyle={styles.pageIndicatorContainerStyle}
          pageIndicatorStyle={styles.pageIndicatorStyle}
          activePageIndicatorStyle={styles.activePageIndicatorStyle}
          pageIndicatorOffset={16}
          {...carouselProps}
        >
          {
            data.map((item, idx) => (
              <TouchableWithoutFeedback onPress={() => onPress(item)} key={idx}>
                <View style={{ width, height }}>
                  <Image
                    source={{uri: item.uri}}
                    style={styles.img}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </Carousel>
      </View>
    )
  }
}

export default Swiper
