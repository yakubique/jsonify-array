import { buildOutput, inputJson, outputJson } from '@yakubique/atils/dist';
import * as core from '@actions/core';
import { ActionInputs, getInputs, Types } from './io-helper';

enum Outputs {
    result = 'result',
}

const setOutputs = buildOutput(Outputs);

(async function run() {
    try {
        const inputs: ActionInputs = getInputs();
        let input = [] as any[];

        input = inputJson(inputs.input, inputs.fromFile);

        const result = [] as string[];

        for (let i = 0; i < input.length; i++) {
            const item = input[i];

            if (inputs.type === Types.NestedJSON.toString()) {
                item[inputs.key] = JSON.stringify(item[inputs.key]);
                result.push(item);
            } else {
                result.push(JSON.stringify(item));
            }

        }

        let res = outputJson(result, inputs.toFile);
        setOutputs({ result: res });

        core.info('Success!');
    } catch (err: any) {
        core.setFailed(err.message);
    }
})();
