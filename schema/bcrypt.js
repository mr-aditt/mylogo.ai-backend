var bcrypt = require('bcrypt');

async function hashPwd(pwd){
    try{
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(pwd, salt);
        return hash
    }catch (error){
        console.log(error)
    }
}

async function comparePwd(pwd, hashedPwd){
    try{
        return bcrypt.compareSync(pwd, hashedPwd)
    }catch (error){
        console.log(error);
    }
}

module.exports = {hashPwd, comparePwd}