<template>
  <v-container>
    <v-card
      max-width="500"
      class="mx-auto"
      style="border-radius: 15px;box-shadow:none"
    >
      <v-list subheader outline>
        <p class="text-center pb-0">
          مشاوران آنلاین
        </p>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          class="my-2 mx-2 pr-0 blue-grey lighten-5"
          style="border: 1px solid#999;border-radius: 15px;"
        >
          <v-badge
            bordered
            bottom
            color="green"
            dot
            offset-x="25"
            offset-y="20"
          >
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>
          </v-badge>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon color="indigo">mdi-arrow-left-bold-circle</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: 'back',
  data: () => ({
    items: [
      {
        active: true,
        title: 'Jason Oner',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        to: '/'
      },
      {
        active: true,
        title: 'Ranee Carlson',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        to: '/'
      },
      {
        title: 'Cindy Baker',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        to: '/'
      },
      {
        title: 'Ali Connors',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        to: '/'
      }
    ]
  })
}
</script>
