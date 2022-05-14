<template>
  <v-list two-line subheader class="pa-0">
    <div v-for="item in accepts" :key="item.id">
      <v-list-item
        v-if="item.status == 1"
        class="my-2 mx-2 px-2 blue-grey lighten-5"
        style="border: 1px solid#999;border-radius: 15px;background: #e9fce7 !important;"
      >
        <v-list-item-content>
          <v-list-item-title
            v-text="item.MainService.title"
          ></v-list-item-title>
          <v-list-item-subtitle
            v-text="'شماره پیگیری : ' + item.id"
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-if="item.status == 0"
            v-text="noneOrderStatus"
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-if="item.status == 1"
            v-text="hasOrderStatus"
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-if="item.status === 2"
            v-text="payedOrderStatus"
          ></v-list-item-subtitle>

          <v-list-item-subtitle
            v-if="item.status == 1"
            v-text="'هزینه بازرسی :‌' + payPrice(item.price)"
          ></v-list-item-subtitle>
          <v-btn
            v-if="item.status == 1"
            color="indigo"
            class="white--text my-1"
            block
            rounded
            style="background: #3dbb39 !important;"
            @click="payAccept(item.id)"
          >
            پرداخت هزینه
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-else-if="item.status == 2 || item.status == 0"
        class="my-2 mx-2 px-2 blue-grey lighten-5"
        style="border: 1px solid#999;border-radius: 15px;background: #fafaee !important;"
      >
        <v-list-item-content>
          <v-list-item-title
            v-text="item.MainService.title"
          ></v-list-item-title>
          <v-list-item-subtitle
            v-text="'شماره پیگیری : ' + item.id"
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-if="item.status == 0"
            v-text="noneOrderStatus"
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-if="item.status == 1"
            v-text="hasOrderStatus"
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-if="item.status === 2"
            v-text="payedOrderStatus"
          ></v-list-item-subtitle>

          <v-list-item-subtitle
            v-if="item.status == 1"
            v-text="'هزینه بازرسی :‌' + payPrice(item.price)"
          ></v-list-item-subtitle>
          <v-btn
            v-if="item.status == 1"
            color="indigo"
            class="white--text my-1"
            block
            rounded
            style="background: #3dbb39 !important;"
            @click="payAccept(item.id)"
          >
            پرداخت هزینه
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
const numeral = require('numeral')

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
    ...mapGetters('accepts', {
      findAcceptsInStore: 'find'
    }),
    accepts() {
      const user = this.user
      return this.findAcceptsInStore({
        query: {
          $sort: { createdAt: -1 },
          userId: user.id
        }
      }).data
    },
    noneOrderStatus() {
      return 'وضعیت : درحال بررسی'
    },
    hasOrderStatus() {
      return 'وضعیت : فاکتور صادر شده'
    },
    payedOrderStatus() {
      return 'وضعیت : پرداخت شده'
    },
    services() {
      console.log(this.$store.getters.services)
      if (this.$store.getters.services == null) {
        return []
      } else {
        return this.$store.getters.services.data
      }
    }
  },
  mounted() {
    this.$store.dispatch('getServiceCategories', 1)
    const user = this.user
    this.loadAccepts(user)
  },
  methods: {
    ...mapActions('accepts', {
      findAccepts: 'find'
    }),
    loadAccepts(user) {
      this.findAccepts({
        query: {
          $sort: { createdAt: -1 },
          userId: user.id
        }
      })
    },
    payAccept(id) {
      window.location.href =
        'https://animoshaver.ir/mellat-payment-service/' + id
    },
    payPrice(price) {
      return numeral(price).format('0,0')
    }
  }
}
</script>
<style>
.v-list-item__subtitle {
  padding: 3px !important;
}
</style>
