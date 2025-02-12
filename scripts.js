function addContestant() {
    const artistName = document.getElementById("artistName").value;
    const uniqueCode = document.getElementById("uniqueCode").value;
    const profilePicInput = document.getElementById("profilePic");

    if (!artistName || !uniqueCode || !profilePicInput.files.length) {
        alert("Please fill in all fields and upload an image.");
        return;
    }

    // Create a URL for the uploaded image
    const profilePicURL = URL.createObjectURL(profilePicInput.files[0]);

    // Generate a unique link for this contestant
    const contestantID = uniqueCode.replace(/[^a-zA-Z0-9]/g, "-"); // Ensure valid URL characters
    const contestantPageURL = `${window.location.href}?contestant=${contestantID}`;

    // WhatsApp share link
    const voteMessage = `Vote for me! 🎤🎭\n\nName: ${artistName}\nCode: ${uniqueCode}\nSupport me by clicking here: ${contestantPageURL}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(voteMessage)}`;

    // Create a new contestant card
    const card = document.createElement("div");
    card.classList.add("profile-card");
    card.id = contestantID; // Assign ID to contestant card for linking
    card.innerHTML = `
        <img src="${profilePicURL}" alt="${artistName}" class="profile-pic">
        <h2>${artistName}</h2>
        <p><strong>Code:</strong> ${uniqueCode}</p>
        <a href="${whatsappLink}" target="_blank" class="whatsapp-btn">📲 Share on WhatsApp</a>
    `;

    // Append the new card to the container
    document.getElementById("contestantsContainer").appendChild(card);

    // Clear input fields after adding contestant
    document.getElementById("artistName").value = "";
    document.getElementById("uniqueCode").value = "";
    document.getElementById("profilePic").value = "";
}

// Function to highlight a contestant card when accessed via shared link
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const contestantID = urlParams.get("contestant");

    if (contestantID) {
        const contestantCard = document.getElementById(contestantID);
        if (contestantCard) {
            contestantCard.style.border = "3px solid red";
            contestantCard.scrollIntoView({ behavior: "smooth" });
        }
    }
});
