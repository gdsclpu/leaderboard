<template>
  <v-content class="ma-0">
    <v-container fluid class="mt-0 pt-0">
      <v-row justify="center" align="center">
        <v-col md="10" sm="11" xl="10" cols="12" class="mt-0 pt-0">
          <StartScreen />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
// @ is an alias to /src
import StartScreen from "@/components/home/StartScreen";
export default {
  name: "Home",
  components: {
    StartScreen,
  },
};
</script>
