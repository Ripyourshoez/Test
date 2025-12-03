import express from "express";
import cors from "cors";
import { exec } from "child_process";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/clip", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "No URL provided" });

  const tempVideo = path.join("./", "temp.mp4");
  const clipVideo = path.join("./", "clip.mp4");

  exec(
    `twitch-dl download ${url} -o temp.mp4 && ffmpeg -i temp.mp4 -ss 00:01:00 -t 30 ${clipVideo}`,
    (err) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Error processing clip" });
      }
      res.json({ message: "Clip ready!", clipUrl: "/clip.mp4" });
    }
  );
});

app.use("/clip.mp4", express.static(path.join(__dirname, "clip.mp4")));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));