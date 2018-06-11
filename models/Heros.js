const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const heroSchema = new Schema({
    name: String,
    power: String,
    authorId : String
});

module.exports = mongoose.model("Hero",heroSchema);