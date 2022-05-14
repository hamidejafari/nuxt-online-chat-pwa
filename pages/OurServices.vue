<template>
  <v-card max-width="100%" class="mx-auto" style="box-shadow: none;">
    <h5
      class="indigo--text pt-3 pb-2 text-center my-0"
      style="background: #f3e4b5;"
    >
      درخواست خدمات قضایی - اداری
    </h5>
    <RequestForm />
    <h5
      class="indigo--text pt-3 pb-2 text-center my-0"
      style="background: #f3e4b5;"
    >
      لیست خدماتی که تاکنون درخواست کرده اید
    </h5>
    <RequestList />
  </v-card>
</template>

<script>
import RequestList from '~/components/RequestList.vue'
import RequestForm from '~/components/RequestForm.vue'
export default {
  components: {
    RequestList,
    RequestForm
  },
  layout: 'back'
}
</script>
