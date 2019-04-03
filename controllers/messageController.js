module.exports = function (db) {
    return {
        getMessages: (req, res) => {
            db.Message.findAll({
                include: [db.User]
            }).then(result => {
                res.json(result);
            }).catch(err => {
                res.json(err);
            });
        },
        addMessage: (req, res) => {
            db.Message.create(req.body).then(result => {
                res.json(result);
            }).catch(err => {
                res.json(err);
            })
        }
    }
}