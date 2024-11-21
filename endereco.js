const url =  'https://go-wash-api.onrender.com/api/auth/address'
async function endereco(){
    const title = document.getElementById('title').value;
    const cep = document.getElementById('cep').value;
    const address = document.getElementById('address').value;
    const number = document.getElementById('number').value;

    if (!title || !cep || !address || !number) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    let token = JSON.parse(localStorage.getItem('user')).access_token

    let api = await fetch(url,{
        method: "GET", 
        body:JSON.stringify(
            {
                "title": title,
                "cep": cep,
                "address": address,
                "number": number,
                "complement": ""    
            }
        ),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +token
        }
    })

    if(api.ok){
        alert('Cadastro de Endereço salvo!')
        window.location.href='../view/home.html'
        return
    }else{
        alert("erro ao cadastrar o endereço")
        
    }
}
