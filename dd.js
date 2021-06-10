"use strict";

//Form Data
const form = document.forms[0];
const form2 = document.forms[1];

// console.log(form);
// console.log(form2);

const storagedata = [];

form.addEventListener("submit", edittask);
form2.addEventListener("submit2", edittask);

function edittask(event) {
  event.preventDefault();
  //   getLocalStorage();

  const dataArr = [...new FormData(this)];
  console.log(dataArr);

  const data = Object.fromEntries(dataArr);
  console.log(data);
  // console.log(data.title);

  const tasklist = document.getElementById("task").value;

  let today = new Date();
  let time = today.toLocaleString([], { hour12: true });
  console.log(typeof time);

  if (data.priority == undefined) {
    data.priority = false;
  }
  console.log(data.priority);

  const task = {
    title: data.title,
    description: data.description,
    color: data.color,
    date: time,
    tasklist: tasklist,
    priority: data.priority,
  };

  storagedata.push(task);
  // console.log(storagedata);
  // console.log(task.tasklist);

  console.log(task);

  setLocalStorage();

  if (task.tasklist == "divc1") {
    const formdata = document.querySelector("#divc1");
    console.log("formdata :", formdata);
    render(task, formdata);
  } else if (task.tasklist == "divc2") {
    const formdata = document.querySelector("#divc2");
    render(task, formdata);
  } else if (task.tasklist == "divc3") {
    const formdata = document.querySelector("#divc3");
    render(task, formdata);
  } else {
    console.log("fail");
  }

  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  document.getElementById("titleL").value = document.getElementById(
    "descriptionL"
  ).value = "";
}

function render(task, divclass) {
  const mark = `
        <div onclick="editdiv()" class="card" draggable="true" ondragstart="drag(event)" 
        data-id="${task.title}" 
        style="border: 2px solid ${task.color};
            border-left: 6px solid ${task.color};
            background-color:${task.priority == "true" ? "#f5a1a1" : "white"}">
            <p class="datedata">${task.date}</p>
            <h3>${task.title}</h3>
            <h1>${task.description}</h1>
        </div>`;

  if (task.priority == "true") {
    divclass.insertAdjacentHTML("beforebegin", mark);
  } else {
    divclass.insertAdjacentHTML("beforeend", mark);
  }
}

function setLocalStorage() {
  localStorage.setItem("storagedata", JSON.stringify(storagedata));
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("storagedata"));
  //   console.log(data);

  if (!data) return;

  data.forEach((work) => {
    storagedata.push(work);

    if (work.tasklist == "divc1") {
      const formdata = document.querySelector("#divc1");
      render(work, formdata);
    } else if (work.tasklist == "divc2") {
      const formdata = document.querySelector("#divc2");
      render(work, formdata);
    } else if (work.tasklist == "divc3") {
      const formdata = document.querySelector("#divc3");
      render(work, formdata);
    }
  });
}

/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//Modal Window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnOpenModal = document.querySelector(".show-modal");
const btnCloseModal = document.querySelector(".close-modal");

const modalCard = document.querySelector(".modalCard");
const overlayCard = document.querySelector(".overlayCard");
const btnCloseCard = document.querySelector(".closeCard-modal");

function editdiv() {
  const btnOpenCard = document.querySelector(".card");
  btnOpenCard.addEventListener("click", function () {
    modalCard.classList.remove("hidden");
    overlayCard.classList.remove("hidden");
  });
}

btnOpenModal.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

btnCloseModal.addEventListener("click", function () {
  console.log("Button closed");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

btnCloseCard.addEventListener("click", function () {
  console.log("Button closed");
  modalCard.classList.add("hidden");
  overlayCard.classList.add("hidden");
});

overlay.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

overlayCard.addEventListener("click", function () {
  modalCard.classList.add("hidden");
  overlayCard.classList.add("hidden");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalCard.classList.contains("hidden")) {
    modalCard.classList.add("hidden");
    overlayCard.classList.add("hidden");
  }
});
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
// drag and drop js
const dragStart = (target) => {
  target.classList.add("dragging");
  // console.log('dragStart');
};

const dragEnd = (target) => {
  target.classList.remove("dragging");
  // console.log('dragEnd');
};

const dragEnter = (event) => {
  // console.log('dragEnter');
  event.currentTarget.classList.add("drop");
  // divcount();
};

const dragLeave = (event) => {
  // console.log('dragLeave');
  event.currentTarget.classList.remove("drop");
  // divcount(-1);
};

const drag = (event) => {
  event.dataTransfer.setData("text/html", event.currentTarget.outerHTML);
  event.dataTransfer.setData("text/plain", event.currentTarget.dataset.id);
};

const drop = (event) => {
  // alert('id');
  document
    .querySelectorAll(".column")
    .forEach((column) => column.classList.remove("drop"));
  document
    .querySelector(`[data-id="${event.dataTransfer.getData("text/plain")}"]`)
    .remove();

  const id = `${event.dataTransfer.getData("text/plain")}`;
  console.log("card-id:", id);
  // console.log(event.target);

  const dropid = event.target.lastElementChild.id;
  console.log("dropid:", dropid);

  storagedata.forEach((arrow, i) => {
    console.log("arrow", arrow);

    if (id == arrow.title) {
      storagedata.splice(i, 1);

      let dropdata = {
        title: arrow.title,
        description: arrow.description,
        color: arrow.color,
        date: arrow.date,
        tasklist: arrow.tasklist,
        priority: arrow.priority,
      };
      dropdata.tasklist = dropid;
      console.log(dropdata);

      // console.log("splice-i",i);
      storagedata.push(dropdata);

      // console.log(storagedata);
      setLocalStorage();
    }
  });

  event.preventDefault();
  event.currentTarget.innerHTML =
    event.currentTarget.innerHTML + event.dataTransfer.getData("text/html");
  // console.log('drop');
};

const allowDrop = (event) => {
  event.preventDefault();
  // console.log('allowDrop');
};

document.querySelectorAll(".column").forEach((column) => {
  column.addEventListener("dragenter", dragEnter);
  column.addEventListener("dragleave", dragLeave);
  // console.log('---column');
});

document.addEventListener("dragstart", (e) => {
  if (e.target.className.includes("card")) {
    dragStart(e.target);
  }
  // console.log('---dragstart');
});

document.addEventListener("dragend", (e) => {
  if (e.target.className.includes("card")) {
    dragEnd(e.target);
    // console.log('---dragend');
  }
});
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////

function init() {
  getLocalStorage();
}
init();

/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//Reset Localstorage
function resetdata() {
  localStorage.clear(storagedata);
  window.location.reload();
}
/////////////////////////////////////////////////////////////////////////
