const User = require("../models/user");

const addTest = async (req, res) => {
  try {
    const authHeader = await req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Auth Header missing" });
    }
    const token = authHeader.split(" ")[1];
    const user = await User.findOne({ user_token: token });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    } else {
      const { testName, testScore, testResult, requireFurtherEvaluation } =
        req.body;

      const newTest = {
        testName,
        testScore,
        testResult,
        requireFurtherEvaluation,
      };

      user.selfAssessmentTests.push(newTest);
      await user.save();
      res.status(200).json({ success: true, user });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "server error" });
  }
};

module.exports = {
  addTest,
};
