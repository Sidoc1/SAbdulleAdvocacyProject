let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {

  // Write your code to manipulate the DOM here
  document.body.classList.toggle("dark-mode");

}
themeButton.addEventListener("click", toggleDarkMode);

let signNowButton = document.getElementById("sign-now-button");
const addSignature = (person) => {
  /*let name = document.getElementById("name").value;
  let hometown = document.getElementById("hometown").value;
  let signature = document.createElement("p");
  signature.textContent = `Name: ${name}, Hometown: ${hometown}`;
  */
  let signature = document.createElement("p");
  let signaturesSections = document.getElementsByClassName("signatures");
  
  for (let i = 0; i < signaturesSections.length; i++) {
    let signature = document.createElement("p");
    signature.textContent = `🖊️ ${person.name} from ${person.hometown}  supports this.`;
    signaturesSections[i].appendChild(signature);

  }

  let oldCountElement = document.getElementById("counter");
  oldCountElement.remove();
  count = count + 1;
  let mew = document.createElement("p");
  mew.id = "counter";
  mew.textContent = "🖊️ " + count + " people have signed this petition and support this cause.";
  signaturesSections[0].appendChild(mew);



}
const validateForm = () => {

  let containsErrors = false;

  let petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  }
  // TODO: Loop through all inputs
  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }

  }

  const email = document.getElementById('email');
  if (!email.value.includes('.com')) {
    containsErrors = true;
    email.classList.add('error');
  }
  else {
    email.classList.remove('error');
  }

  // TODO: Validate the value of each input
  if (containsErrors == false) {
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
  // TODO: Call addSignature() and clear fields if no errors
  

}

let revealableContainers = document.querySelectorAll(".revealable");

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let reveal = () => {
  let windowHeight = window.innerHeight;

  for (let i = 0; i < revealableContainers.length; i++) {
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
      // Adds the 'active' class to the current revealableContainer's class list
    } else {
      revealableContainers[i].classList.remove('active');
      // Removes the 'active' class from the current revealableContainer's class list
    }
  }
};
let motionButton = document.getElementById('ReduceM');
let reduceMotion = () => {

  document.body.style.scrollBehavior = 'auto';
  animation.revealDistance = 0;
  animation.transitionDelay = '0s';
  animation.transitionDuration = '0s';

  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionDelay = animation.transitionDelay;
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
  }
  
};

let toggleModal = (person) => {
  intervalId = setInterval(scaleImage, 500);
  let modal = document.getElementById('thanks-modal');
  let modalContent = document.getElementById('thanks-modal-content'); // Corrected ID here
  modal.style.display = "flex";
  modalContent.innerHTML =`<p>Thank you so much ${person.name}! ${person.hometown} represent!</p> `;
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000);
};
scaleFactor=1;
let modalImage = document.getElementById('your-image-id'); 
function scaleImage() {
  
  scaleFactor = (scaleFactor === 1) ? 0.8 : 1;

  modalImage.style.transform = `scale(${scaleFactor})`;
}

let closeButton = document.getElementById('modal-button');
function hideModal() {
  let modal = document.getElementById('thanks-modal');
  modal.style.display = 'none';
}

closeButton.addEventListener('click', hideModal);


motionButton.addEventListener('click', reduceMotion);
window.addEventListener("scroll", reveal);
signNowButton.addEventListener("click", validateForm);
let count = 3;

