var count = 0;
var wurfel = 150;
var lastwurfel = 150;

window.onload = function () {
    for (let i = 0; i < wurfel; i++) {
        let number = getStartNumber();

        $("#wurfelcontainer").append(
            `<div class="col-1 wurfel active-wurfel" ><img class="wurfel-img" src="img/${number}.png" /></div>`
        );
    }
    window.scrollTo(0, document.body.scrollHeight);
};

function restart() {
    wurfel = 150;
    count = 0;
    lastwurfel = 150;
    $("#count").attr("value", count);
    $("#wurfel-count").attr("value", wurfel);
    $("#wurfelcontainer").empty();
    $("#wurfel-button").prop("disabled", false);
    $("#entfernen-button").prop("disabled", false);

    $("#tabelle").empty();
    $("#tabelle").append(`<tr>
    <th scope="row">0</th>
    <td>150</td>
</tr>`);

    for (let i = 0; i < wurfel; i++) {
        let number = getStartNumber();

        $("#wurfelcontainer").append(
            `<div class="col-1 wurfel active-wurfel" ><img class="wurfel-img" src="img/${number}.png" /></div>`
        );
    }
}

function wurfeln() {
    if (wurfel == 0) return;

    count++;

    $("#count").attr("value", count);

    if (lastwurfel !== wurfel) {
        entfernen();
    }

    if (wurfel == 0) {
        $("#wurfelcontainer").empty();
        $("#wurfelcontainer").append(
            `<div class="col-5" ><h1>Keine Würfel mehr!</h1></div>`
        );

        $("#wurfel-button").prop("disabled", true);
        $("#entfernen-button").prop("disabled", true);
    }

    $.each($(".active-wurfel"), function () {
        if (!isSix()) return;
        lastwurfel--;
        $(this).attr("class", "col-1 wurfel disabled-wurfel");
        $(this).html(`<img class="wurfel-img" src="img/6.png" />`);
    });
}

function entfernen() {
    if (lastwurfel == wurfel) return;
    $.each($(".disabled-wurfel"), function () {
        $(this).html(`<img  class="wurfel-img" src="img/hide.png" />`);
        $(this).attr("class", "col-1 wurfel hide-wurfel");
        wurfel--;
    });

    $("#wurfel-count").attr("value", wurfel);

    $("#tabelle").append(
        ` <tr>
        <th scope="row">${count}</th>
        <td>${wurfel}</td>
    </tr>`
    );

    if (wurfel == 0) {
        $("#wurfelcontainer").empty();
        $("#wurfelcontainer").append(
            `<div class="col-5" ><h1>Keine Würfel mehr!</h1></div>`
        );

        $("#wurfel-button").prop("disabled", true);
        $("#entfernen-button").prop("disabled", true);
    }
}

function getStartNumber() {
    return Math.floor(Math.random() * 5) + 1;
}

function isSix() {
    let number = Math.floor(Math.random() * 6) + 1;
    if (number == 6) {
        return true;
    } else {
        return false;
    }
}
