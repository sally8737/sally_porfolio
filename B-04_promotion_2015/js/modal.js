// //getting modal opening buttons
var modalBtns = document.querySelectorAll('.modal-open')

modalBtns.forEach(function(btn) {
  btn.onclick = function() {
    var modal = btn.getAttribute('data-modal')

    document.getElementById(modal).style.display = 'block'
  }
})

var closeBtns = document.querySelectorAll('.modal-close')

closeBtns.forEach(function(btn) {
  btn.onclick = function() {
    var modal = (btn.closest('.modal').style.display = 'none')
  }
})

window.onclick = function(e) {
  
  if (e.target.className === 'modal') {
    e.target.style.display = 'none'
  }
}


// $(function () {
//   function ModalOpen() {
//     $(this).parent().next().attr('style', 'display: block;')
//   }
//   function ModalClose() {
//     $(this).parents('.modal').attr('style', '')
//   }
//   $('.modal-body > img').click(function(e){
//     e.stopPropagation();
//   });
//   //listener for buttons
//   $('.modal-open').on('click', ModalOpen);
//   $('.modal-content').on('click', ModalClose)

// })
