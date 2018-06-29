describe('', function () {
    let targetHTML;
    beforeEach(() => {
        document.body.innerHTML = `<div id="target">
    <div class="nested target">
        <p>This is some text</p>
    </div>
    <div class="target">
        <p>Empty div</p>
    </div>
    <div class="inside">
        <span class="nested">Some more text</span>
        <span class="target">Some more text</span>
    </div>
</div>`;
        targetHTML = $('#target');
    });
    describe('', function () {
        it('should ', function () {
            let selectorOne = 'invalid';
            let selectorTwo = $('.inside');
            let oldHTML = targetHTML.html();
            nuke(selectorOne, selectorTwo);
            expect(targetHTML.html()).to.equal(oldHTML);
        });
        it('should ', function () {
            let selectorOne = $('.inside');
            let selectorTwo = 'invalid';
            let oldHTML = targetHTML.html();
            nuke(selectorOne, selectorTwo);
            expect(targetHTML.html()).to.equal(oldHTML);
        });
        it('should ', function () {
            let selector = $('.inside');
            let oldHTML = targetHTML.html();
            nuke(selector, selector);
            expect(targetHTML.html()).to.equal(oldHTML);
        });
        it('should ', function () {
            let selectorOne = $('.nested');
            let selectorTwo = $('.inside');
            let oldHTML = targetHTML.html();
            nuke(selectorOne, selectorTwo);
            expect(targetHTML.html()).to.equal(oldHTML);
        });
        it('should ', function () {
            let selectorOne = $('.nested');
            let selectorTwo = $('.target');
            let oldHTML = targetHTML.html();
            nuke(selectorOne, selectorTwo);
            expect(targetHTML.html()).to.not.equal(oldHTML);
        });
    })
});