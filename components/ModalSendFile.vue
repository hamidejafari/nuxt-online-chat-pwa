<template>
  <div class="text-xs-center" style="margin-top: -2.5%;">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-layout class="w-s text-xs-center pr-3">
          <v-btn fab dark small color="primary" v-on="on">
            <v-icon dark>mdi-folder-multiple-image</v-icon>
          </v-btn>
        </v-layout>
      </template>

      <v-card style="border-radius:15px">
        <v-card-title
          style="text-align:center"
          class="headline grey aniback white--text"
        >
          <p class="text-xs-center" style="width: 100%;margin: 0%;">
            فایل های من
          </p>
        </v-card-title>

        <v-container>
          <v-layout row>
            <v-flex xs12>
              <v-card>
                <v-list subheader outline>
                  <upload-btn
                    title="انتخاب عکس "
                    @file-update="sendFileAndSave"
                  >
                    <template slot="icon-left">
                      <v-icon left>mdi-upload</v-icon>
                    </template>
                  </upload-btn>
                  <v-list-item
                    v-for="item in files"
                    :key="item.id"
                    class="my-2 mx-2 px-1"
                    style="border:1px solid #755103 !important;border-radius:0px 10px;background: #faf1df;"
                  >
                    <v-list-item-avatar size="60" class="mr-1">
                      <img
                        :src="siteUrl + 'all-uploads/' + item.file"
                        style="width: 90px;height: 90px;"
                      />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-btn
                        class="info white--text"
                        style="border-radius:10px;"
                        @click="sendFile(item.id)"
                      >
                        ارسال فایل
                      </v-btn>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="red white--text"
            style="border-radius:10px"
            flat
            @click="dialog = false"
          >
            بستن
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import UploadButton from 'vuetify-upload-button'
export default {
  components: { 'upload-btn': UploadButton },
  data: () => ({
    dialog: false,
    msg: ''
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('files', {
      findFilesInStore: 'find'
    }),
    ...mapGetters('events', {
      findEventsInStore: 'find'
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
    siteUrl() {
      return 'http://animoshaver.ir:5050/'
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
  },
  methods: {
    ...mapActions('files', {
      findFiles: 'find'
    }),
    ...mapActions('messages', {
      createMessage: 'create'
    }),
    ...mapActions('uploads', {
      uploadFile: 'create'
    }),
    sendFile(fileId) {
      const user = this.$store.state.auth.user
      const event = this.findEventsInStore({
        query: {
          $or: [{ reservedId: user.id }, { userId: user.id }],
          eventTypeId: 600
        }
      }).data[0]
      this.msg = 'یک فایل ارسال شد'
      this.createMessage({
        messageBody: this.msg,
        userId: user.id,
        messageTypeId: 2,
        messageSourceId: 1,
        documentId: fileId,
        eventId: event.id
      })
      this.msg = ''
      this.dialog = false
    },
    sendFileAndSave(file) {
      const reader = new FileReader()
      const vm = this
      reader.onloadend = function(evt) {
        vm.uploadFile({ uri: evt.target.result, title: '' })
          .then((file) => {
            const user = vm.user
            const event = vm.findEventsInStore({
              query: {
                $or: [{ reservedId: user.id }, { userId: user.id }],
                eventTypeId: 600
              }
            }).data[0]
            const xwz = vm.findFilesInStore({
              query: {
                file: file.id
              }
            }).data[0]
            vm.msg = 'یک فایل ارسال شد'
            vm.createMessage({
              messageBody: vm.msg,
              userId: user.id,
              messageTypeId: 2,
              messageSourceId: 1,
              documentId: xwz.id,
              eventId: event.id
            })
            vm.msg = ''
            vm.dialog = false
          })
          .catch((error) => {
            console.log(error)
          })
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
<style>
@media (max-width: 768px) {
  .w-s {
    margin-right: -7%;
  }
}
</style>
