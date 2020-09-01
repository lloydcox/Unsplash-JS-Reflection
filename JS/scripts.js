//  Email verification   
$(document).ready(function(){ 


    $('#btn-submit').click(function(){   
      $(".error").hide();
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      var emailblockReg =
       /^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)([\w-]+\.)+[\w-]{2,4})?$/;
        
      var emailaddressVal = $(".email").val();
      if(emailaddressVal == '') {
        $(".email").after('<span class="error">Please enter your email address.</span>')
        hasError = true;
      }  
      else if(!emailReg.test(emailaddressVal)) {
        $(".email").after('<span class="error">Enter a valid email address.</span>')
        hasError = true;
      }  
      else if(!emailblockReg.test(emailaddressVal)) {
        $(".email").after('<span class="error">No yahoo, gmail or hotmail emails.</span>')
        hasError = true;
      }  
        else {
    //   Move email to confimred email section 
            
            $(".email-checked").append($(".email")); 
            $(".email").toggleClass("email email_v");
            $(".email_v").prop('disabled', true)

       //   Create replacement email
            let new_email = document.createElement('input');
            new_email.classList.add('email');
            new_email.placeholder = "Enter your email";
            $( ".input-selection .confirm").before(new_email);
        }
    });

//   Generate Images on Load 

  const numItemsToGenerate = 8; //how many gallery items you want on the screen
  const numImagesAvailable = "145"; //how many total images are in the collection you are pulling from
  const imageWidth = 225; //your desired image width in pixels
  const imageHeight = 225; //desired image height in pixels
  const collectionID = 894; //the collection ID from the original url

  function renderGalleryItem(randomNumber){
     fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomNumber}`) 
     .then((response)=> {    
      let galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');
      galleryItem.setAttribute("name", "image");
      galleryItem.innerHTML = `
        <img class="gallery-image" src="${response.url}" alt="gallery image"/>
      `;
      $( ".pictures" ).prepend(galleryItem);
    });
  }
  
  for(let i=0;i<numItemsToGenerate;i++){
    let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
    renderGalleryItem(randomImageIndex);
  }

//   Randomise functions 

  function removeGalleryItem(){ 
    $('.gallery-item').remove();
    $('.image_box').remove();
  }

  function renderGalleryItems () {
    for(let i=0;i<numItemsToGenerate;i++){
      let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
      renderGalleryItem(randomImageIndex);
    }
  }
  
  document.getElementById("randomise").addEventListener("click", removeGalleryItem);
  document.getElementById("randomise").addEventListener("click", renderGalleryItems);  

// Move Selected pictures 

  $(document).on('click', ".gallery-item", function() {
    $(".images_selected").append(this);
    $(this).addClass("chosen");
    $(this).toggleClass("gallery-item");
    $(".error").remove();
  });

  $(document).on('click', ".gallery-item", function() {
    $(".pictures").append(renderGalleryItem);
  });

// Create the Array of images to send in an email 

    // var user_selection = [];    
    // var user_email = $("[user_email^='.email[]']").map(function(){return $(this).val();
    // }).get();
    // var user_images = $("[user_images^='.gallery-item[]']").map(function(){return $(this).val();
    // }).get();
    // $('.btn-submit').on('click', function(e) {
    //     e.preventDefault();
    //     user_email.push($(this).val);
    // });
    // $('.gallery-item').on('click', function(e) {
    //     e.preventDefault();
    //     user_images.push($(this).val);              
    // });   
    // //    simulate click
    //    setTimeout(() => combineArray(), 1000);       
    //    function combineArray() {
    //      user_selection.push(user_email);
    //      user_selection.push(user_images);
    //      console.log(user_selection);
    //    }

       function createImageBox(){
        const imageBox = document.createElement('div');
        imageBox.classList.add('image_box');
        $(".image_container").append(imageBox);
        $(".image_box").append($(".email_v"));
        $(".image_box").append($(".chosen"));   
    }        

    $('#selection-confirm').on('click', function() {  
        $(".error").hide();
        if( $.trim( $('.email-checked').html() ).length == 0 ) {
            return $("#selection-confirm").after('<span class="error">Please enter and confirm an email address.</span>');            
    }
        else if( $.trim( $('.images_selected').html() ).length == 0 ){  
            return $("#selection-confirm").after('<span class="error">Please select atleast one image.</span>');
    }   else {
        $(".error").hide();
        $(".chosen").toggleClass("final_image")
        $(".email_v").toggleClass("email_f")
        createImageBox() 
        $(".image_box").toggleClass("final")
        $(".image_box").toggleClass("image_box")
        $(".email_v").toggleClass("email_v")
        $(".chosen").toggleClass("chosen")
 
    }
      });

    $('.submit').on('click', function(e) { 
        if( $.trim( $('.image_container').html() ).length == 0 ) {
            return $("#selection-confirm").after('<span class="error">Please enter and confirm an email address and image(s).</span>');
    }   else {
        $(".error").hide();
        e.preventDefault();
        // combineArray();
        removeGalleryItem();
        renderGalleryItems(); 
        $(".final").remove();
    } 
     });
});