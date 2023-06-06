import { BiEdit } from 'react-icons/bi';

import  { useState , useEffect ,Fragment } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function Profileadd() {



const [pischanged, setPisChanged] = useState(false);



  const [selectedFiles, setSelectedFiles] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [details, setDetails] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [pitches, setPitches] = useState([]);

  
  // File change handler
  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  // Form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create FormData object
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append('images', file, `image-${index}`);
    });
    formData.append('name', name);
    formData.append('price', price);
    formData.append('size', size);
    formData.append('details', details);
    formData.append('description', description);
    formData.append('location', location);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    



    // Send the form data to the server
    axios.post('http://localhost:5151/senddata', formData, config)
      .then((response) => {
        console.log('Data sent:', response.data);
        setPisChanged(!pischanged);

        // Do something with the response data
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  const handleDeletePitch = (pitchId) => {
    fetch(`http://localhost:5151/deletepitch/${pitchId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Pitch deleted');
          // Perform any additional actions after successful deletion
          setPisChanged(!pischanged);

        } else {
          throw new Error('Error deleting pitch');
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
        // Handle the error case
      });
  };
  


  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    // Fetch the data from the server
    axios.get('http://localhost:5151/getdata', {
      params: {
        user_id: decodedToken.user_id
      }
    })
      .then((response) => response.data)
      .then((data) => {
        if (Array.isArray(data)) {
          setPitches(data);
          
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error retrieving data:', error);
      });
  }, [pischanged]);

  const handleSubmitt = (event, pitchid) => {
    event.preventDefault();
  console.log(pitchid);
    // Create FormData object
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append('images', file, `image-${index}`);
    });
    formData.append('name', name);
    formData.append('price', price);
    formData.append('size', size);
    formData.append('details', details);
    formData.append('description', description);
    formData.append('location', location);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    // Make the PUT request
    axios
      .put(`http://localhost:5151/updatedata/${pitchid}`, formData, config)
      .then((response) => {
        const updatedPitch = response.data;
        console.log('Data updated:', updatedPitch);
        setPisChanged(true); // Set the flag to indicate the data is updated
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };



  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPitchId, setSelectedPitchId] = useState(null);

  
  const toggleModal = (pitchId) => {
    setSelectedPitchId(pitchId);
    setIsModalOpen(!isModalOpen);
  };
  
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const [openState, setOpenState] = useState({});

  const handleOpen = (pitchId) => {
    
    setOpenState((prevState) => ({
      ...prevState,
      [pitchId]: !prevState[pitchId] || false,
    }));
  };



  return (
    <>
   

      <section className="max-w-md p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-black capitalize dark:text-white">
          Add Field
        </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="small_size"
            >
              image
            </label>
            <input
              className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="small_size"
              type="file"
              multiple

              onChange={handleFileChange}
            />

            <div>
              <label className="text-black dark:text-gray-200" htmlFor="username">
              Field name:
              </label>
              <input
                id="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div>
              <label className="text-black dark:text-gray-200" htmlFor="emailAddress">
              Price booking per two hours :
              </label>
              <input
                id="emailAddress"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            <div>
              <label className="text-black dark:text-gray-200" htmlFor="fieldType">
              Field size:
              </label>
              <select
                id="fieldType"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={size}
                onChange={(event) => setSize(event.target.value)}
              >
              <option value="">Select Size</option>
                <option value="11-a-side">11-a-side</option>
                <option value="7-a-side">7-a-side</option>
                <option value="5-a-side">5-a-side</option>
              </select>
            </div>
          
            <div>
            <label className="text-black dark:text-gray-200" htmlFor="citySelect">
              City:
            </label>
            <select
              id="citySelect"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              
            >
              <option value="">Select City</option>
              <option value="Amman">Amman</option>
              <option value="Zarqa">Zarqa</option>
              <option value="Irbid">Irbid</option>
              <option value="Aqaba">Aqaba</option>
              <option value="Jerash">Jerash</option>
              <option value="Madaba">Madaba</option>
            </select>
          </div>
            <div>
              <label className="text-black dark:text-gray-200" htmlFor="textarea">
                Details:
              </label>
              <textarea
                id="textarea"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
              ></textarea>
            </div>
            <div>
            <label className="text-black dark:text-gray-200" htmlFor="textarea">
              Description:
            </label>
            <textarea
              id="textarea"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-600"
              style={{ backgroundColor: '#54B435' }}
            >
              Submit
            </button>
          </div>
        </form>
      </section> 
      
      
       <br />
      <br />
      <br />
      <br />
      <h1 className=" text-4xl text-center text-black">My Fields</h1>
      <br />
      <hr />
     

      <div className="min-h-screen bg-white flex justify-center items-center py-20">
      <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
        {pitches.map((pitch) => (
          <div
            key={pitch.id}
            className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
          >
            <h3 className="mb-3 text-xl font-bold text-indigo-600">
              {pitch.name}
            </h3>
            <div className="relative">
              <img
                className="w-full rounded-xl"
                src={`data:image/jpeg;base64,${pitch.images[0]}`}
                alt={`Image 1`}
              />
              <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                {pitch.price} JD
              </p>
            </div>
            <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
              {pitch.details}
            </h1>
            <div className="my-4">
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <p>Full Time</p>
              </div>
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <p>{pitch.size}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
            <div className="ml-auto space-x-2">
      
    

   

            <Fragment>
            
            <button    onClick={() => handleOpen(pitch.id)} className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md">
            <BiEdit className="h-5 w-5 mr-2" />
            Update
          </button>
         
            <Dialog open={openState[pitch.id]} handler={() => handleOpen(pitch.id)}>
            <DialogHeader style={{ marginBottom: "-100px" }}  > Update Field </DialogHeader>
            <DialogBody divider style={{ marginTop: "20px", border: "none" }}>
              <div style={{ maxHeight: "550px", overflow: "auto" }}>

              <section className="max-w-xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
           
              <form className="mt-4" onSubmit={(event) => handleSubmitt(event, pitch.id)}>
                <div className="grid grid-cols-1 gap-6">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="small_size"
                  >
                    image
                  </label>
                  <input
                    className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="small_size"
                    type="file"
                    multiple
      
                    onChange={handleFileChange}
                  />
      
                  <div>
                    <label className="text-black dark:text-gray-200" htmlFor="username">
                      Pitch name:
                    </label>
                    <input
                      id="username"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
      
                  <div>
                    <label className="text-black dark:text-gray-200" htmlFor="emailAddress">
                    Price booking per two hours :
                    </label>
                    <input
                      id="emailAddress"
                      type="number"
                      className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </div>
      
                  <div>
                    <label className="text-black dark:text-gray-200" htmlFor="fieldType">
                      Pitch size:
                    </label>
                    <select
                      id="fieldType"
                      className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      value={size}
                      onChange={(event) => setSize(event.target.value)}
                    >
                    <option value="">Select Size</option>
                      <option value="11-a-side">11-a-side</option>
                      <option value="7-a-side">7-a-side</option>
                      <option value="5-a-side">5-a-side</option>
                    </select>
                  </div>
                
                  <div>
                  <label className="text-black dark:text-gray-200" htmlFor="citySelect">
                    City:
                  </label>
                  <select
                    id="citySelect"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    
                  >
                    <option value="">Select City</option>
                    <option value="Amman">Amman</option>
                    <option value="Zarqa">Zarqa</option>
                    <option value="Irbid">Irbid</option>
                    <option value="Aqaba">Aqaba</option>
                    <option value="Jerash">Jerash</option>
                    <option value="Madaba">Madaba</option>
                  </select>
                </div>
                  <div>
                    <label className="text-black dark:text-gray-200" htmlFor="textarea">
                      Details:
                    </label>
                    <textarea
                      id="textarea"
                      className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      value={details}
                      onChange={(event) => setDetails(event.target.value)}
                    ></textarea>
                  </div>
                  <div>
                  <label className="text-black dark:text-gray-200" htmlFor="textarea">
                    Description:
                  </label>
                  <textarea
                    id="textarea"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  ></textarea>
                </div>
                </div>
                <div className="flex justify-end mt-6">
           
                <DialogFooter>
                <Button
               
                  variant="text"
                  color="red"
                  onClick={() => handleOpen(pitch.id)}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button  type="submit"  variant="gradient" color="green" onClick={() => handleOpen(pitch.id)}>
                  <span>Update</span>
                </Button>
              </DialogFooter>
                </div>
              </form>
            </section> 
            </div> 
              </DialogBody>
           
            </Dialog>
          </Fragment>

              <>
            <button onClick={() => toggleModal(pitch.id)}  className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
            
            {isModalOpen && selectedPitchId === pitch.id && (
              <div
                id="popup-modal"
                tabIndex={-1}
                className="fixed inset-0 flex items-center justify-center z-50"
              >
                <div className="relative w-full max-w-md">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                      onClick={hideModal}
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      data-modal-hide="popup-modal"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                      <svg
                        aria-hidden="true"
                        className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this product?
                      </h3>
                      <button
                        onClick={() => {
                          handleDeletePitch(pitch.id);
                          hideModal();
                        }}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        Yes, Im sure
                      </button>
                      <button
                        onClick={hideModal}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </>

            </div>
        
            </div>
          </div>
        ))}
      </div>
    </div>
    
    

  




    </>
  );
}





