<template>
  <v-card class="card-profile">
    <v-list class="list-profile">
      <template>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="indigo--text"
              v-html="'نام و نام خانوادگی :'"
            ></v-list-item-title>
            <v-list-item-subtitle
              class="indigo--text text-left pt-1"
              style="direction: ltr;"
              v-html="user.name + ' ' + user.family"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mx-3 indigo"></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="indigo--text"
              v-html="'ایمیل :'"
            ></v-list-item-title>
            <v-list-item-subtitle
              class="indigo--text text-left pt-1"
              style="direction: ltr;"
              v-html="user.email"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mx-3 indigo"></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="indigo--text"
              v-html="'شماره همراه :'"
            ></v-list-item-title>
            <v-list-item-subtitle
              class="indigo--text text-left pt-1"
              style="direction: ltr;"
              v-html="user.mobile"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mx-3 indigo"></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="indigo--text"
              v-html="'ایدی تلگرام :'"
            ></v-list-item-title>
            <v-list-item-subtitle
              class="indigo--text text-left pt-1"
              style="direction: ltr;"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mx-3 indigo"></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="indigo--text"
              v-html="'عنوان شغلی :'"
            ></v-list-item-title>
            <v-list-item-subtitle
              class="indigo--text text-left pt-1"
              style="direction: ltr;"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
const numeral = require('numeral')
export default {
  layout: 'back',
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    walletPrice(wallet) {
      return numeral(wallet).format('0,0')
    }
  }
}
</script>

<style>
.avatar-profile {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7) !important;
}
.back-avatar {
  border-radius: 0 0 100% 100% !important;
}
.card-profile {
  box-shadow: none !important;
}
.list-profile {
  background-color: #f8f9fa !important;
}
</style>
