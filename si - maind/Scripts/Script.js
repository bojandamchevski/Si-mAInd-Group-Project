let elements = {
  date: (document.getElementById("date").innerHTML = new Date().getFullYear()),
  navToggle: document.querySelector(".nav-toggle"),
  linksContainer: document.querySelector(".links-container"),
  links: document.querySelector(".links"),
  navbar: document.getElementById("nav"),
  topLink: document.querySelector(".top-link"),
  scrollLinks: document.querySelectorAll(".scroll-link"),
  form: document.getElementById("form"),
  fullName: document.getElementById("full-name"),
  email: document.getElementById("email"),
  subject: document.getElementById("subject"),
  message: document.getElementById("message"),
  submit: document.getElementById("btn-contact-submit"),
  boxSubmit: document.getElementById("boxForSubmit"),
  firstButtonMilaAI: document.getElementById("firstBtn"),
  secondButtonMiilaAI: document.getElementById("secondBtn"),
};

let eventListeners = {
  navToggleListener: elements.navToggle.addEventListener("click", function () {
    const linksHeight = elements.links.getBoundingClientRect().height;
    const containerHeight =
      elements.linksContainer.getBoundingClientRect().height;
    if (containerHeight === 0) {
      elements.linksContainer.style.height = `${linksHeight}px`;
    } else {
      elements.linksContainer.style.height = 0;
    }
  }),
  windowListener: window.addEventListener("scroll", function () {
    const scrollHeight = window.pageYOffset;
    const navHeight = elements.navbar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
      elements.navbar.classList.add("fixed-nav");
    } else {
      elements.navbar.classList.remove("fixed-nav");
    }

    if (scrollHeight > 500) {
      elements.topLink.classList.add("show-link");
    } else {
      elements.topLink.classList.remove("show-link");
    }
  }),
  scrollLinksListener: elements.scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.currentTarget.getAttribute("href").slice(1);
      const element = document.getElementById(id);
      const navHeight = elements.navbar.getBoundingClientRect().height;
      const containerHeight =
        elements.linksContainer.getBoundingClientRect().height;
      const fixedNav = elements.navbar.classList.contains("fixed-nav");
      let position = element.offsetTop - navHeight;
      if (!fixedNav) {
        position = position - navHeight;
      }
      if (navHeight > 132) {
        position = position + containerHeight;
      }
      window.scrollTo({
        left: 0,
        top: position,
      });
      elements.linksContainer.style.height = 0;
    });
  }),
  firstButtonMilaAiListener: elements.firstButtonMilaAI.addEventListener(
    "click",
    function () {
      window.open("https://si-maind.com/wp-content/uploads/Mila_AI_WP.pdf");
    }
  ),
  secondButtonMilaAiListener: elements.secondButtonMiilaAI.addEventListener(
    "click",
    function () {
      window.open("https://si-maind.com/wp-content/uploads/Si-mAindWP.pdf");
    }
  ),
  preloaderListener: window.addEventListener("load", function () {
    document.querySelector("body").classList.add("loaded");
  }),
};

let checkHelpers = {
  checkInputs: () => {
    const fullNameValue = elements.fullName.value.trim();
    const emailValue = elements.email.value.trim();
    const subjectValue = elements.subject.value.trim();
    const messageValue = elements.message.value.trim();
    if (!checkHelpers.checkForNumbers(fullNameValue)) {
      successOrErrorInput.setErrorForInput(
        elements.fullName,
        "You can't enter numbers"
      );
    } else if (fullNameValue === "") {
      successOrErrorInput.setErrorForInput(
        elements.fullName,
        "Fullname is required"
      );
    } else if (fullNameValue.length < 3) {
      successOrErrorInput.setErrorForInput(
        elements.fullName,
        "You must enter more than 2 characters"
      );
    } else {
      successOrErrorInput.setSuccessFor(elements.fullName);
    }
    if (emailValue === "") {
      successOrErrorInput.setErrorForInput(elements.email, "Email is required");
    } else if (!checkHelpers.isEmail(emailValue)) {
      successOrErrorInput.setErrorForInput(elements.email, "Invalid Email");
    } else {
      successOrErrorInput.setSuccessFor(elements.email);
    }
    if (subjectValue === "") {
      successOrErrorInput.setErrorForInput(
        elements.subject,
        "Subject is required"
      );
    } else {
      successOrErrorInput.setSuccessFor(elements.subject);
    }
    if (messageValue === "") {
      successOrErrorInput.setErrorForInput(
        elements.message,
        "Message is required"
      );
    } else {
      successOrErrorInput.setSuccessFor(elements.message);
    }
    if (
      checkHelpers.checkForNumbers(fullNameValue) &&
      fullNameValue.length > 2 &&
      emailValue !== "" &&
      checkHelpers.isEmail(emailValue) &&
      subjectValue !== "" &&
      messageValue !== ""
    ) {
      elements.submit.classList.add("display");
      const thankYou = document.createElement("p");
      thankYou.innerText = `Thanks for contacting us ${fullNameValue}! We will be in touch with you shortly.`;
      thankYou.style.textTransform = "none";
      elements.boxSubmit.appendChild(thankYou);
      thankYou.style.color = "Green";
    }
  },
  checkForNumbers: (input) => {
    for (let i = 0; i < input.length; i++) {
      if (!isNaN(input[i])) {
        return false;
      }
    }
    return true;
  },
  isEmail: (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  },
};

let successOrErrorInput = {
  setErrorForInput: (input, errorMessage) => {
    const inputBox = input.parentElement;
    let small = inputBox.querySelector("small");
    const check = inputBox.querySelector(".check");
    let exclamationCircle = check.querySelector(".fa-exclamation-circle");
    small.innerText = errorMessage;
    input.classList.add("error");
    small.classList.remove("visibility");
    exclamationCircle.classList.remove("visibility");
  },
  setSuccessFor: (input) => {
    const inputBox = input.parentElement;
    const check = inputBox.querySelector(".check");
    let small = inputBox.querySelector("small");
    let exclamationCircle = check.querySelector(".fa-exclamation-circle");
    small.classList.add("visibility");
    exclamationCircle.classList.add("visibility");
    input.classList.add("success");
    input.classList.remove("error");
    input.classList.add("pointer");
    const checkCircle = check.querySelector(".fa-check-circle");
    checkCircle.classList.remove("visibility");
  },
};

elements.submit.addEventListener("click", (e) => {
  e.preventDefault();
  checkHelpers.checkInputs();
});
