<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">
        <img src="../images/secretHitlerBanner_ColorThin.png" class="logo">
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/Vote">Vote</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/gameBoard">Game Board</router-link>
          </li>
        </ul>
      </div>

    </nav>

    <router-view class="body"/>

    <br class="spacer">
    <div class="center">
      <div>
        <p>website created by Jason Williams based on the free game, 
          <a href="https://www.secrethitler.com/" target="blank">Secret Hitler</a></p>
      </div>
      <div>
        <a href="https://github.com/jasonwadewilliams/secret_hitler" target="blank">Github Repository</a>
      </div>
    </div>
  </div>
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Lato);
@import url(https://fonts.googleapis.com/css2?family=Bungee&family=Girassol&family=Noto+Sans+KR:wght@300&display=swap);

#app {
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  background-image: url("../images/background.png");
  background-position: center;
}

.body {
  min-height: 85vh;
}

/* Style the top navigation bar */
.bg-dark {
  background-color: rgb(25, 25, 25) !important;
}
.navbar-dark .navbar-nav .nav-link:focus, .navbar-dark .navbar-nav .nav-link:hover {
  color: rgb(222,140,122);
  font-family: 'Bungee';
}

.navbar-dark .navbar-nav .nav-link {
  color: rgb(247,225,195);
  font-family: 'Bungee';
}

.logo {
  max-height: 40px;
  width: auto;
  border-radius: 5px;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px 30px 0px;
  color: rgb(247,225,195);
  background-color: rgb(25,25,25);
}

a {
  text-decoration: none im !important;
  color: rgb(222,140,122) impo !important;
}

a:hover {
  color: rgb(55,136,149);
  text-decoration: none;
}
</style>



