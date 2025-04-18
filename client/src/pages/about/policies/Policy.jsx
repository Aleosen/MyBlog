import React from 'react'

export default function Policy() {
  return (
    <section className='w-full bg-gray-900 text-white pb-10'>
      <div className="lg:w-200 w-full p-10 mx-auto">
        <h1 className="text-3xl text-blue-500">Privacy Policy</h1>
        <p className="mt-5">In a nutshell:</p>
        <ul className='list-decimal ml-10'>
            <li className='my-5'>We only collect the data that is necessary for the site to work (for example, email for registration or subscription).</li>
            <li className='my-5'>Your information is not shared with third parties and is used exclusively for:
                <ul className='list-disc ml-10'>
                    <li>Access to your account.</li>
                    <li>Sending notifications (if you are subscribed).</li>
                </ul>
            </li>
            <li className='my-5'>We protect data using SSL encryption and regularly update the security system.</li>
        </ul>
        <p  className='my-5'>We value your trust. 
            The email specified during registration or subscription is only needed to log in to your account and send important updates. 
            We do not sell your data or transfer it to advertising services. If you want to delete your account, write to <span className='opacity-70'>dongohago@gmail.com</span>.</p>
      </div>
    </section>
  )
}
