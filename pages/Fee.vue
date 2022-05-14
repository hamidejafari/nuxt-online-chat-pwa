<template>
  <v-card flat max-width="600" class="mx-auto">
    <h4 class="h4 text-center py-3 px-1 ma-0 indigo--text">
      حق مشاوره
    </h4>
    <v-divider />
    <v-container>
      <v-card v-for="item in items" :key="item" flat class="py-3 mb-3 card-d">
        <p class="ma-3 px-4 indigo--text font-weight-bold">
          تاریخ :
          <span class="float-left black--text font-weight-light">
            {{ item.date }}
          </span>
        </p>
        <p class="ma-3 px-4 indigo--text font-weight-bold">
          موضوع :
          <span class="float-left black--text font-weight-light">
            {{ item.topic }}
          </span>
        </p>
        <p class="ma-3 px-4 indigo--text font-weight-bold">
          کاربر :
          <span class="float-left black--text font-weight-light">
            {{ item.user }}
          </span>
        </p>
        <p class="ma-3 px-4 indigo--text font-weight-bold">
          مدت زمان مشاوره :
          <span class="float-left black--text font-weight-light">
            {{ item.time }}
          </span>
        </p>
        <p class="ma-3 px-4 indigo--text font-weight-bold">
          نوع مشاوره :
          <span class="float-left black--text font-weight-light">
            {{ item.consultation }}
          </span>
        </p>
        <p class="ma-3 px-4 indigo--text font-weight-bold">
          حق مشاوره در هر دقیقه :
          <span class="float-left black--text font-weight-light">
            {{ item.fee }}
          </span>
        </p>
        <p class="ma-3 px-4 indigo--text font-weight-bold">
          مالیات :
          <span class="float-left black--text font-weight-light">
            {{ item.tax }}
          </span>
        </p>
        <p class="ma-3 px-4 indigo--text font-weight-bold">
          جمع کل :
          <span class="float-left black--text font-weight-light">
            {{ item.total }}
          </span>
        </p>
        <p class="ma-3 px-4 indigo--text font-weight-bold">
          سهم مشاور از این مشاوره :
          <span class="float-left black--text font-weight-light">
            {{ item.share }}
          </span>
        </p>
        <p class="ma-3 px-4 indigo--text font-weight-bold">
          وضعیت :
          <span class="float-left black--text font-weight-light">
            {{ item.condition }}
          </span>
        </p>
      </v-card>
    </v-container>
    <v-btn
      fixed
      block
      tile
      to="/Charge"
      class="green white--text font-weight-bold fixed-btn-top"
    >
      درخواست تسویه حساب
    </v-btn>
  </v-card>
</template>

<script>
export default {
  layout: 'back',
  data: () => ({
    items: [
      {
        date: '۱۱:۱۰:۱۸ - ۲۴/۰۹/۱۳۹۸',
        topic: 'پشتیبان فنی اپلیکیشن',
        user: 'نام و نام خانوادگی',
        time: '۱۰ دقیقه',
        consultation: 'تلفنی',
        fee: '۳۰۰۰ تومان',
        tax: 'مالیات',
        total: '۳۰۰۰۰ تومان',
        share: '۲۰۲۵۰ تومان',
        condition: 'تسویه نشده'
      },
      {
        date: '۱۱:۱۰:۱۸ - ۲۴/۰۹/۱۳۹۸',
        topic: 'تستی تستی',
        user: 'نام و نام خانوادگی',
        time: '۱۰ دقیقه',
        consultation: 'تلفنی',
        fee: '۳۰۰۰ تومان',
        tax: 'مالیات',
        total: '۳۰۰۰۰ تومان',
        share: '۲۰۲۵۰ تومان',
        condition: 'تسویه نشده'
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
.fixed-btn-top {
  bottom: 7.05vh;
}
</style>
