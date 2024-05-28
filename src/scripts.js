function updateSliderValue(sliderId, outputId) {
    var slider = document.getElementById(sliderId);
    var output = document.getElementById(outputId);
    output.innerHTML = slider.value;
    
    // Update value indicator
    var valueIndicator = document.getElementById(sliderId + "Indicator");
    var sliderWidth = slider.offsetWidth;
    var percent = (slider.value - slider.min) / (slider.max - slider.min);
    var left = percent * (sliderWidth - 30); // 30 is width of indicator
    valueIndicator.style.left = left + "px";
    valueIndicator.innerHTML = slider.value;
    valueIndicator.style.display = "block";
  }
  
  function toggleSlider(sliderId) {
    var slider = document.getElementById(sliderId);
    var naCheckbox = document.getElementById(sliderId + "NA");
    slider.disabled = naCheckbox.checked;
    
    // Hide or display value indicator based on the N/A checkbox state
    var valueIndicator = document.getElementById(sliderId + "Indicator");
    if (naCheckbox.checked) {
        valueIndicator.style.display = "none";
    } else {
        valueIndicator.style.display = "block";
    }
}


  function submitForm() {
    var form = document.getElementById("ratingForm");
    var formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log('Form submitted successfully:', data);
      // Optionally, you can perform further actions here after the form is submitted successfully
    })
    .catch(error => {
      console.error('There was a problem with the form submission:', error);
    });
  }

  // Disable sliders initially if corresponding "N/A" checkbox is checked
  document.addEventListener("DOMContentLoaded", function() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      var sliderId = checkbox.id.replace("NA", "");
      var slider = document.getElementById(sliderId);
      slider.disabled = checkbox.checked;
    });
  });

// Function to reset JavaScript functionality
function resetJavaScript() {
    // Reset sliders and their indicators
    var sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(function(slider) {
        slider.value = 5; // Set the default value to 5 for all sliders
        updateSliderValue(slider.id, slider.id + "Output");
    });

    // Hide all value indicators
    var valueIndicators = document.querySelectorAll('.value-indicator');
    valueIndicators.forEach(function(indicator) {
        indicator.style.display = "none";
    });

    // Reset "N/A" checkboxes and their corresponding sliders
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        var sliderId = checkbox.id.replace("NA", "");
        var slider = document.getElementById(sliderId);
        slider.disabled = checkbox.checked;
        
        if (!checkbox.checked) {
            var valueIndicator = document.getElementById(sliderId + "Indicator");
            valueIndicator.style.display = "block"; // Show the value indicator for non-"N/A" sliders
        } else {
            var valueIndicator = document.getElementById(sliderId + "Indicator");
            valueIndicator.style.display = "none"; // Hide the value indicator for "N/A" sliders
        }
    });

    // Hide the value indicator for the "service" slider
    document.getElementById("serviceIndicator").style.display = "none";
}

// Event listener for the reset button
document.getElementById("resetButton").addEventListener("click", function() {
    resetJavaScript();
});

// Call resetJavaScript when the page is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    resetJavaScript();
});
