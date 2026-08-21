import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Table,
  Alert,
  Image,
  Spinner,
} from "react-bootstrap";

const API_URL = "http://localhost:8080/api/gallery";

const GALLERY_ENDPOINTS = {
  GET_ALL: API_URL,
  UPLOAD: `${API_URL}/upload`,
  DELETE: (id) => `${API_URL}/${id}`,
  FILE: (fileName) => `${API_URL}/files/${encodeURIComponent(fileName)}`,
};

function Gallery() {
  const emptyForm = {
    title: "",
  };

  const [gallery, setGallery] = useState(emptyForm);
  const [galleryList, setGalleryList] = useState([]);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);

  // =========================================================
  // GET ALL GALLERY ITEMS
  // GET /api/gallery
  // =========================================================

  const loadGallery = async () => {
    try {
      setLoadingGallery(true);
      setError("");

      const response = await axios.get(
        GALLERY_ENDPOINTS.GET_ALL
      );

      console.log("Gallery API response:", response.data);

      setGalleryList(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (err) {
      console.error("Error loading gallery:", err);

      if (err.response) {
        console.error(
          "Backend response:",
          err.response.data
        );
      }

      setError("Failed to load gallery.");
    } finally {
      setLoadingGallery(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadGallery();
  }, []);

  // =========================================================
  // HANDLE TITLE
  // =========================================================

  const handleChange = (e) => {
    setGallery({
      ...gallery,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================================
  // HANDLE IMAGE FILE
  // =========================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      setImageFile(null);
      setImagePreview("");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      setImageFile(null);
      setImagePreview("");
      return;
    }

    setError("");
    setImageFile(file);

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  };

  // =========================================================
  // CLEAR FORM
  // =========================================================

  const clearForm = () => {
    setGallery(emptyForm);
    setImageFile(null);
    setImagePreview("");
    setError("");

    const fileInput =
      document.getElementById("gallery-image");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // =========================================================
  // UPLOAD IMAGE
  // POST /api/gallery/upload
  // =========================================================

  const saveGallery = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Validate title
    if (!gallery.title.trim()) {
      setError("Please enter an image title.");
      return;
    }

    // Validate image
    if (!imageFile) {
      setError("Please select an image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // IMPORTANT:
      // Backend expects @RequestParam("title")
      formData.append(
        "title",
        gallery.title.trim()
      );

      // IMPORTANT:
      // Backend expects @RequestParam("file")
      formData.append(
        "file",
        imageFile
      );

      console.log("Uploading gallery image...");
      console.log("Title:", gallery.title);
      console.log("File:", imageFile.name);
      console.log("Size:", imageFile.size);
      console.log("Type:", imageFile.type);

      const response = await axios.post(
        GALLERY_ENDPOINTS.UPLOAD,
        formData
      );

      console.log(
        "Upload successful:",
        response.data
      );

      setMessage(
        "Gallery image uploaded successfully."
      );

      clearForm();

      await loadGallery();

    } catch (err) {
      console.error(
        "Gallery upload error:",
        err
      );

      if (err.response) {
        console.error(
          "Status:",
          err.response.status
        );

        console.error(
          "Backend response:",
          err.response.data
        );
      } else if (err.request) {
        console.error(
          "No response received from backend:",
          err.request
        );
      } else {
        console.error(
          "Request error:",
          err.message
        );
      }

      if (
        err.code === "ERR_NETWORK"
      ) {
        setError(
          "Could not connect to the gallery server. Make sure Spring Boot is running on port 8080."
        );
      } else if (err.response?.status === 400) {
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : "Invalid gallery upload request."
        );
      } else if (err.response?.status === 401) {
        setError(
          "You are not authorized to upload gallery images."
        );
      } else if (err.response?.status === 403) {
        setError(
          "You do not have permission to upload gallery images."
        );
      } else if (err.response?.status === 413) {
        setError(
          "The image is too large."
        );
      } else {
        setError(
          err.response?.data?.message ||
          "Failed to upload gallery image."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // GET IMAGE URL
  // =========================================================

  const getImageUrl = (item) => {
    // If backend returns a complete image URL
    if (
      item?.image &&
      (
        item.image.startsWith("http://") ||
        item.image.startsWith("https://") ||
        item.image.startsWith("blob:")
      )
    ) {
      return item.image;
    }

    if (
      item?.fileUrl &&
      (
        item.fileUrl.startsWith("http://") ||
        item.fileUrl.startsWith("https://")
      )
    ) {
      return item.fileUrl;
    }

    if (
      item?.url &&
      (
        item.url.startsWith("http://") ||
        item.url.startsWith("https://")
      )
    ) {
      return item.url;
    }

    // If backend returns fileName
    if (item?.fileName) {
      return GALLERY_ENDPOINTS.FILE(
        item.fileName
      );
    }

    // If backend returns image as a filename
    if (
      item?.image &&
      !item.image.startsWith("http")
    ) {
      return GALLERY_ENDPOINTS.FILE(
        item.image
      );
    }

    return "";
  };

  // =========================================================
  // DELETE IMAGE
  // DELETE /api/gallery/{id}
  // =========================================================

  const deleteGallery = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      await axios.delete(
        GALLERY_ENDPOINTS.DELETE(id)
      );

      setMessage(
        "Gallery image deleted successfully."
      );

      await loadGallery();

    } catch (err) {
      console.error(
        "Delete gallery error:",
        err
      );

      if (err.response) {
        console.error(
          "Backend response:",
          err.response.data
        );
      }

      if (err.response?.status === 401) {
        setError(
          "You are not authorized to delete this image."
        );
      } else if (err.response?.status === 403) {
        setError(
          "You do not have permission to delete this image."
        );
      } else {
        setError(
          "Failed to delete gallery image."
        );
      }
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <Card className="shadow">

      <Card.Header>
        <h3 className="mb-0">
          Gallery Management
        </h3>
      </Card.Header>

      <Card.Body>

        {/* SUCCESS MESSAGE */}

        {message && (
          <Alert
            variant="success"
            dismissible
            onClose={() => setMessage("")}
          >
            {message}
          </Alert>
        )}

        {/* ERROR MESSAGE */}

        {error && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        {/* UPLOAD FORM */}

        <Form onSubmit={saveGallery}>

          <Row>

            {/* TITLE */}

            <Col md={12}>
              <Form.Group className="mb-3">

                <Form.Label>
                  Image Title
                </Form.Label>

                <Form.Control
                  type="text"
                  name="title"
                  value={gallery.title}
                  onChange={handleChange}
                  placeholder="Enter image title"
                  required
                  disabled={loading}
                />

              </Form.Group>
            </Col>

            {/* IMAGE */}

            <Col md={12}>
              <Form.Group className="mb-3">

                <Form.Label>
                  Upload Image
                </Form.Label>

                <Form.Control
                  id="gallery-image"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  disabled={loading}
                />

                <Form.Text className="text-muted">
                  JPG, JPEG, PNG or WEBP. Maximum 5MB.
                </Form.Text>

              </Form.Group>
            </Col>

            {/* PREVIEW */}

            {imagePreview && (
              <Col md={12} className="mb-4">

                <strong>
                  Image Preview
                </strong>

                <div className="mt-2">

                  <Image
                    src={imagePreview}
                    alt="Selected preview"
                    rounded
                    style={{
                      width: "250px",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />

                </div>

              </Col>
            )}

          </Row>

          {/* UPLOAD BUTTON */}

          <Button
            type="submit"
            disabled={loading}
          >

            {loading ? (
              <>
                <Spinner
                  size="sm"
                  animation="border"
                  className="me-2"
                />

                Uploading...
              </>
            ) : (
              "Upload Image"
            )}

          </Button>

          {/* CLEAR */}

          <Button
            type="button"
            variant="secondary"
            className="ms-2"
            onClick={clearForm}
            disabled={loading}
          >
            Clear
          </Button>

        </Form>

        <hr className="my-4" />

        {/* GALLERY TABLE */}

        <h4 className="mb-3">
          Gallery Images
        </h4>

        {loadingGallery ? (

          <div className="text-center py-4">

            <Spinner animation="border" />

            <div className="mt-2">
              Loading gallery...
            </div>

          </div>

        ) : (

          <Table
            bordered
            hover
            responsive
          >

            <thead>

              <tr>

                <th>
                  Preview
                </th>

                <th>
                  Title
                </th>

                <th>
                  File
                </th>

                <th width="120">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {galleryList.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center"
                  >
                    No gallery images found.
                  </td>

                </tr>

              ) : (

                galleryList.map((item) => {

                  const imageUrl =
                    getImageUrl(item);

                  return (
                    <tr key={item.id}>

                      <td>

                        {imageUrl ? (

                          <Image
                            src={imageUrl}
                            alt={
                              item.title ||
                              "Gallery image"
                            }
                            width={100}
                            height={70}
                            rounded
                            style={{
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />

                        ) : (

                          <span className="text-muted">
                            No image
                          </span>

                        )}

                      </td>

                      <td>
                        {item.title}
                      </td>

                      <td>
                        {item.fileName ||
                          item.image ||
                          "Uploaded image"}
                      </td>

                      <td>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() =>
                            deleteGallery(
                              item.id
                            )
                          }
                        >
                          Delete
                        </Button>

                      </td>

                    </tr>
                  );
                })

              )}

            </tbody>

          </Table>

        )}

      </Card.Body>

    </Card>
  );
}

export default Gallery;