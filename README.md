# EBayApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Challenge 1

- User will be able to search by keywords and filter by any or all the filters mentioned in the challenge.

- I have used 'HttpInterceptor' to serve json mocks for api calls. All the requests would be seen in the console instead of the network tab.

- Currently the search mock is only set up for a search string 'ca'. So irrespective of the search string, the search dropdown result would be populated from the mocks and remain the same (even though the API calls will contain the current search string).

Eg. Request: GET http://localhost:4200/autocomplete/ca

    Response:
    
    
    {
        "keyword": "ca",
        "autocompleteOptions": [
            "cars trucks",
            "card",
            "case break",
            "camera",
            "cadillac",
            "canada goose",
            "calvin klein",
            "camaro"
        ]
    }
    

- For demonstration purposes, the search list and filter list are populated only when the search string is 'card' and the mocks have data to mimic this search string. (even though an API call with the current string will be made, the page would be populated only for the string 'card').

eg. Request: GET http://localhost:4200/search/card

    Response: 
    {
        "keyword": "card",
        "searchItems": [
            {
                "refId": "1",
                "title": "eBay Canada Gift Card $25, $50, or $100 - email delivery",
                "imageUrl": "https://picsum.photos/150/150?random=1",
                "location": "CAN",
                "price": 50.00,
                "currency": "CAD",
                "condition": "new"
            },
            {
                "refId": "2",
                "title": "DEREK JETER 1992 draft card",
                "imageUrl": "https://picsum.photos/150/150?random=2",
                "location": "CAN",
                "price": 0.99,
                "currency": "CAD",
                "condition": "used"
            },
            {
                "refId": "3",
                "title": "Reggie Jackson Porcelin Signature Series 4 Card Set With Autographs And Cert",
                "imageUrl": "https://picsum.photos/150/150?random=3",
                "location": "USA",
                "price": 361.99,
                "currency": "CAD",
                "condition": "notSpecified"
            },
            {
                "refId": "4",
                "title": "2019 National Treasures Bo Bichette On Card AUTO Autograph # D 58/99 Toronto",
                "imageUrl": "https://picsum.photos/150/150?random=4",
                "location": "USA",
                "price": 1.42,
                "currency": "CAD",
                "condition": "new"
            },
            {
                "refId": "5",
                "title": "2019 Optic CODY MARTIN SP AUTOGRPAH RC Card CHARLOTTE HORNETS",
                "imageUrl": "https://picsum.photos/150/150?random=5",
                "location": "USA",
                "price": 29.00,
                "currency": "CAD",
                "condition": "used"
            },
            {
                "refId": "6",
                "title": "2019 Panini Toronto Raptors NBA Basketball Champions Complete 30 Card Box Set",
                "imageUrl": "https://picsum.photos/150/150?random=6",
                "location": "USA",
                "price": 49.99,
                "currency": "CAD",
                "condition": "new"
            }
        ],
        "filters": [
            {
                "key": "location",
                "options": [
                    {
                        "value": "CAN",
                        "count": 21
                    },
                    {
                        "value": "USA",
                        "count": 44
                    }
                ]
            },
            {
                "key": "condition",
                "options": [
                    {
                        "value": "new",
                        "count": 33
                    },
                    {
                        "value": "used",
                        "count": 34
                    },
                    {
                        "value": "notSpecified",
                        "count": 12
                    }
                ]
            }
        ]
    }

- All the pictures in the searched items are randomly generated dummies and are of the same size.

- Any applied filters will filter the item list for cards to the items in 'United States'. The API calls would reflect the correct filters but the mock would return just the items in 'United States'.

Request: GET http://localhost:4200/search/card?location=USA

Response: similar format as search

- When the user refreshes, the search parameters would be preserved and search would be re-executed. User can also share the url.

## Challenge 2

- Currently, since the only page involved was the search page, I used a service to consolidate data. For an app with multiple pages/components we can use a redux store.

- I have assumed that the price currency is 'CAD'.

- Still need to capture errored api responses. (non STATUS 200 responses)

- Possible edge cases.
    1. A response with no item to display.
    2. Server errors
    3. MinPrice/ MaxPrice validation errors. eg. (Min Price < Max Price)
    4. Handle different scenarios, where user changes query parameters when copy pasting.

- Still need to implement extensive unit tests.

- For pagination support, we could send the 'pageNumber' and the 'sortCriteria' along with the other query parameters in the search/filter request. We could also include a parameter called 'itemsPerPage' or we could default it to some value (eg. 20) in the backend. These parameters along with the filtering criteria should help in fetching the items to be displayed.

- There are many ways of improving page performance.
  1. I have included AOT (Ahead of time) compilation as part of the build and serve. This provides performance improvement as compared to JIT (Just in Time) compilation. AOT compiler converts the code during the build time before the browser downloads and run the code. On the other hand JIT happens during run-time.

  2. If we have many image assets to be displayed on the page, we can combine it into an image sprite and use css to render the different assets.   
