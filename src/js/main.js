const heroHead = document.querySelector(".hero-head");
const heroSections = document.querySelector(".hero-sections");
const projects = document.querySelector(".projects-container");
const contactsC = document.querySelector(".contacts-container");
const skillsC = document.querySelector(".skills-container");
const ENG = document.querySelector(".hero-lang-eng");
const RUS = document.querySelector(".hero-lang-rus");

console.log(location.pathname);
console.log(location);
(function () {
    ENG.addEventListener("click", () => {
        localStorage.lang = "eng";
        location.reload();
    });
    RUS.addEventListener("click", () => {
        localStorage.lang = "rus";
        location.reload();
    });
    if (!localStorage.lang) {
        fillThePage("eng");
    } else {
        fillThePage(localStorage.lang);
    }
})();

async function fillThePage(json) {
    let response = await fetch(`./dist/json/${json}.json`);
    let jFile = await response.json();
    fillAside(jFile);
    if (location.pathname === "/") {
        fillProjects(jFile);
    } else if (location.pathname === "/contacts") {
        fillContacts(jFile);
    } else if (location.pathname === "/skills") {
        fillSkills(jFile);
    }
}

function fillAside(jFile) {
    let name = createElement("h1", jFile.name, "hero-head--name");
    let occupation = createElement("p", jFile.occupation, "hero-head--para");
    heroHead.appendChild(name);
    heroHead.appendChild(occupation);
    let sectionsList = createElement("ul", "", "hero-sections--list");
    for (let m = 0; m < jFile.menu[0].length; ++m) {
        let sectionsListItem = addActiveClass(m);
        let instance = createElement(
            "a",
            jFile.menu[0][m],
            "hero-sections--list-link",
            "href",
            jFile.menu[1][m]
        );
        sectionsListItem.appendChild(instance);
        sectionsList.appendChild(sectionsListItem);
    }
    heroSections.appendChild(sectionsList);
}

function addActiveClass(index) {
    if (location.pathname === "/" && index === 0) {
        return createElement("ul", "", ["hero-sections--list-li", "active"]);
    } else if (location.pathname === "/contacts" && index === 2) {
        return createElement("ul", "", ["hero-sections--list-li", "active"]);
    } else if (location.pathname === "/skills" && index === 1) {
        return createElement("ul", "", ["hero-sections--list-li", "active"]);
    } else {
        return createElement("ul", "", "hero-sections--list-li");
    }
}

function fillProjects(jFile) {
    for (let p in jFile.projects) {
        let elements = [];
        let elementsTwoCols = [];
        let itemWrapper = createElement("div", "", "projects-item-wrapper");
        let twoColumns = createElement("div", "", "divide");
        let headingWrapper = createElement("div", "", "projects-item-heading");
        let project = jFile.projects[p];
        headingWrapper.appendChild(
            createElement("span", "#" + p + " ", "projects-item-heading-number")
        );
        headingWrapper.appendChild(
            createElement("h2", project.name, "projects-item-heading-name")
        );
        elements.push(headingWrapper);
        elements.push(createElement("p", project.about, "projects-item-about"));
        elements.push(
            createElement(
                "img",
                "",
                "projects-item-image",
                ["src", "alt"],
                ["./dist/img/" + project.imageName, project.name]
            )
        );
        for (let s in project.sections) {
            if (s !== "0") {
                elementsTwoCols.push(
                    createElement(
                        "h3",
                        project.sections[s],
                        "projects-item-article"
                    )
                );
            }
            if (s === "0") {
                let linksOuterWrapper = createElement(
                    "div",
                    "",
                    "projects-item-links-wrapper"
                );
                let linksWrapper = createElement(
                    "div",
                    "",
                    "projects-item-links"
                );
                linksOuterWrapper.appendChild(
                    createElement(
                        "h3",
                        project.sections[s],
                        "projects-item-links-head"
                    )
                );
                for (let l in project.links) {
                    let info = createElement(
                        "span",
                        project.links[l][0],
                        "projects-item-links--info"
                    );
                    let link = createElement(
                        "a",
                        "",
                        "projects-item-links--link",
                        ["href", "target"],
                        [project.links[l][2], "_blank"]
                    );
                    if (project.links.length === 4) {
                        if (project.links.indexOf(project.links[l]) === 1) {
                            let image = createElement(
                                "img",
                                "",
                                "projects-item-links--icon",
                                ["src", "alt"],
                                ["./dist/img/" + project.links[l][1], "PSD"]
                            );
                            link.appendChild(image);
                        } else {
                            let image = createElement(
                                "ion-icon",
                                "",
                                "projects-item-links--icon",
                                "name",
                                project.links[l][1]
                            );
                            link.appendChild(image);
                        }
                    } else {
                        let image = createElement(
                            "ion-icon",
                            "",
                            "projects-item-links--icon",
                            "name",
                            project.links[l][1]
                        );
                        link.appendChild(image);
                    }

                    linksWrapper.appendChild(info);
                    linksWrapper.appendChild(link);
                }
                linksOuterWrapper.appendChild(linksWrapper);
                elements.push(linksOuterWrapper);
            } else if (s === "1") {
                let techContainer = createElement(
                    "div",
                    "",
                    "projects-item-tech-container"
                );
                for (let t in project.techUsed) {
                    let singleTech = createElement(
                        "span",
                        project.techUsed[t],
                        "projects-item-tech-item"
                    );
                    singleTech.style.background = project.techColors[t];
                    techContainer.appendChild(singleTech);
                }
                elementsTwoCols.push(techContainer);
            } else if (s === "2") {
                elementsTwoCols.push(
                    createElement(
                        "p",
                        project.implemented,
                        "projects-item-implemented"
                    )
                );
            } else if (s === "3") {
                let skillList = createElement(
                    "ul",
                    "",
                    "projects-item-skill--list"
                );
                for (let t in project.skills) {
                    skillList.appendChild(
                        createElement(
                            "li",
                            project.skills[t],
                            "projects-item-skill--item"
                        )
                    );
                }
                elementsTwoCols.push(skillList);
            } else if (s === "4") {
                let skillList = createElement(
                    "ul",
                    "",
                    "projects-item-lib--list"
                );
                for (let t in project.libs) {
                    skillList.appendChild(
                        createElement(
                            "li",
                            project.libs[t],
                            "projects-item-lib--item"
                        )
                    );
                }
                elementsTwoCols.push(skillList);
            }
        }
        for (let e of elements) {
            itemWrapper.appendChild(e);
        }
        for (let e of elementsTwoCols) {
            twoColumns.appendChild(e);
        }
        itemWrapper.appendChild(twoColumns);
        projects.appendChild(itemWrapper);
    }
}

function fillContacts(jFile) {
    let elements = [];
    let contacts = jFile.contacts;
    elements.push(createElement("h1", jFile.other[0], "contacts-heading"));
    for (let c in contacts) {
        let para = createElement("p", "", "contacts-data");
        let strong = createElement("strong", contacts[c][0], "contacts-strong");
        para.appendChild(strong);
        if (contacts[c].length === 2) {
            para.innerHTML += contacts[c][1];
            elements.push(para);
        } else {
            let link = createElement(
                "a",
                contacts[c][1],
                "contacts-data",
                ["href", "target"],
                [contacts[c][2], "_blank"]
            );
            para.appendChild(link);
            elements.push(para);
        }
    }
    for (let e of elements) {
        contactsC.appendChild(e);
    }
}

function fillSkills(jFile) {
    let elements = [];
    let skills = jFile.mySkills;
    elements.push(createElement("h1", jFile.other[1], "contacts-heading"));
    for (let c in skills) {
        let para = createElement("p", "", "skills-data");
        let strong = createElement("strong", skills[c][0], "skills-strong");
        para.appendChild(strong);
        para.innerHTML += skills[c][1];
        elements.push(para);
    }
    for (let e of elements) {
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
            for (let c = 0; c < attributes.length; ++c) {
                element.setAttribute(attributes[c], attributesValues[c]);
            }
        } else {
            element.setAttribute(attributes, attributesValues);
        }
    }
    return element;
}
