import React from 'react';
import axios from 'axios';

// This list would ideally come from your ML model's training data or a database.
const allSymptoms = [
    "fever", "cough", "headache", "itching", "skin_rash", "abdominal_pain", 
    "nausea", "chills", "sore_throat", "runny_nose", "fatigue", "vomiting",
    "joint_pain", "muscle_weakness", "dizziness", "shortness_of_breath"
];

const SymptomChecker = () => {
    // State to hold the user's selected symptoms
    const [selectedSymptoms, setSelectedSymptoms] = React.useState([]);
    
    // State to hold the uploaded image file
    const [imageFile, setImageFile] = React.useState(null);

    // State to hold the analysis result from the backend
    const [result, setResult] = React.useState(null);

    // State to manage the loading status during API calls
    const [isLoading, setIsLoading] = React.useState(false);
    
    // Your backend URL from environment variables
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    /**
     * Toggles a symptom in the selectedSymptoms array.
     * @param {string} symptom - The symptom to add or remove.
     */
    const handleSymptomChange = (symptom) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptom)
                ? prev.filter(s => s !== symptom)
                : [...prev, symptom]
        );
    };

    /**
     * Handles the form submission.
     * Packages selected symptoms and the image file into FormData
     * and sends it to the backend for analysis.
     * @param {React.FormEvent} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate that at least one symptom or an image is provided
        if (selectedSymptoms.length === 0 && !imageFile) {
            alert("Please select at least one symptom or upload an image.");
            return;
        }

        setIsLoading(true);
        setResult(null);

        // FormData is used to send files and text data together
        const formData = new FormData();
        formData.append('symptoms', JSON.stringify(selectedSymptoms)); // Convert array to a string

        if (imageFile) {
            // The key 'symptomImage' must match the key used in the backend (Multer)
            formData.append('symptomImage', imageFile);
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/symptoms/check`, formData, {
                headers: {
                    // This header is crucial for file uploads
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (data.success) {
                setResult(data);
            } else {
                // Handle cases where the API returns a non-success but valid response
                alert(data.message || "An unknown error occurred.");
            }
        } catch (error) {
            console.error("Error submitting symptoms:", error);
            alert("Failed to connect to the server. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-4xl">
            {/* Header and Disclaimer */}
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">Symptom Checker</h1>
                <p className="mb-6 p-2 bg-red-100 border border-red-300 text-red-700 rounded-md">
                    <strong>Disclaimer:</strong> This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
            </div>

            {/* Form for Symptom Selection and Image Upload */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3 text-gray-700">1. Select Your Symptoms</h2>
                    <div className="flex flex-wrap gap-3">
                        {allSymptoms.map(symptom => (
                            <label key={symptom} className={`p-2 px-4 border rounded-full cursor-pointer transition-colors duration-200 ${selectedSymptoms.includes(symptom) ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                                <input type="checkbox" className="hidden" onChange={() => handleSymptomChange(symptom)} />
                                {symptom.replace(/_/g, ' ')}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3 text-gray-700">2. Upload a Symptom Photo (Optional)</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300" disabled={isLoading}>
                    {isLoading ? 'Analyzing...' : 'Check Symptoms'}
                </button>
            </form>

            {/* Display Results */}
            {result && (
                <div className="mt-8 p-6 border rounded-lg bg-white shadow-lg animate-fade-in">
                    <h2 className="text-2xl font-bold text-blue-800">{result.disease}</h2>
                    <p className="mt-2 text-gray-600">{result.details}</p>
                    
                    <h3 className="text-xl font-semibold mt-6 text-gray-800">Precautions</h3>
                    <ul className="list-disc list-inside mt-2 text-gray-600">
                        {result.precautions.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                        <h3 className="font-semibold text-gray-800">Suggested Specialist</h3>
                        <p className="text-gray-600">Based on these symptoms, we recommend you consult with a <span className="font-bold text-blue-600">{result.specialty}</span>.</p>
                        {/* You can add a <Link> here to your doctors page, filtered by specialty */}
                        <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                            Find a {result.specialty}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SymptomChecker;

