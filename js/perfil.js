const db = firebase.firestore()
let currentUser = {}
let profile = false

function getUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser.uid = user.uid
      getUserInfo(user.uid)
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


async function getUserInfo(uid) {
  const logUsers = await db.collection("usuarios").where("uid", "==", uid).get()
  let userInfo = document.getElementById("userInfo")
  if (logUsers.docs.length == 0) {
    userInfo.innerHTML = "Perfil não registrado"
  } else {
    userInfo.innerHTML = "Perfil registrado"
    profile = true
    const userData = logUsers.docs[0]
    currentUser.id = userData.id
    currentUser.nome = userData.data().nome
    currentUser.email = userData.data().email
    currentUser.endereco = userData.data().endereco
    currentUser.cpf = userData.data().cpf
    currentUser.pis = userData.data().pis
    document.getElementById("inputNome").value = currentUser.nome
    document.getElementById("inputEmail").value = currentUser.email
    document.getElementById("inputEndereco").value = currentUser.endereco
    document.getElementById("inputCPF").value = currentUser.cpf
    document.getElementById("inputPis").value = currentUser.pis
  }}
  
async function saveProfile() {
  
    const nome = document.getElementById("inputNome").value
    const email = document.getElementById("inputEmail").value
    const endereco = document.getElementById("inputEndereco").value
    const cpf = document.getElementById("inputCPF").value
    const pis = document.getElementById("inputPis").value

    
    if (!profile) {
        Swal.fire({
            icon: 'success',
            title: 'Dados cadastrados com sucesso!',
            showConfirmButton: false,
            timer: 1500
          }),
      await db.collection("usuarios").add({
        uid: currentUser.uid,
        nome: nome,
        email: email,
        endereco: endereco,
        cpf: cpf,
        pis: pis
      }) 
      getUserInfo(currentUser.uid)
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Alterações realizadas com sucesso!',
            showConfirmButton: false,
            timer: 1500
          }),
      await db.collection("usuarios").doc(currentUser.id).update({
        nome: nome,
        email: email,
        endereco: endereco,
        cpf: cpf,
        pis: pis,
      })
    }
}

  window.onload = function () {
   
    getUser()
   
  }


 