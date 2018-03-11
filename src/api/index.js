/*
 * @providesModule API
*/

const baseInfo = {
  protocal: 'https',
  host: 'www.177mh.com'
}

export const getBaseUrl = () => `${baseInfo.protocal}://${baseInfo.host}`

export const getApiUrl = path => `${getBaseUrl()}/${path}`
