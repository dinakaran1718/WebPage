// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8K8gHJzZD1dY8fASgYILdSbZWq9Oziuk",
    authDomain: "lovelink-388e1.firebaseapp.com",
    databaseURL: "https://lovelink-388e1-default-rtdb.firebaseio.com",
    projectId: "lovelink-388e1",
    storageBucket: "lovelink-388e1.appspot.com",
    messagingSenderId: "867570817694",
    appId: "1:867570817694:web:e9e75374757b05198b398f",
    measurementId: "G-D0N4RZVNVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Handle form submission
const customerForm = document.getElementById("customerForm");
const customerType = document.getElementById("customerType");
const companyDetails = document.querySelector(".companyDetails");

// Toggle company details visibility based on customer type
customerType.addEventListener("change", () => {
    if (customerType.value === "company") {
        companyDetails.style.display = "block";
    } else {
        companyDetails.style.display = "none";
    }
});

// Submit the form
customerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const customerData = {
        customerType: customerType.value,
        customerName: document.getElementById("customerName").value,
        customerContact: document.getElementById("customerContact").value,
        customerAddress: document.getElementById("CompanyAddress").value
    };

    if (customerType.value === "company") {
        // Add company-specific details
        customerData.companyName = document.getElementById("companyName").value;
        customerData.companyGST = document.getElementById("companyGST").value;
    }

    // Save data to Firebase
    const dbPath = customerType.value === "individual" ? "customers/individual" : "customers/company";
    const customerRef = ref(database, dbPath);
    const newCustomerRef = push(customerRef);

    set(newCustomerRef, customerData)
        .then(() => {
            alert("Customer data saved successfully!");
            location.reload();
            customerForm.reset();
            companyDetails.style.display = "none"; // Reset visibility
        })
        .catch((error) => {
            console.error("Error saving customer data: ", error);
            alert("Failed to save customer data. Please try again.");
        });
});



  // DOM elements
  const filterType = document.getElementById("filterType");
  const customerTableBody = document.getElementById("customerTableBody");

  // Fetch and display customer data
// Function to fetch and display customer data based on the filter
function fetchAndDisplayCustomers(filter) {
  const heads = document.getElementById("heading");
  const customersRef = ref(database, "customers");

  // Set the default heading to "All Customers" initially
  heads.innerText = "All Customers";

  onValue(customersRef, (snapshot) => {
      const data = snapshot.val();
      customerTableBody.innerHTML = ""; // Clear existing data

      let idCounter = 1;

      if (data) {
          // Check for individual customers
          if (filter === "individual") {
              const individualCustomers = data.individual || {};
              heads.innerText = "Individual Customers"; // Change heading for individual customers
              Object.entries(individualCustomers).forEach(([key, customer]) => {
                  appendCustomerRow(idCounter++, customer, "Individual", `customers/individual/${key}`);
              });
          }

          // Check for company customers
          else if (filter === "company") {
              const companyCustomers = data.company || {};
              heads.innerText = "Company Customers"; // Change heading for company customers
              Object.entries(companyCustomers).forEach(([key, customer]) => {
                  appendCustomerRow(idCounter++, customer, "Company", `customers/company/${key}`);
              });
          }

          // If no specific filter is applied, show all customers
          else if (filter === "all") {
              heads.innerText = "All Customers"; // Heading for all customers
              const individualCustomers = data.individual || {};
              const companyCustomers = data.company || {};

              // Append individual customers
              Object.entries(individualCustomers).forEach(([key, customer]) => {
                  appendCustomerRow(idCounter++, customer, "Individual", `customers/individual/${key}`);
              });

              // Append company customers
              Object.entries(companyCustomers).forEach(([key, customer]) => {
                  appendCustomerRow(idCounter++, customer, "Company", `customers/company/${key}`);
              });
          }
      } else {
          // If no data is available, set a message or keep the default heading
          heads.innerText = "No Customers Available";
      }
  });
}

  // Append a row to the table with edit and delete buttons
  function appendCustomerRow(id, customer, type, path) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${id}</td>
      <td>${customer.customerName || "N/A"}</td>
      <td>${customer.customerContact || "N/A"}</td>
      <td>${customer.customerAddress || "N/A"}</td>
      <td>${type}</td>
      <td>${type === "Company" ? customer.companyName || "N/A" : "N/A"}</td>
      <td>${type === "Company" ? customer.companyGST || "N/A" : "N/A"}</td>
      <td>
        <button class="edit-btn"  data-path="${path}">Edit</button>
        <button class="delete-btn"  data-path="${path}">Delete</button>
      </td>
    `;
    customerTableBody.appendChild(row);
  
    // Add event listeners for Edit and Delete buttons
    const editBtn = row.querySelector(".edit-btn");
    const deleteBtn = row.querySelector(".delete-btn");
    
    editBtn.addEventListener("click", () => editCustomer(path, customer));
    deleteBtn.addEventListener("click", () => deleteCustomer(path));
  }
  
  // Edit customer data
 // Edit customer data
let currentlyEditingRow = null; // Variable to track the currently editing row

function editCustomer(path, customer) {
    const row = event.target.closest("tr"); // Get the row of the clicked edit button

    // Check if already in edit mode
    if (currentlyEditingRow && currentlyEditingRow !== row) {
        alert("Please finish editing the current customer before editing another.");
        return;
    }

    const cells = row.querySelectorAll("td");

    // Check if already in edit mode
    if (cells[1].querySelector("input")) {
        alert("You are already editing this customer.");
        return;
    }

    currentlyEditingRow = row; // Set the current row as being edited

    // Create input fields for editing
    const nameInput = document.createElement("input");
    nameInput.value = customer.customerName;

    const contactInput = document.createElement("input");
    contactInput.value = customer.customerContact;

    const addressInput = document.createElement("input");
    addressInput.value = customer.customerAddress;

    // Company-specific fields for company customers
    let companyNameInput, companyGSTInput;
    if (customer.customerType === "company") {
        companyNameInput = document.createElement("input");
        companyNameInput.value = customer.companyName;

        companyGSTInput = document.createElement("input");
        companyGSTInput.value = customer.companyGST;
        
        // Replace cells with input fields for company-specific details
        cells[5].innerHTML = ""; 
        cells[5].appendChild(companyNameInput);
        
        cells[6].innerHTML = ""; 
        cells[6].appendChild(companyGSTInput);
    }

    // Replace cells with input fields for general details
    cells[1].innerHTML = ""; 
    cells[1].appendChild(nameInput);
    
    cells[2].innerHTML = ""; 
    cells[2].appendChild(contactInput);
    
    cells[3].innerHTML = ""; 
    cells[3].appendChild(addressInput);

    // Create and append save button
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add('save-btn ')
    saveBtn.addEventListener("click", () => {
        const updatedData = {
            ...customer,
            customerName: nameInput.value,
            customerContact: contactInput.value,
            customerAddress: addressInput.value,
        };

        // Include company-specific data if applicable
        if (customer.customerType === "company") {
            updatedData.companyName = companyNameInput.value;
            updatedData.companyGST = companyGSTInput.value;
        }

        set(ref(database, path), updatedData)
            .then(() => {
                alert("Customer data updated successfully!");
                fetchAndDisplayCustomers(filterType.value); // Refresh the displayed data
                currentlyEditingRow = null; // Reset the editing tracker
            })
            .catch((error) => alert("Error updating data: " + error));
    });

    cells[7].innerHTML = ""; // Clear existing buttons cell
    cells[7].appendChild(saveBtn); // Add save button to the last cell
}

 
  
  // Delete customer data
  function deleteCustomer(path) {
    if (confirm("Are you sure you want to delete this customer?")) {
      set(ref(database, path), null)
        .then(() => alert("Customer deleted successfully!"))
        .catch((error) => alert("Error deleting data: " + error));
    }
  }
  
  // Filter customers based on selection
  filterType.addEventListener("change", (e) => {
    fetchAndDisplayCustomers(e.target.value);
  });
  
  // Initial fetch
  fetchAndDisplayCustomers("all");