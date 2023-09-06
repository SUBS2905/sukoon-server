const User = require("../models/user");

const getAllProfessionals = async (req, res) => {
  try {
    const professionals = await User.find({ isProfessional: true }).select("professional");
    res.status(200).json(professionals);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getDetails = async (req, res) => {
  try {
    const { license_number } = req.body;
    const professional = await User.find({"professional.license_number" : license_number}).select("professional");

    if(professional.length === 0){
      res.status(404).json({message: "Professional not found"});
    }
    res.status(200).json(professional);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllProfessionals, getDetails };
