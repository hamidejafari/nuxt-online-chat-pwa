<template>
  <v-card max-width="600" class="mx-auto card-profile" style="height:100%">
    <h4 class="h4 text-center py-3 px-1 ma-0 indigo--text">تغییر رمز عبور</h4>
    <v-container
      class="pt-0"
      style="height:93%;display: flex;align-items: center;"
    >
      <v-card class="list-profile card-profile">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="12" class="text-center">
                <v-avatar size="60px" color="indigo">
                  <v-icon color="white">mdi-key-change</v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="12" md="6" class="pa-2">
                <v-text-field
                  v-model="password"
                  label="رمز عبور جدید ..."
                  required
                  filled
                  rounded
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pa-2">
                <v-text-field
                  v-model="password"
                  label="تکرار رمز عبور جدید ..."
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
    password: ''
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
