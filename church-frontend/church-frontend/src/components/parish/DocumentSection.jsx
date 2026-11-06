import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/news";

function DocumentSection() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const { data } = await axios.get(API_URL);
        const docs = Array.isArray(data)
          ? data.filter((item) => item.documentUrl)
          : [];
        setDocuments(docs);
      } catch (error) {
        console.error("Failed to load documents:", error);
      }
    };

    loadDocuments();
  }, []);

  return (
    <div className="mb-5">
      <h2 className="text-primary fw-bold">Parish Documents</h2>

      {documents.length === 0 ? (
        <div className="card shadow-sm border-0">
          <div className="card-body text-muted">No parish documents uploaded yet.</div>
        </div>
      ) : (
        <div className="row">
          {documents.map((doc) => (
            <div className="col-md-4 mb-3" key={doc.id}>
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5>{doc.title}</h5>
                  <p className="text-muted mb-3">
                    File Type: {doc.fileType || "Document"}
                  </p>
                  <a
                    className="btn btn-primary btn-sm"
                    href={doc.documentUrl.startsWith("http") ? doc.documentUrl : `http://localhost:8080${doc.documentUrl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Document
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentSection;