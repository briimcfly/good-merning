//Import Model and Schema from Mongoose to create our db model 
const { Schema, model } = require('mongoose');
//Import bcrypt to hash passwords
const bcrypt = require('bcrypt');

//Define the schema for the User model 
const userSchema = new Schema({
    //Define username field of type String
    //It is required, must be unique, and whitespace is trimmed 
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    //Define email field of type String
    //It is required, must be unique, and must match a specific pattern for email 
    email : {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    //Define password field of type String
    //It is required and must have a minimum of 8 characters 
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
})

//Adds a pre-save hook to the user schema 
userSchema.pre('save', async function(next) {
    //Check if the document is new or if the password has been modified 
    if(this.isNew || this.isModified('password')) {
        //define the number of salt rounds for bcrypt to use
        const saltRounds = 10;
        //Hash the password and replace the plain text password with the hashed one
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    //Proceed to the next middleware or save the document
    next();
});

//Add a method to user schema to validate passwords 
userSchema.methods.isCorrectPassword = async function(password) {
    //Compare provided with stored hashed password
    return bcrypt.compare(password, this.password);
}

//Create the user model using schema 
const User = model('User', userSchema);

//Export the user model. 
module.exports = User;