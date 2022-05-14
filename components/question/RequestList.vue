<template>
  <v-list two-line subheader class="pa-0">
    <div v-for="item in subjects" :key="item.id">
      <v-list-item
        v-if="item.answerContent !== null"
        class="my-2 mx-2 px-2 blue-grey lighten-5"
        style="border: 1px solid#999;border-radius: 15px;background: #e9fce7 !important;"
      >
        <v-list-item-content>
          <v-list-item-title
            v-text="'مشاور : ' + item.Advisor.name + ' ' + item.Advisor.family"
          ></v-list-item-title>
          <p
            style="font-size: 14px;
color: #585757;"
          >
            {{ 'متن سوال ' + ' : ' + item.questionContent }}
          </p>
          <p
            v-if="item.answerContent !== null"
            style="font-size: 14px;
color: #585757;margin-top: 10px;"
          >
            {{ 'متن پاسخ ' + ' : ' + item.answerContent }}
          </p>
          <v-list-item-subtitle
            v-text="'شماره پیگیری : ' + item.id"
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-if="item.answerContent == null"
            v-text="notAnswer"
          ></v-list-item-subtitle>
          <v-list-item-subtitle v-else v-text="isAnswer"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-else
        class="my-2 mx-2 px-2 blue-grey lighten-5"
        style="border: 1px solid#999;border-radius: 15px;background: #fafaee !important;"
      >
        <v-list-item-content>
          <v-list-item-title
            v-text="'مشاور : ' + item.Advisor.name + ' ' + item.Advisor.family"
          ></v-list-item-title>
          <p
            style="font-size: 14px;
color: #585757;"
          >
            {{ 'متن سوال ' + ' : ' + item.questionContent }}
          </p>
          <p
            v-if="item.answerContent !== null"
            style="font-size: 14px;
color: #585757;margin-top: 10px;"
          >
            {{ 'متن پاسخ ' + ' : ' + item.answerContent }}
          </p>
          <v-list-item-subtitle
            v-text="'شماره پیگیری : ' + item.id"
          ></v-list-item-subtitle>
          <v-list-item-subtitle
            v-if="item.answerContent == null"
            v-text="notAnswer"
          ></v-list-item-subtitle>
          <v-list-item-subtitle v-else v-text="isAnswer"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('subjects', {
      findSubjectsInStore: 'find'
    }),
    subjects() {
      const user = this.user
      return this.findSubjectsInStore({
        query: {
          $sort: { createdAt: -1 },
          userId: user.id
        }
      }).data
    },
    notAnswer() {
      return 'پاسخ داده نشده'
    },
    isAnswer() {
      return 'پاسخ داده شده'
    }
  },
  mounted() {
    const user = this.user
    this.loadSubjects(user)
  },
  methods: {
    ...mapActions('subjects', {
      findSubjects: 'find'
    }),
    loadSubjects(user) {
      this.findSubjects({
        query: {
          $sort: { createdAt: -1 },
          userId: user.id
        }
      })
    }
  }
}
</script>
<style>
.v-list-item__subtitle {
  padding: 3px !important;
}
</style>
