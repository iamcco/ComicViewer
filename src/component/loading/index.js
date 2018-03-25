import {
  ActivityIndicator,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './style'

function Loading (props) {
  const {
    onPress,
    ...ActivityIndicatorProps
  } = props
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.loadingCtn}>
          <ActivityIndicator {...ActivityIndicatorProps} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

Loading.propTypes = {
  onPress: PropTypes.func,
  ...ActivityIndicator.propTypes
}

Loading.defaultProps = {
  onPress: () => {},
  size: 'large',
  color: '#fff'
}

export default Loading
