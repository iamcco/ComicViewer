import RNFetchBlob from 'react-native-fetch-blob'
import serialize from 'serialize-tool'
import { getApiUrl } from 'API'

const Fetch = RNFetchBlob.polyfill.Fetch
// replace built-in fetch
const fetch = new Fetch({
  auto: true,
  binaryContentTypes: [],
  timeout: 10000
}).build()

const baseHeaders = {
  'RNFB-Response': 'utf8',
  'Content-Type': 'application/json;charset=utf-8',
  Accept: 'application/json, text/javascript'
}

const newFetch = (options = {}) => {
  const {
    uri,
    resType = 'text',
    headers = {},
    ...otherOptions
  } = options

  return fetch(getApiUrl(uri), {
    ...otherOptions,
    headers: {
      ...baseHeaders,
      ...headers
    }
  }).then(res => {
    if (res.ok && res.status === 200) {
      if (resType === 'text') {
        return res.text()
      } else {
        return res.json()
      }
    } else {
      throw res.status
    }
  }).then(data => {
    return {
      status: 0,
      data
    }
  }).catch(e => {
    if (typeof e === 'number') {
      return {
        status: e,
        errType: 'networkErr'
      }
    } else {
      let errType = /timeout/.test(e.message) ? 'timeoutErr' : ''
      errType = /json/.test(e.message) ? 'jsonParseErr' : ''
      errType = /request/.test(e.message) ? 'requestErr' : ''
      return {
        status: -1,
        errType,
        err: e
      }
    }
  })
}

const post = (param = {}) => {
  const {
    data,
    ...options
  } = param

  return newFetch({
    ...options,
    method: 'POST',
    body: JSON.stringify(data)
  })
}

const get = (param = {}) => {
  const {
    data,
    uri,
    ...options
  } = param

  let finalUri = uri

  if (/^.*\?.+$/.test(uri)) {
    finalUri = `${uri}&${serialize(data)}`
  } else if (/^.*\?$/.test(uri)) {
    finalUri = `${uri}${serialize(data)}`
  }

  return newFetch({
    ...options,
    method: 'GET',
    uri: finalUri
  })
}

export default {
  post,
  get
}
