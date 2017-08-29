/**
 * ============================================================================
 *                                   (/^▽^)/
 *                                THE TOKENIZER!
 * ============================================================================
 */
/**
 * We're gonna start off with our first phase of parsing, lexical analysis, with
 * the tokenizer.
 *
 * We're just going to take our string of code and break it down into an array
 * of tokens.
 *
 *   (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
 */
// We start by accepting an input string of code, and we're gonna set up two
// things...
export function tokenizer(input) {
    // A `current` variable for tracking our position in the code like a cursor.
    let current = 0;
    // And a `tokens` array for pushing our tokens to.
    let tokens = [];
    // We start by creating a `while` loop where we are setting up our `current`
    // variable to be incremented as much as we want `inside` the loop.
    //
    // We do this because we may want to increment `current` many times within a
    // single loop because our tokens can be any length.
    while (current < input.length) {
        // We're also going to store the `current` character in the `input`.
        let char = input[current];
        // The first thing we want to check for is an open parenthesis. This will
        // later be used for `CallExpression` but for now we only care about the
        // character.
        //
        // We check to see if we have an open parenthesis:
        if (char === '(') {
            const value = {
                type: 'paren',
                value: '(',
            };
            // If we do, we push a new token with the type `paren` and set the value
            // to an open parenthesis.
            tokens.push(value);
            // Then we increment `current`
            current++;
            // And we `continue` onto the next cycle of the loop.
            continue;
        }
        // Next we're going to check for a closing parenthesis. We do the same exact
        // thing as before: Check for a closing parenthesis, add a new token,
        // increment `current`, and `continue`.
        if (char === ')') {
            tokens.push({
                type: 'paren',
                value: ')',
            });
            current++;
            continue;
        }
        // Moving on, we're now going to check for whitespace. This is interesting
        // because we care that whitespace exists to separate characters, but it
        // isn't actually important for us to store as a token. We would only throw
        // it out later.
        //
        // So here we're just going to test for existence and if it does exist we're
        // going to just `continue` on.
        let WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }
        // The next type of token is a number. This is different than what we have
        // seen before because a number could be any number of characters and we
        // want to capture the entire sequence of characters as one token.
        //
        //   (add 123 456)
        //        ^^^ ^^^
        //        Only two separate tokens
        //
        // So we start this off when we encounter the first number in a sequence.
        let NUMBERS = /[0-9]/;
        if (NUMBERS.test(char)) {
            // We're going to create a `value` string that we are going to push
            // characters to.
            let value = '';
            // Then we're going to loop through each character in the sequence until
            // we encounter a character that is not a number, pushing each character
            // that is a number to our `value` and incrementing `current` as we go.
            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }
            // After that we push our `number` token to the `tokens` array.
            tokens.push({ type: 'number', value });
            // And we continue on.
            continue;
        }
        // We'll also add support for strings in our language which will be any
        // text surrounded by double quotes (").
        //
        //   (concat "foo" "bar")
        //            ^^^   ^^^ string tokens
        //
        // We'll start by checking for the opening quote:
        if (char === '"') {
            // Keep a `value` variable for building up our string token.
            let value = '';
            // We'll skip the opening double quote in our token.
            char = input[++current];
            // Then we'll iterate through each character until we reach another
            // double quote.
            while (char !== '"') {
                value += char;
                char = input[++current];
            }
            // Skip the closing double quote.
            char = input[++current];
            // And add our `string` token to the `tokens` array.
            tokens.push({ type: 'string', value });
            continue;
        }
        // The last type of token will be a `name` token. This is a sequence of
        // letters instead of numbers, that are the names of functions in our lisp
        // syntax.
        //
        //   (add 2 4)
        //    ^^^
        //    Name token
        //
        let LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
            let value = '';
            // Again we're just going to loop through all the letters pushing them to
            // a value.
            while (LETTERS.test(char)) {
                value += char;
                char = input[++current];
            }
            // And pushing that value as a token with the type `name` and continuing.
            tokens.push({ type: 'name', value });
            continue;
        }
        // Finally if we have not matched a character by now, we're going to throw
        // an error and completely exit.
        throw new TypeError('I dont know what this character is: ' + char);
    }
    // Then at the end of our `tokenizer` we simply return the tokens array.
    return tokens;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5pemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90b2tlbml6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7Ozs7O0dBS0c7QUFFSDs7Ozs7Ozs7R0FRRztBQUVILDRFQUE0RTtBQUM1RSxZQUFZO0FBQ1osTUFBTSxvQkFBb0IsS0FBSztJQUU3Qiw0RUFBNEU7SUFDNUUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBRWhCLGtEQUFrRDtJQUNsRCxJQUFJLE1BQU0sR0FBUyxFQUFFLENBQUM7SUFFdEIsNEVBQTRFO0lBQzVFLG1FQUFtRTtJQUNuRSxFQUFFO0lBQ0YsNEVBQTRFO0lBQzVFLG9EQUFvRDtJQUNwRCxPQUFPLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFOUIsb0VBQW9FO1FBQ3BFLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUxQix5RUFBeUU7UUFDekUsd0VBQXdFO1FBQ3hFLGFBQWE7UUFDYixFQUFFO1FBQ0Ysa0RBQWtEO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRWpCLE1BQU0sS0FBSyxHQUFVO2dCQUNuQixJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsR0FBRzthQUNYLENBQUM7WUFFRix3RUFBd0U7WUFDeEUsMEJBQTBCO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFbkIsOEJBQThCO1lBQzlCLE9BQU8sRUFBRSxDQUFDO1lBRVYscURBQXFEO1lBQ3JELFFBQVEsQ0FBQztRQUNYLENBQUM7UUFFRCw0RUFBNEU7UUFDNUUscUVBQXFFO1FBQ3JFLHVDQUF1QztRQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNWLElBQUksRUFB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