# What's Cookin'

## Abstract:
[//]: <>
We built an application that has a variety of recipes for users to choose from. The recipes, ingredients, and randomly selected users were generated from three different data sets which we imported using the Fetch API. The user can scroll through these recipes, search by keyword, or filter by category. Clicking on a single recipe displays the instructions, ingredients, and total cost, and allows the user to save the recipe to their "My Recipe" section or print the recipe for later. Once in the "My Recipe" section, the user can also filter and search within their saved recipes. Saved recipes are posted to a local server and exist after the page refresh. The website is fully tab-able and accessible with 0 [Wave](https://wave.webaim.org/extension/) errors and a 100% rating using the LightHouse tool in Google Chrome. 

## Installation Instructions:
[//]: <>
1. Fork and clone [this repo](https://github.com/jfogiato/whats-cookin) and [this repo (backend API)](https://github.com/turingschool-examples/whats-cookin-api).
1. Copy the SSH key from the green "Code" button within each repo.
1. In your terminal, use the command `git clone git@github.com:[the link to each repo]`.
1. Run `npm install` in both local repositories.
1. Do NOT run `npm audit fix --force` when prompted.
1. Open the repo in your text editor to make any changes or inspect code.
1. Run `npm start` in your terminal for both repos.
1. Copy and paste the generated `localServer` address that your terminal provides for the front end repo into your browser address bar.

## Preview of App:
[//]: <>
*Part 1*

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/57634618/218500788-24909f32-a4f9-4a1c-8d41-f57e7f816ed4.gif)

*Part 2*

![ezgif com-resize](https://user-images.githubusercontent.com/57634618/221380923-25103d77-e03e-4421-994b-3dc9cde2ce86.gif)

## Context:
[//]: <>
We were assigned part 1 of this project on Friday, February 3rd and had until Monday, February 13th to complete the project. We spent 3-5 hours a day either individually, paired or as a group (for a total of 28 hours), and had the majority of the project completed by Saturday. We were in our 3rd week of Mod 2 at Turing.

We were assigned part 2 of this project on Tuesday, February 21st and completed the project on Saturday the 25th. We spent a total of 20 hours on part 2 and implemented additional features such as full accessibility, POST & DELETE network requests allowing users to have their saved recipes persist after page load, styling refinement, and the ability to print a recipe.

## Contributors:
[//]: <>
- [Joseph 'Joe' Fogiato](https://github.com/jfogiato)
- [Jeffrey 'Jeff' Sahim](https://github.com/jsahim)
- [Christopher 'Chris' Baum](https://github.com/qrispi)
- [Thomas 'Tom' Doder](https://github.com/LordSchwifty)

## Learning Goals:
[//]: <>
1. Implement ES6 classes that communicate to each other as needed.
1. Use object and array prototype methods to perform data manipulation.
1. Create a user interface that is easy to use and clearly displays information.
1. Write modular, reusable code that follows SRP (Single Responsibility Principle).
1. Implement a robust testing suite using TDD.
1. Carry out UX workshopping and implement feedback from outside usability test. 
1. Work with a local server and make network requests to API endpoints to retrieve and manipulate data.
1. Ensure our app follows best practices for accessibility.
1. Practice talking about our code and high level technical concepts.
1. Improve group workflow.

## Technologies Used:
[//]: <>
- Fetch API
- Webpack
- Mocha & Chai
- LightHouse
- Wave Evaluation
- GitHub Issues & Project Board
- JavaScript
- CSS
- HTML

## Wins + Challenges:
[//]: <>
- Wins:
  - Using APIs was a new concept and the team did a great job of researching and then utilizing this concept on the web app. We successfully fetched, parsed and displayed data from 3 separate URL sources. In part 2, we then used POST and DELETE in conjunction with a local server to have user data persist after page refresh. 
  - Utilized Git and GitHub workflow to create branches and maintain seamless asynchronous workflow with no merge conflicts due in part to our communication.
  - Leveraged GitHub Projects & Issues tools to manage workflow and expectations for project scope, bug resolution and feature enhancements.
  - We creatively designed and implemented our own verison of a Micromodal UI feature.
- Challenges:
  - We were able to circumnavigate an issue with getting our Recipe Title to constrain its size within the give text area based on character length of each title.
  - While implementing API data on the site was a win, it was also a challenge. Being a new concept we spent a lot of time figuring out how to access the data to make it usable in our code.
  - In order to make the application fully tab-able, we had to redesign the navigation bar filtering. This took a lot of trial and error and brainstorming to allow for functionality within our existing class methods. Ultimately we were able to successfully implement a dropdown filtering function. 
  - We delt with the data structure from the cloned local-server being changed mid-week which led to our fetch requests failing. The team was able to troubleshoot the errors and restructure our fetch calls to correctly request and send the data. 
