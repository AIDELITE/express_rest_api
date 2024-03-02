const sql = require("./db");

// constructor
const Users = function (users) {
    this.first_name = users.first_name;
    this.last_name = users.last_name;
    this.sex = users.sex;
    this.address = users.address;
    this.account_status = users.account_status;
}

Users.create = (newUsers, result) => {
    sql.query("INSERT INTO `users` SET ?", newUsers, (err, res) => {
        if (err) {
            console.log("Creation error: ", err);
            result(err, null);
            return;
        }

        console.log("user created: ", {
            id: res.insertId,
            ...newUsers
        });
        result(null, {
            id: res.insertId,
            ...newUsers
        });
    });
};

Users.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found User: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({
            kind: "not_found"
        }, null);
    });
};

Users.getAll = (title, result) => {
    let query = "SELECT * FROM users";

    if (title) {
        query += ` WHERE (first_name LIKE '%${title}%'  OR last_name LIKE '%${title}%')`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

Users.getAllActive = result => {
    sql.query("SELECT * FROM users WHERE account_status=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

Users.updateById = (id, user, result) => {
    sql.query(
        "UPDATE users SET first_name = ?, last_name = ?, sex = ?, address = ?, account_status = ? WHERE id = ?",
        [user.first_name, user.last_name, user.sex, user.address, user.account_status, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({
                    kind: "not_found"
                }, null);
                return;
            }

            console.log("updated user: ", {
                id: id,
                ...user
            });
            result(null, {
                id: id,
                ...user
            });
        }
    );
};

Users.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found User with the id
            result({
                kind: "not_found"
            }, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

Users.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};

module.exports = Users;