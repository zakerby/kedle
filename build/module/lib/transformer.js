import { traverser } from './traverser';
/**
 * ============================================================================
 *                                   ⁽(◍˃̵͈̑ᴗ˂̵͈̑)⁽
 *                              THE TRANSFORMER!!!
 * ============================================================================
 */
/**
 * Next up, the transformer. Our transformer is going to take the AST that we
 * have built and pass it to our traverser function with a visitor and will
 * create a new ast.
 *
 * ----------------------------------------------------------------------------
 *   Original AST                     |   Transformed AST
 * ----------------------------------------------------------------------------
 *   {                                |   {
 *     type: 'Program',               |     type: 'Program',
 *     body: [{                       |     body: [{
 *       type: 'CallExpression',      |       type: 'ExpressionStatement',
 *       name: 'add',                 |       expression: {
 *       params: [{                   |         type: 'CallExpression',
 *         type: 'NumberLiteral',     |         callee: {
 *         value: '2'                 |           type: 'Identifier',
 *       }, {                         |           name: 'add'
 *         type: 'CallExpression',    |         },
 *         name: 'subtract',          |         arguments: [{
 *         params: [{                 |           type: 'NumberLiteral',
 *           type: 'NumberLiteral',   |           value: '2'
 *           value: '4'               |         }, {
 *         }, {                       |           type: 'CallExpression',
 *           type: 'NumberLiteral',   |           callee: {
 *           value: '2'               |             type: 'Identifier',
 *         }]                         |             name: 'subtract'
 *       }]                           |           },
 *     }]                             |           arguments: [{
 *   }                                |             type: 'NumberLiteral',
 *                                    |             value: '4'
 * ---------------------------------- |           }, {
 *                                    |             type: 'NumberLiteral',
 *                                    |             value: '2'
 *                                    |           }]
 *  (sorry the other one is longer.)  |         }
 *                                    |       }
 *                                    |     }]
 *                                    |   }
 * ----------------------------------------------------------------------------
 */
// So we have our transformer function which will accept the lisp ast.
export function transformer(ast) {
    // We'll create a `newAst` which like our previous AST will have a program
    // node.
    let newAst = {
        type: 'Program',
        body: [],
    };
    // Next I'm going to cheat a little and create a bit of a hack. We're going to
    // use a property named `context` on our parent nodes that we're going to push
    // nodes to their parent's `context`. Normally you would have a better
    // abstraction than this, but for our purposes this keeps things simple.
    //
    // Just take note that the context is a reference *from* the old ast *to* the
    // new ast.
    ast._context = newAst.body;
    // We'll start by calling the traverser function with our ast and a visitor.
    traverser(ast, {
        // The first visitor method accepts any `NumberLiteral`
        NumberLiteral: {
            // We'll visit them on enter.
            enter(node, parent) {
                // We'll create a new node also named `NumberLiteral` that we will push to
                // the parent context.
                parent._context.push({
                    type: 'NumberLiteral',
                    value: node.value,
                });
            },
        },
        // Next we have `StringLiteral`
        StringLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: 'StringLiteral',
                    value: node.value,
                });
            },
        },
        // Next up, `CallExpression`.
        CallExpression: {
            enter(node, parent) {
                // We start creating a new node `CallExpression` with a nested
                // `Identifier`.
                let expression = {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: node.name,
                    },
                    arguments: [],
                };
                // Next we're going to define a new context on the original
                // `CallExpression` node that will reference the `expression`'s arguments
                // so that we can push arguments.
                node._context = expression.arguments;
                // Then we're going to check if the parent node is a `CallExpression`.
                // If it is not...
                if (parent.type !== 'CallExpression') {
                    // We're going to wrap our `CallExpression` node with an
                    // `ExpressionStatement`. We do this because the top level
                    // `CallExpression` in JavaScript are actually statements.
                    expression = {
                        type: 'ExpressionStatement',
                        expression: expression,
                    };
                }
                // Last, we push our (possibly wrapped) `CallExpression` to the `parent`'s
                // `context`.
                parent._context.push(expression);
            },
        }
    });
    // At the end of our transformer function we'll return the new ast that we
    // just created.
    return newAst;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3RyYW5zZm9ybWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdEM7Ozs7O0dBS0c7QUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBRUgsc0VBQXNFO0FBQ3RFLE1BQU0sc0JBQXNCLEdBQUc7SUFFN0IsMEVBQTBFO0lBQzFFLFFBQVE7SUFDUixJQUFJLE1BQU0sR0FBRztRQUNYLElBQUksRUFBRSxTQUFTO1FBQ2YsSUFBSSxFQUFFLEVBQUU7S0FDVCxDQUFDO0lBRUYsOEVBQThFO0lBQzlFLDhFQUE4RTtJQUM5RSxzRUFBc0U7SUFDdEUsd0VBQXdFO0lBQ3hFLEVBQUU7SUFDRiw2RUFBNkU7SUFDN0UsV0FBVztJQUNYLEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUUzQiw0RUFBNEU7SUFDNUUsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUViLHVEQUF1RDtRQUN2RCxhQUFhLEVBQUU7WUFDYiw2QkFBNkI7WUFDN0IsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNO2dCQUNoQiwwRUFBMEU7Z0JBQzFFLHNCQUFzQjtnQkFDdEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQ25CLElBQUksRUFBRSxlQUFlO29CQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUM7U0FDRjtRQUVELCtCQUErQjtRQUMvQixhQUFhLEVBQUU7WUFDYixLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU07Z0JBQ2hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUNuQixJQUFJLEVBQUUsZUFBZTtvQkFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2lCQUNsQixDQUFDLENBQUM7WUFDTCxDQUFDO1NBQ0Y7UUFFRCw2QkFBNkI7UUFDN0IsY0FBYyxFQUFFO1lBQ2QsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNO2dCQUVoQiw4REFBOEQ7Z0JBQzlELGdCQUFnQjtnQkFDaEIsSUFBSSxVQUFVLEdBQVM7b0JBQ3JCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLE1BQU0sRUFBRTt3QkFDTixJQUFJLEVBQUUsWUFBWTt3QkFDbEIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO3FCQUNoQjtvQkFDRCxTQUFTLEVBQUUsRUFBRTtpQkFDZCxDQUFDO2dCQUVGLDJEQUEyRDtnQkFDM0QseUVBQXlFO2dCQUN6RSxpQ0FBaUM7Z0JBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztnQkFFckMsc0VBQXNFO2dCQUN0RSxrQkFBa0I7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUVyQyx3REFBd0Q7b0JBQ3hELDBEQUEwRDtvQkFDMUQsMERBQTBEO29CQUMxRCxVQUFVLEdBQUc7d0JBQ1gsSUFBSSxFQUFFLHFCQUFxQjt3QkFDM0IsVUFBVSxFQUFFLFVBQVU7cUJBQ3ZCLENBQUM7Z0JBQ0osQ0FBQztnQkFFRCwwRUFBMEU7Z0JBQzFFLGFBQWE7Z0JBQ2IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsQ0FBQztTQUNGO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsMEVBQTBFO0lBQzFFLGdCQUFnQjtJQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2hCLENBQUMifQ==