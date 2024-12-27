function showContent(id) {
    var elements = document.getElementsByClassName('content')[0].children;
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].id === id) {
        elements[i].style.display = 'block';  

      } else {
        elements[i].style.display = 'none';
      }
    }
      const nav_links = document.querySelectorAll('.nav-links')

      nav_links.forEach(item =>{
        item.addEventListener('click',()=>{
            nav_links.forEach(i => i.classList.remove('active'));
            console.log(item);
            
            item.classList.add('active')
        })
      })


  
}


const customerAdd  = document.getElementById('customerAdd');
const customerData = document.getElementById('customerData');
const customerForm = document.getElementById('custform')
const customerDataBox = document.getElementById('custdata') 
customerDataBox.style.display="none";
customerAdd.addEventListener('click',()=>{
  customerAdd.classList.add('btn_active');
  customerData.classList.remove('btn_active');
  customerForm.style.display='block';
  customerDataBox.style.display='none';
 });
customerData.addEventListener('click',()=>{
  customerData.classList.add('btn_active');
  customerAdd.classList.remove('btn_active');
  customerDataBox.style.display='block';
  customerForm.style.display='none';

  })



  // Get all list items
  const listItems = document.querySelectorAll('.list-item');

  listItems.forEach(item => {
      item.addEventListener('click', () => {
          // Remove 'active' class from all items
          listItems.forEach(i => i.classList.remove('active'));
          // Add 'active' class to the clicked item
          item.classList.add('active');
      });
  });
  
  // Get the canvas elements
  var ordersChart = document.getElementById('orders-chart').getContext('2d');
  var revenueChart = document.getElementById('revenue-chart').getContext('2d');
  
  // Create the charts
  var ordersChart = new Chart(ordersChart, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Orders',
        data: [10, 20, 30, 40, 50],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  
  var revenueChart = new Chart(revenueChart, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Revenue',
        data: [100, 200, 300, 400, 500],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  //create Ticket Button
  const dashboard = document.getElementById('dashboard')
  const createTicketForm = document.getElementById('settings');
  const createTicketButton = document.getElementById('createButton');
  createTicketButton.addEventListener('click',()=>{
      
      dashboard.style.display= 'none';
      createTicketForm.style.display= 'block';
      
  })


  const vs = document.getElementById('customerType');
  vs.style.backgroundColor= 'red';


  //customers form
  document.getElementById('customerType').addEventListener('change', function() {
    var customerType = this.value;
    console.log(customerType);
    
    var companyDetails = document.querySelector('.companyDetails');
    
    if (customerType === 'company') {
        
        companyDetails.style.display = 'block';
        document.getElementById('companyName').required = true;
        document.getElementById('companyGST').required = true;
        
    } else if (customerType === 'individual') {
        companyDetails.style.backgroundColor= 'green'
        companyDetails.style.display = 'none';
        document.getElementById('companyName').required = false;
        document.getElementById('companyGST').required = false;
       
    }
});

document.getElementById('customerForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission action
    // Here you can add your form submission logic, e.g., sending the data to a server
    console.log('Form submitted');
    var formData = new FormData(this);
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ','+ pair[1]); 
    }
});

//customers form end