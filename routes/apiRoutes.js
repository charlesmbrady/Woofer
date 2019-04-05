const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const multer = require('multer');

// define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/assets/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// checks filetype before storing to db
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// pass storage params for multer
const upload = multer({
  storage: storage,
  limits: 500 * 500 * 5,
  fileFilter: fileFilter
});
module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')(db);
  const DogController = require('../controllers/dogController')(db);
  const LocationController = require('../controllers/locationController')(db);
  const InteractionController = require('../controllers/interactionController')(db);

  // Authentication
  router.post('/register', upload.single('userPic'), AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // App
  router.get('/examples', ensureAuthenticated, AppController.getExamples);
  router.post('/examples', ensureAuthenticated, AppController.createExample);
  router.delete('/examples/:id', ensureAuthenticated, AppController.deleteExample);

  // Dog
  //  router.post('/dog', DogController.add);
  router.post('/dog', ensureAuthenticated, upload.single('dogPic'), DogController.add);
  router.get('/dog', DogController.getDogInfo);
  router.get('/dog/owner', DogController.getAllOwnerDog);
  router.delete('/dog', ensureAuthenticated, DogController.removeDog);

  // interaction
  router.post('/hang', InteractionController.addNew);
  router.put('/hang', InteractionController.updateInt);
  router.get('/hang', InteractionController.getInt);
  router.get('/hang/owner', InteractionController.getByOwner);
  router.get('/hang/dog', InteractionController.getByDog);

  // location
  router.post('/location', LocationController.addNew);
  router.get('/location', LocationController.getAll);

return router;
};
