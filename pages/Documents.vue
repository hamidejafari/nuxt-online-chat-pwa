<template>
  <v-card max-width="600" class="mx-auto" style="box-shadow: none;">
    <h4 class="h4 text-center py-3 px-1 ma-0 indigo--text">آپلود مدرک جدید</h4>
    <v-row class="mx-0" style="width:100%">
      <v-col cols="12" md="12">
        <upload-btn title="بارگزاری فایل جدید" @file-update="sendFileAndSave">
          <template slot="icon-left">
            <v-icon left>mdi-cloud-upload</v-icon>
          </template>
        </upload-btn>
        <v-btn
          color="indigo"
          class="white--text my-1"
          block
          rounded
          @click="backMe2()"
        >
          بازگشت به صفحه ارسال درخواست
        </v-btn>
      </v-col>
    </v-row>
    <h4 class="h4 text-center py-2 px-1 ma-0 indigo--text">پوشه مدارک</h4>
    <v-row class="mx-0" style="width:100%">
      <v-col cols="12">
        <v-row
          v-for="item in files"
          :key="item"
          class="mx-0 my-2 btprf"
          style="width:100%;"
        >
          <v-col cols="2" class="pa-1 text-center" align-self="center">
            <v-img
              :src="siteUrl + 'all-uploads/' + item.file"
              style="border-radius: 10px;"
            ></v-img>
          </v-col>
          <v-col cols="8" class="pa-1 text-center" align-self="center">
            <span>انتخاب فایل</span>
          </v-col>
          <v-col cols="2" class="pa-1 text-center" align-self="center">
            <v-checkbox
              v-model="selectedFiles"
              :value="item.id"
              required
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import UploadButton from 'vuetify-upload-button'
export default {
  components: { 'upload-btn': UploadButton },
  data: () => ({
    selectedFiles: []
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('files', {
      findFilesInStore: 'find'
    }),
    files() {
      const user = this.user
      return this.findFilesInStore({
        query: {
          $sort: { createdAt: -1 },
          userId: user.id
        }
      }).data
    },
    countFiles() {
      return (
        'انتخاب مدارک ( ' + this.selectedFiles.length + ' مدرک انتخاب شده )'
      )
    },
    siteUrl() {
      return 'http://animoshaver.ir:5050/'
    }
  },
  methods: {
    ...mapMutations({
      setSelectedFiles: 'setSelectedFiles'
    }),
    ...mapActions('files', {
      findFiles: 'find'
    }),
    ...mapActions('uploads', {
      uploadFile: 'create'
    }),
    backMe2() {
      this.$router.push({ path: '/OurServices' })
    },
    sendFileAndSave(file) {
      const reader = new FileReader()
      const vm = this
      reader.onloadend = function(evt) {
        vm.uploadFile({ uri: evt.target.result, title: '' })
          .then((file) => {
            vm.msg = 'یک فایل ارسال شد'
          })
          .catch((error) => {
            console.log(error)
          })
      }
      reader.readAsDataURL(file)
    }
  },
  watch: {
    selectedFiles(val) {
      console.log(val)
      this.setSelectedFiles(val)
    }
  },
  mounted() {
    const user = this.user
    this.findFiles({
      query: {
        $sort: { createdAt: -1 },
        userId: user.id
      }
    })
  }
}
</script>
<style>
.h4 {
  background-color: #f3e4b5;
}
.btprf {
  border: 1px solid rgb(117, 81, 3) !important;
  border-radius: 0px 10px;
  background-color: #faf1df !important;
}
#label170uploadFile {
  padding: 11px !important;
  border-radius: 100px !important;
  background: green !important;
  margin-right: 18% !important;
}
</style>
