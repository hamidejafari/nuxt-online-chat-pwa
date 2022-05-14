<template>
  <v-card max-width="600" class="mx-auto" style="box-shadow: none;">
    <h4 class="h4 text-center py-3 px-1 ma-0 indigo--text">
      گزارشات
    </h4>
    <v-list two-line subheader class="pa-0">
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        class="my-2 mx-2 btprf"
      >
        <v-list-item-avatar>
          <v-icon class="indigo white--text" v-text="item.icon"></v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <p
            class="my-0 font-weight-light blue-grey--text"
            style="font-size:12px;"
            v-text="item.subtitle"
          ></p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  layout: 'back',
  data: () => ({
    items: [
      {
        icon: 'mdi-credit-card',
        title: 'ریز تراکنش های اعتبار',
        to: '/Report/OrderReport'
      },
      {
        icon: 'mdi-account-edit',
        title: 'پشتیبان',
        to: '/Report/TicketReport'
      },
      {
        icon: 'mdi-message-text',
        title: 'مشاوره',
        to: '/Report/EventReport'
      }
    ]
  })
}
</script>
<style>
.btprf {
  border: 1px solid rgb(117, 81, 3) !important;
  border-radius: 0px 10px;
  background-color: #faf1df !important;
}
.h4 {
  background-color: #f3e4b5;
}
.v-text-field__details {
  display: none;
}
</style>
