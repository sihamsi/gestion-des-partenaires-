import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../Assets/cashplus.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "bootstrap/dist/css/bootstrap.min.css";
import companyLogo from "../Assets/companyLogo.png";
import mobilabLogo from "../Assets/mobilabLogo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const [partenaires, setPartenaires] = useState([]);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [editingPartenaire, setEditingPartenaire] = useState(null);
  const [deletingPartenaire, setDeletingPartenaire] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchPartenaires();
  }, []);

  const fetchPartenaires = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4308/login/partenaires",
        { withCredentials: true }
      );
      setPartenaires(response.data);
    } catch (error) {
      console.error("Error fetching partenaires:", error);
      setErrors([error.message]);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleAddPartenaire = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await axios.post(
        "http://localhost:4308/login/partenaires",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Add response:", response);
      setSuccess("Partenaire added successfully");
      await fetchPartenaires();
      event.target.reset();
      setErrors([]);
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding partenaire:", error);
      setErrors([error.message]);
    }
  };

  const handleEditPartenaire = (id) => {
    const partenaire = partenaires.find((p) => p.id === id);
    setEditingPartenaire(partenaire);
    setEditModalOpen(true);
  };

  const handleUpdatePartenaire = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Conserver les anciens fichiers si aucun nouveau fichier n'est sélectionné
    if (!formData.get("logo")) {
      formData.delete("logo");
    }
    if (!formData.get("icon")) {
      formData.delete("icon");
    }

    // Ajouter les anciens fichiers si les nouveaux fichiers ne sont pas fournis
    if (!formData.get("logo")) {
      formData.append("logo", editingPartenaire.logo);
    }
    if (!formData.get("icon")) {
      formData.append("icon", editingPartenaire.icon);
    }

    try {
      const response = await axios.put(
        `http://localhost:4308/login/partenaires/${editingPartenaire.id}`,
        formData,
        { withCredentials: true }
      );
      console.log("Update response:", response);
      setSuccess("Partenaire updated successfully");
      await fetchPartenaires();
      setEditingPartenaire(null);
      setErrors([]);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating partenaire:", error);
      setErrors([error.message]);
    }
  };

  const handleDeletePartenaire = async () => {
    try {
      await axios.delete(
        `http://localhost:4308/login/partenaires/${deletingPartenaire}`,
        { withCredentials: true }
      );
      setSuccess("Partenaire deleted successfully");
      await fetchPartenaires();
      setDeletingPartenaire(null);
      setErrors([]);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting partenaire:", error);
      setErrors([error.message]);
    }
  };

  const closeModal = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add the company logo at the beginning
    const img = new Image();
    img.src = companyLogo;
    doc.addImage(img, "PNG", 14, 10, 20, 10);

    const img2 = new Image();
    img2.src = mobilabLogo;
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.addImage(img2, "PNG", 176, 10, 20, 10);

    // Position the title below the logo
    const startY = 40; // Adjust this value based on your logo's size
    doc.setFontSize(30);
    doc.text("Liste des Partenaires", pageWidth / 2, startY, {
      align: "center",
    });
    doc.autoTable({
      startY: startY + 10,
      head: [["Type", "Code", "Nom", "Contact"]],
      body: partenaires.map((partenaire) => [
        partenaire.type,
        partenaire.code,
        partenaire.nom,
        partenaire.contact,
      ]),
    });

    doc.setFontSize(10);
    const companyDetails = `
    MOBILAB, Au capital de 500 000.00 Dhs, RC: 322315-IF: 15251121-TP: 34754073-ICE001737039000029
            Angle Bd Abdelmoumen, 1 Rue des pléiades, Quartier des Hôpitaux 4éme étage Casablanca-Maroc
                                  Tél :(212)0522 86 37 73/0675 37 76 59 Fax : (212)05 22 86 37 79
  `;
    doc.text(companyDetails, 14, doc.internal.pageSize.height - 30);

    doc.save("partenaires.pdf");
  };

  return (
    <div>
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <label className="home">Home</label>
        <ul className="nav">
          <li className="services">Services</li>
          <li className="logout">
            <button className="btn" onClick={handleLogout}>
              Log Out
            </button>
          </li>
        </ul>
      </nav>

      <div className="admin-dashboard">
        <h1>Gestion des Partenaires</h1>
        {errors.length > 0 && (
          <div className="alert alert-danger">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <p>{success}</p>
          </div>
        )}
        <button
          className="btn btn-primary"
          onClick={() => setAddModalOpen(true)}
        >
          Ajouter
        </button>
        <br></br>
        <br></br>
        <table className="table table-striped table-bordered">
          <thead>
            <tr style={{ backgroundColor: "#000" }}>
              <th colSpan="7" className="toto">
                Liste des Partenaires
              </th>
            </tr>
            <tr>
              <th>Type</th>
              <th>Code</th>
              <th>Nom</th>
              <th>Contact</th>
              <th>Logo</th>
              <th>Icon</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partenaires.map((partenaire) => (
              <tr key={partenaire.id}>
                <td>{partenaire.type}</td>
                <td>{partenaire.code}</td>
                <td>{partenaire.nom}</td>
                <td>{partenaire.contact}</td>
                <td>
                  {partenaire.logo && (
                    <img
                      src={`http://localhost:4308/uploads/${partenaire.logo}`}
                      alt="Logo"
                      style={{ width: "50px" }}
                    />
                  )}
                </td>
                <td>
                  {partenaire.icon && (
                    <img
                      src={`http://localhost:4308/uploads/${partenaire.icon}`}
                      alt="Icon"
                      style={{ width: "50px" }}
                    />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEditPartenaire(partenaire.id)}
                  >
                    Modifier
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setDeletingPartenaire(partenaire.id);
                      setDeleteModalOpen(true);
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Add Modal */}
        {addModalOpen && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            role="dialog"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Ajouter un Partenaire</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form
                    onSubmit={handleAddPartenaire}
                    encType="multipart/form-data"
                  >
                    <div className="mb-3">
                      <label>Type:</label>
                      <select className="form-control" name="type">
                        <option value="MTO">MTO</option>
                        <option value="Marchand">Marchand</option>
                        <option value="Facturier">Facturier</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Code:</label>
                      <input
                        type="text"
                        name="code"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Nom:</label>
                      <input
                        type="text"
                        name="nom"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Contact:</label>
                      <input
                        type="text"
                        name="contact"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Logo:</label>
                      <input
                        type="file"
                        name="logo"
                        className="form-control"
                        accept="image/*"
                      />
                    </div>
                    <div className="mb-3">
                      <label>Icon:</label>
                      <input
                        type="file"
                        name="icon"
                        className="form-control"
                        accept="image/*"
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">
                        Ajouter
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeModal}
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editModalOpen && editingPartenaire && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            role="dialog"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier un Partenaire</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form
                    onSubmit={handleUpdatePartenaire}
                    encType="multipart/form-data"
                  >
                    <div className="mb-3">
                      <label>Type:</label>
                      <select
                        className="form-control"
                        name="type"
                        defaultValue={editingPartenaire.type}
                      >
                        <option value="MTO">MTO</option>
                        <option value="Marchand">Marchand</option>
                        <option value="Facturier">Facturier</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Code:</label>
                      <input
                        type="text"
                        name="code"
                        className="form-control"
                        defaultValue={editingPartenaire.code}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Nom:</label>
                      <input
                        type="text"
                        name="nom"
                        className="form-control"
                        defaultValue={editingPartenaire.nom}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Contact:</label>
                      <input
                        type="text"
                        name="contact"
                        className="form-control"
                        defaultValue={editingPartenaire.contact}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Logo:</label>
                      {editingPartenaire.logo && (
                        <div>
                          <img
                            src={`http://localhost:4308/uploads/${editingPartenaire.logo}`}
                            alt="Logo"
                            style={{ width: "50px" }}
                          />
                          <input
                            type="file"
                            name="logo"
                            className="form-control"
                            accept="image/*"
                          />
                        </div>
                      )}
                      {!editingPartenaire.logo && (
                        <input
                          type="file"
                          name="logo"
                          className="form-control"
                          accept="image/*"
                        />
                      )}
                    </div>
                    <div className="mb-3">
                      <label>Icon:</label>
                      {editingPartenaire.icon && (
                        <div>
                          <img
                            src={`http://localhost:4308/uploads/${editingPartenaire.icon}`}
                            alt="Icon"
                            style={{ width: "50px" }}
                          />
                          <input
                            type="file"
                            name="icon"
                            className="form-control"
                            accept="image/*"
                          />
                        </div>
                      )}
                      {!editingPartenaire.icon && (
                        <input
                          type="file"
                          name="icon"
                          className="form-control"
                          accept="image/*"
                        />
                      )}
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">
                        Modifier
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeModal}
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteModalOpen && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            role="dialog"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Supprimer un Partenaire</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    Êtes-vous sûr de vouloir supprimer ce partenaire ? Cette
                    action est irréversible.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeletePartenaire}
                  >
                    Supprimer
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          className="btn btn-secondary"
          onClick={generatePDF}
          style={{ marginTop: "20px" }}
        >
          Exporter en PDF
        </button>
      </div>
    </div>
  );
};

export default Navbar;
