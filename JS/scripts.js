//  Email verification   
$(document).ready(function(){ 


    $('#btn-submit').click(function(){   
      $(".error").hide();
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      var emailblockReg =
       /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        
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

  const numItemsToGenerate = 4; //how many gallery items you want on the screen
  const numImagesAvailable = 175135; //how many total images are in the collection you are pulling from
  const imageWidth = 375; //your desired image width in pixels
  const imageHeight = 375; //desired image height in pixels  

  function renderGalleryItem(randomNumber){
     fetch(`https://source.unsplash.com/random//${imageWidth}x${imageHeight}/?sig=${randomNumber}`) 
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

  function renderGalleryItems() {
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
  } else {
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