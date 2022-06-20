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
      longitude: 49.013432,
      latitude: 12.101624,
      img: "https://res.cloudinary.com/dvfwsgoh0/image/upload/v1655461983/mhi6dbjsefhc97b1ewte.png",
      name: "Regensburg",
      description: "Nice city in Bavaria",
      categoryid: "->categories.cities",
    },
    waterford: {
      longitude: 52.2583,
      latitude: -7.1119,
      name: "Waterford",
      img: "https://res.cloudinary.com/dvfwsgoh0/image/upload/v1655461983/mhi6dbjsefhc97b1ewte.png",
      description: "Nice city in the south east of Ireland",
      categoryid: "->categories.cities",
    },
  },
};
