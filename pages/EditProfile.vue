<template>
  <v-card max-width="600" class="mx-auto card-profile">
    <h4 class="h4 text-center py-3 px-1 ma-0 indigo--text">ویرایش اطلاعات</h4>
    <v-list-item three-line class="my-2 back-avatar px-3">
      <v-card class="list-profile card-profile" style="width:100%">
        <v-row>
          <v-col cols="12" md="6" class="text-center pa-2">
            <v-list-item-avatar
              size="80"
              color="grey"
              class="mx-auto my-0 avatar-profile"
            >
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-list-item-avatar>
          </v-col>
          <v-col cols="12" md="6" class="text-center pa-2 px-5">
            <v-file-input
              label="آپلود عکس"
              prepend-icon="mdi-camera"
              required
              filled
              rounded
              dense
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card>
    </v-list-item>
    <v-container class="pt-0">
      <v-card class="list-profile card-profile">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="6" md="6" class="pa-2">
                <v-text-field
                  v-model="firstname"
                  :rules="nameRules"
                  :counter="10"
                  label="نام ..."
                  required
                  filled
                  rounded
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6" class="pa-2">
                <v-text-field
                  v-model="lastname"
                  :rules="nameRules"
                  :counter="10"
                  label="نام خانوادگی ..."
                  required
                  filled
                  rounded
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pa-2">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="ایمیل ..."
                  required
                  filled
                  rounded
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pa-2">
                <v-text-field
                  v-model="number"
                  label="شماره همراه ..."
                  required
                  filled
                  rounded
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pa-2">
                <v-text-field
                  v-model="tel"
                  label="آی دی تلگرام ..."
                  required
                  filled
                  rounded
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pa-2">
                <v-text-field
                  v-model="email"
                  label="عنوان شغلی ..."
                  required
                  filled
                  rounded
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pa-2">
                <v-btn block color="success" depressed>
                  ثبت تغییرات
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-container>
  </v-card>
</template>
<script>
export default {
  layout: 'back',
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [(v) => v.length <= 10 || 'نام باید کمتر از 10 نویسه باشد'],
    number: '',
    tel: '',
    text: '',
    email: '',
    emailRules: [(v) => /.+@.+/.test(v) || 'ایمیل باید معتبر باشد']
  })
}
</script>
<style>
.avatar-profile {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7) !important;
}
.back-avatar {
  border-radius: 0 0 100% 100% !important;
}
.card-profile {
  box-shadow: none !important;
}
.list-profile {
  background-color: #f8f9fa !important;
}
.v-text-field__details {
  display: none;
}
.h4 {
  background-color: #f3e4b5;
}
</style>
