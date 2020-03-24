// ////////////////Rought work//////////////////
// let menuBtn = document.querySelector();
// let navDrawer = document.querySelector(".navigation-drawer");
// let overlay = document.querySelector(".overlay");

// menuBtn.addEventListener("click", () => {
//   console.log("clicked");
//   navDrawer.classList.add("open");
//   overlay.classList.add("on");

//   navDrawer.addEventListener("animationend", () => {
//     navDrawer.classList.add("animated", "fadeOutleft");
//   });
// });

// overlay.addEventListener("click", () => {
//   //overlay.classList.remove("on");
//   navDrawer.classList.add("animated", "fadeOutleft");
// });

let AccountControler = () => {
  // Account code
};

let UIControler = (() => {
  let DOMstrings;

  DOMstrings = {
    menuBtn: ".menu-btn",
    navDrawer: ".navigation-drawer",
    overlay: ".overlay"
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
  };

  return {
    init: () => {
      setUpEventListeners();
    }
  };
})(AccountControler, UIControler);

controler.init();
