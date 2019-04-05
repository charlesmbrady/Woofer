module.exports = function (db) {
  return {
    addNew: (req, res) => {
      db.Interaction.create({
        comment: req.body.comment,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
        invitedDog: req.body.invitedDog,
        invitedOwner: req.body.invitedOwner,
        UserId: req.body.UserId,
        LocationId: req.body.LocationId
      }).then(result => {
        res.json(result);
      }).catch(err => {
        res.json(err);
      });
    },
    updateInt: (req, res) => {
      let updateArray = Object.keys(req.body);
      let updateObj = {};
      updateObj[updateArray[0]] = req.body.update;
      db.Interaction.update(updateObj,
        {
          where: {
            id: req.body.id
          }
        }).then(result => {
        res.json(result);
      }).catch(err => {
        res.json(err);
      });
    },
    getInt: (req, res) => {
      db.Interaction.findOne({
        where: {
          id: req.body.id
        }
      }).then(result => {
        res.json(result);
      }).catch(err => {
        res.json(err);
      });
    },
    getByOwner: (req, res) => {
      db.Interaction.findAll({
        include: [db.User]
      }).then(result => {
        res.json(result);
      }).catch(err => {
        res.json(err);
      });
    },
    getByDog: (req, res) => {
      db.Interaction.findAll({
        include: [db.Dog]
      }).then(result => {
        res.json(result);
      }).catch(err => {
        res.json(err);
      });
    }
  };
};
