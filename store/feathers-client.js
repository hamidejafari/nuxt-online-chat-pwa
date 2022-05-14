import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { CookieStorage } from 'cookie-storage'

const socket = io('http://animoshaver.ir:5050/', { transports: ['websocket'] })
// const socket = io('http://localhost:3030/', { transports: ['websocket'] })
const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: new CookieStorage() }))

export default feathersClient
