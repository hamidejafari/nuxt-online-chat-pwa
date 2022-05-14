<template>
  <v-list subheader outline>
    <p class="text-center pb-1 pt-5">مشاوران آنلاین آنی مشاور</p>
    <v-list-item
      v-for="item in persons"
      :key="item.id"
      class="my-2 mx-2 pr-0 blue-grey lighten-5"
      style="border: 1px solid#999;border-radius: 15px;"
      @click="login"
    >
      <PersonRow :person="item" />
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PersonRow from '~/components/PersonRow'
export default {
  components: { PersonRow },
  data: () => ({
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
    }),
    persons() {
      console.log(
        this.findPersonsInStore({
          query: {
            $sort: { rate: -1 },
            userTypeId: { $gt: 1 },
            online: { $in: [true, 1] }
          }
        }).data
      )
      return this.findPersonsInStore({
        query: {
          $sort: { rate: -1 },
          userTypeId: { $gt: 1 },
          online: { $in: [true, 1] }
        }
      }).data
    }
  },
  mounted() {
    this.clearAllUsers()
    this.fetchOnlinePersons()
  },
  methods: {
    ...mapMutations('users', {
      clearAllUsers: 'clearAll'
    }),
    ...mapActions('users', {
      fetchPersons: 'find'
    }),
    fetchOnlinePersons() {
      const query = {
        query: {
          $online: 1
        }
      }
      this.fetchPersons(query)
    }
  }
}
</script>
