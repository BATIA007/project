const prizes = [
    {
      text: "20%",
      color: "#50B6E5"
    },
    { 
      text: "30%",
      color: "#5FC0BF"
    },
    { 
      text: "40%",
      color: "#50B6E5"
    },
    {
      text: "50%",
      color: "#5FC0BF"
    },
    {
      text: "60%",
      color: "#50B6E5"
    },
    {
      text: "70%",
      color: "#5FC0BF"
    },
    {
      text: "80%",
      color: "#50B6E5"
    },
    {
      text: "90%",
      color: "#5FC0BF"
    }
  ];

const catalogThank = document.querySelector('.catalog');

const wheel = document.querySelector('.wheel');
const spinner = wheel.querySelector('.wheel__segments');
const trigger = document.querySelectorAll('.thankyou__button');
const ticker = wheel.querySelector('.ticker');

const prizeSlice = 360 / prizes.length;
const prizeOffset = Math.floor(180 / prizes.length);
const spinClass = "is-spinning";
const selectedClass = "selected";
const discount = document.querySelector('.discount');
const discountElem = wheel.querySelector('.wheel__prize-discount');
const discountElem2 = document.querySelector('.discount__prize');
const spinnerStyles = window.getComputedStyle(spinner);


let tickerAnim;
let rotation = 0;
let currentSlice = 0;
let prizeNodes;


const createPrizeNodes = () => {
    prizes.forEach(({ text, color, reaction }, i) => {
      const rotation = ((prizeSlice * i) * -1) - prizeOffset;
      spinner.insertAdjacentHTML(
        "beforeend",
        `<li class="wheel__segment" data-reaction=${reaction} style="--rotate: ${rotation}deg">
          <span class="wheel__text">${text}</span>
        </li>`
      );
    });
  };

const createConicGradient = () => {
    spinner.setAttribute(
      "style",
      `background: conic-gradient(
        from -90deg,
        ${prizes
          .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
          .reverse()
        }
      );`
    );
  };

const setupWheel = () => {
    createConicGradient();
    createPrizeNodes();
    prizeNodes = wheel.querySelectorAll(".wheel__segment");
    };
    


const spinertia = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const runTickerAnimation = () => {
    const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
    const a = values[0];
    const b = values[1];  
    let rad = Math.atan2(b, a);
    
    if (rad < 0) rad += (2 * Math.PI);
    
    const angle = Math.round(rad * (180 / Math.PI));
    const slice = Math.floor(angle / prizeSlice);
  
    if (currentSlice !== slice) {
      ticker.style.animation = "none";
      setTimeout(() => ticker.style.animation = null, 10);
      currentSlice = slice;
    }
    tickerAnim = requestAnimationFrame(runTickerAnimation);
  };

const selectPrize = () => {
    let number = Math.floor((rotation / prizeSlice) - 3);
    if (number < 0) {
        number = prizes.length + number;
    }
    const selected = number;
    prizeNodes[selected].classList.add(selectedClass);
    discountElem.textContent = prizeNodes[selected].textContent;
    discountElem2.textContent = prizeNodes[selected].textContent.replace('%', ' %') + '!';
    wheel.classList.add('wheel__controller-active');
    discount.classList.add('discount-active');
    document.querySelector('.thankyou__header').classList.add('thankyou__header-active');
    setTimeout(() => {
      catalogThank.style.display = 'block';
      document.querySelector('.catalog__title').scrollIntoView({behavior: 'smooth', block: 'start'})
    }, 3500)
  };

trigger.forEach(trig => {
  trig.addEventListener("click", () => {
    if (trig.classList.contains('thankyou__button-okay')) {
      document.querySelector('.thankyou__block').classList.add('thankyou__block-active');
      trig.disabled = true;
      document.querySelector('.thankyou__button').disabled = true;
      setTimeout(() => {
        rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
        prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
        wheel.classList.add(spinClass);
        spinner.style.setProperty("--rotate", rotation);
        
        ticker.style.animation = "none";
        runTickerAnimation();
      }, 1500)
  } else {
    document.querySelector('.thankyou__block').classList.add('thankyou__block-active');
    trig.disabled = true;
    document.querySelector('.thankyou__button-okay').disabled = true;
    rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
    prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
    wheel.classList.add(spinClass);
    spinner.style.setProperty("--rotate", rotation);
    
    ticker.style.animation = "none";
    runTickerAnimation();
  }
  })
});



spinner.addEventListener("transitionend", () => {
    cancelAnimationFrame(tickerAnim);
    rotation %= 360;
    selectPrize();
    wheel.classList.remove(spinClass);
    spinner.style.setProperty("--rotate", rotation);
  });
  
  setupWheel();
  