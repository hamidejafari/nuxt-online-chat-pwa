<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-card class="px-10 py-5" style="border-radius: 15px;">
        <v-row>
          <v-col cols="12" md="12" class="text-center pa-0 mb-5">
            <v-btn class="mx-2" fab depressed large outlined color="indigo">
              <v-icon color="indigo">mdi-account</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="12" class="px-0 px-md-2 px-sm-2 py-sm-7 py-1">
            <div class="text-center">
              <v-btn
                block
                rounded
                color="indigo"
                dark
                class="font-weight-black"
                style="background-color: #3f51b5 !important;
color: white !important;"
                to="/UserRegister"
                >ثبت نام کاربر</v-btn
              >
            </div>
          </v-col>
          <v-col cols="12" md="12" class="px-0 px-md-2 px-sm-2 py-sm-7 py-1">
            <div class="text-center">
              <v-btn
                block
                rounded
                color="indigo"
                dark
                class="font-weight-black"
                style="background-color: #3f51b5 !important;
color: white !important;"
                to="/AdvisorRegister"
                >ثبت نام مشاور</v-btn
              >
            </div>
          </v-col>
          <v-col cols="12" md="12" class="px-0 px-md-2 px-sm-2 py-sm-7 py-1">
            <div class="text-center">
              <v-btn
                block
                rounded
                color="indigo"
                dark
                class="font-weight-black"
                style="background-color: #3f51b5 !important;
color: white !important;"
                to="/login"
                >ورود به حساب کاربری</v-btn
              >
            </div>
          </v-col>
          <v-card max-width="100%" class="mx-auto" style="box-shadow: none;">
            <h5
              class="indigo--text pt-3 pb-2 text-center my-0"
              style="background: rgb(249, 241, 229) none repeat scroll 0% 0%;
color: red !important;
padding: 4px;
margin-top: 22px !important;"
            >
              🔶 اگر قصد استفاده از خدمات مشاوره ای آنی مشاور را دارید از گزینه
              ثبت نام کاربر استفاده کنید
            </h5>
            <h5
              class="indigo--text pt-3 pb-2 text-center my-0"
              style="background: rgb(249, 241, 229) none repeat scroll 0% 0%;
color: red !important;
padding: 4px;
margin-top: 22px !important;"
            >
              🔹 اگر تصمیم دارید بعنوان مشاور یا وکیل در آنی مشاور فعالیت کنید
              از گزینه ثبت نام مشاور استفاده کنید
            </h5>
            <h5
              class="indigo--text pt-3 pb-2 text-center my-0"
              style="background: rgb(249, 241, 229) none repeat scroll 0% 0%;
color: red !important;
padding: 4px;
margin-top: 22px !important;"
            >
              🔶 در صورتی که قبلا در آنی مشاور ثبت نام کرده اید از گزینه ورود به
              حساب کاربری استفاده کنید
            </h5>
          </v-card>
        </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
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
    message: '',
    nameRules: [
      (v) => !!v || 'نام اجباری است',
      (v) => /^[\u0600-\u06FF\s]+$/.test(v) || 'نام را فارسی وارد کنید'
    ],
    familyRules: [
      (v) => !!v || 'نام خانوادگی اجباری است',
      (v) => /^[\u0600-\u06FF\s]+$/.test(v) || 'نام خانوادگی را فارسی وارد کنید'
    ],
    mobileRules: [
      (v) => !!v || 'شماره موبایل اجباری است',
      (v) => /[1-4]/g.test(v) || 'شماره موبایل معتبر نیست'
      // (v) => v.length === 11 || 'شماره موبایل معتبر نیست'
    ],
    passwordRules: [
      (v) => !!v || 'رمز ورود اجباری است'
      // v => v.length < 7 || 'رمز عبور باید بیشتر از ۶ حرف  باشد'
    ],
    rules: {
      required: (value) => !!value || 'ضروری',
      min: (v) => v.length >= 6 || 'حداقل ۶ کاراکتر',
      emailMatch: () => 'رمز عبور کمتر از ۶ کاراکتر است'
    }
  }),
  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('users', {
      createAccount: 'create'
    }),
    async onSubmit() {
      if (this.$refs.form.validate()) {
        const data = {
          password: this.password,
          mobile: this.mobile,
          name: this.name,
          email: '',
          family: this.family,
          userTypeId: 1,
          expertises: []
        }
        try {
          await this.createAccount(data)
          await this.authenticate({
            strategy: 'local',
            mobile: this.mobile,
            password: this.password
          })
          this.$router.push('/confirm')
        } catch (ex) {
          // this.$router.push('/confirm')
          this.message = ex
          console.log(ex)
        }
      }
    }
  }
}
</script>
