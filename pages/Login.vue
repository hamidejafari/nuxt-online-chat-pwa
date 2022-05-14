<template>
  <v-form v-model="valid">
    <v-container>
      <v-card
        class="px-10 py-3 mx-auto"
        style="border-radius: 15px;"
        max-width="500"
      >
        <v-row>
          <v-col cols="12" md="12" class="text-center mb-4">
            <v-btn class="mx-2" fab depressed large outlined color="indigo">
              <v-icon color="indigo">mdi-lock-open</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="mobile"
              :rules="mobileRules"
              label="شماره همراه"
              placeholder="۰۹۱۲۰۰۰۰۰۰۰"
              filled
              rounded
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="رمز ورود"
              placeholder
              hint="حداقل ۶ کاراکتر"
              filled
              rounded
              dense
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <v-col v-if="msg" cols="12" md="12">
            <div class="text-center">
              <p style="color:red">{{ msg }}</p>
            </div>
          </v-col>
          <v-col cols="12" md="12">
            <div class="text-center">
              <v-btn
                block
                rounded
                color="indigo"
                dark
                class="font-weight-black"
                @click="onSubmit(mobile, password)"
                >ورود</v-btn
              >
            </div>
          </v-col>
          <v-col cols="12" md="12">
            <v-btn color="red" text style="margin-right: 8%;"
              >رمز عبور را فراموش کرده ام</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  layout: 'back',
  data: () => ({
    show1: false,
    valid: false,
    mobile: '',
    mobileRules: [
      (v) => !!v || 'شماره موبایل اجباری است'
      // v => v.length !== 11 || 'شماره موبایل باید ۱۱ رقم باشد'
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'رمز ورود اجباری است'
      // v => v.length < 7 || 'رمز عبور باید ۶ رقم باشد'
    ],
    msg: null
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
            allowIssue: 1
          }
        }).data
      )
      return this.findPersonsInStore({
        query: {
          $sort: { rate: -1 },
          userTypeId: { $gt: 1 },
          allowIssue: 1
        }
      }).data
    }
  },
  mounted() {
    this.clearAllUsers()
    this.fetchIssuePersons()
  },
  methods: {
    ...mapMutations('users', {
      clearAllUsers: 'clearAll'
    }),
    ...mapActions('users', {
      fetchPersons: 'find'
    }),
    fetchIssuePersons() {
      const query = {
        query: {
          $sort: { rate: -1 },
          userTypeId: { $gt: 1 },
          allowIssue: 1
        }
      }
      this.fetchPersons(query)
    },
    dismissError() {
      this.error = undefined
      this.clearAuthenticateError()
    },
    onSubmit(mobile, password) {
      if (mobile && password) {
        this.authenticate({ strategy: 'local', mobile, password })
          .then((user) => {
            this.$router.push('/')
          })
          // Just use the returned error instead of mapping it from the store.
          .catch((error) => {
            console.log(error.message)
            // Convert the error to a plain object and add a message.
            const type = error.className
            error = Object.assign({}, error)
            error.message =
              type === 'not-authenticated'
                ? 'Incorrect email or password.'
                : 'An error prevented login.'

            if (error.message === 'Incorrect email or password.') {
              this.msg = 'اطلاعات کاربری اشتباه است'
            } else {
              this.msg =
                'مشکلی در احراز هویت شما پیش اماده است , لطفا دوباره تلاش کنید'
            }
          })
      } else {
        this.msg = 'اطلاعات کاربری اجباری است'
      }
    },
    ...mapMutations('auth', {
      clearAuthenticateError: 'clearAuthenticateError'
    }),
    ...mapActions('auth', ['authenticate'])
  }
}
</script>
