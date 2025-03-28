## Vehicle Router

* GET - /vehicle/featured
* GET - /vehicle/type
* GET - /vehicle/:id

## Category Router

* GET - /category/:id
* GET - /category
* POST - /category
* PUT - /category/:id
* DELETE - /category/:id

## Inquiry Router

* POST - /inquiry
* GET - /inquiry

## Review Router

* GET - /vehicle/:id/review
* POST - /review
* PUT - /review/:id
* DELETE - /review/:id
* PUT - /vehicle/review/:id
* DELETE - /vehicle/review/:id

## Account Router (Authentication)

* GET - /account/login
* POST - /account/login
* POST - /account/register
* GET - /account

## Account Router (User Dashboard)

* GET - /account/review
* GET - /account/repair
* GET - /account
* PUT - /account

## Account Router (Admin Dashboard - Owner)

* GET - /account
* POST - /vehicle
* GET - /vehicle
* GET - /vehicle/:id
* PUT - /vehicle/:id
* DELETE - /vehicle/:id

## Account Router (Admin Dashboard - Employee)

* GET - /account
* PUT - /vehicle/:id
* DELETE - /vehicle/:id
* GET - /repair
* PUT - /repair/:id

## Repair Router

* POST - /repair
* GET - /repair
* GET - /repair/:id
* PUT - /repair/:id