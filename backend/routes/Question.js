const express = require('express');
const router = express.Router();

const questionDB = require('../models/Question');

router.post('/', async(req,res) => {
    console.log(req.body);
    try {
        await questionDB.create({
            questionName: req.body.questionName,
            questionUrl: req.body.questionUrl,
            createdAt: new Date().toISOString(),
            user: req.body.user
        }).then(() => {
            res.status(201).send({
                status: true,
                message: 'Question added successfully'
            })
        }).catch((err) => {
            res.status(400).send({
                status: false,
                message: 'Bad Request'
            })
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error while adding question'
        }) 
    }
});

router.get('/', async(req, res) => {
    try {
        await questionDB.aggregate([{
            $lookup: {
                from: 'answers', //questions joining with answers
                localField: '_id', //_id field from the 'questions' collection.
                foreignField: 'questionId', //the questionId field from the 'answers' collection.
                as: 'allAnswers' //output array field
            }
        }])
        .exec()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                status: false,
                message: 'Unable to get question details'
            })
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error while fetching questions'
        })
    }
});

module.exports = router;