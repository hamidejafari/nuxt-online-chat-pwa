<template>
  <v-container>
    <h5
      class="indigo--text pt-3 pb-2 text-center my-0"
      style="background: #feecef !important;
color: #050b75 !important;
padding: 4px;
margin-top: 10px !important;
margin-bottom: 17px !important;"
    >
      مشاور گرامی در صورتی که مدارک ضروری را ارسال نکنید حساب کاربری شما فعال
      نشده و قادر به مشاوره نخواهید بود
    </h5>
    <h5
      class="indigo--text pt-3 pb-2 text-center my-0"
      style="background: #feecef !important;
color: #050b75 !important;
padding: 4px;
margin-top: 10px !important;
margin-bottom: 17px !important;"
    >
      پس از بارگزاری مدارک منتظر تایید حساب کاربری خود باشید
    </h5>
    <v-card class="px-10 py-5" style="border-radius: 15px;">
      <v-dialog
        v-model="uploadWaitingDialogVisible"
        hide-overlay
        persistent
        width="300"
      >
        <v-card color="primary" dark>
          <v-card-text>
            لطفا صبر کنید
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-row
        v-for="record in user.records"
        :key="record.id"
        row
        wrap
        style="margin-bottom: 50px;
border-bottom: 5.25px solid #050b75;
background: #f2fff2 !important;
border-radius: 0px !important;
padding: 10px;"
      >
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="text-center px-md-2 px-sm-2 px-0 py-0"
          style="align-self: center;"
        >
          <p>{{ record.title }}</p>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="text-center px-md-2 px-sm-2 px-0 py-0"
          style="align-self: center;margin-bottom: 13px;"
        >
          <rahweb-upload-btn
            :extra-param="record.recordTypeId"
            flat
            class="aniback white--text text-xs-center pa-0"
            small
            title="انتخاب و ارسال"
            @file-update="uploadImage"
          >
          </rahweb-upload-btn>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="4"
          class="text-center px-md-2 px-sm-2 px-0 py-0"
          style="align-self: center;"
        >
          <img
            v-if="record.recordFile !== null"
            :src="record.recordFile"
            style="width:100px;height:70px;border-radius:15px"
          />
        </v-col>
        <v-col
          cols="6"
          sm="6"
          md="4"
          class="text-center px-md-2 px-sm-2 px-0 py-0"
          style="align-self: center;"
        >
          <v-btn v-if="record.force" flat small class="red white--text">
            ضروری
          </v-btn>
          <v-btn v-else flat small class="green white--text">
            غیرضروری
          </v-btn>
        </v-col>
        <v-col
          cols="6"
          sm="6"
          md="4"
          class="text-center px-md-2 px-sm-2 px-0 py-0"
          style="align-self: center;"
        >
          <div v-if="record.approveDate !== null">
            تایید شده
          </div>
          <div v-else>
            تایید نشده
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import RahwebUploadButton from './../components/RahwebUploadButton'
const _ = require('lodash')
export default {
  components: {
    'rahweb-upload-btn': RahwebUploadButton
  },
  data: () => ({
    uploadWaitingDialogVisible: false
  }),
  methods: {
    ...mapActions('users', {
      createAccount: 'create'
    }),
    ...mapActions('files', {
      editFile: 'patch'
    }),
    ...mapActions('uploads', {
      uploadFile: 'create'
    }),
    uploadImage(file) {
      const reader = new FileReader()
      const vm = this
      reader.onloadend = function(evt) {
        vm.uploadWaitingDialogVisible = true
        console.log('giii4')
        vm.uploadFile({
          uri: evt.target.result,
          title: 'doc',
          recordTypeId: file.extraParam
        })
          .then((res) => {
            const selectedDoc = _.find(vm.user.records, function(o) {
              return o.recordTypeId === file.extraParam
            })
            selectedDoc.recordFile = res.recordFile
            vm.uploadWaitingDialogVisible = false
          })
          .catch((ex) => {
            vm.uploadWaitingDialogVisible = false
          })
      }
      reader.readAsDataURL(file.file)
    },
    removeFile(file) {
      if (confirm('آیا از حذف این فایل اطمینان دارید؟')) {
        this.editFile([file.id, { status: 0 }])
      }
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>

<style>
.li {
  display: inline;
}
@media (max-width: 768px) {
  .ddd .bradkam span {
    font-size: 15px;
    margin-top: 10;
  }
  .bradkam {
    padding: 0% 0% !important;
  }
  .bradkam img {
    width: 5.5% !important;
  }
}
.ddd {
  padding-top: 5%;
  padding-left: 2%;
  padding-right: 2%;
}
.hs-h {
  border-top: 2px solid rgb(5, 11, 117);
  margin-bottom: 4%;
}
.bradkam {
  color: #7f5c19;
  text-align: center;
  padding: 3% 0%;
  position: absolute;
  z-index: 1;
  margin-top: -10.5%;
  width: 98%;
}
.bradkam span {
  font-size: 30px;
  background: #fff;
  padding: 0% 2%;
}
.backpanel {
  background: #f5f6fa !important;
  height: 100%;
}
.bradkam {
  color: #7f5c19;
  text-align: center;
}
.bradkam img {
  width: 2.5%;
}
.bradkam span {
  font-size: 30px;
}
.aniback > .upload-btn {
  background: #040a74 !important;
  padding: 10px !important;
}
/* .v-input__control {
  width: 95% !important;
  margin: auto;
}
.v-label {
  right: auto !important;
  color: #b18d27 !important;
  font-size: 13px;
  text-align: right;
  margin-left: 0px;
  width: 100%;
  padding-left: 10%;
}
.v-input__slot {
  border: 0px !important;
  border-radius: 10px;
  background: #eee !important;
  padding: 0% 3%;
}
.v-select__slot {
  border-radius: 5px !important;
  background: #ddd !important;
  padding: 0% 2% !important;
} */
</style>
