document.addEventListener('DOMContentLoaded', function () {
    // Pega a referência do modal do Bootstrap
    const userModalElement = document.getElementById('userModal');
    if (!userModalElement) {
        console.error('Elemento do Modal não encontrado! Verifique o ID "userModal".');
        return;
    }
    const userModal = new bootstrap.Modal(userModalElement);
    
    const addUserBtn = document.getElementById('add-user-btn');
    const saveUserButton = document.getElementById('saveUserButton');
    const userForm = document.getElementById('userForm');
    const userModalLabel = document.getElementById('userModalLabel');
    const userCardsContainer = document.getElementById('user-cards-container');

    // 1. Lógica para ABRIR o modal para ADICIONAR um novo usuário
    addUserBtn.addEventListener('click', function () {
        userForm.reset(); // Limpa o formulário
        document.getElementById('userId').value = ''; // Garante que não há ID
        userModalLabel.textContent = 'Adicionar Usuário'; // Muda o título do modal
        userModal.show();
    });

    // 2. Lógica para ABRIR o modal para EDITAR um usuário existente
    userCardsContainer.addEventListener('click', function(event) {
        // Verifica se o clique foi no botão de atualizar
        if (event.target.classList.contains('update-user-btn')) {
            event.preventDefault();
            
            const card = event.target.closest('.user-card');
            const userId = card.getAttribute('data-id');
            const userName = card.getAttribute('data-name');
            const userLogin = card.getAttribute('data-login');

            // Preenche o formulário no modal
            userForm.reset();
            document.getElementById('userId').value = userId;
            document.getElementById('userName').value = userName;
            document.getElementById('userLogin').value = userLogin;
            document.getElementById('userPassword').value = '';

            userModalLabel.textContent = 'Atualizar Usuário';
            userModal.show();
        }
    });

    // 3. Lógica para SALVAR (Adicionar ou Atualizar)
    saveUserButton.addEventListener('click', function () {
        const userId = document.getElementById('userId').value;
        const userName = document.getElementById('userName').value.trim();
        const userLogin = document.getElementById('userLogin').value.trim();

        if (!userName || !userLogin) {
            alert('Por favor, preencha o nome e o login.');
            return;
        }

        if (userId) {
            // --- LÓGICA DE ATUALIZAÇÃO ---
            const cardToUpdate = document.querySelector(`.user-card[data-id='${userId}']`);
            if (cardToUpdate) {
                cardToUpdate.setAttribute('data-name', userName);
                cardToUpdate.setAttribute('data-login', userLogin);
                cardToUpdate.querySelector('.card-title').textContent = userName;
                console.log(`Usuário ${userId} atualizado.`);
            }
        } else {
            // --- LÓGICA DE ADIÇÃO ---
            const newUserId = Date.now(); // ID único para o exemplo
            const newUserCardHTML = `
                <div class="col-sm-6 mb-3 user-card" data-id="${newUserId}" data-name="${userName}" data-login="${userLogin}">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${userName}</h5>
                            <i class="bi bi-person-check-fill" style="font-size: 2rem; color: #198754;"></i>
                            <p class="card-text"></p>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Ações
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item update-user-btn" href="#">Atualizar login e senha</a></li>
                                    <li><a class="dropdown-item" href="#">Atualizar reconhecimento facial</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item text-danger" href="#">Desativar</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            userCardsContainer.insertAdjacentHTML('beforeend', newUserCardHTML);
            console.log(`Novo usuário adicionado.`);
        }

        userModal.hide();
    });
});
