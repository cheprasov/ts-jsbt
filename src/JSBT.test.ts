import { JSBT } from './JSBT';

describe('JSBT', () => {
    describe('encode', () => {
        it('should encode value correctly', () => {
            const obj1 = {
                foo: 'bar',
                12: 42,
                children: [
                    {
                        user: 'Alex',
                        age: 38,
                        hobby: [1, 2, 3, 4, 5],
                    },
                    {
                        user: 'Alex',
                        age: 38,
                        hobby: [1, 2, 3, 4, 5],
                    },
                    {
                        user: 'Alex',
                        age: 38,
                        hobby: [1, 2, 3, 4, 5],
                    },
                    {
                        user: 'Alex',
                        age: 38,
                        hobby: [1, 2, 3, 4, 5],
                    },
                    {
                        user: 'Alex',
                        age: 38,
                        hobby: [1, 2, 3, 4, 5],
                    },
                    {
                        user: 'Alex',
                        age: 38,
                        hobby: [1, 2, 3, 4, 5],
                    },
                ],
            };
            const obj = [
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"2 Brothers Dinning Limited","city":"Birmingham","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"A-ZFabrication ltd","city":"Bexleyheath","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"ABS TAUNTON LTD trading as India Gate","city":"Bridgwater","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"2 Brothers Dinning Limited","city":"Birmingham","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"A-ZFabrication ltd","city":"Bexleyheath","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"ABS TAUNTON LTD trading as India Gate","city":"Bridgwater","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"2 Brothers Dinning Limited","city":"Birmingham","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"A-ZFabrication ltd","city":"Bexleyheath","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"ABS TAUNTON LTD trading as India Gate","city":"Bridgwater","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"2 Brothers Dinning Limited","city":"Birmingham","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"A-ZFabrication ltd","city":"Bexleyheath","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"ABS TAUNTON LTD trading as India Gate","city":"Bridgwater","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"2 Brothers Dinning Limited","city":"Birmingham","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"A-ZFabrication ltd","city":"Bexleyheath","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"ABS TAUNTON LTD trading as India Gate","city":"Bridgwater","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"2 Brothers Dinning Limited","city":"Birmingham","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"A-ZFabrication ltd","city":"Bexleyheath","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"ABS TAUNTON LTD trading as India Gate","city":"Bridgwater","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"2 Brothers Dinning Limited","city":"Birmingham","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"A-ZFabrication ltd","city":"Bexleyheath","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"ABS TAUNTON LTD trading as India Gate","city":"Bridgwater","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
{"date":"2023-09-18T19:01:52.690Z","type":"added","data":{"company":"2 Brothers Dinning Limited","city":"Birmingham","county":"","tiers":["Worker (A rating) - Skilled Worker"]}},
];
            const jsbt = JSBT.encode(obj);
            const json = JSON.stringify(obj);
//            console.log('JSBT', 'len', jsbt.length, '\n', jsbt, '\n', btoa(jsbt), '\n', JSON.stringify(jsbt));
  //          console.log('JSON', 'len', json.length, '\n', json, '\n', btoa(json), '\n', JSON.stringify(json));
            console.log('JSBT', 'len', jsbt.length, '\n', jsbt, '\n');
            console.log('JSON', 'len', json.length, '\n', '\n');

        });
    });
});
