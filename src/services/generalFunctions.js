export default {
  methods: {
    checkExistance: (link, size) => link && link.length > size,

    sortByName: (data) =>
      data.sort((a, b) => {
        return a.id.toLowerCase() < b.id.toLowerCase() ? 0 : 1;
      }),

    sortByName2: (data) =>
      data.sort((a, b) => {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      }),

    getCharString: (data) => {
      var splitArr = data.split(" ");
      if (splitArr.length > 1) {
        return (
          splitArr[0].substring(0, 1) +
          "" +
          splitArr[1].substring(0, 1)
        ).toUpperCase();
      } else {
        return splitArr[0].substring(0, 1).toUpperCase();
      }
    },
  },
};
