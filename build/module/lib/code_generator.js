/**
 * ============================================================================
 *                               ヾ（〃＾∇＾）ﾉ♪
 *                            THE CODE GENERATOR!!!!
 * ============================================================================
 */
/**
 * Now let's move onto our last phase: The Code Generator.
 *
 * Our code generator is going to recursively call itself to print each node in
 * the tree into one giant string.
 */
export function codeGenerator(node) {
    // We'll break things down by the `type` of the `node`.
    switch (node.type) {
        // If we have a `Program` node. We will map through each node in the `body`
        // and run them through the code generator and join them with a newline.
        case 'Program':
            return node.body.map(codeGenerator)
                .join('\n');
        // For `ExpressionStatement` we'll call the code generator on the nested
        // expression and we'll add a semicolon...
        case 'ExpressionStatement':
            return (codeGenerator(node.expression) +
                ';' // << (...because we like to code the *correct* way)
            );
        // For `CallExpression` we will print the `callee`, add an open
        // parenthesis, we'll map through each node in the `arguments` array and run
        // them through the code generator, joining them with a comma, and then
        // we'll add a closing parenthesis.
        case 'CallExpression':
            return (codeGenerator(node.callee) +
                '(' +
                node.arguments.map(codeGenerator)
                    .join(', ') +
                ')');
        // For `Identifier` we'll just return the `node`'s name.
        case 'Identifier':
            return node.name;
        // For `NumberLiteral` we'll just return the `node`'s value.
        case 'NumberLiteral':
            return node.value;
        // For `StringLiteral` we'll add quotations around the `node`'s value.
        case 'StringLiteral':
            return '"' + node.value + '"';
        // And if we haven't recognized the node, we'll throw an error.
        default:
            throw new TypeError(node.type);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZV9nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvZGVfZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBOzs7OztHQUtHO0FBRUg7Ozs7O0dBS0c7QUFFSCxNQUFNLHdCQUF3QixJQUFJO0lBRWhDLHVEQUF1RDtJQUN2RCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVsQiwyRUFBMkU7UUFDM0Usd0VBQXdFO1FBQ3hFLEtBQUssU0FBUztZQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7aUJBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQix3RUFBd0U7UUFDeEUsMENBQTBDO1FBQzFDLEtBQUsscUJBQXFCO1lBQ3hCLE1BQU0sQ0FBQyxDQUNMLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUM5QixHQUFHLENBQUMsb0RBQW9EO2FBQ3pELENBQUM7UUFFSiwrREFBK0Q7UUFDL0QsNEVBQTRFO1FBQzVFLHVFQUF1RTtRQUN2RSxtQ0FBbUM7UUFDbkMsS0FBSyxnQkFBZ0I7WUFDbkIsTUFBTSxDQUFDLENBQ0wsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLEdBQUc7Z0JBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO3FCQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNiLEdBQUcsQ0FDSixDQUFDO1FBRUosd0RBQXdEO1FBQ3hELEtBQUssWUFBWTtZQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRW5CLDREQUE0RDtRQUM1RCxLQUFLLGVBQWU7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFcEIsc0VBQXNFO1FBQ3RFLEtBQUssZUFBZTtZQUNsQixNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBRWhDLCtEQUErRDtRQUMvRDtZQUNFLE1BQU0sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7QUFDSCxDQUFDIn0=