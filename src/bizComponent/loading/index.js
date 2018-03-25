import React, { Component } from 'react'
import { DeviceEventEmitter } from 'react-native'

import { Loading as Indicator } from 'Component'

const CHANGE_LOADING_STATE = 'changeLoadingState'

let eventQueue = []

class Loading extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  componentDidMount () {
    if (eventQueue) {
      this.changeLoadingState({
        ...eventQueue.reduce((pre, next) => {
          return {
            ...pre,
            ...next
          }
        }, {})
      })
    }
    eventQueue = null
    this.emitter = DeviceEventEmitter.addListener(CHANGE_LOADING_STATE, this.changeLoadingState)
  }

  componentWillUnmount () {
    this.emitter.remove()
  }

  changeLoadingState = (state = {}) => {
    this.setState({
      // 默认点击 loading 遮罩隐藏 loading
      onPress: () => {
        this.setState({ visible: false })
      },
      ...state
    })
  }

  render () {
    const {
      visible,
      ...props
    } = this.state

    if (!visible) {
      return null
    }

    return (
      <Indicator {...props} />
    )
  }
}

export const LoadingHandler = {
  show: (state = {}) => {
    state = {
      visible: true,
      ...state
    }
    if (eventQueue) {
      eventQueue.push(state)
    } else {
      DeviceEventEmitter.emit(CHANGE_LOADING_STATE, state)
    }
  },
  hide: () => {
    DeviceEventEmitter.emit(CHANGE_LOADING_STATE, { visible: false, onPress: null })
  }
}

Loading.LoadingHandler = LoadingHandler

export default Loading
