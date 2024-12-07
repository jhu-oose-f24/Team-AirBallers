# Code Review Report

Having used Next.js as the main framework for our app, a lot of the used types, conventions, and style discussed apply to both the frontend and backend, differing mostly in design.

## Design

- Backend: The backend pipeline is well-designed and follows a serialized path of prompting to generate both the garment image and the garment specs. Additionally, the prompting correctly classifies the user prompt, which then pipelines into the garment specs generation which then pipelines into generatin the garment image. This allows the user to edit the garment by changing certain specs in the edit feature, allowing for a new garment generation. Additionally, this design allows efficient saving of the garment into a garment collection with its respective specs to view. Additionally, each generator and part of the pipeline follows the single-responsibility principle very closely, only being assigned one task to do and accomplish. This also goes for the open-closed principle where each method is modified, not changed and the interface segregation principle with the abstraction of garments and generators. Additionally, the code follows good error handling principles and implementations can use multiple error handlers. The code also accurately and efficiently models the relationships between User, Collection, and Garment. As we can see in schema.prisma, each of the Models, the Generator, and the Datasource are all correctly implemented. That is, all the necessary components like embedded types, scalar types, and more are in the models.

- Frontend: THe frontend is organized into pages, features, and components systematically, and styling is split into globally applied css and css modules applied to the components used. HTML semantic elements are used whereever applicable, and accessibility is at the forefront of our design, including intuitively tabbable and arrow-navigable UIs. The components such as buttons, cards, and containers are built in a way that emphasizes reusability and intuitive customizability. THe use of contexts also simplifies state management throughout the client, and encoded references to collections and garments in the URL allow for the right content to persist and be re-fetched across refreshes.

## Complexity

Overall, the backend is very simple and does not need further simplification as most of it is prompt engineering and using the OpenAI and Fal APIs, while using files for each spec and garment needed to be implemented. Additionally, a developer would very easily be able to understand the pipeline especially with all the naming conventions, documentations, and comments within each file. I believe that developers should be able to easily determine what each model does, what the relationships are between each other, and the general structure of the app just from the schema page.

## Test

The code did not use automated tests. Most testing was done manually, a lot of it was following the code logic until the promblematic code was discovered. Automated testing would have made the debugging proccess a lot easier.

## Naming

The naming covention was clear and did a good job of indicating what the varible, class, and functions were doing. Overall the naming was well done and made the code very readable. The names of the models such as Collection, Garment, GarmentType, User and Account are all clear on what they are and how they function. The naming conventions for all the models are generally consistent and accurate.

## Comments

Comments are fairly clear and useful. Class functions have documentation preceedings the class that explain what the params are, what the class returns and potential errors that can be thrown. Also, though written in javascript as opposed to typescript, jsdoc is used extensively to define, clarify and infer types and React component props throughout the app.

## Style

The codebase followed good programming practices. Everything is clear and organized. The codebase is readable and easy to navigate. The style used for the Schemas is consistent and adheres to Prisma’s style conventions. All the field types, defaults, and relationships use the same case and therefore shows uniformity. Prettier enforces consistent indentation and conventions.

## Documentation

There is very clear and detailed documentation on how to run the code.

# Improvements and Refactors

### Fabio

- Refactor garment classifier and edit flow to be robust to variation in LLM output. OpenAI is fed and returns stringified JSON schemas that are much more stable and can be reliably parsed directly, removing the need for complex parsing and handling of edge cases, instead relying on pre-defined garment spec schemas (used in editor), and a list of garment instances to select from (classification).

- 

### Eric

- Enhanced the schema.prisma file with detailed comments to improve clarity and facilitate smoother understanding of relationships between classes. Ensured that naming conventions and style remained consistent between models.