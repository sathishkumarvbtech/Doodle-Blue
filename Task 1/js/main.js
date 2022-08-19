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
  const data = new FormData(e.target);
  const user = Object.fromEntries(data.entries());
  addUser(user);
  
});


// Call funtion for add user
function addUser(user) {
  users.push(user);
  appendToUsrTable(user);
  form.document.querySelectorAll("input").value="";
}

// Edit user values
function editUser(id) {
  console.log("Edit")
  users.forEach(function (user, i) {
    if (user.id == id) {
      document.querySelector(".modal-body").append(`
                <form id="updateUser" action="">
                    <label for="username">Name</label>
                    <input class="form-control" type="text" name="username" value="${user.username}"/>
                    <label for="email">Email</label>
                    <input class="form-control" type="text" name="email" value="${user.email}"/>
                    <label for="company">Company</label>
                    <input class="form-control" type="text" name="company" value="${user.company}"/>
                    <label for="age">Age</label>
                    <input class="form-control" type="number" name="age" value="${user.age}" min=10 max=100/>
            `);
      document.querySelector(".modal-footer").append(`
                    <button type="button" type="submit" class="btn btn-primary" onClick="updateUser(${id})">Save changes</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </form>
            `);
    }
  });
}


// Edit user values in call function
function updateUser(id) {
  let msg = "User updated successfully!";
  let user = {};
  user.id = id;
  users.forEach(function (user, i) {
    if (user.id == id) {
      document.getElementById("updateUser").children("input").forEach(function () {
        let value = this.value;
        let attr = this.attr("name");
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
      document.querySelector("#userTable #user-" + user.id).children(".userData").forEach(function () {
        let attr = this.attr("name");
        if (attr == "name") {
          this.innerText = user.name;
        } else if (attr == "address") {
          this.innerText = user.address;
        } else {
          this.innerText = user.age;
        }
      });
      document.getElementByClassName("modal").modal("toggle");
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