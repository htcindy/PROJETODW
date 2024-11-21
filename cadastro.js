const url = 'https://go-wash-api.onrender.com/api/user'

async function cadastro(){
    let nome = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let birthday = document.getElementById('birthday').value;
    let terms = document.getElementById('terms').checked;

    
    
    if(!terms){
        alert("Por favor, aceitar os termos")
        return;
    }
    

    let api = await fetch(url,{
        method: "POST", 
        body:JSON.stringify(
            {
                "name":nome,
                "email":email,
                "user_type_id":1,
                "password": password,
                "cpf_cnpj": cpf_cnpj,
                "terms": 1,
                "birthday": birthday
            }
        ),
        headers:{
            'Content-Type': 'application/json'
        } 
    });
    if(api.ok){
        let resposta = await api.json();
        alert(resposta.data);
        window.location.href='../view/login.html'
        return;
    } else{
    let erro = await api.json();
        
        if (erro.data.errors.name) {
            alert("Erro no nome: " + erro.data.errors.name[0]);
        }
        if (erro.data.errors.email) {
            alert("Erro no email: " + erro.data.errors.email[0]);
        }
        if (erro.data.errors.password) {
            alert("Erro na senha: " + erro.data.errors.password[0]);
        }
        if (erro.data.errors.cpf_cnpj) {
            alert("Erro no CPF: " + erro.data.errors.cpf_cnpj[0]);
        }
        if (erro.data.errors.birthday) {
            alert("Erro na data de nascimento: " + erro.data.errors.birthday[0]);
        }
        if (!erro.data.errors.name && !erro.data.errors.email && !erro.data.errors.password && !erro.data.errors.cpf_cnpj && !erro.data.errors.birthday) {
            alert("Erro desconhecido");
        }
    }
}  
