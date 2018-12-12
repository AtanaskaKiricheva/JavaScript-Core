describe("Sumator Class", function () {
    let obj;
    beforeEach(function () {
        obj = new Calculator();
    });

    //add
    describe('add tests', function () {
        it('Should work with no parameters', function () {
            obj.add();
            expect(obj.toString()).to.equal('');
        });
        it('empty array tests', function () {
            expect(obj.toString()).to.equal('empty array');
        });
        it('Should data many items correctly', function () {
            obj.add('pesho');
            obj.add('gosho');
            obj.add('sasho');
            expect(obj.toString()).to.equal('pesho -> gosho -> sasho');
        });
        it('Should data different kinds of params', function () {
            obj.add(5);
            obj.add([]);
            obj.add({test: 'hi'});
            expect(obj.toString()).to.equal('5 ->  -> [object Object]');
        });
    });

    //divideNums
    describe('divideNums tests', function () {
        it('initial num should be 0', function () {
            expect(obj.divideNums()).to.equal('undefined', 'Expected empty call to equal undefined');
        });
        it('should ignore strings', function () {
            obj.add('pesho');
            expect(obj.divideNums()).to.equal('undefined', 'Expected string division to return string');
        });
        it('should multiply num array correctly(forward)', function () {
            obj.add(10);
            obj.add(5);
            obj.add(2);
            expect(obj.divideNums()).to.equal(1, 'Expected to return floating point');
        });
        it('should multiply num array correctly(forward)', function () {
            obj.add(-10);
            obj.add(5);
            obj.add(2);
            expect(obj.divideNums()).to.equal(-1, 'Expected to return floating point');
        });
        it('should work with fractions', function () {
            obj.add(5.1);
            obj.add(1);
            obj.add(2);
            expect(obj.divideNums()).to.be.closeTo(2.55, 1.00, 'Expected to return floating point');
        });
        it('should work with fractions', function () {
            obj.add(1);
            obj.add(0.5);
            obj.add(2);
            expect(obj.divideNums()).to.equal(1, 'Expected to return floating point');
        });
        it('fractions border case', function () {
            obj.add(1.1);
            obj.add(1.1);
            obj.add(1.1);
            obj.add(0);
            expect(obj.divideNums()).to.be.equal('Cannot divide by zero', 'Expected zero division to be equal to Infinity');
        });
        it('fractions border case', function () {
            obj.add(0);
            obj.add(1.1);
            obj.add(1.1);
            obj.add(1.1);
            expect(obj.divideNums()).to.be.equal(0, 'Expected zero division to be equal to Infinity');
        });
        it('fractions border case', function () {
            obj.add(1.1);
            obj.add(1.1);
            obj.add('pesho');
            obj.add(1.1);
            obj.add(0);
            expect(obj.divideNums()).to.be.equal('Cannot divide by zero', 'Expected zero division to be equal to Infinity');
        });
        it('should extract only numbers from the array', function () {
            obj.add(1);
            obj.add([]);
            obj.add("three");
            obj.add({});
            obj.add(4);
            expect(obj.divideNums()).to.be.closeTo(0.25, 1.00, 'Expected to return mixed data');
        });
    });

    //orderBy
    describe('orderBy tests', function () {
        it('Should be empty', function () {
            obj.orderBy();
            expect(obj.orderBy()).to.equal('empty')
        });
        it('Should order strings', function () {
            obj.add('gosho');
            obj.add('pesho');
            obj.add('atanas');
            expect(obj.orderBy()).to.equal("'atanas', 'gosho', 'pesho'");
        });
        it('Should order numbers', function () {
            obj.add(5);
            obj.add(1);
            obj.add(10);
            expect(obj.orderBy()).to.equal('1, 5, 10');
        });
        it('Should order mixed data', function () {
            obj.add('5');
            obj.add([]);
            obj.add(-5);
            obj.add({test: 'hi'});
            expect(obj.orderBy()).to.equal('[], -5, \'5\', { test: \'hi\' }');
        });
    });
});