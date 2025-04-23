const fs = require('fs')
const path = require('path')

const storePath = path.join(__dirname, '../data/optStore.json');

//read the store
function readStore(){
    if(!fs.existsSync(storePath)) { fs.writeFileSync(storePath, '{}');};
    const data = fs.readFileSync(storePath, "utf8")
    return JSON.parse(data || '{}' );
}

//write to the store
function writeStore(store){
    fs.writeFileSync(storePath, JSON.stringify(store, null, 2))
}

//set otp
function setOtp(email,otpData){
    const store = readStore();
     store[email] = otpData
    writeStore(store)
}

//get otp
function getOtp(email){
    const store = readStore();
    return store[email];
}

//delte otp
function deleteOtp(email){
    const store = readStore();
     delete store[email];
     writeStore(store);

}

module.exports = { setOtp, getOtp, deleteOtp}