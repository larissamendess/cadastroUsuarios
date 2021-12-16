function getUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let userLabel = document.getElementById("navbarDropdown")
        userLabel.innerHTML = user.email
      } else {
        swal.fire({
            icon: "success",
            title: "Redirecionando para a tela de autenticação",
          })
          .then(() => {
            setTimeout(() => {
              window.location.replace("login.html")
            }, 1000)
          })
      }
    })
  }

  window.onload = function () {
    getUser()
  }
  
  
  