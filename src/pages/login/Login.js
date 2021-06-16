import './Login.css';

function Login() {
  return (
    <div class="login-container">
      <div>
        <div class="card p-5 text-center">

          <p class="title"> <b>Container Airlines</b> <div class="icon-plane d-inline-block"></div> </p>

          <form>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Username" id="username" required />
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" placeholder="Senha" id="password" required />
            </div>
            <button type="button" class="btn btn-primary" onClick={(() => { submit() })} >Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}


function submit() {

  const username = document.getElementById("username");
  const password = document.getElementById("password");

  const data = {
    "username": username.value,
    "password": password.value
  }

  fetch("http://18.117.223.1:3000/auth/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then((res) => res.json())
    .then((json) => {
      localStorage.setItem("token", json.token);
      setTimeout(() => {
        window.location.href = "/airports";
      }, 150);
    });
}

export default Login;