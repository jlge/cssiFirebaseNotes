console.log("writeNote loaded");
let googleUser;

window.onload = (event) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("logged in as " + user.displayName);
            googleUser = user;
        } else {
            window.location = "index.html";
        }
        const welcomeText = document.querySelector("#welcome");
        welcomeText.innerHTML = "What's on your mind, " + user.displayName + "?";

    })
}

function handleNoteSubmit() {
    // 1. get info into form
    const today = new Date().toLocaleString()
    const noteTitle = document.querySelector("#noteTitle");
    const noteText = document.querySelector("#noteText");
    const noteLabel = document.querySelector("#noteLabel");

    // 2. format data + write to db
    firebase.database().ref(`users/${googleUser.uid}`).push({
        title: noteTitle.value,
        text: noteText.value,
        created: today,
        label: noteLabel.value,
        user: googleUser.displayName
    });
    // 3. clear out the form
    noteTitle.value = "";
    noteText.value = "";
    noteLabel.value = "";
    console.log("added to database");
}