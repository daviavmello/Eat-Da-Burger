let express = require('express');
let router = express.Router();

let burger = require('../models/burger');

router.get('/', (req, res) => {
    burger.all((data) => {
      let hbsObject = {
        burgers: data
      };
     res.render('index', hbsObject); 
    });
});

router.post('/api/burgers', (req, res) => {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body, req.body.devoured
    ], (result) => {
        res.json({ id: result.insertId });
    });
});

router.put('/api/burgers/:id', (req, res) => {
    let condition = 'id = ' + req.params.id;;

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, result => {
    if (result.changedRows === 0) {
        return res.status(404).end();
    } else {
        req.status(200).end();
    }
    });
});

router.delete('api/burgers/:id', (req, res) => {
    let condition = 'id = ' + req.params.id;

    burger.delete(condition, result => {
        if (result.affectedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;