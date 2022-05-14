<template>
  <v-card max-width="500" class="mx-auto" style="box-shadow:none">
    <h4 class="h4 text-center py-2 px-1 ma-0 indigo--text">
      لیست مشاوران
      <p class="ma-0">تخصص : {{ expertise.title }}</p>
    </h4>
    <v-text-field
      v-model="searchExp"
      solo
      label="جستجوی مشاور..."
      prepend-inner-icon="mdi-account-search"
    ></v-text-field>
    <v-list subheader outline>
      <v-list-item
        v-for="item in persons"
        :key="item.id"
        class="my-2 mx-2 blue-grey lighten-5"
        style="border: 1px solid#999;border-radius: 15px;"
      >
        <PersonRow :person="item" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PersonRow from '~/components/PersonRow'
export default {
  components: { PersonRow },
  layout: 'back',
  data: () => ({
    conversations: [],
    test: 1,
    searchExp: ''
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('users', {
      findPersonsInStore: 'find'
    }),
    ...mapGetters('expertises', {
      findExpertiseInStore: 'find'
    }),
    ...mapGetters({
      selectedExpertiseId: 'selectedExpertiseId',
      serachType: 'searchType'
    }),
    persons() {
      let query = {
        $sort: { rate: -1 },
        userTypeId: { $gt: 1 },
        online: { $in: [true, 1] },
        id: {
          $ne: this.user.id
        }
      }

      if (this.searchExp !== '') {
        query = {
          $sort: { rate: -1 },
          userTypeId: { $gt: 1 },
          online: { $in: [true, 1] },
          family: this.searchExp,
          id: {
            $ne: this.user.id
          }
        }
      }
      if (this.$route.params.type === '0') {
        query = {
          $sort: { online: -1 },
          userTypeId: { $gt: 1 },
          id: {
            $ne: this.user.id
          }
        }

        if (this.searchExp !== '') {
          query = {
            $sort: { online: -1 },
            userTypeId: { $gt: 1 },
            family: this.searchExp,
            id: {
              $ne: this.user.id
            }
          }
        }
      }
      console.log(
        this.findPersonsInStore({
          query
        }).data
      )
      return this.findPersonsInStore({
        query
      }).data
    },
    expertise() {
      const x = this.$route.params.expertise
      const integer = parseInt(x, 10)
      const test = this.findExpertiseInStore({
        query: {
          id: integer
        }
      }).data[0]
      return test
    }
  },
  mounted() {
    this.clearAllUsers()
    if (this.$route.params.type === '1') {
      this.fetchOnlinePersons()
    } else if (this.$route.params.type === '0') {
      this.fetchAllPersons()
    }
  },
  methods: {
    ...mapMutations('users', {
      clearAllUsers: 'clearAll'
    }),
    ...mapActions('users', {
      fetchPersons: 'find'
    }),
    userDetails(userId) {
      this.$router.push({ path: '/PersonDetails/' + userId })
    },
    fetchAllPersons(start = 1) {
      const x = this.$route.params.expertise
      const integer = parseInt(x, 10)
      const query = {
        query: {
          id: {
            $ne: this.user.id
          },
          $sort: { online: -1 },
          $all: 1,
          userTypeId: 2,
          $expertiseId: integer
        }
      }
      this.fetchPersons(query).then((response) => {
        console.log('hooop')
      })
    },
    fetchOnlinePersons(start = 1) {
      const x = this.$route.params.expertise
      const integer = parseInt(x, 10)
      const query = {
        query: {
          $online: 1,
          $expertiseId: integer,
          userTypeId: 2
        }
      }
      this.fetchPersons(query).then((response) => {
        console.log('hooop')
      })
    }
  }
}
</script>
<style>
.v-list-item__avatar {
  height: 52px !important;
  min-width: 50px !important;
  width: 52px !important;
}
</style>
