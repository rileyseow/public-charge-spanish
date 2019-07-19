//Creation Date: 7/10/2015

var currentQuestion = 2;

/* Removes all elements not needed after the quiz starts. */
function startQuiz() {
    document.getElementById("charge_brief").className = "invisible";
    document.getElementById("question-1").className = "question";
    var startBtn = document.getElementById('startQuizBtn');
    startBtn.parentNode.removeChild(startBtn);
    var x = document.getElementById("introbox1");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
            
/* Advances to the next question. */
function skipQuestion(){
    currentQuestion++;
}

/* */
function endQuiz(){
    var x = document.getElementById("quiz-questions");
    /*var y = document.getElementById("results_screen");*/
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        currentQuestion = 6;
    }
}

/* */
function endQuizPositive(){
    currentQuestion = 8;
}

/* Dynamically gets the amount of questions that have been created on the HTML page. */
function getNumberOfQuestions() {
    //QuerySelectorAll has better browser support in exchange for being slightly slower than gEBCN. 
    return document.querySelectorAll('#quiz-questions .question').length;
}

/* The primary tool for users to control their quiz position and executes functions in a way that promotes separation of interests. */
function nextQuestion() {
    hideQuestion(currentQuestion);
    hideAnswerButton();
    showQuestion(currentQuestion);
    currentQuestion++;
}

/* Sets the visibility of the button element required to advance through questions to true. */
function setAnswerButton() {
    //yes, that's correct. this is my lazy way of input validation without annoying users
    //(e.g. transition on-click events) on the radio buttons...
    document.getElementById("confirm_answer").className = "";
}

/* Assigns an invisible class (display: none;) to the button element required to advance through questions to true. */
function hideAnswerButton() {
    document.getElementById("confirm_answer").className = "invisible";
}	

/* Hides the the question that a user has completed so the space can be swapped with another question. */
function hideQuestion(id) {
    var totalQuestions = getNumberOfQuestions();
    for (var i = 1; i <= totalQuestions; i++) {
        if (i !== id) {
            document.getElementById("question-" + i).className = "question invisible";
        }
    }
}

/* Will identify current question using ID parameter and the invisible class free that have been created on the HTML page. */
function showQuestion(id) {
    var totalQuestions = getNumberOfQuestions();
    if (id <= totalQuestions) {
        document.getElementById("question-" + id).className = "question";
    } else {
        setEndingSentence() //begins the end screen process if id is above total question
    }
}

/* Handles calculations and provides the necessary information for the quiz sentence generation process to work. */
function getEndingSentence() {
    var quizRadioRQ = document.getElementsByName("rq");
    var quizRadio = [];
    var content;
    for (var i = 0; i < quizRadioRQ.length; i++) {
        if (quizRadioRQ[i].checked) {
            quizRadio.push(quizRadioRQ[i].id);
        }
    }
    
    if (quizRadio[0] == "gc_yes") {
        if (quizRadio[1] == "famgcapp_yes") content = "Public charge doesn’t affect you unless you go out of the country for more than 6 months. Although public charge doesn’t affect you, you should consult a qualified immigration attorney about your financial situation before filing any immigration papers.";
        else content = "Public charge doesn’t apply to you unless you leave the U.S. for more than 6 months.  Public charge does not affect applications for citizenship. Talk to an immigration attorney if you plan to leave for 6 months or more.";
    } else { //quizRadio[0] == "gc_no"
        if (quizRadio[1] == "citizenship") content = "Public charge doesn't apply to you since you are applying for citizenship. You may use any benefits for which you qualify.";
        else if (quizRadio[1] == "gcrenewal") content = "Public charge doesn't apply to you since you are applying for green card renewal. You may use any benefits for which you qualify. You may use any benefits for which you qualify.";
        else if (quizRadio[1] == "dacarenewal") content = "Public charge doesn’t apply for DACA renewal applications or to people who have DACA when they adjust status under this category. You may use any benefits for which you qualify.";
        else if (quizRadio[1] == "uortvisa") content = "Public charge doesn’t apply for U or T Visa applications or to people who have U or T visas when they adjust status under this category. You may use any benefits for which you qualify.";
        else if (quizRadio[1] == "asylumorrefugeestatus") content = "Public charge doesn’t apply for Asylum or Refugee applications or to people who have Asylum or Refugee status when they adjust status under this category. You may use any benefits for which you qualify.";
        else if (quizRadio[1] == "tps") content = "Public charge doesn’t apply for TPS applications or to people who have TPS status when they adjust status under this category. You may use any benefits for which you qualify.";
        else if (quizRadio[1] == "vawa") content = "Public charge doesn’t apply for VAWA applications or to people who have VAWA status when they adjust status under this category. You may use any benefits for which you qualify.";
        else if (quizRadio[1] == "specialimmigrantjuvenilestatus") content = "Public charge doesn’t apply for Special Immigrant Juvenile Status applications or to people who have Special Immigrant Juvenile status when they adjust status under this category. You may use any benefits for which you qualify.";
        else if (quizRadio[1] == "specialimmigrantvisastatus") content = "Public charge doesn’t apply for Special Immigrant Visa applications or to people who have a Special Immigrant visa when they adjust status under this category. You may use any benefits for which you qualify.";
        else if (quizRadio[1] == "gcbasedonutvisavawaorasylum") content = "Public charge doesn’t apply for Green Card applications based on U/T visa, VAWA, or Asylum or to people who have Green Cards when they adjust status under this category. You may use any benefits for which you qualify.";
        else if (quizRadio[1] == "adjustmentundernarcara") content = "Public charge doesn’t apply for NACARA applications or to people who have NACARA status when they adjust status under this category. You may use any benefits for which you qualify.";
        else if (quizRadio[1] == "adjustmentunderhaifa") content = "Public charge doesn’t apply for HAIFA applications or to people who have HAIFA status when they adjust status under this category. You may use any benefits for which you qualify.";
        else if (quizRadio[1] == "adjustmentundercaa") content = "Public charge doesn’t apply for CAA applications or to people who have CAA status when they adjust status under this category. You may use any benefits for which you qualify.";
        else { //quizRadio[1] == "noneoftheabove"
            if (quizRadio[2] == "none_famgcapp_yes") {
                if (quizRadio[3] == "none_whereapply_insideus") content = "A public charge test may apply, but only a few benefits that an applicant receives would count. It is still safe to get Medi-Cal and CalFresh/food stamp benefits. Eligible family members can use any benefits for which they qualify. Use of certain benefits is only one factor. In this situation, immigration will also consider your health, age, education, skills, employment, current income and sponsor’s income when deciding if you will be a public charge.";
                else /* quizRadio[3] == "none_whereapply_outsideus" */ content = "A public charge test applies in this situation. Talk to a qualified attorney about this.";
            } else /* quizRadio[2] == "none_famgcapp_no" */ content = "Public charge does not apply right now.  If you think you might seek to adjust through a family member in the distant future, consult a qualified immigration attorney.";
        }
    }
    return content;
}

/* Collects information and outputs it to the HTML page. */
function setEndingSentence() {
    var chargeResults = getEndingSentence();
    document.getElementById("results_screen").className = "";
    document.getElementById("generated_text").innerHTML = chargeResults; 
    var e = document.getElementById("info_screen");
    if (currentQuestion == 7){
        e.style.display = "none";
    } else {e.style.display = "block";}
} 