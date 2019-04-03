$('#add-user').on('click', function (event) {
  event.preventDefault();

  const newAccount = {
    firstName: $('#inputFirst').val().trim(),
    lastName: $('#inputLast').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim()
  };

  if (newAccount.password.length > 0 && newAccount.email.length > 0 && newAccount.password.length > 0 && newAccount.lastName.length > 0 && newAccount.firstName.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/register',
      data: newAccount
    }).then(() => {
      window.location.href = '/console';
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

  if (changeUser.password.length > 0 && changeUser.email.length > 0 && changeUser.password.length > 0 && changeUser.lastName.length > 0 && changeUser.firstName.length > 0) {
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

$('#login-modal').on('click', function (event) {
  event.preventDefault();
  $('#user-info').modal('show');
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


$('#add-dog').on('click', function (e) {
  e.preventDefault();
  const typeDog = $('input[name=type-dog]:checked').val();
  let sex;
  let isNeutered;
  if (typeDog === 'male' || typeDog === 'female') {
    isNeutered = false;
  } else {
    isNeutered = true;
  }
  if (typeDog === 'male' || typeDog === 'neutered male') {
    sex = 'male';
  } else {
    sex = 'female';
  }
  let issueType = $('#issue-type').val().join();
  console.log('ISSUE TYPE', issueType);
  let file = document.getElementById('dog-pic').files[0];
  console.log('FILE', file);
  
  

  // eslint-disable-next-line no-undef
  let dogInfo = new FormData();
  dogInfo.append('dogPic', file);
  let surveyArray = [];
  const surveyResponse = {
    dogName: $('#name').val(),
    age: $('#age').val(),
    weight: $('#weight').val(),
    breed: $('#breed').val(),
    gender: sex,
    isFixed: isNeutered,
    isUptoDate: $('input[name=vaccinated]:checked').val(),
    getAlong: issueType,
    possessive: $('#possessive').val().join(),
    situation: $('#reactive').val().join(),
    playStyle: $('#play-style').val().join(),
    dogPic: file,
    UserId: 1
  };
  console.log('SURVEY RESPONSE', surveyResponse);
  surveyArray.push(surveyResponse);
  dogInfo.append('dogArray', JSON.stringify(surveyArray));
  console.log(dogInfo);
  $('input:radio').attr('checked', false);
  $('option').attr('checked', false);
  $('input:text').val('');
  postDog(dogInfo);

  // console.log(surveyResonse);
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
    }
  });
};

// Map options
function initMap () {
  var location = {
    zoom: 13,
    center: { lat: 35.913200, lng: -79.055847 }
  };

  // New map
  var map = new
  google.maps.Map(document.getElementById('map'), location);

  // Locate nearest dog park
  var request = {
      location: center,
      radius: 32188,
      type: ['dog park']
  };

  var service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);

  function callback (results, status)   {
      if (status === google.maps.places.PlacesServicesStatus.OK)    {
          for (var i = 0; i < results.length; i++)  {
              createMarker(results[i]);
          };
        };
      };

  function createMarker (place)  {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
  };

  // Listen for map click
  google.maps.event.addListener(map, 'click',
    function (event) {
      // Add marker
      addMarker({ coords: event.latlng });
    });

  // Add marker
  // // var marker = new google.maps.Marker({
  // //   position: { lat: 35.893357, lng: -78.848909 },
  // //   maps: map
  // // });

  // // var infoWindow = new google.maps.InfoWindow({
  // //   content: <h1>Morrisville, NC</h1>
  // // });

  // // marker.addListener('click', function () {
  // //   infoWindow.open(map, marker);
  // // });

  addMarker({
    coords: { lat: 35.893357, lng: -78.848909 },
    content: '<h1>Morrisville, NC</h1>'
  });

  // Add marker function
  function addMarker (props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      maps: map,
      content: props.content
    });

      // Check content
    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

        infoWindow.open(map, marker);
      };
    };
  };

initMap();


