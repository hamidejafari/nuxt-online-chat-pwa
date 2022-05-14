<template>
  <v-card flat max-width="600">
    <h4 class="h4 text-center py-3 px-1 ma-0 indigo--text">
      صندوق پرسش و پاسخ
    </h4>
    <div class="pa-2">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="item in items"
          :key="item.title"
          flat
          class="mb-2 faq-n"
        >
          <v-expansion-panel-header class="pa-3 text-justify line-h">
            <v-row class="ma-0 pl-3" style="width:100%">
              <v-col cols="12" class="pa-0">
                <p
                  class="ma-0 py-2"
                  style="border-bottom:1px solid #eee;color:rgb(209, 160, 7)"
                >
                  پرسش :
                </p>
              </v-col>
              <v-col cols="12" class="pa-0">
                <p class="ma-0 py-2 indigo--text" v-text="item.title"></p>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content
            class="pa-3"
            style="border-top: 1px solid #ddd;"
          >
            <v-row class="ma-0" style="width:100%">
              <v-col cols="12" class="pa-0">
                <p
                  class="ma-0 py-2"
                  style="border-bottom:1px solid #eee;color:rgb(209, 160, 7)"
                >
                  پاسخ :
                </p>
              </v-col>
              <v-col cols="12" class="pa-0">
                <p
                  class="ma-0 py-2 grey--text darken-2--text"
                  v-text="item.description"
                ></p>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-card>
</template>
<script>
export default {
  layout: 'back',
  data: () => ({
    items: [
      {
        title:
          'سوال تستی پرسیده شده‌ ؟ سوال تستی پرسیده شده‌ سوال تستی پرسیده شده‌ ؟ سوال تستی پرسیده شده‌ ؟ سوال تستی پرسیده شده‌ ؟',
        description: 'تستی تستی تستی تستی تستی تستی تستی تستی',
        to: '/'
      },
      {
        title: 'ریز تراکنش های اعتبار',
        description: 'تستی تستی تستی تستی تستی تستی تستی تستی',
        to: '/'
      },
      {
        title: 'پشتیبان',
        description: 'تستی تستی تستی تستی تستی تستی تستی تستی',
        to: '/'
      },
      {
        title: 'مشاوره',
        description: 'تستی تستی تستی تستی تستی تستی تستی تستی',
        to: '/'
      }
    ]
  })
}
</script>
<style>
.line-h {
  line-height: 1.5;
}
.h4 {
  background-color: #f3e4b5;
}
.v-expansion-panel--active:not(:first-child),
.v-expansion-panel--active + .v-expansion-panel {
  margin-top: 0;
}
.faq-n .v-expansion-panel-content__wrap {
  padding: 0;
}
</style>
