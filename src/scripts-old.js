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
