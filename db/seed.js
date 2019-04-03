module.exports = (db) => {
  db.User.create({
    firstName: 'Joe',
    lastName: 'Gates',
    email: 'j@g.co',
    password: process.env.ADMIN_USER_PWD,
    isAdmin: true
  });
  db.User.create({
    firstName: 'Jane',
    lastName: 'Jobs',
    email: 'j@j.co',
    password: process.env.USER_PWD,
    isAdmin: false
  });
  db.User.create({
    firstName: 'Chuck',
    lastName: 'Brady',
    email: 'cb@email.com',
    password: process.env.USER_PWD,
    isAdmin: false,
    userPic: "../public/assets/uploads/tormund.jpeg"
  });
};
