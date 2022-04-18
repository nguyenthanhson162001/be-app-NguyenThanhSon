var bodyTable = document.getElementById("body-list-user");
var fetchUserEvent = (url, eventId, limit, page, addListHtmlCb) => {
  fetch(`${url}?eventId=${eventId}&limit=${limit}&page=${page}`, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status) {
        return addListHtmlCb(data);
      }
    })
    .catch((error) => {});
};
var addListHtmlCb = (data) => {
  var i = 1;
  bodyTable.innerHTML = data.result.docs
    .map((e) => {
      return `
      <tr>
        <th scope=" row">${i++}</th>
        <td>${e.lastName}</td>
        <td>${e.firstName}</td>
        <td>${e.email}</td>
        <td><a class="text-danger delete" data-id=${e._id}>delete</a></td>
    </tr>
  `;
    })
    .join(" ");
};

(function loadDataInTable() {
  //  EventId was declared in tag <script> top
  fetchUserEvent(
    "http://localhost:3000/user/list-user",
    eventId,
    5,
    1,
    addListHtmlCb
  );
})();

window.onload = function () {
  (function deleteUser() {
    var deleteList = document.querySelectorAll("#body-list-user .delete");
    deleteList.forEach((e) => {
      e.addEventListener("click", (e) => {
        deleteUserById({ userId: e.target.dataset.id });
      });
    });
  })();
};

const deleteUserById = (data) => {
  if (!confirm("Are you sure ? ") == true) {
    return;
  }
  fetch("http://localhost:3000/user/delete", {
    method: "DELETE", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.status) {
        alert("Delete error");
        return;
      }
      location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
