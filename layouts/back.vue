<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :right="right"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon class="indigo--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              class="font-weight-black indigo--text"
              v-text="item.title"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed color="indigo">
      <!-- <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="clipped = !clipped"> </v-btn> -->
      <v-btn icon color="white" @click="backMe()">
        <v-icon style="font-size: 40px;">mdi-arrow-right-bold-circle</v-icon>
      </v-btn>
      <v-spacer />
      <p class="white--text my-4 font-weight-bold" style="font-size:20px">
        آنی مشاور
      </p>
      <v-spacer />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <img src="/logo-ani5.png" alt="Vuetify.js" width="40" />
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-row style="height:56px"></v-row>
      <nuxt />
    </v-content>
    <v-footer app class="pa-0">
      <v-row justify="center" no-gutters>
        <v-bottom-navigation v-model="bottomNav" class="indigo">
          <v-btn
            v-for="icon in icons"
            :key="icon"
            :to="icon.to"
            class="mx-1"
            dark
            icon
            fab
          >
            <span class="white--text">{{ icon.text }}</span>
            <v-icon class="white--text mb-1" size="24px">
              {{ icon.icon }}
            </v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-account',
          title: 'ثبت نام',
          to: '/Register'
        },
        {
          icon: 'mdi-lock-open',
          title: 'ورود',
          to: '/Login'
        },
        {
          icon: 'mdi-apps',
          title: 'لیست مشاوران',
          to: '/PersonList'
        },
        {
          icon: 'mdi-apps',
          title: 'صفحه چت',
          to: '/ChatRoom'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      icons: [
        {
          icon: 'mdi-home',
          text: 'خانه',
          to: '/'
        },
        {
          icon: 'mdi-account-multiple',
          text: 'مشاوران',
          to: '/Persons'
        },
        {
          icon: 'mdi-clipboard-text',
          text: 'گزارشات',
          to: '/Report'
        },
        {
          icon: 'mdi-account',
          text: 'پروفایل',
          to: '/Profile'
        }
      ]
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('auth', ['user']),
    ...mapGetters('eventRequests', {
      findEventRequestsInStore: 'find'
    }),
    ...mapGetters('events', {
      findEventsInStore: 'find'
    }),
    ...mapGetters('attempts', {
      findAttemptsInStore: 'find'
    }),
    sentEventRequestDialogVisible: {
      get() {
        return this.$store.getters.sentEventRequestDialogVisible
      },
      // setter
      set(newValue) {
        this.setSentEventRequestDialogVisible(newValue)
      }
    },
    recievedRequestsDialogVisible: {
      get() {
        return this.$store.getters.recievedRequestsDialogVisible
      },
      // setter
      set(newValue) {
        this.setRecievedEventRequestDialogVisible(newValue)
      }
    },
    eventRequests() {
      const user = this.user
      if (user) {
        if (user.userTypeId > 1) {
          return this.findEventRequestsInStore({
            query: {
              $sort: { id: 1 },
              typeId: 1,
              userId: { $ne: user.id },
              $or: [
                { eventId: user.onlineEvent ? user.onlineEvent.id : -1 },
                {
                  expertiseId: {
                    $in: this.expertiseIds
                  }
                }
              ],
              approveDate: null,
              deletedAt: null
            }
          }).data
        } else {
          return this.findEventRequestsInStore({
            query: {
              $sort: { id: 1 },
              userId: user.id,
              approveDate: null,
              deletedAt: null
            }
          }).data
        }
      }
      return []
    },
    openEvents() {
      const user = this.user
      if (user) {
        const events = this.findEventsInStore({
          query: {
            $or: [{ reservedId: user.id }, { userId: user.id }],
            eventTypeId: 600
          }
        }).data
        if (events.length > 0) return events[0]
        return null
      }
      return null
    },
    attempts() {
      return this.findAttemptsInStore({
        query: { $sort: { id: 1 } }
      }).data
    },
    expertiseIds() {
      const myArray = []
      if (this.user && this.user.expertises) {
        this.user.expertises.forEach((itm) => myArray.push(itm.expertiseId))
      }
      return myArray
    },
    navItems() {
      if (this.user != null) {
        return [
          {
            icon: 'mdi-apps',
            title: 'صفحه اصلی',
            to: '/'
          },
          {
            icon: 'mdi-apps',
            title: 'پروفایل کاربری',
            to: '/PersonList'
          },
          {
            icon: 'mdi-apps',
            title: 'پرسش یک سوال',
            to: '/Question'
          },
          {
            icon: 'mdi-apps',
            title: 'درخواست خدمات',
            to: '/OurServices'
          }
        ]
      } else {
        return [
          {
            icon: 'mdi-account',
            title: 'ثبت نام',
            to: '/Register'
          },
          {
            icon: 'mdi-lock-open',
            title: 'ورود',
            to: '/Login'
          }
        ]
      }
    }
  },

  watch: {
    user(val) {
      const user = val

      this.findEvents({
        query: {
          $limit: 500,
          $sort: { start: 1 },
          $or: [{ reservedId: user.id }, { userId: user.id }],
          eventTypeId: 600
        }
      })
      this.findEventRequests({
        query: {
          $sort: { id: -1 },
          $or: [
            { eventId: user.onlineEvent ? user.onlineEvent.id : -1 },
            {
              expertiseId: {
                $in: this.expertiseIds
              }
            }
          ],
          approveDate: null,
          deletedAt: null
        }
      })
    },
    eventRequests(val) {
      const user = this.user
      if (user && user.userTypeId > 1 && user.online) {
        if (val.length > 0) {
          this.setRecievedRequestsDialogVisible(true)
        } else {
          this.setRecievedRequestsDialogVisible(false)
        }
      }

      if (val.length === 0) {
        if (this.sentEventRequestDialogVisible) {
          this.sentEventRequestDialogVisible = false
          alert(
            'درخواست شما در زمان مقرر ۳ دقیقه تایید نشد. در صورت تمایل مجدد تلاش کنید.'
          )
        }
      }
    },
    openEvents(val) {
      if (val && val.eventTypeId >= 600) {
        this.setRecievedRequestsDialogVisible(false)
        this.setCreateEventRequestDialogVisible(false)
        this.setSentEventRequestDialogVisible(false)
        this.$router.push({ path: '/ChatRoom' })
      }
    }
  },
  methods: {
    backMe() {
      this.$router.back()
    },
    ...mapActions('attempts', {
      acceptEventRequest: 'create'
    }),
    ...mapActions('events', {
      findEvents: 'find',
      editEvent: 'patch'
    }),
    ...mapActions('eventRequests', {
      findEventRequests: 'find'
    }),
    ...mapMutations({
      setRecievedRequestsDialogVisible: 'setRecievedRequestsDialogVisible',
      setCreateEventRequestDialogVisible: 'setCreateEventRequestDialogVisible',
      setSentEventRequestDialogVisible: 'setSentEventRequestDialogVisible'
    }),
    accept(eventRequestId) {
      this.acceptEventRequest({
        requestId: eventRequestId
      })
    },
    reject(eventRequestId) {}
  }
}
</script>
<style>
@font-face {
  font-family: iransans;
  src: url('../assets/iransans/IRANSansMobile.ttf');
}
.v-application {
  font-family: 'iransans' !important;
}
</style>
