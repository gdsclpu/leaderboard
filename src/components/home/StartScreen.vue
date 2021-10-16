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
    {{ isLoading }}
    {{ leaderBoardData }}
    <v-row align="center" class="mt-5" justify="center">
      <LeaderBoardDataTable :searchTerm="searchTerm" :data="leaderBoardData" />
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
  mounted() {
    const ref = storage().ref(`test_folder`);

    ref
      .child("test_file.csv")
      .getDownloadURL()
      .then((url) => {
        // `url` is the download URL
        console.log(url);
        // This can be downloaded directly:
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
            this.leaderBoardData = studentData;
            this.leaderBoardFilteredData = studentData;
            this.isLoading = false;
          };

          myReader.readAsText(blob);
        };
        xhr.open("GET", url);
        xhr.send();
      });
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
  },
};
</script>
