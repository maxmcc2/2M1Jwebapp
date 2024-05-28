document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Retrieve username and password from the form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    // Create a new XMLHttpRequest object for making AJAX requests
    var xhr = new XMLHttpRequest();
    
    // Configure the AJAX request
    xhr.open("POST", "../src/login.js", true); // Specify the HTTP method (POST), URL, and async flag (true)
    xhr.setRequestHeader("Content-Type", "application/json"); // Set the request header to specify JSON content
    
    // Define a callback function to handle the AJAX response
    xhr.onreadystatechange = function() {
      // Check if the request is complete
      if (xhr.readyState === XMLHttpRequest.DONE) {
        // Check if the response status is OK (200)
        if (xhr.status === 200) {
          console.log("Response from server:", xhr.responseText); // Debugging statement: Print the entire response from the server
          
          try {
            // Attempt to parse the response as JSON
            var response = JSON.parse(xhr.responseText);
            
            // Check if the login was successful
            if (response.success) {
              // Redirect to another page (e.g., dashboard)
              window.location.href = "dashboard.html";
            } else {
              // Display an error message if login failed
              alert("Login failed: " + response.message);
            }
          } catch (error) {
            // Handle parsing errors
            console.error("Error parsing JSON:", error);
            alert("An error occurred while processing the server response.");
          }
        } else {
          // Display an error message if there was an error during the request
          alert("An error occurred while processing your request.");
        }
      }
    };
    
    // Create a JSON object with the username and password
    var data = JSON.stringify({ username: username, password: password });
    
    // Send the AJAX request with the JSON data
    xhr.send(data);
  });
  