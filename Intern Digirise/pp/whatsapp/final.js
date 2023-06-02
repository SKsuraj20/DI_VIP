let tabsLis = document.querySelectorAll('.tabs li'),
    boxes = document.querySelectorAll('.content .box');

tabsLis.forEach((tab) => {
    //Add click for each li
    tab.addEventListener("click", function (e) {
        tabsLis.forEach((tab) => {
            //On click remove class Active from all Li
            tab.classList.remove("active");
        });
        //Add Class Active On the li 
        e.currentTarget.classList.add("active");
        boxes.forEach((box) => {
            //Display None for all content Divs on click
            box.classList.remove('active');
            //Select the div the contain the class of data-whatsapp and make it display flex
            document.querySelector('.' + e.currentTarget.dataset.whatsapp).classList.add('active');
        });
    });
});


(document.body || document.documentElement).addEventListener('click', function (event) {
    // If the element on which the click event occurs is not the setting box or setting btn, then hide it
    if ((event.target !== settingsBox) && (event.target !== settings))
        settingsBox.classList.remove('show');
}, false);
