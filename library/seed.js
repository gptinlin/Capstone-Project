// create the initial categories in the database

const {Category} = require('../library/models');

const seedTheDatabase = async () => {
    let categories = await Category.findAll({});
    if (categories.length == 0) {
        await Category.create({name: 'Week 1'});
        await Category.create({name: 'Week 2'});
        await Category.create({name: 'Week 3'});
        await Category.create({name: 'Week 4'});
        await Category.create({name: 'Week 5'});
    }
};

seedTheDatabase()