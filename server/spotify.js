ServiceConfiguration.configurations.update(
  { "service": "spotify" },
  {
    $set: {
      "clientId": "ea56b81418334eb2b1387c34ee817e2d",
      "secret": "edc77ac454e046158e08a11eeabb7c49"
    }
  },
  { upsert: true }
);
