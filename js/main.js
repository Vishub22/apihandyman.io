function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

$(window).scroll(function(){
  if($('.row-banner').length > 0) {
    $('.main-navbar').toggleClass('scrolled', $(this).scrollTop() > $('.row-banner').height()-55)
  }
});

function showPrivacyMessage() {
  if(!localStorage.getItem('privacyPolicyAccepted')) {
    $('.privacy-message').toggleClass('d-none')
  }
}

function acceptPrivacyPolicy() {
  if(!localStorage.getItem('privacyPolicyAccepted')) {
    localStorage.setItem('privacyPolicyAccepted', true)
  }
  $('.privacy-message').toggleClass('d-none')
}

function goToPage(input) {
  const targetPage = input.value
  const maxPage = input.dataset.last
  const currentPage = input.dataset.current
  if( targetPage && 
      targetPage > 0 &&
      targetPage <= maxPage &&
      targetPage != currentPage )
    {
        let targetUrl
        if(targetPage != 1) {
          targetUrl = input.dataset.url.replace('NUMBER', targetPage)
        }
        else {
          targetUrl = input.dataset.firsturl
        }
        window.location = targetUrl
    }
    else {
      input.value = ""
    }
}

//Enabling tooltip everywhere
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
  $("[data-toggle='tooltip']").click(function(){
    $("[data-toggle='tooltip']").tooltip('hide');
  });
})

$( document ).ready(function() {

  showPrivacyMessage()

  const clipboardTextCopy = new ClipboardJS('.text-copy', {
    target: function(trigger) {
      return trigger
    }
  })

  clipboardTextCopy.on('success', function(e) {
    console.log('copied from ', e)
  });

  clipboardTextCopy.on('error', function(e) {
    console.error('🙇🏻‍♂️ something unexpectedly went wrong while copying with ClipboardJS 🙇🏻‍♂️')
    console.error('Action:', e.action)
    console.error('Trigger:', e.trigger)
  })

  // Execute a function when the user releases a key on the keyboard
  const navPageInput = document.getElementById("nav-page-input");
  if(navPageInput){
    navPageInput.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault()
        goToPage(event.srcElement)
      }
    });
    navPageInput.addEventListener("focusout", function(event){
      goToPage(event.srcElement)
    });
  }
  
})