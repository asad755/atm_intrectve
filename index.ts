import inquirer from "inquirer";
import { faker } from "@faker-js/faker";

//import inquirer from "inquirer";
//import faker from "faker";

// Requirement
// 1. users data
// 2. atm machine
// 3. atm function

interface User {
    id: number;
    pin: number;
    name: string;
    accountNumber: number;
    balance: number;
}

const createUser = (): User[] => {
    let users: User[] = [];

    for (let i = 0; i < 5; i++) {
        let user: User = {
            id: i,
            pin: 1000 + i,
            name:faker.person.fullName(),
            accountNumber: Math.floor(100000000 * Math.random() * 900000000),
            balance: 1000000 * i,
        };

        users.push(user);
    }

    return users;
};

// atm machine//

const atmMachine = async (users: User[]) => {
    const res = await inquirer.prompt({
        type: "number",
        message: "Enter PIN code:",
        name: "pin",
    });

    const user = users.find((val) => val.pin === res.pin);

    if (user) {
        console.log(`Welcome ${user.name}`);
        await atmFunc(user);
    } else {
        console.log("Invalid PIN");
    }
};

// atm function

const atmFunc = async (user: User) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "What would you like to do?",
        choices: ["Withdraw", "Balance", "Deposit", "Exit"],
    });

    switch (ans.select) {
        case "Withdraw":
            const withdrawAmount = await inquirer.prompt({
                type: "number",
                message: "Enter amount to withdraw:",
                name: "amount",
            });
            if (withdrawAmount.amount > user.balance) {
                console.log("Insufficient balance.");
            } else if (withdrawAmount.amount > 25000) {
                console.log("Withdrawal amount cannot exceed 25000.");
            } else {
                console.log(`Withdrawn amount: ${withdrawAmount.amount}`);
                console.log(`New balance: ${user.balance - withdrawAmount.amount}`);
            }
            break;
        case "Balance":
            console.log(`Current balance: ${user.balance}`);
            break;
        case "Deposit":
            const depositAmount = await inquirer.prompt({
                type: "number",
                message: "Enter amount to deposit:",
                name: "amount",
            });
            console.log(`Deposited amount: ${depositAmount.amount}`);
            console.log(`New balance: ${user.balance + depositAmount.amount}`);
            break;
        case "Exit":
            console.log("Thank you for using the ATM.");
            break;
        default:
            console.log("Invalid option.");
            break;
    }
};

const users = createUser();

atmMachine(users);









































/*
//recuerment
//1 users data
//2 atm machine
//3 atm function

interface User {
    id:number
    pin:number
    name:string
    accountNumber:number
    balance:number
}

const createUser =()=>{
    let users:User[] = []

    for(let i = 0;i<5;i++){
        let user:User = {
            id:i,
            pin:1000 + i,
            name:faker.person.fullName(),
            accountNumber:Math.floor(100000000 * Math.random()*900000000),
            balance:1000000 * i,
        };

        users.push(user);
    }

    return users;
};

// atm machine//

const atmMachine = async(users:User[])=>{

    const res = await inquirer.prompt({
        type:"number",
        message:"write pin code",
        name:"pin"
    })
    // consol.log("welcome account holder")

    const user = users.find((val) => val.pin == res.pin);

    if (user){
        console.log(`welcome ${user.name}`);
        return;
    }
     console.log("Invalid user pin");
};
// atm function

const atmFunc = async(user:user)=>{
    const ans =await inquirer.prompt({
        type:"list",
        name:"select",
        message:"karna keya chatay ho...",
        choices:["withdraw","balance","deposit","exit"]
    })
     console.log(ans)
    if(ans.select == "withdraw"){
        const amount = await inquirer.prompt({
            type:"number",
            message:"enter amount.",
            name:"rupee"
        })
           if(amount.rupee > user.balance){
          return console.log("mojoda balance nakafi hy....")
           }
            return console.log("app 25000 se ziyada ki amount nahi nikal sakte")
           }

           console.log(`withdraw amount: ${amount.rupee}`)
           console.log(`Balance: ${user.balance-amount.rupee}`)
        }


        if(amount.rupee > user.balance)
     
        if(ans.select == "balance"){
            console.log(`Balance: ${user.balance-amount.rupee}`)
            
        }
        if(ans.select == "deposit"){
            const deposit = await inquirer.prompt({
                type:"number",
                message:"Deposite amount enter",
                name:"rupee"
            })
             console.log(`Deposite amount: ${deposit.rupee} `)
             console.log(`Total Balance: ${user.balance + deposit.rupee}`)
            return;
        }
        if(ans.select == "exit"){
            console.log("Thanks for using atm...")
        }
        




    console.log(ans)





const users = createUser();

atmMachine(users);
console.log(users);
    */