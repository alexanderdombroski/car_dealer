# Routes

- [X] GET - /

## Account Router

- [X] GET - /account
- [X] PATCH - /account
- [X] GET - /account/login
- [X] GET - /account/logout
- [X] POST - /account/login
- [X] GET - /account/register
- [X] POST - /account/register

## Account Management Router

- [X] GET - /account/manage
- [X] PATCH - /account/manage:id
- [X] DELETE - /account/manage:id

## Vehicle Router

- [X] GET - /vehicle
- [X] GET - /vehicle/new
- [X] POST - /vehicle/new
- [X] GET - /vehicle/uncategorized
- [X] GET - /vehicle/:id
- [X] PATCH - /vehicle/:id
- [X] DELETE - /vehicle/:id

## Vehicle Category Router

- [X] GET - /vehicle/type
- [X] GET - /vehicle/type/:id
- [X] PUT - /vehicle/type/:id
- [X] DELETE - /vehicle/type/:id

## Vehicle Inquiry Router

- [X] GET - /vehicle/:id/inquiry
- [X] POST - /vehicle/:id/inquiry
- [ ] GET - /inquiry
- [ ] PUT - /inquiry/:id
- [ ] PATCH - /inquiry/:id
- [ ] DELETE - /inquiry/:id

## Review Router

- [X] POST - /vehicle/:id/review
- [X] PUT - /vehicle/:id/review/:rid
- [X] DELETE - /vehicle/:id/review/:rid

## Repair Router

- [ ] GET - /repair
- [ ] POST - /repair
- [ ] GET - /repair/manage
- [ ] PATCH - /repair/:id
- [ ] DELETE - /repair/:id
