import axios from "axios";
import { useEffect, useState } from "react"

const Form = () => {

    const [selectedCount, setSelectedCount] = useState(8);


      const handleSubmit = async (e) => {
        e.preventDefault();
            // console.log(import.meta.env.VITE_BASE_URL);
        
        const form = e.target;
        const data = new FormData(form);

        try {
          const response = await axios.post(`https://photo2print.onrender.com/api/photos/upload`, data, {
            responseType: 'blob'
          });
          
          // Handle the PDF download
          const url = window.URL.createObjectURL(response.data);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'passport-sheet.pdf');
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error) {
          console.error('Error uploading photo:', error);
          alert('Failed to generate PDF. Please try again.');
        }
      }

    
  return (
    <div className="mt-30 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-black text-4xl font-bold mb-6 text-center" style={{ fontFamily: 'Molle, cursive' }}>Photo2Print</h1>

        <form className="space-y-6" onSubmit={(e) => {handleSubmit(e)}}>
          <input type="hidden" name="photoCount" value={selectedCount} />
          <div>
            <label className="block text-black text-lg mb-2">Upload Your Photo</label>
            <input
              type="file"
              accept="image/*"
              name="photo"
              className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-black placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <div>
            <label className="block text-black text-lg mb-2">Number of Photos</label>
            {/* <input
              type="number"
              min="1"
              max="20"
              className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-black placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-white/50 mb-4"
            /> */}
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setSelectedCount(4)}
                className={`flex-1 px-3 py-2 border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105 ${selectedCount === 4 ? 'bg-white/30' : 'bg-linear-to-r from-blue-500/50 to-purple-500/50'}`}
              >
                4
              </button>
              <button
                type="button"
                onClick={() => setSelectedCount(8)}
                className={`flex-1 px-3 py-2 border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105 ${selectedCount === 8 ? 'bg-white/30' : 'bg-linear-to-r from-green-500/50 to-teal-500/50'}`}
              >
                8
              </button>
              <button
                type="button"
                onClick={() => setSelectedCount(16)}
                className={`flex-1 px-3 py-2 border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105 ${selectedCount === 16 ? 'bg-white/30' : 'bg-linear-to-r from-blue-500/50 to-purple-500/50'}`}
              >
                16
              </button>
              <button
                type="button"
                onClick={() => setSelectedCount(20)}
                className={`flex-1 px-3 py-2 border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105 ${selectedCount === 20 ? 'bg-white/30' : 'bg-linear-to-r from-green-500/50 to-teal-500/50'}`}
              >
                20
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-linear-to-r from-pink-500/50 to-red-500/50 border border-white/30 rounded-xl text-white text-lg font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
          >
            Generate Printable Sheet
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form