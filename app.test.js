const { test, expect, beforeEach, afterEach } = require("@jest/globals");
document.body.innerHTML = '<div id="app"></div>'

//Default bomb plan
let defaultPlan = [
  [false, true, false],
  [true, true, true],
  [false, true, false],
];

let propagationTestPlan = [
    [true, true, true],
    [true, true, true],
    [true, true, true]
]
beforeEach(() => {
    require("./app");
})

test("Demineur global is not undefiend", () => {
  expect(window.Demineur).not.toBe(undefined);
});
test("Demineur plan set", () => {
  window.Demineur.setPlan(defaultPlan);
  expect(window.Demineur.plan).toBe(defaultPlan);
});
test("Bombs arround test", () => {
    window.Demineur.setPlan(defaultPlan);
    expect(window.Demineur.play(0,1)).toBe("2");
    expect(window.Demineur.play(1,1)).toBe("4");
    expect(window.Demineur.play(1,2)).toBe("2");
});

test("Bomb exploded", () => {
    window.Demineur.setPlan(defaultPlan);
    expect(window.Demineur.play(0,0)).toBe(-1);
    expect(window.Demineur.play(2,2)).toBe(-1);
});

test("Propagation Test", () =>  {
    window.Demineur.setPlan(propagationTestPlan);
    expect(window.Demineur.play(0,0)).toBe("0")
    expect(window.Demineur.plan).toEqual([["0","0","0"],["0","0","0"],["0","0","0"]])
})


// test("Demineur discovered cell", () => {
  
// });
