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
    var answer;
    var nameInput = $("#nameInput").val();
    console.log(nameInput);
    var photo = $("#upload").val();
    console.log(photo);
    var scores = [];
    for (i = 1; i < 11; i++) {
        answer = $(`input[name=question-${i}]:checked`).val();
        scores.push(answer);
    }
    console.log(scores);
    event.preventDefault();
    var surveyObject = new Survey(nameInput, photo, scores);
    console.log(surveyObject);
    $.post('/api/enemies', surveyObject, function(data) {
        console.log(data);
    })

})

var Survey = function (name, photo, scores) {
    this.name = name;
    this.photo = photo;
    this.scores = scores;
};
//
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