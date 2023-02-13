# What's Cookin'

## Abstract:
[//]: <>
We built an application that has a variety of recipes for users to choose from. The recipes, ingredients, and randomly selected users were generated from three different data sets which we imported using Fetch API. The user can scroll through these recipes, search by keyword, or filter by category. Clicking on a single recipe displays the instructions, ingredients, and total cost, and allows the user to save the recipe to their "My Recipe" section. Once in the "My Recipe" section, the user can also filter and search within their saved recipes.

## Installation Instructions:
[//]: <>
1. Fork and clone [this repo](https://github.com/jfogiato/whats-cookin)
1. Copy the SSH key from the green "Code" button within the repo.
1. In your terminal, use the command `git clone git@github.com:[the link to your repo]`.
1. Run `npm install`.
1. Do NOT run `npm audit fix --force` when prompted.
1. Open the repo in your text editor to make any changes or inspect code.
1. Run `npm start`.
1. Copy and paste the generated `localServer` address that your terminal provides into your browser address bar.

## Preview of App:
[//]: <>
![ezgif com-video-to-gif](https://user-images.githubusercontent.com/57634618/218500788-24909f32-a4f9-4a1c-8d41-f57e7f816ed4.gif)

## Context:
[//]: <>
We were assigned this project on Friday, February 3rd and had until Monday, February 13th to complete the project. We spent 3-5 hours a day either individually, paired or as a group (for a total of 28 hours), and had the majority of the project completed by Saturday. We are in our 3rd week of Mod 2 at Turing.

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
1. Make network requests to retrieve data.

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
  - Using APIs was a new concept and the team did a great job of researching and then utilizing this concept on the web app. We successfully fetched, parsed and displayed data from 3 separate URL sources.
  - Utilized Git and GitHub workflow to create branches and maintain seamless asynchronous workflow with no merge conflicts due in part to our communication.
  - Leveraged GitHub Projects & Issues tools to manage workflow and expectations for project scope, bug resolution and feature enhancements.
  - We creatively designed and implemented our own verison of a Micromodal UI feature.
- Challenges:
  - We were able to circumnavigate an issue with getting our Recipe Title to constrain its size within the give text area based on character length of each title.
  - While implementing API data on the site was a win, it was also a challenge. Being a new concept we spent a lot of time figuring out how to access the data to make it usable in our code.