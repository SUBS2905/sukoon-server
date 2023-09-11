const User = require("../models/user");

const getAssociatedClients = async (req, res) => {
  try {
    const authHeader = await req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Auth Header missing" });
    }
    const token = authHeader.split(" ")[1];
    const professionalInfo = await User.findOne({ user_token: token });

    if (!professionalInfo) {
      return res.status(404).json({ message: "Professional not found" });
    }

    const associatedClients = professionalInfo.professional.associated_clients;

    return res.status(200).json(associatedClients);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getClientDetails = async (req, res) => {
  try {
    const clientId = req.params.id;

    const clientInfo = await User.findOne({ _id: clientId }).select("profile");

    if (!clientInfo) {
      res.status(404).json({ message: "Client not found" });
    }

    return res.status(200).json(clientInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAssociatedClients, getClientDetails };
