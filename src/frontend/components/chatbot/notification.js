document.addEventListener("DOMContentLoaded", function () {
    const notification = document.getElementById("floatingNotification");
  
    // Show the notification
    setTimeout(() => {
      notification.classList.add("show");
    }, 1000); // Delay before showing
  
    // Hide after 5 seconds
    setTimeout(() => {
      notification.classList.add("hide");
    }, 6000);
  });
  