<template>
  <v-card max-width="100%" class="mx-auto" style="box-shadow: none;">
    <h5
      class="indigo--text pt-3 pb-2 text-center my-0"
      style="background: #f3e4b5;"
    >
      لیست سوالات پرسیده شده از شما
    </h5>
    <RequestListAdvisor />
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import RequestListAdvisor from '~/components/question/RequestListAdvisor.vue'
const numeral = require('numeral')
export default {
  components: {
    RequestListAdvisor
  },
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
