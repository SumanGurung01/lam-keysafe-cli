import chalkAnimation from 'chalk-animation';

// shorthand for console.log()
export const log = console.log


// database url
export const URL = "https://lam-keysafe-cli-default-rtdb.firebaseio.com/users.json"


// sleep for 1.4 sec
export const sleep = (ms = 1400) => new Promise((r) => setTimeout(r, ms));


// welcome message
export const welcome = async () => {
    const text = chalkAnimation.karaoke("Welcome to Lam Keysafe CLI");
    text.start()
    await sleep()
    text.stop()
}

