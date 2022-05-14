<template>
  <v-card max-width="100%" class="mx-auto" style="box-shadow: none;">
    <h5
      class="indigo--text pt-3 pb-2 text-center my-0"
      style="background: #f3e4b5;"
    >
      لیست سوالاتی که تاکنون پرسیده اید
    </h5>
    <TicketList />
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import TicketList from '~/components/TicketList.vue'
const numeral = require('numeral')
export default {
  components: {
    TicketList
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
