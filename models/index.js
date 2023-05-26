const User = require("./user");
const Url = require("./url");

User.hasMany(Url, {
  foreignKey: "user_id",
});

Url.belongsTo(User, {
  onDelete: "SET NULL",
});

module.exports = { User, Url };
