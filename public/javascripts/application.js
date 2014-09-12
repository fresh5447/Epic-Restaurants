$ (function() {
//Restaurant List Handlebars Template
    var source = $("#restaurant").html();
    var restaurant = Handlebars.compile(source);

    var refreshView = function (data) {
        var html = restaurant(data);
        $(".resDivContainer").html(html);
    };

    refreshView({});

//    //Menu List Handlebars Template
//    var sourceTwo = $("#templateTwo").html();
//    var templateTwo = Handlebars.compile(sourceTwo);
//
//    var refreshView = function (data) {
//        var html = templateTwo(data);
//        $("#restaurant").html(html);
//    };
//
//    refreshView({});


    $.ajax("/api/restaurants").then(function (data) {
        refreshView({restaurants: data});

    });

//    $(".output").on("click", "button", function (e) {
//        var $button = $(this);
//        var deleteFromDom = function () {
//            $button.parents("tr").remove();
//            };

//        $.ajax("/api/restaurants/" + $button.data("code"), {type: 'DELETE'}).then(function (result){
//            deleteFromDom();
//        });
//        return false;
//        });

//    $.ajax("/", {type: 'POST', data{menu}}).then(
//        refreshViewTwo({menuList: data})
//    )};

    $('#resAdder').on("click", function(){
        $('#resForm').toggle();
    });


});

