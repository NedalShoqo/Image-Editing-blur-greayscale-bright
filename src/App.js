import { useState } from 'react'
import axios from 'axios'

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [originalImage, setOriginalImage] = useState('')
  const [filteredImage, setFilteredImage] = useState('')
  const [imageId, setImageId] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0])
  }

  const uploadImage = async () => {
    if (!selectedImage) {
      alert('Please select an image first')
      return
    }

    const formData = new FormData()
    formData.append('image', selectedImage)

    try {
      setLoading(true)

      const response = await axios.post(
        'http://127.0.0.1:8000/api/upload/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setOriginalImage(response.data.original_image)
      setImageId(response.data.id)
      setFilteredImage('')
    } catch (error) {
      console.error(error)
      alert('Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const applyFilter = async (filterType) => {
    if (!imageId) {
      alert('Upload an image first')
      return
    }

    try {
      setLoading(true)

      const response = await axios.post(
        `http://127.0.0.1:8000/api/filter/${imageId}/`,
        {
          filter: filterType,
        }
      )

      setFilteredImage(response.data.filtered_image)
    } catch (error) {
      console.error(error)
      alert('Filter failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Image Filter App
        </h1>

        <div className="mb-6">
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-xl p-3"
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={uploadImage}
            className="bg-black text-white px-6 py-3 rounded-2xl hover:scale-105 transition"
          >
            {loading ? 'Loading...' : 'Upload Image'}
          </button>

          <button
            onClick={() => applyFilter('grayscale')}
            className="bg-gray-700 text-white px-6 py-3 rounded-2xl hover:scale-105 transition"
          >
            Grayscale
          </button>

          <button
            onClick={() => applyFilter('blur')}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:scale-105 transition"
          >
            Blur
          </button>

          <button
            onClick={() => applyFilter('bright')}
            className="bg-yellow-500 text-white px-6 py-3 rounded-2xl hover:scale-105 transition"
          >
            Bright
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 rounded-2xl p-4 text-center">
            <h2 className="text-xl font-semibold mb-4">Original Image</h2>

            <div className="h-72 flex items-center justify-center border-2 border-dashed rounded-2xl overflow-hidden">
              {originalImage ? (
                <img
                  src={originalImage}
                  alt="Original"
                  className="h-full w-full object-cover"
                />
              ) : (
                <p className="text-gray-400">No image uploaded</p>
              )}
            </div>
          </div>

          <div className="bg-gray-100 rounded-2xl p-4 text-center">
            <h2 className="text-xl font-semibold mb-4">Filtered Image</h2>

            <div className="h-72 flex items-center justify-center border-2 border-dashed rounded-2xl overflow-hidden">
              {filteredImage ? (
                <img
                  src={filteredImage}
                  alt="Filtered"
                  className="h-full w-full object-cover"
                />
              ) : (
                <p className="text-gray-400">No filtered image</p>
              )}
            </div>
          </div>
        </div>

        {filteredImage && (
          <div className="mt-8 text-center">
            <a
              href={filteredImage}
              download
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-2xl hover:scale-105 transition"
            >
              Download Filtered Image
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
