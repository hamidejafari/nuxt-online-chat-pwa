<template>
  <v-card flat max-width="600" class="mx-auto">
    <h4 class="h4 text-center py-3 px-1 ma-0 indigo--text">
      ریز تراکنش های اعتبار
    </h4>
    <v-divider />
    <v-container>
      <v-card v-for="item in items" :key="item" flat class="pb-3 mb-3 card-d">
        <v-toolbar class="elevation-0 pa-0 transparent">
          <p class="ma-0 indigo--text font-weight-bold">
            مبلغ :
            <span class="black--text font-weight-light">
              {{ item.amount }}
            </span>
          </p>
          <v-spacer></v-spacer>
          <p class="ma-0 indigo--text font-weight-bold">
            درگاه :
            <span class="black--text font-weight-light">
              {{ item.bank }}
            </span>
          </p>
        </v-toolbar>
        <p class="ma-0 px-4 indigo--text font-weight-bold">
          تاریخ :
          <span class="float-left black--text font-weight-light">
            {{ item.date }}
          </span>
        </p>
        <p class="mx-0 mb-0 mt-3 px-4 red--text factor-p">
          {{ item.description }}
        </p>
      </v-card>
    </v-container>
    <v-btn
      fab
      fixed
      to="/Charge"
      class="green white--text font-weight-bold fixed-btn"
    >
      <v-icon size="30"> mdi-cash</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  layout: 'back',
  data: () => ({
    items: [
      {
        amount: '۱۰/۰۰۰',
        bank: 'بانک ملت',
        date: '۱۱:۱۰:۱۸ - ۲۴/۰۹/۱۳۹۸',
        description: 'توضیحات تستی ۱ تراکنش'
      },
      {
        amount: '۲۰/۰۰۰',
        bank: 'بانک ملت',
        date: '۱۱:۱۰:۱۸ - ۲۴/۰۹/۱۳۹۸',
        description: 'توضیحات تستی ۲ تراکنش'
      },
      {
        amount: '۳۰/۰۰۰',
        bank: 'بانک ملت',
        date: '۱۱:۱۰:۱۸ - ۲۴/۰۹/۱۳۹۸',
        description: 'توضیحات تستی ۳ تراکنش'
      },
      {
        amount: '۴۰/۰۰۰',
        bank: 'بانک ملت',
        date: '۱۱:۱۰:۱۸ - ۲۴/۰۹/۱۳۹۸',
        description: 'توضیحات تستی ۴ تراکنش'
      },
      {
        amount: '۵۰/۰۰۰',
        bank: 'بانک ملت',
        date: '۱۱:۱۰:۱۸ - ۲۴/۰۹/۱۳۹۸',
        description: 'توضیحات تستی ۵ تراکنش'
      }
    ]
  })
}
</script>
<style>
.card-d {
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
  background-color: rgba(243, 228, 181, 0.4) !important;
}
.h4 {
  background-color: #f3e4b5;
}
.factor-p {
  font-size: 12px;
  font-weight: bold;
}
.fixed-btn {
  bottom: 8.05vh;
  left: 1vh;
}
</style>
