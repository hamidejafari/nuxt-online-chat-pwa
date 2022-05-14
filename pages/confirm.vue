<template>
  <v-form ref="signinForm" v-model="valid">
    <v-container>
      <v-card class="px-10 py-5" style="border-radius: 15px;">
        <v-row>
          <v-col cols="12" md="12" class="text-center pa-0 mb-5">
            <v-btn class="mx-2" fab depressed large outlined color="indigo">
              <v-icon color="indigo">mdi-account</v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="text-center px-md-2 px-sm-2 px-0 py-0"
            style="align-self: center;"
          >
            <v-text-field
              v-model="code"
              label="کد فعال سازی"
              placeholder
              filled
              rounded
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12" class="px-0 px-md-2 px-sm-2 py-sm-7 py-6">
            <div class="text-center">
              <v-btn
                block
                rounded
                color="indigo"
                dark
                class="font-weight-black"
                :disabled="!valid"
                style="background-color: #3f51b5 !important;
color: white !important;"
                @click="onSubmit(code)"
                >فعال سازی</v-btn
              >
            </div>
          </v-col>
          <v-col cols="12" md="12" class="px-0 px-md-2 px-sm-2 py-sm-7 py-6">
            <div class="text-center">
              <v-btn
                block
                rounded
                color="indigo"
                dark
                class="font-weight-black"
                style="background-color: #3f51b5 !important;
color: white !important;"
                @click="getConfirmCode()"
                >دریافت کد فعال سازی</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    valid: false,
    name: '',
    family: '',
    email: '',
    mobile: '',
    password: '',
    items: ['زن', 'مرد'],
    dialogm1: '',
    Specialty: false,
    Job: false,
    Rules: false,
    contracts: false,
    show1: false,
    code: '',
    rules: {
      required: (value) => !!value || 'ضروری'
    }
  }),
  computed: {
    ...mapState('auth', ['user']),
    confirmationCode() {
      return this.$store.getters.confirmCode
    }
  },
  mounted() {
    if (this.user !== null) {
      this.$store.commit('setConfirmCode', this.user.confirmCode)
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('users', {
      confirmCode: 'patch'
    }),
    getConfirmCode() {
      this.$store.dispatch('getConfirmCode', this.user.id)
      alert('کد فعال سازی به موبایل شما ارسال  خواهد شد')
    },
    onSubmit(code) {
      if (this.$refs.signinForm.validate()) {
        this.confirmCode([
          this.user.id,
          {
            $confirmThisPerson: true,
            confirmCode: code
          },
          {}
        ])
          .then((res) =>
            this.authenticate().then((result) => this.$router.push('/'))
          )
          .catch((error) => alert(error))
      }
    }
  }
}
</script>
