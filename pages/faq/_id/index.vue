<template>
  <v-app id="app" class="pa-0">
    <v-content class="pa-0">
      <v-container fluid fill-height class="pa-0">
        <v-layout justify-center>
          <v-flex xs12 sm8 md6 class="pa-0">
            <v-card class="elevation-12 px-0" style="height:100%">
              <v-toolbar
                color="grey lighten-5"
                class="px-0"
                style="height: 70px;padding-top: 1.25%;"
              >
                <v-row class="ma-0" style="width:100%">
                  <v-col cols="2" style="align-self: center;" class="px-0 py-0">
                    <v-avatar color="indigo" size="45">
                      <img src="/user.png" alt="John" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="8" style="align-self: center;">
                    <strong>{{ adviser.name + ' ' + adviser.family }}</strong>
                  </v-col>
                  <v-col cols="2" style="align-self: center;">
                    <v-btn icon color="indigo" @click="backMe()">
                      <v-icon style="font-size: 40px;"
                        >mdi-arrow-left-bold-circle</v-icon
                      >
                    </v-btn>
                  </v-col>
                </v-row>
              </v-toolbar>
              <v-card-text class="pa-0">
                <v-list
                  id="logs"
                  ref="chat"
                  class="pa-3"
                  style="height: 80vh;overflow: auto;background: #f2f2f2;"
                >
                  <v-layout v-for="item in messages" :key="item.id" row wrap>
                    <v-flex v-if="item.senderId == user.id" xs11 class="my-1">
                      <v-subheader
                        class="messageme"
                        style="text-align: right;height: 100% !important;padding: 0px 10px;border-radius: 15px;border-top-right-radius: 0;margin-right: 0%;color: white;float: right;"
                      >
                        <p
                          class="text-xs-left messageme-text"
                          style="margin: 0px !important;background: #90ee90;padding: 2%;border-radius: 15px;border-top-right-radius: 0;border-top-left-radius: 15px;padding: 10px 15px 5px;text-align: right !important;color: rgba(0, 0, 0, 0.87);width: 100%;"
                        >
                          {{ item.message }}
                        </p>
                      </v-subheader>
                    </v-flex>
                    <v-flex v-else xs6 class="my-1" style="margin-right:10%">
                      <v-subheader
                        class="messageguest"
                        style="text-align: left;height: 100% !important;padding: 0px 10px;border-top-right-radius: 15px;margin-top: 1%;margin-left: -80%;direction: ltr;"
                      >
                        <p
                          class="text-xs-right messageguest-text"
                          style="margin: 0px !important;background: #fff;padding: 2%;border-radius: 15px;border-top-left-radius: 0;padding: 10px 15px 5px;text-align: right !important;border-top-right-radius: 15px;color: rgba(0, 0, 0, 0.87);width: 100%;"
                        >
                          {{ item.message }}
                        </p>
                      </v-subheader>
                    </v-flex>
                  </v-layout>
                </v-list>
              </v-card-text>
              <v-card-actions
                class="pa-0"
                style="position: relative;width: 100%;bottom: 0;background: #FFF;"
              >
                <v-form style="width:100%" @submit.prevent="submit">
                  <v-row class="ma-0" style="width:100%">
                    <v-col
                      cols="2"
                      class="py-0 pl-0 pr-2"
                      style="text-align: center;align-self: center;"
                    >
                      <v-btn
                        depressed
                        fab
                        dark
                        small
                        color="indigo"
                        type="submit"
                      >
                        <v-icon dark>mdi-send</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col
                      cols="10"
                      class="py-3 pl-2 mt-0"
                      style="text-align: center;align-self: center;height:auto;"
                    >
                      <v-textarea
                        v-model="msg"
                        auto-grow
                        multi-line
                        placeholder="پیام . . ."
                        row-height="5"
                        rounded
                        class="pt-0"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  layout: 'chat',
  data: () => ({
    logs: [],
    msg: null,
    userId2: null
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('users', {
      findUserInStore: 'find'
    }),
    ...mapGetters('issues', {
      findIssuesInStore: 'find'
    }),
    adviser() {
      const y = this.$route.params.id
      const integer = parseInt(y, 10)
      const x = this.findUserInStore({
        query: {
          id: integer
        }
      }).data
      if (x.length > 0) {
        return x[0]
      } else {
        return x
      }
    },
    messages() {
      const y = this.$route.params.id
      const integer = parseInt(y, 10)
      const x = this.findUserInStore({
        query: {
          id: integer
        }
      }).data
      if (x.length > 0) {
        console.log(
          this.findIssuesInStore({
            query: {
              $sort: { createdAt: -1 },
              $or: [
                {
                  senderId: integer,
                  receiverId: this.user.id
                },
                {
                  senderId: this.user.id,
                  receiverId: integer
                }
              ]
            }
          }).data
        )
        return this.findIssuesInStore({
          query: {
            $sort: { id: 1 },
            $or: [
              {
                senderId: integer,
                receiverId: this.user.id
              },
              {
                senderId: this.user.id,
                receiverId: integer
              }
            ]
          }
        }).data
      } else {
        return []
      }
    }
  },
  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight
      }, 0)
    }
  },
  mounted() {
    this.clearAllUsers()
    this.fetchIssuePersons()
    this.fetchIssuesMessages()
  },
  methods: {
    ...mapMutations('users', {
      clearAllUsers: 'clearAll'
    }),
    ...mapActions('users', {
      fetchPersons: 'find'
    }),
    ...mapActions('issues', {
      fetchIssues: 'find',
      createIssue: 'create'
    }),
    backMe() {
      this.$router.push({ path: '/personlist/' })
    },
    fetchIssuePersons() {
      const y = this.$route.params.id
      const integer = parseInt(y, 10)
      const query = {
        query: {
          id: integer
        }
      }
      this.fetchPersons(query)
    },
    fetchIssuesMessages() {
      console.log(this)
      const y = this.$route.params.id
      const integer = parseInt(y, 10)
      console.log(integer + ' ' + this.user.id)
      this.fetchIssues({
        query: {
          $sort: { id: -1 },
          $or: [
            {
              senderId: integer,
              receiverId: this.user.id
            },
            {
              senderId: this.user.id,
              receiverId: integer
            }
          ]
        }
      })
    },
    submit() {
      const y = this.$route.params.id
      const integer = parseInt(y, 10)
      this.createIssue({
        message: this.msg,
        senderId: this.user.id,
        receiverId: integer,
        messageTypeId: 1,
        isRead: 0
      })
      this.logs.push(this.msg)
      this.msg = ''
    }
  }
}
</script>
<style>
.v-text-field__details {
  display: none !important;
}
.v-input__slot {
  margin: 0px !important;
}
</style>
