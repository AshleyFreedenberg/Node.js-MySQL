const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(err => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.table(res);
        //connection.end();
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
                //console.log(results[idNum].id);
                var currentQuantity = results[idNum].stock_quantity;
                var newQuantity = currentQuantity - inquirerResponse.units;

                // console.log(currentQuantity);
                // console.log(newQuantity);
                // console.log(inquirerResponse.productId);

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
                        function(error) {
                            if (error) throw err;
                            console.log("Successful!");
                          }
                    );
                    afterConnection();    
                }
                
            })
        });
}