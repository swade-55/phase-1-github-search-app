// let githubName = document.getElementById('search');
// let submitBtn = document.getElementById('submit');
// let getGithub = () =>{
//     let name = githubName.value;
//     let url = `https://api.github.com/search/users?q=octocat`

// }

// fetch('https://api.github.com/search/users?q=octocat');
// .then((resp)=>resp.json());
// .then((data)=>data.)


document.addEventListener('DOMContentLoaded',()=>{
    const searchForm = document.getElementById('github-form')
    searchForm.addEventListener('submit',(e)=>{
        const searchContent = document.getElementById('search').value
        console.log(searchContent)
        e.preventDefault()
        fetch(`https://api.github.com/search/users?q=${searchContent}`)
        .then(data=>data.json())
        .then(res=>renderData(res.items))
    })

})

function renderData(users){
    const divContainer = document.getElementById('user-list')
        users.forEach(user=>{
            const userList = document.createElement('li')
            const userDiv = document.createElement('div')
            const userImage = document.createElement('img')
            const repoList = document.getElementById('repos-list')
            userImage.addEventListener('click',()=>{
                fetch(`https://api.github.com/users/${user.login}/repos`)
                .then(data=>data.json())
                .then(res=>{
                    res.forEach(val =>{
                        const html = document.createElement('li')
                        const url = val['html_url']
                        html.textContent = url
                        repoList.appendChild(html)
                    })
                })
            })
            //why isn't image clicable? Trying to add event listener for the repos.
            userImage.src = user.avatar_url
            userDiv.appendChild(userImage)
            userList.appendChild(userDiv)
            divContainer.appendChild(userList)
        })
}