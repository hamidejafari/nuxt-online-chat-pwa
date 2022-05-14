import Vue from 'vue'
import {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR
} from './socket-mutation-types'
export const state = () => ({
  list: [],
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false
  }
})

export const mutations = {
  [SOCKET_ONOPEN](state, event) {
    state.socket.isConnected = true
  },
  [SOCKET_ONCLOSE](state, event) {
    state.socket.isConnected = false
  },
  [SOCKET_ONERROR](state, event) {
    console.error(state, event)
  },
  // default handler called for all methods
  [SOCKET_ONMESSAGE](state, message) {
    state.socket.message = message
  },
  // mutations for reconnect methods
  [SOCKET_RECONNECT](state, count) {
    console.info(state, count)
  },
  [SOCKET_RECONNECT_ERROR](state) {
    state.socket.reconnectError = true
  }
}

export const actions = {
  sendMessage(context, message) {
    Vue.prototype.$socket.send(message)
  }
}
