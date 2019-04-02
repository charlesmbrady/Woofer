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
      const dogArray = JSON.parse(req.body.dogArray);
      console.log('DOG ARRAY', dogArray);
      db.Dog.create({
        dogName: dogArray[0].dogName,
        age: dogArray[0].age,
        weight: dogArray[0].weight,
        breed: dogArray[0].breed,
        gender: dogArray[0].gender,
        isFixed: dogArray[0].isFixed,
        isUptoDate: dogArray[0].isUptoDate,
        getAlong: dogArray[0].getAlong,
        possessive: dogArray[0].possessive,
        situation: dogArray[0].situation,
        playStyle: dogArray[0].playStyle,
        dogPic: dogArray[0].path,
        UserId: dogArray[0].UserId
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
