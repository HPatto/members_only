<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<!-- <br />
<div align="center">
  <a href="https://github.com/HPatto/members_only">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">Stream of Consciousness</h3>

  <p align="center">
    The Odin Project
    <br />
    <!-- <a href="https://github.com/HPatto/members_only"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <!-- <a href="https://github.com/HPatto/members_only">View Demo</a> -->
    <!-- · -->
    <!-- <a href="https://github.com/HPatto/members_only/issues">Report Bug</a> -->
    <!-- · -->
    <!-- <a href="https://github.com/HPatto/members_only/issues">Request Feature</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#goals">Learnings</a></li>
        <li><a href="#goals">Goals</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <!-- <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li> -->
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Messaging web service, offering tiers of permissions and persistent data.

### Learnings

An interesting project to connect back-end and front-end, with multiple database schemas and general data persistence. I enjoy the abstractions that improve the developer experience, and have found time invested to pay serious dividends.

Deploying to Vercel was difficult. This project doesn't match their use-case, so some alterations to project structure were necessary. Best to follow a more complete framework.

The next project should include RESTful API construction, and separation of the backend and frontend.

#### Frontend

I tried several different HTML rendering options, and settled on Handlebars. I was looking for the ability to pass in database content and have re-useable templates. Writing feels more natural with HTML-style syntax.

CSS / Sass with key variable definition has been enjoyable to use. I found earlier projects to get cluttered quickly, and now employ "style guide" parameters that allow rapid change.

#### Backend

I spent some time understanding middleware, which seems both a ubiquitous and slightly amorphous classification. Understanding that middleware can be attached to the application, the route, or a specific HTTP method was important in structuring the backend in a modular way.

In general, I preferred separate classification of middleware functions which would then be imported as necessary. Definitions within the route seem messy, although no doubt it comes with practice.

The user authentication and encryption was interesting and one of my main motivations for the project.
Instructive to see how information is divided between cookies, req / res bodies, and dB sessions.

#### Database

MongoDB was intuitive, although a basic app such as this does not push it's limits. Using the Mongoose ODM was likewise straightforward.


<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

<!-- Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description` -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Goals

* Understand and implement user authentication with a functional backend.

* Dynamic and nested HTML generation with Handlebars
* CSS compilation with SASS
* Backend design with Express (MVC architecture)
* Database CRUD operations with MongoDB
* User authentication (server-side) with Passport.js
* Basic CI / CD with Nodemon

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* HTML / Handlebars
* CSS / Sass
* JavaScript
* Node.js / Express
* MongoDB

<!-- * [![Next][Next.js]][Next-url] -->
<!-- * [![React][React.js]][React-url] -->
<!-- * [![Vue][Vue.js]][Vue-url] -->
<!-- * [![Angular][Angular.io]][Angular-url] -->
<!-- * [![Svelte][Svelte.dev]][Svelte-url] -->
<!-- * [![Laravel][Laravel.com]][Laravel-url] -->
<!-- * [![Bootstrap][Bootstrap.com]][Bootstrap-url] -->
<!-- * [![JQuery][JQuery.com]][JQuery-url] -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
<!-- ## Getting Started -->

<!-- This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps. -->

<!-- ### Prerequisites -->

<!-- This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ``` -->

<!-- ### Installation -->

<!-- 1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/HPatto/members_only.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ``` -->

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- USAGE EXAMPLES -->
## Usage

The service is deployed on Vercel, and accessible <a href="vercel_link">here</a>.
<br />
There are several permission levels available:

1. Visitor
* Visitors can see messages. Visitors cannot see author information, nor send messages.
2. User
* Upon making an account, a user can see and send messages. Users cannot see author information.
3. Member
* Upon guessing the membership code, a member can see all submitted messages and send their own.
4. Admin
* An admin has all the powers of a member, and can delete messages. Available upon request.

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [X] Database schemas
- [X] User story
- [X] Expected environment variables
- [X] Define functionality / permission levels
- [X] Implement front-end
  - [X] Handlebar template with header / footer
  - [X] Handlebar template with dynamic content allowed
  - [X] Handlebar templates with nested, dynamic content allowed
  - [X] Client-side error handling
- [X] Implement back-end
  - [X] Define necessary imports for global app.js (Passport, Mongoose, bcryptjs etc.)
  - [X] Define top-level routing (landing, sign-up, log-in etc.)
  - [X] Define outline of HTTP methods available on each route
  - [X] Define logic for each method within a route
    - [X] Server-side error-handling
    - [X] Server-side middleware
- [X] Create dummy users for each permission level
- [ ] Allow scrolling to fetch more messages on-demand
- [ ] Allow manual account deletion

<!-- See the [open issues](https://github.com/HPatto/members_only/issues) for a full list of proposed features (and known issues). -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are more than welcome!

<!-- Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. -->

<!-- If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again! -->

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Contact avenues can be found in my GitHub profile.
<!-- Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - henryjpaterson@gmail.com -->

<!-- Project Link: [https://github.com/HPatto/members_only](https://github.com/HPatto/members_only) -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* The Odin Project

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/HPatto/members_only.svg?style=for-the-badge
[contributors-url]: https://github.com/HPatto/members_only/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/HPatto/members_only.svg?style=for-the-badge
[forks-url]: https://github.com/HPatto/members_only/network/members
[stars-shield]: https://img.shields.io/github/stars/HPatto/members_only.svg?style=for-the-badge
[stars-url]: https://github.com/HPatto/members_only/stargazers
[issues-shield]: https://img.shields.io/github/issues/HPatto/members_only.svg?style=for-the-badge
[issues-url]: https://github.com/HPatto/members_only/issues
[license-shield]: https://img.shields.io/github/license/HPatto/members_only.svg?style=for-the-badge
[license-url]: https://github.com/HPatto/members_only/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/henryjpaterson
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
