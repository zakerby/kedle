"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenizer_1 = require("./tokenizer");
const parser_1 = require("./parser");
const transformer_1 = require("./transformer");
const code_generator_1 = require("./code_generator");
/**
 * ============================================================================
 *                                  (۶* ‘ヮ’)۶”
 *                         !!!!!!!!THE COMPILER!!!!!!!!
 * ============================================================================
 */
/**
 * FINALLY! We'll create our `compiler` function. Here we will link together
 * every part of the pipeline.
 *
 *   1. input  => tokenizer   => tokens
 *   2. tokens => parser      => ast
 *   3. ast    => transformer => newAst
 *   4. newAst => generator   => output
 */
function compiler(input) {
    let tokens = tokenizer_1.tokenizer(input);
    let ast = parser_1.parser(tokens);
    let newAst = transformer_1.transformer(ast);
    let output = code_generator_1.codeGenerator(newAst);
    // and simply return the output!
    return output;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXNDO0FBQ3RDLHFDQUFnQztBQUNoQywrQ0FBMEM7QUFDMUMscURBQStDO0FBRS9DOzs7OztHQUtHO0FBRUg7Ozs7Ozs7O0dBUUc7QUFFSCxrQkFBa0IsS0FBSztJQUNyQixJQUFJLE1BQU0sR0FBRyxxQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLElBQUksR0FBRyxHQUFNLGVBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixJQUFJLE1BQU0sR0FBRyx5QkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLElBQUksTUFBTSxHQUFHLDhCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFbkMsZ0NBQWdDO0lBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDaEIsQ0FBQyJ9