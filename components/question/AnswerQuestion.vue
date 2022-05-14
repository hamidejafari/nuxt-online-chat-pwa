<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn
        block
        rounded
        color="indigo"
        dark
        class="font-weight-black"
        style="background: #48a440 !important;"
        v-on="on"
        >پاسخ به سوال</v-btn
      >
    </template>

    <v-card>
      <v-card-title
        style="text-align:center;border-radius: 15px 15px 0px 0px;font-size:20px"
        class="font-weight-black grey aniback white--text"
      >
        <p class="my-0" style="width:100%">پاسخ به سوال</p>
      </v-card-title>
      <v-col cols="12" md="12">
        <v-textarea
          v-model="answer"
          auto-grow
          multi-line
          placeholder="متن پاسخ خود را بنویسید ..."
          row-height="15"
          class="py-0"
          filled
          rounded
          dense
        ></v-textarea>
      </v-col>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="red white--text"
          flat="flat"
          @click="postAnswer(questionId)"
          >ارسال پاسخ سوال</v-btn
        >
        <v-btn class="red white--text" flat="flat" @click="close">بستن</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['questionId'],
  data: () => ({
    dialog: false,
    answer: ''
  }),
  methods: {
    ...mapActions('subjects', {
      updateSubject: 'patch'
    }),
    close() {
      this.dialog = false
    },
    postAnswer(id) {
      this.updateSubject([
        id,
        {
          answerContent: this.answer,

          userIsRead: 0,
          advisorIsRead: 1
        },
        {}
      ]).then((res) => {
        this.answer = null
        this.dialog = false
      })
    }
  }
}
</script>
