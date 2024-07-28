 // Fungsi yang akan dijalankan saat seluruh halaman dan aset dimuat
 $(window).on('load', function () {
    showCartList();
    showItemList();
  });

  //deklarasi
  var cart = [];
  var dataitem = [
    { name: 'Egg Sandwich', img: "assets/egg-sandwich.jpeg", price: 25000 },
    { name: 'Ham', img: "assets/ham.jpeg", price: 45000 },
    { name: 'Ham Cheese', img: "assets/ham-cheese.jpeg", price: 40000 },
    { name: 'Veg Burger', img: "assets/veg-burger.jpeg", price: 30000 },
    { name: 'Soda', img: "assets/soda.jpeg", price: 25000 },
    { name: 'Mutton Burger', img: "assets/mutton-burger.jpeg", price: 37000 },
    { name: 'Fish Burger', img: "assets/fish-burger.jpeg", price: 22000 },
    { name: 'Mutton Burger', img: "assets/ham-burger.jpeg", price: 20000 },
    { name: 'Ice Lemon', img: "assets/ice-lemon.jpeg", price: 15000 },
    { name: 'Lassi Salted', img: "assets/lassi-salted.jpeg", price: 18000 },
    { name: 'Mint Lemonade', img: "assets/mint-lemonade.jpeg", price: 17000 },
    { name: 'Mutton Kebab', img: "assets/mutton-kebab.jpeg", price: 27000 },
    { name: 'Green Apple Lemon', img: "assets/green-apple-lemon.jpeg", price: 17000 },
    { name: 'Chicken Burger', img: "assets/chicken-burger.jpeg", price: 25000 },
    { name: 'king Burger', img: "assets/king-burger.jpeg", price: 35000 },
    { name: 'Chesses Burger', img: "assets/chesses-burger.jpeg", price: 32000 },
    { name: 'Fried Chicken', img: "assets/fried-chicken.jpeg", price: 18000 },
    { name: 'French Fries', img: "assets/french-fries.jpeg", price: 13000 },
    { name: 'Kebab', img: "assets/kebab.jpeg", price: 17000 },
  ];
  var sortcount = 0;
  var searchToggle = 0;
  var cartToggle = 0;
  var item = dataitem;


  //fungsi menambahkan
  function addToCart(name, count, price) {
    //mendapatkan array saat ini
    var existingItem = cart.find(element => element.name === name);
    //memeriksa array sudah ada atau belum
    if (!existingItem) {
      cart.push({ name: name, count: count, price: price });
    } else {
      existingItem.count ++;
    }
    $('.alert-bar').text("berhasi menambahkan " + name);
    setTimeout(hideAlertBar, 2000);
    showCartList();
  }

  function hideAlertBar(){
    $('.alert-bar').text("");

  }

  //fungsi mengurangi
  function minusFromCart(index) {
    if (cart[index].count == 1) {
      removeFromCart(index);
    }
    else {
      cart[index].count--;
      showCartList();
    }
  }

  //fungsi menghapus
  function removeFromCart(index) {
    if (confirm("yakin ingin menghapus") == true) {
      cart.splice(index, 1);
      $('.alert-bar').text("berhasi menghapus ");
    }
    showCartList();
  }
  
  //fungsi menghapus semua
  function clearall() {
    if (confirm("yakin ingin menghapus") == true) {
      cart.splice(0, cart.length);
    }
    showCartList();
  }

  //fungsi menambahkan
  function plusFromCart(index) {
    cart[index].count ++;
    showCartList();
  }


  //fungsi menampilkan cart pada html
  function showCartList() {
    $(".cartlist").empty();
    cart.forEach(
      function (cart, index) {
        var quantity = cart.price * cart.count;
        $(".cartlist").append(`
      <div class="card-cart">
        <div class="card-cart-text">
          <div class="card-cart-row" id="row1">
            <div class="bold">`+ cart.name + `</div>
            <div class="bold">Rp `+ quantity.toLocaleString() + `</div>
          </div>
          <div class="card-cart-row">
            <div class="bold">Unit Price:</div>
            <div>Rp `+ cart.price.toLocaleString() + `</div>
            <div id="icon" class="card-cart-icon" onclick="removeFromCart(`+ index + `);">
              <i class='bx bx-trash bx-sm'></i>
            </div>
            <div id="icon"><button class="cart-btn" onclick="minusFromCart(`+ index + `)">-</button></div>
            <div class="count-text" style="display: none;">count</div>
            <div>`+ cart.count + `</div>
            <div id="icon"><button class="cart-btn" onclick="plusFromCart(`+ index + `)">+</button></div>
          </div>
        </div>
      </div>`
        )
      }
    );
    $("#tax-text").text("Rp " + Ftax().toLocaleString());
    $("#total-text").text("Rp " + Ftotal().toLocaleString());
    printContentCart();
  }

  //fungsi show/hide cart content
  function cartbtn() {
    if (cartToggle == 0){
      $('.content-cart').css("display","block");
      $('.content-item').css("width","73%");
      $('.content-cart').css("width","27%");
      cartToggle ++;
    }else {

      $('.content-cart').css("display","none");
      $('.content-item').css("width","100%");
      $('.content-cart').css("width","0%");
      cartToggle --;
    }
  }
 
  //fungsi jumlah
  function Famount(){
    var amount = 0;
    for (let i = 0; i < cart.length; i++) {
      amount = amount + (cart[i].count * cart[i].price);
    }
    return amount;
  }
  //fungsi pajak
  function Ftax(){
    var tax = Famount() * 0.1;
    return tax;
  }
  //fungsi ditotal
  function Ftotal(){
    var total = Famount() + Ftax();
    return total;
  }
  //ufngsi cash
  function Fcash(){
    var cash = Number($('#int-cash').val());
    return cash;
  }
  //fungsi kembalian
  function Fchange(){
    var change = Fcash() - Ftotal();
    return change;
  }

  //fungsi mencari
  $("#search").on('input', function() {
    // Menyimpan nilai input ke dalam variabel katakunci
    var katakunci = $(this).val().toLowerCase(); // Menggunakan toLowerCase() untuk pencarian case-insensitive
    // Filter array untuk mendapatkan objek yang memiliki properti 'name' mengandung kata kunci
    item = dataitem.filter(function (obj) {
      return obj.name.toLowerCase().includes(katakunci);
    });
    showItemList();
  });
  
  //fungsi cash update
  $('#int-cash').on('input', function() {
    showCartList();
  })

  //fungsi menampilkan item pada html
  function showItemList() {
    $(".itemlist").empty();
    item.forEach(
      function (item) {
        $(".itemlist").append(`
        <div class="card-item" onclick="addToCart('`+ item.name + `', 1, ` + item.price + `)">
          <div class="card-item-img">
            <img src="`+ item.img + `" alt="">
          </div>
          
          <div class="card-item-content">
            <h3>`+ item.name + `</h3>
            <p>Rp `+ item.price.toLocaleString() + `</p>
          </div>
        </div>
        `
        )
      }
    );
    console.log(item);
    if (item.length == 0){ $(".alert").show(); }
    else { $(".alert").hide(); }
  }

  //fungsi urut
  function sort() {
    if (sortcount == 0) {
      item.sort(function (a, b) {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
      sortcount++;
    } else {
      item.reverse(function (a, b) {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
      sortcount--;
    }
    showItemList();
  }

//show showh/hide search bar
  function bar() {
    $("#search").toggle();
    if (searchToggle == 0) {
      $("#search-icon").removeClass();
      $("#search-icon").addClass("bx bxs-search-alt-2 bx-md");
      searchToggle++;
    } else {
      $("#search-icon").removeClass();
      $("#search-icon").addClass("bx bx-search-alt-2 bx-md");
      searchToggle--;
    }
  }

  //fungsi untuk mencetak waktu
  function showCurrentDateTime() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Months are zero-based
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    // Add leading zero if needed
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var formattedDateTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    return formattedDateTime;
  }

  //fungsi untuk button print struk
  function printbtn() {
    window.print();
  }
  //fungsi untuk mencetak pada halaman struk
  function printContentCart() {
    $(".item").empty();
    if (cart.length ==0) { $(".item").append(`<div style="text-align: center;">There are no items</div>`); }
    else {
      cart.forEach(
        function(cart){
          var printtotal = cart.price * cart.count;
          $(".item").append(`
          <div class="row">
            <div class="item-name">`+cart.name+`</div>
            <div class="item-count-price">`+cart.price.toLocaleString()+`</div>
            <div class="item-count">`+cart.count+`</div>
            <div class="item-price">`+printtotal.toLocaleString()+`</div>
          </div>
          `)
        }
      );
    }
    $("#price-amount").text(Famount().toLocaleString());
    $("#price-pajak").text(Ftax().toLocaleString());
    $("#price-total").text(Ftotal().toLocaleString());
    $("#price-cash").text(Fcash().toLocaleString());
    $("#price-change").text(Fchange().toLocaleString());
    $("#inf-datetime").text(showCurrentDateTime());
    $("#pemesanan").text($('#selection').val());
  }
