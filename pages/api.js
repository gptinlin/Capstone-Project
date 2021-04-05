var express = require('express');
var router = express.Router();
const {Category, Question, Answer, User} = require('../lib/models');

// GET /api/v1/categories
// GET /api/v1/categories/:categoryId/questions
// POST /api/v1/categories/:categoryId/questions
// POST /api/v1/categories/:categoryId/questions/:questionId/answers
// GET /api/v1/categories/:categoryId/questions/:questionId/answers
// GET /questions/:questionId/answers

router.get('/profile',(req, res, next) => {
        console.log('req.user is', req.user);
        // write code like find the user where the email id is this
        res.json({
            message: 'This is a secure route',
            user: req.user,
            token: req.query.secret_token
        })
    }
);

router.get('/users/me', async (req, res, next) => {
    console.log('req.user is', req.user);
    // write code like find the user where the email id is this
    let u = await User.findOne({where: {email: req.user.email}});
    res.json({
        message: 'This is a secure route',
        user: u,
        token: req.query.token
    })
}
);


router.get('/categories', async function(req, res, next) {
    let categories = await Category.findAll({});
    res.json(categories);
});

router.post('/categories/:categoryId/questions', async function(req, res, next) {
    let body = req.body;
    body.categoryId = req.params.categoryId;
    let question = await Question.create(body); 
    res.json(question);
});

router.get('/categories/:categoryId/questions', async function(req, res, next) {
    let questions = await Question.findAll( {where: {categoryId: req.params.categoryId}});
    res.json(questions);
});

router.post('/categories/:categoryId/questions/:questionId/answers', async function(req, res, next) {
    let body = req.body;
    body.questionId = req.params.questionId;
    let answer = await Answer.create(body); 
    res.json(answer);
});

router.get('/categories/:categoryId/questions/:questionId/answers', async function(req, res, next) {
    let answers = await Answer.findAll( {where: {questionId: req.params.questionId}});
    res.json(answers);
});

router.post('/questions/:questionId/answers', async function(req, res, next) {
    let body = req.body;
    body.questionId = req.params.questionId;
    let answers = await Answer.create(body);
    res.json(answers);
});

router.get('/questions/:questionId/answers', async function(req, res, next) {
    let answers = await Answer.findAll( {where: {questionId: req.params.questionId}});
    res.json(answers);
});


module.exports = router;