import feathersVuex, { initAuth } from 'feathers-vuex'
import feathersClient from './feathers-client'
import ordersPlugin from './services/orders'
import eventsPlugin from './services/events'
import uploadsPlugin from './services/uploads'
import usersPlugin from './services/users'
import filesPlugin from './services/files'
import messagesPlugin from './services/messages'
import attemptsPlugin from './services/attempts'
import expertisesPlugin from './services/expertises'
import eventRequestsPlugin from './services/eventRequests'
import rateTitlesPlugin from './services/rateTitles'
import ratesPlugin from './services/rates'
import pricesPlugin from './services/prices'
import ticketsPlugin from './services/tickets'
import departmentsPlugin from './services/departments'
import issuesPlugin from './services/issues'
import conversationsPlugin from './services/conversations'
import acceptPlugin from './services/accepts'
import subjectPlugin from './services/subjects'

const axios = require('axios')
const siteUrl = 'https://animoshaver.ir'
const { auth } = feathersVuex(feathersClient, { idField: 'id' })
export const strict = false
const numeral = require('numeral')

export const state = () => ({
  counter: 0,
  userDetail: null,
  selectedUserId: -1,
  confirmCode: '',
  services: null,
  selectedFiles: [],
  selectedService: null,
  requestDescription: null,
  searchAdviserExpertiseId: -1,
  searchAdviserType: [],
  searchAdviserCity: null,
  searchAdviserName: null,
  recievedRequestsDialogVisible: false,
  createEventRequestDialogVisible: false,
  sentEventRequestDialogVisible: false,
  rateEvent: null
})

export const getters = {
  user: (state) => state.auth.user,
  confirmCode: (state) => state.confirmCode,
  services: (state) => state.services,
  selectedFiles: (state) => state.selectedFiles,
  selectedService: (state) => state.selectedService,
  requestDescription: (state) => state.requestDescription,
  searchAdviserExpertiseId: (state) => state.searchAdviserExpertiseId,
  searchAdviserType: (state) => state.searchAdviserType,
  searchAdviserCity: (state) => state.searchAdviserCity,
  searchAdviserName: (state) => state.searchAdviserName,
  recievedRequestsDialogVisible: (state) => state.recievedRequestsDialogVisible,
  createEventRequestDialogVisible: (state) =>
    state.createEventRequestDialogVisible,
  sentEventRequestDialogVisible: (state) => state.sentEventRequestDialogVisible,
  rateEvent: (state) => state.rateEvent
}

export const mutations = {
  setRateEvent(state, event) {
    state.rateEvent = event
  },
  setSentEventRequestDialogVisible(state, val) {
    state.sentEventRequestDialogVisible = val
  },
  setCreateEventRequestDialogVisible(state, val) {
    state.createEventRequestDialogVisible = val
  },
  setRecievedRequestsDialogVisible(state, val) {
    state.recievedRequestsDialogVisible = val
  },
  setUserDetail(state, payload) {
    state.userDetail = payload
  },
  setSelectedUserId(state, payload) {
    state.selectedUserId = payload
  },
  setConfirmCode(state, code) {
    state.confirmCode = code
  },
  setServices(state, event) {
    state.services = event
  },
  setSelectedFiles(state, event) {
    state.selectedFiles = event
  },
  setSelectedService(state, event) {
    state.selectedService = event
  },
  setRequestDescription(state, event) {
    state.requestDescription = event
  },
  setSearchAdviserExpertiseId(state, event) {
    state.searchAdviserExpertiseId = event
  },
  setSearchAdviserType(state, event) {
    state.searchAdviserType = event
  },
  setSearchAdviserCity(state, event) {
    state.searchAdviserCity = event
  },
  setSearchAdviserName(state, event) {
    state.searchAdviserName = event
  }
}

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    return initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt'
    })
  },
  async getConfirmCode(context, userId) {
    try {
      const res = await axios({
        url: '/api/send-confirm-code',
        method: 'post',
        baseURL: siteUrl,
        data: {
          userId
        }
      })
      context.commit('setConfirmCode', res.data.message)
    } catch (ex) {
      console.log(ex)
    }
  },
  getServices(context, personId) {
    axios
      .get('https://www.animoshaver.ir/service-categories')
      .then((response) => {
        context.commit('setServices', response)
      })
  },
  sendRequestAccept(context, data) {
    axios
      .get(
        'https://www.animoshaver.ir/send-service?user_id=' +
          data.userId +
          '&title=' +
          data.title +
          '&description=' +
          data.description +
          '&service_id=' +
          data.serviceId +
          '&service_sub_id=' +
          data.serviceSubId +
          '&fileIds=' +
          data.filesId
      )
      .then((response) => {
        console.log('success')
      })
  }
}

export const plugins = [
  rateTitlesPlugin,
  uploadsPlugin,
  filesPlugin,
  messagesPlugin,
  eventRequestsPlugin,
  ordersPlugin,
  eventsPlugin,
  usersPlugin,
  attemptsPlugin,
  expertisesPlugin,
  ratesPlugin,
  pricesPlugin,
  ticketsPlugin,
  departmentsPlugin,
  issuesPlugin,
  conversationsPlugin,
  acceptPlugin,
  subjectPlugin,
  auth({
    userService: 'users',
    state: {
      publicPages: [
        'login',
        'Register',
        'forgetPassword',
        'index',
        'UserRegister',
        'AdvisorRegister',
        'UploadLicense'
      ]
    },
    getters: {
      userAvatar: (state) =>
        state.user !== null && state.user.avatar
          ? state.user.avatar
          : '/user.png',
      userWallet: (state) =>
        state.user ? numeral(state.user.wallet).format('0,0') : '0,0'
    }
  })
]
