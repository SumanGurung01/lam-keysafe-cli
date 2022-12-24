import fetch from "node-fetch";
import { log, URL } from './assist.js'
import { db } from "./firebase-config.js";
import { set, ref } from "firebase/database";
import chalk from "chalk";
import { createSpinner } from "nanospinner";


const spinner = createSpinner()

// FETCH ALL USERS
export async function fetchAllUser() {

    var user

    await fetch(URL)
        .then(response => response.json())
        .then(data => {
            user = data
        });

    return user
}



// VALIDATE SIGNUP DATA
export async function validateSignup(signupCredential) {

    var user = await fetchAllUser()

    var success = 1;

    if (user !== null) {
        Object.keys(user).forEach(userid => {
            if (userid === signupCredential.userid) {
                success = 0   // if user already exist
            }
        })
    }

    return success
}



// VLAIDATE LOGIN DATA
export async function validateLogin(loginCredential) {

    var user = await fetchAllUser()

    var success = 0;

    if (user !== null) {
        Object.keys(user).forEach(userid => {

            // if user exist and password matches
            if (userid === loginCredential.userid && user[userid].password === loginCredential.password) {
                success = 1
            }
        })
    }

    return success
}



// SHOW ALL RECORDS
export async function showAllField(currentUserid) {

    var user = await fetchAllUser()

    if (user !== null) {
        Object.keys(user).forEach(userid => {

            if (userid === currentUserid) {

                if (user[userid].resource === undefined) {   // if record is empty
                    log(`\n${chalk.blue('No Records')}\n`)
                }
                else {
                    log("\n")
                    user[userid].resource.forEach((val, index) => {
                        log(`${chalk.blue('Field')} : ${chalk.yellow(val.field)}\n${chalk.blue("Password")} : ${chalk.yellow(val.password)}`)
                        log("\n")
                    })
                }
            }
        })
    }
}



// ADD NEW RECORD
export async function addNewField(data, currentUserid) {

    var user = await fetchAllUser()

    var duplicate = 0;

    if (user !== null) {
        Object.keys(user).forEach(async userid => {

            if (userid === currentUserid) {

                if (user[userid].resource === undefined) {   // if record is empty add data anyway
                    spinner.success({ text: "Record Updated :)\n" })
                    await set(ref(db, `users/${currentUserid}/resource`), [data])

                } else {
                    user[userid].resource.forEach(val => {   // check if field already in record
                        if (val.field === data.field) {
                            duplicate = 1;
                        }
                    })

                    if (!duplicate) {

                        const newdata = [...user[userid].resource, data]

                        spinner.success({ text: "Record Updated :)\n" })

                        await set(ref(db, `users/${currentUserid}/resource`), newdata)

                    } else {
                        spinner.error({ text: "field already exist :(\n" })
                    }

                }
            }
        })
    }
}




// DELETE A RECORD
export async function deleteField(data, currentUserid) {

    var user = await fetchAllUser()

    if (user !== null) {
        Object.keys(user).forEach(async userid => {

            if (userid === currentUserid) {

                if (user[userid].resource === undefined) {   // first data
                    spinner.error({ text: "Oops :( Record not found\n" })

                } else {

                    var exist = 0

                    user[userid].resource.forEach(val => {   // if field exist
                        if (val.field === data) {
                            exist = 1
                        }
                    })

                    if (exist) {
                        const newdata = user[userid].resource.filter(val => {
                            if (val.field !== data) {
                                return val
                            }
                        })
                        spinner.success({ text: "Record Updated :)\n" })
                        await set(ref(db, `users/${currentUserid}/resource`), newdata)

                    } else {
                        spinner.error({ text: "Oops :( Record not found\n" })
                    }

                }
            }
        })
    }
}







