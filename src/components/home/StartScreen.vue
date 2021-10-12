<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="12" lg="12" class="text-center h-100">
        <h1>{{ mainData.LeaderBoardName || "" }}</h1>
      </v-col>
    </v-row>
    <v-row align="center" class="mt-5" justify="center">
      <LeaderBoardFilters @searchData="filterData" />
    </v-row>
    <v-row align="center" class="mt-5" justify="center">
      <LeaderBoardDataTable
        :searchTerm="searchTerm"
        :data="sortByRemainingTracks()"
      />
    </v-row>
  </v-container>
</template>

<script>
import mainData from "@/assets/data/about.json";
import leaderBoardDataObject from "@/assets/data/leaderboardData.json";
export default {
  name: "StartScreen",
  components: {
    LeaderBoardFilters: () =>
      import("./LeaderBoardFilters/LeaderBoardFilters.vue"),
    LeaderBoardDataTable: () =>
      import("./LeaderBoardDataTable/LeaderBoardDataTable.vue"),
  },
  data: () => ({
    searchTerm: "",
    mainData,
    leaderBoardData: leaderBoardDataObject.leaderBoardData,
    leaderBoardFilteredData: leaderBoardDataObject.leaderBoardData,
  }),
  mounted() {},
  methods: {
    filterData($value) {
      this.searchTerm = $value;
    },
    sortByRemainingTracks() {
      const data = this.leaderBoardFilteredData.sort((a, b) => {
        return a.badges.track1 + a.badges.track2 <
          b.badges.track1 + b.badges.track2
          ? 0
          : -1;
      });
      return data;
    },
  },
};
</script>
