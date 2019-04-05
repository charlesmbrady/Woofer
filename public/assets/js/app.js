$('#add-user').on('click', function (event) {
  event.preventDefault();
  
  // Need to implement auto-login

  // Redirect new user to console upon registration
  location.href = '/console';

  let file = document.getElementById('userPic').files[0];
  console.log("FILE", file);
  let userInfo = new FormData();
  userInfo.append('userPic', file);
  let userArray = [];
  let newAccount = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };
  userArray.push(newAccount);
  userInfo.append('userArray', JSON.stringify(userArray));
  console.log("USER ARRAY", userArray);
  console.log("New Account", newAccount);
  
$('.profile-picture').on('click', function (event)  {
  event.preventDefault();
  let file = document.getElementById('updatePic').files[0];
  let userInfo = new FormData();
  userInfo.append('userPic', file);
});

  if (newAccount.password.length > 0 
    && newAccount.email.length > 0 
    && newAccount.password.length > 0 
    && newAccount.lastName.length > 0 
    && newAccount.firstName.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/register',
      enctype: 'multipart/form-data',
      data: userInfo,
      processData: false,
      contentType: false,
      cache: false,
      success: function(data) {
        console.log(data);
      window.location.href = '/';
      }
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#create-err-msg').empty('').text('**Please fill out entire form**');
  }
});

$('#update-user').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  // capture All changes
  const changeUser = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };
  $('#err-msg').empty('');
  // $('#change-user-modal').modal('show');
  console.log(changeUser);

  if (changeUser.password.length > 0 
    && changeUser.email.length > 0 
    && changeUser.password.length > 0 
    && changeUser.lastName.length > 0 
    && changeUser.firstName.length > 0) {
    $.ajax({
      type: 'PUT',
      url: `/api/user/${id}`,
      data: changeUser
    }).then((result) => {
      console.log('Updated user:', result);
      // Reload the page to get the updated list
      window.location.href = '/logout';
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#update-err-msg').empty('').text('**Please fill out entire form**');
  }
});

// DELETE   ***************************************************
$('#delete-user').on('click', function (event) {
  event.preventDefault();
  $('#err-msg').empty('');
  $('#delete-user-modal').modal('show');
});

$('#confirm-delete').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  const deleteUser = {
    email: $('#userEmail').val().trim(),
    password: $('#userPassword').val().trim()
  };

  if (deleteUser.email.length > 0 && deleteUser.password.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/user/confirm',
      data: deleteUser
    }).then((result) => {
      if (result) {
        $.ajax(`/api/user/${id}`, {
          type: 'DELETE'
        }).then(() => {
          console.log('Deleted user', deleteUser);
          // Reload the page to get the updated list
          window.location.href = '/logout';
        });
      } else {
        $('#err-msg').empty('').text('Wrong credentials!');
      }
    });
  } else {
    console.log('fill out entire form');
    $('#err-msg').empty('').text('fill out entire form');
  }
});

$('#register').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/register';
});

//open login modal
$('#login-modal').on('click', function (event) {
  console.log('login-modal button clicked');
  event.preventDefault();
  $('#user-info').modal('show');
});

//open interaction modal
$('.interaction-modal').on('click', function (event) {
  console.log("INTERACTION MODAL CLicked");
  event.preventDefault();
  $("dogPic").empty();
  $("ownerPic").empty();
  const dogId = $(this).attr('data-id');
  console.log(dogId);

  $.ajax({
    url: `api/dog/${dogId}`,
    type: 'GET'
  }).then(response => {
    console.log(response);
    const dogImage = $('<img>').attr('src', response.dogPic.replace('public/', ''));
    const userImage = $('<img>').attr('src', response.User.userPic.replace('public/', ''));
    dogImage.addClass('intDogPic');
    dogImage.attr('id', 'dog-pic');
    dogImage.attr("data-id", response.id);
    userImage.addClass('intUserPic');
    userImage.attr('id', 'owner-pic');
    userImage.attr("data-id", response.UserId);
    locationArray.forEach(location => {
      
    });
    $("#dogPic").append(dogImage);
    $("#ownerPic").append(userImage);
    $('#interaction-invite').modal('show');
  });  
});

$('#go-home').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/';
});

$('#login').on('click', function (event) {
  event.preventDefault();

  const user = {
    email: $('#email').val().trim(),
    password: $('#user_password').val().trim()
  };

  $.post('/api/login', user, (result) => {
    // console.log(result);
    if (result.loggedIn) {
      $(document.location).attr('href', '/dashboard');
    } else {
      $('#login-err-msg').empty('').text(result.error);
      $('#user-info').modal('hide');
    }
  });
});

$('#interaction-create').on('click', function (e) {
  const interactionInfo = {
    comment: $('#comment').val().trim(),
    location: $('#location').val().trim(),
    date: $('#date').val(),
    time: $('#time').val(),
    invitedDog: $('#dog-pic').attr('data-id'),
    invitedOwner: $('#owner-pic').attr('data-id'),
    UserId: $('#userBackgroundImage').attr('data-id'),
    LocationId: 1
  };
  console.log(interactionInfo);
  postInteraction(interactionInfo);
  $('#interaction-invite').modal('hide');
});
const postDog = (newDog) => {
  $.ajax({
    type: 'POST',
    url: '/api/dog',
    enctype: 'multipart/form-data',
    data: newDog,
    processData: false,
    contentType: false,
    cache: false,
    success: function (data) {
      console.log(data);
      window.location.href = '/console';
    }
  });
};
const postInteraction = (newInt) => {
  $.ajax({
    type: 'POST',
    url: '/api/hang',
    data: newInt
  }).then(result => {
    console.log(result);
  });
}

var map;
var service;
var infowindow;
var content;
var place;
var myPlaceId;
var myLocation;
var results;

function initialize() {
  var location = new google.maps.LatLng(35.913200, -79.055847);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: location, zoom: 8});

  var request = {
    location: location,
    radius: 50000,
    keyword: [ 'dog park', 'address' ]
    // type: [ 'address' ]
  };
    // contentString = ('<div><strong>' + place.name + '</strong><br>' +
    // 'Place ID: ' + place.place_id + '<br>' +
    // place.formatted_address + '</div>');

    infowindow = new google.maps.InfoWindow();
    // infowindow = new google.maps.InfoWindow(contentString);
    //  ({
    //   content: contentString,
    // }); 
  //  ({ content:'<p style="color:black;">(</p>'});;
  //   service = new google.maps.places.PlacesService(map);
  
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  
  let locationArray = [];

  function callback (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        console.log(results[i]);
        const newPlace = {
          name: results[i].name,
          whatKind: results[i].types[0],
          address: results[i].vicinity
        };
        console.log("NEW PLACE", newPlace)
        locationArray.push(newPlace);
  
      };
      console.log("Location Array", locationArray);
      map.setCenter(results[0].geometry.location);
      addLocations(locationArray);
    };
  };
};
//add location array to db
const addLocations = (locations) => {
  locations.forEach(location => {
    $.post('api/location', location, (result) => {
      console.log(result);
    })
  });
};


function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    placeId: myPlaceId,
    location: myLocation
  });
  
  // myPlaceId = results[0].place_id;
  // myLocation = results[0].geometry.location;

  content = 'place.name' + 'place.formatted_phone_number' + 'place.formatted_address' + 'place.photos'
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name, place.formatted_phone_number, place.formatted_address, place.photos);
    console.log(place.name);
    console.log(place.formatted_phone_number);
    console.log(place.formatted_address);
    console.log(place.photos.array);
    // infowindow.setContent(details.name + "<br />" + details.formatted_address +"<br />" + details.website + "<br />" + details.rating + "<br />" + details.formatted_phone_number);
    infowindow.open(map, this);
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow = new google.maps.InfoWindow;

      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  };

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
  };
};

//____________________________ search buttons/calls _________________//

// $("#dog-search").on("click", function(){
  
// });
const socket = io();
// connected to the server
socket.on('connect', () => {
  console.log(`Connected to server`);
  console.log(socket.id)
});

socket.on('message', (data)=> {
  console.log(data)
  
});