<template>
  <v-footer app inset padless absolute>
    <v-container
      fluid
      :class="
        this.$vuetify.theme.dark == true ? 'grey darken-4' : 'grey lighten-4'
      "
    >
      <v-row justify="center" align="center">
        <v-col md="10" sm="11" xl="10" cols="12">
          <v-card-text
            class="mx-0 px-0"
            style="height: 40px; position: relative"
          >
            <v-fab-transition>
              <v-btn
                aria-label="FAB Button"
                style="margin-top:-20px"
                :color="this.$vuetify.theme.dark ? 'primary' : 'white'"
                :dark="this.$vuetify.theme.dark ? true : false"
                absolute
                top
                right
                fab
                @click="toTop"
              >
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </v-fab-transition>
            <h1
              class="google-font"
              :class="
                $vuetify.theme.dark == true
                  ? 'white--text'
                  : 'grey--text text--darken-2'
              "
            >
              Developer Student Club - LPU
            </h1>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col md="10" sm="11" xl="10" cols="12">
          <a
            href="https://developers.google.com/community/dsc"
            target="_blank"
            rel="noreferrer"
            :class="
              $vuetify.theme.dark == true
                ? 'white--text'
                : 'grey--text text--darken-3'
            "
            class="mr-3 google-font"
            style="text-decoration:none;"
            >About DSC Program</a
          >
          <a
            href="https://developers.google.com/community-guidelines"
            target="_blank"
            rel="noreferrer"
            :class="
              $vuetify.theme.dark == true
                ? 'white--text'
                : 'grey--text text--darken-3'
            "
            class="mr-3 google-font"
            style="text-decoration:none;"
            >Community Guidelines</a
          >
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>
