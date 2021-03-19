let mysql = require('mysql'); // Requiring the mysql module.
let pool = mysql.createPool({ // Creating a mysql pool for mysql queries.
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dhl'
});

module.exports = {
    test: (callback) =>  {
        pool.getConnection((err) => {
            if(err) {
                callback(0);
            } else {
                callback(1);
            }
        });
    },
    query: (query, callback) => {
        pool.getConnection((err, con) => {
            if(err) {
                throw err;
            } else {
                con.query(query, (err, res) => {
                    con.release();
                    if(err) {
                        throw err;
                    } else {
                        callback(res);
                    }
                });
            }
        });
    }
};