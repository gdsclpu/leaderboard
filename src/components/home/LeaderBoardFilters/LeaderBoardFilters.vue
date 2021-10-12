<template>
  <v-col md="7" sm="7" xl="7">
    <v-text-field
      label="Search Name..."
      :value="searchData"
      @input="sendSearchData"
      hide-details="auto"
    ></v-text-field>
    {{ searchData }}
  </v-col>
</template>

<script>
export default {
  name: "LeaderBoardFilters",
  data: () => ({
    searchData: "",
  }),
  methods: {
    sendSearchData(value) {
      this.searchData = value;
      this.$emit("searchData", value);
    },
  },
};
</script>

<style scoped></style>
