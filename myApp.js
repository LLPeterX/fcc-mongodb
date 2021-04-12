// use .env file
require('dotenv').config();

// connec to MongoDB
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// create schema
let personSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true},
  age: {type: Number, default: 0},
  favoriteFoods: [String]
});
// create Model
let Person = new mongoose.model('Person',personSchema);

// create and save person
const createAndSavePerson = (done) => {
  const person = {
    name: 'Aswonder',
    age: 101,
    favoriteFoods: ['Apples','Steak','Пельмени']
  };
  const document = new Person(person);
  document.save(function(err, data) {
    if (err) {
      console.error(err);
    } else {
     done(null, data);
    }
  });
};

// create many persons
const arrayOfPeople = [
    {name: "Foo", age:14, favoriteFoods: ['Bananas']},
    {name: 'Bar', age: 16, favoriteFoods: ['Сосиски','Паштет','Жареная картошка'] }

 ];

const createManyPeople = (arrayOfPeople, done) => {
  console.log('Run createManyPeople()', arrayOfPeople);
  const persons = Person.create(arrayOfPeople, function(err,data) {
    if (err) {
      console.error(err);
    } else {
     done(null, data);
    }
  });
};

// find a person by name
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err,data) {
   if (err) {
      console.error(err);
    } else {
     done(null, data);
    }
  });

};

// find person by name of one of favorite food
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err,data) {
    if (err) {
      console.error('findOne() error:',err);
    } else {
      done(null, data);
    } 
  }
  );
};

// find person by Id
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) {
      console.error('findById() error:',err);
    } else {
      console.log('call findById',data);
      done(null, data);
    } 
  }
  ); 
};

// find person by id, add to favorite foods, then save
// почему-тоне проходит валидацию, 
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  console.log('Search id=',personId);
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
    person.favoriteFoods.push(foodToAdd);
    person.markModified('favoriteFoods');
    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      console.log('saving',updatedPerson);
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
