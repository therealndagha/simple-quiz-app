const TestPage = () => {
    return <>
        <button className="text-white rounded-lg bg-sky-500 px-3 hover:bg-sky-700">Save Changes</button>
        <button className="text-white bg-violet-500 hover:bg-violet-700 focus:outline-2 focus:outline-offset-2 focus:outline-violet-700 active:bg-violet-800 px-3 rounded-lg">Save Changes</button>
        <div className="mt-5">
           <div className="flex flex-col md:flex-row gap-3 items-center ">
               <div className="bg-indigo-800 text-white text-center p-8 basis-64 rounded-md">
                <p>01</p>
               </div>
               <div className="bg-indigo-800 text-white text-center p-8 basis-64 rounded-md">
                <p>02</p>
               </div>
               <div className="bg-indigo-800 text-white text-center p-8 basis-128 rounded-md">
                <p>03</p>
               </div>
           </div>
        </div>
    </>
  };
  
  export default TestPage;
  