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
  FILE: (fileName) =>
    `${API_URL}/files/${encodeURIComponent(fileName)}`,
};

// =========================================================
// AUTH TOKEN
// =========================================================

const getToken = () => {
  return (
    localStorage.getItem("admin_token") ||
    localStorage.getItem("user_token") ||
    localStorage.getItem("token")
  );
};

// =========================================================
// AXIOS AUTH CONFIG
// =========================================================

const getAuthConfig = () => {
  const token = getToken();

  if (!token) {
    console.warn("No authentication token found.");
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
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
  // LOAD GALLERY
  // GET /api/gallery
  // =========================================================

  const loadGallery = async () => {
    try {
      setLoadingGallery(true);

      const response = await axios.get(
        GALLERY_ENDPOINTS.GET_ALL
      );

      console.log("Gallery response:", response.data);

      if (Array.isArray(response.data)) {
        setGalleryList(response.data);
      } else {
        setGalleryList([]);
      }

    } catch (err) {
      console.error("Error loading gallery:", err);

      setError(
        err.response?.data?.message ||
        "Failed to load gallery."
      );

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
  // TITLE CHANGE
  // =========================================================

  const handleChange = (e) => {
    setGallery((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================================================
  // IMAGE CHANGE
  // =========================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImageFile(null);
      setImagePreview("");
      return;
    }

    // Check image type
    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );

      e.target.value = "";
      setImageFile(null);
      setImagePreview("");

      return;
    }

    // Maximum 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Image must be smaller than 5MB."
      );

      e.target.value = "";
      setImageFile(null);
      setImagePreview("");

      return;
    }

    setError("");
    setImageFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // =========================================================
  // CLEAR FORM
  // =========================================================

  const clearForm = () => {
    setGallery(emptyForm);
    setImageFile(null);
    setImagePreview("");

    const fileInput =
      document.getElementById(
        "gallery-image"
      );

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

    if (!gallery.title.trim()) {
      setError(
        "Please enter an image title."
      );
      return;
    }

    if (!imageFile) {
      setError(
        "Please select an image."
      );
      return;
    }

    const token = getToken();

    if (!token) {
      setError(
        "You are not logged in. Please log in again."
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // MUST MATCH BACKEND
      // @RequestParam("title")
      formData.append(
        "title",
        gallery.title.trim()
      );

      // MUST MATCH BACKEND
      // @RequestParam("file")
      formData.append(
        "file",
        imageFile
      );

      console.log(
        "Uploading gallery image..."
      );

      console.log(
        "Token exists:",
        !!token
      );

      console.log(
        "File:",
        imageFile.name
      );

      console.log(
        "File size:",
        imageFile.size
      );

      console.log(
        "File type:",
        imageFile.type
      );

      // IMPORTANT:
      // Do NOT manually set Content-Type.
      // Axios sets the multipart boundary.
      const response = await axios.post(
        GALLERY_ENDPOINTS.UPLOAD,
        formData,
        getAuthConfig()
      );

      console.log(
        "Upload response:",
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
          "Response:",
          err.response.data
        );
      }

      if (err.response?.status === 401) {
        setError(
          "Your login session has expired. Please log in again."
        );
      } else if (
        err.response?.status === 403
      ) {
        setError(
          "You do not have permission to upload gallery images."
        );
      } else if (
        err.response?.status === 400
      ) {
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : "Invalid upload request."
        );
      } else if (
        err.response?.status === 413
      ) {
        setError(
          "The image is too large."
        );
      } else if (
        err.code === "ERR_NETWORK"
      ) {
        setError(
          "Cannot connect to the Spring Boot server."
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
  // IMAGE URL
  // =========================================================

  const getImageUrl = (item) => {
    if (!item) {
      return "";
    }

    // Backend may return image URL
    if (
      item.image &&
      (
        item.image.startsWith("http://") ||
        item.image.startsWith("https://")
      )
    ) {
      return item.image;
    }

    // Backend may return URL
    if (
      item.url &&
      (
        item.url.startsWith("http://") ||
        item.url.startsWith("https://")
      )
    ) {
      return item.url;
    }

    // Backend may return file URL
    if (
      item.fileUrl &&
      (
        item.fileUrl.startsWith("http://") ||
        item.fileUrl.startsWith("https://")
      )
    ) {
      return item.fileUrl;
    }

    // Backend returns filename
    if (item.fileName) {
      return GALLERY_ENDPOINTS.FILE(
        item.fileName
      );
    }

    // If image is just a filename
    if (
      item.image &&
      !item.image.startsWith("http://") &&
      !item.image.startsWith("https://")
    ) {
      return GALLERY_ENDPOINTS.FILE(
        item.image
      );
    }

    return "";
  };

  // =========================================================
  // DELETE
  // DELETE /api/gallery/{id}
  // =========================================================

  const deleteGallery = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this image?"
      );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");

    const token = getToken();

    if (!token) {
      setError(
        "You are not logged in. Please log in again."
      );
      return;
    }

    try {
      await axios.delete(
        GALLERY_ENDPOINTS.DELETE(id),
        getAuthConfig()
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

      if (err.response?.status === 401) {
        setError(
          "Your login session has expired."
        );
      } else if (
        err.response?.status === 403
      ) {
        setError(
          "You do not have permission to delete gallery images."
        );
      } else {
        setError(
          err.response?.data?.message ||
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

        {/* SUCCESS */}

        {message && (
          <Alert
            variant="success"
            dismissible
            onClose={() =>
              setMessage("")
            }
          >
            {message}
          </Alert>
        )}

        {/* ERROR */}

        {error && (
          <Alert
            variant="danger"
            dismissible
            onClose={() =>
              setError("")
            }
          >
            {error}
          </Alert>
        )}

        {/* FORM */}

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
                  JPG, JPEG, PNG or WEBP.
                  Maximum 5MB.
                </Form.Text>

              </Form.Group>

            </Col>

            {/* PREVIEW */}

            {imagePreview && (
              <Col
                md={12}
                className="mb-4"
              >

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

          {/* BUTTONS */}

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

        {/* GALLERY */}

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

                <th>
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
                    <tr
                      key={item.id}
                    >

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