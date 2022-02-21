


const hamburgerbtn = document.querySelector(".toggle-button");
const closebtn = document.querySelector(".closebtn");
const sidenav = document.querySelector(".sidenav");
const restSidenav = document.querySelector(".rest-sidenav");

var tablet_media_query = 'screen and (min-width: 768px) and (max-width: 1024px)';
var phone_media_query = 'screen and (min-width: 235px) and (max-width: 767px)';
var small_media_query = 'screen and (max-width: 234px)';

var isDrawerOpen = false;

/* Set the width of the side navigation to 250px */
function openNav() {
    isDrawerOpen = true;
    restSidenav.style.width = "100%";
    if (window.matchMedia(tablet_media_query).matches) {
        sidenav.style.width = "33.3%";


    }
    else if (window.matchMedia(phone_media_query).matches) {
        sidenav.style.width = "66.6%";

    }
    else if (window.matchMedia(small_media_query).matches) {
        sidenav.style.width = "80%";

    }
    else {
        sidenav.style.width = "33.3%";

    }

}



window.onresize = function () {
    if (isDrawerOpen) {
        if (window.matchMedia(tablet_media_query).matches) {
            sidenav.style.width = "33.3%";


        }
        else if (window.matchMedia(phone_media_query).matches) {
            sidenav.style.width = "66.6%";

        }
        else if (window.matchMedia(small_media_query).matches) {
            sidenav.style.width = "80%";

        }
        else {
            sidenav.style.width = "33.3%";

        }
    }
};
/* Set the width of the side navigation to 0 */
function closeNav() {
    isDrawerOpen = false;
    sidenav.style.width = "0";
    restSidenav.style.width = "0";


}


function OnClick(evt) {

    let targetElement = evt.target; // clicked element

    do {

        if (targetElement == sidenav || targetElement == hamburgerbtn) {

            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;

    } while (targetElement);

    closeNav();

}

document.addEventListener("click", OnClick);




hamburgerbtn.addEventListener("click", openNav);
closebtn.addEventListener("click", closeNav);


//Account Dropdown
const accdropdownbtn = document.querySelector(".accdropbtn");
const dropdown = document.querySelector("#Dropdown");


function ExpandDropdown() {
    dropdown.classList.toggle("show");

    document.querySelector(".accArrow").classList.toggle("fa-sort-down");
    document.querySelector(".accArrow").classList.toggle("fa-sort-up");
}
if (document.contains(accdropdownbtn)) {
    accdropdownbtn.addEventListener("click", ExpandDropdown);
}



// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.accdropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");

        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');

                document.querySelector(".accArrow").classList.toggle("fa-sort-down");
                document.querySelector(".accArrow").classList.toggle("fa-sort-up");
            }
        }
    }

    if (!event.target.matches('.search-dropbtn')) {

        const dropdowns = document.getElementsByClassName("search-dropdown-content");

        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('searchShow')) {
                openDropdown.classList.remove('searchShow');

                document.querySelector(".searchArrow").classList.toggle("fa-sort-down");
                document.querySelector(".searchArrow").classList.toggle("fa-sort-up");
            }
        }
    }

    if (!event.target.matches('.filter-dropbtn')) {

        const dropdowns = document.getElementsByClassName("filter-dropdown-content");

        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('filterShow')) {
                openDropdown.classList.remove('filterShow');


            }
        }
    }

}

//Drawer
const navSearch = document.querySelector(".Nav-Search");
const drawerLeft = document.querySelector(".Drawer-Left");
const drawerRight = document.querySelector(".Drawer-Right");
const drawerSearchbtn = document.querySelector("#drawer-searchbar_submit");
const drawerBackbtn = document.querySelector(".backbtn");
const drawerSearchInput = document.querySelector("#nav-search-searchbar_input");
const drawerClearbtn = document.querySelector(".clearbtn");
function ExpandSearch() {
    event.preventDefault();
    drawerLeft.style.display = "none";
    drawerRight.style.display = "none";
    navSearch.style.display = "flex"
    drawerSearchInput.focus();
}
function HideSearch() {
    event.preventDefault();
    drawerLeft.style.display = "flex";
    drawerRight.style.display = "flex";
    navSearch.style.display = "none"
}

function ClearInputField() {
    event.preventDefault();

    drawerSearchInput.value = "";
    drawerSearchInput.focus();
}
drawerSearchbtn.addEventListener("click", ExpandSearch);
drawerBackbtn.addEventListener("click", HideSearch);
drawerClearbtn.addEventListener("click", ClearInputField);




//Search Dropdown
const searchDropdownbtn = document.querySelector(".search-dropbtn");
const searchDropdown = document.querySelector(".search-dropdown-content");


function ExpandSearchDropdown() {

    searchDropdown.classList.toggle("searchShow");

    document.querySelector(".searchArrow").classList.toggle("fa-sort-down");
    document.querySelector(".searchArrow").classList.toggle("fa-sort-up");
}
if (document.contains(searchDropdownbtn)) {
    searchDropdownbtn.addEventListener("click", ExpandSearchDropdown);
}


const allSearch = document.querySelector(".all-search");

function AllTextDropdownSearch() {
    searchDropdownbtn.innerHTML = 'All<i class="fas fa-sort-down fa-fw searchArrow"></i>';
    document.querySelector(".searchArrow").classList.toggle("fa-sort-down");
    document.querySelector(".searchArrow").classList.toggle("fa-sort-up");
}
if (document.contains(searchDropdownbtn)) {
    allSearch.addEventListener("click", AllTextDropdownSearch);
}

const moviesSearch = document.querySelector(".movies-search");

function MoviesTextDropdownSearch() {
    searchDropdownbtn.innerHTML = 'Movies<i class="fas fa-sort-down fa-fw searchArrow"></i>';
    document.querySelector(".searchArrow").classList.toggle("fa-sort-down");
    document.querySelector(".searchArrow").classList.toggle("fa-sort-up");
}
if (document.contains(searchDropdownbtn)) {
    moviesSearch.addEventListener("click", MoviesTextDropdownSearch);
}

const tvshowsSearch = document.querySelector(".tvshows-search");

function TvShowsTextDropdownSearch() {
    searchDropdownbtn.innerHTML = 'TV Shows<i class="fas fa-sort-down fa-fw searchArrow"></i>';
    document.querySelector(".searchArrow").classList.toggle("fa-sort-down");
    document.querySelector(".searchArrow").classList.toggle("fa-sort-up");
}
if (document.contains(searchDropdownbtn)) {
    tvshowsSearch.addEventListener("click", TvShowsTextDropdownSearch);
}


const gamesSearch = document.querySelector(".games-search");

function GamesTextDropdownSearch() {
    searchDropdownbtn.innerHTML = 'Games<i class="fas fa-sort-down fa-fw searchArrow"></i>';
    document.querySelector(".searchArrow").classList.toggle("fa-sort-down");
    document.querySelector(".searchArrow").classList.toggle("fa-sort-up");

}
if (document.contains(searchDropdownbtn)) {
    gamesSearch.addEventListener("click", GamesTextDropdownSearch);
}


//Filter Dropdown
const filterDropdownbtn = document.querySelector(".filter-dropbtn");
const filterDropdown = document.querySelector(".filter-dropdown-content");


function ExpandFilterDropdown() {

    filterDropdown.classList.toggle("filterShow");

}
if (document.contains(filterDropdownbtn)) {
    filterDropdownbtn.addEventListener("click", ExpandFilterDropdown);
}



$(document).on('click', '.filter_container', function () {

    $('#filter_filter').val($(this).find("input[type=radio]").val())

});

$(document).on('click', '.logoutbtndropdown', function (event) {
    event.preventDefault();


});
$(document).on('click', '.logoutbtn', function (event) {
    event.preventDefault();


});



function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {

        window.location = "../Checklist/Includes/logout.inc.php";
    });


}
onLoad();
function onLoad() {
    gapi.load('auth2', function () {
        gapi.auth2.init();

    });
}










