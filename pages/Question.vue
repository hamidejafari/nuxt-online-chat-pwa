<template>
  <v-card max-width="100%" class="mx-auto" style="box-shadow: none;">
    <h5
      class="indigo--text pt-3 pb-2 text-center my-0"
      style="background: #f3e4b5;"
    >
      پرسش یک سوال از مشاور
    </h5>
    <h5
      class="indigo--text pt-3 pb-2 text-center my-0"
      style="background: rgb(255, 255, 255) none repeat scroll 0% 0%;
color: red !important;"
    >
      بابت هر سوال از مشاور 5,000 تومان از کیف پول شما کسر میشود
    </h5>
    <h5
      class="indigo--text pt-3 pb-2 text-center my-0"
      style="background: rgb(255, 255, 255) none repeat scroll 0% 0%;
color: red !important;"
    >
      میزان شارژ کیف پول : {{ walletPrice(user.wallet) }}
    </h5>
    <v-btn
      color="indigo"
      class="white--text my-1"
      block
      rounded
      style="background: #3ea422 !important;"
      to="Charge"
    >
      شارژ کیف پول
    </v-btn>
    <RequestForm />
    <h5
      class="indigo--text pt-3 pb-2 text-center my-0"
      style="background: #f3e4b5;"
    >
      لیست سوالاتی که تاکنون پرسیده اید
    </h5>
    <RequestList />
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import RequestList from '~/components/question/RequestList.vue'
import RequestForm from '~/components/question/RequestForm.vue'
const numeral = require('numeral')
export default {
  components: {
    RequestList,
    RequestForm
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
