const form = document.querySelector('form');

function handleCredentialResponse(response) {
    console.log('id_token', response.credential); //ID_TOKEN

    fetch("http://localhost:8080/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_token: response.credential,
      }),
    })
      .then((res) => res.json())
      .then(({ user, token }) => {
        localStorage.setItem("email", user.email);
        localStorage.setItem("token", token);

        window.location = "chat.html";
      })
      .catch((err) => console.log("ERROR", err));
  }

  const signOutButton = document.getElementById("google_signout");

  // const signOut = () => {
  //     console.log(google.accounts.id);
  // };

  signOutButton.addEventListener("click", signOut);

  function signOut() {
    console.log('logout ', google.accounts.id);
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
      localStorage.clear();
      location.reload();
    });
  }

  // signOutButton.onclick = () => {
  //     console.log(google.accounts.id);
  // }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {};

    for (const element of form.elements) {
      console.log(element);
      if(element.name) {
        formData[element.name] = element.value;
      }
    }

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then(({ token }) => {
      localStorage.setItem('token', token);

      window.location = "chat.html";
    })
    .catch(console.log)
  });