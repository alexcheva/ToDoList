// check off to-dos
$("#container").on("keypress", "input", function(event)
{
if(event.which === 13){
	var value = $(this).val();
	$(this).val("");
	$("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span>"+ value + "</li>");
}
});

$("ul").on("click", "li", function(){
$(this).toggleClass("completed");
});

$("ul").on("click", "span", function (e) {
	$(this).parent().fadeOut(500, function (){
		$(this).remove();
	});
	e.stopPropagation();
});

$(".fa-plus").click(function(){
	$("input").fadeToggle("hide");
	$("body").append("<div id='container'><h1>To-Do List <i class='fa fa-plus' aria-hidden='true'></i></h1><input type='text' placeholder='Add New To-Do'><ul></ul>");
})
