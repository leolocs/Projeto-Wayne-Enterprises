const usuarios = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "funcionario", password: "func123", role: "funcionario" }
];

// Função para verificar as credenciais de login
function autenticarUsuario(username, password) {
    return usuarios.find(user => user.username === username && user.password === password);
}


// Autenticação do usuário a partir da tela de login
document.querySelector("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const user = autenticarUsuario(username, password);

    if (user) {
        // Salva as informações de autenticação no localStorage
        localStorage.setItem("usuarioLogado", JSON.stringify({ username: user.username, role: user.role }));

        // Redireciona conforme o tipo de usuário
        if (user.role === "admin") {
            window.location.href = "admin_page.html";
        } else if (user.role === "funcionario") {
            window.location.href = "funcionario_page.html";
        }
    } else {
        document.querySelector("loginMessage").textContent = "Usuário ou senha inválidos!";
    }
});