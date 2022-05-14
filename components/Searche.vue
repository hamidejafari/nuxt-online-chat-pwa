<template>
  <v-dialog v-model="dialog" class="px-2" width="500">
    <template v-slot:activator="{ on }">
      <v-list two-line subheader class="pa-0">
        <v-list-item class="my-0 mx-2 btprf" v-on="on">
          <v-list-item-avatar>
            <v-icon class="indigo white--text">mdi-account-multiple</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>جستجوی مشاوران</v-list-item-title>
            <p
              class="my-0 font-weight-light blue-grey--text"
              style="font-size:12px;"
            >
              جستجوی همه مشاوران براساس تخصص, نوع و محل کار مشاور
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
    <v-card tile>
      <v-card-actions class="indigo text-center">
        <p class="ma-2 text-center text-color font-weight-bold">
          جستجوی مشاوران
        </p>
        <v-spacer />
      </v-card-actions>
      <v-form v-model="valid">
        <v-row class="ma-0" style="width:100%">
          <v-checkbox
            v-model="type"
            class="mx-auto mb-0 pb-0"
            value="phone"
            label="تلفنی"
          ></v-checkbox>
          <v-checkbox
            v-model="type"
            class="mx-auto mb-0 pb-0"
            value="presence"
            label="حضوری"
          ></v-checkbox>
          <v-checkbox
            v-model="type"
            value="chat"
            class="mx-auto mb-0 pb-0"
            label="نوشتاری"
          ></v-checkbox>
          <v-col cols="12" class="py-1">
            <v-select
              :items="city"
              placeholder="انتخاب شهر مشاور"
              filled
              rounded
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" class="py-1">
            <v-select
              v-model="selectedEpertise"
              :items="expertises"
              placeholder="انتخاب تخصص مشاور"
              item-text="title"
              item-value="id"
              filled
              rounded
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" class="py-1">
            <v-text-field
              v-model="name"
              placeholder="نام خانوادگی ..."
              required
              filled
              rounded
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions class="px-3">
        <v-btn depressed small class="green white--text" @click="submitMyForm">
          <v-icon size="25">mdi-account-search</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn depressed small class="pink white--text" @click="dialog = false">
          <v-icon size="25">mdi-close-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    type: [],
    city: ['تهران'],
    name: '',
    selectedEpertise: '',
    selectedType: 'isChat'
  }),
  computed: {
    ...mapGetters('expertises', {
      findExpertisesInStore: 'find'
    }),
    expertises() {
      return this.findExpertisesInStore({
        query: {
          $sort: { createdAt: 1 },
          type: 1
        }
      }).data
    }
  },
  methods: {
    ...mapActions('expertises', {
      fetchExpertises: 'find'
    }),
    submitMyForm() {
      this.$store.commit('setSearchAdviserExpertiseId', this.selectedEpertise)
      this.$store.commit('setSearchAdviserType', this.type)
      this.$store.commit('setSearchAdviserName', this.name)
      this.$router.push({ path: `/PersonSearch` })
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
.btprf {
  border: 1px solid rgb(117, 81, 3) !important;
  border-radius: 0px 10px;
  background-color: #faf1df !important;
}
.text-color {
  color: #f3e4b5;
}
.v-text-field__details {
  display: none;
}
</style>
