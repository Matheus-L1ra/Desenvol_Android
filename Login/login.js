 // transição
// JavaScript para controle de toggle
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });

    // Função para alternar a visibilidade da senha
    function togglePasswordVisibility(id) {
        const passwordInput = document.getElementById(id);
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    }

    document.querySelectorAll('.fa-eye').forEach(item => {
        item.addEventListener('click', function () {
            const input = this.previousElementSibling;
            input.type = input.type === 'password' ? 'text' : 'password';
        });
    });
});

// login e cadastro
document.addEventListener('DOMContentLoaded', function() {
    const btnCadastro = document.querySelector('#formCadastro button');
    const btnEntrar = document.querySelector('#formLogin button');
    const btnEsqueceuSenha = document.getElementById('forgotPassword');
    const senhaCadastro = document.getElementById('senhaCadastro');

    // Criar e adicionar o balão de mensagem ao lado do formulário de cadastro
    const passwordMessage = document.createElement('div');
    passwordMessage.id = 'passwordMessage';
    passwordMessage.style.display = 'none';
    passwordMessage.textContent = 'Sua senha deve conter pelo menos 6 caracteres, incluindo letras e números.';
    document.body.appendChild(passwordMessage);

    // Funções para exibir e ocultar a mensagem de senha
    senhaCadastro.addEventListener('focus', function() {
        const rect = senhaCadastro.getBoundingClientRect();
        passwordMessage.style.top = `${rect.top + window.scrollY}px`;
        passwordMessage.style.left = `${rect.right + 10 + window.scrollX}px`;
        passwordMessage.style.display = 'block';
    });

    document.addEventListener('click', function(event) {
        if (event.target !== senhaCadastro) {
            passwordMessage.style.display = 'none';
        }
    });

    // Funções para ver a senha
    document.addEventListener('DOMContentLoaded', function() {
        const eyeIcons = document.querySelectorAll('.fa-eye');
    
        eyeIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                const passwordInput = this.previousElementSibling;
    
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                }
            });
        });
    });
    

    // Validar cadastro e salvar no localStorage, depois limpar os campos
    btnCadastro.addEventListener('click', function(event) {
        event.preventDefault();
        const inputNome = document.querySelector('#nomeCadastro');
        const inputEmailCadastro = document.querySelector('#emailCadastro');
        const inputSenhaCadastro = document.querySelector('#senhaCadastro');

        if (!validarNome(inputNome.value) || !validarEmail(inputEmailCadastro.value) || !validarSenha(inputSenhaCadastro.value)) {
            alert('Preencha os campos corretamente.');
            return;
        }

        if (localStorage.getItem(inputEmailCadastro.value) !== null) {
            alert('Este e-mail já está registrado.');
            return;
        }
    });

    // Validar entrada e verificar no localStorage
    // Função de login no login.js
    btnEntrar.addEventListener('click', function(event) {
        event.preventDefault();
        const inputEmailEntrar = document.querySelector('#emailLogin').value;
        const inputSenhaEntrar = document.querySelector('#senhaLogin').value;
    
        if (!validarEmail(inputEmailEntrar) || !validarSenha(inputSenhaEntrar)) {
            alert('Dados de login incorretos.');
            return;
        }
    
        const storedData = localStorage.getItem(inputEmailEntrar);
        if (storedData) {
            let userData;
            try {
                userData = JSON.parse(storedData);
            } catch (e) {
                userData = { senha: storedData };
            }
    
            if (userData.senha === hashSenha(inputSenhaEntrar)) {
                localStorage.setItem('isLoggedIn', 'true'); // Marca o usuário como logado
                localStorage.setItem('username', userData.nome || ''); // Armazena o nome do usuário, se disponível
                localStorage.setItem('email', inputEmailEntrar); // Armazena o e-mail do usuário
                window.location.href = '#'; // Redireciona a página
                return;
            }
        }
        
        alert('Email ou senha incorretos.');
    });
    
    // Validar senha no campo de cadastro e mudar a cor da borda
    senhaCadastro.addEventListener('input', function() {
        passwordMessage.style.display = 'none';
        if (validarSenha(senhaCadastro.value)) {
            senhaCadastro.style.borderColor = 'green';
        } else {
            senhaCadastro.style.borderColor = 'red';
        }
    });

    function validarNome(nome) {
        return nome.length > 2;
    }

    function validarEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function validarSenha(senha) {
        const requisitosSenha = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/;
        return requisitosSenha.test(senha);
    }

    function hashSenha(senha) {
        return btoa(senha);
    }

    const inputFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    inputFields.forEach(input => {
        input.style.borderWidth = '1px';
    });
});
 