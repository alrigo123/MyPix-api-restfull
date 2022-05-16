const functionInputData = {};

functionInputData.generatePassword = () => {
    let pass = ""
    let str = 'ABDCDEFGHIJKLMNÑOPQRSTUVWXYZ' + 'abcdefghijklmnñopqrstuvwxyz12234567890@#$'
    for (i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random() * str.length + 1)

        pass += str.charAt(char)
    }
   return pass
};

functionInputData.randomNumber = () => {
    return Math.floor(Math.random() * (100 - 2 + 1)) + 2;
}



functionInputData.generateEmail = () => {
    var email = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789#";
    for (var i = 0; i < 8; i++)
        email += possible.charAt(Math.floor(Math.random() * possible.length));
    
    const newEmail = `${email}@gmail.com`;

    return newEmail;
}
//generatePassword();
// console.log(generateEmail());
// console.log(randomNumber());
// generatePassword();



module.exports = functionInputData;