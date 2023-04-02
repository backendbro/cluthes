const eyeOpen = document.getElementById('eye-open')

const balance = document.getElementById("balance")
const usdt_balance_l = document.getElementById("card-usdt-balance")
const usd_balance_l = document.getElementById("card-usd-balance")
      usdt_balance_r = document.getElementById("card-usdt-balance-r"),
      usd_balance_r = document.getElementById("card-usd-balance-r")


eyeOpen.addEventListener('click', function(e) {
    e.preventDefault()
   
    if(eyeOpen.classList.contains("fa-eye")){

        eyeOpen.classList.remove("fa-eye")
        eyeOpen.classList.add('fa-eye-slash');

    
        balance.textContent = "*.**USDT ≈ *.**USD"
        usdt_balance_l.textContent = "*.**USDT"
        usd_balance_l.textContent = "≈ *.**USD"
        
        usdt_balance_r.textContent = "*.**USDT"
        usd_balance_r.textContent = "≈ *.**USD"

    }

   
    else {
        eyeOpen.classList.remove("fa-eye-slash")
        eyeOpen.classList.add('fa-eye');
       
        balance.textContent = "0.00USDT ≈ 0.00USD"
        usdt_balance_l.textContent = "0.00USDT"
        usd_balance_l.textContent = "≈ 0.00USD"

        usdt_balance_r.textContent = "0.00USDT"
        usd_balance_r.textContent = "≈ 0.00USD"
    }



})

const sideBar =  document.getElementById("sidebarMenu")
const toggleBtn = document.querySelector(".sidebarIconToggle")
toggleBtn.addEventListener("click", function(e) {
   

    if(toggleBtn.classList[1] == ("active")){
        toggleBtn.classList.remove("active")
        
        sideBar.style.transform = `translateX(250px);`
        sideBar.style.transform =`250ms ease-in-out;`
        
        setTimeout(function() {
            sideBar.style.display = "none"
        }, 500)
    
    }else {
        toggleBtn.classList.add("active")
        sideBar.style.transform = `translateX(250px);`
        sideBar.style.transform =`250ms ease-in-out;`
        sideBar.style.display = "block"
    }
    
    console.log(toggleBtn.classList)
})