module.exports = function (db) {
  return {
    // get dog info for single dog
    getDogInfo: (req, res) => {
      console.log("REQ Get Dog", req.params.id);
      // console.log("REQ", req);
      db.Dog.findOne({
        where: {
          id: req.params.id
        }, 
        include: [db.User]
      }).then(result => {
        console.log("RESULT FROM DB DOGCON", result);
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
      console.log(req.session)
      console.log(req.session.passport)
      console.log(req.session.passport.user)
      // const dogArray = JSON.parse(req.body.dogArray);
      // console.log('DOG ARRAY');
      db.Dog.create({
        dogName: req.body["name"],
        breed: req.body["breed"],
        age: req.body["age"],
        weight: req.body["weight"],
        gender: req.body["type-dog"],
        isUptoDate: req.body["vaccinated"],
        getAlong: req.body["dog-issue"].toString(),
        possessive: req.body["possessive"].toString(),
        situation: req.body["reactive"].toString(),
        playStyle: req.body["play-style"].toString(),
        dogPic: req.file.path.replace("\\", "/"),
        UserId: req.session.passport.user.id
      }).then(result => {
        // res.json(result);
        // req.session.save(() => res.redirect("/console"));
        res.redirect("/console");
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