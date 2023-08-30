class GitHubUser{
    static search(username){
        const endpoint = `https://api.github.com/users/${username}`
        return fetch(endpoint)
        .then(data => data.json())
        .then(({ login, name, public_repos, followers }) => ({
             login,
             name, 
             public_repos, 
             followers,

        }))
    }

}


class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.load()

       GitHubUser.search("Prattiz").then(user => console.log(user)) 
    }

    load(){
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []      
    }

    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username){
        try{
            const userExists = this.entries.find(entry => entry.login.toUpperCase() === username.toUpperCase())
            console.log(userExists)
            if(userExists){
                throw new Error("Esse Usuário Já Existe")
            }

            const user = await GitHubUser.search(username)
            

            if(user.login === undefined){
            throw new Error("Usuário não encontrado!!")
            }

            this.entries = [user, ... this.entries]

            this.update()
            this.save()

        }catch(error){
            alert(error.message)
        }
    }

    delete(user){
        const filteredEntries = this.entries
        .filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
           
    }
}

class FavoritesView extends Favorites{
    constructor(root){
        super(root)

        this.tbody = this.root.querySelector("table tbody")

        this.update()
        this.onAdd()  
    }

    onAdd(){
        const addButton = this.root.querySelector(".gitSearch button")

        addButton.onclick = () =>{
            const { value } = this.root.querySelector(".gitSearch input")
            this.add(value)
            
        }
    }

    update(){
        this.removeAllTr()

        this.entries.forEach(user => {
            const row = this.createRow()
            row.querySelector(".user img").src = `https://github.com/${user.login}.png`
            row.querySelector(".user img").alt = `Imagem de ${user.name}`
            row.querySelector(".user p").textContent = user.name 
            row.querySelector(".user a").href = `https://github.com/${user.login}`
            row.querySelector(".repositories").textContent = user.public_repos
            row.querySelector(".user span").textContent = user.login
            row.querySelector(".followers").textContent = user.followers
            row.querySelector(".remove").onclick = () => {
                const isOk = confirm("Você deseja deletar esse usuário dos seus favoritos?")
                if(isOk){
                    this.delete(user)
                }   
            } 

            this.tbody.append(row)    
        })

       

        
    }

    createRow(){
        const tr = document.createElement("tr")

        tr.innerHTML = `
        <tr>
                <td class="user">
                    <img src="https://github.com/User.png" alt="imagem do usuario">
                    <a href="https://github.com/User" target="_blank">
                        <p>Name User</p>
                        <span>Login User</span>
                    </a>
                </td>
                <td class="repositories"></td>
                <td class="followers"></td>
                <td><button class="remove">Remover</button></td>
        </tr>
                `

        return tr
    }

    removeAllTr(){
        this.tbody.querySelectorAll("tr").forEach((tr) => {
            tr.remove()
            
            
        });
    }
}

document.getElementById("changeM").addEventListener("click", () =>{
    document.documentElement.classList.toggle("darkM")

})

new FavoritesView("#app")