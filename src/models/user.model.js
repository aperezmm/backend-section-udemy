const mongoose = require('mongoose');
const {Schema} = mongoose;
const {compareSync, hashSync, genSaltSync} = require('bcryptjs');

const UserSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
});

UserSchema.methods.toJSON = function(){
    let user = this.toObject(); //Convierta ese objeto de mongo en objeto js
    delete user.password;
    return user;
};

//Para comparar las contraseñas
UserSchema.methods.comparePassword = function(password){
    return compareSync(password, this.password); //This corresponde al que se esta manipulando
};

//Antes de guardar quiero que haga esto
UserSchema.pre('save', async function(next){
    const user = this; //this hará referencia al usuario que se esta guardando     
    if(!user.isModified("password")){
        return next();
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
});


module.exports = mongoose.model('user', UserSchema);