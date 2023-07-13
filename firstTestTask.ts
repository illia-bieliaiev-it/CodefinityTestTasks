type Rule = {
    key: number;
    value: string;
};

class FizzBuzz {
    private rules: Rule[];

    constructor(rules: Rule[]) {
        this.rules = rules;
    }

    public execute(start: number, end: number): void {
        for (let i = start; i <= end; i++) {
            let output = '';

            for (const rule of this.rules) {
                if (i % rule.key === 0) {
                    output += rule.value;
                }
            }

            console.log(output || i);
        }
    }
}


const rules: Rule[] = [
    { key: 3, value: 'Fizz' },
    { key: 5, value: 'Buzz' },
];

const fizzBuzz = new FizzBuzz(rules);
fizzBuzz.execute(1, 100);