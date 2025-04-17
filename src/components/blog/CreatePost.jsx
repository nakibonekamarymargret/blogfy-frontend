import React, {useState, useEffect} from "react";
import {FaUndo} from "react-icons/fa";
import PostToolbar from "./PostToolbar.jsx";
import {useNavigate, useParams} from "react-router-dom";
import PostService from "../../services/PostService.js";
import ImageUploadService from "../../services/ImageUploadService.js"; //

function CreatePost() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [savedDraft, setSavedDraft] = useState({
        title: "",
        content: "",
        coverImage: "null",
    });
    // Editing
    const {postId} = useParams();
    const isEditing = !!postId;

    const navigate = useNavigate();
    // Load saved draft from localStorage on mount
    useEffect(() => {
        const savedTitle = localStorage.getItem("blog-title");
        const savedContent = localStorage.getItem("blog-content");
        if (savedTitle) setTitle(savedTitle);
        if (savedContent) setContent(savedContent);
    }, []);

    // Save draft to localStorage on change
    useEffect(() => {
        localStorage.setItem("blog-title", title);
        localStorage.setItem("blog-content", content);
    }, [title, content]);
    // Editing a post
    useEffect(async () => {
        const fetchPost = async () => {
            if (!isEditing) return;

            try {
                const token = localStorage.getItem("token");
                const response = await PostService.getPostById(postId, token); // you must define this in PostService.js
                const {title, content, coverImageUrl, author} = response.data;

                const loggedInUsername = localStorage.getItem("username");
                if (author !== loggedInUsername) {
                    alert("You are not authorized to edit this post.");
                    navigate("/");
                    return;
                }

                setTitle(title);
                setContent(content);
                setCoverImage(coverImageUrl);
            } catch (error) {
                console.error("Failed to load post", error);
            }
        };

        await fetchPost();
    }, [isEditing, postId]);

    // Handlers
    // Handle image upload

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "blogfy_preset")
        try {
            const res = await ImageUploadService.uploadImage(file);
            const {secure_url} = res.data;
            setCoverImage(secure_url);
        } catch (err) {
            console.error("File upload failed", err);
        }
    };
    const handleSaveDraft = async () => {
        setSavedDraft({title, content, coverImage});
        await saveToApi("draft");
        navigate("/");
    };
    const handlePublish = async () => {
        try {
            await saveToApi("published");
            navigate("/");
        } catch (error) {
            console.error("Error publishing post", error);
        }
    }

    const handleRevert = () => {
        setTitle(savedDraft.title);
        setContent(savedDraft.content);
        setCoverImage(savedDraft.coverImage);
        alert("Changes reverted.");
    };
    //handle submission to the backend
    const saveToApi = async (status) => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("status", status);
            if (coverImage) {
                formData.append("coverImageUrl", coverImage);
            }

            const token = localStorage.getItem("token");

            if (isEditing) {
                await PostService.updatePost(postId, {
                    title,
                    content,
                    status,
                    coverImageUrl: coverImage
                }, token);
                alert("Post updated successfully.");
            } else {
                await PostService.createPost(formData, token);
                alert(`Blog ${status === "published" ? "published" : "saved as draft"}!`);
            }

            navigate("/");
        } catch (error) {
            console.error("Error saving to API:", error);
            alert("Something went wrong while saving.");
        }
    };
    // Delete post
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            await PostService.deletePost(postId, token);
            alert("Post deleted successfully.");
            navigate("/");
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Fixed Toolbar at the Top */}
            <div className="toolbar static ">
                <PostToolbar/>
            </div>

            {/* Main Content Area */}
            <div className="flex justify-center p-4 top-5">
                {/* Main Form Area */}
                <div className="bg-white max-w-3xl rounded-xl shadow-lg p-8 mt-4 w-full">
                    {/* Cover Image Upload */}
                    <div className="mb-4">
                        <div className="flex items-center gap-4">
                            <label
                                htmlFor="cover-upload"
                                className="cursor-pointer bg-zinc-200 text-dark px-4 py-2 rounded font-medium tracking-tight transition"
                            >
                                Add a cover Image
                            </label>
                            <span className="text-sm text-gray-500">{coverImage ? "Image uploaded" : ""}
              </span>
                        </div>
                        <input
                            id="cover-upload"
                            type="file"
                            name="coverImage"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        {coverImage && (
                            <img
                                src={coverImage}
                                alt="Cover"
                                className="mt-4 h-48 w-full object-cover rounded-lg"
                            />
                        )}
                    </div>


                    {/* Title Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className=" rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500
              font-sans text-4xl subpixel-antialiased font-medium font-stretch-expanded"
                            placeholder="New post title here......"
                        />
                    </div>

                    {/* Content Textarea */}
                    <div className="mb-6">
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className=" rounded-lg px-3 py-2 w-full h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg"
                placeholder="Write your post content here"
            />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-start gap-4">
                        <button
                            onClick={handlePublish}
                            className="bg-indigo-700 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition flex items-center justify-center gap-2"
                        >
                            Publish
                        </button>
                        <button
                            onClick={handleSaveDraft}
                            className="bg-stone-50 hover:bg-violet-300 hover:text-violet-600 text-dark px-4 py-2 rounded-md transition flex items-center justify-center gap-2"
                        >
                            Save Draft{" "}
                        </button>

                        <button
                            onClick={handleRevert}
                            className="bg-stone-50 hover:bg-violet-300 hover:text-violet-600 text-dark px-4 py-2 rounded-md transition flex items-center justify-center gap-2"
                        >
                            {" "}
                            <FaUndo/> Revert new changes{" "}
                        </button>

                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                            >
                                Delete
                            </button>


                    </div>
                </div>

                {/* Optional Right Sidebar for Tips */}
                <aside className="ml-8 w-96">
                    <div className="bg-white rounded-md shadow-md p-4">
                        <h3 className="font-semibold mb-2">Publishing Tips</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                            <li>Ensure your post has a cover image set to make the most of the home feed and social
                                media platforms.
                            </li>
                            <li>Share your post on social media platforms or with your co-workers or local
                                communities.
                            </li>
                            <li>Ask people to leave questions for you in the comments. It's a great way to spark
                                additional discussion describing personally why you wrote it or why people might find it
                                helpful.
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default CreatePost;


