<template>
  <v-container fluid class="h-100 mb-5 pb-5">
    <v-row align="center" justify="center">
      <v-col cols="12" md="12" lg="12" class="text-center h-100">
        <h1>{{ mainData.LeaderBoardName || "" }}</h1>
      </v-col>
    </v-row>
    <v-row align="center" class="mt-5" justify="center">
      <LeaderBoardFilters @searchData="filterData" />
    </v-row>
    <v-row
      align="center"
      v-if="!isLoading"
      class="mt-5 mb-5 pb-5"
      justify="center"
    >
      <LeaderBoardDataTable :searchTerm="searchTerm" :data="leaderBoardData" />
    </v-row>
    <v-row align="center" v-else class="mt-5" justify="center">
      <v-progress-circular indeterminate color="black"></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
import mainData from "@/assets/data/about.json";
const { storage } = require("../../firebaseConfig");

export default {
  name: "StartScreen",
  components: {
    LeaderBoardFilters: () =>
      import("./LeaderBoardFilters/LeaderBoardFilters.vue"),
    LeaderBoardDataTable: () =>
      import("./LeaderBoardDataTable/LeaderBoardDataTable.vue"),
  },
  data() {
    return {
      searchTerm: "",
      mainData,
      isLoading: true,
      leaderBoardData: [],
    };
  },
  async mounted() {
    const Data = await this.getDataFromCSVFirebase();
    const sortedData = this.sortByRemainingTracks(Data);
    this.leaderBoardData = sortedData.slice(1, sortedData.length);
    this.leaderBoardFilteredData = sortedData.slice(1, sortedData.length);
    this.isLoading = false;
  },
  methods: {
    filterData($value) {
      this.searchTerm = $value;
    },
    sortByRemainingTracks(data) {
      const dta = data.sort((a, b) => {
        return a.badges.track1 + a.badges.track2 <
          b.badges.track1 + b.badges.track2
          ? 0
          : -1;
      });
      return dta;
    },
    async getDataFromCSVFirebase() {
      const ref = storage().ref(`test_folder`);

      const data = await new Promise((resolve, reject) => {
        ref
          .child("test_file.csv")
          .getDownloadURL()
          .then((url) => {
            // requesting to csv file and get data from that
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function() {
              const blob = xhr.response;
              const myReader = new FileReader();
              myReader.onload = (e) => {
                const csv = e.target.result;
                const allTextLines = csv.split(/\r\n|\n/);
                const lines = [];
                for (let i = 0; i < allTextLines.length; i++) {
                  const data = allTextLines[i].split(";");
                  const tarr = [];
                  for (let j = 0; j < data.length; j++) {
                    tarr.push(data[j]);
                  }
                  lines.push(tarr);
                }
                const allData = lines.splice(1, lines.length);
                const studentData = [];
                allData.forEach((data) => {
                  const dt = data[0].split(",");
                  const obj = {
                    name: dt[0],
                    badges: {
                      track1: dt[1],
                      track2: dt[2],
                    },
                  };
                  studentData.push(obj);
                });
                resolve(studentData);
              };

              myReader.readAsText(blob);
            };
            xhr.open("GET", url);
            xhr.send();
          });
      });
      return data;
    },
  },
};
</script>
