const charactersAPI = new APIHandler("http://localhost:8000");

window.addEventListener("load", () => {
  //SEARCH ALL AND PRINT
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      charactersAPI
        .getFullList()

        .then((response) => {
          console.log(response);
          let text = "";
          response.data.forEach(
            (elem) =>
              (text += `
          <div class="characters-container">
          <div class="character-info">
          <div class="name">${elem.name}</div>
          <div class="occupation">${elem.occupation}</div>
          <div class="cartoon">${elem.cartoon}</div>
          <div class="weapon">${elem.weapon}</div>
          </div>
          </div>`)
          );
          document.querySelector(".character-info").innerHTML = text;
        });
    });

  //SEARCH BY ID AND PRINT

  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      const id = parseInt(document.querySelector("#id-character").value);

      charactersAPI
        .getOneRegister(id)

        .then((elem) => {
          printCharacter(elem);
        });
    });

  //DELETE
  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      const id = parseInt(document.querySelector("#id-delete").value);

      charactersAPI
        .deleteOneRegister(id)

        .then((elem) => {
          if (elem.data) {
            console.log(elem);
            document.getElementById("delete-one").classList.add("true");
          } else {
            console.log(elem);
            document.getElementById("delete-one").classList.add("false");
          }
        });
    });

  //EDIT
  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {
      const inputs = document.querySelectorAll("#edit-character-form input");
      const id = inputs[0].value;

      let minion = {};

      minion.name = inputs[1].value;
      minion.occupation = inputs[2].value;
      minion.weapon = inputs[3].value;
      minion.cartoon = inputs[4].value == "on" ? true : false;

      charactersAPI.updateOneRegister(id, minion);
    });

  //NEW CHARACTER
  document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {
      const inputs = document.querySelectorAll("#new-character-form input");

      let minion = {};
      minion.name = inputs[0].value;
      minion.occupation = inputs[1].value;
      minion.weapon = inputs[2].value;
      minion.cartoon = inputs[3].value == "on" ? true : false;

      charactersAPI.createOneRegister(minion).then(() => {
        document.querySelector("#new-character").reset();
      });
    });
});

//PRINT BY ID
function printCharacter(elem) {
  const inputs = document.querySelectorAll(".character-info div");

  inputs[0].innerText = elem.data.name;
  inputs[1].innerText = elem.data.occupation;
  inputs[2].innerText = elem.data.cartoon;
  inputs[3].innerText = elem.data.weapon;
}
