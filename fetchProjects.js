const projectsFolderURL = "https://api.github.com/repos/zhl27/zhl27.github.io/git/trees/d3092b5159cb19820497a1da87e50c5162db74e5";
//https://api.github.com/repos/zhl27/zhl27.github.io/git/trees/main?recursive=1

async function getDataFrom(url) {
    let response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(response.status+" "+response.statusText);
    }

    return response.json(); // retornar data
}

async function listDirsFrom(url) {
    const data = await getDataFrom(url)

    .catch(function (error) {
        alert("Error al obtener la lista de directorios del repositorio de github\n"+error);
    });

    return data.tree.filter((dir) => dir.type == 'tree'); // solo tomamos los directorios 
}

async function listBlobsFrom(url) {
    const data = await getDataFrom(url)

    .catch(function (error) {
        alert("Error al obtener la lista de archivos del repositorio de github\n"+error);
    });

    return data.tree.filter((dir) => dir.type == 'blob'); // tomamos todos los archivos (blobs y directorios)
}

async function fetchReadme(projectDirectoryURL) {
    try {
        const blobs = await listBlobsFrom(projectDirectoryURL);
        
        for (const blob of blobs) {
            if (blob.path == 'README.md') {
                let data = await getDataFrom(blob.url);
            
                return atob(data.content).slice(2); // decode base64 and drop first 2 characters (idk what they are);
            }  
        }
        throw new Error("womp womp");
    } 
    catch (error) {
        alert(error);
        return "No description available.";
    }
}



async function showProjects() {
    let projectsContainer = document.getElementsByClassName("projects")[0];

    let index=1;
    const projectList = await listDirsFrom(projectsFolderURL); // leemos el directorio "projects" del repo

    for (const projectDir of projectList) {
        const project = document.createElement('div');
        project.classList.add('project');

        const info = (await fetchReadme(projectDir.url)).split("\n").filter(line => line.trim() !== ""); // extract the text from the README.md
        const title = info[0];
        const description = info[1];   

        project.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <a class="project-link" href='/projects/${projectDir.path}'>Redirigir</a>
        `
        projectsContainer.appendChild(project);
        index++;
    }; 
}


showProjects();


