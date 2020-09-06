const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamArray = [];
const idArray = [];

init()	

function init() {

	createManager()

  	function createManager() {
  		console.log("Please build your team");
  		inquirer.prompt([
	  		{
		  		type: "input",
		        name: "managerName",
                message: "What is the manager's name?",
                validate: async (input) => {
                    if (input === ""){
                       return 'Please enter name';
                    }
              
                    return true;
                 }   
	  		},
	  		{
		  		type: "input",
		        name: "managerID",
                message: "What is the manager's Id?"
	  		},
	  		{
		  		type: "input",
		        name: "managerEmail",
		        message: "What is the manager's email?",
	  		},
	  		{
		  		type: "input",
		        name: "managerPhoneNumber",
		        message: "What is the manager's phone number?",
	  		}
  		]).then(ans => {
  			const manager = new Manager(ans.managerName, ans.managerID, ans.managerEmail, ans.managerPhoneNumber);
  			teamArray.push(manager);
  			idArray.push(ans.managmanagerID);
  			createTeam();
  		})
	}

	function createTeam() {	
		inquirer.prompt([
		{
			type: "list",
	        name: "teamChoice",
	        message: "which team member would you like to add?",
	        choices: ["Engineer", "Intern", "Exit"]
		}
		]).then(choice => {
			if (choice.teamChoice === "Engineer") {
				addEngineer();
			}

			else if (choice.teamChoice === "Intern") {
				addIntern();
			}
			else {
				buildTeam();
			}
		})
	}

	function addEngineer() {
		inquirer.prompt([
	  		{
		  		type: "input",
		        name: "engineerName",
                message: "What is the Engineer's name?",
                validate: async (input) => {
                    if (input === ""){
                       return 'Please enter name';
                    }
              
                    return true;
                 }
	  		},
	  		{
		  		type: "input",
		        name: "engineerID",
		        message: "What is the Engineer's Id?",
	  		},
	  		{
		  		type: "input",
		        name: "engineerEmail",
		        message: "What is the Engineer's email?",
	  		},
	  		{
		  		type: "input",
		        name: "engineerGithub",
		        message: "What is the Engineer's GitHub username?",
	  		}
  		]).then(ans => {
  			const engineer = new Engineer(ans.engineerName, ans.engineerID, ans.engineerEmail, ans.engineerGithub);
  			teamArray.push(engineer);
  			idArray.push(ans.engineerID);
  			createTeam();
  		})

	}

	function addIntern() {
		inquirer.prompt([
	  		{
		  		type: "input",
		        name: "internName",
                message: "What is the intern's name?",
                validate: async (input) => {
                    if (input === ""){
                       return 'Please enter name';
                    }
              
                    return true;
                 }
	  		},
	  		{
		  		type: "input",
		        name: "internID",
		        message: "What is the intern's Id?",
	  		},
	  		{
		  		type: "input",
		        name: "internEmail",
		        message: "What is the intern's email?",
	  		},
	  		{
		  		type: "input",
		        name: "internSchoolName",
		        message: "What is the intern's school name?",
	  		}
  		]).then(ans => {
  			const intern = new Intern(ans.internName, ans.internID, ans.internEmail, ans.internSchoolName);
  			teamArray.push(intern);
  			idArray.push(ans.internID);
  			createTeam();
  		})
		
	}

	function buildTeam() {
		fs.writeFileSync(outputPath, render(teamArray), "utf-8");
		
	}
}



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
