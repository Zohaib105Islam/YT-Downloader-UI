import axios from "axios";

const API_URL = "http://localhost:8080"; // Backend API URL


export const fetchVideoDetails = async (videoUrl) => {
  try {
    const response = await axios.post(`${API_URL}/api/getFormats`, {
      videoUrl,
      cookies: "",
    });

    if (response.data.status === "success") {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, error: response.data.message || "Failed to fetch video details." };
    }
  } catch (err) {
    return { success: false, error: "Server not available" };
  }
};



export const downloadFile = async (videoData, mediaType, mediaQuality, setProgress) => {
    if (!videoData?.data?.formats) {
        console.error("Invalid video data structure");
        return;
    }

    const selectedFormat = SelectMediaHelper.getSelectedFormatDetails(
        videoData.data.formats, mediaType, mediaQuality
    );

    if (!selectedFormat) {
        console.error("No suitable format found for download.");
        return;
    }

    const url = selectedFormat.direct_url;
    const fileName = `${videoData.data.title}.${mediaType === "audio" ? "mp3" : "mp4"}`;

    try {
        const response = await axios.get(url, {
            responseType: "blob", // Ensures binary data handling
            onDownloadProgress: (progressEvent) => {
                if (setProgress) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(progress); // Update progress in real-time
                }
            },
        });

        // Create a download link and trigger download
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (setProgress) setProgress(100); // Set to 100% once completed

    } catch (error) {
        console.error("Download failed:", error);
    }
};





/////////////  Helper function for filter formats  ===================

class SelectMediaHelper {
    static getSelectedFormatDetails(availablePreview, mediaType, mediaQuality) {
        if (!Array.isArray(availablePreview)) {
            console.error("Error: availablePreview should be an array", availablePreview);
            return null;
        }


        let selectedFormat = null;

        if (mediaType === "video") {
            const qualityToHeight = {
                "360p": 360,
                "720p": 720,
                "1080p": Infinity,
            };

            const targetHeight = qualityToHeight[mediaQuality] || 720; // Default 720p

            // Filter valid video formats
            const videoFormats = availablePreview
                .filter(format => format.vcodec && format.vcodec !== "none" && format.height != null);


            // Find closest match by height
            selectedFormat = videoFormats.reduce((bestMatch, format) => 
                !bestMatch || Math.abs(format.height - targetHeight) < Math.abs(bestMatch.height - targetHeight)
                    ? format
                    : bestMatch, null);
        }

        else if (mediaType === "audio") {
            // Filter valid audio formats
            const audioFormats = availablePreview
                .filter(format => format.acodec && format.acodec !== "none" && format.abr != null);


            // Prefer format_id 140 if available
            selectedFormat = audioFormats.find(format => format.format_id.includes("140")) ||
                audioFormats.reduce((bestMatch, format) => 
                    !bestMatch || (format.abr > bestMatch.abr) ? format : bestMatch, null);
        }


        return selectedFormat;
    }
}

