document.addEventListener("DOMContentLoaded", () => {

    // Declarando as variaveis:
    const col1 = document.querySelector("#col1")
    const col2 = document.querySelector("#col2")


    // ########## GERENCIADOR DE USUÁRIOS ##########
  document.querySelector("#userManager").addEventListener("click", (e) => {
        e.preventDefault();

        const lista_gerenciar_usuario = document.createElement("ul");
        lista_gerenciar_usuario.className = "lista_gerenciar_usuario";

        col1.innerHTML = "";
        col2.innerHTML = "";

        //Criando link: Adicionar Usuário
        const li1 = document.createElement("li");
        const a1 = document.createElement("a");
        a1.textContent = "Adicionar Usuário";
        a1.href = "#";
        a1.id = "adicionarUsuario"


        //Criando link: Alterar Usuário
        const li2 = document.createElement("li");
        const a2 = document.createElement("a");
        a2.textContent = "Alterar Usuário";
        a2.href = "#"
        a2.id = "alterar_usuario"

        li1.appendChild(a1);
        li2.appendChild(a2);

        lista_gerenciar_usuario.append(li1, li2);

        col1.appendChild(lista_gerenciar_usuario);

        displayUsers();

    });

    // ############### FUNÇÃO PARA MOSTRAR A TABELA DE USUÁRIOS ###############
    function displayUsers() {
        const users = JSON.parse(localStorage.getItem("usuarios")) || [];

        let existingTable = document.querySelector("#userTable");
        if (existingTable) {
            existingTable.remove();
        }

        const table = document.createElement("table");
        table.id = "userTable";
        table.className = "userTable"
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Cargo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.nome}</td>
                        <td>${user.role || 'Sem cargo'}</td>
                        <td><button class="deleteUserBtn" data-id="${user.id}">Excluir</button></td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        document.querySelector("#col2").appendChild(table);

        document.querySelectorAll(".deleteUserBtn").forEach(button => {
            button.addEventListener("click", (e) => {
                const userId = e.target.getAttribute("data-id");
    
                // Solicitando confirmação antes de excluir
                const confirmDelete = confirm(`Tem certeza que deseja excluir o usuário com ID ${userId}?`);
                if (confirmDelete) {
                    deleteUser(userId);
                }
            });
        });
    }


    // ########## FUNÇÃO ADICIONAR NOVO USUÁRIO ##########
    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "adicionarUsuario") {
            e.preventDefault();
    
            function addUser(user) {
                let users = JSON.parse(localStorage.getItem("usuarios")) || [];
                users.push(user);
                localStorage.setItem("usuarios", JSON.stringify(users));
            }
    
            const newUser = {
                id: Date.now(),
                nome: prompt("Digite o nome do usuário:"),
                role: prompt("Digite o cargo do usuário:"),
            };
    
            if (newUser.nome) {
                addUser(newUser);
                displayUsers();
            } else {
                alert("Nome de usuário não pode estar vazio!");
            }
        }
    });


    // FUNÇÃO PARA DELETAR UM USUARIO DA TABELA APÓS CLICAR NO BOTÃO EXCLUIR:
    function deleteUser(userId) {
        let users = JSON.parse(localStorage.getItem("usuarios")) || [];
        const updatedUsers = users.filter(user => user.id.toString() !== userId);
    
        localStorage.setItem("usuarios", JSON.stringify(updatedUsers));
        displayUsers(); 
    }



    // ########## EVENTO DE CLIQUE NO LINK BATCAVERNA ##########
    document.querySelector("#batcaverna").addEventListener("click", (e) => {
        e.preventDefault();
        const lista_batcaverna = document.createElement("ul");
        lista_batcaverna.className = "lista_batcaverna";

        col1.innerHTML = "";
        col2.innerHTML = "";

        //Criando link: Equipamentos da lista
        const li1 = document.createElement("li");
        const a1 = document.createElement("a");
        a1.textContent = "Equipamentos";
        a1.href = "#";
        a1.id = "equipamentos"


        //Criando link: Veiculos da lista 
        const li2 = document.createElement("li");
        const a2 = document.createElement("a");
        a2.textContent = "Veiculos";
        a2.href = "#"
        a2.id = "veiculos"

        li1.appendChild(a1);
        li2.appendChild(a2);

        lista_batcaverna.append(li1, li2);

        col1.appendChild(lista_batcaverna);

    });

    // ########## EVENTO CLIQUE NO LINK BIBLIOTECA WAYNE ########## 
    document.querySelector("#biblioteca_wayne").addEventListener("click", (e) => {
        e.preventDefault();
        const lista_biblioteca_wayne = document.createElement("ul");
        lista_biblioteca_wayne.className = "lista_biblioteca_wayne"

        col1.innerHTML = "";
        col2.innerHTML = "";

        //Criando link: Equipamentos da lista 
        const li1 = document.createElement("li");
        const a1 = document.createElement("a");
        a1.textContent = "Personagens";
        a1.href = "#";
        a1.id = "personagens"


        //Criando link: Veiculos da lista 
        const li2 = document.createElement("li");
        const a2 = document.createElement("a");
        a2.textContent = "Locais";
        a2.href = "#"
        a2.id = "locais"

        li1.appendChild(a1);
        li2.appendChild(a2);

        lista_biblioteca_wayne.append(li1, li2);

        col1.appendChild(lista_biblioteca_wayne);

    });

    // ########## EVENTO CLIQUE LINK EQUIPAMENTOS ###############
    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "equipamentos") {
            e.preventDefault();

            //Solicitando resposta da API
            async function mostrarEquipamentos() {
                try {
                    const resposta = await fetch('https://api.batmanapi.com/v1/concepts');
                    console.log("Status da resposta:", resposta.status); // Verifica o status HTTP da resposta

                    if (!resposta.ok) {
                        console.error("Erro na requisição:", resposta.status, resposta.statusText);
                        return;
                    }

                    const dados = await resposta.json();
                    console.log("Dados retornados pela API:", dados); // Verifica o que foi retornado

                    const lista_equipamentos = dados.data || [];
                    montarCardEquipamentos(lista_equipamentos);
                } catch (error) {
                    console.error("Erro ao buscar equipamentos:", error);
                }
            }


            mostrarEquipamentos();
        }
    });

    // Função para montar os cards de equipamentos
    function montarCardEquipamentos(lista_equipamentos) {
        const container = document.querySelector("#col2");

        container.innerHTML = "";

        lista_equipamentos.forEach(element => {
            if (element.attributes.type === "Device" || element.attributes.type === "Gear") {

                const equipment_card = document.createElement("div")
                equipment_card.className = "card"

                const equipment_name = document.createElement("h3")
                equipment_name.textContent = `Nome: ${element.attributes.name}`

                const equipment_description = document.createElement("p")
                equipment_description.textContent = `Descrição: ${element.attributes.description}`

                const equipment_type = document.createElement("p")
                equipment_type.textContent = `Tipo: ${element.attributes.type}`

                equipment_card.append(equipment_name, equipment_description, equipment_type);
                container.appendChild(equipment_card);
            }
        });
    }


    // ########## Evento de clique em veiculos ##########
    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "veiculos") {
            e.preventDefault();

            //Solicitando resposta da API
            async function mostrarVeiculos() {
                try {
                    const resposta = await fetch('https://api.batmanapi.com/v1/concepts');
                    console.log("Status da resposta:", resposta.status); // Verifica o status HTTP da resposta

                    if (!resposta.ok) {
                        console.error("Erro na requisição:", resposta.status, resposta.statusText);
                        return;
                    }

                    const dados = await resposta.json();
                    console.log("Dados retornados pela API:", dados); // Verifica o que foi retornado

                    const lista_veiculos = dados.data || [];
                    montarCardVeiculos(lista_veiculos);
                } catch (error) {
                    console.error("Erro ao buscar equipamentos:", error);
                }
            }


            mostrarVeiculos();
        }
    })

    // #################### FUNÇÃO PARA MONTAR OS CARDS DE VEICULOS ####################
    function montarCardVeiculos(lista_veiculos) {
        const container = document.querySelector("#col2");

        container.innerHTML = "";

        lista_veiculos.forEach(element => {
            if (element.attributes.type === "Vehicle") {

                const card = document.createElement("div")
                card.className = "card"

                const name = document.createElement("h3")
                name.textContent = `Nome: ${element.attributes.name}`

                const description = document.createElement("p")
                description.textContent = `Descrição: ${element.attributes.description}`

                const type = document.createElement("p")
                type.textContent = `Tipo: ${element.attributes.type}`

                card.append(name, description, type);
                container.appendChild(card);
            }
        });
    }


    // ############### EVENTO CLIQUE LINK PERSONAGENS ###############
    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "personagens") {
            e.preventDefault();

            //Solicitando resposta da API
            async function mostrarPersonagens() {
                try {
                    const resposta = await fetch('https://api.batmanapi.com/v1/characters');
                    console.log("Status da resposta:", resposta.status); // Verifica o status HTTP da resposta

                    if (!resposta.ok) {
                        console.error("Erro na requisição:", resposta.status, resposta.statusText);
                        return;
                    }

                    const dados = await resposta.json();
                    console.log("Dados retornados pela API:", dados); // Verifica o que foi retornado

                    const lista_personagens = dados.data || [];
                    montarCardPersonagens(lista_personagens);
                } catch (error) {
                    console.error("Erro ao buscar equipamentos:", error);
                }
            }
            mostrarPersonagens();
        }
    });

    // ########## FUNÇÃO PARA MONTAR OS CARDS DOS PERSONAGENS ##########
    function montarCardPersonagens(lista_personagens) {
        const container = document.querySelector("#col2");

        container.innerHTML = "";

        lista_personagens.forEach(element => {
            const card = document.createElement("div")
            card.className = "card"

            const img = document.createElement("img")
            img.src = element.attributes.image_url

            const name = document.createElement("h3")
            name.textContent = `Nome: ${element.attributes.name}`

            const alias = document.createElement("p")
            alias.textContent = `Apelido: ${element.attributes.alias}`

            const role = document.createElement("p")
            role.textContent = `Função: ${element.attributes.role}`

            const gender = document.createElement("p")
            gender.textContent = `Sexo: ${element.attributes.gender}`

            const description = document.createElement("p")
            description.textContent = `Descrição: ${element.attributes.description}`

            const abilities = document.createElement("p")
            abilities.textContent = `Habilidades: ${element.attributes.abilities}`

            card.append(img, name, alias, role, gender, description, abilities);
            container.appendChild(card);
        });
    }


    // ############### EVENTO CLIQUE LINK LOCAIS ###############
    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "locais") {
            e.preventDefault();

            //Solicitando resposta da API
            async function mostrarLocais() {
                try {
                    const resposta = await fetch('https://api.batmanapi.com/v1/locations');
                    console.log("Status da resposta:", resposta.status); // Verifica o status HTTP da resposta

                    if (!resposta.ok) {
                        console.error("Erro na requisição:", resposta.status, resposta.statusText);
                        return;
                    }

                    const dados = await resposta.json();
                    console.log("Dados retornados pela API:", dados); // Verifica o que foi retornado

                    const lista_locais = dados.data || [];
                    montarCardLocais(lista_locais);
                } catch (error) {
                    console.error("Erro ao buscar equipamentos:", error);
                }
            }
            mostrarLocais();
        }
    });

    // ########## FUNÇÃO PARA MONTAR OS CARDS DOS LOCAIS ##########
    function montarCardLocais(lista_locais) {
        const container = document.querySelector("#col2");

        container.innerHTML = "";

        lista_locais.forEach(element => {
            const card = document.createElement("div")
            card.className = "card"

            const name = document.createElement("h3")
            name.textContent = `Nome: ${element.attributes.name}`

            const description = document.createElement("p")
            description.textContent = `Descrição: ${element.attributes.description}`

            const notable_events = document.createElement("p")
            notable_events.textContent = `Eventos Notáveis: ${element.attributes.notable_events}`

            const related_characters = document.createElement("p")
            related_characters.textContent = `Personagens relacionados: ${element.attributes.related_characters}`

            const type = document.createElement("p")
            type.textContent = `Tipo: ${element.attributes.type}`

            card.append(name, description, notable_events, related_characters, type);
            container.appendChild(card);
        });
    }


    // Função ao clicar no botão sair da janela em que o usuário se encontra:
    document.querySelector("#sair").addEventListener("click", () => {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
    });


})
