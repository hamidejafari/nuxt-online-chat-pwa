<template>
  <v-row class="mx-0 px-2" style="width:100%">
    <v-col cols="6" md="4" class="pa-1">
      <v-btn class="btprf" depressed block @click="comingSoon">
        رزروها
      </v-btn>
    </v-col>
    <v-col cols="6" md="4" class="pa-1">
      <v-btn class="btprf" depressed block to="/Charge">
        افزایش اعتبار
      </v-btn>
    </v-col>
    <v-col cols="12" md="4" class="pa-1">
      <v-btn class="btprf" depressed block to="/Files">
        مدارک من
      </v-btn>
    </v-col>
    <v-col cols="12" md="4" class="pa-1">
      <v-btn class="btprf" depressed block @click="logoutUser">
        خروج
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('auth', ['logout']),

    comingSoon() {
      alert('به زودی راه اندازی میشود .... ')
    },
    logoutUser() {
      this.logout()
      this.$router.push({ path: '/Login' })
    }
  }
}
</script>
<style>
.btprf {
  border: 1px solid rgb(117, 81, 3) !important;
  border-radius: 0px 10px;
  background-color: #faf1df !important;
}
</style>
