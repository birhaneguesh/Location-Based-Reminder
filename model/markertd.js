/**
 * Created by Birhane on 3/10/2016.
 */
var db = require("./database");

var Markercl = db.model('Markercl', {

    lat: {type:Number, required: true},
    long: {type:Number, required: true},
    message: {type: String, require: true},
    duedate: {type: Date, require: true },
    address: {type: String, require: true}
});

module.exports = Markercl;