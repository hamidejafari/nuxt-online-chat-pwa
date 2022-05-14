<template>
  <v-list two-line subheader class="pa-0">
    <div v-for="item in events" :key="item.id">
      <v-list-item
        class="my-2 mx-2 px-2 blue-grey lighten-5"
        style="border: 1px solid#999;border-radius: 15px;background: #fafaee !important;"
      >
        <v-list-item-content>
          <v-list-item-subtitle
            v-text="
              ' مشاور :  ' +
                item.ReservedUser.name +
                ' ' +
                item.ReservedUser.family
            "
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-text="
              ' کاربر :  ' + item.EventUser.name + ' ' + item.EventUser.family
            "
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-text="'تاریخ :‌ ' + item.jalaliStart"
          ></v-list-item-subtitle>
          <v-btn
            color="indigo"
            class="white--text my-1"
            block
            rounded
            style="background: #3dbb39 !important;    min-width: 38% !important;
    max-width: 38% !important;
"
            @click="eventDetails(item.id)"
          >
            نمایش جزییات
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
const _ = require('lodash')

export default {
  data: () => ({
    services: ['تستی۱', 'تستی۲', 'تستی۳', 'تستی۴'],
    items: [
      {
        title: 'عنوان خدمات',
        subtitle: 'متن تستی متن تستی متن تستی',
        to: '/'
      },
      {
        title: 'عنوان خدمات',
        subtitle: 'متن تستی متن تستی متن تستی',
        to: '/'
      }
    ],
    eventType: 'isChat'
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('events', {
      findEventsInStore: 'find'
    }),
    ...mapGetters('messages', {
      findMessagesInStore: 'find'
    }),
    events() {
      return this.findEventsInStore({
        query: {
          $sort: { createdAt: -1 }
        }
      }).data
    },
    eventMessages() {
      return this.findMessagesInStore({
        query: {
          $sort: { createdAt: -1 }
        }
      }).data
    },
    query() {
      const initialQuery = {
        $sort: { createdAt: -1 },
        $or: {
          reservedId: this.user.id,
          userId: this.user.id
        },
        eventTypeId: {
          $in: [100, 110, 120]
        }
      }
      _.unset(initialQuery, this.eventType)

      _.set(initialQuery, this.eventType, 1)

      return initialQuery
    }
  },
  watch: {
    eventType(val) {
      this.loadEvents(this.user)
    }
  },
  mounted() {
    this.loadEvents(this.user)
  },
  methods: {
    ...mapActions('events', {
      findEvents: 'find'
    }),
    ...mapActions('messages', {
      findMessages: 'find'
    }),
    ...mapMutations('events', {
      clearEvents: 'clearAll'
    }),
    ...mapMutations('messages', {
      clearMessages: 'clearAll'
    }),
    opeChat() {},
    sendMessage(text) {},
    onMessageWasSent(message) {},
    loadEvents(user, skip, limit) {
      if (user !== null) {
        this.loading = true
        this.clearEvents()
        this.findEvents({
          query: this.query
        })
      }
    },
    eventDetails(eventId) {
      this.$router.push({ path: '/ChatDetails/' + eventId })
    }
  }
}
</script>
<style>
.v-list-item__subtitle {
  padding: 3px !important;
}
</style>
