import React, { useState } from 'react';

function CreateInitiate1() {
 
  const [formData, setFormData] = useState({
    initiative_name: '',
    area_conducted: '',
    event_date: '',
    banner: null,
    sq_area: '', 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      banner: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center h-screen">
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="flex items-center justify-center px-4 py-4 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Create New Programme</h2>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="initiative_name" className="text-base font-medium text-gray-900">
                    Initiative Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="text"
                      placeholder="Initiative Name"
                      id="initiative_name"
                      name="initiative_name"
                      value={formData.initiative_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="area_conducted" className="text-base font-medium text-gray-900">
                    Location
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="text"
                      placeholder="Area Conducted"
                      id="area_conducted"
                      name="area_conducted"
                      value={formData.area_conducted}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="event_date" className="text-base font-medium text-gray-900">
                    Event Date
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="date"
                      id="event_date"
                      name="event_date"
                      value={formData.event_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="banner" className="text-base font-medium text-gray-900">
                    Upload Banner
                  </label>
                  <div className="mt-2 flex items-center justify-between">
                    <label htmlFor="banner-upload" className="cursor-pointer bg-gray-200 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-300">
                      Choose File
                    </label>
                    <input
                      type="file"
                      id="banner-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Programme
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center">
        <div className="hidden lg:block">
          <img
            className="h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
        </div>

    </div>
      </section>
    </div>
  );
}

export default CreateInitiate1;

