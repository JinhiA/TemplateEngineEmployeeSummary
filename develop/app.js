//npm packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

//output
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//to render team members to cards in HTML
const render = require("./lib/htmlRenderer");
let teamHTML = "";

//initial Prompt to create Team 
function createTeam() {
    console.log("Build your team!");

    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What's Your Manager Name? "
        },
        {
            type: "input",
            name: "managerId",
            message: "What's Your Manager id? "
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What's Your Manager email? "
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What's Your Manager office number? "
        },
    ])
        //gathers user answer data and logs to add to html
        .then((data) => {
            const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOfficeNumber);
            console.log(`${data.managerName} has been added!`);
            teamMember = fs.readFileSync("templates/manager.html");
            teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
            addMember();
        });
}

function addEngineer() {
    inquirer.prompt([

        {
            type: "input",
            name: "engineerName",
            message: "What's Your Engineer Name? "
        },
        {
            type: "input",
            name: "engineerId",
            message: "What's Your Engineer id? "
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What's Your Engineer email? "
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What's Your Engineer github? "
        }
    ])
        .then((data) => {
            const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);
            console.log(`${data.engineerName} has been added!`);
            teamMember = fs.readFileSync("templates/engineer.html");
            teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
            addMember();
        });
}

function addIntern() {
    inquirer.prompt([

        {
            type: "input",
            name: "internName",
            message: "What's Your Intern Name? "
        },
        {
            type: "input",
            name: "internId",
            message: "What's Your Intern id? "
        },
        {
            type: "input",
            name: "internEmail",
            message: "What's Your Intern email? "
        },
        {
            type: "input",
            name: "internSchool",
            message: "What's Your Intern school? "
        }
    ])
        .then((data) => {
            const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
            console.log(`${data.internName} has been added!`);
            teamMember = fs.readFileSync("templates/intern.html");
            teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
            addMember();
        });
}

function addMember() {
    inquirer.prompt([

        {
            type: "list",
            name: "choice",
            choices: ["Add Engineer", "Add Intern", "Done!"],
            message: "Chose the role of your next team member",
        },
    ])
        //gives user choice to add members or finish and create their team that will dynamically create html file in the output folder
        .then(function (data) {
            if (data.choice === "Add Engineer") {
                addEngineer();
            } else if (data.choice === "Add Intern") {
                addIntern();
            } else {
                const mainHTML = fs.readFileSync("templates/main.html");
                teamHTML = eval("`" + mainHTML + "`");

                fs.writeFile("output/team.html", teamHTML, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    {
                        console.log("Your team has been created! Check output folder.")
                    }
                });
            }
        });
}

createTeam();

