const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const Users = require('../users/user-model.js');
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash
    
    Users.add(user)
        .then(newU => {
            res.status(201).json(newU)
        })
        .catch(err => {
            res.status(500).json(error)
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user);

                res.status(200).json({
                    message: `Welcome back ${user.username}`,
                    token: token
                })

            }
            else {
                res.status(500).json(error)
            }
        })
})

function genToken(user) {
    const payload = {
        userid: user.id,
        user: user.username,
        department: user.department
    }

    const options = {
        expiresIn: "2h"
    }
    const token = jwt.sign(payload, secrets.jwtSecret, options);

    return token;
}

module.exports = router;