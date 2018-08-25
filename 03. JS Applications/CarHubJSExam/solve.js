"use strict";

function startApp() {

    const kinveyBaseUrl = "https://baas.kinvey.com";
    const kinveyAppKey = "kid_ByBc_T5Bm";
    const kinveyAppSecret = "6dfcf0d7f59b46648072190e0b3d946e";
    const kinveyAppAuthHeaders = {'Authorization': 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)};

    //LINKS
    let homeLink = $('#home');
    let loginLink = $('#loginBtn');
    let registerLink = $('#registerBtn');
    let logoutLink = $("#logoutLink");

    //views
    let homeView = $('#main');
    let loginView = $('#login');
    let registerView = $('#register');
    //messages
    let loadingBox = $('#loadingBox');
    let infoBox = $('#infoBox');
    let errorBox = $('#errorBox');

    //on load
    $('#allListings').hide();
    $('#myListings').hide();
    $('#createListing').hide();
    $('#profile').hide();
    $('#myCarListings').hide();
    loadingBox.hide();
    infoBox.hide();
    errorBox.hide();
    loginView.hide();
    registerView.hide();
    $('#car-listings').hide();
    $('#createCar').hide();
    $('#editCar').hide();
    $('#listingDetails').hide();

    homeView.show();

    //hide Views
    function hideViews() {
        homeView.hide();
        loginView.hide();
        registerView.hide();
    }

    //Home
    homeLink.on('click', outHome);

    function outHome() {
        hideViews();
        homeView.show();
    }


    //Login
    loginLink.on('click', login);

    function login() {
        hideViews();
        loginView.show();
        $('#signUpBtn').on('click', register);

        $('#loginUserBtn').on('click', function (ev) {
            ev.preventDefault(); //SUBMIT BUTTON
            loadingBox.show();
            let username = $('#login input[name="username"]').val();
            let password = $('#login input[name="password"]').val();
            let userData = {username, password};

            $('#signUpBtn').on('click', register);

            $.ajax({
                method: "POST",
                url: kinveyBaseUrl + '/user/' + kinveyAppKey + '/login',
                headers: kinveyAppAuthHeaders,
                data: userData,
                success: loginSuccess,
                error: errorMsg
            });

            function loginSuccess(userInfo) {
                logged(userInfo);
                loadingBox.hide();
                infoBox.text('Login successful');
                infoBox.show();
                setTimeout(() => {
                    infoBox.fadeOut()
                }, 3000)

            }

            function errorMsg() {
                loadingBox.hide();
                errorBox.text('Invalid username or password');
                errorBox.show();
                setTimeout(() => {
                    errorBox.fadeOut()
                }, 3000);
                $('#login input[name="username"]')[0].value = '';
                $('#login input[name="password"]')[0].value = '';
            }
        })
    }

    //Register
    registerLink.on('click', register);

    function register() {
        hideViews();
        registerView.show();

        $('#signInBtn').on('click', login);

        $('#registerUserBtn').on('click', (ev) => {
            ev.preventDefault(); //SUBMIT BUTTON
            loadingBox.show();
            let username = $('#register input[name="username"]').val();
            let password = $('#register input[name="password"]').val();
            let repeatPass = $('#register input[name="repeatPass"]').val();
            let userData = {username, password};

            if (RegExp("^[a-zA-Z]{3,}$").test(username)) {
                if (RegExp("^[a-zA-Z0-9]{6,}$").test(password)) {
                    if (password === repeatPass) {
                        $.ajax({
                            method: "POST",
                            url: kinveyBaseUrl + '/user/' + kinveyAppKey,
                            headers: kinveyAppAuthHeaders,
                            data: userData,
                            success: registerSuccess,
                            error: handleError
                        });

                        // noinspection JSAnnotator
                        function registerSuccess(userInfo) {
                            logged(userInfo);
                            loadingBox.hide();
                            infoBox.text('Register successful');
                            infoBox.show();
                            setTimeout(() => {
                                infoBox.fadeOut()
                            }, 3000);
                        }

                        // noinspection JSAnnotator
                        function handleError(err) {
                            loadingBox.hide();
                            errorBox.text(err);
                            errorBox.show();
                            setTimeout(() => {
                                errorBox.fadeOut()
                            }, 3000);
                        }
                    } else {
                        loadingBox.hide();
                        errorBox.text('Passwords do not match');
                        errorBox.show();
                        setTimeout(() => {
                            errorBox.fadeOut()
                        }, 3000);
                    }
                } else {
                    loadingBox.hide();
                    errorBox.text('Bad password');
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                }
            } else {
                loadingBox.hide();
                errorBox.text('Bad username');
                errorBox.show();
                setTimeout(() => {
                    errorBox.fadeOut()
                }, 3000);
            }
        })
    }

    //loggedUser
    function logged(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        const kinveyAppAuthToken = {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')};
        const user = sessionStorage.getItem('userId');

        //links
        $('#welcomeMessage').text(`Welcome, ${userInfo.username}!`);
        let allListingsLink = $('#allListings');
        let myListingsLink = $('#myListings');
        let createListingLink = $('#createListing');
        //views
        let carListings = $('#car-listings');
        let createCar = $('#createCar');
        let editCar = $('#editCar');
        let myListings = $('#myCarListings');

        //on load
        allListingsLink.show();
        myListingsLink.show();
        createListingLink.show();
        loadingBox.hide();
        infoBox.hide();
        errorBox.hide();
        loginView.hide();
        registerView.hide();
        carListings.show();
        $('#profile').show();

        carListing();

        function hideViews() {
            homeView.hide();
            carListings.hide();
            createCar.hide();
            editCar.hide();
            myListings.hide();
            $('#listingDetails').hide();
        }

        //home
        homeLink.on('click', () => {
            if (sessionStorage.length === 0) {
                outHome();
            } else {
                carListing();
            }
        });
        allListingsLink.on('click', carListing);

        //All listings
        function carListing(ev) {
            hideViews();
            $('#listings').html("");
            carListings.show();
            loadingBox.show();
            $.ajax({
                method: "GET",
                url: `${kinveyBaseUrl}/appdata/${kinveyAppKey}/cars?query={}&sort={"_kmd.ect": -1}`,
                headers: kinveyAppAuthToken,
                success: showCars,
                error: errorMsg
            });

            function showCars(info) {

                loadingBox.hide();
                if (info) {
                    for (let user of info) {
                        let firstDiv = $("<div class=\"listing\" id=\"exampleCar\"></div>");
                        let paragraph = $(`<p>${user.title}</p>`);
                        let image = $(`<img>`).attr("src", user.imageUrl);
                        let h2 = $(`<h2>${user.brand}</h2>`);
                        let secondDiv = $(`<div class="info">`);
                        let thirdDiv = $(`<div id="data-info">`);
                        let h3 = $(`<h3>Seller: ${user.seller}</h3><h3>Fuel: ${user.fuelType}</h3><h3>Year: ${user.year}</h3><h3>Price: ${user.price} $</h3>`);
                        let buttons = $(`<div id="data-buttons">`);
                        let ul = $('<ul>');
                        let detailsButton = $(`<a href="#" class="button-carDetails">Details</a>`).on('click', () => {
                            loadingBox.show();
                            details(user)
                        });
                        let editButton = $(`<a href="#" class="button-carDetails">edit</a>`).on('click', () => {
                            loadingBox.show();
                            editCarView(user)
                        });
                        let deleteButton = $(`<a href="#" class="button-carDetails">delete</a>`).on('click', () => {
                            deleteCar(user._id)
                        });

                        secondDiv.append(thirdDiv.append(h3));
                        secondDiv.append(buttons.append(ul.append($('<li class="action">').append(detailsButton))));
                        if (user.seller === userInfo.username) {
                            ul.append($('<li class="action">').append(editButton)).append($('<li class="action">').append(deleteButton));
                        }
                        firstDiv.append(paragraph).append(image).append(h2).append(secondDiv);
                        $('#listings').append(firstDiv);
                    }

                } else {
                    $('#listings').append($(`<p class="no-cars" id="noCars">No cars in database.</p>`))
                }
            }

            function errorMsg(error) {
                loadingBox.hide();
                errorBox.text(error);
                errorBox.show();
                setTimeout(() => {
                    errorBox.fadeOut()
                }, 3000);
            }
        }

        //My Listing
        myListingsLink.on('click', (ev) => {
            hideViews();
            $('#my-cars-list').empty();

            loadingBox.show();
            myListings.show();

            $.ajax({
                method: "GET",
                url: `${kinveyBaseUrl}/appdata/${kinveyAppKey}/cars?query={"seller":"${userInfo.username}"}&sort={"_kmd.ect": -1}`,
                headers: kinveyAppAuthToken,
                data: user,
                success: showMyCars,
                error: errorMsg
            });

            function showMyCars(info) {
                loadingBox.hide();
                let hasCar = 0;
                if (info) {
                    for (let car of info) {
                        if (car.seller === userInfo.username) {
                            hasCar++;
                            let div = $(`<div class="my-listing">`);
                            let paragraph = $(`<p id="listing-title">${car.title}</p>`);
                            let image = $(`<img>`).attr("src", car.imageUrl);
                            let firstInner = $(`<div class="listing-props">`);
                            let h2 = $(`<h2>Brand: ${car.brand}</h2><h3>Model: ${car.model}</h3><h3>Year: ${car.year}</h3><h3>Price: ${car.price}$</h3>`);
                            let secondInner = $(`<div class="my-listing-buttons">`);
                            let detailsBtn = $(`<a href="#" class="my-button-list">Details</a>`).on('click', () => {
                                details(car)
                            });
                            let editBtn = $(`<a href="#" class="my-button-list">Edit</a>`).on('click', () => {
                                editCarView(car)
                            });
                            let deleteBtn = $(`<a href="#" class="my-button-list">Delete</a>`).on('click', () => {
                                deleteCar(car._id)
                            });

                            secondInner.append(detailsBtn).append(editBtn).append(deleteBtn);
                            firstInner.append(h2);
                            div.append(paragraph).append(image).append(firstInner).append(secondInner);
                            $('#my-cars-list').append(div);
                        }
                    }
                }
                if (hasCar === 0) {
                    $('#my-cars-list').append($(`<p class="no-cars"> No cars in database.</p>`))
                }
            }

            function errorMsg(error) {
                loadingBox.hide();
                errorBox.text(error);
                errorBox.show();
                setTimeout(() => {
                    errorBox.fadeOut()
                }, 3000);
            }
        });

        //Create car
        createListingLink.on('click', () => {
            hideViews();
            createCar.show();
            $('#createCar').trigger("reset");


            $('#createCarBtn').on('click', (ev) => {
                ev.preventDefault();
                loadingBox.show();
                ev.stopImmediatePropagation();

                let title = $('#createCar input[name="title"]').val();
                let description = $('#createCar input[name="description"]').val();
                let brand = $('#createCar input[name="brand"]').val();
                let model = $('#createCar input[name="model"]').val();
                let year = $('#createCar input[name="year"]').val();
                let imageUrl = $('#createCar input[name="imageUrl"]').val();
                let fuelType = $('#createCar input[name="fuelType"]').val();
                let price = $('#createCar input[name="price"]').val();
                let data = {
                    title,
                    description,
                    brand,
                    model,
                    year,
                    imageUrl,
                    fuelType,
                    price,
                    seller: userInfo.username
                };

                //validate
                // if (title.length <= 33 && description.length <= 450 && description.length >= 30 &&
                //     brand.length <= 11 && fuelType.length <= 11 && model.length <= 11 && model.length >= 4
                //     && year.length === 4 && price.length < 7 && RegExp('^http').test(imageUrl)
                //     && title !== '' && brand !== '' && year !== '' && fuelType !== '' && price !== '') {

                    $.ajax({
                        method: "POST",
                        url: `${kinveyBaseUrl}/appdata/${kinveyAppKey}/cars`,
                        headers: kinveyAppAuthToken,
                        contentType: "application/json",
                        data: JSON.stringify(data),
                        success: createSuccess,
                        error: errorMsg
                    });

                    // noinspection JSAnnotator
                    function createSuccess(info) {
                        loadingBox.hide();
                        infoBox.text('Listing created');
                        setTimeout(() => {
                            infoBox.fadeOut()
                        }, 3000);
                        carListing();
                    }

                    // noinspection JSAnnotator
                    function errorMsg(error) {
                        loadingBox.hide();
                        errorBox.text(error);
                        errorBox.show();
                        setTimeout(() => {
                            errorBox.fadeOut()
                        }, 3000);
                    }
                // } else {
                //     loadingBox.hide();
                //     errorBox.show();
                //     setTimeout(() => {
                //         errorBox.fadeOut()
                //     }, 3000);
                // }

            });
        });

        //Edit car
        function editCarView(car) {
            hideViews();
            editCar.show();
            loadingBox.hide();
            $('#editCar input[name="title"]').val(car.title);
            $('#editCar input[name="description"]').val(car.description);
            $('#editCar input[name="brand"]').val(car.brand);
            $('#editCar input[name="model"]').val(car.model);
            $('#editCar input[name="year"]').val(car.year);
            $('#editCar input[name="imageUrl"]').val(car.imageUrl);
            $('#editCar input[name="fuelType"]').val(car.fuelType);
            $('#editCar input[name="price"]').val(car.price);

            $('#editCar button[type="submit"]').on('click', (ev) => {
                ev.preventDefault();
                loadingBox.show();
                let title = $('#editCar input[name="title"]').val();
                let description = $('#editCar input[name="description"]').val();
                let brand = $('#editCar input[name="brand"]').val();
                let model = $('#editCar input[name="model"]').val();
                let year = $('#editCar input[name="year"]').val();
                let imageUrl = $('#editCar input[name="imageUrl"]').val();
                let fuelType = $('#editCar input[name="fuelType"]').val();
                let price = $('#editCar input[name="price"]').val();
                let seller = car.seller;

                let edited = {title, description, brand, model, year, imageUrl, fuelType, price, seller};

                if (title.length <= 33 && description.length <= 450 && description.length >= 30 &&
                    brand.length <= 11 && fuelType.length <= 11 && model.length <= 11 && model.length >= 4
                    && year.length === 4 && price.length < 7 && RegExp('^http').test(imageUrl)
                    && title !== '' && brand !== '' && year !== '' && fuelType !== '' && price !== '') {

                    $.ajax({
                        method: "PUT",
                        url: `${kinveyBaseUrl}/appdata/${kinveyAppKey}/cars/${car._id}`,
                        headers: kinveyAppAuthToken,
                        data: edited,
                        success: editSuccess,
                        error: errorMsg
                    });

                    // noinspection JSAnnotator
                    function editSuccess(info) {
                        loadingBox.hide();
                        carListing();
                        infoBox.text(`Listing ${title} updated.`);
                        infoBox.show();
                        setTimeout(() => {
                            $('#infoBox').fadeOut()
                        }, 3000);
                    }

                    // noinspection JSAnnotator
                    function errorMsg(error) {
                        loadingBox.hide();
                        errorBox.text(error);
                        errorBox.show();
                        setTimeout(() => {
                            errorBox.fadeOut()
                        }, 3000);
                    }
                } else {
                    loadingBox.hide();
                    errorBox.text();
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                }
            })
        }

        //Delete car
        function deleteCar(carId) {
            loadingBox.show();
            $.ajax({
                method: "DELETE",
                url: `${kinveyBaseUrl}/appdata/${kinveyAppKey}/cars/${carId}`,
                headers: kinveyAppAuthToken,
                success: deleteSuccess,
                error: errorMsg
            });

            function deleteSuccess() {
                loadingBox.hide();
                infoBox.text('');
                infoBox.text('Listing deleted.');
                infoBox.show();
                setTimeout(() => {
                    infoBox.fadeOut()
                }, 3000);
                carListing();
            }

            function errorMsg(error) {
                loadingBox.hide();
                errorBox.text(error);
                errorBox.show();
                setTimeout(() => {
                    errorBox.fadeOut()
                }, 3000);
            }
        }

        //Details
        function details(car) {
            hideViews();
            loadingBox.hide();
            $('#listingDetails').show();
            $('#carDetails').empty();
            let editBtn = $(`<a href="#" class="button-list">Edit</a>`).on('click', () => {
                editCarView(car)
            });
            let deleteBtn = $(`<a href="#" class="button-list">Delete</a>`).on('click', () => {
                deleteCar(car._id)
            });
            let container = $('#listingDetails div[class="my-listing-details"]');
            container.append($(`<p id="auto-title">${car.title}</p>`))
                .append($(`<img>`).attr("src", car.imageUrl))
                .append($(`<div class="listing-props">`)
                    .append($(`<h2>Brand: ${car.brand}</h2>`))
                    .append($(`<h3>Model: ${car.model}</h3>`))
                    .append($(`<h3>Year: ${car.year}</h3>`))
                    .append($(`<h3>Fuel: ${car.fuel}</h3>`))
                    .append($(`<h3>Price: ${car.price}$</h3>`)));

            if (car.seller === userInfo.username) {
                container.append($(`<div class="listings-buttons">`).append(editBtn).append(deleteBtn));
            }
            container.append($(`<p id="description-title">Description:</p>`))
                .append($(`<p id="description-para">${car.description}</p>`));
        }


    }

    //logout
    logoutLink.on('click', (ev) => {
        loadingBox.show();
        $.ajax({
            method: 'POST',
            url: `${kinveyBaseUrl}/user/${kinveyAppKey}/_logout`,
            headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
            success: logout
        });

        function logout() {
            sessionStorage.clear();
            loadingBox.hide();
            infoBox.text('Logout successful');
            infoBox.show();
            setTimeout(() => {
                infoBox.fadeOut()
            }, 3000);
        }

        //on load
        $('#allListings').hide();
        $('#myListings').hide();
        $('#createListing').hide();
        $('#profile').hide();
        $('#myCarListings').hide();
        errorBox.hide();
        loginView.hide();
        registerView.hide();
        $('#car-listings').hide();
        $('#createCar').hide();
        $('#editCar').hide();
        $('#listingDetails').hide();
        outHome();

        //Login Form Reset
        $('#loginForm')[0].reset();
        //Register Form Reset
        $('#register')[0].reset();
    })
}