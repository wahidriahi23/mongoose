const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

//Create a Model
  }).then(()=>console.log("database connected")).catch((err)=>console.log(err))
  const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },  
  age: Number,
  favoriteFoods: [String]
});
//Create and Save a Record of a Model
const Person = mongoose.model("person",personSchema);
const createAndSavePerson = async (done) => {
    const newPerson = new Person({
      name: 'John Doe',
      age: 30,
      favoriteFoods: ['Pizza', 'Burger','patata'],
    });
  
    // Save the created person document
    const result =  await newPerson.save() 
    console.log(result);
  };
createAndSavePerson()
//Create Many Records with model.create()
  const arrayOfPeople=[
    {name :'razi',email:'razi@gmail.com',age:40,favoriteFoods:['omlet','sandwitch']},
    {name :'safe',email:'safe@gmail.com',age:25,favoriteFoods:['sandwitch']},
    {name: "Omar", age: 55, favoriteFoods: ["makrona"]},
    {name: "Hamza", age: 14, favoriteFoods: ["makloub"]}, 
  ];
  const createManyPerson = async  (arrayOfPeople)=>{
    try {
        const createdPeople = await Person.create(arrayOfPeople);
        console.log("People created successfully:", createdPeople);
    } catch (err) {
        console.error(err);
    }
};
createManyPerson (arrayOfPeople)

//Use model.find() to Search Your Database
const searchName = (name) => {
    Person.find({ name: name })
        .then((people) => {
            console.log(`People with name '${name}':`, people);
        })
        .catch((err) => {
            console.error(err);
        });
};
searchName('Omar'); 
//Use model.findOne() to Return a Single Matching Document from Your Database
const findOnePerson = (favoriteFoods) => {
    Person.findOne({ favoriteFoods: { $in: [favoriteFoods] } })
        .then((person) => {
            console.log(`the person who loves this food '${favoriteFoods}':`, person);
        })
        .catch((err) => {
            console.error(err);
        });
};

findOnePerson('makrona'); 
//Use model.findById() to Search Your Database By _id
const findIdPerson = (_id) => {
    Person.findById({ _id: _id })
        .then((personId) => {
            console.log(`The person with ID is: '${_id}'`, personId);
        })
        .catch((err) => {
            console.error(err);
        });
};

findIdPerson('659c11f213328dd3f30909cd');
//Perform Classic Updates by Running Find, Edit, then Save
const updateFoods = (_id) => {
    Person.findById(_id)
        .then((personfind) => {
            personfind.favoriteFoods.push('burger');
            return personfind.save();
        })
        .then((updatePerson) => {
            console.log('Food updated successfully:', updatePerson);
        })
        .catch((err) => {
            console.error(err);
        });
};

updateFoods('659c11f213328dd3f30909cd');
//Perform New Updates on a Document Using model.findOneAndUpdate()
const updateOnePerson = (name) => {
    Person.findOneAndUpdate({ name: name }, { $set: { age: 20 } }, { new: true })
        .then((findIdPerson) => {
            console.log('The person found is', findIdPerson);
        })
        .catch((err) => {
            console.error(err);
        });
};

updateOnePerson('Hamza');

//Delete One Document Using model.findByIdAndRemove
const deletePerson = (_id) => {
    Person.findOneAndDelete({ _id })
        .then((personDelete) => {
            console.log('We deleted this person:', personDelete);
        })
        .catch((err) => {
            console.error(err);
        });
};

deletePerson('659c11f213328dd3f30909cd');
//Delete Many Documents with model.remove()

const deleteManyPeople = (name) => {
    Person.deleteMany({ name: 'Safe' })
        .then((deletePeople) => {
            console.log('People deleted:', deletePeople);
        })
        .catch((err) => {
            console.error(err);
        });
};

deleteManyPeople();
const chainMethods = () => {
    Person.find({ favoriteFoods: 'burritos' })
        .sort({ name: 1 }) // sort ascending by name
        .limit(2) // limit to 2 items
        .select("-age") // Hide the Ages
        .exec() // execute the query
        .then(() => {
            console.log('Query chain completed');
        })
        .catch((err) => {
            console.error(err);
        });
};

chainMethods();