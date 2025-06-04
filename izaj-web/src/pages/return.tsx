const Return = () => {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-white">
          <div className="max-w-4xl px-4 sm:px-8 md:px-12 py-12 text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Return Policy</h1>
            <section className="prose prose-gray max-w-none text-gray-800">
              <p className="text-lg mb-6">To ensure quality service, please read our Delivery and Installation guidelines:</p>
              
              <div className=" p-6 rounded-lg mb-8">
                <ul className="list-none space-y-4">
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span><strong>Free Delivery:</strong> Orders Php10,000 and above* (within San Pablo City only)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span><strong>Free installation:</strong> Orders Php10,000 and above* (within San Pablo City only) Installation should be done on the same day of Delivery.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    <span><strong>Regular Installation Fee</strong> – Php 900.00/pc*</span>
                  </li>
                  <li className="flex items-start text-sm italic">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>*Installations are applicable to lighting fixtures only.</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6">Added notes on Delivery & Installation:</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>The customer shall be responsible to ensure that either he/she personally or a valid representative will receive the products and approve of its condition before the delivery team leaves. Damaged products should be pointed out to the delivery team upon delivery so a replacement may be scheduled.</li>
                <li>The customer should apply for all necessary gate passes, working and other permits needed for the delivery day.</li>
                <li>If the customer is not available to receive the delivery at the agreed day, new delivery will be scheduled with a corresponding delivery fee.</li>
                <li>Kindly check the condition of goods before signing receipt before the delivery team leaves as warranties are not indulged in our offers.</li>
                <li>For installation, the customer shall be responsible in ensuring that the ceiling are fit for installations. Gypsum boards without support are not fit for big fixture installation.</li>
              </ol>
            </section>
          </div>
        </main>
      </div>
    );
  };
  
  export default Return;
  