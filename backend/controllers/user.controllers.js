import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import moment from "moment";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "get current user error" });
  }
};

export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;

    console.log("Update request body:", { assistantName, imageUrl });
    console.log("File in request:", req.file);

    if (req.file) {
      console.log("Uploading file to Cloudinary...");
      assistantImage = await uploadOnCloudinary(req.file.path);
      console.log("Cloudinary result:", assistantImage);
    } else if (imageUrl) {
      console.log("Using provided imageUrl:", imageUrl);
      assistantImage = imageUrl;
    } else {
      console.log("No image provided");
      assistantImage = null;
    }

    const updateData = {
      assistantName,
      ...(assistantImage && { assistantImage }),
    };

    console.log("Updating user with data:", updateData);

    const user = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true,
    }).select("-password");

    console.log("Updated user:", user);

    return res.status(200).json(user);
  } catch (error) {
    console.error("Update assistant error:", error);
    return res.status(400).json({ message: "Update assistant error" });
  }
};

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);
   
    user.history.push(command)
    user.save()


    const userName = user.name;
    const assistantName = user.assistantName;
    const result = await geminiResponse(command, assistantName , userName );
    const jsonMatch = result.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      return res.ststus(400).json({ response: "sorry, i can't understand" });
    }
    const gemResult = JSON.parse(jsonMatch[0]);
    const type = gemResult.type;

    switch (type) {
      case "get-date":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current date is ${moment().format("YYYY-MM-DD")}`,
        });
      case "get-time":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current time is ${moment().format("hh:mm A")}`,
        });
      case "get-day":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `today is ${moment().format("dddd")}`,
        });
      case "get-month":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `today is ${moment().format("MMMM")}`,
        });

      case "google-search":
      case "youtube-search":
      case "youtube-play":
      case "general":
      case "calculator-open":
      case "instagram-open":
      case "facebook-open":
      case "weather-show":
      case "whatsapp-open":
      case "telegram-open":
      case "twitter-open":
      case "linkedin-open":
      case "spotify-open":
      case "netflix-open":
      case "amazon-open":
      case "flipkart-open":
      case "gmail-open":
      case "github-open":
      case "wikipedia-open":
      case "news-open":
      case "translate-open":
      case "maps-open":
      case "calendar-open":
      case "reminder-set":
      case "alarm-set":
      case "timer-set":
      case "music-play":
      case "podcast-play":
      case "translate-text":
      case "video-play":
      case "radio-play":
      case "joke-tell":
      case "quote-show":
      case "meme-show":
      case "battery-status":
      case "wifi-status":
      case "bluetooth-toggle":
      case "darkmode-toggle":
      case "brightness-adjust":
      case "volume-control":
      case "system-restart":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: gemResult.response,
        });

      default:
        return res
          .status(400)
          .json({ response: "I didn't understand your command please repeat" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ask  assistant error" });
  }
};
