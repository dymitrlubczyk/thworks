import Expression from "../src/expression";


test('Expression length', () => {

    const p=new Expression('(1.5x^90)-(1x^2.5)+(2x)+(1)-(0.5x^-27)');

    expect(p.length).toBe(5);
});


test('Add 1 to 2', () => {

    const p=new Expression('(1x^0)');
    const p2=new Expression('(2x^0)');
    const expected=new Expression('(3x^0)');
    const result=p.add(p2);

    expect(result.equals(expected)).toBe(true);
});

test('Add three expressions', () => {

    const p=new Expression('(1x^0)');
    const p2=new Expression('(2x^0)');
    const p3=new Expression('(3x^0)');
    const expected=new Expression('(6x^0)');
    const result=p.add(p2).add(p3);

    expect(result.equals(expected)).toBe(true);
});

test('Add x to x', () => {

    const p=new Expression('(1x^1)');
    const expected=new Expression('(2x^1)');
    const result=p.add(p);

    expect(result.equals(expected)).toBe(true);
});

test('Add 2x to x', () => {

    const p=new Expression('(1x^1)');
    const p2=new Expression('(2x^1)');
    const expected=new Expression('(3x^1)');
    const result=p.add(p2);

    expect(result.equals(expected)).toBe(true);
});

test('Add x-1 to 1-(x^-1)', () => {

    const p=new Expression('(1x^1)-(1x^0)');
    const p2=new Expression('(1x^0)-(1x^-1)');
    const expected=new Expression('(1x^1)-(1x^-1)');
    const result=p.add(p2);

    expect(result.equals(expected)).toBe(true);
})

test('Add x to -x', () => {

    const p=new Expression('(1x^1)');
     const p2=new Expression('(-1x^1)');
    const expected=new Expression();
    const result=p.add(p2);

    expect(result.equals(expected)).toBe(true);
});

test('Add complex expressions', () => {

    const p=new Expression('(1.5x^90)-(1x^2.5)+(1x^1)');
    const p2=new Expression('(1x^1)+(1x^0)-(0.5x^-27)')
    const expected=new Expression('(1.5x^90)-(1x^2.5)+(2x^1)+(1x^0)-(0.5x^-27)');
    const result=p.add(p2);

    expect(result.equals(expected)).toBe(true);
});

test('Add three complex expressions', () => {

    const p=new Expression('(1.5x^90)-(1x^2.5)+(1x^1)');
    const p2=new Expression('(1x^1)+(1x^0)-(0.5x^-27)');
    const p3=new Expression('(1x^1)')
    const expected=new Expression('(1.5x^90)-(1x^2.5)+(3x^1)+(1x^0)-(0.5x^-27)');
    const result=p.add(p2).add(p3);

    expect(result.equals(expected)).toBe(true);
});

test('Add to 0 expressions', () => {

    const p=new Expression('(1.5x^90)-(1x^2.5)+(1x^1)');
    const empty=new Expression();
    const expected=new Expression('(1.5x^90)-(1x^2.5)+(1x^1)');
    const result=p.add(empty);

    expect(result.equals(expected)).toBe(true);
});

test('Add multiple expressions that sums to 0', () => {

    const p1=new Expression('(1.5x^90)-(1x^2.5)+(1x^1)');
    const p2=new Expression('(-1.5x^90)+(1x^2.5)-(1x^1)');
    const p3=new Expression('(1x^1)');
    const p4=new Expression('(1.5x^90)-(1x^2.5)');
    const p5=new Expression('(-1.5x^90)+(1x^2.5)-(1x^1)');

    const expected=new Expression();
    const result=p1.add(p2).add(p3).add(p4).add(p5);

    expect(result.equals(expected)).toBe(true);
});

test('Add 0 to 0', () => {

    const p=new Expression();
    const expected=new Expression();
    const result=p.add(p);

    expect(result.equals(expected)).toBe(true);
});