<template>
  <v-list subheader outline>
    <SendRequestModal />
    <v-list-item
      v-for="item in items"
      :key="item.title"
      :to="item.to"
      class="my-2 mx-2 px-1"
      style="border:1px solid #755103 !important;border-radius:0px 10px;background: #faf1df;"
    >
      <v-badge
        v-if="item.id == 1 && accepts > 0"
        color="red"
        :content="accepts"
        offset-x="80"
        offset-y="25"
      >
        <v-list-item-avatar size="60" class="mr-1">
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
      </v-badge>

      <v-list-item-avatar v-else size="60" class="mr-1">
        <v-img :src="item.avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title
          class="indigo--text"
          style="font-weight: bold;"
          v-text="item.title"
        ></v-list-item-title>
        <v-list-item-subtitle
          class="indigo--text"
          v-text="item.subtitle"
        ></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import SendRequestModal from '~/components/SendRequestModal'
export default {
  components: { SendRequestModal },
  data: () => ({
    test: 1
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('accepts', {
      findAcceptsInStore: 'find'
    }),
    items() {
      if (this.user && this.user.userTypeId > 1) {
        return [
          {
            id: 1,
            title: 'درخواست خدمات',
            subtitle: '(وکالت,داوری,قضایی,مالیاتی,شهرداری)',
            avatar: 'icon/balance.png',
            to: '/OurServices'
          },
          {
            id: 2,
            title: 'صندوق پرسش و پاسخ',
            subtitle: '',
            avatar: 'icon/conversation.png',
            to: '/AdvisorQuestion'
          }
        ]
      } else if (this.user && this.user.userTypeId === 1) {
        return [
          {
            id: 1,
            title: 'درخواست خدمات',
            subtitle: '(وکالت,داوری,قضایی,مالیاتی,شهرداری)',
            avatar: 'icon/balance.png',
            to: '/OurServices'
          },
          {
            id: 2,
            title: 'پرسش یک سوال',
            subtitle: '',
            avatar: 'icon/conversation.png',
            to: '/Question'
          }
        ]
      } else {
        return [
          {
            id: 1,
            title: 'درخواست خدمات',
            subtitle: '(وکالت,داوری,قضایی,مالیاتی,شهرداری)',
            avatar: 'icon/balance.png',
            to: '/OurServices'
          },
          {
            id: 2,
            title: 'پرسش یک سوال',
            subtitle: '',
            avatar: 'icon/conversation.png',
            to: '/Question'
          }
        ]
      }
    },
    accepts() {
      const user = this.user
      let x = []
      if (user !== null) {
        x = this.findAcceptsInStore({
          query: {
            $sort: { createdAt: -1 },
            userId: user.id,
            status: 1
          }
        }).data
      }
      return x.length
    }
  },
  mounted() {
    const user = this.user
    if (user == null) {
      console.log('user is null')
    } else {
      this.loadAccepts(user)
    }
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
    }
  }
}
</script>
<style>
.v-badge__badge {
  line-height: 1.5 !important;
}
</style>
