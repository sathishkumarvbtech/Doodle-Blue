var Addbutton = document.querySelector("#add-button");
var form = document.querySelector(".form");
var contactLists = document.querySelector(".contacts");
var close = document.querySelector(".close");

// Display for form div
Addbutton.addEventListener('click', () => {
  form.classList.toggle("show")
})
// Hide for form div
close.addEventListener('click', () => {
  form.classList.remove("show")
})

// Custom Users list
var users = [
  {
    id: 1,
    username: "Ramesh",
    email: "ramesh1429@gmail.com",
    company: "ABC",
    age: 19,
    phone: 9038736764
  },
  {
    id: 2,
    username: "Surya",
    email: "surya200@gmail.com",
    company: "ABC",
    age: 22,
    phone: 9938736764
  }
];


// Append User list in table
function appendToUsrTable(user, i) {
  document.querySelector("#userTable > tbody:last-child").insertAdjacentHTML("beforeend", `
              <tr id="user-${user.id}">
                  <td class="userData" name="name">${user.username}</td>
                  <td class="userData" name="email">${user.email}</td>
                  <td  class="userData" name="company">${user.company}</td>
                  <td  class="userData" name="age">${user.age}</td>
                  <td align="center">
                <button class="btn btn-success form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
                  </td>

            <td align="center">
                <button class="btn btn-danger form-control" onClick="deleteUser(${user.id})">DELETE</button>
            </td>
            </tr>`)
}



// Assign User list in table
users.forEach((user, i) => {
  appendToUsrTable(user, i)
});


// form validation
document.querySelector("form").addEventListener('submit', (e) => {
  e.preventDefault();
});

// Form Validation values append users
document.querySelector("form#formvalue").addEventListener('submit', (e) => {
  var user = {};
  var nameInput = document.querySelector('input[name="username"]').value.trim();
  var emailInput = document.querySelector('input[name="email"]').value.trim();
  var companyInput = document.querySelector('input[name="company"]').value.trim();
  var ageInput = document.querySelector('input[name="age"]').value.trim();
  if (nameInput && emailInput  && companyInput && ageInput) {
    $(this).serializeArray().map(function (data) {
      user[data.name] = data.value;
    });
    var lastUser = users[Object.keys(users).sort().pop()];
    user.id = lastUser.id + 1;

    addUser(user);
    console.log(nameInput)

  } else {
    alert("All fields must have a valid value.");
  }
});

// Call funtion for add user
function addUser(user) {
  users.push(user);
  appendToUsrTable(user);
}

// Edit user values
function editUser(id) {
  console.log("Hiii")
  users.forEach(function (user, i) {
    if (user.id == id) {
      $(".modal-body").empty().append(`
                  <form action="#" id="updateUser">
                <div class="row justify-center">
                    <div class="col-md-5 col-sm-12 my-4">
                        <input type="text" name="username" class="form-control" placeholder="Name" required>
                    </div>
                    <div class="col-md-5 col-sm-12 my-4">
                        <input type="email" name="email" class="form-control" placeholder="Email" required>
                    </div>
                    <div class="col-md-5 col-sm-12 my-4">
                        <input type="text" name="phone" class="form-control" placeholder="Phone" required>
                    </div>
                    <div class="col-md-5 col-sm-12 my-4">
                        <input type="text" name="company" class="form-control" placeholder="Company Name" required>
                    </div>
                    <div class="col-md-5 col-sm-12 my-4">
                        <input type="number" name="age" class="form-control" placeholder="Age" required>
                    </div>

                    <div class="col-md-12 my-4 text-center">
                        <input type="submit" class="btn btn-success" id="submit-btn">
                    </div>
                </div>
              `);
      $(".modal-footer").empty().append(`
                      <button type="button" type="submit" class="btn btn-primary" onClick="updateUser(${id})">Save changes</button>
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </form>
              `);
    }
  });
}


// Edit user values in call function
function updateUser(id) {
  var msg = "User updated successfully!";
  var user = {};
  user.id = id;
  users.forEach(function (user, i) {
    if (user.id == id) {
      $("#updateUser").children("input").each(function () {
        var value = $(this).val();
        var attr = $(this).attr("name");
        if (attr == "name") {
          user.name = value;
        } else if (attr == "address") {
          user.address = value;
        } else if (attr == "age") {
          user.age = value;
        }
      });
      users.splice(i, 1);
      users.splice(user.id - 1, 0, user);
      $("#userTable #user-" + user.id).children(".userData").each(function () {
        var attr = $(this).attr("name");
        if (attr == "name") {
          $(this).text(user.name);
        } else if (attr == "address") {
          $(this).text(user.address);
        } else {
          $(this).text(user.age);
        }
      });
      $(".modal").modal("toggle");
      flashMessage(msg);
    }
  });
}

// Delete user for contact list
function deleteUser(id) {
  var action = confirm("Are you sure you want to delete this user?");
  var msg = "User deleted successfully!";
  users.forEach(function (user, i) {
    if (user.id == id && action != false) {
      users.splice(i, 1);
      $("#userTable #user-" + user.id).remove();
      flashMessage(msg);
    }
  });
}