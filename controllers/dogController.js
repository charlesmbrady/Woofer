module.exports = function (db) {
  return {
    // get dog info for single dog
    getDogInfo: (req, res) => {
      db.Dog.findOne({
        where: {
          id: req.body.id
        }
      }).then(result => {
        res.json(result);
      }).catch(err => {
        res.json(err);
      });
    },
    // get all dogs for an owner
    getAllOwnerDog: (req, res) => {
      db.Dog.findAll({
        include: [db.User]
      }).then(result => {
        res.json(result);
      }).catch(err => {
        res.json(err);
      });
    },
    // add a new dog
    add: (req, res) => {
      console.log('REQ.FILE', req.file);
      console.log(req.body);
      // const dogArray = JSON.parse(req.body.dogArray);
      console.log('DOG ARRAY');
      db.Dog.create({
        dogName: req.body["name"],
        breed: req.body["breed"],
        age: req.body["age"],
        weight: req.body["weight"],
        gender: req.body["type-dog"],
        isUptoDate: req.body["vaccinated"],
        getAlong: req.body["dog-issue"],
        possessive: req.body["possessive"],
        situation: req.body["reactive"],
        playStyle: req.body["play-style"],
        dogPic: req.file.path,
        // TODO: Not sure where userId is coming from - is it just user-id?
        UserId: req.body[""]
      }).then(result => {
        res.json(result);
      }).catch(err => {
        res.json(err);
      });
    },
    // delete a dog
    removeDog: (req, res) => {
      db.Dog.destroy({
        where: {
          id: req.body.id
        }
      }).then(result => {
        res.json(result);
      }).catch(err => {
        res.json(err);
      });
    }
  };
};
