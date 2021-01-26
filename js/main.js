(() =>{
    const navHor = document.querySelector(".nav-hor")
    document.addEventListener("click", (event) =>{
        if(event.target.classList.contains("link-item") && !event.target.classList.contains("active") && (event.target.hash !== "")){
            navHor.querySelector(".active").classList.remove("active");
            event.target.classList.add("active");
            event.preventDefault();
            const hash = event.target.hash;
            // hide old 'section'
            document.querySelector(".section.active").classList.add("hide");
            document.querySelector(".section.active").classList.remove("active");
            // active new 'section'
            document.querySelector(hash).classList.add("active");
            document.querySelector(hash).classList.remove("hide");
        }
    })
})();


// Hide All Section, Except ACITVE
(() => {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) =>{
        if (!section.classList.contains("active")){
            section.classList.add("hide");
        }
    })
})();

// // Navigation Menu
// (() =>{
//     const hamburgerBtn = document.querySelector(".hamburger-btn"),
//     navMenu = document.querySelector(".nav-menu"),
//     closeNavBtn = navMenu.querySelector(".close-nav-menu");

//     hamburgerBtn.addEventListener("click", showNavMenu);
//     closeNavBtn.addEventListener("click", hideNavMenu);

//     function showNavMenu(){
//         navMenu.classList.add("open");
//     }
//     function hideNavMenu(){
//         navMenu.classList.remove("open");
//         fadeOutEffect();
//     }
//     function fadeOutEffect(){
//         document.querySelector(".fade-out-effect").classList.add("active");
//         setTimeout(() =>{
//             document.querySelector(".fade-out-effect").classList.remove("active");
//         }, 300)
//     }

//     // Attach an event handler to document
//     document.addEventListener("click", (event) =>{
//         if(event.target.classList.contains('link-item')){
//             if(event.target.hash !== ""){
//                 event.preventDefault();
//                 const hash = event.target.hash;
//                 // deactive existing active 'section'
//                 document.querySelector(".section.active").classList.add("hide");
//                 document.querySelector(".section.active").classList.remove("active");
//                 // active new 'section'
//                 document.querySelector(hash).classList.add("active");
//                 document.querySelector(hash).classList.remove("hide");
//                 // deactive existing active navigation menu 'link-item'
//                 navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
//                 navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
                
//                 if(navMenu.classList.contains("open")){
//                     // active new nav menu 'link-item'
//                     event.target.classList.add("active", "inner-shadow");
//                     event.target.classList.remove("outer-shadow", "hover-in-shadow");

//                     hideNavMenu();
//                 }
//                 else{
//                     let navItems = navMenu.querySelectorAll(".link-item");
//                     navItems.forEach((item) =>{
//                         if(hash == item.hash){
//                             // active new nav menu 'link-item'
//                             item.classList.add("active", "inner-shadow");
//                             item.classList.remove("outer-shadow", "hover-in-shadow");
//                         }
//                     })
//                     fadeOutEffect();
//                 }
//             }
//         }
//     })
// })();

// About Section Tabs

(() =>{
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", ()=>{
        if(event.target.classList.contains("tab-item") && !event.target.classList.contains("activate")){
            const target = event.target.getAttribute("data-target");
            tabsContainer.querySelector('.active').classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow");
            aboutSection.querySelector('.tab-content.active').classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();


function bodyScrollingToggle(){
    document.body.classList.toggle("stop-scrolling");
}

// Portfolio Filter and Popup 
(() =>{
    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    // Filter
    filterContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("filter-item") && !event.target.classList.contains("active")){
            
            // deactive active 'filter-item'
            filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
            event.target.classList.add("active", "outer-shadow");

            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) =>{
                if(target === item.getAttribute("data-category") || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    // click portfolio
    portfolioItemsContainer.addEventListener("click", (event)=>{
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // Get the portfolioItem Index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-media").children;

            // screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            // convert ss into array
            // screenshots = screenshots.split(",");
            if(screenshots.length === 1){
                prevBtn.style.display="none";
                nextBtn.style.display="none";
            }
            else{
                prevBtn.style.display="block";
                nextBtn.style.display="block";
            }
            slideIndex = 0;
            popupToggle();
            // Clean Popup Media first
            document.querySelector(".pp-media").innerHTML = "";
            // addAllMedia();
            popupSlideshow();
            popupDetails();
        }
    })

    // Close Button
    closeBtn.addEventListener("click", ()=>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })
    // Next Slide
    nextBtn.addEventListener("click", () =>{
        if (slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
    })
    // Prev Slide
    prevBtn.addEventListener("click", () =>{
        if (slideIndex === 0){
            slideIndex = screenshots.length-1;
        }
        else{
            slideIndex--;
        }
        popupSlideshow();
    })
    // Detail Button
    projectDetailsBtn.addEventListener("click", () =>{
        popupDetailsToggle();
    })

    // Function
    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow(){
        // const imgSrc = screenshots[slideIndex];
        // const popupImg = popup.querySelector(".pp-img");
        // popupImg.src = imgSrc;
        document.querySelector(".pp-media").innerHTML = "";
        const clone = screenshots[slideIndex].cloneNode(true);
        document.querySelector(".pp-media").appendChild(clone);
        // deactive loader animation after popupImg loaded
        clone.onload = () =>{
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + (screenshots.length);     
    }

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
            // popup.scrollTo(0, 0);
        }
        else{
            projectDetailsContainer.classList.add("active");
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, 0);
        }
    }

    function popupDetails(){
        // if details no exist
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display = "none";
            return; 
        }
        projectDetailsBtn.style.display = "block";
        // get project details
        const detail = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = detail;
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }

    // Popup Add media
    function addAllMedia(){
        for (i = 0; i < screenshots.length - 1; i++) {
            const clone = screenshots[i].cloneNode(true);
            document.querySelector(".pp-media").appendChild(clone);
          }
    }

})();