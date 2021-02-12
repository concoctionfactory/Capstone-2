# WorkFlow

Workflow is a web-based collaborative management tool. - https://gracious-kowalevski-54e405.netlify.app/

- backend - https://work-flow-backend.herokuapp.com/
- frontend - https://gracious-kowalevski-54e405.netlify.app/

## Features

- adding/ removing/ editing (boards, list, cards)
- members can be added/removed from boards, only boards that are relevant to users are shown
- when creating a board the creator is automatically selected
- boards have a summary to the left, that show the completion of each list
- cards have a due date and progress state, to indicate to users the state of the card

## Tests

    - backend - run tests by using "jest"
    - frontend  - run tests by using "npm test"

## UserFlow

> users can try the site in demo mode by using demo mode or sign up and log in
> users are then directed to the home page where all the boards can be seen, new boards can be added here, clicking on a board brings the user to the board page
> users can new lists and cards on the board page

## Tech

--backend

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [psql] -open source object-relational database system

--frontend

- [ReactJS] - JavaScript library for building user interfaces
  _[Redux]-Predictable State Container for JS Apps
  _[Redux-thunk]-Thunk middleware for Redux.
  _[joi-browser]-joi object schema validation bundled for the browser
  _[Material-ui]- React UI framework.

## Todos

- adding the idea of teams
- adding the idea of "activity", allowing users to see and track changes that have been made

[node.js]: http://nodejs.org
[express]: http://expressjs.com
[psql]: https://www.postgresql.org/docs/9.3/app-psql.html
[reactjs]: https://reactjs.org/
[redux]: https://redux.js.org/
[redux-thunk]: https://github.com/reduxjs/redux-thunk
[joi-browser]: https://www.npmjs.com/package/joi-browser
[material-ui]: https://material-ui.com/
