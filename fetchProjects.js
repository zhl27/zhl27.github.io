projectsContainer = document.getElementByClassName("projects");




for (let i in projects) {
    const project = document.createElement('div').classList.add('project');

    project.innerHTML = `
        <div class="project">
            <h3>Project 1</h3>
            <p>Description of project 1.</p>
        </div>
    `

    projectsContainer.appendChild(project);
}