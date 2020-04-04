// Login Validation and styles
//get inputs

let credential = document.querySelector(".credential");
let loginWrapper = document.querySelector(".wrapper-login");
let username = document.querySelector(".username");
let password = document.querySelector(".password");
let loginBtn = document.querySelector(".login-btn");
let loginForm = document.querySelector(".login-form");

// automatic fill in the details
credential.addEventListener("click", () => {
  username.value = "admin";
  password.value = "12345";
  setTimeout(() => {
    username.value = "";
    password.value = "";
  }, 7000);
});

function doubleTap() {
  // Get a reference to an element
  let credentialMain = document.querySelector(".credential-Main");

  // Create a manager to manager the element
  var manager = new Hammer.Manager(credentialMain);

  // Create a recognizer
  var DoubleTap = new Hammer.Tap({
    event: "doubletap",
    taps: 2,
  });

  // Add the recognizer to the manager
  manager.add(DoubleTap);

  // Subscribe to desired event
  manager.on("doubletap", function (e) {
    username.value = "foyafa";
    password.value = "12345";
    setTimeout(() => {
      username.value = "";
      password.value = "";
    }, 7000);
  });
}
doubleTap();

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateLogin()) {
    animate(loginWrapper, "fadeOut");
    setTimeout(() => {
      loginWrapper.classList.add("on");
    }, 1000);

    start();
  }
});

let user = [];

let loggOutBnt = document.querySelector(".user-content-active");
let i = document.querySelector("#loggedIn");
let text = document.querySelector(".sp-loggedIn");
let textB = document.querySelector(".user-content-text");

// logout button
loggOutBnt.addEventListener("click", (e) => {
  location.reload();
  return false;
});

function validateLogin() {
  if (username.value === "") {
    username.style.borderBottomColor = "#db564de8";
    animate(username, "shake");
    setTimeout(() => {
      username.style.borderBottomColor = "transparent";
    }, 1000);
    return false;
  } else if (
    username.value !== "admin" &&
    username.value !== "foyafa" &&
    username.value !== "george"
  ) {
    console.log(username.value);
    username.style.borderBottomColor = "#db564de8";
    animate(username, "shake");
    setTimeout(() => {
      username.style.borderBottomColor = "transparent";
    }, 1000);
    return false;
  } else if (password.value === "" || password.value !== "12345") {
    password.style.borderBottomColor = "#db564de8";
    animate(password, "shake");
    setTimeout(() => {
      password.style.borderBottomColor = "transparent";
    }, 1000);

    return false;
  } else {
    user.push(username.value);
    user.push(password.value);
    if (user[0] === "foyafa") {
      i.classList.add("fas", "fa-user-tie");
      text.textContent = "Logged in as Foyafa";
      textB.textContent = "Foyafa";
    } else if (user[0] === "admin") {
      i.classList.add("fas", "fa-user");
      text.textContent = "Logged in as admin";
      textB.textContent = "Admin";
    } else if (user[0] === "george") {
      i.classList.add("fas", "fa-user-tie");
      text.textContent = "Logged in as Goerge Awolowo";
      textB.textContent = "Goerge Awolowo";
    }
    console.log(user);
    return true;
  }
}

let data = [],
  del;
let start = () => {
  console.log("application has started");

  if (user[0] === "foyafa" && user[1] === "12345") {
    console.log("FOYAFA");
    db.collection("accounts")
      .orderBy("bank")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type === "added") {
            addAccountList(change.doc, ".list");
            data.push(change.doc.data());
            deleteAccount(change.doc);
          }
        });
      });
  } else if (user[0] === "admin" && user[1] === "12345") {
    console.log("TEST");
    db.collection("test")
      .orderBy("bank")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type === "added") {
            addAccountList(change.doc, ".list");
            data.push(change.doc.data());
            deleteAccount(change.doc);
          }
        });
      });
  } else if (user[0] === "george" && user[1] === "12345") {
    console.log("TEST");
    db.collection("account")
      .orderBy("bank")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type === "added") {
            addAccountList(change.doc, ".list");
            data.push(change.doc.data());
            deleteAccount(change.doc);
          }
        });
      });
  }

  let deleteAccount = (doc) => {
    // show delete button
    let li = document.querySelector(".list");
    li.addEventListener("long-press", showDeleteBtn);
    // delete function
    li.addEventListener("click", ctrlDeleteItem);

    //delete animation from UI
    function deleteFromUI(act) {
      if (screen.width < 560) {
        animate(act, "bounceOut");
        setTimeout(() => {
          act.style.display = "none";
        }, 1000);
      } else {
        animate(act, "fadeOutLeft");
        setTimeout(() => {
          act.style.display = "none";
        }, 1000);
      }

      displayAlert("success", "delete successful");
    }
    // deleteAccount

    // delete button function datastructure
    function ctrlDeleteItem(event) {
      let accID, splitID, ID;
      acc = event.target.parentNode.parentNode.parentNode; //  get the li
      accID = event.target.parentNode.parentNode.parentNode.id; // get the id

      if (accID) {
        ID = accID;
        // if user confirms delete

        //delete acc from user interface
        deleteFromUI(acc);
        if (user[0] === "foyafa" && user[1] === "12345") {
          // delete the acc from firebase
          db.collection("accounts").doc(ID).delete();
        } else if (user[0] === "admin" && user[1] === "12345") {
          db.collection("test").doc(ID).delete();
        } else if (user[0] === "george" && user[1] === "12345") {
          db.collection("account").doc(ID).delete();
        }
      }
    }
  };

  //show delete btn function
  function showDeleteBtn(e) {
    let acc, accItem, child;
    acc = e.target.parentNode;
    // console.log(acc);
    if (screen.width < 570) {
      if (acc.classList.contains("main__list-items-acc")) {
        accItem = acc.parentNode;
        child = accItem.childNodes;

        if (accItem.classList.contains("onpress")) {
          accItem.classList.remove("onpress");
          accItem.classList.remove("onpress");
          animate(child[2], "fadeOutRight");
          setTimeout(() => {
            child[2].classList.remove("open");
          }, 1000);
        } else {
          accItem.classList.add("onpress");
          child[2].classList.add("open");
        }
      }
    }
  }
};

//alert Function
let displayAlert = (mode, text) => {
  // get the element
  let alert = document.querySelector(".alert");
  // check if its success or danger
  if (mode === "success") {
    alert.style.backgroundColor = "#24e092e8";
  } else if (mode === "danger") {
    alert.style.backgroundColor = "#db564de8";
  }
  // set the alert message
  alert.textContent = text;
  // give a fadeIn animation and visibility of visible
  alert.classList.add("on");
  animate(alert, "fadeInDown", 3000);

  setTimeout(() => {
    animate(alert, "fadeOut");
    alert.classList.remove("on");
  }, 3500);
};

// document.documentElement.addEventListener("click", () => {
//   displayAlert("success", "hello");
// });
// Update the UI with data from firestore

let addAccountList = (objs, element) => {
  let ID, acc;
  ID = objs.id;
  acc = objs.data();
  let html, newHtml;

  // create HTML string with placeholder text %id%, %bank%, %accName%, %accNumber%
  html =
    '<li  id="%id%" class="main__list-items"><div class="main__list-items-bank"><img src="./assets/%bank%.png" alt="%bank% bank logo"></div><div class="main__list-items-acc"><div class="main__list-items-acc-name">%accName%</div><div class="main__list-items-acc-number">%accNumber%</div></div><span  class="main__list-items-delete delete"><div id="delete-%-id%" class="del"><i  class="fas fa-trash"></i></dev></span></li>';
  //element = DOMstrings.mainList;
  // Replace placeholder text with actual text

  newHtml = html.replace("%id%", ID);
  newHtml = newHtml.replace("%-id%", ID);
  newHtml = newHtml.replace("%bank%", acc.bank);
  newHtml = newHtml.replace("%accName%", acc.accName);
  newHtml = newHtml.replace("%accNumber%", acc.accNumber);

  // Insert the HTML into the DOM
  document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
};
let addSearchAccount = (acc, element) => {
  // create HTML string with placeholder text %id%, %bank%, %accName%, %accNumber%
  html =
    '<li id="account-%id%" class="main__list-items"><div class="main__list-items-bank"><img src="./assets/%bank%.png" alt="%bank% bank logo"></div><div class="main__list-items-acc"><div class="main__list-items-acc-name">%accName%</div><div class="main__list-items-acc-number">%accNumber%</div></div><span  class="main__list-items-delete delete"><div id="delete-%-id%" class="del"><i  class="fas fa-trash"></i></dev></span></li>';
  //element = DOMstrings.mainList;
  // Replace placeholder text with actual text

  newHtml = html.replace("%bank%", acc.bank);
  newHtml = newHtml.replace("%accName%", acc.accName);
  newHtml = newHtml.replace("%accNumber%", acc.accNumber);

  // Insert the HTML into the DOM
  document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
};

// UI Controller
let UIControler = (() => {
  let DOMstrings;

  DOMstrings = {
    main: ".main",
    menuBtn: ".menu-btn",
    navDrawer: ".navigation-drawer",
    overlay: ".overlay",
    searchBox: ".main__filter--search",
    searchField: ".search-field",
    searchIcon: ".search-icon",
    searchResultBox: ".main__search-result",
    searchResult: ".search-result-list",
    mainList: ".list",
    accItems: ".main__list-items",
    deleteBtn: ".del",
    addBtn: ".add-btn",
    form: ".form",
    accItemsAct: ".main__list-items-acc",
    formContainer: ".form-container",
    closeForm: ".close",
    selectBank: ".selected",
    selectOption: ".option-container",
    bankList: ".option",
    bankImage: ".bank",
    accName: ".act-name",
    accNumber: ".act-number",
  };

  return {
    getDOMstrings: () => {
      return DOMstrings;
    },

    removeAccount: (element) => {
      let list = document.querySelector(element);
      list.innerHTML = " ";
    },

    displayError: (input) => {
      let html, newHtml, element;
      html = "<p>Sorry account with name <b>%input%</b> does'nt exist</p>";
      element = DOMstrings.searchResult;
      newHtml = html.replace("%input%", input);
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    getInput: () => {
      return {
        // why is that it giving me undefined....F**K
        bank: document.querySelector(DOMstrings.bankImage).id,
        actName: document.querySelector(DOMstrings.accName).value,
        actNumber: parseInt(document.querySelector(DOMstrings.accNumber)).value,
      };
    },

    clearFields: () => {
      // clear the bank fields
      document.querySelector(DOMstrings.bankImage).src = "./assets/default.png";
      document.querySelector(DOMstrings.selectBank).innerHTML = "Select Bank";

      //clear name fields
      document.querySelector(DOMstrings.accName).value = "";
      //clear number fields
      document.querySelector(DOMstrings.accNumber).value = "";
    },
    test: () => {},
  };
})();

UIControler.test();

let controler = ((UIctrl) => {
  let DOM,
    main,
    searchBox,
    searchField,
    searchIcon,
    searchResultBox,
    searchResult,
    mainList,
    deleteBtn,
    addBtn,
    form,
    accItems,
    accItemsAct,
    formContainer,
    overlay,
    navDrawer,
    closeForm,
    selectBank,
    selectOption,
    bankList,
    bankImage,
    inputBank,
    inputName,
    inputNumber;

  let setUpEventListeners = () => {
    //Navigation drawer function

    DOM = UIctrl.getDOMstrings();

    //add the nav drawer
    document.querySelector(DOM.menuBtn).addEventListener("click", () => {
      document.querySelector(DOM.navDrawer).classList.add("open");
      // adds the overlay with a fadeIn effect
      animated(overlay, "fadeIn", "on");
      overlay.classList.add("on");
    });

    //Remove the nav drawer
    overlay = document.querySelector(DOM.overlay);
    navDrawer = document.querySelector(DOM.navDrawer);

    overlay.addEventListener("click", () => {
      if (navDrawer.className.includes("open")) {
        //removes the overly with a fadeout effect
        animated(overlay, "fadeOut");
        overlay.classList.remove("on");
        navDrawer.classList.remove("open");
      } else {
        return false;
      }
    });

    // search focus animation
    searchBox = document.querySelector(DOM.searchBox);
    searchField = document.querySelector(DOM.searchField);
    searchField.addEventListener("focus", () => {
      AddRemoveClass(searchBox, "add", "focus");
    });
    searchField.addEventListener("focusout", () => {
      AddRemoveClass(searchBox, "remove", "focus");
    });

    searchIcon = document.querySelector(DOM.searchIcon);
    searchIcon.addEventListener("click", () => {
      AddRemoveClass(searchBox, "add", "focus");
    });

    //show delete button
    accItems = Array.from(document.querySelectorAll(DOM.accItems)); // the ul
    accItemsAct = document.querySelectorAll(DOM.accItemsAct); // the li
    deleteBtn = document.querySelectorAll(".del");

    //show form by click the add buttn
    addBtn = document.querySelector(DOM.addBtn);
    closeForm = document.querySelector(DOM.closeForm);
    formContainer = document.querySelector(DOM.formContainer);
    addBtn.addEventListener("click", () => {
      animated(overlay, "fadeIn");
      AddRemoveClass(overlay, "add", "on");
      AddRemoveClass(formContainer, "add", "open");
    });

    // close form
    closeForm.addEventListener("click", () => {
      animated(overlay, "fadeOut");
      AddRemoveClass(overlay, "remove", "on");
      AddRemoveClass(formContainer, "remove", "open");
    });

    //display bank in the form
    selectBank = document.querySelector(DOM.selectBank);
    selectOption = document.querySelector(DOM.selectOption);
    bankList = Array.from(document.querySelectorAll(DOM.bankList));
    bankImage = document.querySelector(DOM.bankImage);

    selectBank.addEventListener("click", () => {
      AddRemoveClass(selectOption, "toggle", "active");
    });
    bankList.forEach((bank) => {
      bank.addEventListener("click", (e) => {
        selectBank.innerHTML = bank.querySelector("label").innerHTML;
        AddRemoveClass(selectOption, "remove", "active");

        //change the logo of the bank to the selected one
        bankImage.src = `./assets/${e.target.id}.png`;
        bankImage.id = e.target.id;
      });
    });

    //on form submit validation
    //get inputs
    inputBank = document.querySelector(DOM.bankImage);
    inputName = document.querySelector(DOM.accName);
    inputNumber = document.querySelector(DOM.accNumber);

    let input;
    form = document.querySelector(DOM.form);
    input = UIctrl.getInput();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(inputNumber.value);
      // validate inputs
      if (ValidateField(inputBank, inputName, inputNumber)) {
        // add account to storaage
        if (user[0] === "foyafa" && user[1] === "12345") {
          db.collection("accounts").add({
            bank: inputBank.id,
            accName: inputName.value,
            accNumber: inputNumber.value,
          });

          //clear fields
          UIctrl.clearFields();
        } else if (user[0] === "admin" && user[1] === "12345") {
          db.collection("test").add({
            bank: inputBank.id,
            accName: inputName.value,
            accNumber: inputNumber.value,
          });

          //clear fields
          UIctrl.clearFields();
        } else if (user[0] === "george" && user[1] === "12345") {
          db.collection("account").add({
            bank: inputBank.id,
            accName: inputName.value,
            accNumber: inputNumber.value,
          });

          //clear fields
          UIctrl.clearFields();
        }
      } else {
        return false;
      }
    });

    //Search function

    searchResultBox = document.querySelector(DOM.searchResultBox);
    searchField = document.querySelector(DOM.searchField);
    // Make the search Result box visible only when user start typing into the search field
    searchField.addEventListener("keyup", (e) => {
      if (e.target.value !== "") {
        AddRemoveClass(searchResultBox, "add", "open");
        AddRemoveClass(searchResultBox, "add", "mtop");
      } else {
        AddRemoveClass(searchResultBox, "remove", "open");
        //clear the search Result
        UIctrl.removeAccount(DOM.searchResult);
      }
    });

    //on button click
    searchIcon.addEventListener("click", () => {
      search();
    });
    // key press Enter
    searchField.addEventListener("keypress", (e) => {
      if (e.keyCode === 13) {
        search();
      }
    });

    //check the search input and return a valid match
    function search() {
      if (searchField.value !== "" && searchField.value.length !== " ") {
        let searchAcc,
          lists = [];

        //return the matched acc
        searchAcc = data;
        searchAcc.forEach((acc) => {
          if (
            acc.accName
              .toLowerCase()
              .includes(searchField.value.toLowerCase().trim())
          ) {
            // adds the matche result to an empty array lists
            lists.push(acc); // line 405
            // removes all child element
            UIctrl.removeAccount(DOM.searchResult);
            lists.forEach((list) => {
              // displays all matching accounts from the array lists
              addSearchAccount(list, DOM.searchResult);
            });
          } else if (lists.length === 0) {
            // removes all child element
            UIctrl.removeAccount(DOM.searchResult);
            // insert the error message
            UIctrl.displayError(searchField.value);
            return false;
          }
        });
      } else {
        displayAlert("danger", "Search must not be empty");
      }
    }
  };

  //Validation and Add account to list
  function ValidateField(bank, name, number) {
    if (bank.id === "default") {
      console.log(bank.id);
      displayAlert("danger", "bank must not be empty");
      return false;
    } else if (name.value === "" || !isNaN(name.value)) {
      console.log(name.value);
      displayAlert("danger", "invalid acc name");
      return false;
    } else if (name.value.length < 5) {
      displayAlert("danger", "acc name too short");
      return false;
    } else if (
      number.value === "" ||
      number.value.length !== 10 ||
      isNaN(number.value)
    ) {
      console.log(number.value);
      displayAlert("danger", "invalide acc number");
      return false;
    } else {
      displayAlert("success", "Account added successfully");
      //close the form
      animated(overlay, "fadeOut");
      AddRemoveClass(overlay, "remove", "on");
      AddRemoveClass(formContainer, "remove", "open");
      return true;
    }
  }

  //Function Add / remove or toggle class
  function AddRemoveClass(element, a, className) {
    if (a === "add") {
      element.classList.add(className);
    } else if (a === "remove") {
      element.classList.remove(className);
    } else if (a === "toggle") {
      element.classList.toggle(className);
    } else {
      return false;
    }
  }

  // Add and remove animation
  function animated(element, animation) {
    // add the class animate and the animation
    AddRemoveClass(element, "add", "animated");
    AddRemoveClass(element, "add", animation);
    // remove the class animate and the animation thereby ending it
    setTimeout(() => {
      AddRemoveClass(element, "remove", "animated");
      AddRemoveClass(element, "remove", animation);
    }, 2000);
  }
  // a wait function for 1sec to remove/add/turn visibility/turn off visiblity/display none /display block
  function wait(element, a, className) {
    setTimeout(() => {
      switch (a) {
        case "add":
          return AddRemoveClass(element, "add", className);
          break;
        case "remove":
          return AddRemoveClass(element, "remove", className);
          break;
        case "vOn":
          return (element.style.visibility = "visible");
          break;
        case "vOff":
          return (element.style.visibility = "hidden");
          break;
        case "dshow":
          return (element.style.display = className);
          break;
        case "dnone":
          return (element.style.display = "none");
          break;

        default:
          return false;
          break;
      }
    }, 1000);
  }
  return {
    init: () => {
      setUpEventListeners();
    },
  };
})(UIControler);

function animate(element, animation, time = 2000) {
  // add the class animate and the animation
  element.classList.add("animated");
  element.classList.add(animation);

  // remove the class animate and the animation thereby ending it
  setTimeout(() => {
    element.classList.remove("animated");
    element.classList.remove(animation);
  }, time);
}
controler.init();
