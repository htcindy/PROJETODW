const url = 'https://go-wash-api.onrender.com/api/auth/address/';


function obterToken() {
    const user = localStorage.getItem("user");
    if (!user) return null;

    const parsedUser = JSON.parse(user);
    return parsedUser.access_token || null;
}


async function listarEnderecos() {
    const token = obterToken();
    if (!token) {
        alert("Faça login para ver os endereços.");
        return;
    }

    try {
        const resposta = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer` + token
            }
        });

        if (resposta.ok) {
            const enderecos = await resposta.json();
            const tabela = document.getElementById('addressList');
            tabela.innerHTML = ""; 

            enderecos.data.forEach(endereco => adicionarLinhaTabela(endereco));
        } else {
            const errorText = await resposta.text();
            alert(`Erro ao listar endereços: ${errorText}`);
        }
    } catch (erro) {
        alert("Erro de conexão ao listar endereços.");
        console.log(erro);
    }
}


function adicionarLinhaTabela(dadosEndereco) {
    const tabela = document.getElementById('addressList');

    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${dadosEndereco.title || ''}</td>
        <td>${dadosEndereco.address || ''}</td>
        <td>${dadosEndereco.number || ''}</td>
        <td>${dadosEndereco.cep || ''}</td>
        <td>${dadosEndereco.complement || ''}</td>
    `;

    const cellActions = document.createElement('td');

    
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.onclick = () => editarEndereco(dadosEndereco);

    
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.style.marginLeft = '10px';
    btnExcluir.onclick = () => excluirEndereco(dadosEndereco.id);

    cellActions.appendChild(btnEditar);
    cellActions.appendChild(btnExcluir);

    row.appendChild(cellActions);
    tabela.appendChild(row);
}


async function editarEndereco(dadosEndereco) {
    const token = obterToken();
    if (!token) {
        alert("Usuário não autenticado.");
        return;
    }

    const novoEndereco = {
        title: prompt("Título:", dadosEndereco.title),
        address: prompt("Endereço:", dadosEndereco.address),
        number: prompt("Número:", dadosEndereco.number),
        cep: prompt("CEP:", dadosEndereco.cep),
        complement: prompt("Complemento:", dadosEndereco.complement)
    };

    try {
        const resposta = await fetch(url + dadosEndereco.id, {
            method: "POST", 
            headers: {
                'Authorization': `Bearer` + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoEndereco)
        });

        if (resposta.ok) {
            alert("Endereço atualizado com sucesso!");
            listarEnderecos();
        } else {
            const errorText = await resposta.text();
            alert(`Erro ao atualizar o endereço: ${errorText}`);
        }
    } catch (erro) {
        alert("Erro de conexão ao atualizar o endereço.");
        console.log(erro);
    }
}


async function excluirEndereco(idEndereco) {
    const token = obterToken();
    if (!token) {
        alert("Usuário não autenticado.");
        return;
    }

    if (!confirm("Você tem certeza que deseja excluir este endereço?")) {
        return;
    }

    try {
        const resposta = await fetch(`${url}${idEndereco}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer` + token
            }
        });

        if (resposta.ok) {
            alert("Endereço excluído com sucesso!");
            listarEnderecos();
        } else {
            const errorText = await resposta.text();
            alert(`Erro ao excluir o endereço: ${errorText}`);
        }
    } catch (erro) {
        alert("Erro de conexão ao excluir o endereço.");
        console.log(erro);
    }
}

window.onload = listarEnderecos;
