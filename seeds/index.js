const sequelize = require("../config/connection");
const { User, Url } = require("../models");

const userData = require("./userData.json");
const urlData = require("./urlData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // bulk create the user's from the json file and wait to encrypt the passwords
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // loop through the json and add in the user id
  for (const url of urlData) {
    await Url.create({
      ...url,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
