let AccountControler = () => {
  // Account code
};

let UIControler = (() => {
  let DOMstrings;

  DOMstrings = {
    menuBtn: ".menu-btn",
    navDrawer: ".navigation-drawer",
    overlay: ".overlay",
    sortActive: ".active",
    sortSelect: ".sort-select",
    sortOptions: ".sort-options",
    searchBox: ".main__filter--search",
    searchToggle: ".sort-search-icon",
    searchField: ".search-field",
    searchIcon: ".search-icon"
  };

  return {
    getDOMstrings: () => {
      return DOMstrings;
    }
  };
})();

let controler = ((Actctrl, UIctrl) => {
  let setUpEventListeners = () => {
    //Navigation drawer function
    let sortActive,
      sortOptions,
      searchToggle,
      searchBox,
      searchField,
      searchIcon;
    let DOM = UIctrl.getDOMstrings();

    document.querySelector(DOM.menuBtn).addEventListener("click", () => {
      document.querySelector(DOM.navDrawer).classList.add("open");
      document
        .querySelector(DOM.overlay)
        .classList.add("on", "animate", "fadeIn");

      setTimeout(() => {
        document
          .querySelector(DOM.overlay)
          .classList.remove("animate", "fadeIn");
      }, 500);
    });

    //Remove the nav drawer
    document.querySelector(DOM.overlay).addEventListener("click", () => {
      document.querySelector(DOM.overlay).classList.add("animate", "fadeOut");
      document.querySelector(DOM.navDrawer).classList.remove("open");
      setTimeout(() => {
        document.querySelector(DOM.overlay).classList.remove("on");
        document
          .querySelector(DOM.overlay)
          .classList.remove("animate", "fadeOut");
      }, 1000);
    });

    //sort dropdown
    sortActive = document.querySelector(DOM.sortActive);
    sortSelect = document.querySelector(DOM.sortSelect);
    sortOptions = document.querySelectorAll(DOM.sortOptions);

    sortActive.addEventListener("click", () => {
      sortSelect.style.visibility = "visible";
    });

    // selecting an option
    Array.from(sortOptions).forEach(option => {
      option.addEventListener("click", e => {
        sortActive.innerHTML = e.target.id;
        sortSelect.style.visibility = "hidden";
      });
    });

    //display search on mobile
    searchBox = document.querySelector(DOM.searchBox);
    searchToggle = document.querySelector(DOM.searchToggle);
    searchToggle.addEventListener("click", () => {
      AddRemoveClass(searchBox, "toggle", "open");
    });

    // search focus animation
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
  };

  //Function Add or remove class
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

  return {
    init: () => {
      setUpEventListeners();
    }
  };
})(AccountControler, UIControler);

controler.init();
