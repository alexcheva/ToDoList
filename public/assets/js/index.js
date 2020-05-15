// check off to-dos
// $("input[type='text']").keypress(function(event)
// {
// if(event.which === 13){
// 	var value = $(this).val();
// 	$(this).val("");
// 	// $("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span>"+ value + "</li>");
// }
// });

$("ul").on("click", "li", function(){
$(this).toggleClass("completed");
});

// $("ul").on("click", "span", function (e) {
// 	$(this).parent().fadeOut(500, function (){
// 		$(this).remove();
// 	});
// 	e.stopPropagation();
// });

$(".fa-plus").click(function(){
	$("input").fadeToggle("hide");
})
