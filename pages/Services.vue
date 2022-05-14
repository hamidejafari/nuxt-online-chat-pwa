<template>
  <v-card flat max-width="600" class="mx-auto">
    <h4 class="h4 text-center py-3 px-1 ma-0 indigo--text">
      خدمات
    </h4>
    <v-divider />
    <v-container class="py-1 px-1">
      <v-row style="width:100%" class="ma-0">
        <v-col
          v-for="item in items"
          :key="item"
          cols="6"
          md="4"
          class="py-1 px-1 mx-auto"
        >
          <v-card class="roun" to="/OurServices">
            <v-row class="indigo d-flex rowitem">
              <v-img :src="item.img" max-width="75"></v-img>
            </v-row>
            <v-card-text
              class="text-center font-weight-bold px-1 indigo--text card-text-servic"
            >
              {{ item.title }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  layout: 'back',
  data: () => ({
    items: [
      {
        img: '/logo-ani5.png',
        title: 'عنوان خدمات۱'
      },
      {
        img: '/logo-ani5.png',
        title: 'عنوان خدمات۲'
      },
      {
        img: '/logo-ani5.png',
        title: 'عنوان خدمات۳'
      },
      {
        img: '/logo-ani5.png',
        title: 'عنوان خدمات۴'
      },
      {
        img: '/logo-ani5.png',
        title: 'عنوان خدمات۲'
      },
      {
        img: '/logo-ani5.png',
        title: 'عنوان خدمات۳'
      }
    ]
  })
}
</script>
<style>
.card-d {
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
  background-color: rgba(243, 228, 181, 0.4) !important;
}
.h4 {
  background-color: #f3e4b5;
}
.factor-p {
  font-size: 12px;
  font-weight: bold;
}
.roun {
  border-radius: 2vh !important;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1) !important;
}
.rowitem {
  width: 100%;
  margin: 0;
  height: 147px;
  align-items: center;
  justify-content: center;
}
.card-text-servic {
  background-color: #f5df9e;
}
</style>
