//Creation Date: 7/10/2015

var currentQuestion = 1;
var question5to3 = false;

/* If the page is reloaded, makes sure the radio buttons are blank even if they had been selected before the reload. */
window.onload = function(){
    theForm1.reset();
    theForm3.reset();
    theForm4.reset();
    theForm5.reset();
    theForm6.reset();
    theForm7.reset();
}

/* Displays the screen for the first question. Triggered when start button is clicked. */
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
    
    var prevBtn = document.getElementById("prevBtn");
    prevBtn.style.opacity = 0.4;
    prevBtn.style.pointerEvents = "none";
}

/* Dynamically gets the amount of questions that have been created on the HTML page. For current version, this function will always return 7. */
function getNumberOfQuestions() {
    //QuerySelectorAll has better browser support in exchange for being slightly slower than gEBCN. 
    return document.querySelectorAll('#quiz-questions .question').length;
}

/* Advances to the next question. */
function nextQuestion() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (currentQuestion == 1) {
        var prevBtn = document.getElementById("prevBtn");
        prevBtn.style.opacity = 1;
        prevBtn.style.pointerEvents = "auto";
    }
    
    hideQuestion(currentQuestion);
    if (!(currentQuestion == 1 && document.getElementById("gc_yes").checked)) hideAnswerButton();
    if (currentQuestion == 1 && document.getElementById("gc_no").checked) {
        currentQuestion = 5;
    } else if ((currentQuestion == 5 && document.getElementById("citizenship").checked)
               || (currentQuestion == 5 && document.getElementById("gcbasedonutvisavawaorasylum").checked)) {
        currentQuestion = 3; 
        question5to3 = true;
    } else if ((currentQuestion == 3 && document.getElementById("famgcapp_no").checked) 
              || (currentQuestion == 4)
              || (currentQuestion == 5 && !document.getElementById("noneoftheabove").checked
                                       && !document.getElementById("citizenship").checked 
                                       && !document.getElementById("gcbasedonutvisavawaorasylum").checked)
              || (currentQuestion == 6 && document.getElementById("none_famgcapp_no").checked)) {
        currentQuestion = 8;
    } else {
        currentQuestion++;
    }
    showQuestion(currentQuestion);
}

/* Goes back to the previous question. */
function previousQuestion() {
    if (currentQuestion != 2) { //since question-2 does not have a form
        var formName = "theForm" + currentQuestion;
        document.getElementById(formName).reset();
    }
    
    if (currentQuestion == 2 || currentQuestion == 5) {
        var prevBtn = document.getElementById("prevBtn");
        prevBtn.style.opacity = 0.4;
        prevBtn.style.pointerEvents = "none";
    }
    
    if (currentQuestion == 5) {
        hideQuestion(currentQuestion);
        currentQuestion = 1;
        showQuestion(1);
    } else if (currentQuestion == 3 && question5to3) {
        hideQuestion(currentQuestion);
        currentQuestion = 5;
        showQuestion(5);
    } else {
        hideQuestion(currentQuestion);
        currentQuestion--;    
        showQuestion(currentQuestion);
    }
}

/* Shows buttons "previous question" and "next question" buttons. */
function showAnswerButton() {
    //yes, that's correct. this is my lazy way of input validation without annoying users
    //(e.g. transition on-click events) on the radio buttons...
    document.getElementById("confirm_answer").className = "";
}

/* Hides buttons "previous question" and "next question". */
function hideAnswerButton() {
    document.getElementById("confirm_answer").className = "invisible";
}

/* Hides the question passed as an input parameter. */
function hideQuestion(id) {
    document.getElementById("question-" + id).className = "question invisible";
}

/* Shows the question passed as an input parameter. */
function showQuestion(id) {
    var totalQuestions = getNumberOfQuestions();
    if (id <= totalQuestions) {
        document.getElementById("question-" + id).className = "question";
    } else {
        setEndingSentence() //begins the end screen process if id is above total question
    }
}

/* Triggered once there are no more relevant questions to be asked. Computes and outputs results. */
function setEndingSentence() {
    var chargeResults = getEndingSentence(); //see below
    document.getElementById("results_screen").className = "";
    document.getElementById("generated_text").innerHTML = chargeResults; 
    var e = document.getElementById("info_screen");
    e.style.display = "block";
} 

/* Based on previous quiz answers, determines which information is relevant and should be shown on the results page. */
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
        if (quizRadio[1] == "famgcapp_yes") {
            if (quizRadio[2] == "faminterviewUS") content = "Usted y otros miembros de la familia (no el que está patrocinando) pueden usar cualquier beneficio sin afectar al que está patrocinando.";
            else /* quizRadio[2] == "faminterviewconsulate" */ content = "La carga pública podría ser un problema. Hable con un abogado de inmigración sobre su caso.";    
        } else /* quizRadio[1] == "famgcapp_no" */ content = "Nuevamente, la carga pública no se aplica a usted a menos que salga de los EE. UU. por más de 6 meses. La carga pública no afecta las solicitudes de ciudadanía. Hable con un abogado de inmigración si planea salir del país por 6 meses o mas.";
    } else { //quizRadio[0] == "gc_no"
        if (quizRadio[1] == "famgcapp_no") {
            if (quizRadio[2] == "citizenship") {
                content = "La carga pública no se aplica a usted a menos que salga de los EE. UU. por más de 6 meses. La carga pública no afecta las solicitudes de ciudadanía. Hable con un abogado de inmigración si planea irse por 6 meses o más."; 
            } else /* quizRadio[2] == "gcbasedonutvisavawaorasylum" */ {
                content = "La carga pública no se aplica a usted a menos que salga de los EE. UU. por más de 6 meses. La carga pública no se aplica a las solicitudes de tarjeta verde basadas en la visa U / T, VAWA ni asilo, ni a las personas que tienen tarjetas verdes cuando ajustan el estado en esta categoría. Hable con un abogado de inmigración si planea irse por 6 meses o más.";
            }
        } else if (quizRadio[1] == "famgcapp_yes") {
            if (quizRadio[3] == "citizenship") {
                if (quizRadio[2] == "faminterviewUS") content = "La carga pública no se aplica a usted porque está solicitando la ciudadanía. Puede usar cualquier beneficio para el que califique. Usted y otros miembros de la familia (no el que está patrocinando) pueden usar cualquier beneficio sin afectar al que está patrocinando.";
                else /* quizRadio[2] == "faminterviewconsulate" */ content = "La carga pública no se aplica a usted porque está solicitando la ciudadanía. Puede usar cualquier beneficio para el que califique. Sin embargo, la carga pública podría ser un problema para la inmigración. Consulte a un abogado calificado / representante aprobado para tener consejos sobre la inmigración.";
            } else { /* quizRadio[3] == "gcbasedonutvisavawaorasylum" */
                if (quizRadio[2] == "faminterviewUS") content = "La carga pública no se aplica a las solicitudes de tarjeta verde basadas en la visa U / T, VAWA ni asilo, ni a las personas que tienen tarjetas verdes cuando ajustan el estado en esta categoría. Puede usar cualquier beneficio para el que califique. Usted y otros miembros de la familia (no el que está patrocinando) pueden usar cualquier beneficio sin afectar al que está patrocinando.";
                else /* quizRadio[2] == "faminterviewconsulate" */ content = "La carga pública no se aplica a las solicitudes de tarjeta verde basadas en la visa U / T, VAWA ni asilo, ni a las personas que tienen tarjetas verdes cuando ajustan el estado en esta categoría. Puede usar cualquier beneficio para el que califique. Sin embargo, la carga pública podría ser un problema para la inmigración. Consulte a un abogado calificado / representante aprobado para tener consejos sobre la inmigración.";
                }
        }
        else if (quizRadio[1] == "dacarenewal") content = "La carga pública no se aplica a las solicitudes de renovación de DACA ni a las personas que tienen DACA cuando ajustan el estado en esta categoría. Puede usar cualquier beneficio para el que califique.";
        else if (quizRadio[1] == "uortvisa") content = "La carga pública no se aplica a las solicitudes de visa U o T ni a las personas que tienen visas U o T cuando ajustan el estado en esta categoría. Puede usar cualquier beneficio para el que califique.";
        else if (quizRadio[1] == "asylumorrefugeestatus") content = "La carga pública no se aplica a las solicitudes de asilo ni de refugiados, ni a las personas que tienen un estado de asilo o de refugiado cuando ajustan el estado en esta categoría. Puede usar cualquier beneficio para el que califique.";
        else if (quizRadio[1] == "tps") content = "La carga pública no se aplica a las aplicaciones TPS ni a las personas que tienen el estado TPS cuando ajustan el estado en esta categoría. Puede usar cualquier beneficio para el que califique.";
        else if (quizRadio[1] == "vawa") content = "La carga pública no se aplica a las aplicaciones VAWA ni a las personas que tienen el estado VAWA cuando ajustan el estado en esta categoría. Puede usar cualquier beneficio para el que califique.";
        else if (quizRadio[1] == "specialimmigrantjuvenilestatus") content = "La carga pública no se aplica a las solicitudes de Estatus de Inmigrante Juvenil Especial ni a las personas que tienen el estado de Inmigrante Juvenil Especial cuando ajustan el estado en esta categoría. Puede usar cualquier beneficio para el que califique.";
        else if (quizRadio[1] == "specialimmigrantvisastatus") content = "La carga pública no se aplica a las solicitudes de Visa de Inmigrante Especial ni a las personas que tienen una Visa de Inmigrante Especial cuando ajustan el estado en esta categoría. Puede usar cualquier beneficio para el que califique.";
        else if (quizRadio[1] == "adjustmentundernarcara") content = "La carga pública no se aplica a las aplicaciones de NACARA ni a las personas que tienen el estado de NACARA cuando ajustan el estado en esta categoría. Puede usar cualquier beneficio para el que califique.";
        else if (quizRadio[1] == "adjustmentunderhaifa") content = "La carga pública no se aplica a las aplicaciones HAIFA ni a las personas que tienen el estado HAIFA cuando ajustan el estado en esta categoría. Puede usar cualquier beneficio para el que califique.";
        else if (quizRadio[1] == "adjustmentundercaa") content = "La carga pública no se aplica a las solicitudes de CAA ni a las personas que tienen el estado de CAA cuando ajustan el estado en esta categoría. Puede usar cualquier beneficio para el que califique.";
        else { //quizRadio[1] == "noneoftheabove"
            if (quizRadio[2] == "none_famgcapp_yes") {
                if (quizRadio[3] == "none_whereapply_insideus") content = "Se puede aplicar una prueba de carga pública, pero solo contarían unos pocos beneficios que recibe un solicitante. Aún es seguro obtener beneficios de Medi-Cal y CalFresh/estampillas de comida. Los miembros elegibles de la familia pueden usar cualquier beneficio para el que califiquen. El uso de ciertos beneficios es solo un factor. En esta situación, inmigración también tendrá en cuenta su salud, edad, educación, habilidades, empleo, ingresos actuales e ingresos del patrocinador al decidir si será una carga pública.";
                else /* quizRadio[3] == "none_whereapply_outsideus" */ content = "Se aplica una prueba de carga pública en esta situación. Consulte a un abogado calificado sobre esto.";
            } else /* quizRadio[2] == "none_famgcapp_no" */ content = "No hay una prueba de carga pública porque no está solicitando ningún cambio de inmigración. Si cree que podría intentar solicitarse a través de un miembro de su familia en el futuro, consulte a un abogado de inmigración calificado.";
        }
    }
    return content;
}