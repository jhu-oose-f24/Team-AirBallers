*Software Requirement Specification*

Problem Statement: A few sentences to describe the problem you are trying to solve, i.e., justify why this software is needed.

An issue that many fashion and garment designers face is creative drought when designing pieces for their brand. Current garment design apps have no method to generate sample pieces. Traditional iteration on clothing design requires time-consuming back and forth with manufacturers for sizing, fit, style, etc.


Potential Clients: Who are influenced by this problem and would benefit from the proposed solution? (i.e. the potential users)

This problem is often faced by newer designers creating their first or second clothing brand, though fashion veterans can also find themselves in a creative slump. This solution could help those artists who want to discover, find, or create their own style and generate a garment that might be similar to another item.


Proposed Solution: Write a few sentences that describe how a software solution will solve the problem described above.

Our app provides creative inspiration and rapid virtual iteration on designs, coupled with actionable advice and tips that decrease barrier of entry to fashion designing. By using an AI image generator, users can create a sample for a garment by prompting the application and editing the garment afterwards. Additionally, the user can sort generated designs into folders and collections. 


Functional Requirements: List the (functional) requirements that software needs to have in order to solve the problem stated above. List these in role-goal-benefit format. It is useful to try to group the requirements into those that are essential (must have), and those which are non-essential (but nice to have).
Must have

- As a designer, I want to generate natural language fashion design images to help aid my creative process.
- As a user of the website, I want to view generated designs, save my creations, edit them at a later date, and remove designs if necessary.
- As a recurring user, I want to login to the website to view my previously created and favorited designs.

Nice to have
- As a designer who wants multiple views of my generated garment, I want a 3D view of the garment after it is generated so that I can view the garment in multiple angles without being limited to the front and back. 
- As a newer fashion designer with a logo or branding for my clothing brand, I want my garment to have suggestions on where to put my logos or other branding so that I can simply add them when editing the piece.
- As a person who likes to share what I have made to others (possibly to the rest of my company/group), I want to be able to share my designs to other users or my contacts so that I can share my designs with ease without needing to lose any important details.


Non-functional Requirements:

Speed - UI should be fast & responsive, Queries should respond in reasonable time.
Accessibility - UI should be straightforward & intuitive to use, comply w/ accessibility req’s.
Security - Users need to be authenticated, prevent data loss or leaks.
Maintenance - Easy to expand on and maintain.
Deployment Uptime (99.9%)


Software Architecture & Technology Stack: Will this be a Web/desktop/mobile (all, or some other kind of) application? Would it conform to specific software architecture? What programming languages, frameworks, databases, …, will be used to develop and deploy the software?

Application Type: Web application.
Software Architecture: Client-server architecture
Technology Stack:
Languages: Javascript, HTML, CSS, Python
Frontend: Next.js (React framework), Tailwind CSS & ShadCN (responsive and customizable styling)
Backend: Node.js, Prisma ORM
Database: MongoDB - ideal for unstructured data
File Storage: Amazon S3 (serve and manage images)
External APIs: OpenAI: For natural language processing and AI-powered functionalities. FluxAI: For image generation capabilities.
Hosting: Vercel for integration with Next.js - fast deployment, serverless functionality


Similar Apps: List a few similar applications to the one you are developing. Don't be eager to conclude no similar app exists! There is always something similar to what you are building! Finding those will help you to better specify your project. You must be prepared to explain how your app is different from the existing ones.


CLO | 3D Fashion Design Software (clo3d.com) (3D Design Engine/Application, No AI integration, targeted to professionals)
TukaCAD | Fashion CAD Software (tukatech.com/tukacad/) (Software designed to modify, create, and grade digital patterns, AI integration, targeted to professionals)
Browzwear | 3D Fashion Design Software (browzwear.com) (Another 3D Design engine, no AI, targeted to professionals)
Midjourney | Art Generative AI (midjourney.com) (AI designed to generate art based on prompts)
