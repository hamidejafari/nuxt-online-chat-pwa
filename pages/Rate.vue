<template>
  <div dir="rtl" class="text-center d-flex rtsd">
    <v-rating
      v-model="rating"
      background-color="orange lighten-3"
      color="orange"
      large
    ></v-rating>
    <v-btn class="bt green white--text font-weight-bold">
      ثبت
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    rating: 3
  })
}
</script>
<style>
.rtsd {
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
}
.bt {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  border-radius: 0;
}
</style>
