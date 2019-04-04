const router = require('express').Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (db) => {
  // Load register page
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/editprofile');
    } else {
      res.render('register');
    }
  });

  // Load profile page
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        // console.log(user);
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  // Load page to edit profile 
  router.get('/editprofile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        // console.log(user);
        res.render('editprofile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  // Load dashboard page
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load dashboard page
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load dashboard page
  router.get('/survey', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        userInfo: req.session.passport.user
      };
      res.render('survey', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load console page
  router.get('/console', (req, res) => {
    if (req.isAuthenticated()) {
      db.Dog.findAll({ where: { UserId: req.session.passport.user.id } }).then(function (dbDogs) {
        db.Dog.findAll({
          where: {
            UserId: {
              [Op.ne]: req.session.passport.user.id
            } //this is important
          }
        }).then(function(otherDogs){
          const user = {
            user: req.session.passport.user,
            isloggedin: req.isAuthenticated(),
            userImg: req.session.passport.user.userPic.replace("public/", ""),
            dogs: dbDogs,
            matches: otherDogs
          };
          res.render('console', user);
        });
      });


   

    } else {
      res.redirect('/');
    }
  });

  // Load example index page
  router.get('/example', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findAll({}).then(function (dbExamples) {
        res.render('example', {
          msg: 'Welcome!',
          examples: dbExamples
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load example page and pass in an example by id
  router.get('/example/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
        res.render('example-detail', {
          example: dbExample
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Logout
  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  // Render 404 page for any unmatched routes
  router.get('*', function (req, res) {
    res.render('404');
  });

  return router;
};
