import React from "react";
import "../styles/settings.css";

const Settings = () => {
  return (
    <div className="settings">
      <div className="settings__wrapper">
        <h2 className="settings__title">Settings</h2>

        <div className="settings__top">
          <button className="setting__btn">My Profile</button>
          <button className="setting__btn active__btn">Home</button>
          <button className="setting__btn">About</button>
          <button className="setting__btn">Galeri</button>
          <button className="setting__btn">Şifre</button>
        </div>
        <div className="details__from">
          <h2 className="profile__title">Profile</h2>
          <p className="profile_desc">
            Update your photo and personel details here
          </p>
          <form>
            <div className="form__group">
              <div>
                <label>Name</label>
                <input type="text" placeholder="Name" />
              </div>

              <div>
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" />
              </div>
            </div>

            <div className="form__group">
              <div>
                <label>Email</label>
                <input type="email" placeholder="example@hotmail.com" />
              </div>

              <div>
                <label>Phone Number</label>
                <input type="number" placeholder="+905....." />
              </div>
            </div>

            <div className="form__group">
              <div>
                <label>Date</label>
                <input type="date" placeholder="dd-mm-yyyy" />
              </div>

              <div>
                <label>Gender</label>
                <input type="number" placeholder="Male" />
              </div>
            </div>

            <div className="form__group">
              <div>
                <label>Your Photo</label>
                <p className="profile-img__desc">
                  This will be displayed in your profile title
                </p>

                <input type="file" placeholder="choose file" />
              </div>

              <div className="profile__img-btns">
                <button className="dlt__btn">Delete</button>
                <button className="upt__btn">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
