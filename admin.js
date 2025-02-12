// Function to check admin login
function checkAdmin() {
    const adminPassword = document.getElementById("adminPassword").value;
    if (adminPassword === "admin123") {
        document.getElementById("adminLogin").style.display = "none";
        document.getElementById("adminForm").style.display = "block";
        document.getElementById("contestantList").style.display = "block";
        loadContestants();
    } else {
        alert("Incorrect password!");
    }
}

// Function to add a new contestant
function addContestant() {
    const fullName = document.getElementById("fullName").value;
    const artistName = document.getElementById("artistName").value;
    const talentCategory = document.getElementById("talentCategory").value;
    const profilePic = document.getElementById("profilePic").files[0];

    if (!fullName || !artistName || !talentCategory || !profilePic) {
        alert("Please fill in all fields and upload a profile picture.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const profilePicURL = e.target.result;

        const contestants = JSON.parse(localStorage.getItem("contestants")) || [];
        const uniqueCode = `TTS-00o${contestants.length + 1}`;

        const newContestant = {
            fullName,
            artistName,
            talentCategory,
            profilePicURL,
            uniqueCode,
            votes: 0
        };

        contestants.push(newContestant);
        localStorage.setItem("contestants", JSON.stringify(contestants));
        loadContestants();
        alert("Contestant added successfully!");
    };
    reader.readAsDataURL(profilePic);
}

// Function to load contestants
function loadContestants() {
    const contestantListContainer = document.getElementById("contestantListContainer");
    contestantListContainer.innerHTML = "";

    const contestants = JSON.parse(localStorage.getItem("contestants")) || [];

    contestants.forEach(contestant => {
        const card = document.createElement("div");
        card.classList.add("contestant-card");

        card.innerHTML = `
            <img src="${contestant.profilePicURL}" alt="${contestant.artistName}">
            <div>
                <h3>${contestant.fullName}</h3>
                <p><strong>Artist Name:</strong> ${contestant.artistName}</p>
                <p><strong>Talent Category:</strong> ${contestant.talentCategory}</p>
                <p><strong>Unique Code:</strong> ${contestant.uniqueCode}</p>
                <button class="vote-btn" onclick="voteForContestant('${contestant.uniqueCode}', '${contestant.fullName}')">Vote for Me</button>
                <button class="whatsapp-btn" onclick="shareToWhatsApp('${contestant.artistName}', '${contestant.uniqueCode}')">Share to WhatsApp</button>
            </div>
        `;

        contestantListContainer.appendChild(card);
    });
}

// Function to redirect to Payment Methods page with pre-filled contestant details
function voteForContestant(contestantNumber, contestantName) {
    const url = new URL('Payment Methods.html', window.location.origin);
    url.searchParams.set('contestantNumber', contestantNumber);
    url.searchParams.set('contestantName', contestantName);
    window.location.href = url.toString();
}

// Function to share contestant details to WhatsApp
function shareToWhatsApp(artistName, uniqueCode) {
    const message = `Vote for ${artistName}! Support me by clicking the link: ${window.location.origin}/Payment%20Methods.html?contestantNumber=${uniqueCode}&contestantName=${artistName}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Load contestants on page load
document.addEventListener("DOMContentLoaded", loadContestants);