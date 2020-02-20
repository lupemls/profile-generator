const inquirer = require('inquirer');
const fs = require('fs');
const convertFactory = require('electron-html-to');
const axios = require('axios');
const url = `https://api.github.com/users/${process.argv[2]}`;

const conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
});


inquirer
    .prompt({
        message: 'What is your favorite color?',
        name: 'color'
    }).then(function (res) {
        console.log(res.color);
        let userData = {};
        axios.get(url).then((response) => {
            console.log(response)
            userData = {
                login : response.data.login,
                avatar : response.data.avatar_url,
                company : response.data.company,
                blog : response.data.blog,
                location : response.data.location,
                repos : response.data.public_repos,
                followers : response.data.followers,
                following : response.data.following,
                bio : response.data.bio
            };
            // console.log(userData);
        });
        axios.get(`${url}/starred`).then((response) => {
            userData.stars = 0;
            response.data.forEach(repo => {
                userData.stars += repo.watchers_count;
            });
            console.log(userData.stars);
        });
//         conversion({ html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
//         integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
//     <title>Document</title>
//     <style>
//         body {
//             background: cornflowerblue;
//             text-align: center;
//             overflow-x: hidden;
//         }
//         .main {
//             left: 5%;
//             top: 2em;
//             width: 90%;
//         }
//         section {
//             background: gray;
//         }
//         .stats {
//             margin: 2em 10%;
//             width: 80%;
//         }
//     </style>
// </head>
// <body>
//     <div class="card main">
//         <img src="..." class="card-img-top" alt="...">
//         <div class="card-body">
//             <h5 class="card-title">Hi!<br>My name is ${userData.name}</h5>
//             <p class="card-text">Currently at ${userData.company}</p>
//             <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
//             <a>${userData.location}</a>
//             <a>Github</a>
//             <a>Blog</a>
//         </div>
//     </div>
//     <section>
//         <br><br>
//         <p>${userData.bio}</p>
//         <div class="row">
//             <div class="col-sm-1"></div>
//             <div class="col-sm-5">
//                 <div class="card stats">
//                     <div class="card-body">
//                         Public Repositories
//                         <p>Number</p>
//                     </div>
//                 </div>
//             </div>
//             <div class="col-sm-5">
//                 <div class="card stats">
//                     <div class="card-body">
//                         Followers
//                         <p>Number</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div class="row">
//             <div class="col-sm-1"></div>
//             <div class="col-sm-5">
//                 <div class="card stats">
//                     <div class="card-body">
//                         GitHub Stars
//                         <p>Number</p>
//                     </div>
//                 </div>
//             </div>
//             <div class="col-sm-5">
//                 <div class="card stats">
//                     <div class="card-body">
//                         Following
//                         <p>Number</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
// </body>
// </html>`}, function (err, result) {
//             if (err) {
//                 return console.error(err);
//             }

//             console.log(result.numberOfPages);
//             console.log(result.logs);
//             result.stream.pipe(fs.createWriteStream('./profile.pdf'));
//             conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
//         });
//     })
