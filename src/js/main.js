const heroHead = document.querySelector('.hero-head');
const heroSections = document.querySelector('.hero-sections');
const projects = document.querySelector('.projects-container');
const contactsC = document.querySelector('.contacts-container');
const skillsC = document.querySelector('.skills-container');
const ENG = document.querySelector('.hero-lang-eng');
const RUS = document.querySelector('.hero-lang-rus');

(function () {
    ENG.addEventListener('click', () => {
        localStorage.lang = 'eng';
        location.reload()
    });
    RUS.addEventListener('click', () => {
        localStorage.lang = 'rus';
        location.reload()
    });
    if (!localStorage.lang) {
        fillThePage('eng');
    } else {
        fillThePage(localStorage.lang);
    }
})();


async function fillThePage(json) {
    let response = await fetch(`./dist/json/${json}.json`);
    let jFile = await response.json();
    fillAside(jFile);
    if (location.pathname === '/') {
        fillProjects(jFile);
    } else if (location.pathname === '/contacts.html') {
        fillContacts(jFile);
    } else if (location.pathname === '/skills.html') {
        fillSkills(jFile);
    }
}

function fillAside(jFile) {
    let name = createElement('h1', jFile.name, '.hero-head--name');
    let occupation = createElement('p', jFile.occupation, '.hero-head--para');
    heroHead.appendChild(name);
    heroHead.appendChild(occupation);
    let sectionsList = createElement('ul', '', '.hero-sections--list');
    for (let m = 0; m < jFile.menu[0].length; ++m) {
        let sectionsListItem = createElement('ul', '', '.hero-sections--list-li');
        let instance = createElement('a', jFile.menu[0][m], '.hero-sections--list-link', 'href', jFile.menu[1][m]);
        sectionsListItem.appendChild(instance);
        sectionsList.appendChild(sectionsListItem);
    }
    heroSections.appendChild(sectionsList);
}

function fillProjects(jFile) {
    for (let p in jFile.projects) {
        let elements = [];
        let itemWrapper = createElement('div', '', 'projects-item-wrapper');
        let project = jFile.projects[p];
        elements.push(createElement('span', '#' + p + ' ', 'projects-item-number'));
        elements.push(createElement('h2', project.name, 'projects-item-name'));
        elements.push(createElement('p', project.about, 'projects-item-about'));
        elements.push(createElement('img', '', 'projects-item-image', ['src', 'alt'], ['./dist/img/' + project.imageName, project.name]));
        for (s in project.sections) {
            if (s !== '0') {
                elements.push(createElement('h3', project.sections[s], 'projects-item-article'));
            }
            if (s === '0') {
                let linksWrapper = createElement('div', '', 'projects-item-links');
                let linksHeading = createElement('h3', project.sections[s], 'projects-item-links--heading')
                linksWrapper.appendChild(linksHeading);
                for (l in project.links) {
                    let info = createElement('span', project.links[l][0], 'projects-item-links--info');
                    let link = createElement('a', '', 'projects-item-links--link', ['href', 'target'], [project.links[l][2], '_blank']);
                    if (project.links.length === 4) {
                        if (project.links.indexOf(project.links[l]) === 1) {
                            let image = createElement('img', '', 'projects-item-links--icon', ['src', 'alt'], ['./dist/img/' + project.links[l][1], 'PSD']);
                            link.appendChild(image);
                        } else {
                            let image = createElement('ion-icon', '', 'projects-item-links--icon', 'name', project.links[l][1]);
                            link.appendChild(image);
                        }
                    } else {
                        let image = createElement('ion-icon', '', 'projects-item-links--icon', 'name', project.links[l][1]);
                        link.appendChild(image);
                    }

                    linksWrapper.appendChild(info);
                    linksWrapper.appendChild(link);
                }
                elements.push(linksWrapper);
            } else if (s === '1') {
                for (t in project.techUsed) {
                    let singleTech = createElement('span', project.techUsed[t], 'projects-item-tech');
                    singleTech.style.background = project.techColors[t];
                    elements.push(singleTech);
                }
            } else if (s === '2') {
                elements.push(createElement('p', project.implemented, 'projects-item-implemented'));
            } else if (s === '3') {
                let skillList = createElement('ul', '', 'projects-item-skill--list');
                for (t in project.skills) {
                    skillList.appendChild(createElement('li', project.skills[t], 'projects-item-skill--item'))
                }
                elements.push(skillList);
            } else if (s === '4') {
                let skillList = createElement('ul', '', 'projects-item-lib--list');
                for (t in project.libs) {
                    skillList.appendChild(createElement('li', project.libs[t], 'projects-item-lib--item'))
                }
                elements.push(skillList);
            }
        }
        for (e of elements) {
            itemWrapper.appendChild(e);
        }
        projects.appendChild(itemWrapper);
    }
}

function fillContacts(jFile) {
    let elements = [];
    let contacts = jFile.contacts;
    for (c in contacts) {
        let para = createElement('p', '', 'contacts-data', );
        let strong = createElement('strong', contacts[c][0], 'contacts-strong');
        para.appendChild(strong);
        if (contacts[c].length === 2) {
            para.innerHTML += contacts[c][1];
            elements.push(para);
        } else {
            let link = createElement('a', contacts[c][1], 'contacts-data', ['href', 'target'], [contacts[c][2], '_blank']);
            para.appendChild(link);
            elements.push(para);
        }
    }
    for (e of elements) {
        contactsC.appendChild(e);
    }
}

function fillSkills(jFile) {
    let elements = [];
    let skills = jFile.mySkills;
    for (c in skills) {
        let para = createElement('p', '', 'contacts-data', );
        let strong = createElement('strong', skills[c][0], 'skills-strong');
        // console.log(skills[c].length);
        para.appendChild(strong);
        para.innerHTML += skills[c][1];
        elements.push(para);

        // console.log(skills[c][1]);
        // para.appendChild(strong);
        // if (skills[c].length === 2) {
        //     para.innerHTML += skills[c][1];
        //     elements.push(para);
        // } else {
        //     let link = createElement('a', skills[c][1], 'skills-data', ['href', 'target'], [skills[c][2], '_blank']);
        //     para.appendChild(link);
        //     elements.push(para);

        // }
        // console.log(skills[c]);
        // console.log(skills[c][0])
    }
    // console.log(skills[1]);
    for (e of elements) {
        skillsC.appendChild(e);
    }
}

function createElement(tag, content, classes, attributes, attributesValues) {
    let element = document.createElement(tag);
    element.textContent = content;
    if (classes) {
        if (Array.isArray(classes)) {
            for (let c = 0; c < classes.length; ++c) {
                element.classList.add(classes[c]);
            }
        } else {
            element.classList.add(classes);
        }
    }
    if (attributes && attributesValues) {
        if (Array.isArray(attributes) && Array.isArray(attributesValues)) {
            for (c = 0; c < attributes.length; ++c) {
                element.setAttribute(attributes[c], attributesValues[c]);
            }
        } else {
            element.setAttribute(attributes, attributesValues);
        }
    }
    return element;
}