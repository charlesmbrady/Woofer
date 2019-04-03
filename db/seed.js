module.exports = (db) => {
  db.User.create({
    firstName: 'Joe',
    lastName: 'Gates',
    email: 'j@g.co',
    password: process.env.ADMIN_USER_PWD,
    userPic: 'public/assets/uploads/download.jpeg',
    isAdmin: true
  });
  db.User.create({
    firstName: 'Chuck',
    lastName: 'Brady',
    email: 'cb@email.com',
    password: process.env.USER_PWD,
    isAdmin: false,
    userPic: "public/assets/uploads/tormund.jpeg"
  });
  db.User.bulkCreate([
    {
    firstName: 'Jane',
    lastName: 'Jobs',
    email: 'j@j.co',
    password: process.env.USER_PWD,
    userPic: 'public/assets/uploads/ChiaraGrabmayr-300x300.jpg',
    isAdmin: false
  },
  {
    firstName: 'Karen',
    lastName: 'Filapelli',
    email: 'k@k.co',
    password: process.env.USER_PWD,
    userPic: 'public/assets/uploads/ee4b0b7b4ae168e78104b6459d5b00f0.jpeg',
    isAdmin: false
  },
  {
    firstName: 'Steven',
    lastName: 'Stevenson',
    email: 's@s.co',
    password: process.env.USER_PWD,
    userPic: 'public/assets/uploads/tormund.jpeg',
    isAdmin: false
  },
  {
    firstName: 'Mike',
    lastName: 'Mikerson',
    email: 'm@m.co',
    password: process.env.USER_PWD,
    userPic: 'public/assets/uploads/trumptwitter-300x300.jpg',
    isAdmin: false
  },
  {
    firstName: 'Bob',
    lastName: 'Bobbie',
    email: 'b@b.co',
    password: process.env.USER_PWD,
    userPic: 'public/assets/uploads/6145884_orig.jpg',
    isAdmin: false
  }]);
  db.Dog.bulkCreate([{
    dogName: 'Spot',
    age: '2',
    weight: '19',
    breed: 'Mutt',
    gender: 'male',
    isFixed: 'false',
    isUptoDate: 'true',
    getAlong: 'men',
    possessive: 'food',
    situation: 'hats',
    playStyle: 'wrestling',
    dogPic: 'public/assets/uploads/download (1).jpeg',
    UserId: '1'
  },
  {
    dogName: 'Fido',
    age: '10',
    weight: '60',
    breed: 'lab mix',
    gender: 'male',
    isFixed: 'true',
    isUptoDate: 'true',
    getAlong: 'women',
    possessive: 'water',
    situation: 'fence',
    playStyle: 'tag',
    dogPic: 'public/assets/uploads/images.jpeg',
    UserId: '2'
  },
  {
    dogName: 'Rex',
    age: '3',
    weight: '49',
    breed: 'carolina dog',
    gender: 'male',
    isFixed: 'true',
    isUptoDate: 'true',
    getAlong: 'dogs',
    possessive: 'food',
    situation: 'hats',
    playStyle: 'wrestling',
    dogPic: 'public/assets/uploads/s-l300.jpg',
    UserId: '1'
  },
  {
    dogName: 'Harmony',
    age: '4',
    weight: '50',
    breed: 'Terrier',
    gender: 'female',
    isFixed: 'false',
    isUptoDate: 'true',
    getAlong: 'men',
    possessive: 'food',
    situation: 'hats',
    playStyle: 'boxing',
    dogPic: 'public/assets/uploads/stress-free-300x300.jpg',
    UserId: '3'
  },
  {
    dogName: 'Clara',
    age: '10',
    weight: '20',
    breed: 'Boston Terrier',
    gender: 'female',
    isFixed: 'true',
    isUptoDate: 'true',
    getAlong: 'women',
    possessive: 'water',
    situation: 'leash',
    playStyle: 'tag',
    dogPic: 'public/assets/uploads/HalloweenCostumeSafety_4714_Web-300x300.jpg',
    UserId: '4'
  },
  {
    dogName: 'Woodrow',
    age: '4',
    weight: '60',
    breed: 'Hound',
    gender: 'male',
    isFixed: 'false',
    isUptoDate: 'true',
    getAlong: '',
    possessive: '',
    situation: '',
    playStyle: 'wrestling, boxing',
    dogPic: 'public/assets/uploads/IMG_0170-300x300.jpg',
    UserId: '5'
  },
  {
    dogName: 'Abe',
    age: '2',
    weight: '65',
    breed: 'Mutt',
    gender: 'male',
    isFixed: 'true',
    isUptoDate: 'true',
    getAlong: 'children',
    possessive: 'water',
    situation: '',
    playStyle: 'wrestling',
    dogPic: 'public/assets/uploads/p_101348140-300x300.jpg',
    UserId: '5'
  },
]);
};
