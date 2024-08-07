import React, { useState } from "react";
import axios from "axios";

const Ajouter = ({ showModal, onClose }) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    dateNaissance: "",
    filiere: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/students", formData);
      alert("Étudiant ajouté avec succès");
      setFormData({
        nom: "",
        prenom: "",
        telephone: "",
        dateNaissance: "",
        filiere: "",
        email: "",
      });
      onClose();
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          aria-labelledby="addStudentModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addStudentModalLabel">
                  Ajouter Étudiant
                </h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={onClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Nom"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      placeholder="Prénom"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telephone">Téléphone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="Téléphone"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateNaissance">Date de Naissance</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateNaissance"
                      name="dateNaissance"
                      value={formData.dateNaissance}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="filiere">Filière</label>
                    <select
                      className="form-control"
                      id="filiere"
                      name="filiere"
                      value={formData.filiere}
                      onChange={handleChange}
                    >
                      <option value="Genie Informatique">
                        Génie Informatique
                      </option>
                      <option value="Genie Industriel">Génie Industriel</option>
                      <option value="Genie Electrique">Génie Electrique</option>
                      <option value="Genie Mecanique">Génie Mécanique</option>
                      <option value="Genie Mathematique">
                        Génie Mathématique
                      </option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={onClose}
                    >
                      Annuler
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Ajouter;
