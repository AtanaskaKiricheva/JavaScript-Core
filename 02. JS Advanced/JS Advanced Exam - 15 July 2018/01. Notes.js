function addSticker() {

    let titleBox = $('.title');
    let contentBox = $('.content');
    let stickerList = $('#sticker-list');

    if (titleBox.val() !== "" && contentBox.val() !== '') {
        let remove = $('<a class="button">x</a>');
        let li = $(`<li class="note-content"></li>`)
            .append(remove)
            .append($(`<h2>${titleBox.val().trim()}</h2>`))
        
            .append($(`<p>${contentBox.val().trim()}</p>`));
        li.appendTo(stickerList);
        remove.on('click', function () {
            $(this).parent().remove();
        });
        titleBox.val('');
        contentBox.val('');
    }
}