const url = 'https://go-wash-api.onrender.com/api/login'

async function login(){

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const login = document.getElementById('login');
    const carregamento = document.getElementById('carregamento');

    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
        carregamento.style.display = 'block';
        login.disabled = true;

    let api = await fetch(url,{
        method: "POST",
        body:JSON.stringify(
            {
                "email": email,
                "password": password,
                "user_type_id":1
            }

        ),
        headers:{
            'Content-Type': 'application/json'
        }
    });
    let resposta = await api.json()

    if(api.ok){
        localStorage.setItem('user', JSON.stringify(resposta))
        alert('Login com sucesso!')
        window.location.href='../view/home.html'
    }else{
        alert(resposta.data.errors);
    }
    carregamento.style.display = 'none'
    login.disabled = false
    
}