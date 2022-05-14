<template>
  <v-app id="app" class="pa-0">
    <v-content class="pa-0">
      <v-container v-if="currentEvent !== null" fluid fill-height class="pa-0">
        <v-layout justify-center>
          <v-flex xs12 sm8 md6 class="pa-0">
            <v-card class="elevation-12 px-0" style="height:100%">
              <v-toolbar
                color="grey lighten-5"
                class="px-0"
                style="height: 70px;padding-top: 1.25%;"
              >
                <v-row class="ma-0" style="width:100%">
                  <v-col cols="2" style="align-self: center;" class="px-0 py-0">
                    <v-avatar color="indigo" size="45">
                      <img src="/user.png" alt="John" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="6" style="align-self: center;">
                    <strong style="font-size: 14px;">{{
                      personName + '   (' + personTitle + ')   '
                    }}</strong>
                    <p
                      style="margin-bottom: 0px !important;
font-size: 13px;"
                    >
                      {{ timeChat }} دقیقه تا پایان چت
                    </p>
                  </v-col>
                  <v-col cols="2" style="align-self: center;">
                    <v-btn icon color="red" @click="closeEvent()">
                      <v-icon style="font-size: 40px;">mdi-close-circle</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="2" style="align-self: center;">
                    <v-btn icon color="indigo" @click="backMe()">
                      <v-icon style="font-size: 40px;"
                        >mdi-arrow-left-bold-circle</v-icon
                      >
                    </v-btn>
                  </v-col>
                </v-row>
              </v-toolbar>
              <v-card-text class="pa-0">
                <v-list
                  id="logs"
                  ref="chat"
                  class="pa-3"
                  style="height: 80vh;overflow: auto;background: #f2f2f2;transform: rotatex(180deg);"
                >
                  <v-layout
                    v-for="item in messages"
                    :key="item.id"
                    row
                    wrap
                    style="transform: rotatex(180deg);"
                  >
                    <v-flex v-if="item.User.id === user.id" xs11 class="my-1">
                      <v-subheader
                        class="messageme"
                        style="text-align: right;height: 100% !important;padding: 0px 10px;border-radius: 15px;border-top-right-radius: 0;margin-right: 0%;color: white;float: right;"
                      >
                        <a
                          v-if="item.Document"
                          :href="
                            'http://animoshaver.ir:5050/all-uploads/' +
                              item.Document.file
                          "
                          target="_blank"
                        >
                          <img
                            :src="
                              'http://animoshaver.ir:5050/all-uploads/' +
                                item.Document.file
                            "
                            style="width:100px;height:100px;border-radius:10px"
                          />
                        </a>
                        <p
                          v-else
                          class="text-xs-left messageme-text"
                          style="margin: 0px !important;background: #90ee90;padding: 2%;border-radius: 15px;border-top-right-radius: 0;border-top-left-radius: 15px;padding: 10px 15px 5px;text-align: right !important;color: rgba(0, 0, 0, 0.87);max-width: 100%;"
                        >
                          {{ item.messageBody }}
                        </p>
                      </v-subheader>
                    </v-flex>
                    <v-flex v-else xs6 class="my-1" style="margin-right:10%">
                      <v-subheader
                        class="messageguest"
                        style="text-align: left;height: 100% !important;padding: 0px 10px;border-top-right-radius: 15px;margin-top: 1%;margin-left: -80%;direction: ltr;"
                      >
                        <a
                          v-if="item.Document"
                          :href="
                            'http://animoshaver.ir:5050/all-uploads/' +
                              item.Document.file
                          "
                          target="_blank"
                        >
                          <img
                            :src="
                              'http://animoshaver.ir:5050/all-uploads/' +
                                item.Document.file
                            "
                            style="width:100px;height:100px;border-radius:10px"
                          />
                        </a>
                        <p
                          v-else
                          class="text-xs-right messageguest-text"
                          style="margin: 0px !important;background: #fff;padding: 2%;border-radius: 15px;border-top-left-radius: 0;padding: 10px 15px 5px;text-align: right !important;border-top-right-radius: 15px;color: rgba(0, 0, 0, 0.87);max-width: 100%;"
                        >
                          {{ item.messageBody }}
                        </p>
                      </v-subheader>
                    </v-flex>
                  </v-layout>
                </v-list>
              </v-card-text>
              <v-card-actions
                class="pa-0"
                style="position: relative;width: 100%;bottom: 0;background: #FFF;"
              >
                <v-form style="width:100%" @submit.prevent="submit">
                  <v-row class="ma-0" style="width:100%">
                    <v-col
                      cols="2"
                      class="py-0 pl-0 pr-2"
                      style="text-align: center;align-self: center;"
                    >
                      <v-btn
                        depressed
                        fab
                        dark
                        small
                        color="indigo"
                        type="submit"
                      >
                        <v-icon dark>mdi-send</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col
                      cols="2"
                      class="py-3 pl-2 mt-0"
                      style="text-align: center;align-self: center;height:auto;"
                    >
                      <ModalSendFile />
                    </v-col>
                    <v-col
                      cols="6"
                      class="py-3 pl-2 mt-0"
                      style="text-align: center;align-self: center;height:auto;"
                    >
                      <v-textarea
                        v-model="msg"
                        auto-grow
                        multi-line
                        placeholder="پیام . . ."
                        row-height="5"
                        rounded
                        class="pt-0"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container v-else fluid fill-height class="pa-0">
        <v-layout justify-center>
          <v-flex xs12 sm8 md6 class="pa-0">
            <v-card class="elevation-12 px-0" style="height:100%">
              <v-toolbar
                color="grey lighten-5"
                class="px-0"
                style="height: 70px;padding-top: 1.25%;"
              >
                <v-row class="ma-0" style="width:100%">
                  <v-col cols="10" style="align-self: center;">
                    <strong style="color:red">اتاق مشاوره بسته شد</strong>
                  </v-col>
                  <v-col cols="2" style="align-self: center;">
                    <v-btn icon color="indigo" @click="backMe()">
                      <v-icon style="font-size: 40px;"
                        >mdi-arrow-left-bold-circle</v-icon
                      >
                    </v-btn>
                  </v-col>
                </v-row>
              </v-toolbar>
              <v-card-text class="pa-0">
                <v-list
                  id="logs"
                  ref="chat"
                  class="pa-3"
                  style="height: 80vh;overflow: auto;background: #f2f2f2;"
                >
                  <v-layout v-for="item in messages" :key="item.id" row wrap>
                    <v-flex v-if="item.User.id === user.id" xs11 class="my-1">
                      <v-subheader
                        class="messageme"
                        style="text-align: right;height: 100% !important;padding: 0px 10px;border-radius: 15px;border-top-right-radius: 0;margin-right: 0%;color: white;float: right;"
                      >
                        <a
                          v-if="item.Document"
                          :href="
                            'http://animoshaver.ir:5050/all-uploads/' +
                              item.Document.file
                          "
                          target="_blank"
                        >
                          <img
                            :src="
                              'http://animoshaver.ir:5050/all-uploads/' +
                                item.Document.file
                            "
                            style="width:100px;height:100px;border-radius:10px"
                          />
                        </a>
                        <p
                          v-else
                          class="text-xs-left messageme-text"
                          style="margin: 0px !important;background: #90ee90;padding: 2%;border-radius: 15px;border-top-right-radius: 0;border-top-left-radius: 15px;padding: 10px 15px 5px;text-align: right !important;color: rgba(0, 0, 0, 0.87);max-width: 100%;"
                        >
                          {{ item.messageBody }}
                        </p>
                      </v-subheader>
                    </v-flex>
                    <v-flex v-else xs6 class="my-1" style="margin-right:10%">
                      <v-subheader
                        class="messageguest"
                        style="text-align: left;height: 100% !important;padding: 0px 10px;border-top-right-radius: 15px;margin-top: 1%;margin-left: -80%;direction: ltr;"
                      >
                        <a
                          v-if="item.Document"
                          :href="
                            'http://animoshaver.ir:5050/all-uploads/' +
                              item.Document.file
                          "
                          target="_blank"
                        >
                          <img
                            :src="
                              'http://animoshaver.ir:5050/all-uploads/' +
                                item.Document.file
                            "
                            style="width:100px;height:100px;border-radius:10px"
                          />
                        </a>
                        <p
                          v-else
                          class="text-xs-right messageguest-text"
                          style="margin: 0px !important;background: #fff;padding: 2%;border-radius: 15px;border-top-left-radius: 0;padding: 10px 15px 5px;text-align: right !important;border-top-right-radius: 15px;color: rgba(0, 0, 0, 0.87);max-width: 100%;"
                        >
                          {{ item.messageBody }}
                        </p>
                      </v-subheader>
                    </v-flex>
                  </v-layout>
                </v-list>
              </v-card-text>
              <v-card-actions
                class="pa-0"
                style="position: relative;width: 100%;bottom: 0;background: #FFF;"
              >
                <v-form style="width:100%" @submit.prevent="submit">
                  <v-row class="ma-0" style="width:100%">
                    <v-col
                      cols="2"
                      class="py-0 pl-0 pr-2"
                      style="text-align: center;align-self: center;"
                    >
                      <v-btn
                        depressed
                        fab
                        dark
                        small
                        color="indigo"
                        type="submit"
                      >
                        <v-icon dark>mdi-send</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col
                      cols="2"
                      class="py-3 pl-2 mt-0"
                      style="text-align: center;align-self: center;height:auto;"
                    >
                      <ModalSendFile />
                    </v-col>
                    <v-col
                      cols="6"
                      class="py-3 pl-2 mt-0"
                      style="text-align: center;align-self: center;height:auto;"
                    >
                      <v-textarea
                        v-model="msg"
                        auto-grow
                        multi-line
                        placeholder="پیام . . ."
                        row-height="5"
                        rounded
                        class="pt-0"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-actions>
            </v-card>
            <v-card-text class="pa-0"> </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ModalSendFile from '~/components/ModalSendFile'
export default {
  components: { ModalSendFile },
  layout: 'chat',
  data: () => ({
    logs: [],
    msg: null,
    userId2: null
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('events', {
      findEventsInStore: 'find'
    }),
    ...mapGetters('messages', {
      findMessagesInStore: 'find'
    }),
    currentEvent() {
      const user = this.user
      if (user !== null) {
        const onlineEvents = this.findEventsInStore({
          query: {
            $or: [{ reservedId: user.id }, { userId: user.id }],
            eventTypeId: 600
          }
        }).data

        const event = onlineEvents.length > 0 ? onlineEvents[0] : null
        if (event !== null) {
          this.fetchMessages({
            query: {
              $sort: { id: -1 },
              eventId: event.id
            }
          })
        }
        return event
      }
      return null
    },
    messages() {
      if (this.currentEvent !== null) {
        return this.findMessagesInStore({
          query: {
            $sort: { createdAt: -1 },
            eventId: this.currentEvent.id
          }
        }).data
      }
      return []
    },
    timeChat() {
      return (
        (Math.floor(this.currentEvent.remainingTime / 60) % 60) +
        ':' +
        (this.currentEvent.remainingTime % 60)
      )
    },
    personName() {
      const user = this.user
      if (user !== null && this.currentEvent !== null) {
        const person =
          this.currentEvent.ReservedUser.id !== user.id
            ? this.currentEvent.ReservedUser.name +
              ' ' +
              this.currentEvent.ReservedUser.family
            : this.currentEvent.EventUser.name +
              ' ' +
              this.currentEvent.EventUser.family
        return person
      }
      return ''
    },
    personTitle() {
      const user = this.user
      if (user !== null && this.currentEvent !== null) {
        const person =
          this.currentEvent.ReservedUser.id !== user.id ? 'مشاور' : 'کاربر'
        return person
      }
      return ''
    }
  },
  methods: {
    ...mapActions('messages', {
      fetchMessages: 'find'
    }),
    ...mapActions('messages', {
      createMessage: 'create'
    }),
    ...mapActions('events', {
      editEvent: 'patch'
    }),
    ...mapActions('events', {
      findOnlineEvent: 'find'
    }),
    submit() {
      if (this.currentEvent !== null) {
        this.createMessage({
          messageBody: this.msg,
          userId: this.user.id,
          messageTypeId: 1,
          messageSourceId: 1,
          eventId: this.currentEvent.id
        })
        this.msg = ''
      }
    },
    closeEvent() {
      if (this.currentEvent !== null) {
        let eventTypeId = 100
        if (this.user.userTypeId === 1) {
          eventTypeId = 110
        }
        this.editEvent([this.currentEvent.id, { eventTypeId }, {}])
      }
    },
    backMe() {
      this.$router.back()
    }
  },
  watch: {
    user(val) {
      if (val !== null) {
        this.findOnlineEvent({
          query: {
            $or: [{ reservedId: val.id }, { userId: val.id }],
            eventTypeId: 600
          }
        })
      }
    },
    messages(val) {
      // console.log(val)
    }
  }
}
</script>
<style>
.v-text-field__details {
  display: none !important;
}
.v-input__slot {
  margin: 0px !important;
}
</style>
