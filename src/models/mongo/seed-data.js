export const seedData = {
  users: {
    _model: "User",
    linus: {
      firstName: "Linus",
      lastName: "Schlepp",
      email: "linus@schlepp.com",
      password: "secret",
      admin: false,
    },
    john: {
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
      password: "secret",
      admin: false,
    },
    max: {
      firstName: "Max",
      lastName: "Mustermann",
      email: "max@mustermann.com",
      password: "secret",
      admin: false,
    },
    admin: {
      firstName: "Admin",
      lastName: "Admin",
      email: "admin@admin.com",
      password: "admin",
      admin: true,
    },
  },
  categories: {
    _model: "Category",
    cities: {
      name: "cities",
      userid: "->users.linus",
    },
    forests: {
      name: "forests",
      userid: "->users.admin",
    },
  },
  placemarks: {
    _model: "Placemark",
    regensburg: {
      longitude: 12.101624,
      latitude: 49.013432,
      img: "https://res.cloudinary.com/dvfwsgoh0/image/upload/v1655752479/gye5gjok0uzqfb6w1z4n.jpg",
      name: "Regensburg",
      description: "Nice city in Bavaria",
      categoryid: "->categories.cities",
    },
    waterford: {
      longitude: -7.1119,
      latitude: 52.2583,
      name: "Waterford",
      img: "https://res.cloudinary.com/dvfwsgoh0/image/upload/v1655752647/rhr1seligomoiccpidkd.jpg",
      description: "Nice city in the south east of Ireland",
      categoryid: "->categories.cities",
    },
    random_forest: {
      longitude: -91.289101,
      latitude: 37.546444,
      name: "Mark Twain National Forest",
      img: "https://res.cloudinary.com/dvfwsgoh0/image/upload/v1655461983/mhi6dbjsefhc97b1ewte.png",
      description: "Just a random forest in America, nothing special",
      categoryid: "->categories.forests",
    },
  },
};
