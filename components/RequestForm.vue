<template>
  <v-card class="ma-2 pa-2 list-profile">
    <v-row justify="space-around">
      <v-col class="d-flex" cols="12" sm="12">
        <v-row justify="space-around">
          <v-avatar size="60px" color="indigo">
            <v-icon color="white">mdi-image-filter-none</v-icon>
          </v-avatar>
        </v-row>
      </v-col>
      <v-col class="d-flex" cols="12" sm="12">
        <v-select
          v-model="selectedService"
          :items="services"
          placeholder="انتخاب خدمت"
          item-text="title"
          item-value="id"
          filled
          rounded
          dense
          class="py-0"
        ></v-select>
      </v-col>
      <v-col cols="12" md="12">
        <v-textarea
          v-model="requestDescription"
          auto-grow
          multi-line
          placeholder="متن درخواست خود را بنویسید ..."
          row-height="15"
          class="py-0"
          filled
          rounded
          dense
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="12">
        <v-btn
          color="indigo"
          to="/Documents"
          class="white--text my-1"
          block
          rounded
        >
          انتخاب مدارک مورد نیاز
        </v-btn>
        <v-btn
          :loading="loading3"
          :disabled="loading3"
          color="indigo"
          class="white--text my-1"
          block
          rounded
          @click="sendRequest"
        >
          ارسال درخواست
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import swal from 'sweetalert'
export default {
  data: () => ({
    loader: null,
    loading: false,
    loading2: false,
    loading3: false,
    loading4: false,
    loading5: false,
    selectedService: null,
    requestDescription: null
  }),
  computed: {
    ...mapState('auth', ['user']),
    services() {
      console.log(this.$store.getters.services)
      if (this.$store.getters.services == null) {
        return []
      } else {
        return this.$store.getters.services.data
      }
    }
  },
  methods: {
    ...mapMutations({
      setSelectedService: 'setSelectedService',
      setRequestDescription: 'setRequestDescription'
    }),
    ...mapActions('accepts', {
      createAccept: 'create'
    }),
    sendRequest() {
      this.createAccept({
        files: this.$store.getters.selectedFiles,
        description: this.requestDescription,
        title: '',
        serviceId: this.selectedService,
        serviceSubId: 0,
        userId: this.user.id
      }).then((res) => {
        swal(
          'درخواست شما با موفقیت ثبت شد',
          'کد پیگیری شما :‌' + res.id,
          'success'
        )
      })
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
    selectedService(val) {
      this.setSelectedService(val)
    },
    requestDescription(val) {
      this.setRequestDescription(val)
    }
  },
  mounted() {
    this.$store.dispatch('getServices', 1)
    this.selectedService = this.$store.getters.selectedService
    this.requestDescription = this.$store.getters.requestDescription
  }
}
</script>
<style>
.v-text-field__details {
  display: none;
}
.list-profile {
  background-color: #f8f9fa !important;
  box-shadow: none;
}
</style>
