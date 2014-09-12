
//////////////    API Key  and   JavaScript Key    ////////////

$ (function() {

    var source = $("#template").html();
    var template = Handlebars.complie(source);

    var refreshView = function (data) {
        var html = template(data);
        $("#restaurant").html(html);
    };

    refreshView({});

    $.ajax("/api/restaurants").then(function (data) {
        refreshView({restaurants: data});
    });

    $(".output").on("click", "button", function (e) {
        var $button = $(this);
        var deleteFromDom = function () {
            $button.parents("tr").remove();
            };

        $.ajax("/api/restaurants/" + $button.data("code"), {type: 'DELETE'}).then(function (result){
            deleteFromDom();
        });
        return false;
        });

//    $.ajax("/endpoint", {type: 'POST', data{}}).then(
//        magic
//    )



});

