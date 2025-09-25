"use client";

import { useState } from 'react';

const TermsOfPurchase = () => {
    const [email, setEmail] = useState('');
  
      
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        alert(`Thank you for subscribing with ${email}!`);
        setEmail('');
    };
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <main className="flex-grow bg-white w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Purchase</h1>
            <section className="prose prose-gray max-w-none text-gray-800 text-left">
              <h2 className="text-2xl font-bold mt-12 mb-6">General</h2>
              <ol className="list-decimal pl-6">
                <li>When you purchase any product (the "Product(s)") and/or handling, delivery, assembly and/or any other services (the "Service(s)") from Izaj (Philippines) Limited ("us", "we", "our") on <a href="http://www.izaj.com/ph/en/" target="_blank" rel="noopener noreferrer">www.izaj.com/ph/en/</a> (the "Website"), you conclude a legally binding agreement with us based on these Terms of Purchase. Each order under which you purchase Product(s) and/or Service(s) shall be referred to as an "Order".</li>
                <li>You should read these Terms of Purchase together with the Terms of Use, the Privacy Policy, and the Cookie Policy. The Terms of Use and the Privacy Policy shall be incorporated into these Terms of Purchase by reference.</li>
                <li>In the event of any inconsistency between these Terms of Purchase, Terms of Use, and the Privacy Policy, these Terms of Purchase shall prevail.</li>
                <li>You agree that we may modify these Terms of Purchase without liability and without prior notice to you. The modified Terms of Purchase will be posted on the Website, and will come into effect from the date of such posting. You are advised to check for updates to these Terms of Purchase regularly, prior to purchasing any Product(s) on the Website.</li>
                <li>You understand that you must, at your own cost, provide telecommunication services, computers, and other equipment or services necessary to access the Website. You must comply with all the rules and regulations that apply to the means that you have used to access the Website (e.g. Internet access).</li>
                <li>We will do our best to check the Website for viruses but we do not warrant that the Website is free of viruses or other malicious content.</li>
                <li>All decisions and determinations made by us under these Terms of Purchase are final.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Product(s) – Description and Prices</h2>
              <ol className="list-decimal pl-6" start={8}>
                <li>We may temporarily or permanently remove any Product(s) and/or Service(s) from the Website at any time, with or without notice to you.</li>
                <li>All Products sold through the Website are intended for domestic use only; the Products are not suitable for commercial or industrial use unless expressly stated.</li>
                <li>We try our best to make sure that all information on the Website, including descriptions of the Product(s) and/or Service(s) and listed prices are accurate at all times.</li>
                <li>When browsing the Website, the colors of Products may vary depending on a number of factors, such as the display settings of your computer monitor.</li>
                <li>Pictures and images on the Website are for illustration purposes only. For an accurate description of any Product and details of what is included with the Product, please read the Product description.</li>
                <li>Unless otherwise stated, all Product prices shown on the Website are quoted in Philippine peso per unit and are inclusive of applicable taxes.</li>
                <li>However, the Product prices are not inclusive of Service fees, which will be added to your total Order price.</li>
                <li>We do not guarantee that:
                  <ol className="list-[lower-alpha] pl-6">
                    <li>the Product or Service prices on the Website will be the same as the in-store prices (and vice versa);</li>
                    <li>any promotion that is offered on the Website will be available in-store (and vice versa); and</li>
                    <li>any Product or Service that is offered for sale on the Website will also be offered for sale in-store (and vice versa).</li>
                  </ol>
                </li>
                <li>We reserve the right to adjust prices, Products, Product descriptions, Services, Service descriptions, and special offers at any time and at our discretion.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Placement of Orders</h2>
              <ol className="list-decimal pl-6" start={17}>
                <li>When you place an Order, you represent and warrant to us that:
                  <ol className="list-[lower-alpha] pl-6">
                    <li>you are at least 18 years of age;</li>
                    <li>if you are not at least 18 years of age, you have obtained the consent of your parent or guardian to place the Order;</li>
                    <li>you are duly authorized to use the customer account under which you have placed the Order; and</li>
                    <li>you are a resident of the Philippines.</li>
                  </ol>
                </li>
                <li>You will also need to provide us with an active email address and a telephone number so that we can easily contact you.</li>
                <li>Your Order counts as an offer to purchase the Product(s) and/or Service(s) from us, at the prices set out on the Delivery Notification email.</li>
                <li>After placing your Order, you will receive an order confirmation email. This contains an order number, details of the Product(s) & Service(s) you have ordered, and the total cost of the Order.</li>
                <li>The Order confirmation email does not constitute our acceptance of your Order.</li>
                <li>The sale of Products is subject to availability. We will contact you in the event any Product that you have ordered is not in stock.</li>
                <li>Your Order is only deemed accepted by us when we send you the Delivery Notification email.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Delivery of Orders</h2>
              <ol className="list-decimal pl-6" start={24}>
                <li>All delivery and assembly services are provided by our third-party service provider.</li>
                <li>The delivery fees are based on the delivery of one Order to a single address within the Philippines. Promotional delivery fees may apply at our discretion and may be withdrawn at any time before the Order is confirmed.</li>
                <li>We will try our best to meet your chosen delivery date and timeslot, however, there may be times where we are unable to do so, and when this happens, we will contact you to re-arrange the delivery date and timeslot.</li>
                <li>You shall inform us of any delivery restrictions or difficulty in accessing your property when you place an Order, and ensure that the relevant permits are obtained from the building/residential management prior to the scheduled delivery date. If you live in a gated community, compound, or condominium complex, you shall be wholly responsible for obtaining clearance or permits for the entry and exit of the delivery personnel from such gated community, compound or condominium complex. This includes prepaying or clearing any fees that are assessed against delivery vehicles or personnel.</li>
                <li>Our service providers are not obliged to wait for you to grant our service providers access to the property as they will have to fulfill other deliveries scheduled for the day. If they leave, any attempt at re-delivery shall be subject to a re-attendance fee.</li>
                <li>On delivery, it is your responsibility to examine the Product(s), check the condition of the packaging, and ensure that the correct number of packages has been delivered and you will be asked to sign the proof of delivery to confirm this. If there are any issues, you should detail this accordingly on the proof of delivery. Missing Product(s) will be re-ordered and damaged/incorrect Product(s) will be returned and replaced and delivered free of charge only if you highlight it on the point of delivery. If you refuse to sign the delivery document, this will be taken as a refusal to accept delivery.</li>
                <li>Please make plans to be available to accept your delivery. If you are not available, there must be a person aged 18 years and above that is capable of receiving delivery on your behalf, and you agree that we can rely on such person's instructions as if they were your own. We are not obliged to verify that that person has been authorized by you to receive delivery of the Order. Our service providers are not permitted to leave any Product(s) that have not been signed for. In the event of an unsuccessful scheduled delivery, a re-attendance fee shall apply for the next delivery attempt.</li>
                <li>In the event of any unforeseen circumstances (such as lorry breakdown, traffic accident, major traffic delays, or severe weather) we will do our best to contact you to rearrange the alternative delivery date and timeslot.</li>
                <li>We are unable to deliver perishable products (including live plants).</li>
                <li>We are unable to deliver to the addresses of cargo or freight forwarding companies due to the long waiting periods and access restrictions imposed by the cargo or freight forwarding companies. We shall cancel and refund any such orders.</li>
                <li>Before the delivery, please ensure that there is sufficient access and space and that any staircases and lifts providing access are suitable for the delivery. Please move objects which could be damaged during the delivery, such as lights, vases, pictures, etc., and ensure there is sufficient space in the property for delivery and assembly.</li>
                <li>Every effort will be made to deliver the Product(s) to your stipulated address, provided that it is safe and feasible to do so. If our service providers are of the view that it is unsafe for their personnel or for any other person to deliver the Product(s) to the address, or that any attempted delivery is likely to cause damage to the Product(s) or to the property at the stipulated address (including surrounding property), they will let you know and if you still decide to proceed with the delivery, we will not be liable for any damage caused to the Product(s) or any property.</li>
                <li>Our service providers will not use any specialized lifting equipment and/or remove any fixtures at the stipulated address (e.g. doors, windows, doorframes, etc.) in order to complete the delivery. If any of such equipment or removal is required, you must arrange these before the delivery takes place. Our service providers will not unpack or assemble delivered Product(s) or remove any packaging unless you have placed an Order for assembly services. If you are concerned about possible damage to the Property (e.g. flooring etc.) during the delivery, please make sure you cover the property (e.g. flooring, etc.) with protective sheets.</li>
                <li>We will not be responsible for any damage to your property if you fail to comply with this Delivery of Orders section.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Assembly Services</h2>
              <ol className="list-decimal pl-6" start={38}>
                <li>All assembly services are provided by our third-party service provider.</li>
                <li>Our assembly safety measures require that all free-standing furniture products that come with tip-over restraints must be secured to the wall to make your home a safer place.</li>
                <li>Drilling will be applicable for Products that require wall-mounting. Our service providers are not obliged to perform drilling services for products that are not purchased from us.</li>
                <li>Electrical and plumbing works are not included in the scope of assembly services.</li>
                <li>There will be a call-out fee if you decide to engage assembly services after delivery has been completed. The call-out fee applicable within the Philippines is currently starting from ₱500 per trip, and this fee is subject to change from time to time without prior notice to you. Assembly services will be charged separately at prevailing rates. We will inform you about the applicable call-out fee and the assembly fee when you contact us to request assembly services.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Changes to and Cancellation of Services</h2>
              <ol className="list-decimal pl-6" start={43}>
                <li>For any changes and cancellation of Services for truck delivery, please contact us at +63 2 8888 Izaj (4532). Please note however there will be no refund of the delivery and/or storage fees (if any) and rebooking will incur an additional cost to you. Please note that a separate transport fee applies for adding assembly service. For both truck and parcel delivery, no changes and cancellations are allowed after payment. We will try our best to accommodate your requests. However, you understand that we may not always be able to do so, and this may happen in a variety of circumstances (e.g. your requested delivery dates and timeslots have all been taken, etc.). When this happens, we will inform you accordingly and arrange another suitable delivery date and timeslot.</li>
                <li>Please also note that any change and/or cancellation to the services and/or delivery date and/or timeslot may result in you incurring additional fees. In particular, if your new delivery date exceeds 5 days from the date of your Order, you may incur additional storage fees at the prevailing rates. We are not obliged to complete delivery of your Order or provide any additional services that you have requested prior to receiving payment of additional fees (if applicable).</li>
                <li>For credit cards and debit cards, refunds will be done via the initial payment mode. For other payment methods, you may choose to receive Izaj gift card or bank checks, which will be mailed to you through registered mail. Please note that refund will be processed within 30 working days (Monday to Friday excluding public holidays) after confirmation of refundable sums.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Changes to and Cancellation of Orders</h2>
              <ol className="list-decimal pl-6" start={46}>
                <li>No cancellation can be done once the order and services are paid and confirmed. For Cash Over the Counter (OTC), no cancellation can be done once the order is placed. For any support, please contact us at +63 2 8888 Izaj (4532). Any promotion codes that you have used under your Order will not be returned to you.</li>
                <li>For credit cards, debit cards, and E-wallet, refunds will be done via the initial payment mode. For other payment methods, you may choose to receive Izaj gift card, bank checks with a registered letter, or online banking. Please note that refund will be processed within 30 working days (Monday to Friday excluding public holidays) after confirmation of refundable sums.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Returns</h2>
              <ol className="list-decimal pl-6" start={48}>
                <li>You can return any Product within 365 days of the date of your Order, provided that the Product:
                  <ol className="list-[lower-alpha] pl-6">
                    <li>is new;</li>
                    <li>is unused;</li>
                    <li>has its packaging intact (if applicable);</li>
                    <li>if already assembled, is in our absolute discretion, in re-saleable condition; and</li>
                    <li>fulfill any other returns criteria that may from time to time be imposed by us, and such returns criteria can be found here.</li>
                    <li>does not belong to the following categories: plants, cut fabric, custom countertops and as-is products. We are unable to refund or exchange your items if your merchandise is found to be modified from its original form when purchased, dirty, stained, or damaged.</li>
                  </ol>
                </li>
                <li>If we are of the view that the returned Product does not fulfill the returns criteria, we may, at our discretion refuse the return of the Product or offer an exchange or gift card instead.</li>
                <li>We will only process your refund after we have received and inspected the returned Product. All refunds will be made through your original payment method except for Cash Over the Counter (OTC) and Installment Payment Plan (IPP). However, please note that we will reduce the amount of your refund to reflect any reduction in the value of the returned Product.</li>
                <li>Service fees (if applicable) are not refundable unless otherwise permitted by us.</li>
                <li>You can either return a Product in-store, or you can request that our service providers collect the Product from your address.</li>
                <li>You can contact us at +63 2 8888 Izaj (4532) if you need our service providers to collect the Product from your address. You will need to provide us with your Order number, the details of the Product to be returned, and the delivery receipt when you contact us. Collection fees are applicable unless you are returning the Product to us as a result of a mistake committed by us, and we will advise you of such fees when we process your request. Upon receipt of the applicable collection fees, we will then arrange for our service providers to collect the Product from your address.</li>
                <li>If you choose to return the Product in-store, you must provide hard copies of the invoice, receipt, credit card slip, and the payment card with which you paid for the Product(s) if applicable.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Our Liability</h2>
              <ol className="list-decimal pl-6" start={55}>
                <li>All Product(s) are provided "as-is". We, our affiliates, officers and employees give no guarantee, representation or warranty, whether express or implied, in respect of (i) the quality or fitness for a particular purpose of any Product or (ii) the merchantability of any Product.</li>
                <li>We will, under no circumstances, be liable for any loss or damage suffered by you or anyone else arising from any:
                  <ol className="list-[lower-alpha] pl-6">
                    <li>modification to the Product that has not been authorized by us in writing;</li>
                    <li>use of the Product in a manner that has not been authorized by us in writing, or in a manner that is not in accordance with how the Product will be used by a reasonable person;</li>
                    <li>disregard of any safety instructions or guidelines that we have prescribed; and/or</li>
                    <li>failure to comply with these Terms of Purchase.</li>
                  </ol>
                </li>
                <li>We will not be liable to you under contract, tort, statute, or otherwise for any: (i) indirect, consequential, collateral, special or incidental loss or damage; (ii) loss of revenue, profits, anticipated savings or business, loss of data or goodwill, loss of use or value of any equipment, claims of third parties or any associated and incidental costs or expenses; or (iii) losses that are not reasonably foreseeable at the time your Order is accepted, in each case suffered or incurred by you in connection with any Order, any Product, or any services procured under these Terms of Purchase or otherwise.</li>
                <li>Any condition or warranty, which may be implied or incorporated into these Terms of Purchase by reason of statute or common law or otherwise (including warranties as to merchantability, suitability, satisfactory quality, and fitness for purpose) is hereby expressly excluded from the maximum extent permitted by law.</li>
                <li>Subject to the above and to satisfactory proof, our entire liability to you for a claim in connection with any Order shall be limited to the Order price.</li>
                <li>Despite the limitations in the paragraphs above, we do not in any way limit our liability to you for death, personal injury, or fraud.</li>
                <li>Where you buy as a consumer, these Terms of Purchase will not affect your rights under the law, which cannot otherwise be excluded.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Force Majeure</h2>
              <ol className="list-decimal pl-6" start={62}>
                <li>We will not be responsible for any delay or failure to comply with these Terms of Purchase if the delay or failure arises from any event, which is beyond our reasonable control. Such events would include (but are not limited to) fires, floods, earthquakes, storms, natural disasters, war, civil unrest, acts of terrorism, or malicious damage to or destruction of our premises, equipment, or goods.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Quantity Limit</h2>
              <ol className="list-decimal pl-6" start={63}>
                <li>To ensure our Products are available to more customers, we reserve the right to limit quantities available for purchase. Quantity limits may be applied per order, per person or household, or to orders that use the same credit card, debit card or E-wallet account; billing and/or delivery address; or share any other account or order attribute. We reserve the right to cancel orders if you attempt to circumvent quantity limitations (e.g. by using multiple email addresses or accounts to order more than a stated limit or by placing multiple, excessive orders of the same product, etc).</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Entire Agreement</h2>
              <ol className="list-decimal pl-6" start={64}>
                <li>Unless otherwise provided herein, these Terms of Purchase embody all the terms and conditions agreed upon between us as to the sale and purchase of Product(s) and/or Service(s) described herein, and supersedes all previous proposals, agreements, representations, and undertakings, if any, between us with respect to the subject matter hereof, whether written or oral, notwithstanding the existence of any provision in any such prior agreement that any such rights or provisions shall survive its termination.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Waiver</h2>
              <ol className="list-decimal pl-6" start={65}>
                <li>If you commit any breach of these Terms of Purchase and we take no action, we will not be taken to have waived our rights against you, and will still be entitled to exercise our rights and remedies at a later stage or in any other situation where you commit another breach of these Terms of Purchase.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Invalidity</h2>
              <ol className="list-decimal pl-6" start={66}>
                <li>In the event that one or more of the terms set out in these Terms of Purchase is held to be invalid, illegal, or unenforceable by a competent authority, it will be deemed modified to the minimum extent necessary to make it valid, legal and enforceable and the remaining terms shall continue to be valid and enforceable.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Privacy</h2>
              <ol className="list-decimal pl-6" start={67}>
                <li>Personal information, such as your contact details, that you provide to us during the Order process will be kept and used by us in accordance with our Privacy Policy.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Third-Party Rights</h2>
              <ol className="list-decimal pl-6" start={68}>
                <li>No person who is not a party to these Terms of Purchase shall be entitled to enforce or enjoy the benefit of these Terms of Purchase.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Dispute Resolution</h2>
              <ol className="list-decimal pl-6" start={69}>
                <li>If you have a dispute with us, please attempt to resolve it with us informally by contacting us at +63 2 8888 Izaj (4532) or <a href="mailto:customerservice.izaj@ikano.asia">customerservice.izaj@ikano.asia</a>.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Governing Law and Jurisdiction</h2>
              <ol className="list-decimal pl-6" start={70}>
                <li>These Terms of Purchase shall be governed by and construed in accordance with the laws of the Philippines, and you hereby irrevocably submit to the non-exclusive jurisdiction of the Philippines courts.</li>
              </ol>

              <h2 className="text-2xl font-bold mt-12 mb-6">Notices</h2>
              <p>All notices, requests, and other communications may be sent to us at:</p>
              <p>
                <strong>Address:</strong>
                 173 1, San Pablo City, 4000 Laguna<br/>
                
                <strong>Contact number:</strong> +63 2 8888 Izaj (4532)<br/><br/>
                <strong>Email:</strong> <a href="mailto:customerservice@izaj.com">customerservice@izaj.com</a>
              </p>
            </section>
          </div>
        </main>
        {/* Subscription Section */}
        <section className="bg-black py-20 px-6 w-full">
        <div className="w-full max-w-[100vw] mx-auto text-center">
    <h2 className="text-4xl font-bold mb-4 text-white leading-tight">
      Join Our Lighting Community
    </h2>
    <p className="text-gray-300 mb-8 text-lg">
      Get exclusive access to new collections, special offers, and lighting design tips.
    </p>
    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
      <div className="relative flex-grow max-w-md">
        <input
          type="email"
          placeholder="Enter your email address"
          className="px-6 py-4 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-800 w-full placeholder-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {email && !email.includes('@') && (
          <p className="absolute -bottom-6 left-4 text-red-400 text-sm">Please enter a valid email address</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-400 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2 border-orange-400 min-w-[180px]"
      >
        Subscribe Now
      </button>
    </form>
    <p className="text-sm text-gray-400 mt-8 italic">Join 10,000+ lighting enthusiasts. Unsubscribe anytime.</p>
  </div>
</section>
      </div>
    );
  };
  
  export default TermsOfPurchase; 


