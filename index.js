const inquirer = require("inquirer");
const axios = require("axios");
const puppeteer = require("puppeteer");

const init = () => {
  inquirer
    .prompt([
      {
        message: "What is your github username?",
        name: "username",
      },
      {
        type: "list",
        message: "What color do you like most?",
        name: "color",
        choices: [
          "green",
          "blue",
          "pink",
          "red",
          "orange",
          "yellow",
          "purple",
          "cornflowerblue",
        ],
      },
    ])
    .then((res) => {
      const url = `https://api.github.com/users/${res.username}`;
      axios.get(url).then((response) => {
        const userData = {
          name: response.data.name,
          username: res.username,
          avatar: response.data.avatar_url,
          company: response.data.company,
          blog: response.data.blog,
          location: response.data.location,
          repos: response.data.public_repos,
          followers: response.data.followers,
          following: response.data.following,
          bio: response.data.bio,
          color: res.color,
        };

        axios.get(`${url}/starred`).then((response) => {
          let stars = 0;
          response.data.forEach((repo) => {
            stars += repo.watchers_count;
          });
          userData.stars = stars;

          generateHTML(userData);
        });
      });
    });
};
init();

async function generateHTML(userData) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(`<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'
        integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh' crossorigin='anonymous'>
    <title>Document</title>
    <style>
        body {
            background: ${userData.color};
            text-align: center;
            overflow-x: hidden;
        }
        img{
            border-radius: 50%;
            height: 100px;
            margin-left: auto;
            margin-right: auto;
            width: 100px;
        }
        .main {
            left: 5%;
            top: 2em;
            width: 90%;
        }
        section {
            background: lightgray;
        }
        .stats {
            margin: 2em 10%;
            width: 80%;
        }
    </style>
</head>
<body>
    <div class='card main'>
        <img src='${userData.avatar}' alt='Avatar'>
        <div class='card-body'>
            <h5 class='card-title'>Hi!<br>My name is ${userData.name}</h5>
            <p class='card-text'>Currently at ${userData.company}</p>
            <a href='http://maps.google.com/maps?q=${userData}'>${userData.location}</a>
            <a href='https://github.com/${userData.username}'>Github</a>
            <a href='${userData.blog}'>Blog</a>
        </div>
    </div>
    <section>
        <br><br>
        <p>${userData.bio}</p>
        <div class='row'>
            <div class='col-sm-1'></div>
            <div class='col-sm-5'>
                <div class='card stats'>
                    <div class='card-body'>
                        Public Repositories
                        <p>${userData.repos}</p>
                    </div>
                </div>
            </div>
            <div class='col-sm-5'>
                <div class='card stats'>
                    <div class='card-body'>
                        Followers
                        <p>${userData.followers}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class='row'>
            <div class='col-sm-1'></div>
            <div class='col-sm-5'>
                <div class='card stats'>
                    <div class='card-body'>
                        GitHub Stars
                        <p>${userData.stars}</p>
                    </div>
                </div>
            </div>
            <div class='col-sm-5'>
                <div class='card stats'>
                    <div class='card-body'>
                        Following
                        <p>${userData.following}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`);
    await page.emulateMedia("screen");
    await page.pdf({
      path: `profile.pdf`,
      format: "A4",
      printBackground: true,
    });
    console.log("PDF Created");
    await browser.close();
    process.exit();
  } catch (err) {
    console.log(err);
    throw err;
  }
}
