window.onload = function () {
  let monsterslimit = 50;
  let pageLimit = 1;

  
  const createMonsterList = () => {
      fetch(
          `http://localhost:3000/monsters/?_limit=${monsterslimit}&_page=${pageLimit}`
          )
          .then((respone) => respone.json())
          .then((data) => {
          const monsterDiv = document.createElement("div");
          monsterDiv.setAttribute("id", "monster-list");
          const monstCont = document.getElementById("monster-container");
          monstCont.appendChild(monsterDiv);
        // console.log(data);
        data.map((monster) => {
          // console.log(monster);
          monsterDiv.innerHTML += `
                  <h2>${monster.name}</h2>
                  <h4> Age: ${monster.age} </h4>
                  <p>${monster.description} </p>
                  `;
        });
        return monsterDiv;
      });
  };
  createMonsterList();

  //Next Page Button
  const forwardBtn = document.getElementById("forward");
  forwardBtn.addEventListener("click", (e) => {
    console.log("click");
    e.preventDefault();
    document.querySelector("#monster-list").remove();
    pageLimit++;
    console.log(pageLimit);
    console.log(createMonsterList());
  });

  //Previous Page button
  const previousBtn = document.querySelector("#back");
  previousBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#monster-list").remove();
    pageLimit--;
    createMonsterList();
  });

  //create Monster Form
  const createMons = document.getElementById("create-monster");
  const formMons = document.createElement("form");
  formMons.setAttribute("id", "monster-form");
  createMons.appendChild(formMons);

  formMons.innerHTML = `<input id="name" placeholder="name..." />`;
  formMons.innerHTML += `<input id="age" placeholder="age..." />`;
  formMons.innerHTML += `<input id="description" placeholder="description..." />`;
  formMons.innerHTML += `<button id="submit"> Create </button>`;

  const submitBtn = document.getElementById("submit");
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const nameInp = document.getElementById("name");
    const ageInp = document.getElementById("age");
    const descInp = document.getElementById("description");
    console.log(nameInp.value);

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: nameInp.value,
        age: ageInp.value,
        description: descInp.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });
};
