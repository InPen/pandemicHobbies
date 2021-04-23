// var editButton = document.getElementsByClassName("edit-button");
var deleteButton = document.getElementsByClassName("delete-button");
// console.log(Array.from(deleteButton));
//
// Array.from(editButton).addEventListener.forEach(function (element) {
//   console.log("this", this);
//   element.addEventListener("click", function () {
//     fetch("/posts", {
//       method: "put",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: "Darth Vadar",
//         quote: "I find your lack of faith disturbing.",
//       }),
//     });
//   });
// });

Array.from(deleteButton).forEach(function (element) {
  console.log("this", this);
  element.addEventListener("click", function () {
    const activityName = this.parentNode.childNodes[3].innerText;
    const body = this.parentNode.childNodes[5].innerText;
    const title = this.parentNode.childNodes[1].innerText;
    console.log(this.parentNode.childNodes);
    fetch("posts", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activityName: activityName,
        body: body,
        title: title,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
