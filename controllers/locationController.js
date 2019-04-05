module.exports = function (db) {
  return {
    addNew: (req, res) => {
      db.Location.create({
        whatKind: req.body.whatKind,
        address: req.body.address,
        open: req.body.open,
        close: req.body.close,
        name: req.body.name,
        description: req.body.description
      }).then(result => {
        res.json(result);
      }).catch(err => {
        res.json(err);
      });
    },
    getAll: (req, res) => {
      db.Location.findAll({}).then(result => {
        res.json(result);
      }).catch(err => {
        res.json(err);
      });
    }
  };
};
