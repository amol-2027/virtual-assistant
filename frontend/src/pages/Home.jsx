import { useContext } from "react";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import userImg from "../assets/user.gif";
import aiImg from "../assets/ai.gif";
import { RxCross1 } from "react-icons/rx";

import { CgMenuRight } from "react-icons/cg";

function Home() {
  const { user, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);
  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [ham, setHam] = useState(false);
  const isSpeakingRef = useRef(false);

  const recognitionRef = useRef(null);

  const synth = window.speechSynthesis;

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      navigate("/signin");
      setUserData(null);
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };
  console.log("Home component - user data:", user);

  const speak = (text) => {
    // Ensure we have valid text to speak
    if (!text || typeof text !== "string") {
      console.error("Invalid text for speech synthesis:", text);
      return;
    }

    // Clean the text - remove any non-ASCII characters that might cause issues
    const cleanText = text.replace(/[^\x00-\x7F]/g, " ").trim();

    if (!cleanText) {
      console.error("No valid text to speak after cleaning");
      return;
    }

    // Function to actually speak the text
    const speakText = () => {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanText);

      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find((v) => v.lang === "hi-IN");
      const marathiVoice = voices.find((v) => v.lang === "mr-IN");
      const tamilVoice = voices.find((v) => v.lang === "ta-IN");

      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }
      if (marathiVoice) {
        utterance.voice = marathiVoice;
      }
      if (tamilVoice) {
        utterance.voice = tamilVoice;
      }

      // Set voice properties for better compatibility
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = "en-US";

      // Explicitly set language

      // Add error handling
      utterance.onerror = (event) => {
        setAiText("");
        console.error("Speech synthesis error:", event);
        if (event.error === "not-allowed") {
          console.log("Speech synthesis blocked. User interaction required.");
        }
      };

      utterance.onend = () => {
        console.log("Speech finished");
        // Reset AI text after speech ends to show user image again
        setAiText("");
      };

      utterance.onstart = () => {
        console.log("Speech started");
      };

      // Ensure speech synthesis is available and working
      if (window.speechSynthesis) {
        try {
          window.speechSynthesis.speak(utterance);
        } catch (error) {
          console.error("Error starting speech synthesis:", error);
        }
      } else {
        console.error("Speech synthesis not supported");
      }
    };

    // Check if speech synthesis is paused and try to resume
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    // Try to speak immediately
    speakText();
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if (type === "google-search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }
    if (type === "calculator-open") {
      window.open(`https://www.google.com/search?q=calculator`, "_blank");
    }
    if (type === "instagram-open") {
      window.open(`https://www.instagram.com/`, "_blank");
    }
    if (type === "facebook-open") {
      window.open(`https://www.facebook.com/`, "_blank");
    }
    if (type === "weather-show") {
      window.open(`https://www.google.com/search?q=weather`, "_blank");
    }

    if (type === "youtube-search" || type === "youtube-play") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }
    if (type === "whatsapp-open") {
      window.open(`https://web.whatsapp.com/`, "_blank");
    }

    if (type === "linkedin-open") {
      window.open(`https://www.linkedin.com/`, "_blank");
    }

    if (type === "twitter-open") {
      window.open(`https://twitter.com/`, "_blank");
    }

    if (type === "gmail-open") {
      window.open(`https://mail.google.com/`, "_blank");
    }

    if (type === "news-headlines") {
      window.open(`https://news.google.com/`, "_blank");
    }

    if (type === "translate-text") {
      window.open(`https://translate.google.com/`, "_blank");
    }

    if (type === "map-search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/maps/search/${query}`, "_blank");
    }

    if (type === "wikipedia-search") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://en.wikipedia.org/wiki/Special:Search?search=${query}`,
        "_blank"
      );
    }

    if (type === "currency-convert") {
      const query = encodeURIComponent(userInput || "USD to INR");
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }

    if (type === "timer-set") {
      window.open(`https://www.google.com/search?q=set+timer`, "_blank");
    }

    if (type === "stopwatch-open") {
      window.open(`https://www.google.com/search?q=stopwatch`, "_blank");
    }

    if (type === "note-open") {
      window.open(`https://keep.google.com/`, "_blank");
    }

    if (type === "todo-open") {
      window.open(`https://todoist.com/`, "_blank");
    }

    if (type === "spotify-open") {
      window.open(`https://open.spotify.com/`, "_blank");
    }

    if (type === "netflix-open") {
      window.open(`https://www.netflix.com/`, "_blank");
    }

    if (type === "amazon-open") {
      window.open(`https://www.amazon.in/`, "_blank");
    }

    if (type === "flipkart-open") {
      window.open(`https://www.flipkart.com/`, "_blank");
    }

    if (type === "zoom-open") {
      window.open(`https://zoom.us/`, "_blank");
    }

    if (type === "calendar-open") {
      window.open(`https://calendar.google.com/`, "_blank");
    }

    if (type === "quote-show") {
      window.open(`https://www.google.com/search?q=quote+of+the+day`, "_blank");
    }

    if (type === "joke-show") {
      window.open(`https://www.google.com/search?q=random+joke`, "_blank");
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    (recognition.continuous = true), (recognition.lang = "en-US");

    recognitionRef.current = recognition;

    const isRecognizingRef = { current: false };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log("heard: " + transcript);

      if (
        transcript.toLowerCase().includes(user?.assistantName?.toLowerCase())
      ) {
        setAiText("");
        setUserText(transcript);
        recognition.stop();
        isRecognizingRef.current = false;
        setIsListening(false);

        const data = await getGeminiResponse(transcript);
        setAiText(data.response);
        setUserText("");
        handleCommand(data);

        // Restart recognition after processing the command
        setTimeout(() => {
          try {
            recognition.start();
            console.log("Recognition restarted for next command");
          } catch (error) {
            console.error("Error restarting recognition:", error);
          }
        }, 1000); // Wait 1 second before restarting
      }
    };

    // Add user interaction to enable speech synthesis
    const enableSpeechSynthesis = () => {
      // Create a silent utterance to "wake up" speech synthesis
      const utterance = new SpeechSynthesisUtterance("");
      utterance.volume = 0;
      window.speechSynthesis.speak(utterance);
      window.speechSynthesis.cancel(); // Immediately cancel it
    };

    // Enable speech synthesis on first user interaction
    const handleUserInteraction = () => {
      enableSpeechSynthesis();
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    // Start recognition after a small delay to ensure user interaction
    setTimeout(() => {
      recognition.start();
    }, 100);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  return (
    <div
      className="w-full h-[100vh] bg-gradient-to-t from-black to-[#02023d] flex justify-center
   items-center flex-col gap-[15px] overflow-hidden"
    >
      <CgMenuRight
        className=" lg:hidden text-white 
      absolute top-[20px] right-[20px] w-[25px] h-[25px] "
        onClick={() => setHam(true)}
      />

      <div
        className={`absolute lg:hidden
         top-0 w-full h-full bg-[#00000053]
          backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start
           ${ham ? "translate-x-0" : "translate-x-full"} transition-transform`}
      >
        <RxCross1
          className=" text-white absolute top-[20px] 
 right-[20px] w-[25px] h-[25px]"
          onClick={() => setHam(false)}
        />

        <button
          className="min-w-[150px] h-[60px]  text-black 
          font-semibold bg-white rounded-full text-[19px]
        top-[20px] right-[20px] px-[20px] py-[10px]        font-semibold cursor-pointer"
          onClick={handleLogOut}
        >
          Log Out
        </button>

        <button
          className="min-w-[150px] h-[60px]  text-black
           font-semibold bg-white rounded-full text-[19px] 
          top-[100px] right-[20px]  px-[20px] py-[10px]    font-semibold cursor-pointer"
          onClick={() => navigate("/customize")}
        >
          Customize your assistant
        </button>

        <div className="w-full h-[2px] bg-gray-400"></div>
        <h1 className="text-white font-semibold text-[19px]">History</h1>

        <div className="w-full h-[400px] gap-[20px] overflow-y-auto flex flex-col truncate">
          {user?.history?.map((his, index) => (
            <div
              key={index}
              className="text-gray-200 text-[18px] w-full h-[30px]  "
            >
              {his}
            </div>
          ))}
        </div>
      </div>

      <button
        className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold absolute hidden 
      lg:block top-[20px] right-[20px]  bg-white rounded-full cursor-pointer text-[19px] "
        onClick={handleLogOut}
      >
        Log Out
      </button>

      <button
        className="min-w-[150px] h-[60px] mt-[30px]
       text-black font-semibold  bg-white absolute top-[100px] 
       right-[20px] rounded-full cursor-pointer text-[19px] px-[20px] 
       py-[10px] hidden lg:block "
        onClick={() => navigate("/customize")}
      >
        Customize your Assistant
      </button>

      <div
        className="w-[300px] h-[400px] flex justify-center 
    items-center overflow-hidden rounded-4xl shadow-lg"
      >
        <img
          src={user?.assistantImage}
          alt=""
          className="h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-white text-[18px] font-semibold mb-4">
          I'm {user?.assistantName}
        </h1>

        <div className="flex flex-col items-center justify-center mb-4">
          {!aiText && <img src={userImg} alt="" className="w-[200px]" />}
          {aiText && <img src={aiImg} alt="" className="w-[200px]" />}
        </div>

        <h1 className="text-white text-[18px] font-semibold text-center max-w-[600px] px-4">
          {userText ? userText : aiText ? aiText : null}
        </h1>
      </div>
    </div>
  );
}

export default Home;
