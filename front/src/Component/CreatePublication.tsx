import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const CreatePublication: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    title: '',
    address: '',
    city: '',
    typeOfHousing: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    if (image) {
      submitData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/item', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Publication créée avec succès!');
      console.log('Réponse du serveur:', response.data);
      // Réinitialiser le formulaire ici si nécessaire
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(`Erreur: ${error.response?.data.message || error.message || 'Une erreur est survenue'}`);
      } else {
        setMessage('Une erreur inattendue est survenue');
      }
      console.error('Erreur lors de l\'envoi:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Créer une publication</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Nom de la propriété"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Description de la propriété"
            rows={3}
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Prix</label>
          <input
            id="price"
            name="price"
            type="number"
            required
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Prix"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Titre de l'annonce"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Adresse de la propriété"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
          <input
            id="city"
            name="city"
            type="text"
            required
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Ville"
          />
        </div>
        <div>
          <label htmlFor="typeOfHousing" className="block text-sm font-medium text-gray-700">Type de logement</label>
          <select
            id="typeOfHousing"
            name="typeOfHousing"
            value={formData.typeOfHousing}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Sélectionnez un type de logement</option>
            <option value="maison">Maison</option>
            <option value="appartement">Appartement</option>
            <option value="studio">Studio</option>
          </select>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Créer la publication
        </button>
      </form>
      {message && (
        <div className={`mt-4 p-4 rounded-md ${message.includes('Erreur') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default CreatePublication;