<template>
  <v-card max-width="600" class="mx-auto" style="box-shadow: none;">
    <h4 class="h4 text-center py-3 px-1 ma-0 indigo--text">
      مشاوران
    </h4>
    <v-list two-line subheader class="pa-0">
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        class="my-2 mx-2 btprf"
      >
        <v-list-item-avatar>
          <v-icon class="indigo white--text" v-text="item.icon"></v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <p
            class="my-0 font-weight-light blue-grey--text"
            style="font-size:12px;"
            v-text="item.subtitle"
          ></p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-row class="ma-0" style="width:100%">
      <Searche />
    </v-row>
  </v-card>
</template>
<script>
import Searche from '~/components/Searche.vue'
export default {
  layout: 'back',
  components: { Searche },
  data: () => ({
    items: [
      {
        icon: 'mdi-account-multiple',
        title: 'مشاوران آنلاین',
        subtitle: 'جستجوی همه مشاورانی که اکنون در دسترس هستند',
        to: '/PersonOnline'
      },
      {
        icon: 'mdi-account-multiple',
        title: 'فهرست مشاوران',
        subtitle: 'مشاهده همه مشاوران بر اساس حوزه های تخصصی',
        to: '/PersonList'
      },
      {
        icon: 'mdi-account-multiple',
        title: 'مشاوران من',
        subtitle: 'مشاهده همه مشاوران بر اساس حوزه های تخصصی',
        to: '/'
      }
    ]
  })
}
</script>
<style>
.btprf {
  border: 1px solid rgb(117, 81, 3) !important;
  border-radius: 0px 10px;
  background-color: #faf1df !important;
}
.h4 {
  background-color: #f3e4b5;
}
.v-text-field__details {
  display: none;
}
</style>
