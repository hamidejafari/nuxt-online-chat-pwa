import feathersVuex from 'feathers-vuex'
import feathersClient from './../feathers-client'

const { service } = feathersVuex(feathersClient, { idField: 'id' })

const servicePath = 'messages'
const servicePlugin = service(servicePath, {
  debug: true,
  enabledEvents: {
    created: () => true,
    updated: () => true,
    patched: () => true,
    removed: () => true
  }
})

export default servicePlugin
