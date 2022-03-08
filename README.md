# Welcome to Sample App using DDD, Serverless, NestJS, MySQL

이 프로젝트는 한 개발팀이 고민하고 있는 스택을 최대한 유사하게 구축한 상태에서 Severless Application의 권고안을 만들어 내기 위해서 작성된 앱이다. 

## Stack
- IaC : AWS CDK
- Serverless Stack : Lambda, API Gateway, DDB, Cognito
- Runtime & Framework : Node.js, NestJS

## Useful commands for CDK
The `cdk.json` file tells the CDK Toolkit how to execute your app.

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation 
 template

## Build instruction for Sample App
이 앱은 Serverless App이 NoSQL과 SQL를 각각 Data Store로 사용할 때의 퍼포먼스를 비교하기 위해 준비된 App이다.
Application이 DDB, RDS를 각각 사용할 경우를 테스트할 예정이다.
로컬에서는 아래 내용을 참고하여 SQL 서버를 연결할 수 있다.

### 로컬 개발 환경에 MySQL을 사용하는 경우
- /src/api/docker/docker-compose-mysql.yml을 사용하여 로컬 데이터 베이스 셋업

- /src/api/.env 파일에서 MySQL의 접속 정보를 설정한 후 /src/api 위치에서 db 생성을 위한 migration 실행

```
npm run migration:generate -- -n CreateMysqlData                          
npm run migration:run
npm run start
```
### 로컬 개발 환경에 PostgreSQL을 사용하는 경우

- /src/api/docker/docker-compose-postgres.yml을 사용하여 로컬 데이터 베이스 셋업
- 상동

### API Spec은 Swagger Document 참고
http://localhost:3000/docs

# 참고 소스

This sample app is mainly based on:

https://github.com/Sairyss/domain-driven-hexagon

- [Domain-Driven Design (DDD)](https://en.wikipedia.org/wiki/Domain-driven_design)
- [Hexagonal (Ports and Adapters) Architecture](https://blog.octo.com/en/hexagonal-architecture-three-principles-and-an-implementation-example/)
- [Secure by Design](https://www.manning.com/books/secure-by-design)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Onion Architecture](https://herbertograca.com/2017/09/21/onion-architecture/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Software Design Patterns](https://refactoring.guru/design-patterns/what-is-pattern)

And many other sources (more links below in every chapter).

Before we begin, here are the PROS and CONS of using a complete architecture like this:

#### Pros

- Independent of external frameworks, technologies, databases, etc. Frameworks and external resources can be plugged/unplugged with much less effort.
- Easily testable and scalable.
- More secure. Some security principles are baked in design itself.
- The solution can be worked on and maintained by different teams, without stepping on each other's toes.
- Easier to add new features. As the system grows over time, the difficulty in adding new features remains constant and relatively small.
- If the solution is properly broken apart along [bounded context](https://martinfowler.com/bliki/BoundedContext.html) lines, it becomes easy to convert pieces of it into microservices if needed.

#### Cons

- This is a sophisticated architecture which requires a firm understanding of quality software principles, such as SOLID, Clean/Hexagonal Architecture, Domain-Driven Design, etc. Any team implementing such a solution will almost certainly require an expert to drive the solution and keep it from evolving the wrong way and accumulating technical debt.

- Some of the practices presented here are not recommended for small-medium sized applications with not a lot of business logic. There is added up-front complexity to support all those building blocks and layers, boilerplate code, abstractions, data mapping etc. thus implementing a complete architecture like this is generally ill-suited to simple [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) applications and could over-complicate such solutions. Some of the described below principles can be used in a smaller sized applications but must be implemented only after analyzing and understanding all pros and cons.

# Diagram

![Domain-Driven Hexagon](api/assets/images/DomainDrivenHexagon.png)
<sup>Diagram is mostly based on [this one](https://github.com/hgraca/explicit-architecture-php#explicit-architecture-1) + others found online</sup>

In short, data flow looks like this (from left to right):

- Request/CLI command/event is sent to the controller using plain DTO;
- Controller parses this DTO, maps it to a Command/Query object format and passes it to a Application service;
- Application service handles this Command/Query; it executes business logic using domain services and/or entities and uses the infrastructure layer through ports;
- Infrastructure layer uses a mapper to convert data to format that it needs, uses repositories to fetch/persist data and adapters to send events or do other I/O communications, maps data back to domain format and returns it back to Application service;
- After application service finishes doing it's job, it returns data/confirmation back to Controllers;
- Controllers return data back to the user (if application has presenters/views, those are returned instead).

Each layer is in charge of it's own logic and has building blocks that usually should follow a [Single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) when possible and when it makes sense (for example, using `Repositories` only for database access, using `Entities` for business logic etc).

**Keep in mind** that different projects can have more or less steps/layers/building blocks than described here. Add more if application requires it, and skip some if application is not that complex and doesn't need all that abstraction.

General recommendation for any project: analyze how big/complex the application will be, find a compromise and use as many layers/building blocks as needed for the project and skip ones that may over-complicate things.

More in details on each step below.

# Modules

This project's code examples use separation by modules (also called components). Each module's name should reflect an important concept from the Domain and have its own folder with a dedicated codebase, and each use case inside that module gets it's own folder to store most of the things it needs (this is also called _Vertical Slicing_).

It is easier to work on things that change together if those things are gathered relatively close to each other. Think of a module as a "box" that groups together related business logic.

Try not to create dependencies between modules or use cases, move shared logic into a separate files and make both depend on that instead of depending on each other.

Try to make every module independent and keep interactions between modules minimal. Think of each module as a mini application bounded by a single context. Consider module internals private and try to avoid direct imports between modules (like importing a class `import SomeClass from '../SomeOtherModule'`) since this creates [tight coupling](<https://en.wikipedia.org/wiki/Coupling_(computer_programming)>), turns your code into a [spaghetti](https://en.wikipedia.org/wiki/Spaghetti_code) and application into a [big ball of mud](https://en.wikipedia.org/wiki/Big_ball_of_mud).

To avoid coupling modules can communicate with each other by using a message bus, for example you can send commands using a commands bus or subscribe to events that other modules emit (more info on events and commands bus below).

This approach ensures [loose coupling](https://en.wikipedia.org/wiki/Loose_coupling), and, if bounded contexts are defined and designed properly, each module can be easily separated into a microservice if needed without touching any domain logic.

Read more about modular programming benefits:

- [Modular programming: Beyond the spaghetti mess](https://www.tiny.cloud/blog/modular-programming-principle/).
- [What are Modules in Domain Driven Design?](https://www.culttt.com/2014/12/10/modules-domain-driven-design/)

Each module is separated in layers described below.
