<template>
  <v-list two-line subheader class="pa-0">
    <div v-for="item in tickets" :key="item.id">
      <v-list-item
        class="my-2 mx-2 px-2 blue-grey lighten-5"
        style="border: 1px solid#999;border-radius: 15px;background: #fafaee !important;"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle
            v-text="item.jalaliCreatedAt"
          ></v-list-item-subtitle>
          <v-list-item-subtitle v-text="item.content"></v-list-item-subtitle>
          <v-list-item-subtitle
            v-if="item.Reply == null"
            v-text="' پاسخ : در انتظار پاسخ '"
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-else
            v-text="'پاسخ :‌' + item.Reply"
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
    ...mapGetters('tickets', {
      findTicketsInStore: 'find'
    }),
    tickets() {
      if (this.user !== null) {
        console.log(
          this.findTicketsInStore({
            query: {
              $sort: { createdAt: -1 },
              userId: this.user.id,
              parentId: null
            }
          }).data
        )
        return this.findTicketsInStore({
          query: {
            $sort: { createdAt: -1 },
            userId: this.user.id,
            parentId: null
          }
        }).data
      }
      return []
    }
  },
  watch: {
    user(val) {
      this.loadTickets(val)
    }
  },
  mounted() {
    this.loadTickets(this.user)
  },
  methods: {
    ...mapActions('tickets', {
      findTickets: 'find'
    }),
    ...mapMutations('tickets', {
      clearAllTickets: 'clearAll'
    }),
    loadTickets(user) {
      if (user !== null) {
        this.clearAllTickets()
        this.loading = true
        this.findTickets({
          query: {
            $sort: { createdAt: -1 },
            userId: user.id,
            parentId: null
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
