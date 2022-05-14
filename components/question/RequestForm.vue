<template>
  <v-card class="ma-2 pa-2 list-profile">
    <v-row justify="space-around">
      <v-col class="d-flex" cols="12" sm="12">
        <v-row justify="space-around">
          <v-avatar size="60px" color="indigo">
            <v-icon color="white">mdi-comment-question</v-icon>
          </v-avatar>
        </v-row>
      </v-col>
      <v-col class="d-flex" cols="12" sm="12">
        <v-select
          v-model="selectedExpertise"
          :items="expertises"
          placeholder="انتخاب تخصص"
          item-text="title"
          item-value="id"
          filled
          rounded
          dense
          class="py-0"
          @change="loadAdvisors"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="12">
        <v-select
          v-if="selectedExpertise !== null"
          v-model="selectedAdvisor"
          :items="advisors"
          placeholder="انتخاب مشاور"
          item-text="name"
          item-value="id"
          filled
          rounded
          dense
          class="py-0"
        ></v-select>
      </v-col>
      <v-col cols="12" md="12">
        <v-textarea
          v-model="questionDescription"
          auto-grow
          multi-line
          placeholder="متن سوال خود را بنویسید ..."
          row-height="15"
          class="py-0"
          filled
          rounded
          dense
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="12">
        <v-btn
          :loading="loading3"
          :disabled="loading3"
          color="indigo"
          class="white--text my-1"
          block
          rounded
          @click="sendQuestion"
        >
          ارسال سوال
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import swal from 'sweetalert'
export default {
  data: () => ({
    selectedExpertise: null,
    selectedAdvisor: null,
    questionDescription: null
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('expertises', {
      findExpertisesInStore: 'find'
    }),
    ...mapGetters('users', {
      findPersonsInStore: 'find'
    }),
    advisors() {
      if (this.selectedExpertise !== null) {
        const query = {
          $sort: { rate: -1 },
          userTypeId: { $gt: 1 },
          id: {
            $ne: this.user.id
          }
        }
        const pers = this.findPersonsInStore({
          query
        }).data
        const y = []
        let x = 0
        for (x in pers) {
          y.push({ name: pers[x].name + ' ' + pers[x].family, id: pers[x].id })
        }
        return y
      } else {
        return []
      }
    },
    expertises() {
      return this.findExpertisesInStore({
        query: {
          $sort: { createdAt: 1 },
          type: 1
        }
      }).data
    }
  },
  methods: {
    ...mapActions('expertises', {
      fetchExpertises: 'find'
    }),
    ...mapActions('users', {
      fetchPersons: 'find'
    }),
    ...mapActions('subjects', {
      createSubject: 'create'
    }),
    loadAdvisors() {
      const x = this.selectedExpertise
      const integer = parseInt(x, 10)
      const query = {
        query: {
          id: {
            $ne: this.user.id
          },
          $sort: { rate: -1 },
          $all: 1,
          userTypeId: 2,
          $expertiseId: integer
        }
      }
      this.fetchPersons(query)
    },
    sendQuestion() {
      const obj = {
        questionContent: this.questionDescription,
        userId: this.user.id,
        expertiseId: this.selectedExpertise,
        advisorId: this.selectedAdvisor,
        userIsRead: 0,
        advisorIsRead: 0
      }
      console.log(obj)
      this.createSubject(obj).then((res) => {
        this.questionDescription = null
        this.selectedExpertise = null
        this.selectedAdvisor = null
        swal('سوال شما با موفقیت ارسال شد', ' ‌', 'success')
      })
    }
  },
  mounted() {
    this.fetchExpertises({
      query: {
        $sort: { id: 1 },
        type: 1,
        status: 1
      }
    }).then((response) => {})
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
