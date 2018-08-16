// Initializes the npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
// require("console.table");

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

// function to load the products table from the database and print results to the console
function loadProducts(){
  connection.query("SELECT * FROM products",function(err, res){
    if (err) throw err;
    // draw the table in the terminal using the response
    console.log(res);
    promptCustomerForItem(res);
  });
}

function promptCustomerForItem(inventory){
// prompt user for what they'd like to purchase
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the id of the item you would like to purchase?[quit with the letter Q]",
        validate: function(val){
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ]).then (function(val){
      checkIfShouldExit(val.choice)
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      // if there's a product with the id the user chose prompt the customer for a desired id
      if (product){
        promptCustomerForQuantity(product);
      } else {
        console.log("That item does not exist in our inventory.");
        loadProducts();
      }
    });
}

function promptCustomerForQuantity(product){
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like?[quit with the letter Q]",
        validate: function(val){
          return val > 0 || val.toLowerCase() == "q";
        }
      }
    ]).then (function(val){
      checkIfShouldExit(val.quantity)
      var quantity = parseInt(val.quantity)
      // if there's a product with the id the user chose prompt the customer for a desired id
      if (quantity > product.stock_quantity){
        console.log("We do not have enough of that.");
        loadProducts();
      } else {
        makePurchase();
      }
    });
}


// function to execute the purchase and decrease
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id =",
    [quantity, product.item_id],
    function(err) {
      if (err) throw err;
      // Let the user know the purchase was successful, re-run loadProducts
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      loadProducts();
    }
  );
}

// check to see if the product the user chose exist in the inventory
function checkInventory(choiceId, inventory){
  for (var i = 0; i<inventory.length; i++){
    if (inventory[i].item_id===choiceId){
      return inventory[i]
    }
  }
  return null;
}

// check to see if the user wants to quit
function checkIfShouldExit(choice){
  if (choice.toLowerCase()=="q"){
    console.log("goodbye");
    // this line is to exit from node in the terminal
    process.exit(0);
  }
}
  
    
