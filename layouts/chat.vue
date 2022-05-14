<template>
  <v-app dark>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
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
          to: '/'
        },
        {
          icon: 'mdi-lock-open',
          to: '/Login'
        },
        {
          icon: 'mdi-account',
          to: '/Register'
        }
      ]
    }
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
