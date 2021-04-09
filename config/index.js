require('dotenv').config();

module.exports = {
  rds: {
    host: "eldorado-project-database.csmfityq2o46.us-east-1.rds.amazonaws.com",
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    port: 3306,
  },
};
