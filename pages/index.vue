<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
      </div>
      <v-card style="border-radius: 15px;box-shadow:none">
        <Buttons />
        <HomeButtons v-if="user === null" />
        <HomeButtons v-else-if="user.status !== 0" />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '~/components/Logo.vue'
import Buttons from '~/components/Buttons.vue'
import HomeButtons from '~/components/HomeButtons.vue'

export default {
  components: {
    Logo,
    Buttons,
    HomeButtons
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>
