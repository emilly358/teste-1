// Inicialização da lista de usuários do LocalStorage
let users = JSON.parse(localStorage.getItem('users')) || [
    { name: 'João Silva', email: 'joao@gmail.com', status: 'Ativo' },
    { name: 'Maria Souza', email: 'maria@hotmail.com', status: 'Excluído' }
];

// Função para salvar a lista de usuários no LocalStorage
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para renderizar os usuários na tabela
function renderUsers() {
    const tableBody = document.getElementById('userTableBody');
    if (tableBody) {
        tableBody.innerHTML = '';
        users.forEach((user, index) => {
            const row = `<tr>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.status}</td>
                            <td>
                                <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Editar</button>
                                <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Excluir</button>
                            </td>
                        </tr>`;
            tableBody.innerHTML += row;
        });
    }
}

// Função para redirecionar à página de edição
function editUser(index) {
    const user = users[index];
    window.location.href = `edicao.html?index=${index}&name=${user.name}&email=${user.email}&status=${user.status}`;
}

// Função para excluir um usuário
function deleteUser(index) {
    users.splice(index, 1);
    saveUsers();
    renderUsers();
}

// Função de cadastro de novo usuário
document.getElementById('userForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;
    const userStatus = document.getElementById('userStatus').value;

    users.push({ name: userName, email: userEmail, status: userStatus });
    saveUsers();
    console.log('Novo usuário cadastrado:', { userName, userEmail, userPassword, userStatus });

    // Exibe a mensagem de sucesso
    const messageDiv = document.getElementById('message');
    messageDiv.style.display = 'block';

    // Limpa o formulário
    document.getElementById('userForm').reset();

    // Remove a mensagem de sucesso após 3 segundos e redireciona
    setTimeout(() => {
        messageDiv.style.display = 'none';
        window.location.href = 'pginicial.html'; // Redireciona para a listagem após o cadastro
    }, 3000);
});

// Função de edição de usuário existente
const params = new URLSearchParams(window.location.search);
const editIndex = params.get('index');
const editName = params.get('name');
const editEmail = params.get('email');
const editStatus = params.get('status');

if (editIndex !== null) {
    document.getElementById('editUserName').value = editName;
    document.getElementById('editUserEmail').value = editEmail;
    document.getElementById('editUserStatus').value = editStatus;
}

document.getElementById('userEditForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const userName = document.getElementById('editUserName').value;
    const userEmail = document.getElementById('editUserEmail').value;
    const userPassword = document.getElementById('editUserPassword').value;
    const userStatus = document.getElementById('editUserStatus').value;

    users[editIndex] = { name: userName, email: userEmail, status: userStatus };
    saveUsers();
    console.log('Usuário editado:', { userName, userEmail, userPassword, userStatus });

    // Exibe a mensagem de sucesso
    const messageDiv = document.getElementById('editMessage');
    messageDiv.style.display = 'block';

    // Remove a mensagem de sucesso após 3 segundos e redireciona
    setTimeout(() => {
        messageDiv.style.display = 'none';
        window.location.href = 'pginicial.html'; // Redireciona para a listagem após a edição
    }, 3000);
});

// Inicializa a renderização dos usuários na tabela
if (document.getElementById('userTableBody')) {
    renderUsers();
}
