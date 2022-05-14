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
          <v-img :src="personAvatar"></v-img>
        </v-list-item-avatar>
      </v-badge>

      <v-list-item-avatar v-else>
        <v-img :src="personAvatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title
          v-html="person.name + ' ' + person.family"
        ></v-list-item-title>
        <v-list-item-subtitle
          v-for="item in person.expertises"
          :key="item.id"
          style="white-space: inherit;"
          v-html="item.title"
        >
        </v-list-item-subtitle>
        <v-layout class="rtl">
          <v-rating
            v-model="person.rate"
            background-color="orange"
            color="orange"
            small
          ></v-rating>
        </v-layout>
      </v-list-item-content>

      <v-list-item-icon>
        <v-btn fab small @click="userDetails(person.id)">
          <v-icon color="indigo">mdi-eye</v-icon>
        </v-btn>
      </v-list-item-icon>
    </v-list-item>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  props: ['person'],
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
      // console.log(this.personList.id)
      let y = null
      let x = 0
      console.log(this.person.files)
      for (x in this.person.files) {
        if (this.person.files[x].title === 'p') {
          y = this.person.files[x]
        }
      }
      if (y !== null) {
        return 'http://animoshaver.ir:5050/' + 'all-uploads/' + y.file
      } else {
        return '/user.png'
      }
    }
  },
  methods: {
    ...mapMutations('users', {
      clearAllUsers: 'clearAll'
    }),
    userDetails(userId) {
      this.$router.push({ path: '/PersonDetails/' + userId })
    }
  }
}
</script>
<style>
.v-icon.v-icon.v-icon--link {
  padding: 2px !important;
}
</style>
