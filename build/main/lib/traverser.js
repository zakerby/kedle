"use strict";
/**
 * ============================================================================
 *                                 ⌒(❀>◞౪◟<❀)⌒
 *                               THE TRAVERSER!!!
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * So now we have our AST, and we want to be able to visit different nodes with
 * a visitor. We need to be able to call the methods on the visitor whenever we
 * encounter a node with a matching type.
 *
 *   traverse(ast, {
 *     Program(node, parent) {
 *       // ...
 *     },
 *
 *     CallExpression(node, parent) {
 *       // ...
 *     },
 *
 *     NumberLiteral(node, parent) {
 *       // ...
 *     },
 *   });
 */
// So we define a traverser function which accepts an AST and a
// visitor. Inside we're going to define two functions...
function traverser(ast, visitor) {
    // A `traverseArray` function that will allow us to iterate over an array and
    // call the next function that we will define: `traverseNode`.
    function traverseArray(array, parent) {
        array.forEach(child => {
            traverseNode(child, parent);
        });
    }
    // `traverseNode` will accept a `node` and its `parent` node. So that it can
    // pass both to our visitor methods.
    function traverseNode(node, parent) {
        // We start by testing for the existence of a method on the visitor with a
        // matching `type`.
        let methods = visitor[node.type];
        // If there is an `enter` method for this node type we'll call it with the
        // `node` and its `parent`.
        if (methods && methods.enter) {
            methods.enter(node, parent);
        }
        // Next we are going to split things up by the current node type.
        switch (node.type) {
            // We'll start with our top level `Program`. Since Program nodes have a
            // property named body that has an array of nodes, we will call
            // `traverseArray` to traverse down into them.
            //
            // (Remember that `traverseArray` will in turn call `traverseNode` so  we
            // are causing the tree to be traversed recursively)
            case 'Program':
                traverseArray(node.body, node);
                break;
            // Next we do the same with `CallExpression` and traverse their `params`.
            case 'CallExpression':
                traverseArray(node.params, node);
                break;
            // In the cases of `NumberLiteral` and `StringLiteral` we don't have any
            // child nodes to visit, so we'll just break.
            case 'NumberLiteral':
            case 'StringLiteral':
                break;
            // And again, if we haven't recognized the node type then we'll throw an
            // error.
            default:
                throw new TypeError(node.type);
        }
        // If there is an `exit` method for this node type we'll call it with the
        // `node` and its `parent`.
        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    }
    // Finally we kickstart the traverser by calling `traverseNode` with our ast
    // with no `parent` because the top level of the AST doesn't have a parent.
    traverseNode(ast, null);
}
exports.traverser = traverser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhdmVyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90cmF2ZXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBOzs7OztHQUtHOztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCwrREFBK0Q7QUFDL0QseURBQXlEO0FBQ3pELG1CQUEwQixHQUFHLEVBQUUsT0FBTztJQUVwQyw2RUFBNkU7SUFDN0UsOERBQThEO0lBQzlELHVCQUF1QixLQUFLLEVBQUUsTUFBTTtRQUNsQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFDakIsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw0RUFBNEU7SUFDNUUsb0NBQW9DO0lBQ3BDLHNCQUFzQixJQUFJLEVBQUUsTUFBTTtRQUVoQywwRUFBMEU7UUFDMUUsbUJBQW1CO1FBQ25CLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakMsMEVBQTBFO1FBQzFFLDJCQUEyQjtRQUMzQixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVELGlFQUFpRTtRQUNqRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVsQix1RUFBdUU7WUFDdkUsK0RBQStEO1lBQy9ELDhDQUE4QztZQUM5QyxFQUFFO1lBQ0YseUVBQXlFO1lBQ3pFLG9EQUFvRDtZQUNwRCxLQUFLLFNBQVM7Z0JBQ1osYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLEtBQUssQ0FBQztZQUVSLHlFQUF5RTtZQUN6RSxLQUFLLGdCQUFnQjtnQkFDbkIsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2pDLEtBQUssQ0FBQztZQUVSLHdFQUF3RTtZQUN4RSw2Q0FBNkM7WUFDN0MsS0FBSyxlQUFlLENBQUM7WUFDckIsS0FBSyxlQUFlO2dCQUNsQixLQUFLLENBQUM7WUFFUix3RUFBd0U7WUFDeEUsU0FBUztZQUNUO2dCQUNFLE1BQU0sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCx5RUFBeUU7UUFDekUsMkJBQTJCO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDO0lBQ0gsQ0FBQztJQUVELDRFQUE0RTtJQUM1RSwyRUFBMkU7SUFDM0UsWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBaEVELDhCQWdFQyJ9