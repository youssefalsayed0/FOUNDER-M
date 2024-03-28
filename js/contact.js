/* statr contact submission */
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
let name = document.getElementById('name').value;
let email = document.getElementById('email').value;
let phone = document.getElementById('phone').value;
let message = document.getElementById('message').value;


    // You can use a service like Formspree to handle form submission
    fetch('https://formspree.io/f/xvoebjwp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            message: message
        })
    }).then(function (response) {
        if (response.ok) {
            // Show success toast
            var successToast = new bootstrap.Toast(document.getElementById('successToast'));
            successToast.show();
            // Reset form
            document.getElementById('contactForm').reset();
        } else {
            // Show error toast
            var errorToast = new bootstrap.Toast(document.getElementById('errorToast'));
            errorToast.show();
        }
    }).catch(function (error) {
        console.log('Error:', error);
        // Show error toast
        var errorToast = new bootstrap.Toast(document.getElementById('errorToast'));
        errorToast.show();
    });
});
/* end contact submission */

