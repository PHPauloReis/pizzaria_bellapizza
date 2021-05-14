<template>
  <div id="app">
    
    <div class="container">

      <div class="brand">
        <img src="img/logotipo.png" alt="Logotipo Pizzaria BellaPizza">
      </div>

      <nav class="main_menu">
        <ul>
          <li><a href="/">Home</a></li>
          <li><router-link to="/menu">Cardápio</router-link></li>
          <li><a href="/order">Pedido</a></li>
          <li><a href="/localization">Localização</a></li>
          <li><a href="/contact">Contato</a></li>
        </ul>
      </nav>

      <router-view/>

    </div>
    
  </div>
</template>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #242424;
  font-family: 'Roboto', sans-serif;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.brand {
  margin: 30px 0;
}

.main_menu {
  width: 100%;
}

.main_menu ul {
  list-style: none;
  display: flex;
  margin-bottom: 20px;

  li {
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin-right: 30px;
    border-bottom: 5px solid #242424;
    padding-bottom: 7px;
    transition: border-color 0.3s;

    a {
      color: white;
      text-decoration: none;
    }
  }

  li.active,
  li:hover {
      border-bottom: 5px solid #AB0119;
      padding-bottom: 7px;
  }
}

.card {
  max-width: 600px;
  background-color: #2B2B2B;
  padding: 40px;
  color: #FFF;
  font-size: 24px;
  border-radius: 8px;
  box-shadow: 0 0 5px #00000044;
  margin-bottom: 30px;

  .page_header {
    width: auto;
    font-weight: bold;
    border-bottom: 5px solid #AB0119;
    padding-bottom: 7px;
    margin-bottom: 20px;
  }
}

.table {
  width: 100%;

  tr td {
    border-bottom: 2px dashed #707070;
    padding: 20px 0 10px 0;
  }

  tr td:nth-child(2) {
    text-align: right;
  }
}

label {
  font-size: 18px;
  margin-bottom: 10px;
}

select {
  width: 100%;
  font-size: 18px;
  color: #8C8C8C;
  padding: 10px;
  border-radius: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
}

button {
  font-size: 18px;
  font-weight: bold;
  color: #FFF;
  background-color: #AB0119;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  margin-top: 5px;
  cursor: pointer;
}

.price_container {
  width: 100%;
  padding: 20px;
  margin-top: 30px;
  background-color: #AB0119;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .price_total {
    font-weight: bold;
  }
}

</style>
