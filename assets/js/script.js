
window.onscroll = function () { scrollFunction() };

let isPopupClosed = false;

function scrollFunction() {
    if (isPopupClosed) return;

    if (document.body.scrollTop > 1800 || document.documentElement.scrollTop > 1800) {
        $('#staticBackdrop').modal('show');
        $('#staticBackdrop').on('hidden.bs.modal', function (event) {
            isPopupClosed = true;
        })
    }
}

// Prevent background from scrolling on mobile when navigation is toggled

document.addEventListener('touchmove', function (evt) {
    evt.preventDefault();
});

const form = document.getElementById('registration-form');

const postToSheet = function (formButton, data) {
    const url = "https://script.google.com/macros/s/AKfycbxZ7_Z2fyGHqLZCCxzyo8i63v7Q2O33goZhsE7ZBgZ6KMvM9IkKUlk8yJcE2UpL1ecu/exec";

    formButton.innerText = "SUBMITING PLEASE WAIT";
    formButton.setAttribute("disabled", true);
    $.ajax({
        url: url,
        data: data,
        method: "post",
        success: function () {
            formButton.innerText = "SUBMIT";
            formButton.setAttribute("disabled", false);
            form.reset();
            isPopupClosed = true;
            $('#staticBackdrop').modal('hide');
        },
        error: function (err) {
            alert("Something went wrong please try again.");
        },
    });
}


form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const data = Object.fromEntries(new FormData(evt.target).entries());
    const formButton = document.getElementById('form-submit');

    postToSheet(formButton, data);
});