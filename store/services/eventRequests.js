import feathersVuex from 'feathers-vuex'
import feathersClient from './../feathers-client'

const { service } = feathersVuex(feathersClient, { idField: 'id' })

const servicePath = 'eventRequests'
const servicePlugin = service(servicePath, {
  debug: true
})

export default servicePlugin
