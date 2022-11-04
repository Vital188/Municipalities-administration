const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: '20mb' }));
const cors = require("cors");
app.use(cors());
const md5 = require('js-md5');
const uuid = require('uuid');
const mysql = require("mysql");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "admin",
});

////////////////////LOGIN/////////////////

const doAuth = function(req, res, next) {
    if (0 === req.url.indexOf('/server')) { // admin
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length || results[0].role !== 10) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login') || 0 === req.url.indexOf('/register')) {
        next();
    } else { 
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    }
}

app.use(doAuth);

// AUTH
app.get("/login-check", (req, res) => {
    const sql = `
         SELECT
         name, role
         FROM users
         WHERE session = ?
        `;
    con.query(sql, [req.headers['authorization'] || ''], (err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.send({ msg: 'error', status: 1 }); // user not logged
        } else {
            if ('admin' === req.query.role) {
                if (result[0].role !== 10) {
                    res.send({ msg: 'error', status: 2 }); // not an admin
                } else {
                    res.send({ msg: 'ok', status: 3 }); // is admin
                }
            } else {
                res.send({ msg: 'ok', status: 4 }); // is user
            }
        }
    });
});

app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) {
            res.status(401).send({ msg: 'error', key: '' });
        } else {
            res.send({ msg: 'ok', key, text: 'Good to see you ' + req.body.user + ' again.', type: 'info' });
        }
    });
});

app.post("/register", (req, res) => {
    const key = uuid.v4();
    const sql = `
    INSERT INTO users (name, psw, session)
    VALUES (?, ?, ?)
  `;
    con.query(sql, [req.body.name, md5(req.body.pass), key], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'ok', key, text: 'Welcome!', type: 'info' });
    });
});

///////////////////END////////////////////


//CREATE
app.post("/server/regionai", (req, res) => {
    const sql = `
    INSERT INTO regionai (region, image)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.region,  req.body.image], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'New municipality was added.', type: 'success' });
    });
});

 app.post("/server/field", (req, res) => {
     const sql = `
     INSERT INTO field (title, image2)
     VALUES (?, ?)
     `;
     con.query(sql, [req.body.title, req.body.image2], (err, result) => {
         if (err) throw err;
         res.send({ msg: 'OK', text: 'New services was added.', type: 'success' });
     });
 });


app.post("/home/comments/:id", (req, res) => {
    const sql = `
    INSERT INTO comments (post, regionai_id, field_id, image, image2, region, title)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.post, req.params.id, req.body.field_id, req.body.image, req.body.image2, req.body.region, req.body.title], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'Thanks, for commenting.', type: 'info' });
    });
});

// READ (all)
app.get("/server/regionai", (req, res) => {
    const sql = `
    SELECT id, region, image
    FROM regionai
    ORDER BY id DESC
    `;
    con.query(sql,  (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/server/field", (req, res) => {
    const sql = `
    SELECT id, title, image2
    FROM field
    ORDER BY id DESC
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


app.get("/home/regionai", (req, res) => {
    const sql = `
    SELECT *
    FROM regionai 
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/home/field", (req, res) => {
    const sql = `
    SELECT id, title, image2
    FROM field
    ORDER BY id DESC
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});



app.get("/home/regionai/wc", (req, res) => {
    const sql = `
    SELECT r.*, c.id AS cid, c.post
    FROM regionai AS r
    INNER JOIN comments AS c
    ON c.regionai_id = r.id
    ORDER BY r.region
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/home/comments/wc", (req, res) => {
    const sql = `
    SELECT c.*, r.id AS rid, f.id AS fid, f.title, f.image2 
    FROM comments AS c
    INNER JOIN regionai AS r
    ON c.regionai_id = r.id
    INNER JOIN field AS f
    ON c.field_id = f.id
    ORDER BY c.post
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});




//DELETE
app.delete("/server/regionai/:id", (req, res) => {
    const sql = `
    DELETE FROM regionai
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'The municipality was deleted.', type: 'info' });
    });
});

app.delete("/server/field/:id", (req, res) => {
    const sql = `
    DELETE FROM field
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'The service was deleted.', type: 'info' });
    });
});

app.delete("/server/comments/:id", (req, res) => {
    const sql = `
    DELETE FROM comments
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'Bad comment was deleted.', type: 'info' });
    });
});




app.put("/server/comments/:id", (req, res) => {
    const sql = `
    UPDATE comments
    SET 
    orderis = ?
    WHERE id = ?
    `;
    con.query(sql, [ req.body.confirmed, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ rsg: 'OK', text: 'Thanks, for your vote.', type: 'info' });
    });
});

app.put("/server/regionai/:id", (req, res) => {
    let sql;
    let r;
    if (req.body.deletePhoto) {
        sql = `
        UPDATE regionai
        SET region = ?, image = null
        WHERE id = ?
        `;
        r = [req.body.region, req.params.id];
    } else if (req.body.image) {
        sql = `
        UPDATE regionai
        SET region = ?, image = ?
        WHERE id = ?
        `;
        r = [req.body.region, req.body.image, req.params.id];
    }
     else {
        sql = `
        UPDATE regionai
        SET region = ?, 
        WHERE id = ?
        `;
        r = [req.body.region, req.params.id]
    }
    con.query(sql, r, (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'The region and field was edited.', type: 'success' });
    });
});

app.put("/server/field/:id", (req, res) => {
    let sql;
    let f;
    if (req.body.deletePhoto) {
        sql = `
        UPDATE field
        SET title = ?, image2 = null
        WHERE id = ?
        `;
        f = [req.body.title, req.params.id];
    } else if (req.body.image2) {
        sql = `
        UPDATE field
        SET title = ?, image2 = ?
        WHERE id = ?
        `;
        f = [req.body.title, req.body.image2, req.params.id];
    } else {
        sql = `
        UPDATE field
        SET title = ? 
        WHERE id = ?
        `;
        f = [req.body.title, req.params.id]
    }
    con.query(sql, f, (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'The service was edited.', type: 'success' });
    });
});



app.listen(port, () => {
    console.log(`Administration portala rodo per ${port} portą!`)
});






