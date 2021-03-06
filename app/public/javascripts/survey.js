$.ajaxSetup({ traditional: true });
$('.alert').alert()
console.log("**************************");
//array of the 10 survey questions, this way its super easy to update them if needed later
var questionArray = [
    "Your mind is always buzzing with unexplored ideas and plans.",
    "Generally speaking, you rely more on your experience than your imagination.",
    "You find it easy to stay relaxed and focused even when there is some pressure.",
    "You rarely do something just out of sheer curiosity.",
    "People can rarely upset you.",
    "It is often difficult for you to relate to other people’s feelings.",
    "In a discussion, truth should be more important than people’s sensitivities.",
    "You rarely get carried away by fantasies and ideas.",
    "You think that everyone’s views should be respected regardless of whether they are supported by facts or not.",
    "You feel more energetic after spending time with a group of people."
]

//looping through the questions array to dynamically create the questions
//this way its super easy to change out questions
for (i = 0; i < questionArray.length; i++) {
    question((i + 1), questionArray[i]);
}
//initializing a var to store the users prof. image for the post later
var userFile;
//when the user uploads an image, it stores it as an object, creates a random url and uses that to display it on the page
$("input#upload").on("change", function () {
    userFile = this.files[0];
    var objectURL = window.URL.createObjectURL(userFile);
    $(".uploaded-img").attr("src", objectURL);
});

$("#submit").on("click", function () {
    // Form validation
    function validateForm() {
        var isValid = true;
        $('.form-control').each(function () {
            if ($(this).val() === '')
                isValid = false;
        });
        for (i=1; i<11; i++) {
            if ($(`#inlineRadio${i}:checked`).val() == '' )
                isValid = false
        }
        return isValid;
    }
    //prevent default page reload
    event.preventDefault();
    if (validateForm() == true) {
        //if everything has been answered, delete the bootstrap alert
        $().alert('dispose');
        //creating an object of survey answers
        var surveyObject = {
            name: $("#nameInput").val(),
            email: $("emailInput").val(),
            photo: $('#upload').val(),
            scores: [
                $('input[name=question-1]:checked').val(),
                $('input[name=question-2]:checked').val(), 
                $('input[name=question-3]:checked').val(), 
                $('input[name=question-4]:checked').val(), 
                $('input[name=question-5]:checked').val(), 
                $('input[name=question-6]:checked').val(), 
                $('input[name=question-7]:checked').val(), 
                $('input[name=question-8]:checked').val(), 
                $('input[name=question-9]:checked').val(), 
                $('input[name=question-10]:checked').val()
            ],
        }
        //posting the object above, where apiRoutes.js will find the match and send it back as res (appearing as data here)
        $.post('/api/enemies', surveyObject, function (data) {
            var enemy = data;
            $('.enemy-pic').attr("src", enemy.photo);
            $('.enemy-name').text(enemy.name);
            $('.enemy-email').text(enemy.email);
            $('#enemyModal').modal();
        })
    }
    else {
        //bootstrap alert if survey fields are left empty
        $(".popup").html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> You need to fill out all the fields
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`)
    }
  })


function question(id, string) {
    $(".survey-questions").append(`<div id="question${id}">
        <div class="question-number text-center">Question ${id}</div>
        <div class="question text-center">${string}</div>
        
        <div class="form-group q${id}">
          <span>(strongly disagree)</span>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="question-${id}" id="inlineRadio1" value="1">
            <label class="form-check-label" for="inlineRadio1">1</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="question-${id}" id="inlineRadio2" value="2">
            <label class="form-check-label" for="inlineRadio2">2</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="question-${id}" id="inlineRadio3" value="3">
            <label class="form-check-label" for="inlineRadio3">3</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="question-${id}" id="inlineRadio4" value="4">
            <label class="form-check-label" for="inlineRadio4">4</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="question-${id}" id="inlineRadio5" value="5">
            <label class="form-check-label" for="inlineRadio5">5</label>
          </div>
          <span>(strongly agree)</span>
        </div>`)
}