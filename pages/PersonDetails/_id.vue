<template>
  <v-card max-width="600" class="mx-auto" style="box-shadow: none;">
    <v-toolbar class="elevation-0 pa-0 grey lighten-3">
      <v-rating
        v-model="userFinded.rate"
        background-color="orange lighten-3"
        color="orange"
        medium
      ></v-rating>
      <v-btn text>
        <!-- <span class="green--text font-weight-bold mt-1">آنلاین</span> -->
        <span
          v-if="userFinded.online == 0 || userFinded.online == false"
          class="red--text font-weight-bold mt-1"
          >آفلاین</span
        >
        <span
          v-if="userFinded.online == 1 || userFinded.online == true"
          class="green--text font-weight-bold mt-1"
          >آنلاین</span
        >
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list-item three-line>
      <v-list-item-avatar size="70" color="grey">
        <img :src="personAvatar" alt="John" />
      </v-list-item-avatar>
      <v-list-item-content class="py-3">
        <v-list-item-title
          class="indigo--text mb-1 font-weight-bold"
          style="padding: 1px;"
        >
          {{ userFinded ? userFinded.name + ' ' + userFinded.family : ' ' }}
        </v-list-item-title>
        <p
          v-for="item in userFinded.expertises"
          :key="item.id"
          class="text-xs-center ma-0"
          style="margin-top: 7px !important;"
        >
          {{ item.Expertise ? item.Expertise.title : '' }}
        </p>
      </v-list-item-content>
    </v-list-item>
    <v-toolbar class="elevation-0 pa-0 line">
      <v-btn to="" depressed color="indigo lighte n-2 white--text">
        <span class="mt-1">نظرات کاربران</span>
      </v-btn>
      <v-spacer></v-spacer>
      <AboutAdviser :person-details="userFinded" />
    </v-toolbar>
    <v-row class="pa-2">
      <v-col cols="12" sm="6" md="6" lg="3" class="pa-1">
        <v-btn depressed x-large block class="btn-custom">
          <v-icon left dark>mdi-phone</v-icon>
          مشاوره فوری تلفنی
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="3" class="pa-1">
        <v-btn depressed x-large block class="btn-custom">
          <v-icon left dark>mdi-comment</v-icon>
          مشاوره فوری نوشتاری
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="3" class="pa-1">
        <v-btn depressed x-large block class="btn-custom">
          <v-icon left dark>mdi-account-multiple</v-icon>
          پرسش یک سوال
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="3" class="pa-1">
        <v-btn depressed x-large block class="btn-custom">
          <v-icon left dark>mdi-checkbox-multiple-marked</v-icon>
          رزرو نوبت مشاوره
        </v-btn>
      </v-col>
    </v-row>
    <v-card flat>
      <v-tabs v-model="tabs" fixed-tabs>
        <v-tab class="indigo--text">
          <v-icon>mdi-message-text-outline</v-icon>
          <span class="mx-1 black--text">مشاوره فوری</span>
        </v-tab>

        <v-tab class="indigo--text">
          <v-icon>mdi-calendar-clock</v-icon>
          <span class="mx-1 black--text">رزرو مشاوره</span>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card flat>
            <v-card-title class="font-weight-bold pb-1"
              >مشاوره فوری</v-card-title
            >
            <v-divider />
            <v-row style="width:100%;margin:0">
              <v-col cols="12" md="6" class="py-1">
                <v-expansion-panels class="my-1" focusable>
                  <v-expansion-panel>
                    <v-expansion-panel-header>نوشتاری</v-expansion-panel-header>
                    <v-expansion-panel-content class="pt-5">
                      <v-select
                        v-model="selectedEpertise"
                        :items="userFinded.expertises"
                        :rules="expertiseRules"
                        item-value="Expertise.id"
                        item-text="Expertise.title"
                        placeholder="انتخاب تخصص"
                        filled
                        rounded
                        dense
                        style="margin-bottom: 20px;"
                      ></v-select>
                      <v-select
                        v-model="selectedHour"
                        :items="itemsHour"
                        :rules="neededRules"
                        item-value="value"
                        item-text="title"
                        placeholder=" مدت مشاوره"
                        filled
                        rounded
                        dense
                        style="margin-bottom: 20px;"
                      ></v-select>
                      <v-row
                        class="ma-0"
                        style="width:100%;border: 1px solid #999;border-radius: 5px;"
                      >
                        <v-col cols="12" align-self="center">
                          <v-btn
                            block
                            class="green white--text"
                            @click="sendRequest(userFinded.id)"
                          >
                            <v-icon left>mdi-message-text</v-icon>
                            <span class="mt-1">شروع مشاوره</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-title class="font-weight-bold pb-1"
              >رزرو مشاوره</v-card-title
            >
            <v-divider />
            <v-row style="width:100%;margin:0">
              <v-col cols="12" md="6" class="py-1">
                <v-expansion-panels class="my-1" focusable>
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      >لیست نوبت های مشاوره</v-expansion-panel-header
                    >
                    <v-expansion-panel-content class="pt-5">
                      <v-select
                        :items="expertises"
                        placeholder="انتخاب تخصص"
                        filled
                        rounded
                        dense
                      ></v-select>
                      <v-row
                        class="ma-0"
                        style="width:100%;border: 1px solid #999;border-radius: 5px;"
                      >
                        <v-col cols="12" align-self="center">
                          <v-btn block class="green white--text">
                            <v-icon left>mdi-phone</v-icon>
                            <span class="mt-1">تماس</span>
                          </v-btn>
                        </v-col>
                        <v-col
                          cols="12"
                          class="text-center"
                          align-self="center"
                        >
                          <span>هر دقیقه ۳۰۰۰ تومان</span>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import AboutAdviser from '~/components/AboutAdviser'
export default {
  components: { AboutAdviser },
  layout: 'back',
  data: () => ({
    rating: 4,
    tabs: null,
    dialog: false,
    radios: 'radio-1',
    panel: [true, true, false],
    disabled: false,
    readonly: false,
    items: [{ title: 'نوشتاری', value: 'isChat' }],
    items1: [
      'مشاور قراردادها',
      'مشاور ثبت اسناد و املاک',
      'ثبت شرکت ها و علایم تجاری'
    ],
    items2: ['نوشتاری', 'تلفنی', 'حضوری'],
    items3: [
      'مشاور قراردادها',
      'مشاور ثبت اسناد و املاک',
      'ثبت شرکت ها و علایم تجاری'
    ],
    itemsHour: [
      { title: 'ده دقیقه', value: '10' },
      { title: 'پانزده دقیقه', value: '15' },
      { title: 'بیست دقیقه', value: '20' },
      { title: 'بیست و پنج دقیقه', value: '25' },
      { title: 'سی دقیقه', value: '30' },
      { title: 'چهل و پنج دقیقه', value: '45' },
      { title: 'شصت دقیقه', value: '60' },
      { title: 'نود دقیقه', value: '90' }
    ],
    selectedEpertise: null,
    selectedType: 'isChat',
    selectedHour: null,
    expertiseRules: [(v) => !!v || 'انتخاب تخصص اجباری است'],
    typeRules: [(v) => !!v || 'انتخاب نوع مشاوره اجباری است'],
    neededRules: [(v) => !!v || 'انتخاب زمان مشاوره اجباری است'],
    valid: true
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('expertises', {
      findExpertisesInStore: 'find'
    }),
    ...mapGetters('events', {
      findEventsInStore: 'find'
    }),
    ...mapGetters('users', {
      findUserInStore: 'find'
    }),
    ...mapGetters({
      selectedUserId: 'selectedUserId'
    }),
    userFinded() {
      const y = this.$route.params.id
      const integer = parseInt(y, 10)
      const x = this.findUserInStore({
        query: {
          id: integer
        }
      }).data[0]
      console.log('hiiiiiiiiiiiiiiii')
      console.log(x)
      console.log('hiiiiiiiiiiiiiiii')
      return x
    },
    expertises() {
      return this.findExpertisesInStore({
        query: {
          $sort: { createdAt: 1 },
          type: 1
        }
      }).data
    },
    sentEventRequestDialogVisible: {
      get() {
        return this.$store.getters.sentEventRequestDialogVisible
      },
      // setter
      set(newValue) {
        this.setSentEventRequestDialogVisible(newValue)
      }
    },
    events() {
      return this.findEventsInStore({ query: { $sort: { createdAt: 1 } } }).data
    },
    personAvatar() {
      const j = this.$route.params.id
      const integer = parseInt(j, 10)
      const userFind = this.findUserInStore({
        query: {
          id: integer
        }
      }).data[0]
      let y = null
      let x = 0
      for (x in userFind.files) {
        if (userFind.files[x].title === 'p') {
          y = userFind.files[x]
        }
      }
      if (y !== null) {
        return 'http://animoshaver.ir:5050/' + 'all-uploads/' + y.file
      } else {
        return '/user.png'
      }
    }
  },
  methods: {
    ...mapMutations('users', {
      clearAllUsers: 'clearAll'
    }),
    ...mapActions('expertises', {
      fetchExpertises: 'find'
    }),
    ...mapActions('eventRequests', {
      createEventRequest: 'create'
    }),
    ...mapActions('events', {
      fetchEvents: 'find',
      acceptEventPerson: 'patch'
    }),
    ...mapActions('users', {
      fetchUsersDetail: 'get'
    }),
    ...mapMutations('events', {
      clearEvents: 'clearAll'
    }),
    ...mapMutations(['setSentEventRequestDialogVisible']),
    sendRequest(perosnDetailsId) {
      this.createEventRequest({
        needed: this.selectedHour,
        userId: perosnDetailsId,
        expertiseId: this.selectedEpertise,
        typeId: 1
      })
        .then((res) => this.setSentEventRequestDialogVisible(true))
        .catch((error) => {
          alert(error)
        })
    },
    fetchPersonEvents() {
      const x = this.$route.params.id
      const integer = parseInt(x, 10)
      this.clearEvents()
      const userFind = this.findUserInStore({
        query: {
          id: integer
        }
      }).data[0]
      const query = {
        query: {
          $limit: 500,
          $sort: { start: 1 },
          userId: userFind ? userFind.id : 0,
          eventTypeId: 0
        }
      }
      this.fetchEvents(query).then((response) => {
        console.log(response)
      })
    },
    reservePerson(eventId) {
      const user = this.user
      this.acceptEventPerson([eventId, { reservedId: user.id }, {}])
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
    const y = this.$route.params.id
    const integer = parseInt(y, 10)
    this.fetchUsersDetail(integer).then((response) => {})
    this.fetchPersonEvents()
  }
}
</script>
<style>
.notranslate {
  padding: 0px !important;
}
.line .v-toolbar__content {
  background-color: #faf1df;
}
.btn-custom {
  border: 1px solid rgb(117, 81, 3) !important;
  border-radius: 0px 10px;
  background-color: #faf1df !important;
}
</style>
