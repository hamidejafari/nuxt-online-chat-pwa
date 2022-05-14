<template>
  <v-row
    class="ma-0 pa-2"
    style="width:100%;border-radius: 0;background: rgb(243, 228, 181);"
  >
    <v-col v-if="user === null" class="pa-1" cols="12" md="12" sm="12">
      <v-card max-width="100%" class="" style="box-shadow: none;width:100%">
        <h5 class="text-center my-0 h5sd">
          لطفا به حساب کاربری خود
          <v-btn depressed class="loginbtn green--text" to="/login"
            >وارد شوید</v-btn
          >
          یا
          <v-btn depressed class="loginbtn green--text" to="/Register"
            >ثبت نام</v-btn
          >
          کنید
        </h5>
      </v-card>
    </v-col>
    <v-col v-else-if="user.status === 0" class="pa-1" cols="12" md="12" sm="12">
      <v-card
        max-width="100%"
        class="mx-auto"
        style="box-shadow: none;width:100%"
      >
        <h5 class="text-center my-0 h5sd">
          حساب کاربری شما غیرفعال است
        </h5>
      </v-card>
    </v-col>
    <v-col v-if="user === null" class="pa-1" cols="6" md="6" sm="6">
      <v-btn tile block color="indigo white--text" @click="comingSoon()"
        >جستجوی مشاور</v-btn
      >
    </v-col>
    <v-col v-else-if="user.status !== 0" class="pa-1" cols="6" md="3" sm="6">
      <v-btn tile block color="indigo white--text" @click="comingSoon()"
        >جستجوی مشاور</v-btn
      >
    </v-col>
    <v-col v-if="user === null" class="pa-1" cols="6" md="6" sm="6">
      <v-btn tile block color="indigo white--text" @click="comingSoon()"
        >مشاوران آنلاین</v-btn
      >
    </v-col>
    <v-col v-else-if="user.status !== 0" class="pa-1" cols="6" md="3" sm="6">
      <v-btn tile block color="indigo white--text" @click="comingSoon()"
        >مشاوران آنلاین</v-btn
      >
    </v-col>
    <v-col v-if="openEvents != null" class="pa-1" cols="‍12" md="3" sm="12">
      <v-btn tile block color="green white--text" to="/ChatRoom"
        >اتاق مشاوره</v-btn
      >
    </v-col>
    <!-- <v-col class="pa-1" cols="6" md="3" sm="6">
      <v-btn tile block color="amber accent-3" to="/personlist"
        >پرسش و پاسخ</v-btn
      >
    </v-col>
    <v-col class="pa-1" cols="6" md="3" sm="6">
      <v-btn tile block color="white" @click="comingSoon()">درخواست وکیل</v-btn>
    </v-col> -->
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    kind: ['نوشتاری', 'تلفنی'],
    time: ['هفت دقیقه', 'پانزده دقیقه'],
    city: ['تهران'],
    specialty: ['مشاوره قراردادها', 'مشاور حقوقی']
  }),
  methods: {
    comingSoon() {
      alert('به زودی راه اندازی میشود .... ')
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('events', {
      findEventsInStore: 'find'
    }),
    openEvents() {
      const user = this.user
      if (user) {
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
    }
  }
}
</script>
<style>
.h5sd {
  background: #fff;
  color: red !important;
}
.loginbtn {
  background-color: transparent !important;
  border-radius: 0px !important;
  padding: 0px !important;
  margin-top: 4px;
}
</style>
