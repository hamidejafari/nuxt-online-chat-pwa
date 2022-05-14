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
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="text-center px-md-2 px-sm-2 px-0 py-0"
            style="align-self: center;"
          >
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="نام"
              placeholder
              filled
              rounded
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="text-center px-md-2 px-sm-2 px-0 py-0"
            style="align-self: center;"
          >
            <v-text-field
              v-model="family"
              :rules="familyRules"
              label="نام خانوادگی"
              placeholder
              filled
              rounded
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="text-center px-md-2 px-sm-2 px-0 py-0"
            style="align-self: center;"
          >
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
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="text-center px-md-2 px-sm-2 px-0 py-0"
            style="align-self: center;"
          >
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
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
          <p style="color:red">{{ message }}</p>
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
                @click="onSubmit"
                >ثبت نام</v-btn
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
                >ورود</v-btn
              >
            </div>
          </v-col>
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
