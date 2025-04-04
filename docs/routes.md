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

## Inquiry Router

- [X] GET - /vehicle/:id/inquiry
- [X] POST - /vehicle/:id/inquiry
- [ ] PUT - /vehicle/:id/inquiry
- [ ] DELETE - /vehicle/:id/inquiry

## Review Router

- [X] POST - /vehicle/:id/review
- [X] PUT - /vehicle/:id/review/:rid
- [X] DELETE - /vehicle/:id/review/:rid

## Account Router (User Dashboard)

- [ ] GET - /account/review
- [ ] GET - /account/repair

## Account Router (Admin Dashboard - Owner)

- [ ] GET - /account

## Account Router (Admin Dashboard - Employee)

- [ ] GET - /account
- [ ] PUT - /vehicle/:id
- [ ] DELETE - /vehicle/:id
- [ ] GET - /repair
- [ ] PUT - /repair/:id

## Repair Router

- [ ] POST - /repair
- [ ] GET - /repair
- [ ] GET - /repair/:id
- [ ] PUT - /repair/:id