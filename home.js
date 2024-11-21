async function site() {
    window.location.href='../view/endereco.html'
}
async function list() {
    window.location.href='../view/atualizar.html'
}
const url = 'https://go-wash-api.onrender.com/api/auth/logout'

async function logout() {
    try{
        let user = JSON.parse(localStorage.getItem('user'));
        const token = user.access_token;

        let api = await fetch(url,{
            method: "POST", 
            headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        });
        if(api.ok){
            localStorage.removeItem('user');
            alert('logout com sucesso')
            window.location.href='../index.html'
            return
        }else{
            alert('Erro desconhecido');
        }
    }catch (error) {
        console.error('Erro de conexão:', error);
        alert('Erro de conexão. Tente novamente mais tarde.');
    }
}
