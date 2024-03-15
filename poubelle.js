<main className="profile-pagerelative w-full h-full py-10 ">
            <section>
            <section className="h-full justify-content: flex-start flex-direction:row">
              <div className="container mx-2 px-1 h-full">
                <div className="flex w-full justify-between h-full ">
                  <div
                    className=" flex flex-col min-w-0 break-words bg-white shadow-xl rounded-lg "
                    style={{ width: "35%" }}
                  >
                    <div className="flex flex-col">
                      <div class="flex items-center justify-center w-full ">
                            <img src={feriel}
                            style={{ width: 200, height: 200 }}
                            className="mt-5 border-1 shadow rounded-full  border-black"
                            alt="Default"
                            />
                          </div>

                      <div className="mx-auto mt-2">
                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                          {name}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                          <i
                            style={{ color: "#BD2C43" }}
                            className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"
                          ></i>{" "}
                          {country}
                        </div>
                        <div className="mb-2 text-blueGray-600 mt-3">
                          <i
                            style={{ color: "#BD2C43" }}
                            className="fas fa-briefcase mr-2 text-lg text-blueGray-400"
                          ></i>
                          {jobTitle}
                        </div>
                        <div className="mb-2 text-blueGray-600">
                          <i
                            style={{ color: "#BD2C43" }}
                            className="fas fa-university mr-2 text-lg text-blueGray-400"
                          ></i>
                          {jobLocation}
                          </div>
                          </div>
                          <div className="mt-10 py-10 border-t  border-blueGray-200 text-center">
                            <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-9/12 px-4 flex flex-col">
                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                {description}
                                </p>
                                </div>
                                </div>
                          </div>
                         
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section  className="h-full justify-content: flex-end flex-direction:row">
            <div className="container mx-10 px-10 h-full">
                <div className="flex w-full justify-between h-full ">
                  <div
                    className=" flex flex-col min-w-0 break-words bg-white shadow-xl rounded-lg "
                    style={{ width: "35%" }}
                  >
                    <div className="flex flex-col">
                      <div className="mx-auto mt-2">
                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                          {name}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                          <i
                            style={{ color: "#BD2C43" }}
                            className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"
                          ></i>{" "}
                          {country}
                        </div>
                        <div className="mb-2 text-blueGray-600 mt-3">
                          <i
                            style={{ color: "#BD2C43" }}
                            className="fas fa-briefcase mr-2 text-lg text-blueGray-400"
                          ></i>
                          {jobTitle}
                        </div>
                        <div className="mb-2 text-blueGray-600">
                          <i
                            style={{ color: "#BD2C43" }}
                            className="fas fa-university mr-2 text-lg text-blueGray-400"
                          ></i>
                          {jobLocation}
                          </div>
                          </div>
                          <div className="mt-10 py-10 border-t  border-blueGray-200 text-center">
                            <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-9/12 px-4 flex flex-col">
                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                {description}
                                </p>
                                </div>
                                </div>
                          </div>
                         
                    </div>
                  </div>
                </div>
              </div>

            </section>
            </section>
            

          <div class="mx-auto grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
            <div class="shadow-lg p-5 lg:col-span-1">
              <h3 class="text-xl">Profile section</h3>
            </div>
            <div class="shadow-lg p-5 lg:col-span-2">
              <h3 class="text-xl">Offer section</h3>
            </div>
            <div class="shadow-lg p-5 lg:col-span-1">
              <h3 class="text-xl">Search section</h3>
            </div>
            <div>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Filtrer</button>
              <button type="button" onClick={handleReset} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Réinitialiser</button>
            </div>
          </div>




            
          </main>





