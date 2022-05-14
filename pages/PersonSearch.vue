<template>
  <v-card max-width="500" class="mx-auto" style="box-shadow:none">
    <h4 class="h4 text-center py-3 px-1 ma-0 indigo--text">
      جستجوی مشاور
    </h4>
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
      searchAdviserExpertiseId: 'searchAdviserExpertiseId',
      searchAdviserName: 'searchAdviserName'
    }),
    persons() {
      return this.findPersonsInStore({
        query: {
          $sort: { rate: -1 }
        }
      }).data
    },
    expertise() {
      return this.findExpertiseInStore({
        query: {
          id: this.searchAdviserExpertiseId
        }
      }).data[0]
    }
  },
  mounted() {
    this.clearAllUsers()
    this.fetchAllPersons()
  },
  methods: {
    ...mapMutations('users', {
      clearAllUsers: 'clearAll'
    }),
    ...mapActions('users', {
      fetchPersons: 'find'
    }),
    fetchAllPersons() {
      console.log(this.searchAdviserName)
      let query = null
      query = {
        query: {
          $sort: { online: -1 },
          $all: 1,
          userTypeId: { $gt: 1 },
          family: this.searchAdviserName,
          $expertiseId: this.searchAdviserExpertiseId
        }
      }

      this.fetchPersons(query).then()
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
