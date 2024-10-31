document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".php-email-form");
    const loading = document.querySelector(".loading");
    const errorMessage = document.querySelector(".error-message");
    const sentMessage = document.querySelector(".sent-message");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      
      // Sembunyikan pesan sebelumnya
      loading.style.display = "none";
      errorMessage.style.display = "none";
      sentMessage.style.display = "none";
  
      // Jalankan validasi
      let isValid = true;
      const inputs = form.querySelectorAll(".form-control");
  
      inputs.forEach(input => {
        const rule = input.getAttribute("data-rule");
        const msg = input.getAttribute("data-msg");
        const validateDiv = input.nextElementSibling;
  
        if (rule) {
          let ruleInfo = rule.split(":");
          let ruleName = ruleInfo[0];
          let ruleValue = ruleInfo[1];
          
          // Cek jenis validasi
          if (ruleName === "minlen" && input.value.length < parseInt(ruleValue)) {
            isValid = false;
            validateDiv.innerHTML = msg;
            validateDiv.style.display = "block";
          } else if (ruleName === "required" && input.value.trim() === "") {
            isValid = false;
            validateDiv.innerHTML = msg;
            validateDiv.style.display = "block";
          } else if (ruleName === "email" && !validateEmail(input.value)) {
            isValid = false;
            validateDiv.innerHTML = msg;
            validateDiv.style.display = "block";
          } else {
            validateDiv.style.display = "none";
          }
        }
      });
  
      if (isValid) {
        // Jika valid, tampilkan loading dan kirim formulir
        loading.style.display = "block";
  
        // Simulasi pengiriman form (Anda bisa mengganti dengan AJAX)
        setTimeout(function () {
          loading.style.display = "none";
          sentMessage.style.display = "block";
          form.reset();
        }, 2000);
      } else {
        // Jika tidak valid, tampilkan pesan kesalahan
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Please fix the errors in the form and try again.";
      }
    });
  
    // Fungsi untuk memvalidasi format email
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  });
  