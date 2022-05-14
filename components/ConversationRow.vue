<template>
  <div style="width:100%">
    <v-list-item
      class="my-2 mx-2 pr-0 blue-grey lighten-5 "
      style="border: 1px solid#999;border-radius: 15px;"
    >
      <v-badge
        v-if="person.online == 1 || person.online == true"
        bordered
        bottom
        color="green"
        dot
        offset-x="25"
        offset-y="20"
      >
        <v-list-item-avatar class="mr-0">
          <v-img :src="person.avatar"></v-img>
        </v-list-item-avatar>
      </v-badge>

      <v-list-item-avatar v-else>
        <v-img :src="person.avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title
          v-html="person.name + ' ' + person.family"
        ></v-list-item-title>
        <v-list-item-subtitle
          v-for="item in person.expertises"
          :key="item.Expertise.id"
          style="white-space: inherit;"
          v-html="item.Expertise.title"
        >
        </v-list-item-subtitle>
        <v-list-item-subtitle
          style="color:green;padding: 3px;"
          v-html="dateConv"
        ></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-icon>
        <v-btn
          v-if="!read"
          fab
          small
          style="background:green"
          @click="userDetails(person.id)"
        >
          <v-icon color="white">mdi-message-processing</v-icon>
        </v-btn>
        <v-btn v-else fab small @click="userDetails(person.id)">
          <v-icon color="indigo">mdi-message-processing</v-icon>
        </v-btn>
      </v-list-item-icon>
    </v-list-item>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  props: ['person', 'conversation'],
  data: () => ({}),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('events', {
      findEventsInStore: 'find'
    }),
    ...mapGetters('files', {
      findFilesInStore: 'find'
    }),
    personAvatar() {
      return '/user.png'
    },
    read() {
      if (this.user.userTypeId === 1) {
        if (this.conversation.userIsRead === 1) {
          return true
        } else {
          return false
        }
      } else if (this.conversation.advisorIsRead === 1) {
        return true
      } else {
        return false
      }
    },
    dateConv() {
      const moment = require('jalali-moment')
      return moment(this.conversation.updatedAt)
        .locale('fa')
        .format('HH:mm YYYY/MM/DD')
    }
  },
  methods: {
    ...mapMutations('users', {
      clearAllUsers: 'clearAll'
    }),
    userDetails(userId) {
      this.$router.push({ path: '/faq/' + userId })
    }
  }
}
</script>
