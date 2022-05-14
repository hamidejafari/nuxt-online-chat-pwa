<template>
  <v-card max-width="600" class="mx-auto" style="box-shadow: none;">
    <h4 class="h4 text-center py-3 px-1 ma-0 indigo--text">
      لیست تخصص ها
    </h4>
    <v-text-field
      v-model="searchExp"
      solo
      label="جستجوی تخصص..."
      prepend-inner-icon="mdi-account-search"
    ></v-text-field>
    <v-list class="pa-0">
      <v-list-item
        v-for="item in expertises"
        :key="item.title"
        class="my-2 mx-2 btprf2"
        @click="showPersons(item.id)"
      >
        <v-list-item-avatar>
          <v-icon
            style="background-color: white !important;color: #3f51b5 !important;"
            class="white--text"
            v-text="'mdi-account-multiple'"
          ></v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  layout: 'back',
  data: () => ({
    searchExp: ''
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('expertises', {
      findExpertisesInStore: 'find'
    }),
    expertises() {
      let query2 = {
        $sort: { createdAt: 1 },
        type: 1
      }

      if (this.searchExp !== '') {
        query2 = {
          $sort: { createdAt: 1 },
          type: 1,
          title: this.searchExp
        }
      }
      return this.findExpertisesInStore({
        query: query2
      }).data
    }
  },
  methods: {
    ...mapActions('expertises', {
      fetchExpertises: 'find'
    }),
    showPersons(link) {
      this.$router.push({
        path: '/Persons/' + this.$route.params.type + '/' + link
      })
    }
  },
  mounted() {
    this.fetchExpertises({
      query: {
        $sort: { id: 1 },
        type: 1,
        status: 1
      }
    }).then((response) => {})
  }
}
</script>
<style>
.btprf2 {
  border: 1px solid rgb(117, 81, 3) !important;
  border-radius: 10px;
  background-color: #faf1df !important;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.17);
}
.h4 {
  background-color: #f3e4b5;
}
.v-text-field__details {
  display: none;
}
</style>
