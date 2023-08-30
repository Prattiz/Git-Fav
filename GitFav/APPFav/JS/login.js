const back = document.getElementById("back")

const backtwo = document.getElementById("back2")

const firstL = document.getElementById("firstL")

const SecondL = document.getElementById("SecondL")

back.addEventListener("click", (event) =>{
    event.preventDefault
    SecondL.classList.add("del")
    firstL.classList.remove("del")
})

backtwo.addEventListener("click", (event) =>{
    event.preventDefault
    firstL.classList.add("del")
    SecondL.classList.remove("del")
})

function Enter() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    
    if (username  && password ) {
      window.location.href = "index.html"; 
    } else {
      alert("Credenciais inválidas. Tente novamente.");
    }
  }

  function login() {
    var username = document.getElementById("Cusername").value;
    var password = document.getElementById("Cpassword").value;
  
    
    if (username  && password ) {
      window.location.href = "index.html"; 
    } else {
      alert("Credenciais inválidas. Tente novamente.");
    }
  }
