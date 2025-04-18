import React from 'react'
import { Link } from 'react-router-dom'

export default function UserAgreement() {
  return (
    <section className='w-full bg-gray-900 text-white'>
        <div className="mx-auto lg:w-200 pt-20">
            <div className="flex justify-between items-center mb-20">
                <h1 className="text-2xl lg:text-3xl text-blue-500">User Agreement</h1>
                <span className='opacity-70'>Last update: 18 April 2025</span>
            </div>
            <p className="">This blog is designed to share knowledge and creativity.</p>    
            <p className="">To make everyone feel comfortable, please follow these simple rules:</p>
            <ul>
                <li className="my-10">
                    <p className="mb-5 font-bold">1. Use of materials</p>
                    <ul>
                        <li className='pl-10'>
                            <p className="text-green-600">✅ You can:</p>
                            <ul className='list-disc mb-5 pl-10'>
                                <li className="">Freely share articles for personal purposes (social networks, forwarding to friends).</li>
                                <li className=''>Quote materials with an active link to the source 
                                    (for example: "Source: <span className='text-blue-600 hover:cursor-pointer'>[Article link]</span>").</li>
                            </ul>
                        </li>
                        <li className="pl-10">
                            <p className="text-red-600">❌ You cannot:</p>
                            <ul className='list-disc mb-5 pl-10'>
                                <li className="">Use content for commercial purposes (sale, advertising) without the written consent of the author.</li>
                                <li className=''>Pass off articles as your own (plagiarism) or change them without permission.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="my-10">
                    <p className=" font-bold">2. Copyright</p>
                    <ul className='list-disc mb-5 pl-10'>
                        <li>All articles belong to their authors. When publishing, users confirm that they have the rights to the content.</li>
                        <li>The administration has the right to remove material if it violates the law or the rules of the platform.</li>
                    </ul>
                </li>
                <li className="my-10">
                    <p className=" font-bold">3. Your obligations</p>
                    <p className="">It is prohibited to post:</p>
                    <ul className='list-disc mb-5 pl-10'>
                        <li>Content that violates laws (extremism, discrimination, threats).</li>
                        <li>Spam, viruses, advertising of third-party services.</li>
                    </ul>
                    <p className="">Comments must be respectful.</p>
                </li>
                <li className="my-10">
                    <p className=" font-bold">4. Responsibility</p>
                    <ul className="list-disc mb-5 pl-10">
                        <li>The opinions of the authors may not coincide with the position of the administration.</li>
                        <li>We are not responsible for the accuracy of information in user articles.</li>
                    </ul>
                </li>
            </ul>
            <Link to='/full-terms' className='text-blue-600 underline hover:opacity-70'>Read more</Link>
        </div>
    </section>
  )
}
