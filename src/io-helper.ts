import * as core from '@actions/core';
import { getOptional, getBooleanInput } from '@yakubique/atils/dist';

enum Inputs {
    Input = 'input',
    Key = 'key',
    Type = 'type',
    FromFile = 'from_file',
    ToFile = 'to_file'
}

export enum Types {
    FlatJSON = 'flat-json',
    NestedJSON = 'nested-json'
}


export interface ActionInputs {
    input: string;
    type: string;
    key: string;
    fromFile: boolean;
    toFile: boolean;
}

export function getInputs(): ActionInputs {
    const result: ActionInputs | any = {};

    result.input = `${core.getInput(Inputs.Input, { required: true })}`;

    result.type = getOptional(Inputs.Type, Types.FlatJSON, { required: false });

    if (result.type == Types.NestedJSON) {
        result.key = core.getInput(Inputs.Key, { required: true });
    }

    result.fromFile = getBooleanInput(Inputs.FromFile, { required: false });
    result.toFile = getBooleanInput(Inputs.ToFile, { required: false });

    return result;
}
