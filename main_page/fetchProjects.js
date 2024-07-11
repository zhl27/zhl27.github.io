projectsContainer = document.getElementByClassName("projects");

fetch("https://api.github.com/repos/zhl27/zhl27.github.io/git/trees/main?recursive=1")
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener la lista de directorios del repositorio de github');
        }
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(function (error) {
        alert('Error al agregar el producto.\n'+error);
    })


// for (let project_folder in projects) {
//     const project = document.createElement('div');
//     project.classList.add('project');

//     project.innerHTML = `
//         <h3>Project 1</h3>
//         <p>Description of project 1.</p>
//         <a class="project-link" href='/projects/${project_folder}'>Redirigir</a>
//     `

//     projectsContainer.appendChild(project);
// }
