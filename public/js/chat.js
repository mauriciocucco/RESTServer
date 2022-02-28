let user = null;
let socket = null;
const uidInput = document.getElementById("uidInput");
const messageInput = document.getElementById("messageInput");
const usersList = document.getElementById("usersList");
const messagesList = document.getElementById("messagesList");
// const logoutButton = document.getElementById("logoutButton");

const main = async () => {
  await validateToken();
};

const validateToken = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location = "index.html";
    throw new Error("No token found");
  }

  await fetch("http://localhost:8080/api/auth", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then(async ({ error, user: userServer, refreshToken }) => {
        if(error){
            window.location = "index.html";
            throw new Error(error);
        }

        localStorage.setItem("token", refreshToken); //renuevo el token

        user = userServer;

        document.title = `Bienvenido ${user.name}`;

        await connectSocket();
    })
    .catch((err) => {
        console.error("ERROR: ", err);
    });
};

const connectSocket = async () => {
    socket = io({
        'extraHeaders': {
            'authorization': localStorage.getItem("token")
        }
    });

    socketListeners();
};

const socketListeners = () => {
  socket.on('connect', () => {
    console.log('ONLINE')
  });

  socket.on('disconnect', () => {
    console.log('OFFLINE')
  });

  socket.on('public-messages', (messages) => {
    displayChatMessages(messages);
  });

  socket.on('private-message', (payload) => {
    console.log('PRIVADO: ', payload);
  });

  // socket.on('active-users', (activeUsers) => {
  //   displayActiveUsers(activeUsers);
  // });

  socket.on('active-users', displayActiveUsers);
};

const displayActiveUsers = (activeUsers = []) => {
  let usersHTML = '';
  usersList.innerHTML = '';

  activeUsers.forEach(({name, uid}) => {
    usersHTML += `
      <li>
        <p>
          <h5 class="text-success">${name}</h5>
          <span class="fs-6 text-muted">${uid}</span>
        </p>
      </li>
    `;
  });

  usersList.innerHTML = usersHTML;
};

messageInput.addEventListener('keyup', ({ keyCode }) => {
  if(keyCode !== 13) return;

  sendMessage();
});

const sendMessage = () => {
  const message = messageInput.value;
  const uid = uidInput.value.trim();

  if(!message.trim()){
    return;
  }

  socket.emit('send-message', {
    uid,
    message
  });

  messageInput.value = '';
};

const displayChatMessages = (messages = []) => {
  let messagesHTML = '';
  messagesList.innerHTML = '';

  messages.forEach(({message, userName}) => {
    messagesHTML += `
      <li>
          <span class="text-primary">${userName}: </span>
          <p class="fs-6 text-muted">${message}</p>
      </li>
    `;
  });

  messagesList.innerHTML = messagesHTML;
};

main();
