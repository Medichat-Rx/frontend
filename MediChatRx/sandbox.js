let data = {
  description:
    "Klinik Utama Cakra Medika, Jalan Inspeksi Kalimalang, RT.003/RW.021, Jatimulya, Kabupaten Bekasi, Jawa Barat, Indonesia",
  matched_substrings: [{ length: 6, offset: 0 }],
  place_id: "ChIJ40xRiGWOaS4RczgyvQ4jI0w",
  reference: "ChIJ40xRiGWOaS4RczgyvQ4jI0w",
  structured_formatting: {
    main_text: "Klinik Utama Cakra Medika",
    main_text_matched_substrings: [{ length: 6, offset: 0 }],
    secondary_text:
      "Jalan Inspeksi Kalimalang, RT.003/RW.021, Jatimulya, Kabupaten Bekasi, Jawa Barat, Indonesia",
  },
  terms: [
    { offset: 0, value: "Klinik Utama Cakra Medika" },
    { offset: 27, value: "Jalan Inspeksi Kalimalang" },
    { offset: 54, value: "RT.003" },
    { offset: 61, value: "RW.021" },
    { offset: 69, value: "Jatimulya" },
    { offset: 80, value: "Kabupaten Bekasi" },
    { offset: 98, value: "Jawa Barat" },
    { offset: 110, value: "Indonesia" },
  ],
  types: ["health", "point_of_interest", "establishment"],
};

const axios = require('axios');

axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=hospital%clinic&location=-33.8670522%2C151.1957362&radius=1500')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });

//   type: "establishment",
//   keyword: ["hospital", "health", "point_of_interest", "establishment"],