const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "bamazonDB"
});

connection.connect(err => {
    if (err) throw err;
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.table(res);
        prompt();
    });
}

function prompt() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the Id# of the product you would like to buy?",
                name: "productId"
            },
            {
                type: "input",
                message: "How many units of that product would you like?",
                name: "units"
            }
        ])
        .then(function (inquirerResponse) {
            connection.query("SELECT * FROM products", (err, results) => {
                if (err) throw err;
                var idNum = inquirerResponse.productId - 1;

                var currentQuantity = results[idNum].stock_quantity;
                var newQuantity = currentQuantity - inquirerResponse.units;

                if (inquirerResponse.units > results[idNum].stock_quantity) {
                    console.log("~~~~~~~~~~~~~Insufficient quantity, Please try again!~~~~~~~~~~~~~~")
                    afterConnection();
                }
                else {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                id: inquirerResponse.productId
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Successful!");
                        }
                    );
                    afterConnection();
                }
            })
        });
}