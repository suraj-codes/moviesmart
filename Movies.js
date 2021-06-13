const mongoose = require("mongoose")
const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    imdb:{
        type:String,
    },
    name: {
        type: String,
    },
    year: {
        type: String,
    },
    duration: {
        type: String,
    },
    release_date:{
        type: String,
    },
    rating:{
        type: String,
    },
    desc:{
        type: String,
    },
    screenshots: {
        type: Array,
    },
    download: {
        type: Object,
        required: true
    },
    categories: {
        type: Array,
    },
    actors:{
        type: Array,
    }
})
module.exports = new mongoose.model("Movies",MovieSchema)