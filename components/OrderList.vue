<template>
  <v-list two-line subheader class="pa-0">
    <div v-for="item in orders" :key="item.id">
      <v-list-item
        class="my-2 mx-2 px-2 blue-grey lighten-5"
        style="border: 1px solid#999;border-radius: 15px;background: #fafaee !important;"
      >
        <v-list-item-content>
          <v-list-item-title
            v-text="'مبلغ : ' + item.numeralPayments + ' تومان '"
          ></v-list-item-title>
          <v-list-item-subtitle
            v-text="'تاریخ: ' + item.jalaliCreatedAt"
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-text="'شماره فاکتور : ' + item.id"
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-text="item.description"
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-text="'درگاه : بانک ملت'"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data: () => ({
    services: ['تستی۱', 'تستی۲', 'تستی۳', 'تستی۴'],
    items: [
      {
        title: 'عنوان خدمات',
        subtitle: 'متن تستی متن تستی متن تستی',
        to: '/'
      },
      {
        title: 'عنوان خدمات',
        subtitle: 'متن تستی متن تستی متن تستی',
        to: '/'
      }
    ]
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('orders', {
      findOrdersInStore: 'find'
    }),
    orders() {
      if (this.user !== null) {
        return this.findOrdersInStore({
          query: {
            $sort: { createdAt: 1 },
            userId: this.user.id,
            status: 1
          }
        }).data
      }
      return []
    }
  },
  watch: {
    user(val) {
      this.loadOrders(val)
    }
  },
  mounted() {
    this.loadOrders(this.user)
  },
  methods: {
    ...mapActions('orders', {
      findOrders: 'find'
    }),
    ...mapMutations('orders', {
      clearAllOrders: 'clearAll'
    }),
    loadOrders(user) {
      if (user !== null) {
        this.clearAllOrders()
        this.loading = true
        this.findOrders({
          query: {
            $sort: { createdAt: -1 },
            userId: user.id,
            status: 1
          }
        })
      }
    }
  }
}
</script>
<style>
.v-list-item__subtitle {
  padding: 3px !important;
}
</style>
