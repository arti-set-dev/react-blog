import { ResolveOptions } from "webpack";

export function buildReasolvers(): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
    }
}