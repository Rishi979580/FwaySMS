document.addEventListener("DOMContentLoaded", function () {
  const notification = document.getElementById("floatingNotification");

  if (!notification) return; // ✅ Prevents the error if the element doesn't exist

  // Show the notification
  setTimeout(() => {
      notification.classList.add("show");
  }, 1000); // Delay before showing

  // Hide after 5 seconds
  setTimeout(() => {
      notification.classList.add("hide");
      setTimeout(() => {
          notification.classList.remove("show");
      }, 500); // Remove after fade-out
  }, 6000);
});
