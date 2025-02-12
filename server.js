const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB Atlas (replace with your actual connection string)
mongoose.connect("mongodb+srv://vince:<SecurePass123>@cluster0.rejpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas ✅"))
.catch(err => console.error("MongoDB Connection Error:", err));

// ✅ Define Contestant Schema
const contestantSchema = new mongoose.Schema({
    artistName: String,
    uniqueCode: String,
    profilePicURL: String
});

const Contestant = mongoose.model("Contestant", contestantSchema);

// ✅ Add Contestant API
app.post("/add-contestant", async (req, res) => {
    try {
        const newContestant = new Contestant(req.body);
        await newContestant.save();
        res.status(201).json({ message: "Contestant added successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ Get All Contestants API
app.get("/contestants", async (req, res) => {
    try {
        const contestants = await Contestant.find();
        res.json(contestants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ✅`);
});
