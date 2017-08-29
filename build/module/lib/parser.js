/**
 * ============================================================================
 *                                 ヽ/❀o ل͜ o\ﾉ
 *                                THE PARSER!!!
 * ============================================================================
 */
/**
 * For our parser we're going to take our array of tokens and turn it into an
 * AST.
 *
 *   [{ type: 'paren', value: '(' }, ...]   =>   { type: 'Program', body: [...] }
 */
// Okay, so we define a `parser` function that accepts our array of `tokens`.
export function parser(tokens) {
    // Again we keep a `current` variable that we will use as a cursor.
    let current = 0;
    // But this time we're going to use recursion instead of a `while` loop. So we
    // define a `walk` function.
    function walk() {
        // Inside the walk function we start by grabbing the `current` token.
        let token = tokens[current];
        // We're going to split each type of token off into a different code path,
        // starting off with `number` tokens.
        //
        // We test to see if we have a `number` token.
        if (token.type === 'number') {
            // If we have one, we'll increment `current`.
            current++;
            // And we'll return a new AST node called `NumberLiteral` and setting its
            // value to the value of our token.
            return {
                type: 'NumberLiteral',
                value: token.value,
            };
        }
        // If we have a string we will do the same as number and create a
        // `StringLiteral` node.
        if (token.type === 'string') {
            current++;
            return {
                type: 'StringLiteral',
                value: token.value,
            };
        }
        // Next we're going to look for CallExpressions. We start this off when we
        // encounter an open parenthesis.
        if (token.type === 'paren' &&
            token.value === '(') {
            // We'll increment `current` to skip the parenthesis since we don't care
            // about it in our AST.
            token = tokens[++current];
            // We create a base node with the type `CallExpression`, and we're going
            // to set the name as the current token's value since the next token after
            // the open parenthesis is the name of the function.
            let node = {
                type: 'CallExpression',
                name: token.value,
                params: [],
            };
            // We increment `current` *again* to skip the name token.
            token = tokens[++current];
            // And now we want to loop through each token that will be the `params` of
            // our `CallExpression` until we encounter a closing parenthesis.
            //
            // Now this is where recursion comes in. Instead of trying to parse a
            // potentially infinitely nested set of nodes we're going to rely on
            // recursion to resolve things.
            //
            // To explain this, let's take our Lisp code. You can see that the
            // parameters of the `add` are a number and a nested `CallExpression` that
            // includes its own numbers.
            //
            //   (add 2 (subtract 4 2))
            //
            // You'll also notice that in our tokens array we have multiple closing
            // parenthesis.
            //
            //   [
            //     { type: 'paren',  value: '('        },
            //     { type: 'name',   value: 'add'      },
            //     { type: 'number', value: '2'        },
            //     { type: 'paren',  value: '('        },
            //     { type: 'name',   value: 'subtract' },
            //     { type: 'number', value: '4'        },
            //     { type: 'number', value: '2'        },
            //     { type: 'paren',  value: ')'        }, <<< Closing parenthesis
            //     { type: 'paren',  value: ')'        }, <<< Closing parenthesis
            //   ]
            //
            // We're going to rely on the nested `walk` function to increment our
            // `current` variable past any nested `CallExpression`.
            // So we create a `while` loop that will continue until it encounters a
            // token with a `type` of `'paren'` and a `value` of a closing
            // parenthesis.
            while ((token.type !== 'paren') ||
                (token.type === 'paren' && token.value !== ')')) {
                // we'll call the `walk` function which will return a `node` and we'll
                // push it into our `node.params`.
                node.params.push(walk());
                token = tokens[current];
            }
            // Finally we will increment `current` one last time to skip the closing
            // parenthesis.
            current++;
            // And return the node.
            return node;
        }
        // Again, if we haven't recognized the token type by now we're going to
        // throw an error.
        throw new TypeError(token.type);
    }
    // Now, we're going to create our AST which will have a root which is a
    // `Program` node.
    let ast = {
        type: 'Program',
        body: [],
    };
    // And we're going to kickstart our `walk` function, pushing nodes to our
    // `ast.body` array.
    //
    // The reason we are doing this inside a loop is because our program can have
    // `CallExpression` after one another instead of being nested.
    //
    //   (add 2 2)
    //   (subtract 4 2)
    //
    while (current < tokens.length) {
        ast.body.push(walk());
    }
    // At the end of our parser we'll return the AST.
    return ast;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFFSDs7Ozs7R0FLRztBQUVILDZFQUE2RTtBQUM3RSxNQUFNLGlCQUFpQixNQUFNO0lBRTNCLG1FQUFtRTtJQUNuRSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFFaEIsOEVBQThFO0lBQzlFLDRCQUE0QjtJQUM1QjtRQUVFLHFFQUFxRTtRQUNyRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUIsMEVBQTBFO1FBQzFFLHFDQUFxQztRQUNyQyxFQUFFO1FBQ0YsOENBQThDO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUU1Qiw2Q0FBNkM7WUFDN0MsT0FBTyxFQUFFLENBQUM7WUFFVix5RUFBeUU7WUFDekUsbUNBQW1DO1lBQ25DLE1BQU0sQ0FBQztnQkFDTCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO2FBQ25CLENBQUM7UUFDSixDQUFDO1FBRUQsaUVBQWlFO1FBQ2pFLHdCQUF3QjtRQUN4QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxFQUFFLENBQUM7WUFFVixNQUFNLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSzthQUNuQixDQUFDO1FBQ0osQ0FBQztRQUVELDBFQUEwRTtRQUMxRSxpQ0FBaUM7UUFDakMsRUFBRSxDQUFDLENBQ0QsS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPO1lBQ3RCLEtBQUssQ0FBQyxLQUFLLEtBQUssR0FDbEIsQ0FBQyxDQUFDLENBQUM7WUFFRCx3RUFBd0U7WUFDeEUsdUJBQXVCO1lBQ3ZCLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUUxQix3RUFBd0U7WUFDeEUsMEVBQTBFO1lBQzFFLG9EQUFvRDtZQUNwRCxJQUFJLElBQUksR0FBUztnQkFDZixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxFQUFFO2FBQ1gsQ0FBQztZQUVGLHlEQUF5RDtZQUN6RCxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFMUIsMEVBQTBFO1lBQzFFLGlFQUFpRTtZQUNqRSxFQUFFO1lBQ0YscUVBQXFFO1lBQ3JFLG9FQUFvRTtZQUNwRSwrQkFBK0I7WUFDL0IsRUFBRTtZQUNGLGtFQUFrRTtZQUNsRSwwRUFBMEU7WUFDMUUsNEJBQTRCO1lBQzVCLEVBQUU7WUFDRiwyQkFBMkI7WUFDM0IsRUFBRTtZQUNGLHVFQUF1RTtZQUN2RSxlQUFlO1lBQ2YsRUFBRTtZQUNGLE1BQU07WUFDTiw2Q0FBNkM7WUFDN0MsNkNBQTZDO1lBQzdDLDZDQUE2QztZQUM3Qyw2Q0FBNkM7WUFDN0MsNkNBQTZDO1lBQzdDLDZDQUE2QztZQUM3Qyw2Q0FBNkM7WUFDN0MscUVBQXFFO1lBQ3JFLHFFQUFxRTtZQUNyRSxNQUFNO1lBQ04sRUFBRTtZQUNGLHFFQUFxRTtZQUNyRSx1REFBdUQ7WUFFdkQsdUVBQXVFO1lBQ3ZFLDhEQUE4RDtZQUM5RCxlQUFlO1lBQ2YsT0FDRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDO2dCQUN4QixDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQy9DLENBQUM7Z0JBQ0Qsc0VBQXNFO2dCQUN0RSxrQ0FBa0M7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUIsQ0FBQztZQUVELHdFQUF3RTtZQUN4RSxlQUFlO1lBQ2YsT0FBTyxFQUFFLENBQUM7WUFFVix1QkFBdUI7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCx1RUFBdUU7UUFDdkUsa0JBQWtCO1FBQ2xCLE1BQU0sSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCx1RUFBdUU7SUFDdkUsa0JBQWtCO0lBQ2xCLElBQUksR0FBRyxHQUFTO1FBQ2QsSUFBSSxFQUFFLFNBQVM7UUFDZixJQUFJLEVBQUUsRUFBRTtLQUNULENBQUM7SUFFRix5RUFBeUU7SUFDekUsb0JBQW9CO0lBQ3BCLEVBQUU7SUFDRiw2RUFBNkU7SUFDN0UsOERBQThEO0lBQzlELEVBQUU7SUFDRixjQUFjO0lBQ2QsbUJBQW1CO0lBQ25CLEVBQUU7SUFDRixPQUFPLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsaURBQWlEO0lBQ2pELE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDYixDQUFDIn0=