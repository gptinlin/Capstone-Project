const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../lib/db');


// Models (tables) are defined here
class Category extends Model {
}
// Model attributes are defined here 
Category.init({
    name: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Category',
});

class Question extends Model {
}
Question.init({
    questionTxt: {
        type: 'LONGTEXT'
    },
}, {
    sequelize, // pass the conection instance
    modelName: 'Question', // choose the model name
});
Category.hasMany(Question, {foreignKey: 'categoryId'});
Question.belongsTo(Category, {foreignKey: 'categoryId'});

class Answer extends Model {
}
Answer.init({
    answerTxt: {
        type: 'LONGTEXT'
    },
}, {
    sequelize,
    modelName: 'Answer',
});

Question.hasMany(Answer, {foreignKey: 'questionId'});
Answer.belongsTo(Question, {foreignKey: 'questionId'});

class User extends Model {

}

User.init({
    // Model attributes are defined here
    email: {
        type: 'LONGTEXT'
        // allowNull: false
    },
    password: {
        type: 'LONGTEXT'
        // allowNull: false
    },
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
});

User.hasMany(Question, {foreignKey: 'userId'});
Question.belongsTo(User, {foreignKey: 'userId'});


sequelize.sync({ alter: true });  // This line keeps the database and changes in sync

// delete the data be careful
// sequelize.sync({force: true});

module.exports = {
    Category, Question, Answer, User
};