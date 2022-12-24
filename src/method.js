import inquirer from "inquirer";
import { validateSignup, validateLogin, showAllField, addNewField, deleteField } from './helper.js';
import { db } from "./firebase-config.js";
import { set, ref } from "firebase/database";
import { welcome, sleep } from './assist.js'
import { createSpinner } from "nanospinner";




// SIGNUP FUNCTION
export async function signup() {

    await welcome()

    const signupCredential = await inquirer.prompt([{
        name: 'userid',   // VARIABLE
        type: 'input',
        message: "Enter User ID : ",
    },
    {
        name: 'password',
        type: 'input',
        message: "Enter Password : ",
    },
    {
        name: 'username',
        type: 'input',
        message: "Enter Your Name : ",
    }
    ])

    const success = await validateSignup(signupCredential)

    const spinner = createSpinner("Validating ...").start()

    if (success) {
        await set(ref(db, `users/${signupCredential.userid}`), signupCredential)
        spinner.success({ text: "Thank You for Signing with Lam Keysafe :)\n" })

    } else {
        await sleep()
        spinner.error({ text: "Oops :(  [ This UserID is already taken ]" })
    }
}



// LOGIN FUNCTION
export async function login() {

    await welcome()

    const loginCredential = await inquirer.prompt([{
        name: 'userid',
        type: 'input',
        message: "Enter User ID : ",
    },
    {
        name: 'password',
        type: 'input',
        message: "Enter Password : ",
    }
    ])


    const spinner = createSpinner("Validating ...").start()

    const success = await validateLogin(loginCredential)

    if (success) {

        spinner.success({ text: "Logged In\n" })

        while (true) {

            const options = await inquirer.prompt({
                type: 'list',
                name: 'option',
                message: 'Operation to perform : ',
                choices: [
                    "Add New Field & Password",
                    "Delete Existing Field & Password",
                    "View All Field & Password",
                    "Quit"
                ]
            })

            const { option } = options

            if (option === "Quit") {
                break;
            } else {
                await perform(option, loginCredential)
            }
        }

    } else {
        spinner.error({ text: "Oops :( worng credentials\n" })
    }
}




// PERFORM TASK BASED ON CHOICES
async function perform(option, loginCredential) {

    if (option === "View All Field & Password") {
        await showAllField(loginCredential.userid)
    }

    if (option === "Add New Field & Password") {

        const data = await inquirer.prompt([{
            name: 'field',
            type: 'input',
            message: "Enter Field : ",
        },
        {
            name: 'password',
            type: 'input',
            message: "Enter Password : ",
        }
        ])

        await addNewField(data, loginCredential.userid)
    }

    if (option === "Delete Existing Field & Password") {

        const data = await inquirer.prompt([{
            name: 'field',   // VARIABLE
            type: 'input',
            message: "Enter Field : ",
        }])

        await deleteField(data.field, loginCredential.userid)
    }
}
