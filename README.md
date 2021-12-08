# Clean Architecture

When building a project one of the first problems developers run into is the question "What should my architecture look like?". This might seem simple, many have used the MVC (Model, View, Controller) pattern for years, however, recently you may have noticed backend development has tended to lose the "view" part of this to a separate front end client. 

On the backend we want to keep our concerns separated. This means following the SOLID principles:

- S - Single-responsiblity Principle
- O - Open-closed Principle
- L - Liskov Substitution Principle
- I - Interface Segregation Principle
- D - Dependency Inversion Principle

More than this, we also want our code to be scalable, and maintainable at scale. For this we need a strong foundation built upon the good design principles. We can learn from the giants of the industry, this is where clean architecture comes in. 

Clean architecture borrows the good parts of various architectural paradigms, including: onion, hexagonal, object oriented software, screaming, DCI, and BCE (you can read more about these [here](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)).

In this project I aim to provide a good interpretation of the clean architecture, to serve as an example for future projects for myself and other developers. I am not affiliated with it's inventor in any way, merely an appreciator of the paradigm, you can read about this in much more detail on Robert C. Martins [blog](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

The beauty od this architecture is it provides individually testable units, it also separates our business logic from any frameworks, treating our frameworks more as plugins for the software, this allows us to customise our own list of dependencies which meet our needs exactly. It is also independent of UI (as any API is these days), and furthermore independent of database. Business rules should not know of anything of the outside world, they should be contained and independent of any external agency. 

We should start with clean architecture by looking at an abstract design. 

<br />

<hr />

![Clean Architecture Image](/images/CleanArchitecture.jpg)

<hr />

Robert C. Martin once said, he spent years looking at projects, building them, and it only dawned on him at the time he was reviewing a piece of work his son did, that he too had been doing to exact same thing for years. He realised, that at the highest level of the application, the application didn't communicate what it did, not how it did it, but instead, what it was composed of. This makes understanding the intent of our projects difficult, it makes facing projects we have never seen before take much more time to understand, overall it usually ends up becoming messy and often unintelligible to juniors.  Clean architecture was designed as a solution to not only this but a myriad of problems. It is important to understand, clean architecture is not a magic bullet, it isn't perfect, it solves many of the problems of traditional MVC architectures but the architecture itself can be daunting for those new to it, it can be difficult to understand, to get started with, and can in itself lead to more complexity. Overall, I would not usually use this on smaller projects, however, it is important to understand the concepts of this at a small level before scaling them up, I hope this repository will assist you in your learning journey as it has myself. 

# Why use Clean Architecture?

If the previous has not convinced you that clean architecture is useful for enterprise level applications, then consider the following:

## Scalability

In an enterprise level application we want our system to be scalable, we want features to be easy to add, and we don't want to have to change previous parts of the system to add a new feature. 

Clean architecture separates everything from our application logic, to our business logic, to our framework. We also follow the rule of fat modes, skinny controllers (meaning the layers, do not mistake this for the "classes" themselves,as many often do).

## Maintainability

Our systems should be effortless to maintain, bugfixing, updating, and making changes to our system should be as worry-free as possible, it should be quick, and it should not cause damage to any unrelated parts. 

Again, clean architecture achieves this by isolating parts of our system to self-contained components. 

## Testability

We should build our apps as small testable units. Every unit should be independently testable, no test should be reliant on the output of another. 

## Readability

Our code should be clear, concise, and communicate intent. Developers all have different ideals when it comes to clean code, and differing opinions, but nobody can argue that when you follow the separation of concerns and single responsibility principle properly, by creating isolated self-contained modules, readability objectively increases.

## Code Dependency Rule

The overriding architecture which makes this architecture work is the dependency rule. The concentric circles in the above graph represents the different areas of your software. Generally, the further inwards you go the higher level the software becomes. The outer circles denote mechanisms, the inner policies.

The code dependency rule says that source code dependencies may only point inwards, following the arrows on the graph. Nothing in an inner circle may know anything at all about something in the outer circle. In particular the name of something declared within the outer circle must never ber mentioned by the code in the inner circle. This includes all: functions, classes, variables, or any other named entity.

## Entities

Entities encapsulate our enterprise wide business logic. An entity can be an object with methods, or a set of data structures and functions. The exact nature of entities does not matter so long as the entities may be used by many different applications in the enterprise. 

## Use Cases 

This layer contains our application specific business logic. Use cases encapsulate and implement all the uses cases of the system. These orchestrate the flow of data to and from entities, and direct them to their enterprise wide business logic to achieve the goal of the use case. 

## Interface Adapters

The software in this later is a set of adapters to convert data from the format most convenient for the use case to that most convenient for some external agency such as the database or the web.

## Frameworks & Drivers

The outermost layer is composed of frameworks and tools. Generally, there should not be much code here, other than glue code which communicates towards the more-inwards facing circles.

# Use Case Layer

The use case is a layer that handles the specific business case logic, this includes validation, mutation, and manipulation of data. It does not however, include the logic for retrieving data.

The use case should know nothing of the web, the frameworks layers or how to retrieve data. The use cas should be reusable in many projects.

The main goal of each use case is to be as abstract as possible from the other layers. It should only include the business logic of the specific use case for that particular use case. For example, the addUser use case should only contain the business logic for adding users.

To keep our layers as abstract as possible we utilise dependency injection. In this instance we are using dependency injection in the Use Case to inject our repositories. This means that our Use Case has no reliance on a concrete implementation and allows us to easily switch out our implementations in a more modular manner. 

# Repository Layer

The repository layer is responsible for fetching data. The use case layers will call the repository logic in order to retrieve the data. 

# Clean Architecture - Layers Breakdown

- Domain: Contains Entities (Business Models) and Repository Interfaces.
- Application: Contains Service Interfaces and their Services, DTOs (Data Transfer Objects) and View Models.
- Data: Contains EF Core types (DbContext, Migration), Data access implementation types (Repositories),
  Infrastructure-specific services (for example, FileLogger or SmtpNotifier).
- Infrastructure.IoC:  Contains Dependency Container class to help implement Dependency Inversion.
  User Interface Types: Includes Controllers, Filters, Views, Startup.
- Tests Types: Includes Unit Tests, Integration Tests.
# Clean Architecture - Benefits Breakdown

- Separates each layer into independently testable units
- Framework independent
- Database independent
- UI independent
- Highly testable
- Highly maintainable
- Highly scalable

As mentioned previously, we no longer require the use of a view on the backend. Since views were abstracted into their
own services MVC has become a somewhat outdate way of architecting projects. This is because MVC adds a layer of complexity not beneficial to the developer. When we look at an MVC application from the highest layer of abstraction we find the application tells us the components from which it is built, rather than what it does. This can lead to messy code, interdependency, and cause code to become difficult to extend. Clean Architecture aims to make implementing new features easier, enabling developers to work on small pieces of functionality abstracted away from the larger picture. This means that when changes are made to the outermost circles we need not worry about breaking functionality elsewhere. 

Our entities being abstracted to this level also means they should be reusable accross projects and services, making future projects of similar functionality faster to build, and again, easier to maintain. This architecture can take a while to get used to and comes with a bit of a learning curve to implement, however, it does encourage developers to move towards more test driven development. In building this example I found myself often writing Jest tests to describe the functionality of the Use Case or Entity before even beginning to look at writing the functionality itself. Clean architecture shifts the developers primary focus from the application logic to the domain logic, encouraging greater thought regarding business logic. 

Whilst I believe this to fit our domain well, it is important to recognise this architecture may need to be adapted as we go. Essentially this architecture employs a domain driven design, which works well for front end intensive applications and APIs, but solutions would need to be found for any backend intensive sections we may introduce. 