<template>
  <div class="text-xs-center">
    <v-dialog v-model="createEventRequestDialogVisible" width="600" persistent>
      <template v-slot:activator="{ on }">
        <v-list-item
          class="my-2 mx-2 px-1"
          style="border:1px solid #755103 !important;border-radius:0px 10px;background: #faf1df;"
          v-on="on"
        >
          <v-list-item-avatar size="60" class="mr-1">
            <v-img src="icon/conversation.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              class="indigo--text"
              style="font-weight: bold;"
              v-text="'درخواست مشاوره فوری'"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-card style="border-radius: 15px">
        <v-card-title class="grey aniback white--text">
          <p class="text-xs-center" style="width: 100%;margin: 0%;">
            ارسال درخواست مشاوره فوری
          </p>
        </v-card-title>
        <v-container class="rtl">
          <v-form
            ref="form"
            v-model="valid"
            class="rtl"
            lazy-validation
            style="width:100%;padding:0% 5%"
          >
            <v-layout row wrap>
              <v-flex lg6 md6 xs12 class="px-1">
                <v-select
                  v-model="selectedType"
                  :items="items1"
                  :rules="typeRules"
                  item-value="value"
                  item-text="title"
                  placeholder="نوع مشاوره"
                  solo
                ></v-select>
              </v-flex>
              <v-flex lg6 md6 xs12 class="px-1">
                <v-select
                  v-model="selectedHour"
                  :items="items2"
                  :rules="neededRules"
                  item-value="value"
                  item-text="title"
                  placeholder="مدت مشاوره"
                  solo
                ></v-select>
              </v-flex>
              <v-flex lg6 md6 xs12 class="px-1">
                <v-select
                  :items="items3"
                  solo
                  placeholder="شهر مشاور"
                ></v-select>
              </v-flex>
              <v-flex lg6 md6 xs12 class="px-1">
                <v-select
                  v-model="selectedEpertise"
                  :items="expertises"
                  :rules="epertiseRules"
                  item-value="id"
                  item-text="title"
                  placeholder="تخصص مشاور"
                  solo
                ></v-select>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="text-xs-center">
            <template>
              <v-btn
                color="green"
                dark
                style="width: 96%;border-radius: 10px;"
                @click="createMyEvent"
              >
                ارسال درخواست مشاوره
              </v-btn>
            </template>
            <v-dialog
              v-model="sentEventRequestDialogVisible"
              width="400"
              persistent
            >
              <v-card v-if="!dialog3" style="border-radius: 15px">
                <v-card-title
                  style="text-align:center"
                  class="grey aniback white--text"
                >
                  <p class="text-xs-center" style="width: 100%;margin: 0%;">
                    تعریف نوبت مشاوره
                  </p>
                </v-card-title>

                <v-container>
                  <v-layout row wrap>
                    <v-flex>
                      <p style="text-align:center">
                        موضوع مشاوره :
                        <span class="gold--text">{{ expertiseTitle }}</span>
                      </p>
                      <p style="text-align:center">
                        مدت مشاوره :
                        <span class="gold--text">{{ neededTime }} دقیقه</span>
                      </p>
                      <v-divider></v-divider>
                      <br />
                      <p style="text-align:center">
                        در حال جست و جوی مشاور :
                        <span class="gold--text">زمان تقریبی دو دقیقه</span>
                      </p>
                    </v-flex>
                  </v-layout>
                </v-container>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    style="float:left;border-radius:10px;"
                    class="red"
                    color="white"
                    flat
                    @click="deleteMyEventRequest"
                  >
                    لغو درخواست
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-card v-else style="border-radius: 15px">
                <v-card-title
                  style="text-align:center"
                  class="grey aniback white--text"
                >
                  <p class="text-xs-center" style="width: 100%;margin: 0%;">
                    خطا در ارسال درخواست
                  </p>
                </v-card-title>

                <v-container>
                  <v-layout row wrap>
                    <v-flex>
                      <p style="text-align:center">
                        {{ error }}
                      </p>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-dialog>
          </div>
          <v-spacer></v-spacer>
          <v-btn
            style="float:left;border-radius:10px;"
            class="red"
            color="white"
            flat
            @click="cancelCreateRequest"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data: () => ({
    dialog3: false,
    valid: true,
    items1: [{ title: 'نوشتاری', value: 'isChat' }],
    items2: [
      { title: 'ده دقیقه', value: '10' },
      { title: 'پانزده دقیقه', value: '15' },
      { title: 'بیست دقیقه', value: '20' },
      { title: 'بیست و پنج دقیقه', value: '25' },
      { title: 'سی دقیقه', value: '30' },
      { title: 'چهل و پنج دقیقه', value: '45' },
      { title: 'شصت دقیقه', value: '60' },
      { title: 'نود دقیقه', value: '90' }
    ],
    epertiseRules: [(v) => !!v || 'انتخاب تخصص اجباری است'],
    typeRules: [(v) => !!v || 'انتخاب نوع مشاوره اجباری است'],
    neededRules: [(v) => !!v || 'انتخاب زمان مشاوره اجباری است'],
    items3: ['تهران'],
    selectedEpertise: null,
    selectedType: 'isChat',
    selectedHour: null,
    error: ''
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('expertises', {
      findExpertisesInStore: 'find'
    }),
    ...mapGetters('events', {
      findEventsInStore: 'find'
    }),
    ...mapGetters('eventRequests', {
      findEventRequestsInStore: 'find'
    }),
    sentEventRequestDialogVisible: {
      get() {
        return this.$store.getters.sentEventRequestDialogVisible
      },
      // setter
      set(newValue) {
        this.setSentEventRequestDialogVisible(newValue)
      }
    },
    createEventRequestDialogVisible: {
      get() {
        return this.$store.getters.createEventRequestDialogVisible
      },
      // setter
      set(newValue) {
        this.setCreateEventRequestDialogVisible(newValue)
      }
    },
    expertises() {
      return this.findExpertisesInStore({
        query: {
          $sort: { createdAt: 1 },
          type: 1
        }
      }).data
    },
    openEventsForCom() {
      const user = this.user
      if (user !== null) {
        const events = this.findEventsInStore({
          query: {
            $or: [{ reservedId: user.id }, { userId: user.id }],
            eventTypeId: 600
          }
        }).data
        if (events.length > 0) return events[0]
        return null
      }
      return null
    },
    neededTime() {
      return this.myEventRequest ? this.myEventRequest.needed : ''
    },
    expertiseTitle() {
      return this.myEventRequest && this.myEventRequest.Expertise
        ? this.myEventRequest.Expertise.title
        : ''
    },
    myEventRequest() {
      const user = this.user
      if (user !== null) {
        const requests = this.findEventRequestsInStore({
          query: {
            userId: user.id,
            typeId: 1
          }
        }).data
        if (requests.length > 0) return requests[0]
        return null
      }
      return null
    }
  },
  watch: {
    openEventsForCom(val) {
      // console.log(val)
      if (val !== null && val.length > 0) {
        this.setCreateEventRequestDialogVisible(false)
        this.setSentEventRequestDialogVisible(false)
        this.$router.push({ path: '/chatroom' })
      }
    }
  },
  methods: {
    ...mapActions('expertises', {
      fetchExpertises: 'find'
    }),
    ...mapActions('eventRequests', {
      createEventRequest: 'create',
      removeEventRequest: 'remove'
    }),
    ...mapMutations([
      'setSentEventRequestDialogVisible',
      'setCreateEventRequestDialogVisible'
    ]),
    cancelCreateRequest() {
      this.setCreateEventRequestDialogVisible(false)
    },
    createMyEvent() {
      this.error = null
      this.dialog3 = false
      if (this.$refs.form.validate()) {
        this.createEventRequest({
          needed: this.selectedHour,
          userId: null,
          expertiseId: this.selectedEpertise,
          typeId: 1
        })
          .then((res) => {
            this.setCreateEventRequestDialogVisible(false)

            this.setSentEventRequestDialogVisible(true)
          })
          .catch((error) => {
            // this.error = error
            // this.dialog3 = true
            // this.setSentEventRequestDialogVisible(true)
            alert(error)
          })
      }
    },
    deleteMyEventRequest() {
      const user = this.user
      const x = this.findEventRequestsInStore({
        query: {
          userId: user.id,
          typeId: 1
        }
      }).data[0]
      this.removeEventRequest(x.id).then((res) =>
        this.setSentEventRequestDialogVisible(false)
      )
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
/* .v-list__tile__title {
  text-align: center;
}
.v-input__slot {
  border: 0px !important;
  border-radius: 10px;
  background: transparent !important;
  padding: 0% 3%;
}
.v-select__slot {
  border-radius: 5px !important;
  background: #ddd !important;
  padding: 0% 2% !important;
} */
</style>
