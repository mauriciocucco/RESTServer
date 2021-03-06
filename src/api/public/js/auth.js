/* eslint-disable no-undef */
const form = document.querySelector('form')
const googleSignoutButton = document.getElementById('google_signout')

// function handleCredentialResponse(response) {
//   console.log("idToken", response.credential); // ID_TOKEN

//   fetch("http://localhost:8080/api/auth/google", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       id_token: response.credential,
//     }),
//   })
//     .then((res) => res.json())
//     .then(({ user, token }) => {
//       localStorage.setItem("email", user.email);
//       localStorage.setItem("token", token);

//       window.location = "chat.html";
//     })
//     .catch((err) => console.log("ERROR", err));
// }

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = {}

    form.elements.forEach((element) => {
        if (element.name) {
            formData[element.name] = element.value
        }
    })

    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((res) => res.json())
        .then(({ token }) => {
            localStorage.setItem('token', token)

            window.location = 'chat.html'
        })
        .catch(console.log)
})

function signOut() {
    google.accounts.id.disableAutoSelect()

    google.accounts.id.revoke(localStorage.getItem('email'), () => {
        localStorage.removeItem('email')
        // eslint-disable-next-line no-restricted-globals
        location.reload()
    })
}

googleSignoutButton.addEventListener('click', signOut)
