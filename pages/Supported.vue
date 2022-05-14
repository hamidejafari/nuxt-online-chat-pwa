<template>
  <div>
    <h4 class="h4 text-center py-3 px-1 ma-0 indigo--text">
      گزارشات پشتیبانی
    </h4>
    <v-container>
      <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
        <v-expansion-panel class="my-1">
          <v-expansion-panel-header class="btprf">
            <v-row>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold">عنوان پشتیبانی ۱</p>
              </v-col>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold">۱۱:۱۰:۱۸ - ۲۴/۰۹/۱۳۹۸</p>
              </v-col>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold red--text">در دست اقدام</p>
              </v-col>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold green--text">انجام شد</p>
              </v-col>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold">توضیح کوتاه تستی ۱</p>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-0 ma-0 panel-content">
            <div class="pt-4">
              <p class="my-1 font-weight-bold">جواب مشاور :</p>
              <p class="my-1 blue-grey--text">جواب تستی جواب تستی</p>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="my-1">
          <v-expansion-panel-header class="btprf">
            <v-row>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold">عنوان پشتیبانی ۲</p>
              </v-col>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold">۱۱:۱۰:۱۸ - ۲۴/۰۹/۱۳۹۸</p>
              </v-col>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold red--text">در دست اقدام</p>
              </v-col>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold green--text">انجام شد</p>
              </v-col>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold">توضیح کوتاه تستی ۲</p>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-0 ma-0 panel-content">
            <div class="pt-4">
              <p class="my-1 font-weight-bold">جواب مشاور :</p>
              <p class="my-1 blue-grey--text">جواب تستی جواب تستی</p>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="my-1">
          <v-expansion-panel-header class="btprf">
            <v-row>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold">عنوان پشتیبانی ۳</p>
              </v-col>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold">۱۱:۱۰:۱۸ - ۲۴/۰۹/۱۳۹۸</p>
              </v-col>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold red--text">در دست اقدام</p>
              </v-col>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold green--text">انجام شد</p>
              </v-col>
              <v-col cols="12" class="py-2">
                <p class="my-0 font-weight-bold">توضیح کوتاه تستی ۳</p>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-0 ma-0 panel-content">
            <div class="pt-4">
              <p class="my-1 font-weight-bold">جواب مشاور :</p>
              <p class="my-1 blue-grey--text">جواب تستی جواب تستی</p>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'back',
  data: () => ({
    panel: [0],
    disabled: false,
    readonly: false
  })
}
</script>
<style>
.h4 {
  background-color: #f3e4b5;
}
.btprf {
  border-radius: 0px;
  background-color: #faf1df !important;
}
.panel-content {
  background-color: rgba(127, 255, 212, 0.15);
}
</style>
