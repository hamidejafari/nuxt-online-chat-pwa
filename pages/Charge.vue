<template>
  <v-card max-width="600" class="mx-auto" style="box-shadow: none;">
    <h4 class="h4 text-center py-3 px-1 ma-0 indigo--text">شارژ کیف پول</h4>
    <v-toolbar class="elevation-0 pa-0 grey lighten-3">
      <p class="ma-0 indigo--text font-weight-bold">اعتبار فعلی شما :</p>
      <v-spacer></v-spacer>
      <p class="ma-0 green--text font-weight-bold">
        {{ walletPrice(user.wallet) }} ریال
      </p>
    </v-toolbar>
    <v-row class="mx-0 pt-2" style="width:100%">
      <v-col cols="12" md="6" class="py-1">
        <v-text-field
          v-model="pricePay"
          placeholder="مبلغ مورد نظر را وارد نمایید :"
          filled
          rounded
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-row class="ma-0" style="width:100%">
          <v-col cols="12" md="6" class="pb-0" align-self="center">
            <span class="indigo--text font-weight-bold">
              مبلغ قابل پرداخت :
              <span class="red--text float-left"
                >{{ walletPrice(pricePay) }} تومان</span
              >
            </span>
          </v-col>
          <v-col cols="12" md="6" align-self="center">
            <v-btn
              rounded
              depressed
              block
              class="green white--text"
              @click="charge"
            >
              <v-icon left>mdi-cart-outline</v-icon>
              <span>برو به بانک</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-divider />
    </v-row>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const numeral = require('numeral')
export default {
  data: () => ({
    pricePay: 15000
  }),
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('orders', {
      createOrder: 'create'
    }),
    walletPrice(wallet) {
      return numeral(wallet).format('0,0')
    },
    charge() {
      this.createOrder({
        totalPrice: this.pricePay
      }).then((response) => {
        window.location.href =
          'https://animoshaver.ir/mellat-payment/' + response.id
      })
    }
  }
}
</script>

<style>
.v-text-field__details {
  display: none;
}
.h4 {
  background-color: #f3e4b5;
}
</style>
