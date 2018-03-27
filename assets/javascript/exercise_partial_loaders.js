//Know what page we're on
var globalPage = 1;

function setUpPage() {
    setCurrentPage();
    goToPage(globalPage);
    updateCloseButton(globalPage);

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function updateCloseButton(pageNumber) {
    var exercisePageTitle = "Exercise " + pageNumber;
    if (pageNumber == 5) {
        exercisePageTitle = "Download";
    }
    $(".mainNav__closeExercises__pageTitle").html(exercisePageTitle);
}

//Function to set curent page
function setCurrentPage() {
    //Get the page in the 1 position of the array
    var page = parseInt(window.location.hash[1]);
    //If the page is a number, set globalPage to page
    if (!isNaN(page)) {
        globalPage = page;
    }
    //Hide next button if page hash is 5, else show it
    if (globalPage == 5) {
        $("#scrollButton").hide();
        $("#next").hide();
        $(".sideNav").hide();
        $(".exerciseSection").hide();
    }
    else {
        $("#scrollButton").show();
        $("#next").show();
        $(".sideNav").show();
        $(".exerciseSection").show();
    }
    //Hide previous button if page hash is 1, else show it
    if (globalPage == 1) {
        $("#previous").hide();
    }
    else {
        $("#previous").show();
    }
}

//Function to go to current page
function goToPage(pageNumber) {
    //Load first partial
    $('#exerciseIntrosPartials').load('../exercises-intros/_exercise_' + pageNumber + '_intro.html');
    //Load second partial
    $('#exerciseSectionsPartials').load('../exercises-sections/_exercise_' + pageNumber + '_section.html');
    //Load third partial
    $('#exerciseCtasPartials').load('../exercises-ctas/_exercise_' + pageNumber + '_cta.html');
    //Remove blue highlight from other page numbers
    $('.sideNav__navSquare').removeClass("sideNav__navSquare--active");
    //Add blue highlight to current page number
    $('#navSquare' + pageNumber).addClass("sideNav__navSquare--active");
}

//Function to set and go to next page
function nextPage() {
    //Know what page should be next, and not greater than 5
    window.location.hash = Math.min(5, globalPage + 1);

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

//     $(window).scroll(function () {
//         var top = $("#next");
//         if ($('body').height() <= ($(window).height() + $(window).scrollTop() + 200)) {
//             top.animate({ "margin-left": "0px" }, 1500);
//         }
//     });

//     $("#next").on('click', function () {
//         $("html, body").animate({ scrollTop: 0 }, 400);
//     });
};

//Function to set and go to previous page
function previousPage() {
    //Know what page should be next, and not more than 1
    window.location.hash = Math.max(1, globalPage - 1);
}

$(document).ready(function () {

    //When document loads, run setUpPage function
    setUpPage();

    //When the page's hash number changes, rerun setUpPage function
    window.onhashchange = setUpPage;
    window.onpopstate = setUpPage;

    //When user clicks next, run nextPage function
    $("#next").on("click", nextPage);

    //When user clicks previous, run previousPage function
    $("#previous").on("click", previousPage);

});