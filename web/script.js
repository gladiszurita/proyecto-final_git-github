const contenedor = document.getElementById('container-row')
const btnCrear = document.getElementById('btn-new')
const myModal = new bootstrap.Modal(document.getElementById('myModal'))
let html = ""
let option = ''

const inputTitle = document.getElementById('inputTitle')
const inputDescription = document.getElementById('inputDescription')
const inputPoster = document.getElementById('inputPoster')

btnCrear.addEventListener('click', () => {
  option = "Nuevo"
  btnNuevo = "Nuevo"
  inputTitle.value = ""
  inputDescription.value = ""
  inputPoster.value = ""
  myModal.show()  
})


document.addEventListener('click', (event) => {
    if (event.target.matches ('#btn-borrar')) {
        const article = event.target.closest('.col')
        const idArticle = article.dataset.id
        
        fetch(`http://localhost:3000/api/tasks,`, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                article.remove()
            }
        }).catch(err => {
            console.error(err)
        })
    }
}) 

document.addEventListener('click', (event) => {
    if (event.target.matches ('#btn-editar')) {
        const article = event.target.closest('.col')
       
        const idArticle = article.dataset.id
        const urlPosterEdit = article.children[0].children[0].src;
        const titleEdit = article.children[0].children[1].children[0].textContent;
        const descriptionEdit = article.children[0].children[1].children[1].textContent;
        
       inputTitle.value = titleEdit;
       inputDescription.value = descriptionEdit;
       inputPoster.value = urlPosterEdit;
       option = "Editar"
       btnNuevo = "Editar"
       myModal.show();
       
    }
})





fetch('http://localhost:3000/api/tasks')
.then(res => res.json())
.then(data => {
    console.log(data)
    data.forEach(foro => {
        html += `
        <article class="col d-flex justify-content-center  mb-3" data-id="${foro.id}">
            <div class="card" style="width: 18rem;">
                <img src="${foro.poster}"
                    class="card-img-top" alt="Nuevo Titulo">
                    <div class="card-body">
                    <h5 class="card-title">${foro.title}</h5>
                    <p class="card-text">${foro.description}</p>
                    <div>
                        <button class="btn btn-success" id="btn-editar">Editar</button>
                        <button type="" class="btn btn-danger" id="btn-borrar">Borrar</button>
                    </div>
                </div>
            </div>
        </article>        
        `       
        contenedor.innerHTML = html
    });
})