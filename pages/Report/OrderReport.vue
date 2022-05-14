<template>
  <v-card max-width="100%" class="mx-auto" style="box-shadow: none;">
    <h5
      class="indigo--text pt-3 pb-2 text-center my-0"
      style="background: #f3e4b5;"
    >
      ریز تراکنش های اعتبار
    </h5>
    <OrderList />
  </v-card>
</template>

<script>
import OrderList from '~/components/OrderList.vue'
export default {
  components: {
    OrderList
  },
  layout: 'back'
}
</script>
