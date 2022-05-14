import feathersVuex from 'feathers-vuex'
import feathersClient from './../feathers-client'

const { service } = feathersVuex(feathersClient, { idField: 'id' })

const servicePath = 'users'
const servicePlugin = service(servicePath, {
  debug: true,
  addOnUpsert: true,
  enabledEvents: {
    created: () => true,
    updated: () => true,
    patched: () => true,
    removed: () => true
  },
  actions: {
    afterPatch({ commit, dispatch, getters, state }, response) {
      // Do something with the response.
      // Keep in mind that the data is already in the store.
      // console.log(response)
    }
  }
})

feathersClient.service(servicePath).hooks({
  after: {
    find: [
      (context) => {
        // const { result } = context
        // console.log(result)
      }
    ],
    patch: [
      (context) => {
        // const { result } = context
        // console.log(result)
      }
    ],
    update: [
      (context) => {
        // const { result } = context
        // console.log(result)
      }
    ]
  }
})

export default servicePlugin
