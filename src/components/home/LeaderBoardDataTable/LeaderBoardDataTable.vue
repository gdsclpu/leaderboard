<template>
  <v-col md="10" sm="10" xl="10">
    <v-data-table
      :headers="headers"
      :items="addFinalData()"
      :search="inputVal"
      item-key="rank"
      class="elevation-1"
    ></v-data-table>
  </v-col>
</template>

<script>
export default {
  name: "LeaderBoardDataTable",
  props: {
    data: {
      type: Array,
      require: true,
    },
    searchTerm: {
      type: String,
      require: true,
    },
  },
  computed: {
    headers: () => {
      return [
        {
          text: "Rank",
          value: "rank",
        },
        { text: "name", value: "name" },
        { text: "#of badges in Track 1", value: "badges.track1" },
        { text: "#of badges in Track 2", value: "badges.track2" },
        { text: "Total Badges", value: "badges.total" },
        { text: "Remaining Badges", value: "badges.remaining" },
      ];
    },
  },

  methods: {
    addFinalData() {
      const dta = this.$props.data.map((dta, index) => {
        dta["rank"] = index + 1;
        dta.badges["total"] =
          parseInt(dta.badges.track1) + parseInt(dta.badges.track2);
        dta.badges["remaining"] =
          6 - dta.badges.track1 + (6 - dta.badges.track2);
        return dta;
      });
      return dta;
    },
  },
};
</script>

<style></style>
