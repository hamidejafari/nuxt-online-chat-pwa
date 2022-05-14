<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn
          class="mr-1"
          depressed
          color="indigo lighte white--text"
          v-on="on"
        >
          <span>درباره من</span>
        </v-btn>
      </template>

      <v-card style="border-radius:15px">
        <v-card-title
          style="text-align:center"
          class="grey aniback white--text"
        >
          <p
            class="text-xs-center"
            style="width: 100%;margin: 0%;font-size:20px"
          >
            درباره من
          </p>
        </v-card-title>

        <v-container>
          <v-row>
            <v-col cols="12" md="6" class="py-1">
              <v-expansion-panels class="my-1" focusable>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    >رزومه کاری</v-expansion-panel-header
                  >
                  <v-expansion-panel-content class="pt-5">
                    {{ personDetails.content }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <v-col cols="12" md="6" class="py-1">
              <v-expansion-panels class="my-1" focusable>
                <v-expansion-panel>
                  <v-expansion-panel-header>افتخارات</v-expansion-panel-header>
                  <v-expansion-panel-content class="pt-5">
                    {{ personDetails.fames }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <v-col cols="12" md="6" class="py-1">
              <v-expansion-panels class="my-1" focusable>
                <v-expansion-panel>
                  <v-expansion-panel-header>تالیفات</v-expansion-panel-header>
                  <v-expansion-panel-content class="pt-5">
                    {{ personDetails.books }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
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
export default {
  props: ['personDetails'],
  data: () => ({
    panel: [true, true, false],
    disabled: false,
    readonly: false,
    dialog: false,
    items: [{ title: 'نوشتاری', value: 'isChat' }]
  })
}
</script>
