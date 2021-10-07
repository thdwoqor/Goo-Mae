const oracledb = require('oracledb');
oracledb.autoCommit = true;

let connection;

try {
        connection = oracledb.getConnection({
        user: "WHATSSUB",
        password: "1234",
        connectString: "localhost:1521/XE"
    })
} catch (error) {
    console.log(error)
} finally {
    console.log('DB 연결');
}

module.exports=connection;