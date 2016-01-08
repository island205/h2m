
[Homepage](https://medium.com/)[](https://medium.freecodecamp.com?source=avatarTopMetabar-lo_a35d149216c2-336d898217ee)[](https://medium.freecodecamp.com?source=logo-lo_a35d149216c2-336d898217ee)[Sign in / Sign up](https://medium.com/m/signin?redirect=https%3A%2F%2Fmedium.freecodecamp.com%2Fangular-2-versus-react-there-will-be-blood-66595faafd51)1K109[Cory House](https://medium.com/@housecor)BlockedUnblockFollowFollowing[](https://medium.com/@housecor)[Cory House](https://medium.com/@housecor)4 days ago10 min read
### Angular 2 versus React: There Will Be Blood

Angular 2 has reached Beta and appears poised to become the hot new framework of 2016. It’s time for a showdown. Let’s see how it stacks up against 2015’s darling: React.

Disclaimer: I enjoyed working in Angular 1 but switched to React in 2015. I just published a Pluralsight course on React and Flux (free trial). So yes, I’m biased. But I’m attacking both sides.

Alright, let’s do this. There will be blood.
 ![https://cdn-images-1.medium.com/freeze/max/30/1*MRPl_SNuRGJchb6eOAnkSA.jpeg?q=20](https://cdn-images-1.medium.com/freeze/max/30/1*MRPl_SNuRGJchb6eOAnkSA.jpeg?q=20)  ![undefined](undefined)  ![https://cdn-images-1.medium.com/max/800/1*MRPl_SNuRGJchb6eOAnkSA.jpeg](https://cdn-images-1.medium.com/max/800/1*MRPl_SNuRGJchb6eOAnkSA.jpeg) Photo credit: [@jwcarrol](https://twitter.com/jwcarroll)
### You’re Comparing Apples and Orangutans!

Sigh. Yes, Angular is a framework, React is a library. Some say this difference makes comparing them illogical. Not at all!
Choosing between Angular and React is like choosing between buying an off-the-shelf computer and building your own with off-the-shelf parts.
This post considers the merits of these two approaches. I compare React’s syntax and component model to Angular’s syntax and component model. This is like comparing an off-the-shelf computer’s CPU to a raw CPU. Apples to apples.

### Angular 2 Advantages

Let’s start by considering Angular 2’s advantages over React.

#### Low Decision Fatigue

Since Angular is a framework, it provides significantly more opinions and functionality out of the box. With React, you typically pull a number of other libraries off the shelf to build a real app. You’ll likely want libraries for routing, enforcing unidirectional flows, web API calls, testing, dependency management, and so on. The number of decisions is pretty overwhelming. This is why React has so many starter kits (I’ve published two).

Angular offers more opinions out of the box, which helps you get started more quickly without feeling intimidated by decisions. This enforced consistency also helps new hires feel at home more quickly and makes switching developers between teams more practical.

I admire how the Angular core team has embraced TypeScript, which leads to the next advantage…

#### TypeScript = Clear Path

Sure, TypeScript isn’t loved by all, but Angular 2’s opinionated take on which flavor of JavaScript to use is a big win. React examples across the web are frustratingly inconsistent — it’s presented in ES5 and ES6 in roughly equal numbers, and it currently offers three different ways to declare components. This creates confusion for newcomers. (Angular also embraces decorators instead of extends — many would consider this a plus as well).

While Angular 2 doesn’t require TypeScript, the Angular core team certainly embraces it and defaults to using TypeScript in documentation. This means related examples and open source projects are more likely to feel familiar and consistent. Angular already provides clear examples that show how to utilize the TypeScript compiler. (though admittedly, not everyone is embracing TypeScript yet, but I suspect shortly after launch it’ll become the de facto standard). This consistency should help avoid the confusion and decision overload that comes with getting started with React.

#### Reduced Churn

2015 was the year of JavaScript fatigue. React was a key contributor. And since React has yet to reach a 1.0 release, more breaking changes are likely in the future. React’s ecosystem continues to churn at a rapid pace, particularly around the long list of Flux flavors and routing. This means anything you write in React today is likely to feel out of date or require breaking changes when React 1.0 is eventually released.

In contrast, Angular 2 is a careful, methodical reinvention of a mature, comprehensive framework. So Angular is less likely to churn in painful ways after release. And as a full framework, when you choose Angular, you can trust a single team to make careful decisions about the future. In React, it’s your responsibility to herd a bunch of disparate, fast-moving, open-source libraries into a comprehensive whole that plays well together. It’s time-consuming, frustrating, and a never-ending job.

#### Broad Tooling Support

As you’ll see below, I consider React’s JSX a big win. However, you need to select tooling that supports JSX. React has become so popular that tooling support is rarely a problem today, but new tooling such as IDEs and linters are unlikely to support JSX on day one. Angular 2’s templates store markup in a string or in separate HTML files, so it doesn’t require special tooling support (though it appears tooling to intelligently parse Angular’s string templates is on the way).

#### Web Component Friendly

Angular 2’s design embraces the web component’s standard. Sheesh, I’m embarrassed I forgot to mention this initially — I recently published a course on web components! In short, the components that you build in Angular 2 should be much easier to convert into plain, native web components than React’s components. Sure, browser support is still weak, but this could be a big win in the long-term.

Angular’s approach comes with its own set of gotchas, which is a good segue for discussing React’s advantages…

### React Advantages

Alright, let’s consider what sets React apart.

#### JSX

JSX is an HTML-like syntax that compiles down to JavaScript. Markup and code are composed in the same file. This means code completion gives you a hand as you type references to your component’s functions and variables. In contrast, Angular’s string-based templates come with the usual downsides: No code coloring in many editors, limited code completion support, and run-time failures. You’d normally expect poor error messaging as well, but the Angular team created their own HTML parser to fix that. (Bravo!)

If you don’t like Angular string-based templates, you can move the templates to a separate file, but then you’re back to what I call “the old days:” wiring the two files together in your head, with no code completion support or compile-time checking to assist. That doesn’t seem like a big deal until you’ve enjoyed life in React. Composing components in a single compile-time checked file is one of the big reasons JSX is so special.
 ![https://cdn-images-1.medium.com/freeze/max/30/1*ivDnyMP63YJBBGKCNyRUzQ.png?q=20](https://cdn-images-1.medium.com/freeze/max/30/1*ivDnyMP63YJBBGKCNyRUzQ.png?q=20)  ![undefined](undefined)  ![https://cdn-images-1.medium.com/max/1200/1*ivDnyMP63YJBBGKCNyRUzQ.png](https://cdn-images-1.medium.com/max/1200/1*ivDnyMP63YJBBGKCNyRUzQ.png) Contrasting how Angular 2 and React handle a missing closing tag
For more on why JSX is such a big win, see JSX: The Other Side of the Coin.

#### React Fails Fast and Explicitly

When you make a typo in React’s JSX, it won’t compile. That’s a beautiful thing. It means you know immediately exactly which line has an error. It tells you immediately when you forget to close a tag or reference a property that doesn’t exist. In fact, the JSX compiler specifies the line number where the typo occurred. This behavior radically speeds development.

In contrast, when you mistype a variable reference in Angular 2, nothing happens at all. Angular 2 fails quietly at run time instead of compile-time. It fails slowly. I load the app and wonder why my data isn’t displaying. Not fun.

#### React is JavaScript-Centric

Here it is. This is the fundamental difference between React and Angular. Unfortunately, Angular 2 remains HTML-centric rather than JavaScript-centric. Angular 2 failed to solve its most fundamental design problem:
Angular 2 continues to put “JS” into HTML. React puts “HTML” into JS.
I can’t emphasize the impact of this schism enough. It fundamentally impacts the development experience. Angular’s HTML-centric design remains its greatest weakness. As I cover in “JSX: The Other Side of the Coin”, JavaScript is far more powerful than HTML. Thus, it’s more logical to enhance JavaScript to support markup than to enhance HTML to support logic. HTML and JavaScript need to be glued together somehow, and React’s JavaScript-centric approach is fundamentally superior to Angular, Ember, and Knockout’s HTML-centric approach.

Here’s why…

#### React’s JavaScript-centric design = simplicity

Angular 2 continues Angular 1’s approach of trying to make HTML more powerful. So you have to utilize Angular 2&#39;s unique syntax for simple tasks like looping and conditionals. For example, Angular 2 offers both one and two way binding via two syntaxes that are unfortunately quite different:

    {{myVar}} //One-way bindingngModel=&quot;myVar&quot; //Two-way binding

In React, binding markup doesn’t change based on this decision (it’s handled elsewhere, as I’d argue it should be). In either case, it looks like this:

    {myVar}

Angular 2 supports inline master templates using this syntax:

    &lt;ul&gt;  &lt;li *ngFor=&quot;#hero of heroes&quot;&gt;    {{hero.name}}  &lt;/li&gt;&lt;/ul&gt;

The above snippet loops over an array of heroes. I have multiple concerns:
Declaring a “master template” via a proceeding asterisk is cryptic.The pound sign in front of hero declares a local template variable. This key concept looks like needless noise (if preferred, you can use `var`).The ngFor adds looping semantics to HTML via an Angular-specific attribute.
Contrast Angular 2’s syntax above with React’s pure JS*: (admittedly the key property below is React-specific)

    &lt;ul&gt;  { heroes.map(hero =&gt;    &lt;li key={hero.id}&gt;{hero.name}&lt;/li&gt;  )}&lt;/ul&gt;

Since JS supports looping natively, React’s JSX can simply leverage all the power of JS for such things and do much more with map, filter, etc.

Just read the Angular 2 Cheat Sheet. That’s not HTML. That’s not JavaScript. It’s Angular.
To read Angular: Learn a long list of Angular-specific syntax.To read React: Learn JavaScript.
React is unique in its syntactic and conceptual simplicity. Consider iterating in today’s popular JS frameworks/libraries:

    Ember: {{# each}}Angular 1: ng-repeatAngular 2: ngForKnockout: data-bind=”foreach”React: JUST USE JS. :)

All except React use framework specific replacements for something that is native and trivial in JavaScript: a loop. That’s the beauty of React. It embraces the power of JavaScript to handle markup, so no odd new syntax is required.

Angular 2’s syntactic oddities continue with click binding:

    (click)=”onSelect(hero)&quot;

In contrast, React again uses plain ‘ol JavaScript:

    onClick={this.onSelect.bind(this, hero)}

And since React includes a synthetic event system (as does Angular 2), you don’t have to worry about the performance implications of declaring event handlers inline like this.

Why fill your head with a framework’s unique syntax if you don’t have to? Why not simply embrace the power of JS?

#### Luxurious Development Experience

JSX’s code completion support, compile-time checks, and rich error messaging already create an excellent development experience that saves both typing and time. But combine all that with hot reloading with time travel and you have a rapid development experience like no other.

#### Size Concerns

Here’s the sizes of some popular frameworks and libraries, minified (source):

Angular 2: 566k (766k with RxJS)Ember: 435kAngular 1: 143kReact + Redux: 139k

Edit: Sorry, I had incorrect numbers earlier that were for simple ToDoMVC apps instead of the raw frameworks. Also, the Angular 2 number is expected to drop for the final release. The sizes listed are for the framework, minified, in the browser (no gzip is factored in here).

To make a real comparison, I built Angular 2’s Tour of Heroes app in both Angular 2 and React (I used the new React Slingshot starter kit). The result?

Angular 2: 764k minifiedReact + Redux: 216k minified

So Angular 2 is over three times the size of a React + Redux app of comparable simplicity. Edit — Angular 2 is expected to lose some weight before the final release.

Now that said, I admit that concerns about the size of frameworks may be overblown:
Large apps tend to have a minimum of several hundred kilobytes of code — often more — whether they’re built with a framework or not. Developers need abstractions to build complex software, and whether they come from a framework or are hand-written, they negatively impact the performance of apps.Even if you were to eliminate frameworks entirely, many apps would still have hundreds of kilobytes of JavaScript. — Tom Dale in [JavaScript Frameworks and Mobile Performance](http://tomdale.net/2015/11/javascript-frameworks-and-mobile-performance/)
Tom is right. Frameworks like Angular and Ember are bigger because they offer many more features out of the box.

However, my concern is this: many apps don’t need everything these large frameworks put in the box. In a world that’s increasingly embracing microservices, microapps, and single-responsibility packages, React gives you the power to “right-size” your application by carefully selecting only what is necessary. In a world with over 200,000 npm modules, that’s a powerful place to be.

#### React Embraces the Unix Philosophy.

React is a library. It’s precisely the opposite philosophy of large, comprehensive frameworks like Angular and Ember. So when you select React, you’re free to choose modern best-of-breed libraries that solve your problem best. JavaScript moves fast, and React allows you to swap out small pieces of your application for better libraries instead of waiting around and hoping your framework will innovate.

Unix has stood the test of time. Here’s why:
The philosophy of small, composable, single-purpose tools never goes out of style.
React is a focused, composable, single-purpose tool used by many of the largest websites in the world. That bodes well for its future (That said, Angular is used by many big names too).

#### Showdown Summary

Angular 2 is a huge improvement over version 1. The new component model is simpler to grasp than v1’s directives, it supports isomorphic/universal rendering, and it uses a virtual DOM offering 3–10x improvements in performance. These changes make Angular 2 very competitive with React. There’s no denying that its full-featured, opinionated nature offers some clear benefits by reducing “JavaScript fatigue”.

However, Angular 2’s size and syntax give me pause. Angular’s commitment to HTML-centric design makes it complex compared to React’s simpler JavaScript-centric model. In React, you don’t learn framework-specific HTML shims like ngWhatever. You spend your time writing plain ‘ol JavaScript. That’s the future I believe in.

Comments? Chime in on Reddit or Hacker News.

Cory House is the author of “Building Applications with React and Flux”, “Clean Code: Writing Code for Humans” and multiple other courses on Pluralsight. He is a Software Architect at VinSolutions and trains software developers internationally on software practices like front-end development and clean coding. Cory is a Microsoft MVP, Telerik Developer Expert, and founder of outlierdeveloper.com.
Thanks to [Clayton Hunt](https://medium.com/@ClaytonHunt_104). [JavaScript](https://medium.com/tag/javascript?source=post)[Angularjs](https://medium.com/tag/angularjs?source=post)[React](https://medium.com/tag/react?source=post)1K109BlockedUnblockFollowFollowing[](https://medium.com/@housecor?source=footer_card)
### Cory House

Software Architect, Independent Consultant, Pluralsight Author, Microsoft MVP, Telerik Dev Expert, Speaker, Clean Coder, Aspiring Outlier.
FollowFollowing[](https://medium.freecodecamp.com?source=footer_card)
### Free Code Camp

Join our open source community’s quest to teach coding and help nonprofits
&times;Don’t miss Cory House’s next storyBlockedUnblockFollowFollowing ![Cory House](https://cdn-images-1.medium.com/fit/c/40/40/0*OB1-0uI2q3E_Q0BJ.jpeg) Cory House
