#! usr/bin/env node

/*
    Date : Sat Dec 24 2022 16:39:37 GMT+0530 (India Standard Time)
    Author : Suman Gurung
    Description : Lam Keysafe CLI is a CLI tool for managing all your passwords in one place
*/


import { program } from "commander";
import { signup, login } from "./method.js";

program
    .version('1.0.0')
    .parse(process.argv);

program
    .command('login')
    .description("Login to Lam-Keysafe Account")
    .action(async () => {
        await login()
        process.exit(0)
    })

program
    .command('signup')
    .description("Sign up to Lam-Keysafe")
    .action(async () => {
        await signup()
        process.exit(0)
    })


program.parse();