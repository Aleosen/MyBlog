import React from 'react'

export default function PopularQuestions() {
  return (
    <section className='w-full'>
        <div className="lg:w-200 w-full p-10 pb-20 mx-auto">
            <h1 className="text-3xl my-10 text-blue-500">FAQ — Frequently Asked Questions</h1>
            <p className="font-bold">Here you will find answers to the most popular questions:</p>
            <ul>
                <li>
                    <p className="">❓1. How to submit your article to the blog?</p>
                    <p className="bg-gray-100 border-l p-5 border-l-gray-400">
                    ✉️ "Send your text to email blog@.com with the subject "Guest Post". 
                    We will respond within 3 business days. Make sure the article is unique and complies with our rules."
                    </p>
                </li>
                <li>
                    <p className="">❓2. Is it possible to edit an article after publication?</p>
                    <p className="bg-gray-100 border-l p-5 border-l-gray-400">
                    ✉️ "Yes! Go to your personal account → "My articles" → move to post page and click "Edit" in settings. 
                    The changes will be saved after 'save' click."
                    </p>
                </li>
                <li>
                    <p className="">❓3. How do I delete my account?</p>
                    <p className="bg-gray-100 border-l p-5 border-l-gray-400">
                    ✉️ "Write to us at support@blog.com with the subject "Account Deletion".
                     Indicate the email you used when registering. The account and all data will be deleted within 24 hours."
                    </p>
                </li>
                <li>
                    <p className="">❓4. Are there any limits on the length of articles?</p>
                    <p className="bg-gray-100 border-l p-5 border-l-gray-400">
                    ✉️ “Minimum 500 characters, maximum 20,000. 
                    We believe that even short thoughts can be valuable, but it’s better to break up very long texts into parts.”
                    </p>
                </li>
                <li>
                    <p className="">❓5. What if I forgot my password?</p>
                    <p className="bg-gray-100 border-l p-5 border-l-gray-400">
                    ✉️ “On the login page, click “Forget password?”. Enter your email, and we’ll send you a reset link. 
                    Check your spam folder if you didn’t receive the email.”
                    </p>
                </li>
            </ul>
        </div>
    </section>
  )
}
