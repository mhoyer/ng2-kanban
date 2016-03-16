# ng2-kanban

An attempt to create a slightly more complex application instead of a boring todo list.

## Overview

### Common achitecture/infrastructural requirements:
- Persist state to local storage (in a first place)
- Use of ngrx + seamless-immutable for redux style archictecture
- Routing to boards
- Code coverage
- Unit testing

### Main components

**Kanban** - board creation and selection
**Board** - column creation and board editing (title)
**Column** - card creation and column editing (title)
**Card** - card editing (title, description)

#### Kanban
##### Properties
- list of boards
- active board
##### Actions
- √ select active board
- √ create board

#### Board
##### Properties
- title
- list of columns
##### Actions
- √ create column
- √ update board (title)
- √ delete board

#### Column
##### Properties
- title
- list of cards
##### Actions
- create card
- move card
- √ update column (title)
- √ delete column

#### Card
##### Properties
- title
- description
##### Actions
- update card (title, description)
- delete card

## Possible extensions

- Enable authentification (something fake in a first place)
- Enable drag and drop for cards
- Enable task lists for cards
- Enable comments for cards
- Confirmation dialogs
- Reordering columns
- Support persons to assign cards to someone responsible
- Replace persistence with simple RESTful client