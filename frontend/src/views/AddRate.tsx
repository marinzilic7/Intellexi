import React from "react";

function AddRate() {
  return (
    <div>
        <h3 className="text-center mt-5 mb-5">Kreiraj tečajnicu</h3>
      <form action="" className="w-50 mx-auto mt-5">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Datum primjene
          </span>
          <input
            type="date"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Sifra valute
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Unesi sifru valute..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Valuta
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Unesi valutu..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Kupovni tečaj
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Unesi kupovni tečaj..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Srednji tečaj
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Unesi srednji tečaj..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Prodajni tečaj
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Unesi prodajni tečaj..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <button className="btn btn-primary w-100">Spremi</button>
      </form>
    </div>
  );
}
export default AddRate;
