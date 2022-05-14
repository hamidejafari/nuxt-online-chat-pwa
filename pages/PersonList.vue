<template>
  <v-container>
    <v-card
      max-width="500"
      class="mx-auto"
      style="border-radius: 15px;box-shadow:none"
    >
      <v-list subheader outline>
        <p v-if="user.userTypeId == 1" class="text-center pb-0">
          مشاوری که میخواهید از آن سوال بپرسید انتخاب کنید
        </p>
        <p v-else class="text-center pb-0">
          میتوانید به سوالات کاربران پاسخ دهید
        </p>
        <v-list-item
          v-for="item in conversations"
          :key="item.id"
          class="my-2 mx-2 blue-grey lighten-5"
          style="border: 1px solid#999;border-radius: 15px;"
        >
          <ConversationRow
            v-if="user.userTypeId == 1"
            :conversation="item"
            :person="item.Advisor"
          />
          <ConversationRow v-else :person="item.User" :conversation="item" />
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import ConversationRow from '~/components/ConversationRow'
export default {
  components: { ConversationRow },
  layout: 'back',
  data: () => ({
    persons: [],
    conversations: [],
    test: 1,
    items: [
      {
        title: 'نام و نام خانوادگی',
        subtitle: 'مشاور خانواده , مشاور حقوقی , مشاور خانواده , مشاور حقوقی',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
      },
      {
        title: 'نام و نام خانوادگی',
        subtitle: 'مشاور خانواده , مشاور حقوقی , مشاور خانواده , مشاور حقوقی',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
      },
      {
        title: 'نام و نام خانوادگی',
        subtitle: 'مشاور خانواده , مشاور حقوقی , مشاور خانواده , مشاور حقوقی',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
      },
      {
        title: 'نام و نام خانوادگی',
        subtitle: 'مشاور خانواده , مشاور حقوقی , مشاور خانواده , مشاور حقوقی',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'
      }
    ]
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('users', {
      findPersonsInStore: 'find'
    })
  },
  mounted() {
    this.clearAllUsers()
    this.fetchIssuePersons()
    this.fetchConversationsPerson()
  },
  methods: {
    ...mapMutations('users', {
      clearAllUsers: 'clearAll'
    }),
    ...mapActions('users', {
      fetchPersons: 'find'
    }),
    ...mapActions('conversations', {
      fetchConversations: 'find'
    }),
    async fetchIssuePersons() {
      const query = {
        query: {
          $issue: 1
        }
      }
      const result = await this.fetchPersons(query)
      this.persons = result.data
    },
    async fetchConversationsPerson() {
      let query = null
      if (this.user.userTypeId === 1) {
        query = {
          query: {
            userId: this.user.id,
            $sort: { updatedAt: -1 }
          }
        }
      } else {
        console.log(this.user.id)
        query = {
          query: {
            advisorId: this.user.id,
            $sort: { updatedAt: -1 }
          }
        }
      }
      const result = await this.fetchConversations(query)
      this.conversations = result.data
      console.log(this.conversations)
    }
  }
}
</script>
