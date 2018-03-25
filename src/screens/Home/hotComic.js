import { Image, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

import { SCREEN_WIDTH } from 'Constant'

const imageWidth = SCREEN_WIDTH / 3 - 10

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  item: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  titleCtn: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18
  },
  imgCtn: {
    width: imageWidth,
    height: 160,
    marginBottom: 10
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'stretch'
  }
})

export default function hotComic (props) {
  const {
    type
  } = props

  return (
    <View style={styles.container}>
      <View style={styles.titleCtn}>
        <Text style={styles.title}> { type.get('name') }</Text>
      </View>
      <View style={styles.item}>
        {
          type.get('comicList').map((comic, idx) => (
            <View style={styles.imgCtn} key={idx}>
              <Image
                style={styles.img}
                source={{ uri: comic.get('image') }}
              />
            </View>
          ))
        }
      </View>
    </View>
  )
}

hotComic.propTypes = {
  type: PropTypes.object
}
