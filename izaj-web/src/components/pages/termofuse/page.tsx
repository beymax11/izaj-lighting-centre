"use client";

import { useState } from 'react';

const TermOfUse = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Use</h1>
          <section className="prose prose-gray max-w-none text-gray-800 text-left">
            <h2 className="text-2xl font-bold mt-12 mb-6">General</h2>
            <ol className="list-decimal pl-6">
              <li>These Terms of Use apply when you access and/or use <strong><a href="http://www.izaj.com/ph/en/" target="_blank" rel="noopener noreferrer">www.izaj.com/ph/en/</a></strong> (the "Website"), which is operated by <strong>Izaj (Philippines) Inc.</strong> ("us", "we", "our").</li>
              <li>You should read these Terms of Use, the Privacy Policy, and the Cookie Policy very carefully. The Privacy Policy and the Cookie Policy are incorporated into these Terms of Use by reference. By accessing and/or using the Website or any part of it, you agree that you have read these Terms of Use and that you accept them and agree to be bound by them.</li>
              <li>We may also, from time to time, post on the Website, guidelines and rules relating to the use of the Website. All such guidelines or rules are hereby incorporated by reference into these Terms of Use.</li>
              <li>If you decide to make a purchase on the Website, the Terms of Purchase will also apply to you, in addition to these Terms of Use, the Privacy Policy, and the Cookie Policy. You should read the Terms of Purchase very carefully before you make a purchase.</li>
              <li>You agree that we may modify these Terms of Use without liability and without prior notice to you. The modified Terms of Use will be posted on the Website and will come into effect from the date of such posting. You are advised to check for updates to these Terms of Use regularly, prior to accessing and/or using the Website.</li>
            </ol>

            <h2 className="text-2xl font-bold mt-12 mb-6">Territory</h2>
            <ol className="list-decimal pl-6" start={6}>
              <li>The information on the Website is directed solely at persons accessing the Website from the Philippines. We make no representation that any product or service referred to on the Website is available, or appropriate for use for any other location.</li>
            </ol>

            <h2 className="text-2xl font-bold mt-12 mb-6">User Account</h2>
            <ol className="list-decimal pl-6" start={7}>
              <li>In order to make a purchase on the Website, you will need to register an account with us. By registering an account, you warrant that:
                <ol className="list-[lower-alpha] pl-6">
                  <li>you are at least 18 years of age;</li>
                  <li>if you are below 18 years of age, you have obtained the consent of your parent or legal guardian, or you are under the supervision of your parent or legal guardian;</li>
                  <li>you are using your actual identity;</li>
                  <li>the personal data that you have provided to us is true, accurate, complete, and current; and</li>
                  <li>you will maintain and promptly update the personal data that you have provided to us in order that such data is kept true, accurate, complete, and current.</li>
                </ol>
              </li>
              <li>You are solely responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.</li>
              <li>We will not be liable for any loss or damage arising from your failure to comply with these Terms of Use.</li>
            </ol>

            <h2 className="text-2xl font-bold mt-12 mb-6">Changes to the Website</h2>
            <ol className="list-decimal pl-6" start={10}>
              <li>We reserve the right, but undertake no duty, to review, edit or otherwise change the Website and any information contained on the Website at our sole discretion and without notice.</li>
            </ol>

            <h2 className="text-2xl font-bold mt-12 mb-6">Warranties</h2>
            <ol className="list-decimal pl-6" start={11}>
              <li>The information provided on the Website is for reference only. To the extent permitted by law, we disclaim all implied and/or express warranties and make no representation as to the accuracy, suitability, applicability or completeness of any information on the Website. We assume no liability for any loss or damage arising from your use of or reliance on the information on the Website or for anything posted on or linked to the Website, including without limitation any mistake, error, omission, infringement, defamation, falsehood or other material or omission that might offend or otherwise give rise to any claim or complaint.</li>
              <li>We disclaim any endorsement or recommendation of any person, organization, name, product or service referred to in the Website. We further disclaim all liability in relation to information or materials posted by advertisers or sponsors on the Website.</li>
              <li>We make no warranties or representations in respect of your ability to access the Website and do not warrant that the functions of the Website shall be uninterrupted or error or defect-free.</li>
              <li>None of our agents or representatives is authorized to make any warranties, representations or statements regarding any information on the Website and we shall not in any way be bound by any such unauthorized warranties, representations or statements.</li>
            </ol>

            <h2 className="text-2xl font-bold mt-12 mb-6">Intellectual Property Rights</h2>
            <ol className="list-decimal pl-6" start={15}>
              <li>"Intellectual Property Rights" means any and all intellectual and industrial property rights now in force or that come into force in the future in any part of the world whether or not registered or registrable and includes all applications and rights to apply for registration (and renewals and extensions of any registration) of such rights as well as all rights of action and remedies in relation to past infringements including rights in or in connection with:
                <ol className="list-[lower-alpha] pl-6">
                  <li>confidential information, business or trade secrets, know-how;</li>
                  <li>inventions, patents (including supplementary protection certificates);</li>
                  <li>copyright (including the rights to secure copyright renewals and extensions of copyright, copyright not yet in existence but that comes into existence in the future and all other rights of a like nature by law in force in any part of the world);</li>
                  <li>trademarks, service marks, business or trade names;</li>
                  <li>design rights, topography rights;</li>
                  <li>database rights,</li>
                </ol>
                together with all other rights of a similar or corresponding character or nature.
              </li>
              <li>The Website and any information available on it including, but not limited to, text, graphics, icons, images, software, source code, metadata, compilations, and trademarks, are protected by copyright, design, trademark and other Intellectual Property Rights owned or controlled by us and/or our licensors. You may not copy, reproduce, republish, upload, download, post, transmit, store in retrieval system, modify, alter, display in public, or distribute in any way the contents or any part of the Website for any purpose without our prior written permission except that you may download materials displayed on the Website for non-commercial, home personal use only as long as you keep all copyright, trademark and other proprietary notices intact.</li>
              <li>All right, title, and interest in the Intellectual Property Rights on the Website shall at all times remain the property of us and/or our licensors. You are not authorized to use the same unless you have obtained express written permission from us and/or our licensors, as the case may be.</li>
              <li>You agree not to use the Website for any purpose or in any manner that is unlawful or infringes our or any third party's Intellectual Property Rights.</li>
            </ol>
          
            <h2 className="text-2xl font-bold mt-12 mb-6">Use of Personal Data</h2>
            <ol className="list-decimal pl-6" start={19}>
              <li>We respect the privacy rights of visitors to the Website. Except where specifically stated, all personal information collected by us shall be handled strictly in accordance with the Privacy policy.</li>
            </ol>
          
            <h2 className="text-2xl font-bold mt-12 mb-6">Prohibitions</h2>
            <ol className="list-decimal pl-6" start={20}>
              <li>When using the Website you cannot:
                <ol className="list-[lower-alpha] pl-6">
                  <li>interfere or disable any security-related features of the Website or features that prevent or restrict use or copying of the content accessible via the Website;</li>
                  <li>give any false information in your account details;</li>
                  <li>take another person's identity without that person's permission or misrepresent you are acting on behalf of a person, entity, or organization;</li>
                  <li>use the Website if we have suspended or banned you from using it;</li>
                  <li>send junk, spam, or repetitive messages;</li>
                  <li>engage in any illegal or unlawful conduct;</li>
                  <li>modify, interfere, intercept, disrupt or hack the Website;</li>
                  <li>misuse the Website by knowingly introducing viruses, malware, Trojans, worms, logic bombs or other similar material or by undertaking any other action which would harm the Website, any Website user's equipment or have a detrimental impact on any Website user's experience of using the Website;</li>
                  <li>collect any data from the Website other than in accordance with these Terms of Use;</li>
                  <li>submit or contribute any content that is abusive, threatening, obscene, untrue, shocking or offensive;</li>
                  <li>abuse, harm or bully another Website user, member of our staff or person;</li>
                  <li>submit or contribute any user content without the permission of the content owner or otherwise infringe the copyright, trademark or other rights of third parties; or</li>
                  <li>submit or contribute any information or commentary about another person which is untrue, private, confidential or defamatory (including personally accusing another person of unproven criminality or serious wrongdoing which could damage their reputation in the eyes of anyone reading your comment).</li>
                </ol>
              </li>
              <li>In addition to terminating your access to the Website (in whole or in part) for breach of these Terms of Use, we can also take other action as well including, but not limited to, reporting you to the police or other law enforcement body, issuing a warning or taking legal action against you and pursuing any costs we incur as a result of doing this.</li>
            </ol>
          
            <h2 className="text-2xl font-bold mt-12 mb-6">Links and Sharing</h2>
            <ol className="list-decimal pl-6" start={22}>
              <li>Any links or opportunities to share (via social media, blogs, and similar sites and communication services) on the Website are provided solely for your use and convenience. The link does not represent any endorsement or recommendation by us and does not mean that we have any association with the linked website. We are not responsible for the content of any websites that are linked to or from the Website or for the legal consequences of your entering into any contracts with the third parties that provide these linked websites and we do not accept any liability for any loss, damage, expense, costs or liability whatsoever incurred by you as a result.</li>
              <li>Please note that if you do share content onto other platforms, there may be separate terms and conditions connected to the organization that allows you to share. Please check the terms and conditions of any website you intend to share to. Some terms and conditions may prohibit you from sharing our content.</li>
              <li>We will not be liable for any loss, damage, expense, costs, delays or other liability whatsoever (including without limitation any financial losses such as loss of profit) which you may incur as a result of any event beyond our reasonable control (including without limitation any failure of transmission, communication, computer or other facilities or your inability to access the Website for any reason or any failure, error or delay in the sending or receiving of any notice or communication or instruction through the post or any electronic medium).</li>
            </ol>
          
            <h2 className="text-2xl font-bold mt-12 mb-6">Termination</h2>
            <ol className="list-decimal pl-6" start={25}>
              <li>We may, under certain circumstances and without prior notice to you, at our sole discretion, terminate your access to the Website (in whole or in part). Cause for such termination shall include without limitation:
                <ol className="list-[lower-alpha] pl-6">
                  <li>breaches or violations of these Terms of Use;</li>
                  <li>request by law enforcement or other government agencies;</li>
                  <li>infringement of Intellectual Property Rights;</li>
                  <li>discontinuance or material modification to the products/services provided on the Website; and</li>
                  <li>unexpected technical or security issues.</li>
                </ol>
              </li>
              <li>Termination of your access to the Website (in whole or in part) shall be without prejudice to any other rights or remedies we may be entitled to under these Terms of Use, at law or in equity and shall not affect any accrued rights or liabilities nor the coming into or continuance in force of any provision which is expressly or by implication intended to come into or continue in force on or after such termination.</li>
            </ol>
          
            <h2 className="text-2xl font-bold mt-12 mb-6">Limitation of Liability</h2>
            <ol className="list-decimal pl-6" start={27}>
              <li>By accessing and using the Website you acknowledge and accept that the use of the Website is at your own risk. We shall not be liable for any direct, indirect, incidental, consequential or punitive damage or for damages for loss of profit or revenue arising out of any use of, access to, or inability to use or access the Website.</li>
              <li>Without limiting the foregoing:
                <ol className="list-[lower-alpha] pl-6">
                  <li>THE WEBSITE AND ALL INFORMATION AND MATERIALS CONTAINED ON IT ARE PROVIDED "AS IS" WITHOUT ANY WARRANTY OF ANY KIND EITHER EXPRESS OR IMPLIED INCLUDING BUT NOT LIMITED TO ANY IMPLIED WARRANTIES OR IMPLIED TERMS AS TO TITLE, QUALITY, MERCHANTABILITY, FITNESS FOR PURPOSE, PRIVACY OR NON-INFRINGEMENT;</li>
                  <li>WE HAVE NO LIABILITY OR RESPONSIBILITY FOR ANY ERRORS OR OMISSIONS IN THE CONTENTS OF THE WEBSITE; AND</li>
                  <li>WE ASSUME NO RESPONSIBILITY AND SHALL NOT BE LIABLE (TO THE EXTENT PERMITTED BY LAW) FOR ANY DAMAGE OR INJURY ARISING OUT OF ANY USE OF OR ACCESS TO THE WEBSITE, OR ANY FAILURE OF PERFORMANCE, ERROR, OMISSION, INTERRUPTION, DELETION, DEFECT, DELAY IN OPERATION OR TRANSMISSION, COMPUTER VIRUS, COMMUNICATION LINE FAILURE, INTERCEPTION OF ONLINE COMMUNICATION, SOFTWARE OR HARDWARE PROBLEMS (INCLUDING WITHOUT LIMITATION LOSS OF DATA OR COMPATIBILITY PROBLEMS), THEFT, DESTRUCTION OR ALTERATION OF THE WEBSITE, WHETHER FOR BREACH OF CONTRACT, TORTIOUS BEHAVIOUR, NEGLIGENCE OR, UNDER ANY OTHER CAUSE OF ACTION RESULTING DIRECTLY OR INDIRECTLY FROM ANY ACCESS OR USE OF THE WEBSITE, OR ANY UPLOADING, DOWNLOADING OR PUBLICATION OF DATA, TEXT, IMAGES OR OTHER MATERIAL OR INFORMATION TO OR FROM THE WEBSITE.</li>
                </ol>
              </li>
            </ol>
          
            <h2 className="text-2xl font-bold mt-12 mb-6">Invalidity</h2>
            <ol className="list-decimal pl-6" start={29}>
              <li>In the event that one or more of the terms set out in these Terms of Use is held to be invalid, illegal or unenforceable by a competent authority, it will be deemed modified to the minimum extent necessary to make it valid, legal and enforceable and the remaining terms shall continue to be valid and enforceable.</li>
            </ol>
          
            <h2 className="text-2xl font-bold mt-12 mb-6">Waiver</h2>
            <ol className="list-decimal pl-6" start={30}>
              <li>If you commit any breach of these Terms of Use and we take no action, we will not be taken to have waived our rights against you, and will still be entitled to exercise our rights and remedies at a later stage or in any other situation where you commit another breach of these Terms of Use.</li>
            </ol>
          
            <h2 className="text-2xl font-bold mt-12 mb-6">Governing Law and Jurisdiction</h2>
            <ol className="list-decimal pl-6" start={31}>
              <li>These Terms of Use shall be governed by and construed in accordance with the laws of the Philippines, and you hereby irrevocably submit to the non-exclusive jurisdiction of the Philippines courts.</li>
            </ol>
          
            <h2 className="text-2xl font-bold mt-12 mb-6">Notices</h2>
            <p>If you have any questions about these Terms of Use, you may contact us either by post or by phone at the following address:</p>
            <p><strong>Address:</strong> 173 1, San Pablo City, 4000 Laguna<br/>
            <strong>Number:</strong> +63 2 8888 IZAJ (4532)</p>
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

export default TermOfUse;

