import React, { useState, useRef } from "react";
import { supabase } from "../../supabaseClient";
import "./Profile.css";

export default function Profile() {
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [operationalTime, setOperationalTime] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast({ show: false, type: '', message: '' });
    let imageUrl = null;
    let userId = null;
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      userId = userData.user.id;
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `profile-images/${userId}.${fileExt}`;
        let { error: uploadError } = await supabase.storage.from('profile-images').upload(filePath, imageFile, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage.from('profile-images').getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      }
      const { error: upsertError } = await supabase.from('profiles').upsert({
        id: userId,
        business_name: businessName,
        category,
        city,
        operational_time: operationalTime,
        contact,
        description,
        image_url: imageUrl,
      });
      if (upsertError) throw upsertError;
      setToast({ show: true, type: 'success', message: 'Profile saved successfully!' });
    } catch (err) {
      setToast({ show: true, type: 'error', message: err.message || 'Failed to save profile.' });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ show: false, type: '', message: '' }), 3000);
    }
  };

  return (
    <div className="profile-setup-bg">
      <div className="profile-card">
        <div className="profile-header">
          <h1>Set Up Your Profile</h1>
          <p className="profile-subtitle">Complete your business profile to get started</p>
        </div>
        <div className="profile-divider" />
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-avatar-upload">
            <div className="avatar-box" onClick={handleImageBoxClick}>
              {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" className="avatar-img" />
              ) : (
                <span className="avatar-placeholder">+</span>
              )}
              <div className="avatar-overlay">
                <span className="avatar-upload-icon">&#128247;</span>
              </div>
              <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
            </div>
            <span className="avatar-label">Upload Image</span>
          </div>
          <div className="profile-fields">
            <div className="floating-label-group">
              <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} required className="profile-input" />
              <label className={businessName ? 'filled' : ''}>Business Name</label>
            </div>
            <div className="floating-label-group">
              <input type="text" value={category} onChange={e => setCategory(e.target.value)} required className="profile-input" />
              <label className={category ? 'filled' : ''}>Category</label>
            </div>
            <div className="floating-label-group">
              <input type="text" value={city} onChange={e => setCity(e.target.value)} required className="profile-input" />
              <label className={city ? 'filled' : ''}>City</label>
            </div>
            <div className="floating-label-group">
              <input type="text" value={operationalTime} onChange={e => setOperationalTime(e.target.value)} required className="profile-input" />
              <label className={operationalTime ? 'filled' : ''}>Operational Time</label>
            </div>
            <div className="floating-label-group">
              <input type="text" value={contact} onChange={e => setContact(e.target.value)} required className="profile-input" />
              <label className={contact ? 'filled' : ''}>Contact</label>
            </div>
            <div className="floating-label-group">
              <textarea value={description} onChange={e => setDescription(e.target.value)} required className="profile-input textarea" />
              <label className={description ? 'filled' : ''}>Description</label>
            </div>
            <button type="submit" className="profile-save-btn" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Save'}
            </button>
          </div>
        </form>
        {toast.show && (
          <div className={`profile-toast ${toast.type}`}>{toast.message}</div>
        )}
      </div>
    </div>
  );
}
