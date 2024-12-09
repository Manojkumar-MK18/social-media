import React, { useState } from "react";
import { storage, db } from "../../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useDropzone } from "react-dropzone";
import Webcam from "react-webcam";

function PostForm() {
  const [text, setText] = useState("");
  const [images, setImages] = useState ([]);
  const [video, setVideo] = useState (null);
  const [isUploading, setIsUploading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,video/*",
    onDrop: (acceptedFiles) =>
      setImages(acceptedFiles),
  });

  const handleCapture = (imageData) => {
    setImages([imageData]);
    setIsCameraActive(false);
  };

  const handlePostSubmit = async () => {
    setIsUploading(true);

    const uploadedImagesUrls = await Promise.all(
      images.map(async (file) => {
        const storageRef = ref(storage, `posts/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await uploadTask;
        return await getDownloadURL(storageRef);
      })
    );

    const postRef = await addDoc(collection(db, "posts"), {
      text,
      images: uploadedImagesUrls,
      video: video ? await uploadVideo(video) : null,
      timestamp: serverTimestamp(),
    });

    setIsUploading(false);
    setText("");
    setImages([]);
    setVideo(null);
  };

  const uploadVideo = async (video) => {
    const storageRef = ref(storage, `posts/videos/${video.name}`);
    const uploadTask = uploadBytesResumable(storageRef, video);
    await uploadTask;
    return await getDownloadURL(storageRef);
  };

  return (
    <div>
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
      />
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag and drop images/videos here, or click to select files</p>
        </div>
        <div>
          {images &&
            images.map((image, idx) => (
              <img key={idx} src={URL.createObjectURL(image)} alt="preview" />
            ))}
        </div>
      </div>
      <div>
        <button onClick={() => setIsCameraActive(!isCameraActive)}>
          Use Camera
        </button>
        {isCameraActive && (
          <Webcam screenshotFormat="image/jpeg" />
        )}
      </div>
      <div>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />
        {video && <video controls src={URL.createObjectURL(video)} />}
      </div>
      <button onClick={handlePostSubmit} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Post"}
      </button>
    </div>
  );
}

export default PostForm;
