function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);
    let product = $('.custom-select');
    let price = $('#price');
    let quantity = $('#quantity');
    let inventory = $('.display');
    let capacity = $('#capacity');
    let sum = $('#sum');
    let totalSum = 0;
    let currentCapacity = 0;

    product.keyup(function () {
        if (product.val() !== '') {
            $('#submit').prop('disabled', false)
        }else{
            $('#submit').prop('disabled', true)
        }
    });
    $('#submit').on('click',function () {
        if(Number(capacity.val()) + Number(quantity.val()) > 150){
            quantity.val(150 - Number(capacity.val()));
        }
        let li = $('<li>').text(`Product: ${product.val()} Price: ${price.val()} Quantity: ${quantity.val()}`);

        inventory.append(li);
        currentCapacity += Number(quantity.val());
        totalSum += Number(price.val());
        product.val('');
        price.val('1');
        quantity.val('1');

        sum.val(totalSum);
        capacity.val(currentCapacity);
        if(currentCapacity >= 150){
            capacity.addClass('fullCapacity');
            capacity.val('full');
            $('#submit').attr('disabled',true);
            product.attr('disabled',true);
            price.attr('disabled',true);
            quantity.attr('disabled',true);
        }
    });
}