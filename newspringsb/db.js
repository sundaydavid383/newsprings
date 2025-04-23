const mongoose = require('mongoose');
console.log("testimony password", process.env.PASSWORD)
console.log("reister password", process.env.PASSWORDFORUSERCREATION)
console.log("register name", process.env.NAMEFORUSERCREATION)

const connectDatabases = async () => {
  try {
    // Testimonies DB connection
    const testimoniesConnection = mongoose.createConnection(
      `mongodb+srv://sundayudoh383:${process.env.PASSWORD}@newspringchurchdb.m83dh.mongodb.net/?retryWrites=true&w=majority&appName=newspringChurchDB`
    );
    
    const registrationsConnection = mongoose.createConnection(
      `mongodb+srv://sundayudoh383:${process.env.PASSWORDFORUSERCREATION}@newspringschurchdbforus.9krik63.mongodb.net/?retryWrites=true&w=majority&appName=newspringschurchdbforuser`
    );

    // Wait for both connections to be ready
    await testimoniesConnection.asPromise();
    await registrationsConnection.asPromise();
    console.log("✅ Both MongoDB connections established");

    return { testimoniesConnection, registrationsConnection };
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};

module.exports = connectDatabases;
