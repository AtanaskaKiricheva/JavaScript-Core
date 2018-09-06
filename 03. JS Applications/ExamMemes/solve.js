"use strict";

function startApp() {

    const kinveyBaseUrl = "https://baas.kinvey.com";
    const kinveyAppKey = "kid_S1sCMYIDQ";
    const kinveyAppSecret = "1dc0746939eb403ead5d0afc8a9e2a88";
    const kinveyAppAuthHeaders = {'Authorization': 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)};

    //LINKS
    let homeLink = $('#homeLink');
    let loginLink = $('#loginLink');
    let registerLink = $('#registerLink');
    let logoutLink = $("#logoutLink");
    let createListingLink = $('#createMemeLink');
    let myProfileLink = $("#myProfileLink");
    let welcomeLink = $("#welcomeLink");

    //views
    let homeView = $('#main');
    let loginView = $('#login');
    let registerView = $('#register');
    let allListingsView = $('#meme-feed');
    let createView = $('#create-meme');
    let editView = $('#edit-meme');
    let detailsView = $(".meme-details");
    let userProfileView = $(".user-profile");


    //messages
    let loadingBox = $('#loadingBox');
    let infoBox = $('#infoBox');
    let errorBox = $('#errorBox');

    //on load views
    loadingBox.hide();
    infoBox.hide();
    errorBox.hide();
    hideViews();
    homeView.show();

    //on load links
    homeLink.show();
    logoutLink.hide();
    createListingLink.hide();
    welcomeLink.hide();
    myProfileLink.hide();

    //hide Views
    function hideViews() {
        loginView.hide();
        registerView.hide();
        allListingsView.hide();
        createView.hide();
        editView.hide();
        detailsView.hide();
        homeView.hide();
        userProfileView.hide();
    }

    //Home
    homeLink.on('click', () => {
        outHome();
        $(this).off('click');
    });

    function outHome() {
        hideViews();
        homeView.show();

        $('#login input[name="username"]').val("");
        $('#login input[name="password"]').val("");

        $('#register input[name="username"]').val("");
        $('#register input[name="password"]').val("");
        $('#register input[name="repeatPass"]').val("");
        $('#register input[name="email"]').val("");
        $('#register input[name="avatarUrl"]').val("");
    }


    //Login
    loginLink.on('click', () => {
        login();
        $(this).off('click');
    });
    $("#signUpLink").on('click', () => {
        register();
        $(this).off('click');
    });

    function login() {
        hideViews();
        loginView.show();
        $('#login input[name="username"]').val("");
        $('#login input[name="password"]').val("");

        $('#loginUserBtn').on('click', function (ev) {
            ev.preventDefault(); //SUBMIT BUTTON
            loadingBox.show();
            let username = $('#login input[name="username"]').val();
            let password = $('#login input[name="password"]').val();

            $('#register input[name="username"]').val("");
            $('#register input[name="password"]').val("");
            $('#register input[name="repeatPass"]').val("");
            $('#register input[name="email"]').val("");
            $('#register input[name="avatarUrl"]').val("");
            let userData = {username, password};

            $(this).off('click');
            $.ajax({
                method: "POST",
                url: kinveyBaseUrl + '/user/' + kinveyAppKey + '/login',
                headers: kinveyAppAuthHeaders,
                data: userData,
                success: loginSuccess,
                error: errorMsg
            });

            function loginSuccess(userInfo) {
                loadingBox.hide();
                $("#infoBox span").text('Login successful');
                infoBox.show();
                logged(userInfo);

                $('#login input[name="username"]').val("");
                $('#login input[name="password"]').val("");
                setTimeout(() => {
                    infoBox.fadeOut()
                }, 3000)

            }

            function errorMsg() {
                loadingBox.hide();
                $("#errorBox span").text('Invalid username or password');
                errorBox.show();
                setTimeout(() => {
                    errorBox.fadeOut()
                }, 3000);
                login();
            }
        })
    }

    //Register
    registerLink.on('click', () => {
        register();
        $(this).off('click');
    });
    $("#signInLink").on('click', () => {
        login();
        $(this).off('click');
    });

    function register() {
        hideViews();
        registerView.show();

        $('#login input[name="username"]').val("");
        $('#login input[name="password"]').val("");
        $('#register input[name="username"]').val("");
        $('#register input[name="password"]').val("");
        $('#register input[name="repeatPass"]').val("");
        $('#register input[name="email"]').val("");
        $('#register input[name="avatarUrl"]').val("");

        $('#registerUserBtn').on('click', (ev) => {
            $(this).off('click');

            ev.preventDefault(); //SUBMIT BUTTON
            loadingBox.show();
            let username = $('#register input[name="username"]').val();
            let password = $('#register input[name="password"]').val();
            let repeatPass = $('#register input[name="repeatPass"]').val();
            let email = $('#register input[name="email"]').val();
            let avatar = $('#register input[name="avatarUrl"]').val();
            let userData = {username, password, email, avatar};

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
                            $("#infoBox span").text('Register successful');
                            infoBox.show();

                            $('#register input[name="username"]').val("");
                            $('#register input[name="password"]').val("");
                            $('#register input[name="repeatPass"]').val("");
                            $('#register input[name="email"]').val("");
                            $('#register input[name="avatarUrl"]').val("");
                            setTimeout(() => {
                                infoBox.fadeOut()
                            }, 3000);
                        }

                        // noinspection JSAnnotator
                        function handleError(err) {
                            loadingBox.hide();
                            $("#errorBox span").text(err);
                            errorBox.show();
                            setTimeout(() => {
                                errorBox.fadeOut()
                            }, 3000);
                        }
                    } else {
                        loadingBox.hide();
                        $("#errorBox span").text('Passwords do not match');
                        errorBox.show();
                        setTimeout(() => {
                            errorBox.fadeOut()
                        }, 3000);
                    }
                } else {
                    loadingBox.hide();
                    $("#errorBox span").text('Pass must be at least 6 chars and only letters and digits');
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                }
            } else {
                loadingBox.hide();
                $("#errorBox span").text('Username must be at least 3 chars and only letters');
                errorBox.show();
                setTimeout(() => {
                    errorBox.fadeOut()
                }, 3000);
            }
        })
    }

    //////////////////////////////////////////////////////////////////

    //loggedUser
    function logged(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);

        //welcome msg
        welcomeLink.text(`Welcome, ${userInfo.username}!`);

        //on load views
        hideViews();
        allListingsView.show();


        //on load links
        welcomeLink.show();
        homeLink.show();
        loginLink.hide();
        registerLink.hide();
        logoutLink.show();
        createListingLink.show();
        myProfileLink.show();

        allListings();

        //home
        homeLink.on('click', () => {
            $(this).off('click');

            if (sessionStorage.length === 0) {
                outHome();
            } else {
                allListings();
            }
        });

        //All listings
        function allListings() {
            hideViews();
            $("#memes").html(""); //remove the example
            $("div.meme").remove();
            allListingsView.show();
            loadingBox.show();
            $.ajax({
                method: "GET",
                url: `${kinveyBaseUrl}/appdata/${kinveyAppKey}/meme?query={}&sort={"_kmd.ect": -1}`,
                headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
                success: listAll,
                error: errorMsg
            });

            function listAll(info) {
                loadingBox.hide();
                if (info.length > 0) {
                    for (let user of info) {
                        //put all html elements in variables for easy access
                        let firstDiv = $("<div id=\"memes\">");
                        let secondDiv = $("<div class=\"meme\">");
                        let title = $(`<a href="#" class="meme-title">${user.title}</a>`);
                        let br = $("<br>");
                        let image = $(`<a href="#"></a>`).append(`<img class="meme-image" src="${user.imageUrl}">`);
                        let thirdDiv = $("<div class=\"info\">");
                        let fourthDiv = $("<div id=\"data-buttons\">");

                        //buttons
                        let detailsButton = $(`<a href="#" class="custom-button">Check Out</a>`).on('click', () => {
                            $(this).off('click');
                            loadingBox.show();
                            details(user)
                        });
                        let editButton = $(`<a href="#" class="custom-button">Edit</a>`).on('click', () => {
                            $(this).off('click');
                            loadingBox.show();
                            edit(user)
                        });
                        let deleteButton = $(`<a href="#" class="custom-button">Delete</a>`).on('click', () => {
                            $(this).off('click');
                            remove(user._id);
                        });
                        title.on('click', () => {
                            details(user);
                            $(this).off('click');
                        });
                        image.on('click', () => {
                            details(user);
                            $(this).off('click');
                        });

                        //append the details button
                        $("#meme-feed").append(firstDiv.append(secondDiv.append(title).append(br).append(image)
                            .append(thirdDiv.append(fourthDiv.append(detailsButton)))));

                        //append edit and delete only for user owner
                        if (user.creator === sessionStorage.getItem('username')) {
                            fourthDiv.append(editButton).append(deleteButton).append($(`<a href="#" class="creator">Creator: ${user.creator}</a>`).on('click', () => {
                                $(this).off('click');
                                profile(user._acl.creator);
                            }));
                        }
                        else {
                            fourthDiv.append($(`<a href="#" class="creator">Creator: ${user.creator}</a>`).on('click', () => {
                                $(this).off('click');
                                otherUser(user._acl.creator);
                            }))
                        }
                        //append the rest of elements if any
                    }

                } else {
                    $('#memes').html("");
                    $('#memes').append($(`<p class="no-memes">No memes in database.</p>`))
                }
            }

            function errorMsg(error) {
                loadingBox.hide();
                $("#errorBox span").text(error);
                errorBox.show();
                setTimeout(() => {
                    errorBox.fadeOut()
                }, 3000);
            }
        }

        //other profiles
        function otherUser(userId) {
            hideViews();
            $('.user-profile').empty(); //remove example
            loadingBox.show();
            userProfileView.show();

            $.ajax({
                method: "GET",
                url: `${kinveyBaseUrl}/user/${kinveyAppKey}/${userId}/`,
                headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
                success: showProfile,
                error: errorMsg
            });

            function showProfile(thatUser) {
                loadingBox.hide();

                $(`.user-profile`)
                    .append(`<img id="user-avatar-url" src="${thatUser.avatar}" alt="user-profile">`)
                    .append(`<h1>${thatUser.username}</h1>`)
                    .append(`<h2>${thatUser.email}</h2>`)
                    .append(`<p id="user-listings-title">User Memes</p>`);

                let memes = $(`<div class="user-meme-listings">`);

                $.ajax({
                    method: "GET",
                    url: `${kinveyBaseUrl}/appdata/${kinveyAppKey}/meme?query={}&sort={"_kmd.ect": -1}`,
                    headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
                    success: listAll,
                });

                function listAll(info) {
                    let hasMemes = 0;
                    for (let user of info) {
                        if (user.creator === thatUser.username) {
                            hasMemes++;
                            let firstDiv = $(`<div class="user-meme">`)
                                .append(`<a href="#" class="user-meme-title">${user.title}</a>`)
                                .append(`<a href=""><img class="userProfileImage" src="${user.imageUrl}"></a>`);

                            let buttons = $(`<div class="user-memes-buttons">`);

                            //append buttons and rest of the html
                            firstDiv.append(buttons);
                            memes.append(firstDiv);
                        }

                    }
                    if (hasMemes === 0) {
                        memes.append($(`<p class="no-memes">No memes in database.</p>`))
                    }
                    $(`.user-profile`).append(memes);
                }
            }

            function errorMsg(error) {
                loadingBox.hide();
                $("#errorBox span").text(error);
                errorBox.show();
                setTimeout(() => {
                    errorBox.fadeOut()
                }, 3000);
            }
        }

        //My Profile
        myProfileLink.on('click', () => {
            profile(userInfo._id);
            $(this).off('click');
        });

        function profile(userId) {
            hideViews();
            $('.user-profile').empty(); //remove example
            loadingBox.show();
            userProfileView.show();

            $.ajax({
                method: "GET",
                url: `${kinveyBaseUrl}/user/${kinveyAppKey}/${userId}/`,
                headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
                success: showProfile,
                error: errorMsg
            });

            function showProfile(info) {
                loadingBox.hide();


                if (info.username === sessionStorage.getItem('username')) {

                    $(`.user-profile`)
                        .append(`<img id="user-avatar-url" src="${info.avatar}" alt="user-profile">`)
                        .append(`<h1>${info.username}</h1>`)
                        .append(`<h2>${info.email}</h2>`)
                        .append(`<a id="deleteUserButton" href="#">DELETE USER!</a>`).on('click', () => {
                        $(this).off('click');
                        $("#infoBox span").text("User deleted.");
                        infoBox.show();
                        setTimeout(() => {
                            infoBox.fadeOut()
                        }, 3000);
                        allListings();
                    })
                        .append(`<p id="user-listings-title">User Memes</p>`);

                    let memes = $(`<div class="user-meme-listings">`);

                    $.ajax({
                        method: "GET",
                        url: `${kinveyBaseUrl}/appdata/${kinveyAppKey}/meme?query={}&sort={"_kmd.ect": -1}`,
                        headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
                        success: listAll,
                    });

                    // noinspection JSAnnotator
                    function listAll(info) {
                        let hasMemes = 0;
                        for (let user of info) {
                            if (user.creator === sessionStorage.getItem('username')) {
                                hasMemes++;
                                let firstDiv = $(`<div class="user-meme">`)
                                    .append(`<a href="#" class="user-meme-title">${user.title}</a>`)
                                    .append(`<a href=""><img class="userProfileImage" src="${user.imageUrl}"></a>`);

                                let buttons = $(`<div class="user-memes-buttons">`);

                                let editBtn = $(`<a href="#" class="user-meme-btn">Edit</a>`).on('click', () => {
                                    $(this).off('click');

                                    edit(user)
                                });
                                let deleteBtn = $(`<a href="#" class="user-meme-btn">Delete</a>`).on('click', () => {
                                    $(this).off('click');

                                    remove(user._id)
                                });

                                //append buttons and rest of the html
                                buttons.append(editBtn).append(deleteBtn);
                                firstDiv.append(buttons);
                                memes.append(firstDiv);
                            }

                        }
                        if (hasMemes === 0) {
                            memes.append($(`<p class="no-memes">No memes in database.</p>`))
                        }
                        $(`.user-profile`).append(memes);
                    }
                }
            }

            function errorMsg(error) {
                loadingBox.hide();
                $("#errorBox span").text(error);
                errorBox.show();
                setTimeout(() => {
                    errorBox.fadeOut()
                }, 3000);
            }
        }

        //Create meme
        createListingLink.on('click', () => {
            $(this).off('click');

            hideViews();
            createView.show();

            $('#create-meme input[name="title"]').val("");
            $('#create-meme input[name="description"]').val("");
            $('#create-meme input[name="imageUrl"]').val("");

            $('#createMemeBtn').on('click', (ev) => {
                $(this).off('click');

                ev.preventDefault();
                loadingBox.show();
                ev.stopImmediatePropagation();

                let title = $('#create-meme input[name="title"]').val();
                let description = $('#create-meme input[name="description"]').val();
                let imageUrl = $('#create-meme input[name="imageUrl"]').val();
                description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                let data = {
                    title,
                    description,
                    imageUrl,
                    creator: sessionStorage.getItem('username')
                };

                //validate
                if (title === '') {
                    loadingBox.hide();
                    $("#errorBox span").text("Title cannot be empty");
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                } else if (description === '') {
                    loadingBox.hide();
                    $("#errorBox span").text("Description cannot be empty");
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                } else if (imageUrl === '') {
                    loadingBox.hide();
                    $("#errorBox span").text("Must have image");
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                } else if (title.length > 33) {
                    loadingBox.hide();
                    $("#errorBox span").text("Title can be at maximum 33 characters long");
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                } else if (description.length > 450 || description.length < 30) {
                    loadingBox.hide();
                    $("#errorBox span").text("Description must be at least 30 chars and maximum 450");
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                } else if (!RegExp('^http').test(imageUrl)) {
                    loadingBox.hide();
                    $("#errorBox span").text("Invalid image url");
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                } else {
                    $.ajax({
                        method: "POST",
                        url: `${kinveyBaseUrl}/appdata/${kinveyAppKey}/meme`,
                        headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
                        contentType: "application/json",
                        data: JSON.stringify(data),
                        success: createSuccess,
                        error: errorMsg
                    });

                    // noinspection JSAnnotator
                    function createSuccess(info) {
                        loadingBox.hide();
                        $("#infoBox span").text('Meme created');
                        setTimeout(() => {
                            infoBox.fadeOut()
                        }, 3000);
                        allListings();
                    }

                    // noinspection JSAnnotator
                    function errorMsg(error) {
                        loadingBox.hide();
                        $("#errorBox span").text(error);
                        errorBox.show();
                        setTimeout(() => {
                            errorBox.fadeOut()
                        }, 3000);
                    }
                }
            });
        });

        //Edit meme
        function edit(meme) {
            hideViews();
            editView.show();
            loadingBox.hide();
            $('#edit-meme input[name="title"]').val(meme.title);
            $('#edit-meme input[name="description"]').val(meme.description);
            $('#edit-meme input[name="imageUrl"]').val(meme.imageUrl);

            $('#editMemeBtn').on('click', (ev) => {
                $(this).off('click');

                ev.preventDefault();
                ev.stopImmediatePropagation();
                loadingBox.show();
                let title = $('#edit-meme input[name="title"]').val();
                let description = $('#edit-meme input[name="description"]').val();
                let imageUrl = $('#edit-meme input[name="imageUrl"]').val();
                let creator = meme.creator;
                description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                let edited = {title, description, imageUrl, creator};

                //validate
                if (title === '') {
                    loadingBox.hide();
                    $("#errorBox span").text("Title cannot be empty");
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                } else if (description === '') {
                    loadingBox.hide();
                    $("#errorBox span").text("Description cannot be empty");
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                } else if (imageUrl === '') {
                    loadingBox.hide();
                    $("#errorBox span").text("Must have image");
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                } else if (title.length > 33) {
                    loadingBox.hide();
                    $("#errorBox span").text("Title can be at maximum 33 characters long");
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                } else if (description.length > 450 || description.length < 30) {
                    loadingBox.hide();
                    $("#errorBox span").text("Description must be at least 30 chars and maximum 450");
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                } else if (!RegExp('^http').test(imageUrl)) {
                    loadingBox.hide();
                    $("#errorBox span").text("Invalid image url");
                    errorBox.show();
                    setTimeout(() => {
                        errorBox.fadeOut()
                    }, 3000);
                } else {
                    $.ajax({
                        method: "PUT",
                        url: `${kinveyBaseUrl}/appdata/${kinveyAppKey}/meme/${meme._id}`,
                        headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
                        data: edited,
                        success: editSuccess,
                        error: errorMsg
                    });

                    // noinspection JSAnnotator
                    function editSuccess(info) {
                        loadingBox.hide();
                        allListings();
                        $("#infoBox span").text(`Meme ${title} updated.`);
                        infoBox.show();
                        setTimeout(() => {
                            $('#infoBox').fadeOut()
                        }, 3000);
                    }

                    // noinspection JSAnnotator
                    function errorMsg(error) {
                        loadingBox.hide();
                        $("#errorBox span").text(error);
                        errorBox.show();
                        setTimeout(() => {
                            errorBox.fadeOut()
                        }, 3000);
                    }
                }
            })
        }

        //Delete car
        function remove(memeId) {
            loadingBox.show();
            $.ajax({
                method: "DELETE",
                url: `${kinveyBaseUrl}/appdata/${kinveyAppKey}/meme/${memeId}`,
                headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
                success: deleteSuccess,
                error: errorMsg
            });

            function deleteSuccess() {
                loadingBox.hide();
                $("#infoBox span").text('');
                $("#infoBox span").text('Delete successful.');
                infoBox.show();
                setTimeout(() => {
                    infoBox.fadeOut()
                }, 3000);
                allListings();
            }

            function errorMsg(error) {
                loadingBox.hide();
                $("#errorBox span").text(error);
                errorBox.show();
                setTimeout(() => {
                    errorBox.fadeOut()
                }, 3000);
            }
        }

        //Details
        function details(meme) {
            hideViews();
            loadingBox.hide();
            detailsView.show();
            $('.my-meme-details').html("");

            let createdBy = $(`<a class="meme-details-button" href="#">Created by ${meme.creator}</a>`).on('click', () => {
                $(this).off('click');

                profile(meme);
            });

            let editBtn = $(`<a href="#" class="meme-details-button">Edit</a>`).on('click', (ev) => {
                $(this).off('click');

                edit(meme);
                ev.stopImmediatePropagation();
            });
            let deleteBtn = $(`<a href="#" class="meme-details-button">Delete</a>`).on('click', () => {
                $(this).off('click');
                remove(meme._id)
            });

            let container = $('<div class="my-meme-details">');
            container.append($(`<a href="#" id="meme-title">${meme.title}</a>`))
                .append($(`<img src="${meme.imageUrl}">`))
                .append($(`<div class="meme-props">`).append($("<h2>Description</h2>"))
                    .append($(`<p class="meme-description">${meme.description}</p>`)))
                .append($("<div class=\"meme-details-buttons\">")
                    .append(createdBy).append(editBtn).append(deleteBtn));

            $(".meme-details").append(container);
        }
    }

//logout
    logoutLink.on('click', (ev) => {
        $(this).off('click');

        loadingBox.show();
        $.ajax({
            method: 'POST',
            url: `${kinveyBaseUrl}/user/${kinveyAppKey}/_logout`,
            headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
            success: logout
        });

        function logout(ev) {
            sessionStorage.clear();
            localStorage.clear();
            loadingBox.hide();
            $("#infoBox span").text('Logout successful');
            infoBox.show();
            setTimeout(() => {
                infoBox.fadeOut()
            }, 3000);
        }

        //on load views
        loadingBox.hide();
        infoBox.hide();
        errorBox.hide();
        loginView.hide();
        registerView.hide();
        allListingsView.hide();
        createView.hide();
        editView.hide();
        userProfileView.hide();
        detailsView.hide();
        homeView.show();

        //on load links
        homeLink.show();
        loginLink.show();
        registerLink.show();
        logoutLink.hide();
        createListingLink.hide();
        myProfileLink.hide();
        welcomeLink.hide();
        outHome();

    })
}