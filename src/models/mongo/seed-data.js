export const seedData = {
  users: {
    _model: "User",
    linus: {
      firstName: "Linus",
      lastName: "Schlepp",
      email: "linus@schlepp.com",
      password: "secret",
      admin: "false",
    },
    john: {
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
      password: "secret",
      admin: "false",
    },
    max: {
      firstName: "Max",
      lastName: "Mustermann",
      email: "max@mustermann.com",
      password: "secret",
      admin: "false",
    },
  },
  categories: {
    _model: "Category",
    cities: {
      name: "cities",
      userid: "->users.linus",
    },
  },
  placemarks: {
    _model: "Placemark",
    regensburg: {
      longitude: 12.35,
      latitude: 49.15,
      img: "test",
      name: "Regensburg",
      description: "Nice city in Bavaria",
      categoryid: "->categories.cities",
    },
    waterford: {
      longitude: -72.35,
      latitude: 41.35,
      name: "Waterford",
      img: "test",
      description: "Nice city in the south east of Ireland",
      categoryid: "->categories.cities",
    },
  },
};
